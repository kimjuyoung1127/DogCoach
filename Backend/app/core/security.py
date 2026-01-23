from datetime import datetime, timedelta
from typing import Optional, Union, Any
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings

# Supabase Auth uses Bearer tokens
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    """
    Utility to create tokens (mostly for testing or local auth).
    Supabase handles this in production.
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode = {"sub": str(subject), "exp": expire}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[str]:
    """
    Verifies the JWT token from Supabase.
    Returns the user ID (sub) if valid.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM], options={"verify_aud": False})
        user_id: str = payload.get("sub")
        return user_id, payload
    except JWTError:
        return None, None

async def get_current_user_id(token: str = Depends(oauth2_scheme)) -> str:
    """
    Dependency to get the current user ID from the token.
    Raises 401 if invalid.
    """
    user_id, _ = verify_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_id
