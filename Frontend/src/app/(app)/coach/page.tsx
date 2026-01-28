"use client";

import { useState } from "react";
import { ChallengeJourneyMap } from "@/components/features/challenge/ChallengeJourneyMap";
import { MissionActionOverlay } from "@/components/features/challenge/MissionActionOverlay";
import { Lock, Trophy, Zap, ChevronRight, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAINING_CURRICULUM, TrainingStage } from "@/data/curriculum";

export default function CoachPage() {
    // State
    const [xp, setXp] = useState(300);
    const [level, setLevel] = useState(3);
    const [currentCourseId, setCurrentCourseId] = useState(TRAINING_CURRICULUM[0].id);
    const [currentDay, setCurrentDay] = useState(999); // Debug: Unlock all levels
    const [selectedMission, setSelectedMission] = useState<TrainingStage | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const currentCourse = TRAINING_CURRICULUM.find(c => c.id === currentCourseId) || TRAINING_CURRICULUM[0];
    const otherCourses = TRAINING_CURRICULUM.filter(c => c.id !== currentCourseId);

    // Handler
    const handleMissionComplete = (reaction: string) => {
        setSelectedMission(null);
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
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="h-full bg-brand-lime rounded-full"
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-lg">

                {/* 2. Main: Challenge Map */}
                <AnimatePresence mode="wait">
                    <motion.section
                        key={currentCourseId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="p-6"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h2 className="font-bold text-gray-900">진행 중인 챌린지 🔥</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6 px-1 leading-relaxed bg-white/50 p-3 rounded-xl border border-gray-100">
                            {currentCourse.description}
                        </p>

                        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                            <ChallengeJourneyMap
                                stages={currentCourse.stages}
                                currentDay={currentDay}
                                onDayClick={(stage) => setSelectedMission(stage)}
                            />
                        </div>
                    </motion.section>
                </AnimatePresence>

                {/* 3. Sub: Recommended Courses (Drawer) */}
                <section className="px-6 pb-6">
                    <button
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        className="w-full flex items-center justify-between mb-4 group"
                    >
                        <h2 className="font-bold text-gray-900">다른 훈련 프로그램 ({otherCourses.length})</h2>
                        {isDrawerOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                        {isDrawerOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-3 pb-2">
                                    {otherCourses.map(course => (
                                        <CourseCard
                                            key={course.id}
                                            title={course.title}
                                            duration={`${course.total_days}일 완성`}
                                            locked={true}
                                            onClick={() => setCurrentCourseId(course.id)}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </main>

            {/* Mission Overlay Modal */}
            <MissionActionOverlay
                isOpen={!!selectedMission}
                mission={selectedMission}
                onClose={() => setSelectedMission(null)}
                onComplete={handleMissionComplete}
            />
        </div>
    );
}

function CourseCard({ title, duration, locked, onClick }: { title: string, duration: string, locked?: boolean, onClick?: () => void }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${locked ? 'bg-gray-100' : 'bg-brand-lime/10'}`}>
                    {locked ? <Lock className="w-5 h-5 text-gray-400" /> : <BookOpen className="w-5 h-5 text-brand-lime" />}
                </div>
                <div>
                    <div className="font-bold text-gray-900 text-sm">{title}</div>
                    <div className="text-xs text-gray-500">{duration}</div>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
        </motion.div>
    );
}