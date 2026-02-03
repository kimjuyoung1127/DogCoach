"use client";

import { FadeIn } from "@/components/ui/animations/FadeIn";
import { QuickLogWidget } from "./QuickLogWidget";
import { RecentLogList } from "./RecentLogList";
import { PremiumBackground } from "@/components/shared/ui/PremiumBackground";

interface MainDashboardTabProps {
    dogId: string;
    recentLogs: any[];
    onLogCreated: (newLog?: any) => void;
    onLogUpdated: () => void;
    onEditLog: (log: any) => void;
}

export function MainDashboardTab({
    dogId,
    recentLogs,
    onLogCreated,
    onLogUpdated,
    onEditLog
}: MainDashboardTabProps) {
    return (
        <div className="relative">
            {/* Content Layer */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
                {/* Bento Grid Layout */}
                <div className="flex flex-col gap-8">
                    {/* Quick Log - Full Width for ease of use on mobile, but inside a grid container for future expansion */}
                    <FadeIn delay={0.1}>
                        <QuickLogWidget dogId={dogId} onLogCreated={onLogCreated} />
                    </FadeIn>

                    {/* Recent Logs - Primary Column */}
                    <FadeIn delay={0.2}>
                        <RecentLogList
                            logs={recentLogs}
                            onLogUpdated={onLogUpdated}
                            onEditLog={onEditLog}
                        />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
