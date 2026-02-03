from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.features.coach import service, schemas
from app.core.security import get_current_user_id_optional
from typing import Optional

router = APIRouter()

@router.post("/generate", response_model=schemas.CoachingResponse)
async def generate_coaching_advice(
    request: schemas.CoachingRequest,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    # Security: Verify dog belongs to user/guest?
    # For MVP, we trust the ID or could add check logic in service.
    return await service.generate_coaching(db, request)

@router.post("/analyze/{dog_id}", response_model=schemas.AIAnalysisResponse)
async def analyze_dog_behavior(
    dog_id: str,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    # This endpoint uses LLM to analyze the dog's behavior based on logs and env.
    return await service.analyze_behavior_with_ai(db, dog_id)
