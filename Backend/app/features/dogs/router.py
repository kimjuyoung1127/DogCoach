from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user_id
from app.core.database import get_db
from app.features.dogs import service, schemas

router = APIRouter()


@router.get("/profile", response_model=schemas.DogProfileFull)
async def get_dog_profile(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Get full dog profile with survey data for authenticated user.
    Returns most recent dog.
    """
    return await service.get_dog_full_profile(db, user_id)


@router.put("/profile", response_model=schemas.DogProfileFull)
async def update_dog_profile(
    update_data: schemas.DogProfileUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Update dog profile data.
    Only provided fields will be updated.
    """
    return await service.update_dog_profile(db, user_id, update_data)
