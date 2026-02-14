from typing import Dict, Any, Optional
from datetime import date
from pydantic import BaseModel, ConfigDict
from app.shared.models import DogSex


class DogProfileFull(BaseModel):
    basic: Dict[str, Any]
    environment: Dict[str, Any]
    health: Dict[str, Any]
    rewards: Dict[str, Any]
    behavior: Dict[str, Any]
    past_attempts: Dict[str, Any]
    temperament: Dict[str, Any]

    model_config = ConfigDict(from_attributes=True)


class DogProfileUpdate(BaseModel):
    """Schema for updating dog profile"""
    # Basic info (all optional)
    name: Optional[str] = None
    breed: Optional[str] = None
    birth_date: Optional[date] = None
    sex: Optional[DogSex] = None
    profile_image_url: Optional[str] = None

    # Environment data (optional JSONB)
    household_info: Optional[Dict[str, Any]] = None
    health_meta: Optional[Dict[str, Any]] = None
    rewards_meta: Optional[Dict[str, Any]] = None
    chronic_issues: Optional[Dict[str, Any]] = None
    triggers: Optional[Dict[str, Any]] = None
    past_attempts: Optional[Dict[str, Any]] = None
    temperament: Optional[Dict[str, Any]] = None
