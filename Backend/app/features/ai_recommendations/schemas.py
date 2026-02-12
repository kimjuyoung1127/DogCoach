from datetime import datetime
from enum import Enum
from typing import List, Optional, Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class RecommendationRequest(BaseModel):
    dog_id: str
    window_days: Literal[7, 15, 30] = Field(default=7, description="7, 15, or 30")
    issue: str = Field(default="general", description="e.g. Barking, SeparationAnxiety")
    force_refresh: bool = False


class RecommendationItem(BaseModel):
    title: str
    description: str
    priority: int


class RecommendationResponse(BaseModel):
    id: UUID
    dog_id: UUID
    window_days: int
    recommendations: List[RecommendationItem]
    rationale: str
    period_comparison: Optional[str] = None
    created_at: datetime
    expires_at: datetime

    model_config = ConfigDict(from_attributes=True)


class FeedbackAction(str, Enum):
    ARCHIVE = "archive"
    HELPFUL = "helpful"
    NOT_HELPFUL = "not_helpful"


class FeedbackRequest(BaseModel):
    recommendation_index: int = Field(..., ge=0, le=2)
    action: FeedbackAction
    note: Optional[str] = None


class FeedbackResponse(BaseModel):
    id: UUID
    snapshot_id: UUID
    action: FeedbackAction
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CostStatusResponse(BaseModel):
    daily_cost_usd: float
    daily_budget_usd: float
    daily_calls: int
    monthly_cost_usd: float
    monthly_budget_usd: float
    budget_mode: str  # "normal", "saving_mode", "rule_only"
    user_remaining_today: int
