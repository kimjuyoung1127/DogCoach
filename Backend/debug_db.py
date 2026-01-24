import asyncio
import os
import sys
from datetime import datetime
from uuid import UUID

# Add project root to path
sys.path.append("C:\\DogCoach\\Backend")

from app.core.database import SessionLocal as async_session_factory
from app.features.log import service, schemas
from app.features.auth import repository as auth_repo
from app.core import config

# Mock user id - fetch a real one
USER_ID_STR = "37207c68-243e-4aa6-a843-0599c2793132" # One from the verify step if known, or I'll query one.

async def main():
    async with async_session_factory() as db:
        print("1. Fetching a user...")
        # Just pick the first user
        from sqlalchemy import select
        from app.shared.models import User
        result = await db.execute(select(User))
        user = result.scalars().first()
        if not user:
            print("No users found")
            return
            
        print(f"User found: {user.id}")
        
        # 2. Fetch a dog
        dog = await auth_repo.get_latest_dog_by_user(db, user.id)
        if not dog:
            print("No dog found for user")
            # Create a dummy dog logic needed if none, but we expect one from previous steps
            return
            
        print(f"Dog found: {dog.id} ({dog.name})")
        
        # 3. Create Log Payload
        payload = schemas.LogCreate(
            dog_id=dog.id,
            is_quick_log=True,
            behavior="Barking",
            intensity=3,
            occurred_at=datetime.now()
        )
        
        print(f"Payload: {payload}")
        
        try:
            # 4. Call Service
            result = await service.create_new_log(db, payload, "Asia/Seoul")
            print(f"Success! Log Created ID: {result.id}")
        except Exception as e:
            print(f"ERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
