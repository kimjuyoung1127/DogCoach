import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/query-keys";
import { DashboardData } from "@/components/features/dashboard/types";
import type { TrainingAlternative } from "@/data/curriculum/types";
import type {
    RecommendationResponse,
    CostStatus,
    RecommendationFeedbackAction,
} from "@/components/features/ai-recommendations/types";

// ==========================================
// QUERIES
// ==========================================

// 1. Dashboard Data Hook
export function useDashboardData(enabled: boolean = true, token?: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.dashboard('me'),
        queryFn: async () => {
            // Token is optional now (Guest support via Cookie)
            return await apiClient.get<DashboardData>('/dashboard/', {
                credentials: 'include',
                token: token || undefined
            });
        },
        enabled: enabled, // Enabled even without token (for Guests)
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}

// 2. Dog Logs Hook (Dynamic Timeline)
export function useDogLogs(dogId: string | undefined, token?: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.logs(dogId || ''),
        queryFn: async () => {
            if (!dogId || !token) return [];
            return await apiClient.get<any[]>(`/logs/${dogId}`, { token });
        },
        enabled: !!dogId && !!token,
    });
}

// 3. User Profile (Sidebar)
export function useUserProfile(token?: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.userProfile('me'),
        queryFn: async () => {
            if (!token) return null;
            return await apiClient.get<any>("/auth/me", { token });
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 10, // 10 minutes (Profile rarely changes)
    });
}

// 4. Training Statuses Hook
export function useTrainingStatuses(token?: string | null) {
    return useQuery({
        queryKey: ['training_status'],
        queryFn: async () => {
            if (!token) return [];
            return await apiClient.get<any[]>("/coach/status", { token });
        },
        enabled: !!token,
    });
}


// ==========================================
// MUTATIONS
// ==========================================

// 1. Create Log (Optimistic Update)
export function useCreateLog(dogId: string, token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newLog: any) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.post('/logs', { ...newLog, dog_id: dogId }, { token });
        },
        onMutate: async (newLog) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.logs(dogId) });
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.dashboard('me') });

            // Snapshot previous value
            const previousLogs = queryClient.getQueryData(QUERY_KEYS.logs(dogId));

            // Optimistically update to the new value
            queryClient.setQueryData(QUERY_KEYS.logs(dogId), (old: any[] = []) => [
                {
                    id: 'temp-id-' + Date.now(),
                    ...newLog,
                    occurred_at: newLog.occurred_at || new Date().toISOString(),
                    dog_id: dogId
                },
                ...old,
            ]);

            return { previousLogs };
        },
        onError: (err, newLog, context) => {
            queryClient.setQueryData(QUERY_KEYS.logs(dogId), context?.previousLogs);
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.logs(dogId) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard('me') });
        },
    });
}

// 2. Update Log
export function useUpdateLog(dogId: string, token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ logId, data }: { logId: string, data: any }) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.patch(`/logs/${logId}`, data, { token });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard('me') });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.logs(dogId) });
        },
    });
}

// 3. Submit Survey (guest submit allowed – token is optional)
export function useSubmitSurvey(token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            return await apiClient.post('/onboarding/survey', payload, {
                token: token || undefined,
                credentials: 'include',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard('me') });
        },
    });
}

// 4. Get Coaching Advice
export function useGetCoachingAdvice(token?: string | null) {
    return useMutation({
        mutationFn: async ({ dogId, issue }: { dogId: string, issue: string }) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.post<any>('/coach/generate', { dog_id: dogId, issue }, { token });
        },
    });
}

// 5. Update Training Status
export function useUpdateTrainingStatus(token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.post('/coach/status', data, { token });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['training_status'] });
        },
    });
}

// 6. Delete Training Status
export function useDeleteTrainingStatus(token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ curriculumId, stageId, stepNumber }: { curriculumId: string, stageId: string, stepNumber: number }) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.delete(`/coach/status/${curriculumId}/${stageId}/${stepNumber}`, { token });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['training_status'] });
        },
    });
}

