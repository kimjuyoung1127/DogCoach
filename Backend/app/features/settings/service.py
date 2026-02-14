from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.settings import repository, schemas
from app.core.exceptions import BadRequestException


async def get_settings_with_defaults(
    db: AsyncSession,
    user_id: str
) -> schemas.UserSettingsResponse:
    """
    Get user settings, creating with defaults if not exists (JIT pattern).
    Reference: app/features/auth/service.py:44-48
    """
    try:
        uuid_obj = UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid User ID format")

    settings = await repository.get_user_settings(db, uuid_obj)

    if not settings:
        # JIT creation with defaults
        defaults = {
            "notification_pref": schemas.NotificationPrefSchema().model_dump(),
            "ai_persona": schemas.AiPersonaSchema().model_dump()
        }
        settings = await repository.create_user_settings(db, uuid_obj, defaults)

    return schemas.UserSettingsResponse.model_validate(settings)


async def update_settings(
    db: AsyncSession,
    user_id: str,
    updates: schemas.UserSettingsUpdate
) -> schemas.UserSettingsResponse:
    """Update user settings with partial data (JSONB merge)"""
    try:
        uuid_obj = UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid User ID format")

    settings = await repository.get_user_settings(db, uuid_obj)

    if not settings:
        # JIT creation if updating before first GET
        defaults = {
            "notification_pref": schemas.NotificationPrefSchema().model_dump(),
            "ai_persona": schemas.AiPersonaSchema().model_dump()
        }
        settings = await repository.create_user_settings(db, uuid_obj, defaults)

    # Prepare update dict (only non-None values)
    update_dict = {}
    if updates.notification_pref is not None:
        update_dict["notification_pref"] = updates.notification_pref.model_dump()
    if updates.ai_persona is not None:
        update_dict["ai_persona"] = updates.ai_persona.model_dump()
    if updates.marketing_agreed is not None:
        update_dict["marketing_agreed"] = updates.marketing_agreed
        if updates.marketing_agreed:
            update_dict["marketing_agreed_at"] = datetime.now(timezone.utc)

    settings = await repository.update_user_settings(db, settings, update_dict)
    return schemas.UserSettingsResponse.model_validate(settings)
