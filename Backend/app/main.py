from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.features.auth.router import router as auth_router
from app.features.onboarding.router import router as onboarding_router
from app.core.exceptions import DomainException, domain_exception_handler

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Register Global Exception Handlers
app.add_exception_handler(DomainException, domain_exception_handler)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include Feature Routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(onboarding_router, prefix=f"{settings.API_V1_STR}/onboarding", tags=["onboarding"])

@app.get("/")
def root():
    return {"message": "Welcome to DogCoach API"}
