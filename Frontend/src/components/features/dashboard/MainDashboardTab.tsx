"use client";

import { FadeIn } from "@/components/ui/animations/FadeIn";
import { QuickLogWidget } from "./QuickLogWidget";
import { RecentLogList } from "./RecentLogList";

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
        <div className="space-y-6">
            <FadeIn delay={0.1}>
                <QuickLogWidget dogId={dogId} onLogCreated={onLogCreated} />
            </FadeIn>

            <FadeIn delay={0.2}>
                <RecentLogList
                    logs={recentLogs}
                    onLogUpdated={onLogUpdated}
                    onEditLog={onEditLog}
                />
            </FadeIn>
        </div>
    );
}
