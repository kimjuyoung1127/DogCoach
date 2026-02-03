from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.shared.models import Dog, DogEnv, BehaviorLog
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
