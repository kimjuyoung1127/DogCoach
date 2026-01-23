"use client";

import { motion } from "framer-motion";
import { Lock, Flag, Gift, Check, Star } from "lucide-react";
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
        <section className="pb-8">
            <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">교육 로드맵</h2>

            <StaggerContainer className="space-y-6">
                {levels.map((level) => (
                    <StaggerItem key={level.id} className={cn(
                        "rounded-3xl p-5 border transition-colors",
                        level.status === "current" ? "bg-white border-green-100 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"
                    )}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={cn("font-bold", level.status === "current" ? "text-green-800" : "text-gray-500")}>
                                    {level.name}
                                </h3>
                                <p className="text-xs text-gray-400">{level.description}</p>
                            </div>
                            {level.status === "locked" && <Lock className="w-5 h-5 text-gray-300" />}
                        </div>

                        {level.status === "current" && (
                            <div className="space-y-3 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100 -z-10" />

                                {level.days.map((dayItem: any) => (
                                    <motion.div
                                        key={dayItem.day}
                                        className="flex items-center gap-3"
                                        whileHover={{ scale: 1.02, x: 5 }}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white z-10",
                                            dayItem.status === "completed" ? "bg-green-500 text-white shadow-green-200 shadow-md" :
                                                dayItem.status === "current" ? "bg-white border-2 border-green-500 text-green-600" :
                                                    "bg-gray-100 text-gray-400 border border-gray-200"
                                        )}>
                                            {dayItem.status === "completed" ? <Check className="w-5 h-5" /> :
                                                dayItem.icon ? <dayItem.icon className="w-4 h-4" /> :
                                                    dayItem.day}
                                        </div>
                                        <div className={cn(
                                            "flex-1 p-3 rounded-xl text-sm font-medium flex items-center justify-between",
                                            dayItem.status === "locked" ? "bg-gray-50 text-gray-400" : "bg-white border border-gray-100 shadow-sm text-gray-700"
                                        )}>
                                            <span>{dayItem.label || `Day ${dayItem.day}`}</span>
                                            {dayItem.status === "locked" && <Lock className="w-3 h-3 text-gray-300" />}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {level.status === "locked" && (
                            <div className="h-20 flex items-center justify-center text-gray-300 text-sm">
                                <p>Level 1 완료 후 잠금 해제</p>
                            </div>
                        )}
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>
    );
}
