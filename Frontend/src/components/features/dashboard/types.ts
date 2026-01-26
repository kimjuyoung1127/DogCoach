export interface QuickLogStats {
    total_logs: number;
    current_streak: number;
    last_logged_at: string | null;
}

export interface RecentLog {
    id: string;
    behavior: string;
    intensity: number;
    occurred_at: string;
    antecedent?: string;
    consequence?: string;
}

export interface DogProfile {
    id: string;
    name: string;
    breed: string | null;
    age_months: number | null;
    profile_image_url: string | null;
}

export interface DashboardData {
    dog_profile: DogProfile;
    stats: QuickLogStats;
    recent_logs: RecentLog[];
    issues: string[];
    env_triggers: string[];
    env_consequences: string[];
}
