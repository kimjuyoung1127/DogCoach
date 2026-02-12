from typing import List, Optional, Dict
from pydantic import BaseModel, ConfigDict
from enum import Enum
from uuid import UUID
from datetime import datetime, date

class TrainingStatus(str, Enum):
    COMPLETED = "COMPLETED"
    SKIPPED_INEFFECTIVE = "SKIPPED_INEFFECTIVE"
    SKIPPED_ALREADY_DONE = "SKIPPED_ALREADY_DONE"
    HIDDEN_BY_AI = "HIDDEN_BY_AI"


class CoachingRequest(BaseModel):
    dog_id: str
    issue: str # "Barking", "SeparationAnxiety"

class CoachingStep(BaseModel):
    step_number: int
    instruction: str

class CoachingResponse(BaseModel):
    title: str
    description: str
    steps: List[str]
    advice: Optional[str] = None

class AIAnalysisResponse(BaseModel):
    insight: str
    action_plan: str
    dog_voice: str
    raw_analysis: Optional[str] = None

class TrainingStatusUpdate(BaseModel):
    curriculum_id: str
    stage_id: str
    step_number: int
    status: TrainingStatus

class TrainingStatusResponse(TrainingStatusUpdate):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    created_at: datetime


class BehaviorSnapshotRequest(BaseModel):
    dog_id: str
    curriculum_id: str


class BehaviorSnapshotResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    curriculum_id: str
    snapshot_date: date
    total_logs: int
    avg_intensity: float
    log_frequency_per_week: float
    trigger_distribution: dict
    hourly_distribution: dict
    weekly_distribution: dict
    created_at: datetime


class BehaviorComparisonMetric(BaseModel):
    baseline: float
    latest: float
    delta: float
    change_rate_pct: float
    trend: str  # improved | worsened | same


class BehaviorSnapshotComparisonResponse(BaseModel):
    curriculum_id: str
    baseline_snapshot_id: UUID
    latest_snapshot_id: UUID
    baseline_date: date
    latest_date: date
    days_between: int
    avg_intensity: BehaviorComparisonMetric
    log_frequency_per_week: BehaviorComparisonMetric
    overall_trend: str  # improved | worsened | same


