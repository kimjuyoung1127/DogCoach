from typing import List, Optional, Dict
from pydantic import BaseModel

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
