export type PlanType = 'FREE' | 'PRO_MONTHLY' | 'PRO_YEARLY';
export type UserRole = 'GUEST' | 'USER' | 'PRO_USER' | 'EXPERT' | 'ADMIN';
export type NotiChannel = 'ALIMTALK' | 'WEB_PUSH' | 'EMAIL';

export interface UserSettings {
    id: string;
    user_id: string;
    notification_pref: NotificationPref;
    ai_persona: AiPersona;
    marketing_agreed: boolean;
    marketing_agreed_at?: string;
    updated_at: string;
}

export interface NotificationPref {
    channels: {
        alimtalk: boolean;
        push: boolean;
        email: boolean;
    };
    types: {
        reminder: boolean;
        weekly_report: boolean;
        marketing: boolean;
    };
    quiet_hours: {
        enabled: boolean;
        start: string; // "22:00"
        end: string;   // "07:00"
    };
    remind_time: string; // "20:00"
}

export interface AiPersona {
    tone: 'EMPATHETIC' | 'SOLUTION';
    perspective: 'COACH' | 'DOG';
}

export interface Subscription {
    id: string;
    user_id: string;
    plan_type: PlanType;
    next_billing_date?: string;
    is_active: boolean;
    pg_provider?: string;
    pg_customer_key?: string;
    canceled_at?: string;
    cancel_reason?: string;
    created_at: string;
    updated_at: string;
}

export interface UserProfile {
    id: string;
    email?: string; // from auth
    phone_number?: string;
    role: UserRole;
    status: string;
    timezone: string;
    last_login_at?: string;
    provider?: string;
    created_at: string;
}

export interface DogProfileFull {
    basic: {
        id: string;
        name: string;
        breed?: string;
        birth_date?: string;
        sex?: string;
        profile_image_url?: string;
    };
    environment: Record<string, any>;
    health: Record<string, any>;
    rewards: Record<string, any>;
    behavior: {
        chronic_issues?: any[];
        triggers?: any[];
    };
    past_attempts: any[];
    temperament: Record<string, any>;
}
