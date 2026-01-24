from uuid import UUID
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.shared.models import User, Dog

async def get_user_by_id(db: AsyncSession, user_id: UUID) -> Optional[User]:
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    return result.scalars().first()

async def get_latest_dog_by_user(db: AsyncSession, user_id: UUID) -> Optional[Dog]:
    stmt = (
        select(Dog)
        .where(Dog.user_id == user_id)
        .order_by(desc(Dog.created_at))
        .limit(1)
    )
    result = await db.execute(stmt)
    return result.scalars().first()
