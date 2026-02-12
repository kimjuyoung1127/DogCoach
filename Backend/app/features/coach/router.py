from uuid import UUID
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from app.core.database import get_db
from app.features.coach import service, schemas
from app.core.security import get_current_user_id, get_current_user_id_optional
from app.shared.utils.ownership import verify_dog_ownership

router = APIRouter()

@router.post("/generate", response_model=schemas.CoachingResponse)
async def generate_coaching_advice(
    http_request: Request,
    request: schemas.CoachingRequest,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db)
):
    guest_id = http_request.cookies.get("anonymous_sid")
    await verify_dog_ownership(db, UUID(request.dog_id), user_id, guest_id)
    return await service.generate_coaching(db, request)


@router.post("/analyze/{dog_id}", response_model=schemas.AIAnalysisResponse)
async def analyze_behavior(
    dog_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    await verify_dog_ownership(db, UUID(dog_id), user_id, None)
    return await service.analyze_behavior_with_ai(db, dog_id)


@router.post("/status", response_model=schemas.TrainingStatusResponse)
async def update_training_status(
    request: schemas.TrainingStatusUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    return await service.update_training_status(db, user_id, request)


@router.get("/status", response_model=list[schemas.TrainingStatusResponse])
async def get_training_statuses(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    return await service.get_training_statuses(db, user_id)


@router.delete("/status/{curriculum_id}/{stage_id}/{step_number}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_training_status(
    curriculum_id: str,
    stage_id: str,
    step_number: int,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    await service.delete_training_status(db, user_id, curriculum_id, stage_id, step_number)
    return None


@router.post("/behavior-snapshot", response_model=schemas.BehaviorSnapshotResponse, status_code=status.HTTP_201_CREATED)
async def create_behavior_snapshot(
    request: schemas.BehaviorSnapshotRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    await verify_dog_ownership(db, UUID(request.dog_id), user_id, None)
    try:
        snapshot = await service.create_behavior_snapshot(db, user_id, request.dog_id, request.curriculum_id)
    except IntegrityError:
        raise HTTPException(status_code=409, detail="Snapshot already exists for this curriculum")
    return snapshot


@router.get("/behavior-snapshot/compare", response_model=schemas.BehaviorSnapshotComparisonResponse)
async def compare_behavior_snapshots(
    dog_id: str,
    curriculum_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    await verify_dog_ownership(db, UUID(dog_id), user_id, None)
    comparison = await service.get_behavior_snapshot_comparison(db, user_id, dog_id, curriculum_id)
    if comparison is None:
        raise HTTPException(status_code=404, detail="At least two snapshots are required")
    return comparison


@router.get("/behavior-snapshot/{curriculum_id}", response_model=schemas.BehaviorSnapshotResponse)
async def get_behavior_snapshot(
    curriculum_id: str,
    dog_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    await verify_dog_ownership(db, UUID(dog_id), user_id, None)
    snapshot = await service.get_behavior_snapshot(db, user_id, dog_id, curriculum_id)
    if snapshot is None:
        raise HTTPException(status_code=404, detail="Snapshot not found")
    return snapshot
