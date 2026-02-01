from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.shared.models import Dog, BehaviorLog
from app.features.dashboard import schemas
from datetime import date, timedelta

from app.shared.models import Dog, BehaviorLog, DogEnv

async def get_dashboard_data(db: AsyncSession, dog_id: str) -> schemas.DashboardResponse:
    # 1. Fetch Dog Info
    result = await db.execute(select(Dog).where(Dog.id == dog_id))
    dog = result.scalar_one_or_none()
    
    if not dog:
        raise Exception("Dog not found") 

    # Calculate Age
    age_months = 0
    if dog.birth_date:
        today = date.today()
        # Rough calculation
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
             top_issues = issues_data.get("top_issues", [])
             other = issues_data.get("other_text")
             if other and "etc" in top_issues:
                 issues = [i if i != "etc" else other for i in top_issues]
             else:
                 issues = top_issues
        
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

    # 2. Fetch Stats (Total Logs, Streak)
    # Total Logs
    count_query = select(func.count()).where(BehaviorLog.dog_id == dog_id)
    total_logs = (await db.execute(count_query)).scalar() or 0

    # Last Logged At
    last_log_query = select(BehaviorLog.occurred_at).where(BehaviorLog.dog_id == dog_id).order_by(desc(BehaviorLog.occurred_at)).limit(1)
    last_logged_at = (await db.execute(last_log_query)).scalar_one_or_none()

    # Streak Calculation (Simplified for MVP)
    current_streak = 0
    if last_logged_at:
        diff = date.today() - last_logged_at.date()
        if diff.days <= 1:
            current_streak = 1 # Active
        else:
            current_streak = 0
    
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
        env_consequences=env_consequences
    )
