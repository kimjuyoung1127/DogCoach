"""API endpoints for AI recommendations.

Mounts under /api/v1/coach alongside existing coach routes.
No conflicts: existing routes are /generate, /status.
New routes: /recommendations, /recommendations/latest, /recommendations/{id}/feedback, /cost-status.
"""

from typing import Literal, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id, get_current_user_id_optional
from app.features.auth import repository as auth_repository
from app.shared.utils.ownership import verify_dog_ownership

from . import service
from .schemas import (
    CostStatusResponse,
    FeedbackRequest,
    FeedbackResponse,
    RecommendationRequest,
    RecommendationResponse,
)

router = APIRouter()


@router.post("/recommendations", response_model=RecommendationResponse)
async def generate_recommendations(
    http_request: Request,
    request: RecommendationRequest,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db),
):
    """Generate or return cached AI recommendations."""
    guest_id = http_request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, UUID(request.dog_id), user_id, guest_id)
    return await service.generate_recommendations(db, request, user_id, guest_id)


@router.get("/recommendations/latest", response_model=RecommendationResponse)
async def get_latest_recommendations(
    http_request: Request,
    dog_id: str,
    window_days: Literal[7, 15, 30] = 7,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db),
):
    """Get latest cached recommendation (no generation)."""
    guest_id = http_request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, UUID(dog_id), user_id, guest_id)
    return await service.get_latest_recommendations(db, dog_id, window_days)


@router.post(
    "/recommendations/{snapshot_id}/feedback",
    response_model=FeedbackResponse,
)
async def submit_feedback(
    http_request: Request,
    snapshot_id: UUID,
    request: FeedbackRequest,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db),
):
    """Submit feedback on a recommendation. No LLM call."""
    guest_id = http_request.cookies.get("anonymous_sid")
    return await service.submit_feedback(
        db, str(snapshot_id), request, user_id, guest_id
    )


@router.get("/cost-status", response_model=CostStatusResponse)
async def get_cost_status(
    http_request: Request,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get current AI budget status. Admin only."""
    role = await auth_repository.get_user_role_by_id(db, UUID(user_id))
    if role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    guest_id = http_request.cookies.get("anonymous_sid")
    return await service.get_cost_status(db, user_id, guest_id)
