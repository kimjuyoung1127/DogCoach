"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, BarChart2, List, ChevronLeft, ChevronRight, FileDown, Sparkles } from "lucide-react";
import { LogCard, LogData } from "@/components/features/log/LogCard";
import { cn } from "@/lib/utils";
import { useDogLogs, useDogContext, useDashboardData } from "@/hooks/useQueries";
import { useAuth } from "@/hooks/useAuth";

export default function LogPage() {
    const [activeTab, setActiveTab] = useState<"timeline" | "analytics">("timeline");
    const { token } = useAuth();

    // 1. Fetch Dog Context (to get Dog ID & Env info)
    // NOTE: Ideally we should get the selected dog ID from a global store or URL.
    // For now, we assume the user has one dog/primary dog and fetch context to find it.
    // Optimization: In a real app, `dashboard` query might be better if it returns ID. 
    // But since useDogContext relies on ID, we have a chicken-egg problem if we don't know ID.
    // Let's assume we can get dashboard data to find the ID first.
    // Actually, let's use `useDashboardData` here too to get the ID, then `useDogLogs`.
    // Or better: DashboardData contains everything needed for now.

    // Let's use `useDashboardData` to get the primary dog ID first.
    // Then we can use specialized hooks if needed, but `dashboard` has `recent_logs` which is limited.
    // IF we want ALL logs, we need `useDogLogs`.

    // Step 1: Get Primary Dog ID
    // We'll import useDashboardData just to get the ID.
    // (In future: Global State `useStore` would hold `selectedDogId`)
    const { data: dashboardData } = useDashboardData(!!token, token);
    const dogId = dashboardData?.dog_profile?.id;

    // Step 2: Fetch Logs using ID
    const { data: logs, isLoading } = useDogLogs(dogId, token);

    // Step 3: Fetch Context (Optional, for Analysis view)
    const { data: context } = useDogContext(dogId, token);

    // Filter Logic (Mock Date for now as we don't have a date picker state yet)
    // In real app: filteredLogs = logs.filter(...)
    const displayLogs = logs || [];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header: Date Picker & Tabs */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
                {/* Date Navigation */}
                <div className="flex items-center justify-between px-6 py-4">
                    <button className="p-2 -ml-2 text-gray-400 hover:text-gray-900">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                        <CalendarIcon className="w-4 h-4 text-brand-lime" />
                        <span>전체 기록 (최신순)</span>
                    </div>
                    <button className="p-2 -mr-2 text-gray-400 hover:text-gray-900">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="flex px-6 pb-0">
                    <button
                        onClick={() => setActiveTab("timeline")}
                        className={cn(
                            "flex-1 pb-3 text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2",
                            activeTab === "timeline"
                                ? "border-brand-lime text-brand-lime"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                        )}
                    >
                        <List className="w-4 h-4" />
                        타임라인
                    </button>
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={cn(
                            "flex-1 pb-3 text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2",
                            activeTab === "analytics"
                                ? "border-brand-lime text-brand-lime"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                        )}
                    >
                        <BarChart2 className="w-4 h-4" />
                        분석 & 코칭
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <main className="px-6 py-6 container mx-auto max-w-2xl">
                <AnimatePresence mode="wait">
                    {activeTab === "timeline" ? (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="mb-4 text-sm text-gray-500 font-medium">
                                총 <span className="text-brand-lime font-bold">{displayLogs.length}개</span>의 기록이 있어요.
                            </div>

                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {displayLogs.map((log: any) => (
                                        <LogCard
                                            key={log.id}
                                            log={{
                                                id: log.id,
                                                time: new Date(log.occurred_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                location: "집 (추정)", // TODO: Add location to DB schema if needed
                                                intensity: log.intensity,
                                                duration: log.duration ? `${log.duration}초` : "-",
                                                antecedent: log.antecedent || "-",
                                                behavior: log.behavior,
                                                consequence: log.consequence || "-",
                                                tags: [], // Metadata is flattened in current schema, need to parse if JSONB
                                                aiComment: "AI 코칭이 준비 중입니다." // Placeholder
                                            }}
                                        />
                                    ))}

                                    {/* Empty State Placeholder */}
                                    {displayLogs.length === 0 && (
                                        <div className="text-center py-20 text-gray-400">
                                            <p>아직 기록이 없어요.</p>
                                            <p className="text-sm mt-2">오늘 하루 강아지는 어땠나요?</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Context Info (Cached) */}
                            {context && (
                                <div className="bg-gray-100 p-4 rounded-xl text-xs text-gray-500 mb-4">
                                    <span className="font-bold block mb-1">💡 환경 컨텍스트 (Cached):</span>
                                    {JSON.stringify(context.env_triggers?.slice(0, 3))} 등...
                                </div>
                            )}

                            {/* Vet Report Button */}
                            <button className="w-full bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-gray-200 active:scale-[0.98] transition-transform">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <FileDown className="w-5 h-5 text-brand-lime" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold">데이터 문진표 생성</div>
                                        <div className="text-[10px] text-gray-400">수의사/훈련사 상담용 PDF 리포트</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Weekly AI Insight */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-brand-lime">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-brand-lime" />
                                    <h3 className="font-bold text-gray-900">주간 AI 코칭 리포트</h3>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    이번 주 주요 원인은 <span className="text-brand-lime font-bold">{context?.env_triggers?.[0] || "데이터 부족"}</span> 입니다.
                                    <br />
                                    (실제 데이터 기반 분석이 곧 제공됩니다.)
                                </p>
                            </div>

                            {/* Chart Placeholders */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4">요일별 빈도</h4>
                                    <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 text-[10px] border border-dashed border-gray-200">
                                        Heatmap Placeholder
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4">주요 원인 분석</h4>
                                    <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 text-[10px] border border-dashed border-gray-200">
                                        Radar Chart Placeholder
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
