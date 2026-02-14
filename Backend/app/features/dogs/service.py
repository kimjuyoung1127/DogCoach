from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from fastapi import HTTPException

from app.shared.models import Dog, DogEnv
from app.features.dogs import schemas
from app.shared.utils.ownership import verify_dog_ownership


async def get_dog_full_profile(db: AsyncSession, user_id: str) -> dict:
    """
    Get full dog profile with survey data for authenticated user.
    Returns most recent dog.
    """
    try:
        uuid_obj = UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid User ID format")

    # Query most recent dog
    dog_query = select(Dog).where(Dog.user_id == uuid_obj).order_by(desc(Dog.created_at)).limit(1)
    dog_result = await db.execute(dog_query)
    dog = dog_result.scalars().first()

    if not dog:
        raise HTTPException(status_code=404, detail="No dog found")

    # Query dog_env
    env_query = select(DogEnv).where(DogEnv.dog_id == dog.id)
    env_result = await db.execute(env_query)
    env = env_result.scalars().first()

    return {
        "basic": {
            "id": str(dog.id),
            "name": dog.name,
            "breed": dog.breed,
            "birth_date": str(dog.birth_date) if dog.birth_date else None,
            "sex": dog.sex,
            "profile_image_url": dog.profile_image_url
        },
        "environment": env.household_info if env and env.household_info else {},
        "health": env.health_meta if env and env.health_meta else {},
        "rewards": env.rewards_meta if env and env.rewards_meta else {},
        "behavior": {
            "chronic_issues": env.chronic_issues if env and env.chronic_issues else [],
            "triggers": env.triggers if env and env.triggers else []
        },
        "past_attempts": env.past_attempts if env and env.past_attempts else [],
        "temperament": env.temperament if env and env.temperament else {}
    }


async def update_dog_profile(
    db: AsyncSession,
    user_id: str,
    update_data: schemas.DogProfileUpdate
) -> dict:
    """Update dog and dog_env data. Only provided fields will be updated."""
    try:
        uuid_obj = UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid User ID format")

    # Get most recent dog
    dog_query = select(Dog).where(Dog.user_id == uuid_obj).order_by(desc(Dog.created_at)).limit(1)
    dog_result = await db.execute(dog_query)
    dog = dog_result.scalars().first()

    if not dog:
        raise HTTPException(status_code=404, detail="No dog found")

    # Verify ownership
    await verify_dog_ownership(db, dog.id, user_id=user_id)

    # Update basic dog info (only if provided)
    if update_data.name is not None:
        dog.name = update_data.name
    if update_data.breed is not None:
        dog.breed = update_data.breed
    if update_data.birth_date is not None:
        dog.birth_date = update_data.birth_date
    if update_data.sex is not None:
        dog.sex = update_data.sex
    if update_data.profile_image_url is not None:
        dog.profile_image_url = update_data.profile_image_url

    # Get or create dog_env
    env_query = select(DogEnv).where(DogEnv.dog_id == dog.id)
    env_result = await db.execute(env_query)
    env = env_result.scalars().first()

    if not env:
        env = DogEnv(dog_id=dog.id)
        db.add(env)

    # Update JSONB fields (only if provided)
    if update_data.household_info is not None:
        env.household_info = update_data.household_info
    if update_data.health_meta is not None:
        env.health_meta = update_data.health_meta
    if update_data.rewards_meta is not None:
        env.rewards_meta = update_data.rewards_meta
    if update_data.chronic_issues is not None:
        env.chronic_issues = update_data.chronic_issues
    if update_data.triggers is not None:
        env.triggers = update_data.triggers
    if update_data.past_attempts is not None:
        env.past_attempts = update_data.past_attempts
    if update_data.temperament is not None:
        env.temperament = update_data.temperament

    await db.commit()
    await db.refresh(dog)
    await db.refresh(env)

    # Return updated profile
    return await get_dog_full_profile(db, user_id)
