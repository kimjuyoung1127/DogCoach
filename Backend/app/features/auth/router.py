from fastapi import APIRouter, Depends, Request, status
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


@router.post("/migrate-guest", response_model=schemas.MigrateGuestResponse)
async def migrate_guest_data(
    request: Request,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Transfer guest dog data to the authenticated user.
    Reads anonymous_sid from cookie. Idempotent.
    """
    anonymous_sid = request.cookies.get("anonymous_sid")
    if not anonymous_sid:
        return schemas.MigrateGuestResponse(migrated_count=0, dog_ids=[])
    return await service.migrate_guest_data(db, user_id, anonymous_sid)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_account(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    Permanently delete user account and all associated data.
    CASCADE deletes will handle related records.
    """
    await service.delete_user_account(db, user_id)
    return None
