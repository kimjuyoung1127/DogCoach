from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict
from app.shared.models import AssetType

class LogCreate(BaseModel):
    dog_id: UUID
    is_quick_log: bool = False
    
    # Detailed Log
    antecedent: Optional[str] = None
    behavior: Optional[str] = None
    consequence: Optional[str] = None
    
    intensity: int = Field(..., ge=1, le=10, description="1 to 10 scale")
    duration: Optional[int] = None # Seconds
    
    occurred_at: datetime # Frontend sends this (ISO 8601)

class LogResponse(LogCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
