"use client";

import { motion } from "framer-motion";
import { Lock, Flag, Gift, Check, Sparkles, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations/StaggerList";

export function ChallengeMap() {
    const levels = [
        {
            id: 1,
            name: "Level 1. 적응기",
            description: "환경 설정 및 유대감 형성",
            status: "current", // current, locked, completed
            days: [
                { day: 1, label: "가림막 설치", status: "completed" },
                { day: 2, label: "백색 소음", status: "locked" },
                { day: 3, label: "안전 구역", status: "locked" },
                { day: 4, label: "간식 루틴", status: "locked" },
                { day: 5, label: "아이컨택", status: "locked" },
                { day: 6, label: "앉아 교육", status: "locked" },
                { day: 7, label: "실내 산책", status: "locked", icon: Gift },
            ]
        },
        {
            id: 2,
            name: "Level 2. 습관 형성기",
            description: "본격적인 둔감화 훈련",
            status: "locked",
            days: [8, 9, 10, 11, 12, 13, 14]
        }
    ];

    return (
        <section className="pb-12">
            <div className="flex items-center gap-2 mb-5 px-1">
                <Map className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-black text-gray-900">교육 로드맵</h2>
            </div>

            <StaggerContainer className="space-y-6">
                {levels.map((level) => (
                    <StaggerItem key={level.id} className={cn(
                        "rounded-[2.5rem] p-8 border transition-all duration-500",
                        level.status === "current" ? "bg-white border-brand-lime/10 shadow-xl shadow-brand-lime/5" : "bg-gray-50/50 border-gray-100 opacity-60"
                    )}>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className={cn("text-xl font-black", level.status === "current" ? "text-gray-900" : "text-gray-400")}>
                                        {level.name}
                                    </h3>
                                    {level.status === "current" && <Sparkles className="w-4 h-4 text-brand-lime" />}
                                </div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{level.description}</p>
                            </div>
                            {level.status === "locked" && (
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                                    <Lock className="w-5 h-5" />
                                </div>
                            )}
                        </div>

                        {level.status === "current" && (
                            <div className="space-y-4 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gray-100/50 -z-10" />

                                {level.days.map((dayItem: any) => (
                                    <motion.div
                                        key={dayItem.day}
                                        className="flex items-center gap-4"
                                        whileHover={{ scale: 1.02, x: 5 }}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center text-xs font-black ring-8 ring-white z-10 transition-all shadow-sm",
                                            dayItem.status === "completed" ? "bg-brand-lime text-white shadow-brand-lime/20" :
                                                dayItem.status === "current" ? "bg-white border-2 border-brand-lime text-brand-lime" :
                                                    "bg-gray-100 text-gray-300 border border-gray-200"
                                        )}>
                                            {dayItem.status === "completed" ? <Check className="w-6 h-6" strokeWidth={3} /> :
                                                dayItem.icon ? <dayItem.icon className="w-5 h-5" /> :
                                                    dayItem.day}
                                        </div>
                                        <div className={cn(
                                            "flex-1 p-4 rounded-2xl text-sm font-black flex items-center justify-between transition-all",
                                            dayItem.status === "locked" ? "bg-gray-50 text-gray-300" : "bg-white border border-gray-100 shadow-sm text-gray-700 hover:border-brand-lime/30"
                                        )}>
                                            <span>{dayItem.label || `Day ${dayItem.day}`}</span>
                                            {dayItem.status === "locked" && <Lock className="w-3 h-3 text-gray-200" />}
                                            {dayItem.status === "completed" && <div className="w-1.5 h-1.5 bg-brand-lime rounded-full" />}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {level.status === "locked" && (
                            <div className="h-24 flex flex-col items-center justify-center text-gray-300 gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Locked Phase</span>
                                <p className="text-xs font-bold">Level 1 완료 후 잠금 해제됩니다</p>
                            </div>
                        )}
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>
    );
}
