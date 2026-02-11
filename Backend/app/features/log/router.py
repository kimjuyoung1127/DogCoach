from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, Header, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id, get_current_user_id_optional
from app.features.log import service, schemas, repository
from app.shared.utils.ownership import verify_dog_ownership

router = APIRouter()

@router.post("/", response_model=schemas.LogResponse, status_code=status.HTTP_201_CREATED)
async def create_behavior_log(
    request: Request,
    log_data: schemas.LogCreate,
    x_timezone: str = Header(default="Asia/Seoul", alias="X-Timezone"),
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new behavior log.
    Converts occurred_at to UTC based on X-Timezone header.
    """
    guest_id = request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, log_data.dog_id, user_id, guest_id)
    return await service.create_new_log(db, log_data, x_timezone)

@router.get("/{dog_id}", response_model=List[schemas.LogResponse])
async def read_logs(
    request: Request,
    dog_id: UUID,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    """
    Get recent logs for a specific dog.
    """
    guest_id = request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, dog_id, user_id, guest_id)
    return await service.get_recent_logs(db, dog_id)

@router.patch("/{log_id}", response_model=schemas.LogResponse)
async def update_log(
    request: Request,
    log_id: UUID,
    log_update: schemas.LogUpdate,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    """
    Update a specific log entry (e.g. intensity adjustment).
    """
    # Look up the log to find its dog_id, then verify ownership
    log = await repository.get_log_by_id(db, log_id)
    if not log:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Log not found")
    guest_id = request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, log.dog_id, user_id, guest_id)
    return await service.update_existing_log(db, log_id, log_update)
