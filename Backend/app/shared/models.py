from datetime import datetime
from enum import Enum as PyEnum
from typing import Optional, List
from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    ForeignKey,
    DateTime,
    Text,
    Date,
    Numeric,
    JSON,
    Enum,
    func,
    Index,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY, TIMESTAMP
from sqlalchemy.orm import relationship, declarative_base
from uuid import uuid4

Base = declarative_base()

# --- Enums (Type Definitions) ---
class UserRole(str, PyEnum):
    GUEST = "GUEST"
    USER = "USER"
    PRO_USER = "PRO_USER"
    EXPERT = "EXPERT"
    ADMIN = "ADMIN"

class UserStatus(str, PyEnum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    BANNED = "BANNED"

class PlanType(str, PyEnum):
    FREE = "FREE"
    PRO_MONTHLY = "PRO_MONTHLY"
    PRO_YEARLY = "PRO_YEARLY"

class DogSex(str, PyEnum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    MALE_NEUTERED = "MALE_NEUTERED"
    FEMALE_NEUTERED = "FEMALE_NEUTERED"

class AssetType(str, PyEnum):
    PHOTO = "PHOTO"
    VIDEO = "VIDEO"
    LOTTIE_SNAPSHOT = "LOTTIE_SNAPSHOT"

class ReportType(str, PyEnum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    INSIGHT = "INSIGHT"

class NotiChannel(str, PyEnum):
    ALIMTALK = "ALIMTALK"
    WEB_PUSH = "WEB_PUSH"
    EMAIL = "EMAIL"

# --- Models ---

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    kakao_sync_id = Column(String(255), unique=True, index=True)
    role = Column(Enum(UserRole, name="user_role"), default=UserRole.GUEST)
    phone_number = Column(String(255))
    status = Column(Enum(UserStatus, name="user_status"), default=UserStatus.ACTIVE)
    timezone = Column(String(50), default="Asia/Seoul")
    
    # Rule 4.1: Use TIMESTAMPTZ (DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    last_login_at = Column(DateTime(timezone=True))
    provider = Column(String)

    # Relationships
    dogs = relationship("Dog", back_populates="user", cascade="all, delete-orphan")
    subscription = relationship("Subscription", back_populates="user", uselist=False, cascade="all, delete-orphan")
    settings = relationship("UserSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    # Rule 4.2: Index Foreign Keys
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    plan_type = Column(Enum(PlanType, name="plan_type"), default=PlanType.FREE)
    next_billing_date = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    pg_provider = Column(String)
    pg_customer_key = Column(String)
    canceled_at = Column(DateTime(timezone=True))
    cancel_reason = Column(Text)

    user = relationship("User", back_populates="subscription")


class Dog(Base):
    __tablename__ = "dogs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    name = Column(String(255), nullable=False)
    breed = Column(String(255))
    birth_date = Column(Date)
    sex = Column(Enum(DogSex, name="dog_sex"))
    profile_image_url = Column(Text)
    anonymous_sid = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="dogs")
    env = relationship("DogEnv", back_populates="dog", uselist=False, cascade="all, delete-orphan")
    logs = relationship("BehaviorLog", back_populates="dog", cascade="all, delete-orphan")
    coaching_reports = relationship("AICoaching", back_populates="dog", cascade="all, delete-orphan")


class DogEnv(Base):
    __tablename__ = "dog_env"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    dog_id = Column(UUID(as_uuid=True), ForeignKey("dogs.id", ondelete="CASCADE"), unique=True, index=True)
    
    # Rule 4.1: Use JSONB for JSON fields
    household_info = Column(JSONB)
    health_meta = Column(JSONB)
    profile_meta = Column(JSONB)
    rewards_meta = Column(JSONB)
    chronic_issues = Column(JSONB)
    antecedents = Column(JSONB)
    triggers = Column(JSONB)
    past_attempts = Column(JSONB)
    temperament = Column(JSONB)
    activity_meta = Column(JSONB)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    dog = relationship("Dog", back_populates="env")


class BehaviorLog(Base):
    __tablename__ = "behavior_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    dog_id = Column(UUID(as_uuid=True), ForeignKey("dogs.id", ondelete="CASCADE"), index=True)
    is_quick_log = Column(Boolean, default=False)
    type_id = Column(Integer)
    antecedent = Column(Text)
    behavior = Column(Text)
    consequence = Column(Text)
    intensity = Column(Integer)
    duration = Column(Integer)
    occurred_at = Column(DateTime(timezone=True), default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    dog = relationship("Dog", back_populates="logs")
    media = relationship("MediaAsset", back_populates="log", cascade="all, delete-orphan")

    # Index for filtering logs by dog and date range (Rule 1.3: Composite Index)
    __table_args__ = (
        Index('idx_logs_dog_occurred', 'dog_id', 'occurred_at'),
    )


class MediaAsset(Base):
    __tablename__ = "media_assets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    log_id = Column(UUID(as_uuid=True), ForeignKey("behavior_logs.id", ondelete="SET NULL"), index=True)
    storage_url = Column(Text, nullable=False)
    asset_type = Column(Enum(AssetType, name="asset_type"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    log = relationship("BehaviorLog", back_populates="media")


class AICoaching(Base):
    __tablename__ = "ai_coaching"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    dog_id = Column(UUID(as_uuid=True), ForeignKey("dogs.id", ondelete="CASCADE"), index=True)
    report_type = Column(Enum(ReportType, name="report_type"), nullable=False)
    analysis_json = Column(JSONB)
    action_items = Column(JSONB)
    feedback_score = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    dog = relationship("Dog", back_populates="coaching_reports")
    action_tracker = relationship("ActionTracker", back_populates="coaching", cascade="all, delete-orphan")


class ActionTracker(Base):
    __tablename__ = "action_tracker"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    coaching_id = Column(UUID(as_uuid=True), ForeignKey("ai_coaching.id", ondelete="CASCADE"), index=True)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    coaching = relationship("AICoaching", back_populates="action_tracker")


class NotiHistory(Base):
    __tablename__ = "noti_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    channel = Column(Enum(NotiChannel, name="noti_channel"), nullable=False)
    template_code = Column(String(100))
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
    read_at = Column(DateTime(timezone=True))


class LogSummary(Base):
    __tablename__ = "log_summaries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    dog_id = Column(UUID(as_uuid=True), ForeignKey("dogs.id", ondelete="CASCADE"), index=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    summary_text = Column(Text, nullable=False)
    # embedding = Column(Vector(1536)) # Requires pgvector extension, commented out for now
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    notification_pref = Column(JSONB)
    ai_persona = Column(JSONB)
    marketing_agreed = Column(Boolean, default=False)
    marketing_agreed_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="settings")
