"use client";

import { useMemo } from "react";
import { TRAINING_CURRICULUM, TrainingCourse } from "@/data/curriculum";
import { Play, ClipboardList, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RecommendationSectionProps {
    logs: any[]; // Replace with implicit Log type
    dogName: string;
}

export function RecommendationSection({ logs, dogName }: RecommendationSectionProps) {
    // Simple logic to recommend based on log triggers
    // In real app, this would be a more complex algorithm or backend response
    const recommendedCourse = useMemo(() => {
        if (!logs || logs.length === 0) return TRAINING_CURRICULUM[0]; // Default to Sep Anxiety

        // Count triggers
        const triggerCounts: Record<string, number> = {};
        logs.forEach(log => {
            if (log.antecedent) {
                triggerCounts[log.antecedent] = (triggerCounts[log.antecedent] || 0) + 1;
            }
        });

        // Determine top trigger (very naive matching)
        const topTrigger = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

        if (topTrigger?.includes("소리") || topTrigger?.includes("짖")) {
            return TRAINING_CURRICULUM.find(c => c.id === "barking_noise") || TRAINING_CURRICULUM[0];
        }
        if (topTrigger?.includes("배변") || topTrigger?.includes("실수")) {
            return TRAINING_CURRICULUM.find(c => c.id === "toilet_training") || TRAINING_CURRICULUM[0];
        }
        if (topTrigger?.includes("산책") || topTrigger?.includes("줄")) {
            return TRAINING_CURRICULUM.find(c => c.id === "leash_walking") || TRAINING_CURRICULUM[0];
        }

        return TRAINING_CURRICULUM[0];
    }, [logs]);

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-brand-lime" />
                <h3 className="font-bold text-gray-900 text-lg">
                    {dogName}님을 위한 맞춤 추천
                </h3>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full -mr-10 -mt-10 blur-3xl" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <span className="inline-block px-2 py-1 bg-brand-lime/20 text-brand-black text-[10px] font-bold rounded-full mb-1">
                                AI 추천
                            </span>
                            <h4 className="font-bold text-xl text-gray-900 leading-tight">
                                {recommendedCourse.title}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {recommendedCourse.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Stage Preview */}
                        <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                                <span>커리큘럼 미리보기</span>
                                <span>총 {recommendedCourse.stages.length}단계</span>
                            </div>
                            {recommendedCourse.stages.slice(0, 2).map((stage, idx) => (
                                <div key={stage.id} className="flex items-center gap-3 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                                        {idx + 1}
                                    </div>
                                    <span className="text-gray-700 truncate">{stage.title}</span>
                                </div>
                            ))}
                            {recommendedCourse.stages.length > 2 && (
                                <div className="text-[10px] text-gray-400 pl-8">
                                    + {recommendedCourse.stages.length - 2}개 더보기
                                </div>
                            )}
                        </div>

                        <button className="w-full bg-brand-black text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-gray-800">
                            <Play className="w-4 h-4 fill-current" />
                            지금 코칭 시작하기
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
