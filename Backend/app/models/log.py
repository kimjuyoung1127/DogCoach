import uuid
from datetime import datetime
from enum import Enum as PyEnum
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, DateTime, ForeignKey, Enum, func, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class AssetType(str, PyEnum):
    PHOTO = "PHOTO"
    VIDEO = "VIDEO"
    LOTTIE_SNAPSHOT = "LOTTIE_SNAPSHOT"

class BehaviorLog(Base):
    __tablename__ = "behavior_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dog_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("dogs.id", ondelete="CASCADE"))
    
    is_quick_log: Mapped[bool] = mapped_column(Boolean, default=False)
    type_id: Mapped[int] = mapped_column(Integer, nullable=True)
    antecedent: Mapped[str] = mapped_column(Text, nullable=True)
    behavior: Mapped[str] = mapped_column(Text, nullable=True)
    consequence: Mapped[str] = mapped_column(Text, nullable=True)
    intensity: Mapped[int] = mapped_column(Integer, nullable=True)
    duration: Mapped[int] = mapped_column(Integer, nullable=True)
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        CheckConstraint('intensity >= 1 AND intensity <= 10', name='check_intensity_range'),
    )

    # Relationships
    dog = relationship("Dog", back_populates="logs")
    media_assets = relationship("MediaAsset", back_populates="log", cascade="all, delete-orphan")

class MediaAsset(Base):
    __tablename__ = "media_assets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    log_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("behavior_logs.id", ondelete="SET NULL"), nullable=True)
    storage_url: Mapped[str] = mapped_column(Text, nullable=False)
    asset_type: Mapped[AssetType] = mapped_column(Enum(AssetType), nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    log = relationship("BehaviorLog", back_populates="media_assets")
