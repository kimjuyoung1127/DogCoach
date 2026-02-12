"""Core orchestration for AI recommendation generation.

Fixed generation order:
1. Fetch summary_text (log_summaries or behavior_logs fallback)
2. Compute dedupe_key
3. Cache lookup (dedupe_key + expires_at > now)
4. HIT -> return immediately (zero-call principle)
5. MISS -> budget check, quota check, rule engine, OpenAI, validate, save
"""

import json
import logging
from typing import Optional

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.shared.clients.openai_client import openai_client, OpenAIError

from . import repository
from .budget import (
    compute_dedupe_key,
    compute_expires_at,
    compute_summary_hash,
    get_budget_mode,
    check_user_quota,
    record_cost,
    get_cost_summary,
)
from .prompts import PROMPT_VERSION, SYSTEM_PROMPT, build_user_prompt
from .rule_engine import generate_rule_based
from .schemas import (
    CostStatusResponse,
    FeedbackRequest,
    FeedbackResponse,
    RecommendationItem,
    RecommendationRequest,
    RecommendationResponse,
)

logger = logging.getLogger(__name__)


def _parse_ai_response(content: str) -> Optional[dict]:
    """Parse and validate AI JSON response."""
    try:
        # Strip markdown code fences if present
        cleaned = content.strip()
        if cleaned.startswith("```"):
            lines = cleaned.split("\n")
            lines = [l for l in lines if not l.strip().startswith("```")]
            cleaned = "\n".join(lines)

        data = json.loads(cleaned)

        # Validate structure
        recs = data.get("recommendations")
        if not isinstance(recs, list) or len(recs) < 3:
            return None

        for r in recs[:3]:
            if not isinstance(r, dict):
                return None
            if "title" not in r or "description" not in r:
                return None

        rationale = data.get("rationale", "")
        if not rationale:
            return None

        return {
            "recommendations": [
                {"title": r["title"], "description": r["description"], "priority": r.get("priority", i + 1)}
                for i, r in enumerate(recs[:3])
            ],
            "rationale": rationale,
            "period_comparison": data.get("period_comparison"),
        }
    except (json.JSONDecodeError, KeyError, TypeError):
        return None


async def generate_recommendations(
    db: AsyncSession,
    request: RecommendationRequest,
    user_id: Optional[str],
    anonymous_sid: Optional[str],
) -> RecommendationResponse:
    """Main recommendation generation with cache-first strategy."""

    dog_id = request.dog_id
    window_days = request.window_days
    issue = request.issue

    # 1. Get summary text
    summary_text = await repository.get_log_summary_text(db, dog_id, window_days)

    # 2. Compute dedupe key
    summary_hash = compute_summary_hash(summary_text)
    dedupe_key = compute_dedupe_key(dog_id, window_days, issue, summary_hash)

    # 3. Cache lookup (unless force_refresh)
    if not request.force_refresh:
        cached = await repository.get_cached_snapshot(db, dedupe_key)
        if cached:
            logger.info("Cache HIT for dedupe_key=%s", dedupe_key[:16])
            return _snapshot_to_response(cached)

    # 4. MISS path
    budget_mode = await get_budget_mode(db)
    use_ai = True

    # 4a. Budget gate
    if budget_mode == "rule_only":
        use_ai = False
    elif budget_mode == "saving_mode" and window_days > 7:
        use_ai = False

    # 4b. User quota
    if use_ai:
        can_generate, remaining = await check_user_quota(db, user_id, anonymous_sid)
        if not can_generate:
            use_ai = False

    # 4c/d/e. Generate
    ai_result = None
    source = "rule"
    input_tokens = 0
    output_tokens = 0
    cost_usd = 0.0
    latency_ms = 0

    if use_ai:
        try:
            # Build prompt with rule candidates as context
            rule_candidates = generate_rule_based(issue, summary_text, window_days)
            candidates_text = "\n".join(
                f"{i+1}. {c['title']}: {c['description']}"
                for i, c in enumerate(rule_candidates["recommendations"][:5])
            )
            user_prompt = build_user_prompt(issue, summary_text, window_days)
            user_prompt += f"\n\n[후보 추천]\n{candidates_text}"

            response = await openai_client.generate(SYSTEM_PROMPT, user_prompt)
            ai_result = _parse_ai_response(response["content"])
            input_tokens = response["input_tokens"]
            output_tokens = response["output_tokens"]
            cost_usd = response["cost_usd"]
            latency_ms = response["latency_ms"]

            if ai_result:
                source = "ai"
                ai_result["source"] = "ai"
            else:
                logger.warning("AI response validation failed, falling back to rules")

        except OpenAIError as e:
            logger.error("OpenAI call failed: %s", e)

    # Fallback to rule engine
    if not ai_result:
        ai_result = generate_rule_based(issue, summary_text, window_days)
        source = "rule"

    # 5. Save snapshot
    snapshot_data = {
        "dog_id": dog_id,
        "user_id": user_id,
        "anonymous_sid": anonymous_sid,
        "window_days": window_days,
        "dedupe_key": dedupe_key,
        "prompt_version": PROMPT_VERSION,
        "model": settings.OPENAI_MODEL,
        "summary_hash": summary_hash,
        "issue": issue,
        "recommendations": ai_result["recommendations"],
        "rationale": ai_result["rationale"],
        "period_comparison": ai_result.get("period_comparison"),
        "source": source,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "cost_usd": cost_usd,
        "latency_ms": latency_ms,
        "expires_at": compute_expires_at(window_days),
    }

    snapshot = await repository.save_snapshot(db, snapshot_data)

    # 6. Record cost
    await record_cost(
        db,
        cost_usd=cost_usd,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        is_rule_fallback=(source == "rule"),
    )
    await db.commit()

    return _snapshot_to_response(snapshot)


