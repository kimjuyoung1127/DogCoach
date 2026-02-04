"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, BarChart2, List, ChevronLeft, ChevronRight, FileDown, Sparkles, Loader2 } from "lucide-react";
import { LogCard } from "@/components/features/log/LogCard";
import { AnalyticsView } from "@/components/features/log/AnalyticsView";
import { RecommendationSection } from "@/components/features/log/RecommendationSection";
import { ReportDocument } from "@/components/features/log/ReportDocument";
import { cn } from "@/lib/utils";
import { useDogLogs, useDashboardData } from "@/hooks/useQueries";
import { useAuth } from "@/hooks/useAuth";
import { pdf } from "@react-pdf/renderer";
import { toPng } from "html-to-image";
import { apiClient } from "@/lib/api";
import { LottieLoading } from "@/components/shared/ui/LottieLoading";

import { PremiumBackground } from "@/components/shared/ui/PremiumBackground";

export default function LogPage() {
    const [activeTab, setActiveTab] = useState<"timeline" | "analytics">("timeline");
    const { token } = useAuth();
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);

    // Fetch Data
    const { data: dashboardData } = useDashboardData(!!token, token);
    const dogId = dashboardData?.dog_profile?.id;
    const dogName = dashboardData?.dog_profile?.name || "반려견";
    const { data: logs, isLoading } = useDogLogs(dogId, token);

    const displayLogs = logs || [];

    // PDF Generation Handler
    const handleDownloadReport = async () => {
        if (!displayLogs.length) return alert("데이터가 부족합니다.");
        setIsGeneratingPdf(true);

        try {
            // 1. Capture Charts as Image using html-to-image (Better Tailwind v4 support)
            const chartElement = document.getElementById("analytics-view-container");
            let chartImage = undefined;

            if (chartElement) {
                chartImage = await toPng(chartElement, {
                    quality: 0.95,
                    backgroundColor: '#ffffff',
                    pixelRatio: 2 // High quality
                });
            }

            // 2. AI Analysis Fetch (NEW)
            let analysisResult = aiAnalysis;
            if (!analysisResult && dogId) {
                try {
                    const response = await apiClient.coach.analyze(dogId, { token: token ?? undefined });
                    analysisResult = response;
                    setAiAnalysis(response);
                } catch (aiErr) {
                    console.error("AI Analysis failed, falling back to static", aiErr);
                    // Fallback insight if AI fails
                    analysisResult = {
                        insight: "데이터 패턴 기반 정밀 진단 준비 중...",
                        dog_voice: "다음 기록을 더 정밀하게 분석해 드릴게요!"
                    };
                }
            }

            // 3. Determine Recommendation Course (Static or Dynamic)
            const triggerCounts: Record<string, number> = {};
            displayLogs.forEach((log: any) => {
                if (log.antecedent) triggerCounts[log.antecedent] = (triggerCounts[log.antecedent] || 0) + 1;
            });
            const topTrigger = Object.keys(triggerCounts).sort((a, b) => triggerCounts[b] - triggerCounts[a])[0] || "정보 없음";

            // 4. Generate PDF Blob
            const blob = await pdf(
                <ReportDocument
                    dogName={dogName}
                    logs={displayLogs}
                    chartImage={chartImage}
                    aiAnalysis={analysisResult}
                    recommendedCourse={{
                        id: "custom",
                        title: `[${topTrigger} 케어] 맞춤 솔루션`,
                        description: analysisResult?.action_plan || "데이터 분석을 통해 도출된 가장 시급한 문제 행동 교정 코스입니다.",
                        total_days: 5,
                        difficulty: "Medium",
                        stages: [
                            { id: "1", title: "원인 파악 및 환경 통제", goal: "자극을 최소화합니다.", day: 1, icon: Sparkles as any, steps: [] },
                            { id: "2", title: "대체 행동 강화", goal: "긍정적 행동을 유도합니다.", day: 2, icon: Sparkles as any, steps: [] },
                            { id: "3", title: "심화 적응 훈련", goal: "다양한 상황에 적용합니다.", day: 3, icon: Sparkles as any, steps: [] },
                        ]
                    }}
                />
            ).toBlob();

            // 4. Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${dogName}_행동분석_리포트.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (e) {
            console.error(e);
            alert("리포트 생성 중 오류가 발생했습니다.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-y-auto">
            <PremiumBackground />

            {/* Header: Date Picker & Tabs */}
            <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-md border-b border-white/60 ring-1 ring-black/5">
                <div className="flex items-center justify-between px-6 py-4">
                    <button className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.2em] mb-0.5">Archive</span>
                        <div className="flex items-center gap-2 font-black text-gray-900 tracking-tight">
                            <span>전체 기록</span>
                        </div>
                    </div>
                    <button className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex px-6">
                    <button
                        onClick={() => setActiveTab("timeline")}
                        className={cn(
                            "flex-1 pb-3 text-sm font-black border-b-2 transition-all flex items-center justify-center gap-2 tracking-tight",
                            activeTab === "timeline" ? "border-brand-lime text-brand-lime" : "border-transparent text-gray-400 hover:text-gray-600"
                        )}
                    >
                        <List className="w-4 h-4" />
                        타임라인
                    </button>
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={cn(
                            "flex-1 pb-3 text-sm font-black border-b-2 transition-all flex items-center justify-center gap-2 tracking-tight",
                            activeTab === "analytics" ? "border-brand-lime text-brand-lime" : "border-transparent text-gray-400 hover:text-gray-600"
                        )}
                    >
                        <BarChart2 className="w-4 h-4" />
                        분석 & 코칭
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <main className="px-6 py-8 container mx-auto max-w-2xl relative z-10">
                <AnimatePresence mode="wait">
                    {activeTab === "timeline" ? (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="text-sm text-gray-500 font-medium">
                                총 <span className="text-brand-lime font-bold">{displayLogs.length}개</span>의 기록이 있어요.
                            </div>

                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <LottieLoading type="cute" message="기록을 불러오고 있어요..." size={250} />
                                </div>
                            ) : (
                                <>
                                    {displayLogs.map((log: any) => (
                                        <LogCard
                                            key={log.id}
                                            log={{
                                                id: log.id,
                                                time: new Date(log.occurred_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                location: "집 (추정)",
                                                intensity: log.intensity,
                                                duration: log.duration ? `${log.duration}초` : "-",
                                                antecedent: log.antecedent || "-",
                                                behavior: log.behavior,
                                                consequence: log.consequence || "-",
                                                tags: [],
                                                aiComment: "AI 코칭이 준비 중입니다."
                                            }}
                                        />
                                    ))}
                                    {displayLogs.length === 0 && (
                                        <div className="text-center py-20 text-gray-400">
                                            <p>아직 기록이 없어요.</p>
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
                            {/* Recommendation Section (First for emphasis) */}
                            <RecommendationSection logs={displayLogs} dogName={dogName} />

                            {/* Vet Report Button */}
                            <button
                                onClick={handleDownloadReport}
                                disabled={isGeneratingPdf}
                                className="w-full bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-gray-200 active:scale-[0.98] transition-transform disabled:opacity-70 disabled:scale-100"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        {isGeneratingPdf ? <Loader2 className="w-5 h-5 text-brand-lime animate-spin" /> : <FileDown className="w-5 h-5 text-brand-lime" />}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold">
                                            {isGeneratingPdf ? "리포트 생성 중..." : "데이터 문진표 저장하기"}
                                        </div>
                                        <div className="text-[10px] text-gray-400">수의사/훈련사 상담용 PDF (고화질)</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Analytics Charts */}
                            <AnalyticsView id="analytics-view-container" logs={displayLogs} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

