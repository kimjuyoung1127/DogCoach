from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, Header, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.features.log import service, schemas

router = APIRouter()

@router.post("/", response_model=schemas.LogResponse, status_code=status.HTTP_201_CREATED)
async def create_behavior_log(
    log_data: schemas.LogCreate,
    x_timezone: str = Header(default="Asia/Seoul", alias="X-Timezone"),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new behavior log.
    Converts occurred_at to UTC based on X-Timezone header.
    """
    # Verify ownership logic could be added here (check if dog belongs to user)
    # For now, we trust the ID or handle validation in service if needed.
    return await service.create_new_log(db, log_data, x_timezone)

@router.get("/{dog_id}", response_model=List[schemas.LogResponse])
async def read_logs(
    dog_id: UUID,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Get recent logs for a specific dog.
    """
    return await service.get_recent_logs(db, dog_id)
