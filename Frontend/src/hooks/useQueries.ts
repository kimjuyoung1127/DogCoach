import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/query-keys";
import { DashboardData } from "@/components/features/dashboard/types";

// 1. Dashboard Data Hook
export function useDashboardData(enabled: boolean = true, token?: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.dashboard('me'),
        queryFn: async () => {
            if (!token) throw new Error("Authentication required");
            return await apiClient.get<DashboardData>('/dashboard/', {
                credentials: 'include',
                token
            });
        },
        enabled: enabled && !!token,
        staleTime: 1000 * 60 * 2,
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

// 3. Dog Context Hook (Static Environment Data)
export function useDogContext(dogId: string | undefined, token?: string | null) {
    return useQuery({
        queryKey: QUERY_KEYS.dogContext(dogId || ''),
        queryFn: async () => {
            if (!dogId || !token) return null;
            const data = await apiClient.get<DashboardData>('/dashboard/', {
                credentials: 'include',
                token
            });
            return {
                dog: data.dog_profile,
                env_triggers: data.env_triggers,
                env_consequences: data.env_consequences,
                issues: data.issues
            };
        },
        enabled: !!dogId && !!token,
        staleTime: 1000 * 60 * 60,
    });
}
