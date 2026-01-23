import os
from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DogCoach API"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database
    DATABASE_URL: str
    
    # Supabase Auth
    SECRET_KEY: str  # For JWT verification
    ALGORITHM: str = "HS256"
    
    # Supabase Admin (Optional, for admin tasks)
    SUPABASE_URL: str | None = None
    SUPABASE_KEY: str | None = None

    # Third Party
    OPENAI_API_KEY: str
    KAKAO_API_KEY: str | None = None

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
