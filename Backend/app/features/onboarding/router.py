from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.features.onboarding import service, schemas

router = APIRouter()

@router.post("/survey", response_model=schemas.DogResponse, status_code=status.HTTP_201_CREATED)
async def submit_onboarding_survey(
    data: schemas.SurveySubmission,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Submit onboarding survey to create a new Dog profile.
    Automatically generates DogEnv and initial BehaviorLog.
    """
    user_uuid = UUID(user_id)
    return await service.submit_survey(db, user_uuid, data)
