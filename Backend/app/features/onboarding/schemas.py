from datetime import date
from typing import Optional, List, Any, Dict
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from app.shared.models import DogSex

# --- JSONB Field Models ---

class ProfileMeta(BaseModel):
    weight: Optional[float] = None
    adoption_date: Optional[date] = None

class HouseholdInfo(BaseModel):
    type: Optional[str] = None  # Apartment, House, etc.
    family_count: Optional[int] = None
    primary_carer: Optional[str] = None

class HealthMeta(BaseModel):
    issues: List[str] = [] # Pre-existing conditions

class RewardsMeta(BaseModel):
    favorite_treats: List[str] = []
    play_style: Optional[str] = None

class ChronicIssues(BaseModel):
    top_issues: List[str] = [] # Top 3 issues

class Temperament(BaseModel):
    sensitivity_score: Optional[int] = None # 1-5
    energy_level: Optional[int] = None # 1-5
    
# --- Main Submission Model ---

class SurveySubmission(BaseModel):
    # Step 1: Basic Info
    name: str
    breed: Optional[str] = None
    birth_date: Optional[date] = None
    sex: Optional[DogSex] = None
    profile_meta: ProfileMeta = ProfileMeta()
    
    # Step 2: Environment
    household_info: HouseholdInfo = HouseholdInfo()
    
    # Step 3: Health & Nutrition
    health_meta: HealthMeta = HealthMeta()
    rewards_meta: RewardsMeta = RewardsMeta()
    
    # Step 4: Behavior (Chronic Issues -> Seed Data)
    chronic_issues: ChronicIssues = ChronicIssues()
    
    # Step 5: Triggers
    triggers: List[str] = [] # Stored as JSONB
    
    # Step 6: Past Attempts
    past_attempts: List[str] = [] # Stored as JSONB
    
    # Step 7: Temperament
    temperament: Temperament = Temperament()
    
    # Extra
    profile_image_url: Optional[str] = None
    activity_meta: Dict[str, Any] = {} # Reserved for future use

class DogResponse(BaseModel):
    id: UUID
    name: str
    breed: Optional[str] = None
    created_at: Any
    
    model_config = ConfigDict(from_attributes=True)
