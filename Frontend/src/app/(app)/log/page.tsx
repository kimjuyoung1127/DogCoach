"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, BarChart2, List, ChevronLeft, ChevronRight, FileDown, Sparkles } from "lucide-react";
import { LogCard, LogData } from "@/components/features/log/LogCard";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_LOGS: LogData[] = [
    {
        id: "1",
        time: "14:30",
        location: "거실",
        intensity: 8,
        duration: "5분",
        antecedent: "초인종 소리 (택배)",
        behavior: "현관을 향해 달려가며 짖음",
        consequence: "안아주며 '괜찮아'라고 말함",
        tags: ["택배", "초인종", "외부소음"],
        aiComment: "보호자님, 짖을 때 안아주는 행동은 강아지에게 '짖으면 안아준다(보상)'는 잘못된 신호를 줄 수 있어요. 다음엔 하우스로 보낸 뒤 보상해보세요!"
    },
    {
        id: "2",
        time: "08:15",
        location: "안방",
        intensity: 3,
        duration: "1분 미만",
        antecedent: "기상 후 관심 요구",
        behavior: "침대 밑에서 낑낑거림",
        consequence: "무시하고 화장실로 이동",
        tags: ["기상", "요구성", "아침"],
        aiComment: "무시하기 대처가 아주 훌륭했습니다! 요구성 행동이 줄어들 가능성이 높아요."
    },
    {
        id: "3",
        time: "19:00",
        location: "산책로",
        intensity: 6,
        duration: "30초",
        antecedent: "다른 강아지와 마주침",
        behavior: "줄을 당기며 짖음",
        consequence: "줄을 짧게 잡고 반대 방향으로 회전",
        tags: ["산책", "타견반응"],
    }
];

export default function LogPage() {
    const [activeTab, setActiveTab] = useState<"timeline" | "analytics">("timeline");

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
                        <span>2024년 5월 21일 (화)</span>
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
                                총 <span className="text-brand-lime font-bold">{MOCK_LOGS.length}개</span>의 기록이 있어요.
                            </div>

                            {MOCK_LOGS.map((log) => (
                                <LogCard key={log.id} log={log} />
                            ))}

                            {/* Empty State Placeholder */}
                            {MOCK_LOGS.length === 0 && (
                                <div className="text-center py-20 text-gray-400">
                                    <p>아직 기록이 없어요.</p>
                                    <p className="text-sm mt-2">오늘 하루 머루는 어땠나요?</p>
                                </div>
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
                                    이번 주 머루는 <span className="text-brand-lime font-bold">외부 소음</span>에 가장 민감하게 반응했어요.
                                    특히 오후 2시에서 4시 사이의 짖음 빈도가 지난주 대비 20% 증가했습니다.
                                    산책 시 <span className="underline decoration-brand-lime decoration-2 underline-offset-4">'방향 전환 훈련'</span>을 병행하면 도움이 될 거예요.
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
