import asyncio
import sys
import os

# Add the current directory to sys.path to allow imports from app
sys.path.append(os.getcwd())

from textwrap import dedent
from sqlalchemy import text
from app.core.database import get_db

async def test_connection():
    print("Testing database connection...")
    
    # Diagnostic checks
    import os
    from app.core.config import settings
    
    missing = []
    if not settings.DATABASE_URL:
        missing.append("DATABASE_URL")
    if not settings.SUPABASE_URL:
        missing.append("SUPABASE_URL")
        
    if missing:
        print(dedent(f"""
        ❌ Environment configuration incomplete.
        Missing variables: {', '.join(missing)}
        
        For the Backend (FastAPI + SQLAlchemy) to work, we need a DIRECT connection to the database.
        Please copy the 'Connection String' from Supabase:
        Settings -> Database -> Connection string -> URI
        
        It looks like: postgresql://postgres.[ref]:[password]@[region].pooler.supabase.com:6543/postgres
        """))
        return

    try:
        # get_db is an async generator
        async for session in get_db():
            result = await session.execute(text("SELECT 1"))
            print(f"✅ Connection successful! Database responded: {result.scalar()}")
            return
    except Exception as e:
        error_msg = dedent(f"""
        ❌ Connection failed.
        Error: {e}
        
        Please check your .env file:
        1. Is the DB password correct?
        2. Are you using the 'Transaction' (port 6543) or 'Session' (port 5432) mode? 
        """)
        print(error_msg)
        with open("db_error.txt", "w", encoding="utf-8") as f:
            f.write(str(e))

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(test_connection())
