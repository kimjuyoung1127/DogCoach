export interface RecommendationItem {
  title: string;
  description: string;
  priority: number;
}

export type RecommendationFeedbackAction =
  | "archive"
  | "helpful"
  | "not_helpful";

export interface RecommendationResponse {
  id: string;
  dog_id: string;
  window_days: number;
  recommendations: RecommendationItem[];
  rationale: string;
  period_comparison: string | null;
  created_at: string;
  expires_at: string;
}

export interface CostStatus {
  daily_cost_usd: number;
  daily_budget_usd: number;
  daily_calls: number;
  monthly_cost_usd: number;
  monthly_budget_usd: number;
  budget_mode: "normal" | "saving_mode" | "rule_only";
  user_remaining_today: number;
}
