export const QUERY_KEYS = {
  dashboard: (scope: string) => ["dashboard", scope] as const,
  logs: (dogId: string) => ["logs", dogId] as const,
  userProfile: (scope: string) => ["user-profile", scope] as const,
  aiRecommendations: (dogId: string, windowDays: number) =>
    ["ai-recommendations", dogId, windowDays] as const,
  aiCostStatus: () => ["ai-cost-status"] as const,
};

