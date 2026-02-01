from uuid import UUID
from fastapi import APIRouter, Depends, status, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id, get_current_user_id_optional
from app.features.onboarding import service, schemas
from typing import Optional
import traceback

router = APIRouter()

@router.post("/survey", response_model=schemas.DogResponse, status_code=status.HTTP_201_CREATED)
async def submit_onboarding_survey(
    request: Request,
    response: Response,
    data: schemas.SurveySubmission,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    """
    Submit onboarding survey to create a new Dog profile.
    Automatically generates DogEnv and initial BehaviorLog.
    """


    
    try:
        # 1. Resolve User ID (Login User)
        user_uuid = UUID(user_id) if user_id else None
        
        # 2. Resolve Guest ID (Cookie)
        guest_id = request.cookies.get("anonymous_sid")
        
        # 3. If neither, create new Guest ID
        is_new_guest = False
        if not user_uuid and not guest_id:
            from uuid import uuid4
            guest_id = str(uuid4())
            is_new_guest = True
            
        print(f"DEBUG: Processing survey. User={user_uuid}, Guest={guest_id}")
        print(f"DEBUG: Survey Data: {data.model_dump()}")
        
        # 4. Call Service
        result = await service.submit_survey(db, user_uuid, guest_id, data)
        
        # 5. Set Cookie if new guest
        if is_new_guest:
            response.set_cookie(key="anonymous_sid", value=guest_id, httponly=True, max_age=31536000) # 1 year
            
        print(f"DEBUG: Survey Submitted Successfully: {result.id}")
        return result
    except Exception as e:
        print("ERROR IN SUBMIT SURVEY:")
        traceback.print_exc()
        raise e
