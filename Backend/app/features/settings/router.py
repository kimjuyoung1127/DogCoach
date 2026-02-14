from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user_id
from app.core.database import get_db
from app.features.settings import service, schemas

router = APIRouter()


@router.get("/", response_model=schemas.UserSettingsResponse)
async def get_user_settings(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get user settings (creates with defaults if not exists)"""
    return await service.get_settings_with_defaults(db, user_id)


@router.patch("/", response_model=schemas.UserSettingsResponse)
async def update_user_settings(
    updates: schemas.UserSettingsUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Update user settings (partial update supported)"""
    return await service.update_settings(db, user_id, updates)
