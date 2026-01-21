"use client";

import { motion } from "framer-motion";
import { Home, Shield, Music, Dog, Eye, Footprints, Flag, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    currentDay: number; // 1 to 7
    onDayClick: (day: number) => void;
}

export function ChallengeJourneyMap({ currentDay, onDayClick }: Props) {
    const steps = [
        { day: 1, icon: Home, label: "환경 설정" },
        { day: 2, icon: Shield, label: "안전" },
        { day: 3, icon: Music, label: "안정화" },
        { day: 4, icon: Dog, label: "기초" },
        { day: 5, icon: Eye, label: "소통" },
        { day: 6, icon: Footprints, label: "산책" },
        { day: 7, icon: Flag, label: "위생" },
    ];

    return (
        <div className="relative py-8 flex flex-col items-center">
            {/* S-Curve Path (Background) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
                {/* Mobile View Path (Simple vertical zigzag or similar) - For now simplified vertical line for robust responsiveness */}
                <line x1="50%" y1="40" x2="50%" y2="90%" stroke="#D9F99D" strokeWidth="8" strokeDasharray="12 8" strokeLinecap="round" />
            </svg>

            <div className="space-y-8 relative z-10 w-full max-w-xs">
                {steps.map((step, idx) => {
                    const isCompleted = step.day < currentDay;
                    const isCurrent = step.day === currentDay;
                    const isLocked = step.day > currentDay;

                    return (
                        <motion.div
                            key={step.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => isCurrent && onDayClick(step.day)}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-2xl border-2 transition-all relative",
                                isCurrent 
                                    ? "bg-white border-brand-lime shadow-lg shadow-brand-lime/20 cursor-pointer active:scale-95" 
                                    : isCompleted 
                                        ? "bg-gray-50 border-gray-100 opacity-60"
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
                                {isCompleted ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                                
                                {isLocked && (
                                    <div className="absolute -bottom-1 -right-1 bg-gray-100 rounded-full p-1 border border-white">
                                        <Lock className="w-3 h-3 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <div className="flex-1">
                                <div className={cn("text-xs font-bold mb-0.5", isCurrent ? "text-brand-lime" : "text-gray-400")}>
                                    Day {step.day}
                                </div>
                                <div className="font-bold text-gray-900 text-lg leading-tight">
                                    {step.label} 미션
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
