-- ============================================
-- DogCoach Supabase Schema Migration
-- Generated from SQLAlchemy models.py
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. ENUM TYPES
-- ============================================
CREATE TYPE user_role AS ENUM ('GUEST', 'USER', 'PRO_USER', 'EXPERT', 'ADMIN');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');
CREATE TYPE plan_type AS ENUM ('FREE', 'PRO_MONTHLY', 'PRO_YEARLY');
CREATE TYPE dog_sex AS ENUM ('MALE', 'FEMALE', 'MALE_NEUTERED', 'FEMALE_NEUTERED');
CREATE TYPE asset_type AS ENUM ('PHOTO', 'VIDEO', 'LOTTIE_SNAPSHOT');
CREATE TYPE report_type AS ENUM ('DAILY', 'WEEKLY', 'INSIGHT');
CREATE TYPE noti_channel AS ENUM ('ALIMTALK', 'WEB_PUSH', 'EMAIL');

-- ============================================
-- 2. TABLES
-- ============================================

-- users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kakao_sync_id VARCHAR(255) UNIQUE,
    role user_role DEFAULT 'GUEST',
    phone_number VARCHAR(255),
    status user_status DEFAULT 'ACTIVE',
    timezone VARCHAR(50) DEFAULT 'Asia/Seoul',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    last_login_at TIMESTAMPTZ,
    provider VARCHAR
);
CREATE INDEX idx_users_kakao_sync_id ON users(kakao_sync_id);

-- subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_type plan_type DEFAULT 'FREE',
    next_billing_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    pg_provider VARCHAR,
    pg_customer_key VARCHAR,
    canceled_at TIMESTAMPTZ,
    cancel_reason TEXT
);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- dogs
CREATE TABLE dogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255),
    birth_date DATE,
    sex dog_sex,
    profile_image_url TEXT,
    anonymous_sid VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_dogs_user_id ON dogs(user_id);

-- dog_env
CREATE TABLE dog_env (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id UUID UNIQUE REFERENCES dogs(id) ON DELETE CASCADE,
    household_info JSONB,
    health_meta JSONB,
    profile_meta JSONB,
    rewards_meta JSONB,
    chronic_issues JSONB,
    antecedents JSONB,
    triggers JSONB,
    past_attempts JSONB,
    temperament JSONB,
    activity_meta JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_dog_env_dog_id ON dog_env(dog_id);

-- behavior_logs
CREATE TABLE behavior_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE,
    is_quick_log BOOLEAN DEFAULT FALSE,
    type_id INTEGER,
    antecedent TEXT,
    behavior TEXT,
    consequence TEXT,
    intensity INTEGER,
    duration INTEGER,
    occurred_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_behavior_logs_dog_id ON behavior_logs(dog_id);
CREATE INDEX idx_logs_dog_occurred ON behavior_logs(dog_id, occurred_at);

-- media_assets
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_id UUID REFERENCES behavior_logs(id) ON DELETE SET NULL,
    storage_url TEXT NOT NULL,
    asset_type asset_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_media_assets_log_id ON media_assets(log_id);

-- ai_coaching
CREATE TABLE ai_coaching (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE,
    report_type report_type NOT NULL,
    analysis_json JSONB,
    action_items JSONB,
    feedback_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_ai_coaching_dog_id ON ai_coaching(dog_id);

-- action_tracker
CREATE TABLE action_tracker (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coaching_id UUID REFERENCES ai_coaching(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_action_tracker_coaching_id ON action_tracker(coaching_id);

-- noti_history
CREATE TABLE noti_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    channel noti_channel NOT NULL,
    template_code VARCHAR(100),
    sent_at TIMESTAMPTZ DEFAULT now(),
    read_at TIMESTAMPTZ
);
CREATE INDEX idx_noti_history_user_id ON noti_history(user_id);

-- log_summaries
CREATE TABLE log_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    summary_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_log_summaries_dog_id ON log_summaries(dog_id);

-- user_settings
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    notification_pref JSONB,
    ai_persona JSONB,
    marketing_agreed BOOLEAN DEFAULT FALSE,
    marketing_agreed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);

-- ============================================
-- 3. RLS (Row Level Security) - Enable on all tables
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dog_env ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavior_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_coaching ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE noti_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE log_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS Policies - Service role bypass (Backend API uses service_role key)
-- ============================================
-- Allow service_role full access (backend API)
CREATE POLICY "Service role full access" ON users FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON subscriptions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON dogs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON dog_env FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON behavior_logs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON media_assets FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON ai_coaching FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON action_tracker FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON noti_history FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON log_summaries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON user_settings FOR ALL USING (auth.role() = 'service_role');

-- Users can read their own data
CREATE POLICY "Users read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users read own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own dogs" ON dogs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own settings" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own notifications" ON noti_history FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 5. updated_at auto-trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_dogs_updated_at BEFORE UPDATE ON dogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_dog_env_updated_at BEFORE UPDATE ON dog_env FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_behavior_logs_updated_at BEFORE UPDATE ON behavior_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_action_tracker_updated_at BEFORE UPDATE ON action_tracker FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
