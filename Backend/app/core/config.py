from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DogCoach API"
    API_V1_STR: str = "/api/v1"

    # Runtime
    ENVIRONMENT: str = "development"

    # CORS
    BACKEND_CORS_ORIGINS: Union[List[str], str] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Anonymous guest cookie
    ANONYMOUS_COOKIE_DOMAIN: str | None = None
    ANONYMOUS_COOKIE_SECURE: bool | None = None
    ANONYMOUS_COOKIE_SAMESITE: str | None = None
    ANONYMOUS_COOKIE_MAX_AGE: int = 31536000  # 1 year

    @field_validator("ANONYMOUS_COOKIE_SAMESITE")
    @classmethod
    def validate_cookie_samesite(cls, v: str | None) -> str | None:
        if v is None:
            return v
        normalized = v.lower()
        if normalized not in {"lax", "strict", "none"}:
            raise ValueError("ANONYMOUS_COOKIE_SAMESITE must be one of: lax, strict, none")
        return normalized

    # Database
    DATABASE_URL: str

    # Supabase Auth
    SECRET_KEY: str  # For JWT verification
    ALGORITHM: str = "HS256"

    # Supabase Admin (Optional, for admin tasks)
    SUPABASE_URL: str | None = None
    SUPABASE_ANON_KEY: str | None = None

    # Third Party
    OPENAI_API_KEY: str
    KAKAO_API_KEY: str | None = None
    AI_API_URL: str = "http://localhost:11434" # Default for local Ollama

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() in {"production", "prod"}

    @property
    def anonymous_cookie_secure(self) -> bool:
        if self.ANONYMOUS_COOKIE_SECURE is not None:
            return self.ANONYMOUS_COOKIE_SECURE
        return self.is_production

    @property
    def anonymous_cookie_samesite(self) -> str:
        if self.ANONYMOUS_COOKIE_SAMESITE:
            return self.ANONYMOUS_COOKIE_SAMESITE
        return "none" if self.is_production else "lax"

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
