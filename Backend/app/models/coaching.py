import uuid
from datetime import datetime
from enum import Enum as PyEnum
from typing import Optional, Any
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, Enum, func, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class ReportType(str, PyEnum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    INSIGHT = "INSIGHT"

class AICoaching(Base):
    __tablename__ = "ai_coaching"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dog_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dogs.id", ondelete="CASCADE"))
    report_type: Mapped[ReportType] = mapped_column(Enum(ReportType), nullable=False)
    analysis_json: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    action_items: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    feedback_score: Mapped[int] = mapped_column(Integer, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint('feedback_score >= 1 AND feedback_score <= 5', name='check_feedback_score_range'),
    )

    # Relationships
    dog = relationship("Dog", back_populates="coachings")
    action_tracker = relationship("ActionTracker", back_populates="coaching", cascade="all, delete-orphan")

class ActionTracker(Base):
    __tablename__ = "action_tracker"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    coaching_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("ai_coaching.id", ondelete="CASCADE"))
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    coaching = relationship("AICoaching", back_populates="action_tracker")
