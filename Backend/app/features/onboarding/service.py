from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.onboarding import repository, schemas

from typing import Optional

async def submit_survey(
    db: AsyncSession, 
    user_id: Optional[UUID],
    guest_id: Optional[str],
    data: schemas.SurveySubmission
) -> schemas.DogResponse:
    # Business Logic:
    # 1. (Optional) Check if user already has a dog? (For MVP allowing multiple dogs is fine)
    # 2. Call repository to save
    dog = await repository.create_dog_with_env(db, user_id, guest_id, data)
    
    return schemas.DogResponse.model_validate(dog)
