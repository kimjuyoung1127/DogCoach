from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, func as sqlfunc
from typing import List, Optional
from app.shared.models import Dog, DogEnv, BehaviorLog, UserTrainingStatus, TrainingBehaviorSnapshot
from sqlalchemy.dialects.postgresql import insert

from app.features.coach import schemas, templates, prompts
from app.shared.clients.ai_client import ai_client
from fastapi import HTTPException

async def generate_coaching(db: AsyncSession, request: schemas.CoachingRequest) -> schemas.CoachingResponse:
    # 1. Fetch Dog & Env
    query = select(Dog).where(Dog.id == request.dog_id)
    result = await db.execute(query)
    dog = result.scalar_one_or_none()
    
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")
        
    # Lazy load or explicit join for env if needed (SQLAlchemy async relationship loading)
    # We didn't enable eager loading in models, so we fetch env separately or rely on awaitable attr
    # Let's fetch strict join to be safe and fast
    query_env = select(DogEnv).where(DogEnv.dog_id == request.dog_id)
    result_env = await db.execute(query_env)
    dog_env = result_env.scalar_one_or_none()
    
    if not dog_env:
        # Should not happen if survey completed
        raise HTTPException(status_code=404, detail="Dog Environment data missing")

    # 2. Get Template
    template = templates.get_template(request.issue)
    if not template:
        raise HTTPException(status_code=400, detail="Unknown issue type or no template available")

    # 3. Prepare Variables for Slot Filling
    # Safely get values with defaults
    variables = {
        "name": dog.name,
        "breed": dog.breed or "강아지",
        "treat": "간식",
        "trigger": "자극",
        "primary_carer": "보호자"
    }

    # Extract from JSONB fields
    if dog_env.rewards_meta:
        # Support new structure: {"ids": [...], "other_text": "..."}
        # and old structure: {"favorite_treats": [...]}
        ids = dog_env.rewards_meta.get("ids") or dog_env.rewards_meta.get("favorite_treats") or []
        other = dog_env.rewards_meta.get("other_text")
        
        if other and "etc" in ids:
            variables["treat"] = other
        elif ids and len(ids) > 0:
            variables["treat"] = ids[0]

    if dog_env.triggers:
        # Support new structure and fallback to old list
        if isinstance(dog_env.triggers, dict):
            ids = dog_env.triggers.get("ids", [])
            other = dog_env.triggers.get("other_text")
            if other and "etc" in ids:
                variables["trigger"] = other
            elif ids and len(ids) > 0:
                variables["trigger"] = ids[0]
        elif isinstance(dog_env.triggers, list) and len(dog_env.triggers) > 0:
            variables["trigger"] = dog_env.triggers[0]

    if dog_env.household_info and "primary_carer" in dog_env.household_info:
        carer_data = dog_env.household_info["primary_carer"]
        if isinstance(carer_data, dict):
            # New structured format
            ids = carer_data.get("ids", [])
            other = carer_data.get("other_text")
            
            # Map "etc" to other_text and join all
            carers = []
            for c in ids:
                if c == "etc" and other:
                    carers.append(other)
                else:
                    carers.append(c)
            
            if carers:
                variables["primary_carer"] = ", ".join(carers)
        else:
            # Old string format
            variables["primary_carer"] = carer_data

    # 4. Fill Slots (String Replacement)
    # We do a simple replacement for now. Jinja2 could be used for more complex logic.
    
    def fill(text: str) -> str:
        for key, val in variables.items():
            text = text.replace(f"{{{{{key}}}}}", str(val)) # {{key}}
        return text

    filled_title = fill(template["title"])
    filled_desc = fill(template["description"])
    filled_steps = [fill(step) for step in template["steps"]]
    
    # 5. Tone Adjustment (Simple Logic)
    advice = ""
    sensitivity = 3
    if dog_env.temperament and "sensitivity_score" in dog_env.temperament:
        sensitivity = dog_env.temperament.get("sensitivity_score", 3)
        
    if sensitivity >= 4:
        advice = template.get("tone_adjustment", {}).get("high_sensitivity", "")
    elif sensitivity <= 2:
        advice = template.get("tone_adjustment", {}).get("low_sensitivity", "")

    return schemas.CoachingResponse(
        title=filled_title,
        description=filled_desc,
        steps=filled_steps,
        advice=advice
    )

