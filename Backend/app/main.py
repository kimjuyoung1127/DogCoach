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

from fastapi import Request
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming Request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        logger.info(f"Request Handled: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Request Failed: {str(e)}")
        raise e

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    origins = [str(origin) for origin in settings.BACKEND_CORS_ORIGINS]
    # Ensure both localhost and 127.0.0.1 are covered for local development
    if "http://localhost:3000" in origins and "http://127.0.0.1:3000" not in origins:
        origins.append("http://127.0.0.1:3000")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

from app.features.log.router import router as log_router
from app.features.dashboard.router import router as dashboard_router
from app.features.coach.router import router as coach_router

# Include Feature Routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(onboarding_router, prefix=f"{settings.API_V1_STR}/onboarding", tags=["onboarding"])
app.include_router(dashboard_router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(coach_router, prefix=f"{settings.API_V1_STR}/coach", tags=["coach"])
app.include_router(log_router, prefix=f"{settings.API_V1_STR}/logs", tags=["log"])

@app.get("/")
def root():
    return {"message": "Welcome to DogCoach API"}
