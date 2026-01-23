from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Rule 2.3: Connection Pooling
# Using asyncpg with SQLAlchemy's pool settings
# pool_size=20: Keep 20 connections open
# max_overflow=10: Allow 10 more temporary connections
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True  # Detect and remove stale connections
)

# Call this sessionmaker to get a session
# Rule: Use async session
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
