"use client";

import { useState } from "react";
import { ChallengeJourneyMap } from "@/components/features/challenge/ChallengeJourneyMap";
import { MissionActionOverlay } from "@/components/features/challenge/MissionActionOverlay";
import { Lock, Trophy, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CoachPage() {
    // Mock Data (State)
    const [currentDay, setCurrentDay] = useState(3);
    const [xp, setXp] = useState(300);
    const [level, setLevel] = useState(3);
    const [isMissionOpen, setIsMissionOpen] = useState(false);

    // Handler
    const handleMissionComplete = (reaction: string) => {
        setIsMissionOpen(false);
        if (reaction) {
            setXp((prev) => prev + 100);
            alert(`경험치 +100 획득! (반응: ${reaction}) 🎉`);
            // In a real app, we would advance the day here or after validation
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* 1. Header: Gamification Status */}
            <header className="bg-white p-6 border-b border-gray-100 sticky top-0 z-30">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-extrabold text-gray-900">훈련 아카데미 🎓</h1>
                    <div className="flex items-center gap-1 text-brand-lime font-bold bg-brand-lime/10 px-2 py-1 rounded-lg text-sm">
                        <Trophy className="w-4 h-4" />
                        <span>Lv.{level}</span>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>초보 멍멍이</span>
                        <span>다음 레벨까지 {500 - xp} XP</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp / 500) * 100}%` }}
                            className="h-full bg-brand-lime rounded-full"
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-lg">
                {/* 2. Main: Challenge Map */}
                <section className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <h2 className="font-bold text-gray-900">진행 중인 챌린지 🔥</h2>
                    </div>

                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                        <ChallengeJourneyMap
                            currentDay={currentDay}
                            onDayClick={() => setIsMissionOpen(true)}
                        />
                    </div>
                </section>

                {/* 3. Sub: Recommended Courses (Locked) */}
                <section className="px-6 pb-6">
                    <h2 className="font-bold text-gray-900 mb-4">다음 단계 추천 커리큘럼</h2>
                    <div className="space-y-3">
                        <CourseCard
                            title="분리불안 마스터 클래스"
                            duration="30일 완성"
                            locked={true}
                        />
                        <CourseCard
                            title="산책 예절 마스터"
                            duration="14일 완성"
                            locked={true}
                        />
                    </div>
                </section>
            </main>

            {/* Mission Overlay Modal */}
            <MissionActionOverlay
                isOpen={isMissionOpen}
                onClose={() => setIsMissionOpen(false)}
                onComplete={handleMissionComplete}
            />
        </div>
    );
}

function CourseCard({ title, duration, locked }: { title: string, duration: string, locked?: boolean }) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between opacity-70">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    {locked ? <Lock className="w-5 h-5 text-gray-400" /> : <Zap className="w-5 h-5 text-brand-lime" />}
                </div>
                <div>
                    <div className="font-bold text-gray-900 text-sm">{title}</div>
                    <div className="text-xs text-gray-500">{duration}</div>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>
    );
}