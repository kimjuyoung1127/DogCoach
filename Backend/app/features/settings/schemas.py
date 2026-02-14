from datetime import datetime
from typing import Optional, Literal
from uuid import UUID
from pydantic import BaseModel, ConfigDict


# Nested Schemas (Frontend types.ts와 정확히 일치)
class ChannelsSchema(BaseModel):
    alimtalk: bool = True
    push: bool = True
    email: bool = False


class TypesSchema(BaseModel):
    reminder: bool = True
    weekly_report: bool = True
    marketing: bool = False


class QuietHoursSchema(BaseModel):
    enabled: bool = False
    start: str = "22:00"  # HH:mm
    end: str = "07:00"


class NotificationPrefSchema(BaseModel):
    channels: ChannelsSchema = ChannelsSchema()
    types: TypesSchema = TypesSchema()
    quiet_hours: QuietHoursSchema = QuietHoursSchema()
    remind_time: str = "20:00"


class AiPersonaSchema(BaseModel):
    tone: Literal["EMPATHETIC", "SOLUTION"] = "EMPATHETIC"
    perspective: Literal["COACH", "DOG"] = "COACH"


# Request/Response Schemas
class UserSettingsUpdate(BaseModel):
    notification_pref: Optional[NotificationPrefSchema] = None
    ai_persona: Optional[AiPersonaSchema] = None
    marketing_agreed: Optional[bool] = None


class UserSettingsResponse(BaseModel):
    id: UUID
    user_id: UUID
    notification_pref: NotificationPrefSchema
    ai_persona: AiPersonaSchema
    marketing_agreed: bool
    marketing_agreed_at: Optional[datetime] = None
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
