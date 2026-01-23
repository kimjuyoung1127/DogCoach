from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.features.auth import service, schemas

router = APIRouter()

@router.get("/me", response_model=schemas.UserResponse)
async def read_users_me(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Get current user profile.
    Requires valid Bearer token.
    """
    return await service.get_my_profile(db, user_id)