async def analyze_behavior_with_ai(db: AsyncSession, dog_id: str) -> schemas.AIAnalysisResponse:
    # 1. Fetch Data
    # Dog Profile
    dog = await db.scalar(select(Dog).where(Dog.id == dog_id))
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")
        
    # Dog Environment
    env = await db.scalar(select(DogEnv).where(DogEnv.dog_id == dog_id))
    env_data = env.__dict__ if env else {}

    # Recent Logs (Latest 10)
    logs_result = await db.execute(
        select(BehaviorLog)
        .where(BehaviorLog.dog_id == dog_id)
        .order_by(BehaviorLog.occurred_at.desc())
        .limit(10)
    )
    logs = logs_result.scalars().all()
    logs_list = [
        {
            "occurred_at": log.occurred_at.strftime("%Y-%m-%d %H:%M"),
            "antecedent": log.antecedent,
            "behavior": log.behavior,
            "consequence": log.consequence,
            "intensity": log.intensity
        }
        for log in logs
    ]

    # 2. Build Prompt
    dog_info = {
        "name": dog.name,
        "breed": dog.breed,
        "age": dog.age,
        "sex": dog.sex
    }
    
    prompt = prompts.create_analysis_prompt(dog_info, env_data, logs_list)
    system_prompt = prompts.SYSTEM_PROMPT

    # 3. Call AI
    ai_response_text = await ai_client.generate_response(prompt, system_prompt)

    # 4. Parse Response (Simple heuristic for now, assuming LLM follows structure)
    # Ideally, use structured output from LLM, but for Qwen-1.5B, we parse manually or just return
    sections = ai_response_text.split("\n\n")
    
    insight = "진단 결과 데이터를 생성 중입니다."
    action_plan = "솔루션을 생성 중입니다."
    dog_voice = "강아지의 마음을 읽고 있습니다."

    for i, section in enumerate(sections):
        if "종합 진단" in section or "1." in section:
            insight = section.strip()
        elif "맞춤 솔루션" in section or "3." in section:
            action_plan = section.strip()
        elif "강아지의 속마음" in section or "4." in section:
            dog_voice = section.strip()

    return schemas.AIAnalysisResponse(
        insight=insight,
        action_plan=action_plan,
        dog_voice=dog_voice,
        raw_analysis=ai_response_text
    )

async def update_training_status(
    db: AsyncSession, 
    user_id: str, 
    update: schemas.TrainingStatusUpdate
) -> UserTrainingStatus:
    # SQL Upsert (PostgreSQL specific)
    stmt = insert(UserTrainingStatus).values(
        user_id=user_id,
        curriculum_id=update.curriculum_id,
        stage_id=update.stage_id,
        step_number=update.step_number,
        status=update.status
    )
    
    # On conflict, update status
    # Note: unique constraint must exist on (user_id, curriculum_id, stage_id, step_number)
    stmt = stmt.on_conflict_do_update(
        index_elements=['user_id', 'curriculum_id', 'stage_id', 'step_number'],
        set_={'status': update.status}
    ).returning(UserTrainingStatus)
    
    result = await db.execute(stmt)
    await db.commit()
    return result.scalar_one()

async def get_training_statuses(db: AsyncSession, user_id: str):
    query = select(UserTrainingStatus).where(UserTrainingStatus.user_id == user_id)
    result = await db.execute(query)
    return result.scalars().all()

async def delete_training_status(
    db: AsyncSession,
    user_id: str,
    curriculum_id: str,
    stage_id: str,
    step_number: int
):
    stmt = delete(UserTrainingStatus).where(
        UserTrainingStatus.user_id == user_id,
        UserTrainingStatus.curriculum_id == curriculum_id,
        UserTrainingStatus.stage_id == stage_id,
        UserTrainingStatus.step_number == step_number
    )
    await db.execute(stmt)
    await db.commit()
    return True