// 7. Fetch C alternative for challenge modal (on-demand)
export function useFetchCAlternative(token?: string | null) {
    return useMutation({
        mutationFn: async ({
            dog_id,
            issue = "general",
            window_days = 7,
        }: {
            dog_id: string;
            issue?: string;
            window_days?: 7 | 15 | 30;
        }): Promise<TrainingAlternative> => {
            const response = await apiClient.post<RecommendationResponse>(
                '/coach/recommendations',
                { dog_id, window_days, issue, force_refresh: false },
                { token: token || undefined, credentials: 'include' },
            );

            const top = response.recommendations?.[0];
            if (!top) {
                throw new Error("No recommendation returned");
            }

            return {
                id: "C",
                title: top.title || "Plan C",
                description:
                    top.description ||
                    "짧은 세션으로 난도를 낮추고 성공 기준을 다시 맞춰 진행해보세요.",
            };
        },
    });
}


// ==========================================
// AI RECOMMENDATIONS
// ==========================================

// 8. AI Recommendations (generate or return cached)
export function useAIRecommendations(
    dogId: string | undefined,
    windowDays: number = 7,
    enabled: boolean = true,
    token?: string | null,
) {
    return useQuery({
        queryKey: QUERY_KEYS.aiRecommendations(dogId || '', windowDays),
        queryFn: async () => {
            return await apiClient.post<RecommendationResponse>(
                '/coach/recommendations',
                { dog_id: dogId, window_days: windowDays, issue: 'general', force_refresh: false },
                { token: token || undefined, credentials: 'include' },
            );
        },
        enabled: enabled && !!dogId,
        staleTime: windowDays === 7 ? 1000 * 60 * 60 * 72 : 1000 * 60 * 60 * 168,
    });
}

// 9. Latest cached recommendations (no generation, GET only)
export function useLatestRecommendations(
    dogId: string | undefined,
    windowDays: number,
    enabled: boolean = false,
    token?: string | null,
) {
    return useQuery({
        queryKey: QUERY_KEYS.aiRecommendations(dogId || '', windowDays),
        queryFn: async () => {
            return await apiClient.get<RecommendationResponse>(
                `/coach/recommendations/latest?dog_id=${dogId}&window_days=${windowDays}`,
                { token: token || undefined, credentials: 'include' },
            );
        },
        enabled: enabled && !!dogId,
        staleTime: 1000 * 60 * 60 * 168,
    });
}

// 10. Submit recommendation feedback (no LLM call)
export function useSubmitRecommendationFeedback(token?: string | null) {
    return useMutation({
        mutationFn: async ({ snapshotId, ...data }: {
            snapshotId: string;
            recommendation_index: number;
            action: RecommendationFeedbackAction;
            note?: string;
        }) => {
            return await apiClient.post(
                `/coach/recommendations/${snapshotId}/feedback`,
                data,
                { token: token || undefined, credentials: 'include' },
            );
        },
    });
}

// 11. Create Behavior Snapshot (on training start)
export function useCreateBehaviorSnapshot(token?: string | null) {
    return useMutation({
        mutationFn: async ({ dogId, curriculumId }: { dogId: string; curriculumId: string }) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.post('/coach/behavior-snapshot', {
                dog_id: dogId,
                curriculum_id: curriculumId,
            }, { token, credentials: 'include' });
        },
    });
}

// 12. Compare Behavior Snapshots (baseline vs latest)
export function useBehaviorSnapshotComparison(
    dogId: string | undefined,
    curriculumId: string | undefined,
    enabled: boolean = true,
    token?: string | null,
) {
    return useQuery({
        queryKey: ['behavior_snapshot_comparison', dogId || '', curriculumId || ''],
        queryFn: async () => {
            if (!dogId || !curriculumId || !token) return null;
            return await apiClient.get<any>(
                `/coach/behavior-snapshot/compare?dog_id=${dogId}&curriculum_id=${curriculumId}`,
                { token, credentials: 'include' },
            );
        },
        enabled: enabled && !!dogId && !!curriculumId && !!token,
        staleTime: 1000 * 60 * 5,
    });
}

// 13. AI Cost Status
export function useAICostStatus(token?: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.aiCostStatus(),
        queryFn: async () => {
            return await apiClient.get<CostStatus>(
                '/coach/cost-status',
                { token: token || undefined, credentials: 'include' },
            );
        },
        staleTime: 1000 * 60 * 5,
    });
}
