from datetime import date
from typing import Optional, List, Any, Dict
from uuid import UUID
from pydantic import BaseModel, ConfigDict, model_validator
from app.shared.models import DogSex

# --- JSONB Field Models ---

class ProfileMeta(BaseModel):
    weight: Optional[float] = None
    adoption_date: Optional[date] = None

class PrimaryCarerMeta(BaseModel):
    ids: List[str] = []
    other_text: Optional[str] = None

class HouseholdInfo(BaseModel):
    type: Optional[str] = None  # Apartment, House, etc.
    family_count: Optional[int] = None
    primary_carer: PrimaryCarerMeta = PrimaryCarerMeta()

class HealthMeta(BaseModel):
    ids: List[str] = [] # Pre-existing conditions
    other_text: Optional[str] = None

class RewardsMeta(BaseModel):
    ids: List[str] = []
    other_text: Optional[str] = None
    play_style: Optional[str] = None

class ChronicIssues(BaseModel):
    top_issues: List[str] = [] # Top 3 issues
    other_text: Optional[str] = None

class TriggersInfo(BaseModel):
    ids: List[str] = []
    other_text: Optional[str] = None

class PastAttemptsInfo(BaseModel):
    ids: List[str] = []
    other_text: Optional[str] = None

class Temperament(BaseModel):
    sensitivity_score: Optional[int] = None # 1-5
    energy_level: Optional[int] = None # 1-5
    
# --- Main Submission Model ---

class SurveySubmission(BaseModel):
    # Step 1: Basic Info (필수: name, breed)
    name: str
    breed: str  # 필수로 변경 (Optional 제거)
    birth_date: Optional[date] = None  # 선택
    sex: Optional[DogSex] = None  # 선택
    profile_meta: ProfileMeta = ProfileMeta()  # 선택

    # Step 2: Environment (선택)
    household_info: HouseholdInfo = HouseholdInfo()

    # Step 3: Health & Nutrition (선택)
    health_meta: HealthMeta = HealthMeta()
    rewards_meta: RewardsMeta = RewardsMeta()

    # Step 4: Behavior (필수: chronic_issues)
    chronic_issues: ChronicIssues

    # Step 5: Triggers (필수: triggers)
    triggers: TriggersInfo

    # Step 6: Past Attempts (선택)
    past_attempts: PastAttemptsInfo = PastAttemptsInfo()

    # Step 7: Temperament (선택)
    temperament: Temperament = Temperament()

    # Extra
    profile_image_url: Optional[str] = None
    activity_meta: Dict[str, Any] = {} # Reserved for future use

    @model_validator(mode='after')
    def validate_core_behavior(self):
        """행동 데이터 검증: 필수 필드 확인"""
        if not self.chronic_issues.top_issues:
            raise ValueError("최소 1개 이상의 행동 문제를 선택해주세요")
        if not self.triggers.ids:
            raise ValueError("최소 1개 이상의 트리거를 선택해주세요")
        return self

    @staticmethod
    def sanitize_empty_strings(data: Any) -> Any:
        if isinstance(data, dict):
            return {k: SurveySubmission.sanitize_empty_strings(v) for k, v in data.items()}
        if isinstance(data, list):
            return [SurveySubmission.sanitize_empty_strings(v) for v in data]
        if data == "":
            return None
        return data

    @model_validator(mode='before')
    @classmethod
    def check_empty_strings(cls, data: Any) -> Any:
        return cls.sanitize_empty_strings(data)

class DogResponse(BaseModel):
    id: UUID
    name: str
    breed: Optional[str] = None
    created_at: Any
    
    model_config = ConfigDict(from_attributes=True)
