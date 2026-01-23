from uuid import UUID
from typing import List, Optional
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.shared.models import BehaviorLog

async def create_log(db: AsyncSession, log_data: dict) -> BehaviorLog:
    new_log = BehaviorLog(**log_data)
    db.add(new_log)
    await db.commit()
    await db.refresh(new_log)
    return new_log

async def get_logs_by_dog(
    db: AsyncSession, 
    dog_id: UUID, 
    limit: int = 20, 
    offset: int = 0
) -> List[BehaviorLog]:
    """
    Fetch recent logs for a dog.
    Optimized to hit (dog_id, occurred_at) index by ordering by occurred_at desc.
    """
    stmt = (
        select(BehaviorLog)
        .where(BehaviorLog.dog_id == dog_id)
        .order_by(desc(BehaviorLog.occurred_at))
        .limit(limit)
        .offset(offset)
    )
    result = await db.execute(stmt)
    return result.scalars().all()
