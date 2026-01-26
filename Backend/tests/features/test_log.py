import pytest
from datetime import datetime, timezone
from unittest.mock import patch, ANY, MagicMock
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

@pytest.mark.asyncio
async def test_update_log_abc():
    # Arrange
    log_id = uuid4()
    update_data = schemas.LogUpdate(
        intensity=8,
        antecedent="Doorbell",
        consequence="Barking"
    )
    
    mock_db = MagicMock()
    # Mock return value for update
    mock_updated_log = BehaviorLog(
        id=log_id,
        dog_id=uuid4(),
        is_quick_log=False,
        intensity=8,
        antecedent="Doorbell",
        consequence="Barking",
        occurred_at=datetime.now(timezone.utc),
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    
    # We patch the repository.update_log function
    # Note: We need to make sure we are patching the correct path where it is IMPORTED or DEFINED
    # In service.py, it imports repository. So we patch app.features.log.repository.update_log or app.features.log.service.repository.update_log
    
    with patch("app.features.log.repository.update_log", return_value=mock_updated_log) as mock_repo_update:
        # Act
        result = await service.update_existing_log(mock_db, log_id, update_data)
        
        # Assert
        assert result.intensity == 8
        assert result.antecedent == "Doorbell"
        assert result.consequence == "Barking"
        mock_repo_update.assert_called_once()
