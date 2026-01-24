from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from supabase import create_client, Client
from app.core.config import settings

# Initialize Supabase Client (Anonymous key is fine for auth.getUser)
# We use the anon key to verify the user's token against the Supabase Auth API
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user_id(token: str = Depends(oauth2_scheme)) -> str:
    """
    Dependency to get the current user ID using Remote Verification.
    This calls Supabase Auth API to validate the token.
    """
    try:
        # Remote Verification: "Hey Supabase, who is this user?"
        user_response = supabase.auth.get_user(token)
        
        if not user_response.user:
            raise Exception("User not found")
            
        return user_response.user.id
        
    except Exception as e:
        print(f"Auth Verification Failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
            
        )

async def get_current_user_id_optional(token: Optional[str] = Depends(oauth2_scheme)) -> Optional[str]:
    """
    Optional dependency. Returns user_id if token is valid, else None.
    Does NOT raise generic 401 (allows Guest access).
    """
    if not token:
        return None
    try:
        user_response = supabase.auth.get_user(token)
        if not user_response.user:
            return None
        return user_response.user.id
    except Exception:
        return None

# Legacy / Utils (Optional, can be removed if not used)
def create_access_token(subject: str):
    return "mock_token_use_supabase_instead"
