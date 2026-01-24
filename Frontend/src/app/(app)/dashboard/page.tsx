"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { DashboardData } from "@/components/features/dashboard/types";
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header";
import { QuickLogWidget } from "@/components/features/dashboard/quick-log-widget";
import { RecentLogList } from "@/components/features/dashboard/recent-log-list";
import { CoachingWidget } from "@/components/features/dashboard/coaching-widget";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
    const router = useRouter();
    const { token, loading: authLoading } = useAuth(); // Get token
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (!token) return; // Wait for token

        try {
            setError(null);
            const res = await apiClient.get<DashboardData>('/dashboard/', {
                token: token, // Pass token
                credentials: 'include'
            });
            setData(res);
        } catch (e: any) {
            console.error("Failed to load dashboard:", e);
            setError(e.message || "데이터 로딩 실패");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            if (token) {
                fetchData();
            } else {
                // Should we redirect to login? Or allow guest?
                // For now, let's try fetching without token if guest mode is supported via cookies
                // BUT, the error was 401, so cookie might be missing or backend requires explicit check.
                // The router allows guest_id from cookie.
                // Let's attempt fetch even if no token, just to leverage cookie.
                // BUT `apiClient` doesn't send token if it's undefined.
                fetchData();
            }
        }
    }, [token, authLoading]);

    const handleLogCreated = () => {
        fetchData();
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">데이터 불러오는 중... ⏳</div>;

    if (error) return (
        <div className="p-8 text-center pt-20">
            <h2 className="text-xl font-bold text-red-500 mb-2">오류가 발생했습니다 😢</h2>
            <p className="text-gray-600 mb-6 bg-gray-100 p-4 rounded-lg text-sm font-mono inline-block">
                {error}
            </p>
            <br />
            <button onClick={fetchData} className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                다시 시도하기
            </button>
        </div>
    );

    if (!data) return (
        <div className="p-8 text-center pt-20">
            <h2 className="text-xl font-bold mb-4">반려견 정보가 없습니다.</h2>
            <p className="text-gray-500 mb-6">설문을 완료하고 맞춤형 코칭을 받아보세요.</p>
            <button onClick={() => router.push('/Survey')} className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg">
                TailLog 시작하기
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <DashboardHeader data={data} />
            <CoachingWidget dogId={data.dog_profile.id} issues={data.issues} />
            <QuickLogWidget dogId={data.dog_profile.id} onLogCreated={handleLogCreated} />
            <RecentLogList logs={data.recent_logs} onLogUpdated={fetchData} />
        </div>
    );
}
