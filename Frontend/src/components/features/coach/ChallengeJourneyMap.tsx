"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrainingStage } from "@/data/curriculum";

interface Props {
    stages: TrainingStage[];
    currentDay: number; // 1 to N
    onDayClick: (stage: TrainingStage) => void;
}

export function ChallengeJourneyMap({ stages, currentDay, onDayClick }: Props) {
    return (
        <div className="relative py-12 flex flex-col items-center">
            {/* S-Curve Path (Background) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10" style={{ zIndex: 0 }}>
                {/* Mobile View Path (Simple vertical zigzag or similar) - Dynamic height based on items */}
                <line x1="50%" y1="40" x2="50%" y2="95%" stroke="#4ADE80" strokeWidth="8" strokeDasharray="12 8" strokeLinecap="round" />
            </svg>

            <div className="space-y-10 relative z-10 w-full max-w-xs px-4">
                {stages.map((stage, idx) => {
                    const isCompleted = stage.day < currentDay;
                    const isCurrent = stage.day === currentDay;
                    const isLocked = stage.day > currentDay;

                    return (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => (isCurrent || isCompleted) && onDayClick(stage)}
                            className={cn(
                                "flex items-center gap-4 p-5 rounded-3xl border transition-all relative",
                                isCurrent
                                    ? "bg-white border-brand-lime shadow-xl shadow-brand-lime/20 cursor-pointer active:scale-95 ring-4 ring-brand-lime/5"
                                    : isCompleted
                                        ? "bg-white border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 hover:border-brand-lime/30"
                                        : "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed grayscale",
                                idx % 2 === 0 ? "flex-row translate-x-3" : "flex-row-reverse -translate-x-3 text-right" // Zigzag layout visual
                            )}
                        >
                            {/* Icon Circle */}
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center border-2 shrink-0 relative shadow-sm",
                                isCurrent
                                    ? "bg-brand-lime text-white border-brand-lime"
                                    : isCompleted
                                        ? "bg-brand-lime/10 text-brand-lime border-brand-lime/20"
                                        : "bg-white text-gray-300 border-gray-200"
                            )}>
                                {isCompleted ? <Check className="w-7 h-7 stroke-[3]" /> : <stage.icon className="w-7 h-7" />}

                                {isLocked && (
                                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm">
                                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <div className="flex-1">
                                <div className={cn("text-[10px] font-black uppercase tracking-wider mb-1", isCurrent ? "text-brand-lime" : "text-gray-400")}>
                                    Day {stage.day}
                                </div>
                                <div className="font-black text-gray-900 text-lg leading-tight break-keep">
                                    {stage.title}
                                </div>
                                {isCurrent && (
                                    <div className="text-[10px] text-brand-lime font-bold mt-1.5 flex items-center gap-1 animate-pulse">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                                        터치해서 시작하기
                                    </div>
                                )}
                            </div>

                            {/* Completed Badge Indicator */}
                            {isCompleted && (
                                <div className="absolute -top-2 -right-2 bg-brand-lime text-white rounded-full p-1 shadow-md">
                                    <Check className="w-3 h-3 stroke-[4]" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
