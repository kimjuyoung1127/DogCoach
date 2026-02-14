from typing import Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.shared.models import UserSettings


async def get_user_settings(db: AsyncSession, user_id: UUID) -> Optional[UserSettings]:
    """Fetch user settings by user_id"""
    stmt = select(UserSettings).where(UserSettings.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().first()


async def create_user_settings(
    db: AsyncSession,
    user_id: UUID,
    defaults: dict
) -> UserSettings:
    """Create new settings record with defaults"""
    settings = UserSettings(
        user_id=user_id,
        notification_pref=defaults["notification_pref"],
        ai_persona=defaults["ai_persona"],
        marketing_agreed=False
    )
    db.add(settings)
    await db.commit()
    await db.refresh(settings)
    return settings


async def update_user_settings(
    db: AsyncSession,
    settings: UserSettings,
    updates: dict
) -> UserSettings:
    """Update existing settings with partial data"""
    for key, value in updates.items():
        if value is not None:
            setattr(settings, key, value)

    await db.commit()
    await db.refresh(settings)
    return settings
