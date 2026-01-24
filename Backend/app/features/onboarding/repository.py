from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.models import Dog, DogEnv, BehaviorLog
from app.features.onboarding import schemas

from typing import Optional

async def create_dog_with_env(
    db: AsyncSession, 
    user_id: Optional[UUID],
    guest_id: Optional[str],
    data: schemas.SurveySubmission
) -> Dog:
    # 1. Create Dog
    dog = Dog(
        user_id=user_id,
        anonymous_sid=guest_id,
        name=data.name,
        breed=data.breed,
        birth_date=data.birth_date,
        sex=data.sex,
        profile_image_url=data.profile_image_url,
    )
    db.add(dog)
    await db.flush() # Generate dog.id

    # 2. Create DogEnv
    # Dump Pydantic models to dicts (JSON)
    dog_env = DogEnv(
        dog_id=dog.id,
        profile_meta=data.profile_meta.model_dump(),
        household_info=data.household_info.model_dump(),
        health_meta=data.health_meta.model_dump(),
        rewards_meta=data.rewards_meta.model_dump(),
        chronic_issues=data.chronic_issues.model_dump(),
        triggers=data.triggers, # List maps directly to JSON array
        past_attempts=data.past_attempts,
        temperament=data.temperament.model_dump(),
        activity_meta=data.activity_meta
    )
    db.add(dog_env)
    
    # 3. Create Seed Data (Cold Start)
    # If there are chronic issues, pick the first one as initial seed log
    if data.chronic_issues.top_issues:
        first_issue = data.chronic_issues.top_issues[0]
        # Seed log
        seed_log = BehaviorLog(
            dog_id=dog.id,
            is_quick_log=False,
            antecedent="설문조사 기반 초기 데이터",
            behavior=first_issue,
            consequence="초기 분석 대기중",
            intensity=5, # Default medium intensity
            occurred_at=None, # Use default NOW()
        )
        db.add(seed_log)
    
    await db.commit()
    await db.refresh(dog)
    return dog
