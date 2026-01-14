from typing import Any
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column
from sqlalchemy import MetaData

class Base(DeclarativeBase):
    id: Any
    __name__: str
    metadata = MetaData()
    
    # Generate __tablename__ automatically
    @property
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
