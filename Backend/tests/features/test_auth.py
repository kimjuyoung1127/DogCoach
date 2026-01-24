import pytest
from uuid import uuid4
from datetime import datetime
from unittest.mock import MagicMock, patch
from app.features.auth import service, schemas
from app.shared.models import User, Dog, UserRole, UserStatus
from app.core.exceptions import NotFoundException, BadRequestException

@pytest.mark.asyncio
async def test_get_my_profile_success(mock_db):
    # Prepare
    user_id = uuid4()
    mock_user = User(
        id=user_id,
        role=UserRole.USER,
        status=UserStatus.ACTIVE,
        timezone="Asia/Seoul",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    
    # Mock Repository calls
    with patch("app.features.auth.service.repository.get_user_by_id", return_value=mock_user) as mock_get_user:
        with patch("app.features.auth.service.repository.get_latest_dog_by_user", return_value=None):
            # Act
            result = await service.get_my_profile(mock_db, str(user_id))
            
            # Assert
            assert result.id == user_id
            assert result.role == UserRole.USER
            mock_get_user.assert_called_once()

@pytest.mark.asyncio
async def test_get_my_profile_not_found(mock_db):
    user_id = uuid4()
    
    with patch("app.features.auth.service.repository.get_user_by_id", return_value=None):
        with pytest.raises(NotFoundException):
            await service.get_my_profile(mock_db, str(user_id))
