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
        <div className="relative py-8 flex flex-col items-center">
            {/* S-Curve Path (Background) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
                {/* Mobile View Path (Simple vertical zigzag or similar) - Dynamic height based on items */}
                <line x1="50%" y1="40" x2="50%" y2="95%" stroke="#D9F99D" strokeWidth="8" strokeDasharray="12 8" strokeLinecap="round" />
            </svg>

            <div className="space-y-8 relative z-10 w-full max-w-xs">
                {stages.map((stage, idx) => {
                    const isCompleted = stage.day < currentDay;
                    const isCurrent = stage.day === currentDay;
                    const isLocked = stage.day > currentDay;

                    return (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => (isCurrent || isCompleted) && onDayClick(stage)}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-2xl border-2 transition-all relative",
                                isCurrent
                                    ? "bg-white border-brand-lime shadow-lg shadow-brand-lime/20 cursor-pointer active:scale-95"
                                    : isCompleted
                                        ? "bg-gray-50 border-gray-100 opacity-80 cursor-pointer hover:bg-gray-100"
                                        : "bg-gray-50 border-gray-100 opacity-40 cursor-not-allowed",
                                idx % 2 === 0 ? "flex-row" : "flex-row-reverse text-right" // Zigzag layout visual
                            )}
                        >
                            {/* Icon Circle */}
                            <div className={cn(
                                "w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 relative",
                                isCurrent
                                    ? "bg-brand-lime text-white border-brand-lime"
                                    : isCompleted
                                        ? "bg-gray-200 text-gray-500 border-gray-200"
                                        : "bg-white text-gray-300 border-gray-200"
                            )}>
                                {isCompleted ? <Check className="w-6 h-6" /> : <stage.icon className="w-6 h-6" />}

                                {isLocked && (
                                    <div className="absolute -bottom-1 -right-1 bg-gray-100 rounded-full p-1 border border-white">
                                        <Lock className="w-3 h-3 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <div className="flex-1">
                                <div className={cn("text-xs font-bold mb-0.5", isCurrent ? "text-brand-lime" : "text-gray-400")}>
                                    Day {stage.day}
                                </div>
                                <div className="font-bold text-gray-900 text-lg leading-tight">
                                    {stage.title}
                                </div>
                                {isCurrent && (
                                    <div className="text-xs text-gray-500 mt-1 animate-pulse">
                                        터치해서 시작하기 👇
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