async def get_latest_recommendations(
    db: AsyncSession,
    dog_id: str,
    window_days: int,
) -> RecommendationResponse:
    """Return latest cached recommendation (no generation)."""
    snapshot = await repository.get_latest_snapshot(db, dog_id, window_days)
    if not snapshot:
        raise HTTPException(status_code=404, detail="No recommendations found")
    return _snapshot_to_response(snapshot)


async def submit_feedback(
    db: AsyncSession,
    snapshot_id: str,
    request: FeedbackRequest,
    user_id: Optional[str],
    anonymous_sid: Optional[str],
) -> FeedbackResponse:
    """Save feedback. No LLM call."""
    snapshot = await repository.get_snapshot_by_id(db, snapshot_id)
    if not snapshot:
        raise HTTPException(status_code=404, detail="Recommendation snapshot not found")

    snapshot_user_id = str(snapshot.user_id) if snapshot.user_id else None
    snapshot_sid = snapshot.anonymous_sid
    owner_ok = False
    if user_id and snapshot_user_id and user_id == snapshot_user_id:
        owner_ok = True
    if anonymous_sid and snapshot_sid and anonymous_sid == snapshot_sid:
        owner_ok = True
    if not owner_ok:
        raise HTTPException(status_code=403, detail="Not allowed to submit feedback for this snapshot")

    feedback = await repository.save_feedback(
        db,
        {
            "snapshot_id": snapshot_id,
            "user_id": user_id,
            "anonymous_sid": anonymous_sid,
            "recommendation_index": request.recommendation_index,
            "action": request.action.value,
            "note": request.note,
        },
    )
    await db.commit()

    return FeedbackResponse(
        id=feedback.id,
        snapshot_id=feedback.snapshot_id,
        action=request.action,
        created_at=feedback.created_at,
    )


async def get_cost_status(
    db: AsyncSession,
    user_id: Optional[str],
    anonymous_sid: Optional[str],
) -> CostStatusResponse:
    """Return current budget status."""
    budget_mode = await get_budget_mode(db)
    cost_info = await get_cost_summary(db)
    call_count = await repository.get_user_call_count_today(
        db, user_id, anonymous_sid
    )
    remaining = max(0, settings.AI_USER_DAILY_LIMIT - call_count)

    return CostStatusResponse(
        daily_cost_usd=cost_info["daily_cost_usd"],
        daily_budget_usd=settings.AI_DAILY_BUDGET_USD,
        daily_calls=cost_info["daily_calls"],
        monthly_cost_usd=cost_info["monthly_cost_usd"],
        monthly_budget_usd=settings.AI_MONTHLY_BUDGET_USD,
        budget_mode=budget_mode,
        user_remaining_today=remaining,
    )


def _snapshot_to_response(snapshot: "AIRecommendationSnapshot") -> RecommendationResponse:
    """Convert DB snapshot to API response (no source/saving_mode exposed)."""
    recs = snapshot.recommendations
    if isinstance(recs, list):
        items = [
            RecommendationItem(
                title=r.get("title", ""),
                description=r.get("description", ""),
                priority=r.get("priority", i + 1),
            )
            for i, r in enumerate(recs[:3])
        ]
    else:
        items = []

    return RecommendationResponse(
        id=snapshot.id,
        dog_id=snapshot.dog_id,
        window_days=snapshot.window_days,
        recommendations=items,
        rationale=snapshot.rationale,
        period_comparison=snapshot.period_comparison,
        created_at=snapshot.created_at,
        expires_at=snapshot.expires_at,
    )
