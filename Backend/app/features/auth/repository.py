from uuid import UUID
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, update as sa_update
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


async def find_guest_dogs(db: AsyncSession, anonymous_sid: str) -> List[Dog]:
    """Find all dogs belonging to a guest (anonymous_sid set, user_id is NULL)."""
    stmt = (
        select(Dog)
        .where(Dog.anonymous_sid == anonymous_sid)
        .where(Dog.user_id.is_(None))
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def claim_dogs_for_user(db: AsyncSession, dog_ids: List[UUID], user_id: UUID) -> int:
    """
    Transfer guest dogs to an authenticated user.
    Idempotent: only updates dogs where user_id IS NULL.
    """
    if not dog_ids:
        return 0
    stmt = (
        sa_update(Dog)
        .where(Dog.id.in_(dog_ids))
        .where(Dog.user_id.is_(None))
        .values(user_id=user_id)
    )
    result = await db.execute(stmt)
    await db.commit()
    return result.rowcount
