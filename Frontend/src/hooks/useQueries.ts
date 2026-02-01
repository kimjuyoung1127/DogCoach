import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/query-keys";
import { DashboardData } from "@/components/features/dashboard/types";

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
export function useUpdateLog(token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ logId, data }: { logId: string, data: any }) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.patch(`/logs/${logId}`, data, { token });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard('me') });
            // Invalidate specific log key if we had one (we mostly use list)
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        },
    });
}

// 3. Submit Survey
export function useSubmitSurvey(token?: string | null) {
    return useMutation({
        mutationFn: async (payload: any) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.post('/onboarding/survey', payload, { token });
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
