import pytest
import asyncio
from typing import Generator, AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock

@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
def mock_db() -> AsyncSession:
    """Returns a mock AsyncSession for unit testing services."""
    session = AsyncMock(spec=AsyncSession)
    return session
