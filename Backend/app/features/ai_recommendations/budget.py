"""Budget management, deduplication, and quota enforcement."""

import hashlib
from datetime import date, datetime, timedelta, timezone
from typing import Optional, Tuple

from sqlalchemy import select, func
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.shared.models import (
    AICostUsageDaily,
    AICostUsageMonthly,
    AIRecommendationSnapshot,
)
from .prompts import PROMPT_VERSION


def compute_summary_hash(summary_text: str) -> str:
    """sha256 of summary_text for change detection."""
    return hashlib.sha256(summary_text.encode("utf-8")).hexdigest()


def compute_dedupe_key(
    dog_id: str, window_days: int, issue: str, summary_hash: str
) -> str:
    """sha256(dog_id|window_days|issue|summary_hash|prompt_version|model)."""
    raw = f"{dog_id}|{window_days}|{issue}|{summary_hash}|{PROMPT_VERSION}|{settings.OPENAI_MODEL}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def get_ttl_hours(window_days: int) -> int:
    """Return cache TTL in hours based on window."""
    mapping = {
        7: settings.AI_TTL_7D_HOURS,
        15: settings.AI_TTL_15D_HOURS,
        30: settings.AI_TTL_30D_HOURS,
    }
    return mapping.get(window_days, 168)


def compute_expires_at(window_days: int) -> datetime:
    """Compute expiration datetime from now + TTL."""
    ttl = get_ttl_hours(window_days)
    return datetime.now(timezone.utc) + timedelta(hours=ttl)


async def get_budget_mode(db: AsyncSession) -> str:
    """Check budget and return mode: 'normal', 'saving_mode', or 'rule_only'."""
    today = date.today()
    month_start = today.replace(day=1)

    daily_cost = await db.scalar(
        select(AICostUsageDaily.total_cost_usd).where(
            AICostUsageDaily.usage_date == today
        )
    )
    daily_cost = float(daily_cost or 0)

    monthly_cost = await db.scalar(
        select(AICostUsageMonthly.total_cost_usd).where(
            AICostUsageMonthly.usage_month == month_start
        )
    )
    monthly_cost = float(monthly_cost or 0)

    # 100% budget -> rule only
    if (
        daily_cost >= settings.AI_DAILY_BUDGET_USD
        or monthly_cost >= settings.AI_MONTHLY_BUDGET_USD
    ):
        return "rule_only"

    # 80% budget -> saving mode (15/30 day disabled)
    if (
        daily_cost >= settings.AI_DAILY_BUDGET_USD * 0.8
        or monthly_cost >= settings.AI_MONTHLY_BUDGET_USD * 0.8
    ):
        return "saving_mode"

    return "normal"


async def check_user_quota(
    db: AsyncSession,
    user_id: Optional[str],
    anonymous_sid: Optional[str],
) -> Tuple[bool, int]:
    """Check user daily limit (6/day) and burst limit (2/10min).

    Returns: (can_generate, remaining_today)
    """
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    burst_start = now - timedelta(minutes=settings.AI_USER_BURST_WINDOW_MIN)

    # Build identity filter
    if user_id:
        identity_filter = AIRecommendationSnapshot.user_id == user_id
    elif anonymous_sid:
        identity_filter = AIRecommendationSnapshot.anonymous_sid == anonymous_sid
    else:
        return False, 0

    # Daily count
    daily_count = await db.scalar(
        select(func.count(AIRecommendationSnapshot.id)).where(
            identity_filter,
            AIRecommendationSnapshot.created_at >= today_start,
        )
    ) or 0

    remaining = max(0, settings.AI_USER_DAILY_LIMIT - daily_count)

    if daily_count >= settings.AI_USER_DAILY_LIMIT:
        return False, 0

    # Burst count (last 10 min)
    burst_count = await db.scalar(
        select(func.count(AIRecommendationSnapshot.id)).where(
            identity_filter,
            AIRecommendationSnapshot.created_at >= burst_start,
        )
    ) or 0

    if burst_count >= settings.AI_USER_BURST_LIMIT:
        return False, remaining

    return True, remaining


async def record_cost(
    db: AsyncSession,
    cost_usd: float,
    input_tokens: int,
    output_tokens: int,
    is_rule_fallback: bool = False,
) -> None:
    """Upsert cost into daily and monthly tracking tables."""
    today = date.today()
    month_start = today.replace(day=1)

    # Daily upsert
    daily_stmt = pg_insert(AICostUsageDaily).values(
        usage_date=today,
        total_calls=1,
        total_input_tokens=input_tokens,
        total_output_tokens=output_tokens,
        total_cost_usd=cost_usd,
        rule_fallback_count=1 if is_rule_fallback else 0,
    )
    daily_stmt = daily_stmt.on_conflict_do_update(
        index_elements=["usage_date"],
        set_={
            "total_calls": AICostUsageDaily.total_calls + 1,
            "total_input_tokens": AICostUsageDaily.total_input_tokens + input_tokens,
            "total_output_tokens": AICostUsageDaily.total_output_tokens + output_tokens,
            "total_cost_usd": AICostUsageDaily.total_cost_usd + cost_usd,
            "rule_fallback_count": AICostUsageDaily.rule_fallback_count
            + (1 if is_rule_fallback else 0),
        },
    )
    await db.execute(daily_stmt)

    # Monthly upsert
    monthly_stmt = pg_insert(AICostUsageMonthly).values(
        usage_month=month_start,
        total_calls=1,
        total_cost_usd=cost_usd,
    )
    monthly_stmt = monthly_stmt.on_conflict_do_update(
        index_elements=["usage_month"],
        set_={
            "total_calls": AICostUsageMonthly.total_calls + 1,
            "total_cost_usd": AICostUsageMonthly.total_cost_usd + cost_usd,
        },
    )
    await db.execute(monthly_stmt)

    await db.flush()


async def get_cost_summary(
    db: AsyncSession,
) -> dict:
    """Return current daily and monthly cost summary."""
    today = date.today()
    month_start = today.replace(day=1)

    daily_row = (
        await db.execute(
            select(
                AICostUsageDaily.total_cost_usd,
                AICostUsageDaily.total_calls,
            ).where(AICostUsageDaily.usage_date == today)
        )
    ).first()

    monthly_row = (
        await db.execute(
            select(AICostUsageMonthly.total_cost_usd).where(
                AICostUsageMonthly.usage_month == month_start
            )
        )
    ).first()

    return {
        "daily_cost_usd": float(daily_row[0]) if daily_row else 0.0,
        "daily_calls": int(daily_row[1]) if daily_row else 0,
        "monthly_cost_usd": float(monthly_row[0]) if monthly_row else 0.0,
    }
