from uuid import UUID
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.features.coach import service, schemas
from app.core.security import get_current_user_id_optional
from app.shared.utils.ownership import verify_dog_ownership
from typing import Optional

router = APIRouter()

@router.post("/generate", response_model=schemas.CoachingResponse)
async def generate_coaching_advice(
    http_request: Request,
    request: schemas.CoachingRequest,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    guest_id = http_request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, UUID(request.dog_id), user_id, guest_id)
    return await service.generate_coaching(db, request)
