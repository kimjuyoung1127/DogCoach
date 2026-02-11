from uuid import UUID
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.shared.models import Dog


async def verify_dog_ownership(
    db: AsyncSession,
    dog_id: UUID,
    user_id: Optional[str] = None,
    guest_id: Optional[str] = None,
) -> Dog:
    """
    Verify that the given dog belongs to the requesting user or guest.
    Returns the Dog object if ownership is confirmed.
    Raises 404 if dog not found, 403 if access denied.
    """
    stmt = select(Dog).where(Dog.id == dog_id)
    result = await db.execute(stmt)
    dog = result.scalar_one_or_none()

    if not dog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dog not found"
        )

    # Check user ownership
    if user_id and dog.user_id and str(dog.user_id) == user_id:
        return dog

    # Check guest ownership
    if guest_id and dog.anonymous_sid and dog.anonymous_sid == guest_id:
        return dog

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Access denied: you do not own this dog"
    )
