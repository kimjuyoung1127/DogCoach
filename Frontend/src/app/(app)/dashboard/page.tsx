"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { EditLogDialog } from "@/components/features/dashboard/EditLogDialog";
import { CreateLogDialog } from "@/components/features/dashboard/CreateLogDialog";
import { MainDashboardTab } from "@/components/features/dashboard/MainDashboardTab";
import { CoreDataRequiredBanner } from "@/components/features/dashboard/CoreDataRequiredBanner";

import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/features/dashboard/DashboardSkeleton";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { AnimatePresence } from "framer-motion";

import { useDashboardData } from "@/hooks/useQueries";

import { PremiumBackground } from "@/components/shared/ui/PremiumBackground";

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { token } = useAuth();
    const [editingLog, setEditingLog] = useState<any | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { data, isLoading, error, refetch } = useDashboardData(!!token, token);

    // Detect openDetailLog query parameter
    useEffect(() => {
        if (searchParams.get('openDetailLog') === '1') {
            setIsCreateDialogOpen(true);
        }
    }, [searchParams]);

    const handleLogCreated = (newLog?: any) => {
        // Cache invalidation handled by useCreateLog.onSettled
        if (newLog) {
            setEditingLog(newLog);
        }
    };

    const handleCreateSuccess = () => {
        setIsCreateDialogOpen(false);
        // Remove query parameter after successful creation
        router.replace('/dashboard');
    };

    const handleLogUpdated = () => {
        // Cache invalidation handled by useUpdateLog.onSuccess
    };

    if (isLoading) return <DashboardSkeleton />;

    if (error) return (
        <div className="p-8 text-center pt-20">
            <h2 className="text-xl font-bold text-red-500 mb-2">오류가 발생했습니다 😢</h2>
            <p className="text-gray-600 mb-6 bg-gray-100 p-4 rounded-lg text-sm font-mono inline-block">
                {error ? (error as Error).message : "Loading error"}
            </p>
            <br />
            <button onClick={() => refetch()} className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                다시 시도하기
            </button>
        </div>
    );

    if (!data) return (
        <div className="p-8 text-center pt-20">
            <h2 className="text-xl font-bold mb-4">반려견 정보가 없습니다.</h2>
            <p className="text-gray-500 mb-6">설문을 완료하고 맞춤형 코칭을 받아보세요.</p>
            <button onClick={() => router.push('/survey')} className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg">
                DogCoach 시작하기
            </button>
        </div>
    );

    // 핵심 데이터 체크 함수
    const hasCoreData = (data: any) => {
        return (
            data.dog_profile?.name &&
            data.dog_profile?.breed &&
            data.issues?.length > 0 &&
            data.env_triggers?.length > 0
        );
    };

    // 핵심 데이터 없으면 차단
    if (!hasCoreData(data)) {
        return <CoreDataRequiredBanner onResume={() => router.push('/survey')} />;
    }

    return (
        <div className="min-h-screen pb-28">
            <PremiumBackground />

            <div className="relative z-10">
                <DashboardHeader data={data} />

                <div className="px-1">
                    <FadeIn delay={0.1}>
                        <MainDashboardTab
                            dogId={data.dog_profile.id}
                            recentLogs={data.recent_logs}
                            onLogCreated={handleLogCreated}
                            onLogUpdated={handleLogUpdated}
                            onEditLog={setEditingLog}
                        />
                    </FadeIn>
                </div>
            </div>

            {/* Hoisted Edit Dialog */}
            <AnimatePresence>
                {editingLog && (
                    <EditLogDialog
                        key="edit-log-dialog"
                        log={editingLog}
                        open={!!editingLog}
                        onClose={() => setEditingLog(null)}
                        onUpdate={() => {
                            setEditingLog(null);
                            handleLogUpdated();
                        }}
                        envTriggers={data.env_triggers || []}
                        envConsequences={data.env_consequences || []}
                        dogId={data.dog_profile.id}
                    />
                )}
            </AnimatePresence>

            {/* Create Log Dialog */}
            <AnimatePresence>
                {isCreateDialogOpen && (
                    <CreateLogDialog
                        key="create-log-dialog"
                        open={isCreateDialogOpen}
                        onClose={() => {
                            setIsCreateDialogOpen(false);
                            router.replace('/dashboard');
                        }}
                        onCreate={handleCreateSuccess}
                        envTriggers={data.env_triggers || []}
                        envConsequences={data.env_consequences || []}
                        dogId={data.dog_profile.id}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}
