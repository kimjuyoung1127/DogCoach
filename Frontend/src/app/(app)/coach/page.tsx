"use client";

import { useState, useEffect } from "react";
import { ChallengeJourneyMap } from "@/components/features/coach/ChallengeJourneyMap";
import { MissionActionOverlay } from "@/components/features/coach/MissionActionOverlay";
import { Trophy, Zap, ChevronRight, BookOpen, Sparkles, CheckCircle2, RotateCcw, EyeOff, Info } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { TRAINING_CURRICULUM, TrainingStage, mapIssueToCurriculum } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardData, useDeleteTrainingStatus } from "@/hooks/useQueries";
import { usePersonalizedCurriculum } from "@/hooks/usePersonalizedCurriculum";
import { useSearchParams } from "next/navigation";
import { Toast } from "@/components/ui/Toast";


import { PremiumBackground } from "@/components/shared/ui/PremiumBackground";
import { ScaleButton } from "@/components/ui/animations/ScaleButton";


export default function CoachPage() {
    const { token } = useAuth();
    const searchParams = useSearchParams();
    const shouldHighlight = searchParams.get("highlight") === "true";

    // Data Fetching
    const { data: dashboardData } = useDashboardData(!!token, token);
    const { activeCurriculum, hiddenStages } = usePersonalizedCurriculum();
    const deleteStatus = useDeleteTrainingStatus(token);

    // State
    const [xp, setXp] = useState(300);
    const [level, setLevel] = useState(3);
    const [currentCourseId, setCurrentCourseId] = useState<string>(TRAINING_CURRICULUM[0].id);
    const [currentDay, setCurrentDay] = useState(1);
    const [selectedMission, setSelectedMission] = useState<TrainingStage | null>(null);

    // Toast state
    const [toastMessage, setToastMessage] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    // Accordion state
    const [isHiddenExpanded, setIsHiddenExpanded] = useState(false);

    const currentCourse = activeCurriculum.find(c => c.id === currentCourseId) || activeCurriculum[0] || TRAINING_CURRICULUM[0];

    const recommendedCourse = dashboardData ? mapIssueToCurriculum(dashboardData.issues) : null;



    // Auto-select recommended course on load
    useEffect(() => {
        if (recommendedCourse) {
            setCurrentCourseId(recommendedCourse.id);
        }
    }, [recommendedCourse?.id]);

    // Auto-scroll to recommended section if highlighted on load
    useEffect(() => {
        if (shouldHighlight && recommendedCourse) {
            const element = document.getElementById("training-list");
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [shouldHighlight, recommendedCourse]);

    // Handler
    const handleMissionComplete = (reaction: string) => {
        setSelectedMission(null);
        if (reaction === "skipped_ineffective") {
            showToast("훈련이 '숨겨진 보관함'으로 이동되었습니다.");
            return;
        }
        if (reaction === "swapped_to_plan_b") {
            showToast("AI가 제안한 Plan B로 훈련이 전환되었습니다! ✨");
            return;
        }
        if (reaction) {
            setXp((prev) => prev + 100);
        }
    };

    const showToast = (message: string) => {
        setToastMessage(message);
        setIsToastVisible(true);
    };

    const handleRestore = async (courseId: string, stageId: string, stepNumber: number) => {
        try {
            await deleteStatus.mutateAsync({ curriculumId: courseId, stageId, stepNumber });
            showToast("훈련을 다시 커리큘럼으로 되돌렸습니다.");
        } catch (err) {
            console.error("Failed to restore stage:", err);
            showToast("복구에 실패했습니다.");
        }
    };


    return (
        <div className="min-h-screen pb-32 relative">
            <PremiumBackground />

            {/* 1. Header: Gamification Status */}
            <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-md border-b border-white/60 ring-1 ring-black/5 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.2em] mb-0.5">Academy</span>
                        <h1 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">훈련 과정 🎓</h1>
                    </div>
                    <div className="flex items-center gap-2 text-white font-black bg-brand-lime px-4 py-2 rounded-2xl text-xs shadow-lg shadow-brand-lime/20 ring-1 ring-inset ring-white/20">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>LV. {level}</span>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="space-y-2 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/60 shadow-sm">
                    <div className="flex justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
                        <span>Rank: {level <= 3 ? "Beginner" : "Junior"}</span>
                        <span className="text-brand-lime">{xp} / 500 XP</span>
                    </div>
                    <div className="h-3 bg-gray-100/50 rounded-full overflow-hidden shadow-inner border border-gray-100/50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp / 500) * 100}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="h-full bg-gradient-to-r from-brand-lime to-emerald-400 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.4)]"
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-lg px-6 relative z-10">
                {/* 2. Main: Challenge Map */}
                <AnimatePresence mode="wait">
                    <motion.section
                        key={currentCourseId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="py-10"
                    >
                        <div className="flex items-center justify-between mb-6 px-1">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-brand-orange" />
                                <h2 className="font-black text-gray-900 text-xl tracking-tight">현재 진행 중</h2>
                            </div>
                        </div>

                        <div className={cn(
                            "glass rounded-[3rem] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border relative overflow-hidden group transition-all duration-700",
                            currentCourseId === recommendedCourse?.id ? "border-brand-lime ring-2 ring-brand-lime/20" : "border-white/60"
                        )}>
                            <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                                <Sparkles className="w-32 h-32 text-brand-lime" />
                            </div>

                            <div className="flex flex-col mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">{currentCourse.title}</h3>
                                    {currentCourseId === recommendedCourse?.id && (
                                        <span className="bg-brand-lime/10 text-brand-lime text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-brand-lime/20 shadow-sm">AI Recommend</span>
                                    )}
                                </div>
                                <p className="text-sm font-bold text-gray-500 leading-relaxed break-keep">
                                    {currentCourse.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100/50">
                                <ChallengeJourneyMap
                                    stages={currentCourse.stages}
                                    currentDay={currentDay}
                                    onDayClick={(stage) => setSelectedMission(stage)}
                                />
                            </div>
                        </div>
                    </motion.section>
                </AnimatePresence>

                {/* 3. Sub: Course Selector */}
                <section className="pb-12" id="training-list">
                    <div className="flex items-center justify-between mb-8 px-1">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                            <h2 className="font-black text-gray-900 text-xl tracking-tight">훈련 라이브러리</h2>
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available {activeCurriculum.length}</span>
                    </div>

                    <div className="space-y-6">
                        {activeCurriculum.map((course, idx) => (

                            <CourseCard
                                key={course.id}
                                index={idx}
                                title={course.title}
                                duration={`${course.total_days}Days`}
                                active={currentCourseId === course.id}
                                recommended={recommendedCourse?.id === course.id}
                                onClick={() => {
                                    setCurrentCourseId(course.id);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                highlighted={shouldHighlight && recommendedCourse?.id === course.id}
                            />
                        ))}
                    </div>
                </section>

                {/* 4. Hidden/Skipped Stages Section */}
                {hiddenStages.length > 0 && (
                    <section className="pb-32">
                        <button
                            onClick={() => setIsHiddenExpanded(!isHiddenExpanded)}
                            className="w-full flex items-center justify-between py-4 px-1 group"
                        >
                            <div className="flex items-center gap-2">
                                <EyeOff className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                <h2 className="font-black text-gray-900 text-xl tracking-tight">숨겨진 훈련</h2>
                                <span className="bg-gray-100 text-gray-400 text-[9px] font-black px-2 py-0.5 rounded-full ml-1">
                                    {hiddenStages.length}
                                </span>
                            </div>
                            <motion.div
                                animate={{ rotate: isHiddenExpanded ? 180 : 0 }}
                                className="w-8 h-8 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-gray-400 group-hover:bg-white transition-all shadow-sm"
                            >
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isHiddenExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-4 pt-2">
                                        <div className="bg-blue-50/50 rounded-2xl p-4 flex gap-3 mb-2 border border-blue-100/50">
                                            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                            <p className="text-xs text-blue-600 font-bold leading-relaxed">
                                                효과가 없거나 이미 알고 있는 훈련들은 이곳에 보관됩니다. 언제든지 다시 시도할 수 있어요.
                                            </p>
                                        </div>

                                        {hiddenStages.map((hidden) => (
                                            <motion.div
                                                key={`${hidden.courseId}-${hidden.stage.id}`}
                                                className="glass p-5 rounded-3xl border border-white/60 flex items-center justify-between gap-4 shadow-sm"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                                                        <hidden.stage.icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-gray-800 text-sm leading-tight mb-0.5">{hidden.stage.title}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{hidden.courseTitle} • Day {hidden.stage.day}</p>
                                                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">
                                                                {hidden.status === 'SKIPPED_INEFFECTIVE' ? '효과 없음' : '이미 해봄'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ScaleButton
                                                    onClick={() => handleRestore(hidden.courseId, hidden.stage.id, hidden.stage.steps[0].step_number)}
                                                    className="px-4 py-2.5 bg-brand-lime/10 text-brand-lime rounded-xl text-xs font-black flex items-center gap-2 border border-brand-lime/20 hover:bg-brand-lime hover:text-white transition-all shadow-sm"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                    다시 시도
                                                </ScaleButton>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                )}

            </main>

            <MissionActionOverlay
                isOpen={!!selectedMission}
                curriculumId={currentCourseId}
                mission={selectedMission}
                onClose={() => setSelectedMission(null)}
                onComplete={handleMissionComplete}
            />

            <Toast
                message={toastMessage}
                isVisible={isToastVisible}
                onClose={() => setIsToastVisible(false)}
            />


        </div>
    );
}

function CourseCard({ title, duration, active, recommended, onClick, highlighted, index }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "p-6 rounded-[2.5rem] border flex items-center justify-between cursor-pointer transition-all duration-500 group relative overflow-hidden ring-1 ring-black/5",
                active
                    ? "glass bg-gray-900 border-gray-900 shadow-2xl shadow-black/10 text-white"
                    : "glass border-white/60 shadow-sm hover:border-brand-lime/40",
                recommended && !active && "border-brand-lime/40 ring-2 ring-brand-lime/10",
                highlighted && "ring-4 ring-brand-lime/20 shadow-brand-lime/10"
            )}
        >
            {recommended && (
                <div className="absolute top-0 right-0 z-10">
                    <motion.div
                        animate={highlighted ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="bg-brand-lime text-gray-900 text-[8px] font-black px-4 py-1.5 rounded-bl-2xl shadow-lg shadow-brand-lime/20 tracking-widest uppercase"
                    >
                        AI PICK
                    </motion.div>
                </div>
            )}

            <div className="flex items-center gap-5">
                <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm border",
                    active
                        ? "bg-brand-lime text-gray-900 border-brand-lime/20"
                        : "bg-white/40 backdrop-blur-sm text-brand-lime border-white/60 group-hover:scale-110 group-hover:bg-brand-lime group-hover:text-white"
                )}>
                    {active ? <CheckCircle2 className="w-7 h-7" /> : <BookOpen className="w-6 h-6" />}
                </div>
                <div>
                    <div className={cn(
                        "font-black text-lg mb-0.5 transition-colors tracking-tight",
                        active ? "text-white" : "text-gray-900"
                    )}>
                        {title}
                    </div>
                    <div className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em] opacity-60",
                        active ? "text-brand-lime" : "text-gray-400"
                    )}>
                        {duration}
                    </div>
                </div>
            </div>
            {!active && (
                <div className="w-10 h-10 rounded-full bg-white/40 border border-white/60 flex items-center justify-center group-hover:bg-brand-lime group-hover:text-white group-hover:border-brand-lime transition-all text-gray-300 shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                </div>
            )}
        </motion.div>
    );
}
