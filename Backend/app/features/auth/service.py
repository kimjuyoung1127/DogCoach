from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.auth import repository, schemas
from app.core.exceptions import NotFoundException, BadRequestException
from app.shared.models import User


async def get_my_profile(db: AsyncSession, user_id: str) -> schemas.UserResponse:
    try:
        uuid_obj = UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid User ID format")

    user = await repository.get_user_by_id(db, uuid_obj)

    if not user:
        # If user exists in Auth but not in public.users, they might need onboarding
        raise NotFoundException("User profile not found. Please complete onboarding.")

    response = schemas.UserResponse.model_validate(user)

    # Fetch latest dog
    latest_dog = await repository.get_latest_dog_by_user(db, uuid_obj)
    if latest_dog:
        response.latest_dog_id = latest_dog.id
        response.latest_dog_name = latest_dog.name

    return response


async def migrate_guest_data(
    db: AsyncSession, user_id: str, anonymous_sid: str
) -> schemas.MigrateGuestResponse:
    """
    Transfer guest dog data to an authenticated user.
    Idempotent: calling multiple times returns migrated_count=0 on subsequent calls.
    """
    try:
        user_uuid = UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid User ID format")

    # JIT user creation (same pattern as onboarding/repository.py)
    user = await repository.get_user_by_id(db, user_uuid)
    if not user:
        user = User(id=user_uuid, role="USER")
        db.add(user)
        await db.flush()

    # Find guest dogs
    guest_dogs = await repository.find_guest_dogs(db, anonymous_sid)
    if not guest_dogs:
        return schemas.MigrateGuestResponse(migrated_count=0, dog_ids=[])

    # Transfer ownership
    dog_ids = [dog.id for dog in guest_dogs]
    count = await repository.claim_dogs_for_user(db, dog_ids, user_uuid)

    return schemas.MigrateGuestResponse(
        migrated_count=count,
        dog_ids=[str(did) for did in dog_ids]
    )
