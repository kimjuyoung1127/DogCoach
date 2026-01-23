from fastapi import Request, status
from fastapi.responses import JSONResponse

class DomainException(Exception):
    """Base category for business logic errors."""
    def __init__(self, message: str):
        self.message = message

class NotFoundException(DomainException):
    """Resource not found."""
    pass

class BadRequestException(DomainException):
    """Invalid input or bad request."""
    pass

class UnauthorizedException(DomainException):
    """Authentication failed."""
    pass

async def domain_exception_handler(request: Request, exc: DomainException):
    """
    Global handler to map DomainExceptions to HTTP responses.
    This keeps the Service layer clean of HTTP concerns.
    """
    if isinstance(exc, NotFoundException):
        status_code = status.HTTP_404_NOT_FOUND
    elif isinstance(exc, BadRequestException):
        status_code = status.HTTP_400_BAD_REQUEST
    elif isinstance(exc, UnauthorizedException):
        status_code = status.HTTP_401_UNAUTHORIZED
    else:
        status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        
    return JSONResponse(
        status_code=status_code,
        content={"detail": exc.message}
    )
