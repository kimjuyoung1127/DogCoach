from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.auth import repository, schemas
from app.core.exceptions import NotFoundException, BadRequestException

async def get_my_profile(db: AsyncSession, user_id: str) -> schemas.UserResponse:
    try:
        uuid_obj = UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid User ID format")
        
    user = await repository.get_user_by_id(db, uuid_obj)
    
    if not user:
        # If user exists in Auth but not in public.users, they might need onboarding
        raise NotFoundException("User profile not found. Please complete onboarding.")
        
    return schemas.UserResponse.model_validate(user)
