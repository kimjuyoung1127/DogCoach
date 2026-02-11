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

// 3. Submit Survey
export function useSubmitSurvey(token?: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.post('/onboarding/survey', payload, {
                token,
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


