import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Sparkles, Wand2, Search } from "lucide-react";
import confetti from "canvas-confetti";
import { TrainingStage, TrainingAlternative, TrainingStep } from "@/data/curriculum";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateTrainingStatus } from "@/hooks/useQueries";
import { Button } from "@/components/ui/Button";
import { ScaleButton } from "@/components/ui/animations/ScaleButton";

// Premium AI Scanning Animation Component
function ScanningBar() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/20"
            />
        </div>
    );
}

interface MissionActionOverlayProps {
    isOpen: boolean;
    curriculumId: string | null;
    mission: TrainingStage | null;
    onClose?: () => void;
    onComplete: (reaction: string) => void;
}

export function MissionActionOverlay({ isOpen, curriculumId, mission, onClose, onComplete }: MissionActionOverlayProps) {
    const { token } = useAuth();
    const updateStatus = useUpdateTrainingStatus(token);
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [swapping, setSwapping] = useState(false);
    // Track swaps per step number: { [step_number]: TrainingAlternative }
    const [swappedSteps, setSwappedSteps] = useState<Record<number, TrainingAlternative>>({});
    const [showVault, setShowVault] = useState(false);

    useEffect(() => {
        if (isOpen && mission) {
            // Reset state for a new mission session
            setIsCompleted(false);
            setCurrentStep(0);
            setSwapping(false);
            setShowVault(false);

            // Initialize swapped steps from current mission status
            const initialSwaps: Record<number, TrainingAlternative> = {};
            mission.steps.forEach(s => {
                const altId = s.activeAlternativeId;
                if (altId) {
                    const alt = s.alternatives?.find((a: TrainingAlternative) => a.id === altId);
                    if (alt) {
                        initialSwaps[s.step_number] = alt;
                    }
                }
            });
            setSwappedSteps(initialSwaps);
        }
    }, [isOpen, mission?.id]); // Size is constant, but only resets when mission changes

    if (!isOpen || !mission) return null;

    const totalSteps = mission.steps.length;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        setIsCompleted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4ADE80', '#D9F99D', '#f7fee7']
        });
    };

    const step = mission.steps[currentStep];
    const selectedAlternative = swappedSteps[step.step_number] || null;

    const handleIneffective = async () => {
        if (!curriculumId || !mission || !step) return;

        // Find available alternative (Plan B/C/D) using the correct 'alternatives' array
        const alternatives = step.alternatives || [];
        const nextAlt = alternatives[0]; // For now, default to first (B)

        if (nextAlt && !selectedAlternative) {
            // Initiate Premium "System Scan" Animation
            setSwapping(true);

            // Artificial delay for scanning effect
            setTimeout(() => {
                setSwappedSteps(prev => ({
                    ...prev,
                    [step.step_number]: nextAlt
                }));
                setSwapping(false);
                // AI Completion effect
                confetti({
                    particleCount: 40,
                    spread: 40,
                    origin: { y: 0.7 },
                    colors: ['#8B5CF6', '#A78BFA', '#C4B5FD']
                });
            }, 1800);
            return;
        }

        try {
            await updateStatus.mutateAsync({
                curriculum_id: curriculumId,
                stage_id: mission.id,
                step_number: step.step_number,
                status: "SKIPPED_INEFFECTIVE"
            });
            // Move to next or complete
            if (currentStep < totalSteps - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                handleComplete();
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleConfirmSwap = async () => {
        if (!curriculumId || !mission || !step || !selectedAlternative) return;
        try {
            await updateStatus.mutateAsync({
                curriculum_id: curriculumId,
                stage_id: mission.id,
                step_number: step.step_number,
                status: `SWAPPED:${selectedAlternative.id}`
            });
            // Move to next automatically after swapping a single step
            handleNext();
        } catch (err) {
            console.error("Failed to swap status:", err);
        }
    };

    const handleReaction = async (reaction: string) => {
        if (curriculumId && mission) {
            try {
                // IMPORTANT: Preserving the "Plan B" status in history/storage.
                await Promise.all(mission.steps.map(s => {
                    const currentStepStatus = swappedSteps[s.step_number] || s.activeAlternativeId;
                    if (currentStepStatus) {
                        // Already swapped, don't overwrite with 'COMPLETED'
                        return Promise.resolve();
                    }
                    return updateStatus.mutateAsync({
                        curriculum_id: curriculumId,
                        stage_id: mission.id,
                        step_number: s.step_number,
                        status: "COMPLETED"
                    });
                }));
            } catch (err) {
                console.error("Failed to mark steps as completed:", err);
            }
        }
        onComplete(reaction);
    };


    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
                key={mission.id}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] w-full max-w-sm md:max-w-md overflow-hidden relative max-h-[90vh] flex flex-col shadow-2xl border border-gray-100"
            >
                {/* Header Section */}
                <div className="p-8 pb-5 bg-gradient-to-b from-brand-lime/10 to-white shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 bg-brand-lime text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm shadow-brand-lime/20">
                            Day {mission.day} Mission
                        </span>
                        <div className="flex gap-1.5">
                            {mission.steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? "w-8 bg-brand-lime" : "w-1.5 bg-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 leading-tight break-keep mb-2">
                        {mission.title}
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed break-keep font-medium">{mission.goal}</p>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    <AnimatePresence mode="wait">
                        {!isCompleted ? (
                            <motion.div
                                key={selectedAlternative ? `alt-${selectedAlternative.id}-${currentStep}` : `step-${currentStep}`}
                                initial={swapping ? { rotateY: 90, opacity: 0 } : { x: 20, opacity: 0 }}
                                animate={{ rotateY: 0, x: 0, opacity: 1 }}
                                exit={{ rotateY: -90, x: -20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-6"
                            >
                                {/* Illustration / Step Number */}
                                <div className="flex items-center gap-4 py-4 relative">
                                    <div className={`w-14 h-14 ${selectedAlternative ? 'bg-purple-600' : 'bg-brand-lime'} text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg ${selectedAlternative ? 'shadow-purple-200' : 'shadow-brand-lime/30'} transition-all duration-500 relative overflow-hidden`}>
                                        {swapping ? <Search className="w-6 h-6 animate-pulse" /> : (selectedAlternative ? selectedAlternative.id : currentStep + 1)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-extrabold transition-colors duration-500 ${selectedAlternative ? 'text-purple-700' : 'text-gray-800'}`}>
                                            {swapping ? "최적의 대안 탐색 중..." : (selectedAlternative ? selectedAlternative.title : step.title)}
                                        </h3>
                                        <div className={`flex items-center gap-1 text-[10px] ${selectedAlternative ? 'text-purple-600' : 'text-brand-lime'} font-black uppercase transition-colors duration-500`}>
                                            {swapping ? <Wand2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                            {swapping ? "AI 분석 중" : (selectedAlternative ? `AI Recommended Plan ${selectedAlternative.id}` : "Mission Step Guide")}
                                        </div>
                                    </div>
                                </div>

                                {/* Step Description Card */}
                                <div className={`group bg-gray-50 rounded-2xl p-6 border transition-all duration-700 relative overflow-hidden ${selectedAlternative ? 'border-purple-200 bg-purple-50/30' : 'border-gray-100'}`}>
                                    {swapping && <ScanningBar />}
                                    <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-700 ${selectedAlternative ? 'bg-purple-600' : 'bg-brand-lime'} opacity-30`} />
                                    <p className={`italic leading-relaxed text-sm transition-all duration-500 ${swapping ? 'blur-sm opacity-50' : 'opacity-100'}`}>
                                        "{selectedAlternative ? selectedAlternative.description : step.description}"
                                    </p>
                                </div>

                                {/* Success Criteria (Only for Plan A or combined) */}
                                {!selectedAlternative && (
                                    <div className="bg-brand-lime/10 rounded-2xl p-4 flex gap-3 items-start border border-brand-lime/20">
                                        <div className="w-5 h-5 bg-brand-lime rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand-lime uppercase tracking-tighter mb-1">성공 기준</p>
                                            <p className="text-sm text-gray-900 font-bold leading-snug">{step.success_criteria}</p>
                                        </div>
                                    </div>
                                )}

                                {selectedAlternative && (
                                    <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                                        <p className="text-[10px] font-black text-purple-600 uppercase tracking-tight mb-1">PRO TIP</p>
                                        <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                            이 방식은 강아지가 느끼는 압박감을 줄여주는 우회 솔루션입니다.
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    {selectedAlternative ? (
                                        <ScaleButton asChild className="w-full">
                                            <Button onClick={handleConfirmSwap} variant="brand" className="w-full bg-purple-600 hover:bg-purple-700 rounded-2xl py-6 text-lg font-black gap-2 shadow-xl shadow-purple-200">
                                                {currentStep === totalSteps - 1 ? "Plan B로 미션 완료!" : "Plan B로 교체하고 다음으로"}
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </ScaleButton>
                                    ) : (
                                        <>
                                            {currentStep > 0 && (
                                                <ScaleButton asChild className="flex-1">
                                                    <Button onClick={handleBack} variant="secondary" className="w-full rounded-2xl py-6 gap-2 border-gray-200">
                                                        <ArrowLeft className="w-4 h-4" />
                                                        이전
                                                    </Button>
                                                </ScaleButton>
                                            )}
                                            <ScaleButton asChild className={currentStep === 0 ? "w-full" : "flex-[2]"}>
                                                <Button onClick={handleNext} disabled={swapping} variant="brand" className="w-full rounded-2xl py-6 text-lg font-black gap-2 shadow-xl shadow-brand-lime/20">
                                                    {currentStep === totalSteps - 1 ? "미션 완료!" : "다음 단계로"}
                                                    <ArrowRight className="w-5 h-5" />
                                                </Button>
                                            </ScaleButton>
                                        </>
                                    )}
                                </div>
                                {/* Ineffective / Alternative Trigger Card */}
                                {!selectedAlternative && (
                                    <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">도움이 필요한가요?</p>
                                        <ScaleButton onClick={handleIneffective}>
                                            <div className="w-full p-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-brand-lime/30 rounded-2xl flex items-center gap-4 transition-all group active:scale-95">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                                                    {step.alternatives && step.alternatives.length > 0 ? (
                                                        <Search className="w-5 h-5 text-gray-400 group-hover:text-brand-lime" />
                                                    ) : (
                                                        <Check className="w-5 h-5 text-gray-400 group-hover:text-amber-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-bold text-gray-700 group-hover:text-gray-900">
                                                        {step.alternatives && step.alternatives.length > 0
                                                            ? "이미 해봤거나 어려우신가요?"
                                                            : "이 단계를 이미 잘 알고 있나요?"}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-medium">
                                                        {step.alternatives && step.alternatives.length > 0
                                                            ? "AI가 우리 강아지에게 맞는 '맞춤 대안'을 찾아드려요"
                                                            : "이 단계를 건너뛰고 다음 과정으로 넘어갑니다"}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-lime group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </ScaleButton>
                                    </div>
                                )}

                                {selectedAlternative && (
                                    <div className="pt-6 border-t border-gray-100 space-y-4">
                                        <button
                                            onClick={() => setShowVault(!showVault)}
                                            className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors"
                                        >
                                            <Search className="w-3 h-3" />
                                            {showVault ? "보관함 닫기" : "원래의 계획(Plan A) 확인하기"}
                                        </button>

                                        <AnimatePresence>
                                            {showVault && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">저장된 원래 계획</p>
                                                        <p className="text-xs font-bold text-gray-700 mb-1">{step.title}</p>
                                                        <p className="text-[10px] text-gray-500 leading-relaxed italic">"{step.description}"</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button
                                            onClick={() => {
                                                setSwappedSteps(prev => {
                                                    const next = { ...prev };
                                                    delete next[step.step_number];
                                                    return next;
                                                });
                                                setShowVault(false);
                                            }}
                                            disabled={swapping}
                                            className="w-full text-xs text-gray-400 font-medium hover:text-gray-600 underline decoration-gray-300 underline-offset-4 disabled:opacity-30 pb-2"
                                        >
                                            대안 취소하고 Plan A로 돌아가기
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="py-8 space-y-8"
                            >
                                <div className="text-center">
                                    <div className="text-6xl mb-6">🎉</div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3">훌륭합니다!</h3>
                                    <p className="text-gray-500 font-medium break-keep leading-relaxed">
                                        오늘의 훈련을 성공적으로 마쳤어요.<br />
                                        훈련 중 강아지의 반응은 어땠나요?
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: "comfortable", emoji: "🙂", label: "편안해해요", sub: "긍정적인 변화", color: "text-brand-lime" },
                                        { id: "neutral", emoji: "😐", label: "평소와 같아요", sub: "지속적인 관찰 필요", color: "text-amber-500" },
                                        { id: "barking", emoji: "😠", label: "여전히 예민해요", sub: "도움이 필요해요", color: "text-red-500" }
                                    ].map((reaction) => (
                                        <ScaleButton key={reaction.id} onClick={() => handleReaction(reaction.id)}>
                                            <div className="w-full flex items-center gap-4 p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-brand-lime hover:bg-brand-lime/5 transition-all text-left group shadow-sm">
                                                <span className="text-3xl group-hover:scale-110 transition-transform">{reaction.emoji}</span>
                                                <div className="flex-1">
                                                    <p className="font-bold text-gray-800">{reaction.label}</p>
                                                    <p className={`text-[10px] font-black uppercase ${reaction.color}`}>{reaction.sub}</p>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-lime group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </ScaleButton>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer / Close */}
                <button
                    onClick={onClose}
                    className="mt-8 w-full py-2 text-gray-400 text-[10px] font-black text-center hover:text-gray-600 transition-colors uppercase tracking-widest"
                >
                    다음에 할게요
                </button>
            </motion.div>
        </div>
    );
}

