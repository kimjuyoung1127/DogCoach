import pytest
from datetime import datetime, timezone
from unittest.mock import patch, ANY
from uuid import uuid4
from app.features.log import service, schemas
from app.shared.models import BehaviorLog

@pytest.mark.asyncio
async def test_create_new_log(mock_db):
    # Prepare
    log_input = schemas.LogCreate(
        dog_id=str(uuid4() if 'uuid4' in locals() else "123e4567-e89b-12d3-a456-426614174000"),
        antecedent="Doorbell rang",
        behavior="Barking",
        consequence="Ignored",
        intensity=5,
        occurred_at=datetime.now() # Client sends local time (naive usually in tests)
    )
    user_timezone = "Asia/Seoul"
    
    # Mock Reponse from DB
    mock_saved_log = BehaviorLog(
        id="123e4567-e89b-12d3-a456-426614174999",
        dog_id=log_input.dog_id,
        antecedent=log_input.antecedent,
        behavior=log_input.behavior,
        consequence=log_input.consequence,
        intensity=log_input.intensity,
        is_quick_log=False,
        occurred_at=datetime.now(timezone.utc),
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    
    # Act
    with patch("app.features.log.service.repository.create_log", return_value=mock_saved_log) as mock_create:
        result = await service.create_new_log(mock_db, log_input, user_timezone)
        
        # Assert
        assert result.behavior == "Barking"
        # Verify repository was called with correct data (UTC conversion happens in service)
        mock_create.assert_called_once()
        call_args = mock_create.call_args[0][1] # second arg is log_data dict
        assert "occurred_at" in call_args
        # We expect the service to have converted it to an aware datetime
        assert call_args["occurred_at"].tzinfo is not None
