"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Target } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

import { TrainingStage } from "@/data/curriculum";

interface MissionTrackerProps {
    stage: TrainingStage;
}

export function MissionTracker({ stage }: MissionTrackerProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        if (isCompleted) return;

        setIsCompleted(true);
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#4ADE80', '#22c55e', '#fbbf24']
        });
    };

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-black text-gray-900">오늘의 미션</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-lime/10 text-brand-lime rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-lime/20">
                    Day {stage.day}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-brand-lime/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="mb-6 relative z-10">
                    <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">{stage.title}</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed break-keep">{stage.goal}</p>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-between items-center mb-8 px-2 relative z-10">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div key={day} className="flex flex-col items-center gap-2">
                            <div className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-500",
                                isCompleted && day === stage.day ? "bg-brand-lime scale-125 shadow-[0_0_8px_rgba(74,222,128,0.5)]" :
                                    day === stage.day ? 'bg-brand-lime/30' : 'bg-gray-100'
                            )} />
                            <span className={cn(
                                "text-[10px] font-black tracking-tighter uppercase",
                                day === stage.day ? 'text-brand-lime' : 'text-gray-300'
                            )}>{day}D</span>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: isCompleted ? 1 : 1.02 }}
                    whileTap={{ scale: isCompleted ? 1 : 0.98 }}
                    onClick={handleComplete}
                    disabled={isCompleted}
                    className={cn(
                        "w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-lg",
                        isCompleted
                            ? 'bg-brand-lime/10 text-brand-lime shadow-none ring-1 ring-brand-lime/20 cursor-default'
                            : 'bg-gray-900 text-brand-lime shadow-gray-200 hover:bg-black'
                    )}
                >
                    {isCompleted ? (
                        <>
                            <CheckCircle2 className="w-6 h-6" />
                            <span>미션 완료!</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            <span>오늘 미션 완료 체크</span>
                        </>
                    )}
                </motion.button>
            </div>
        </section>
    );
}
