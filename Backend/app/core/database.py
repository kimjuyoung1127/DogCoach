from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from app.core.config import settings

# Supabase pooler(6543/pgbouncer transaction mode) does not support
# asyncpg prepared statement cache reliably.
is_supabase_pooler = "pooler.supabase.com" in settings.DATABASE_URL

engine_kwargs = {
    "echo": False,
    "future": True,
    "pool_pre_ping": True,
}

if is_supabase_pooler:
    engine_kwargs.update(
        {
            "poolclass": NullPool,
            "connect_args": {
                "statement_cache_size": 0,
            },
        }
    )
else:
    engine_kwargs.update(
        {
            "pool_size": 20,
            "max_overflow": 10,
        }
    )

engine = create_async_engine(settings.DATABASE_URL, **engine_kwargs)

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
