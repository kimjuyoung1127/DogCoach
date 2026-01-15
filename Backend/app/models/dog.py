import uuid
from datetime import datetime, date
from enum import Enum as PyEnum
from typing import Optional, Any
from sqlalchemy import String, Date, DateTime, ForeignKey, Enum, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class DogSex(str, PyEnum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    MALE_NEUTERED = "MALE_NEUTERED"
    FEMALE_NEUTERED = "FEMALE_NEUTERED"

class Dog(Base):
    __tablename__ = "dogs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    breed: Mapped[str] = mapped_column(String(255), nullable=True)
    birth_date: Mapped[date] = mapped_column(Date, nullable=True)
    sex: Mapped[DogSex] = mapped_column(Enum(DogSex), nullable=True)
    profile_image_url: Mapped[str] = mapped_column(String, nullable=True)
    anonymous_sid: Mapped[str] = mapped_column(String(255), nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="dogs")
    env = relationship("DogEnv", uselist=False, back_populates="dog", cascade="all, delete-orphan")
    logs = relationship("BehaviorLog", back_populates="dog", cascade="all, delete-orphan")
    coachings = relationship("AICoaching", back_populates="dog", cascade="all, delete-orphan")
    summaries = relationship("LogSummary", back_populates="dog", cascade="all, delete-orphan")

class DogEnv(Base):
    __tablename__ = "dog_env"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dog_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dogs.id", ondelete="CASCADE"), unique=True)
    household_info: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    health_meta: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    profile_meta: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    rewards_meta: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    chronic_issues: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    triggers: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    past_attempts: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    temperament: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    activity_meta: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    dog = relationship("Dog", back_populates="env")