async def create_behavior_snapshot(
    db: AsyncSession,
    user_id: str,
    dog_id: str,
    curriculum_id: str,
) -> Optional[TrainingBehaviorSnapshot]:
    # Compute stats from behavior_logs (last 30 days)
    cutoff = date.today() - timedelta(days=30)
    logs_query = select(BehaviorLog).where(
        BehaviorLog.dog_id == dog_id,
        BehaviorLog.occurred_at >= cutoff,
    )
    result = await db.execute(logs_query)
    logs = result.scalars().all()

    total_logs = len(logs)
    avg_intensity = 0.0
    trigger_dist: dict = {}
    hourly_dist: dict = {}
    weekly_dist: dict = {}

    if total_logs > 0:
        intensities = [l.intensity for l in logs if l.intensity is not None]
        avg_intensity = round(sum(intensities) / len(intensities), 2) if intensities else 0.0

        for log in logs:
            if log.antecedent:
                trigger_dist[log.antecedent] = trigger_dist.get(log.antecedent, 0) + 1
            if log.occurred_at:
                h = str(log.occurred_at.hour)
                hourly_dist[h] = hourly_dist.get(h, 0) + 1
                d = str(log.occurred_at.weekday())
                weekly_dist[d] = weekly_dist.get(d, 0) + 1

    freq_per_week = round(total_logs / 4.3, 2) if total_logs > 0 else 0.0

    snapshot = TrainingBehaviorSnapshot(
        user_id=user_id,
        dog_id=dog_id,
        curriculum_id=curriculum_id,
        snapshot_date=date.today(),
        total_logs=total_logs,
        avg_intensity=avg_intensity,
        log_frequency_per_week=freq_per_week,
        trigger_distribution=trigger_dist,
        hourly_distribution=hourly_dist,
        weekly_distribution=weekly_dist,
    )
    db.add(snapshot)
    await db.commit()
    await db.refresh(snapshot)
    return snapshot


async def get_behavior_snapshot(
    db: AsyncSession,
    user_id: str,
    dog_id: str,
    curriculum_id: str,
) -> Optional[TrainingBehaviorSnapshot]:
    return await db.scalar(
        select(TrainingBehaviorSnapshot)
        .where(
            TrainingBehaviorSnapshot.user_id == user_id,
            TrainingBehaviorSnapshot.dog_id == dog_id,
            TrainingBehaviorSnapshot.curriculum_id == curriculum_id,
        )
        .order_by(TrainingBehaviorSnapshot.created_at.desc())
    )


def _metric_trend(delta: float) -> str:
    if delta < 0:
        return "improved"
    if delta > 0:
        return "worsened"
    return "same"


def _build_metric(baseline: float, latest: float) -> schemas.BehaviorComparisonMetric:
    delta = round(latest - baseline, 2)
    base = baseline if baseline != 0 else 1.0
    change_rate_pct = round((delta / base) * 100, 2)
    return schemas.BehaviorComparisonMetric(
        baseline=round(baseline, 2),
        latest=round(latest, 2),
        delta=delta,
        change_rate_pct=change_rate_pct,
        trend=_metric_trend(delta),
    )


async def get_behavior_snapshot_comparison(
    db: AsyncSession,
    user_id: str,
    dog_id: str,
    curriculum_id: str,
) -> Optional[schemas.BehaviorSnapshotComparisonResponse]:
    snapshots = (
        await db.execute(
            select(TrainingBehaviorSnapshot)
            .where(
                TrainingBehaviorSnapshot.user_id == user_id,
                TrainingBehaviorSnapshot.dog_id == dog_id,
                TrainingBehaviorSnapshot.curriculum_id == curriculum_id,
            )
            .order_by(TrainingBehaviorSnapshot.created_at.asc())
        )
    ).scalars().all()

    if len(snapshots) < 2:
        return None

    baseline = snapshots[0]
    latest = snapshots[-1]
    days_between = (latest.snapshot_date - baseline.snapshot_date).days

    intensity_metric = _build_metric(float(baseline.avg_intensity or 0), float(latest.avg_intensity or 0))
    frequency_metric = _build_metric(
        float(baseline.log_frequency_per_week or 0),
        float(latest.log_frequency_per_week or 0),
    )

    trend_scores = [intensity_metric.trend, frequency_metric.trend]
    improved = trend_scores.count("improved")
    worsened = trend_scores.count("worsened")
    overall = "same"
    if improved > worsened:
        overall = "improved"
    elif worsened > improved:
        overall = "worsened"

    return schemas.BehaviorSnapshotComparisonResponse(
        curriculum_id=curriculum_id,
        baseline_snapshot_id=baseline.id,
        latest_snapshot_id=latest.id,
        baseline_date=baseline.snapshot_date,
        latest_date=latest.snapshot_date,
        days_between=days_between,
        avg_intensity=intensity_metric,
        log_frequency_per_week=frequency_metric,
        overall_trend=overall,
    )


