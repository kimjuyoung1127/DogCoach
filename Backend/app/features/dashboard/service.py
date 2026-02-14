from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.features.dashboard import schemas
from datetime import timedelta
from zoneinfo import ZoneInfo
from fastapi import HTTPException

from app.shared.models import Dog, BehaviorLog, DogEnv
from app.shared.utils.timezone import get_today_with_timezone

async def get_dashboard_data(db: AsyncSession, dog_id: str, timezone_str: str = "Asia/Seoul") -> schemas.DashboardResponse:
    # 1. Fetch Dog Info
    result = await db.execute(select(Dog).where(Dog.id == dog_id))
    dog = result.scalar_one_or_none()
    
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")

    # Calculate Age (using user's timezone for accurate date)
    age_months = 0
    if dog.birth_date:
        today = get_today_with_timezone(timezone_str)
        delta = today - dog.birth_date
        age_months = int(delta.days / 30)

    dog_profile = schemas.DashboardDogProfile(
        id=dog.id,
        name=dog.name,
        breed=dog.breed,
        age_months=age_months,
        profile_image_url=dog.profile_image_url
    )

    # 1.5 Fetch Env for Issues
    env_query = select(DogEnv).where(DogEnv.dog_id == dog_id)
    env_result = await db.execute(env_query)
    dog_env = env_result.scalar_one_or_none()
    
    issues = []
    env_triggers = []
    env_consequences = []
    
    if dog_env:
        if dog_env.chronic_issues:
            # Handle new structure: {"top_issues": [...], "other_text": "..."}
            issues_data = dog_env.chronic_issues
            if isinstance(issues_data, dict):
                top_issues = issues_data.get("top_issues", [])
                other = issues_data.get("other_text")
                if other and "etc" in top_issues:
                    issues = [i if i != "etc" else other for i in top_issues]
                else:
                    issues = top_issues
            else:
                issues = issues_data  # Legacy: plain list
        
        if dog_env.triggers:
            # Handle new structure: {"ids": [...], "other_text": "..."}
            triggers_data = dog_env.triggers
            if isinstance(triggers_data, dict):
                ids = triggers_data.get("ids", [])
                other = triggers_data.get("other_text")
                if other and "etc" in ids:
                    env_triggers = [i if i != "etc" else other for i in ids]
                else:
                    env_triggers = ids
            else:
                env_triggers = triggers_data
            
        if dog_env.past_attempts:
            # Handle new structure: {"ids": [...], "other_text": "..."}
            attempts_data = dog_env.past_attempts
            if isinstance(attempts_data, dict):
                ids = attempts_data.get("ids", [])
                other = attempts_data.get("other_text")
                if other and "etc" in ids:
                    env_consequences = [i if i != "etc" else other for i in ids]
                else:
                    env_consequences = ids
            else:
                env_consequences = attempts_data

    # Extract optional metadata from dog_env for completeness check
    env_info = dog_env.household_info if dog_env else None
    health_meta = dog_env.health_meta if dog_env else None
    rewards_meta = dog_env.rewards_meta if dog_env else None
    past_attempts_meta = dog_env.past_attempts if dog_env else None
    temperament_meta = dog_env.temperament if dog_env else None
    profile_meta = dog_env.profile_meta if dog_env else None

    # 2. Fetch Stats (Total Logs, Streak)
    # Total Logs
    count_query = select(func.count()).where(BehaviorLog.dog_id == dog_id)
    total_logs = (await db.execute(count_query)).scalar() or 0

    # Last Logged At
    last_log_query = select(BehaviorLog.occurred_at).where(BehaviorLog.dog_id == dog_id).order_by(desc(BehaviorLog.occurred_at)).limit(1)
    last_logged_at = (await db.execute(last_log_query)).scalar_one_or_none()

    # Streak Calculation (consecutive days with at least one log)
    current_streak = 0
    if last_logged_at:
        user_today = get_today_with_timezone(timezone_str)
        tz = ZoneInfo(timezone_str)

        # Fetch recent log timestamps and convert to user timezone in Python
        recent_dates_query = (
            select(BehaviorLog.occurred_at)
            .where(BehaviorLog.dog_id == dog_id)
            .order_by(desc(BehaviorLog.occurred_at))
            .limit(500)
        )
        result = await db.execute(recent_dates_query)
        raw_dates = [row[0] for row in result.all()]

        # Convert to user-local dates and deduplicate
        log_dates = sorted(
            {dt.astimezone(tz).date() for dt in raw_dates},
            reverse=True,
        )

        # Count consecutive days from today (or yesterday if no log today)
        if log_dates:
            expected = user_today
            # Allow starting from yesterday if no log today yet
            if log_dates[0] == user_today - timedelta(days=1):
                expected = user_today - timedelta(days=1)
            for d in log_dates:
                if d == expected:
                    current_streak += 1
                    expected -= timedelta(days=1)
                elif d < expected:
                    break
    
    stats = schemas.QuickLogStats(
        total_logs=total_logs,
        current_streak=current_streak,
        last_logged_at=last_logged_at
    )

    # 3. Fetch Recent Logs (Limit 5)
    logs_query = select(BehaviorLog).where(BehaviorLog.dog_id == dog_id).order_by(desc(BehaviorLog.occurred_at)).limit(5)
    recent_logs_result = (await db.execute(logs_query)).scalars().all()
    recent_logs = [schemas.RecentLogItem.model_validate(log) for log in recent_logs_result]

    return schemas.DashboardResponse(
        dog_profile=dog_profile,
        stats=stats,
        recent_logs=recent_logs,
        issues=issues,
        env_triggers=env_triggers,
        env_consequences=env_consequences,
        env_info=env_info,
        health_meta=health_meta,
        rewards_meta=rewards_meta,
        past_attempts=past_attempts_meta,
        temperament=temperament_meta,
        profile_meta=profile_meta
    )
