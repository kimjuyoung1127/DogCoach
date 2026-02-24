"""
코칭 알고리즘 및 행동 로그 분석을 담당하는 서비스 레이어입니다.
개인화된 코칭 템플릿 제공 및 AI 기반 행동 패턴 분석 기능을 수행합니다.
"""
from datetime import date, timedelta
from collections import Counter
import json
import re
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, func as sqlfunc
from typing import List, Optional, Any, Dict
from app.shared.models import Dog, DogEnv, BehaviorLog, UserTrainingStatus, TrainingBehaviorSnapshot
from sqlalchemy.dialects.postgresql import insert

from app.features.coach import schemas, templates, prompts
from app.shared.clients.ai_client import ai_client
from fastapi import HTTPException

def _format_age_from_birth_date(birth_date: Optional[date]) -> str:
    if not birth_date:
        return "정보 없음"
    today = date.today()
    age_months = max(0, int((today - birth_date).days / 30))
    return f"{age_months}개월"


def _extract_json_object(text: str) -> Optional[Dict[str, Any]]:
    if not text:
        return None

    cleaned = text.strip()
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)```", cleaned, re.IGNORECASE)
    if fence_match:
        cleaned = fence_match.group(1).strip()

    candidates = [cleaned]
    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidates.append(cleaned[start:end + 1])

    for candidate in candidates:
        try:
            parsed = json.loads(candidate)
            if isinstance(parsed, dict):
                return parsed
        except Exception:
            continue
    return None


def _clean_text(value: Any, fallback: str) -> str:
    if not isinstance(value, str):
        return fallback
    text = value.strip()
    if not text:
        return fallback
    if "생성 중" in text or "읽고 있습니다" in text:
        return fallback
    return text


def _clean_list(value: Any, fallback: List[str], max_len: int) -> List[str]:
    if not isinstance(value, list):
        return fallback
    cleaned = [str(v).strip() for v in value if str(v).strip()]
    if not cleaned:
        return fallback
    return cleaned[:max_len]


def _build_rule_based_analysis(dog_name: str, logs_list: List[Dict[str, Any]]) -> Dict[str, Any]:
    if not logs_list:
        return {
            "insight": f"{dog_name}의 기록이 아직 적어 정밀 패턴을 단정하기는 어렵습니다. 다만 초기 데이터 기준으로 자극-반응 연결을 빠르게 안정화하는 훈련이 우선입니다.",
            "action_plan": "1) 하루 2회, 3분씩 짧은 훈련을 고정 시간에 진행하세요.\n2) 문제 행동 직전 신호(시선 고정, 긴장)를 발견하면 즉시 간단한 대체 행동으로 전환하세요.\n3) 성공 직후 2초 안에 보상해 성공 경험을 누적하세요.",
            "dog_voice": f"{dog_name}: 아직 낯설지만, 짧고 쉽게 알려주면 더 잘할 수 있어요.",
            "top_patterns": [
                "기록이 누적되면 주요 촉발 상황이 자동으로 정리됩니다.",
                "초기에는 같은 시간대/같은 상황 반복 여부를 우선 확인하세요.",
                "보상 타이밍(즉시/지연)이 반응 안정화에 큰 영향을 줍니다.",
            ],
            "next_7_days_plan": [
                "1-2일차: 문제 행동 직전 신호를 관찰하고 동일 기준으로 기록",
                "3-5일차: 대체 행동 1개를 고정해 짧게 반복",
                "6-7일차: 성공률이 높은 상황부터 난도를 소폭 상승",
            ],
            "risk_signals": [
                "강도(intensity)가 3일 연속 상승",
                "동일 상황에서 반응 빈도가 빠르게 증가",
            ],
            "consultation_questions": [
                "반응 직전의 공통 선행 자극은 무엇인가요?",
                "보상 시점과 보상 종류를 어떻게 조정하면 좋을까요?",
            ],
        }

    antecedent_counter = Counter((log.get("antecedent") or "미기록") for log in logs_list)
    behavior_counter = Counter((log.get("behavior") or "미기록") for log in logs_list)
    hour_counter = Counter(
        int(str(log.get("occurred_at", "00:00")).split(" ")[-1].split(":")[0])
        for log in logs_list
        if log.get("occurred_at")
    )
    intensity_values = [int(log.get("intensity")) for log in logs_list if isinstance(log.get("intensity"), int)]
    avg_intensity = round(sum(intensity_values) / len(intensity_values), 1) if intensity_values else 0

    top_antecedent, top_antecedent_count = antecedent_counter.most_common(1)[0]
    top_behavior, top_behavior_count = behavior_counter.most_common(1)[0]
    top_hour = hour_counter.most_common(1)[0][0] if hour_counter else None
    peak_hour_text = f"{top_hour:02d}시 전후" if top_hour is not None else "특정 시간대"

    return {
        "insight": (
            f"최근 기록 기준으로 {dog_name}는 '{top_antecedent}' 상황에서 '{top_behavior}' 반응이 가장 자주 나타났습니다. "
            f"평균 강도는 {avg_intensity}이며, {peak_hour_text}에 재발 가능성이 높습니다."
        ),
        "action_plan": (
            f"1) '{top_antecedent}' 직전 1-2분에 대체 행동을 먼저 제시하세요.\n"
            f"2) '{top_behavior}'이 나오기 전에 시선 전환/거리 확보로 반응 고리를 끊으세요.\n"
            f"3) 성공 시 즉시 보상하고 같은 패턴을 하루 2회 반복하세요."
        ),
        "dog_voice": f"{dog_name}: 내가 긴장하는 순간을 먼저 알아채고 도와주면 훨씬 편안해져요.",
        "top_patterns": [
            f"가장 잦은 선행 자극: {top_antecedent} ({top_antecedent_count}회)",
            f"가장 잦은 문제 반응: {top_behavior} ({top_behavior_count}회)",
            f"재발 가능 시간대: {peak_hour_text}",
        ],
        "next_7_days_plan": [
            "1-2일차: 문제 상황 직전 개입 타이밍 고정",
            "3-5일차: 대체 행동 성공률 70% 이상 목표",
            "6-7일차: 동일 자극에서 반응 강도/빈도 재측정",
        ],
        "risk_signals": [
            "반응 강도 평균이 2일 연속 상승",
            "같은 자극에서 반응 지속시간이 증가",
        ],
        "consultation_questions": [
            "현재 반응을 줄이기 위한 최우선 자극 관리 방법은?",
            "우리 아이에게 맞는 대체 행동 기준 난도는?",
        ],
    }

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
        "age": _format_age_from_birth_date(dog.birth_date),
        "sex": dog.sex.value if dog.sex else "정보 없음",
    }
    
    prompt = prompts.create_analysis_prompt(dog_info, env_data, logs_list)
    system_prompt = prompts.SYSTEM_PROMPT

    # 3. Call AI + Parse (JSON first, rule fallback)
    ai_response_text = await ai_client.generate_response(prompt, system_prompt)
    parsed = _extract_json_object(ai_response_text)
    fallback = _build_rule_based_analysis(dog.name, logs_list)

    if parsed is None:
        return schemas.AIAnalysisResponse(
            insight=fallback["insight"],
            action_plan=fallback["action_plan"],
            dog_voice=fallback["dog_voice"],
            top_patterns=fallback["top_patterns"],
            next_7_days_plan=fallback["next_7_days_plan"],
            risk_signals=fallback["risk_signals"],
            consultation_questions=fallback["consultation_questions"],
            raw_analysis=ai_response_text,
        )

    return schemas.AIAnalysisResponse(
        insight=_clean_text(parsed.get("insight"), fallback["insight"]),
        action_plan=_clean_text(parsed.get("action_plan"), fallback["action_plan"]),
        dog_voice=_clean_text(parsed.get("dog_voice"), fallback["dog_voice"]),
        top_patterns=_clean_list(parsed.get("top_patterns"), fallback["top_patterns"], 3),
        next_7_days_plan=_clean_list(parsed.get("next_7_days_plan"), fallback["next_7_days_plan"], 3),
        risk_signals=_clean_list(parsed.get("risk_signals"), fallback["risk_signals"], 2),
        consultation_questions=_clean_list(parsed.get("consultation_questions"), fallback["consultation_questions"], 2),
        raw_analysis=ai_response_text,
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
