import asyncio
import os
import sys

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.shared.models import Dog, DogEnv, BehaviorLog, AICoaching, ReportType
from uuid import uuid4
from datetime import date, datetime, timedelta

async def seed_data():
    async with SessionLocal() as db:
        print("🌱 Seeding Debug Data...")
        
        # 1. Define Dummy Dog (Guest)
        guest_sid = "debug-cookie-123"
        dog_id = uuid4()
        
        # Check if exists
        # (Skipping check for simplicity, assuming clean dev DB or ignoring duplicates)
        
        dog = Dog(
            id=dog_id,
            user_id=None,
            anonymous_sid=guest_sid,
            name="두부",
            breed="말티즈",
            birth_date=date(2022, 5, 20),
            sex="MALE",
            profile_image_url=None
        )
        
        # 2. Dog Env
        dog_env = DogEnv(
            dog_id=dog_id,
            household_info={"type": "Apartment", "family_count": 3, "primary_carer": "누나"},
            health_meta={"issues": []},
            profile_meta={"weight": 3.5, "adoption_date": "2022-08-01"},
            rewards_meta={"favorite_treats": ["고구마", "북어트릿"], "play_style": "터그놀이"},
            chronic_issues={"top_issues": ["Barking", "SeparationAnxiety"]},
            triggers=["초인종 소리", "배달 오토바이"],
            past_attempts=["혼내기", "유튜브 보고 따라하기 (실패)"],
            temperament={"sensitivity_score": 4, "energy_level": 2}, # 1-5
            activity_meta={}
        )
        
        # 3. Behavior Logs (Last 3 days)
        logs = []
        for i in range(5):
            logs.append(BehaviorLog(
                dog_id=dog_id,
                is_quick_log=True,
                behavior="Barking",
                intensity=3,
                occurred_at=datetime.now() - timedelta(days=i, hours=2)
            ))
        
        # 4. Old Coaching Report (Simulate previous AI analysis)
        report = AICoaching(
            dog_id=dog_id,
            report_type=ReportType.DAILY,
            analysis_json={
                "summary": "최근 초인종 소리에 대한 짖음이 잦아졌습니다.",
                "mood": "Anxious"
            },
            action_items=[
                {"title": "현관 둔감화", "status": "TODO"},
                {"title": "자리 비움 연습", "status": "DONE"}
            ],
            feedback_score=None
        )

        db.add(dog)
        db.add(dog_env)
        db.add_all(logs)
        db.add(report)
        
        await db.commit()
        print(f"✅ Seeding Complete! Dog ID: {dog_id}")
        print(f"🍪 USE THIS COOKIE: anonymous_sid={guest_sid}")

if __name__ == "__main__":
    asyncio.run(seed_data())
