"""Database operations for AI recommendations."""

from datetime import date, datetime, timedelta, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.shared.models import (
    AIRecommendationSnapshot,
    AIRecommendationFeedback,
    BehaviorLog,
    LogSummary,
)


async def get_cached_snapshot(
    db: AsyncSession, dedupe_key: str
) -> Optional[AIRecommendationSnapshot]:
    """Lookup by dedupe_key, check not expired."""
    now = datetime.now(timezone.utc)
    result = await db.execute(
        select(AIRecommendationSnapshot).where(
            AIRecommendationSnapshot.dedupe_key == dedupe_key,
            AIRecommendationSnapshot.expires_at > now,
        )
    )
    return result.scalar_one_or_none()


async def get_latest_snapshot(
    db: AsyncSession, dog_id: str, window_days: int
) -> Optional[AIRecommendationSnapshot]:
    """Get most recent valid (non-expired) snapshot for dog + window."""
    now = datetime.now(timezone.utc)
    result = await db.execute(
        select(AIRecommendationSnapshot)
        .where(
            AIRecommendationSnapshot.dog_id == UUID(dog_id),
            AIRecommendationSnapshot.window_days == window_days,
            AIRecommendationSnapshot.expires_at > now,
        )
        .order_by(desc(AIRecommendationSnapshot.created_at))
        .limit(1)
    )
    return result.scalar_one_or_none()


async def get_snapshot_by_id(
    db: AsyncSession, snapshot_id: str
) -> Optional[AIRecommendationSnapshot]:
    result = await db.execute(
        select(AIRecommendationSnapshot).where(
            AIRecommendationSnapshot.id == UUID(snapshot_id)
        )
    )
    return result.scalar_one_or_none()


async def save_snapshot(
    db: AsyncSession, data: dict
) -> AIRecommendationSnapshot:
    """Insert new recommendation snapshot."""
    snapshot = AIRecommendationSnapshot(**data)
    db.add(snapshot)
    await db.flush()
    await db.refresh(snapshot)
    return snapshot


async def save_feedback(
    db: AsyncSession, data: dict
) -> AIRecommendationFeedback:
    """Insert recommendation feedback."""
    feedback = AIRecommendationFeedback(**data)
    db.add(feedback)
    await db.flush()
    await db.refresh(feedback)
    return feedback


async def get_log_summary_text(
    db: AsyncSession, dog_id: str, window_days: int
) -> str:
    """Get summary text for the given dog and window.

    1. Try log_summaries table first.
    2. Fallback: compress recent behavior_logs into <=1200 chars.
    """
    today = date.today()
    start_date = today - timedelta(days=window_days)

    # Try log_summaries
    result = await db.execute(
        select(LogSummary.summary_text)
        .where(
            LogSummary.dog_id == UUID(dog_id),
            LogSummary.start_date >= start_date,
            LogSummary.end_date <= today,
        )
        .order_by(desc(LogSummary.created_at))
        .limit(1)
    )
    summary = result.scalar_one_or_none()
    if summary:
        return summary[:1200]

    # Fallback: build summary from raw behavior_logs
    logs_result = await db.execute(
        select(BehaviorLog)
        .where(
            BehaviorLog.dog_id == UUID(dog_id),
            BehaviorLog.occurred_at >= datetime(
                start_date.year, start_date.month, start_date.day,
                tzinfo=timezone.utc,
            ),
        )
        .order_by(desc(BehaviorLog.occurred_at))
        .limit(30)
    )
    logs = logs_result.scalars().all()

    if not logs:
        return f"최근 {window_days}일간 기록된 행동 로그가 없습니다."

    parts = []
    total_len = 0
    for log in logs:
        date_str = log.occurred_at.strftime("%m/%d") if log.occurred_at else ""
        line = f"{date_str}"
        if log.behavior:
            line += f" {log.behavior}"
        if log.antecedent:
            line += f"(선행:{log.antecedent})"
        if log.consequence:
            line += f"(결과:{log.consequence})"
        if log.intensity:
            line += f" 강도:{log.intensity}"
        line += "\n"

        if total_len + len(line) > 1200:
            break
        parts.append(line)
        total_len += len(line)

    return "".join(parts) if parts else f"최근 {window_days}일간 기록이 부족합니다."


async def get_user_call_count_today(
    db: AsyncSession,
    user_id: Optional[str],
    anonymous_sid: Optional[str],
) -> int:
    """Count AI recommendation calls for user today."""
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    if user_id:
        identity_filter = AIRecommendationSnapshot.user_id == user_id
    elif anonymous_sid:
        identity_filter = AIRecommendationSnapshot.anonymous_sid == anonymous_sid
    else:
        return 0

    count = await db.scalar(
        select(func.count(AIRecommendationSnapshot.id)).where(
            identity_filter,
            AIRecommendationSnapshot.created_at >= today_start,
        )
    )
    return count or 0
