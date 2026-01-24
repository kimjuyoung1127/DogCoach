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
from fastapi.responses import JSONResponse
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
    print(f"DEBUG: Loading CORS Origins: {settings.BACKEND_CORS_ORIGINS}")
    
    
# @app.exception_handler(Exception)
# async def global_exception_handler(request: Request, exc: Exception):
#     logger.error(f"Global Exception: {str(exc)}", exc_info=True)
#     return JSONResponse(
#         status_code=500,
#         content={"detail": f"Internal Server Error: {str(exc)}"},
#         headers={"Access-Control-Allow-Origin": "*"}
#     )

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    print(f"DEBUG: Loading CORS Origins: {settings.BACKEND_CORS_ORIGINS}")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # Debugging: Allow all origins
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

from app.features.log.router import router as log_router

# Include Feature Routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(onboarding_router, prefix=f"{settings.API_V1_STR}/onboarding", tags=["onboarding"])
app.include_router(log_router, prefix=f"{settings.API_V1_STR}/logs", tags=["log"])

@app.get("/")
def root():
    return {"message": "Welcome to DogCoach API"}
