from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.core.database import get_db
from app.core.security import get_current_user_id_optional
from app.features.dashboard import service, schemas
from app.shared.models import Dog
from typing import Optional
from uuid import UUID
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

router = APIRouter()

async def get_current_dog_id(
    request: Request,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
) -> str:
    """
    Helper to resolve the context: Which dog are we looking at?
    1. If user_id (Login), find dog for user.
    2. If anonymous_sid (Guest), find dog for cookie sid.
    3. Return dog_id.
    """
    guest_id = request.cookies.get("anonymous_sid")

    query = select(Dog.id)
    if user_id:
        query = query.where(Dog.user_id == UUID(user_id))
    elif guest_id:
        query = query.where(Dog.anonymous_sid == guest_id)
    else:
        raise HTTPException(status_code=401, detail="Authentication required")
        
    # Get the most recent dog (MVP)
    query = query.order_by(desc(Dog.created_at)).limit(1)
    result = await db.execute(query)
    dog_id = result.scalar_one_or_none()
    
    if not dog_id:
         raise HTTPException(status_code=404, detail="No dog profile found. Please complete the survey.")
         
    return str(dog_id)

@router.get("/", response_model=schemas.DashboardResponse)
async def get_dashboard_summary(
    request: Request,
    dog_id: str = Depends(get_current_dog_id),
    db: AsyncSession = Depends(get_db)
):
    x_timezone = request.headers.get("X-Timezone", "Asia/Seoul")
    try:
        ZoneInfo(x_timezone)
    except (ZoneInfoNotFoundError, KeyError):
        x_timezone = "Asia/Seoul"
    return await service.get_dashboard_data(db, dog_id, x_timezone)
