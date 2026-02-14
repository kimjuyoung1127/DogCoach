from datetime import date, datetime
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from app.shared.models import DogSex

class QuickLogStats(BaseModel):
    total_logs: int
    current_streak: int
    last_logged_at: Optional[datetime]

class RecentLogItem(BaseModel):
    id: UUID
    behavior: str
    intensity: int
    occurred_at: datetime
    antecedent: Optional[str] = None
    consequence: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class DashboardDogProfile(BaseModel):
    id: UUID
    name: str
    breed: Optional[str] = None
    age_months: Optional[int] = None # Calculated field
    profile_image_url: Optional[str] = None

class DashboardResponse(BaseModel):
    dog_profile: DashboardDogProfile
    stats: QuickLogStats
    recent_logs: List[RecentLogItem]
    issues: List[str] = []
    env_triggers: List[str] = []
    env_consequences: List[str] = []
    # Optional survey completion metadata
    env_info: Optional[dict] = None
    health_meta: Optional[dict] = None
    rewards_meta: Optional[dict] = None
    past_attempts: Optional[dict] = None
    temperament: Optional[dict] = None
    profile_meta: Optional[dict] = None
