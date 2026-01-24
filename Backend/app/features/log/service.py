from sqlalchemy.ext.asyncio import AsyncSession
from app.features.log import repository, schemas
from app.shared.utils.timezone import to_utc

async def create_new_log(
    db: AsyncSession, 
    log_in: schemas.LogCreate, 
    user_timezone: str
) -> schemas.LogResponse:
    
    # 1. Convert local time to UTC
    # Since Pydantic might parse it as naive or aware, validation ensures it is a datetime object.
    # to_utc handles the conversion based on user preference.
    utc_occurred_at = to_utc(log_in.occurred_at, user_timezone)
    
    # 2. Prepare data for generic repository insert
    log_data = log_in.model_dump()
    log_data["occurred_at"] = utc_occurred_at
    
    # 3. Save
    new_log = await repository.create_log(db, log_data)
    
    return schemas.LogResponse.model_validate(new_log)

async def get_recent_logs(
    db: AsyncSession,
    dog_id: str
) -> list[schemas.LogResponse]:
    logs = await repository.get_logs_by_dog(db, dog_id)
    return [schemas.LogResponse.model_validate(log) for log in logs]

async def update_existing_log(
    db: AsyncSession,
    log_id: str,
    updates: schemas.LogUpdate
) -> schemas.LogResponse:
    # Filter out None values to only update what's changed
    update_data = updates.model_dump(exclude_unset=True)
    
    updated_log = await repository.update_log(db, log_id, update_data)
    
    if not updated_log:
         # In a real app, this should be a 404 DomainException
         raise Exception("Log not found")
         
    return schemas.LogResponse.model_validate(updated_log)
