import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { TrainingStage } from "@/data/curriculum";
import { Button } from "@/components/ui/Button";
import { ScaleButton } from "@/components/ui/animations/ScaleButton";

interface MissionActionOverlayProps {
    isOpen: boolean;
    mission: TrainingStage | null;
    onClose?: () => void;
    onComplete: (reaction: string) => void;
}

export function MissionActionOverlay({ isOpen, mission, onClose, onComplete }: MissionActionOverlayProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsCompleted(false);
            setCurrentStep(0);
        }
    }, [isOpen, mission]);

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

    const handleReaction = (reaction: string) => {
        onComplete(reaction);
    };

    const step = mission.steps[currentStep];

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
                                key={`step-${currentStep}`}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                {/* Illustration / Step Number */}
                                <div className="flex items-center gap-4 py-4">
                                    <div className="w-14 h-14 bg-brand-lime text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-lime/30">
                                        {currentStep + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-extrabold text-gray-800">{step.title}</h3>
                                        <div className="flex items-center gap-1 text-[10px] text-brand-lime font-black uppercase">
                                            <Sparkles className="w-3 h-3" />
                                            Mission Step Guide
                                        </div>
                                    </div>
                                </div>

                                {/* Step Description Card - Matching LogCard AI Style */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 italic text-gray-700 leading-relaxed text-sm shadow-inner relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-lime opacity-30" />
                                    "{step.description}"
                                </div>

                                {/* Success Criteria */}
                                <div className="bg-brand-lime/10 rounded-2xl p-4 flex gap-3 items-start border border-brand-lime/20">
                                    <div className="w-5 h-5 bg-brand-lime rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-brand-lime uppercase tracking-tighter mb-1">성공 기준</p>
                                        <p className="text-sm text-gray-900 font-bold leading-snug">{step.success_criteria}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    {currentStep > 0 && (
                                        <ScaleButton onClick={handleBack} className="flex-1">
                                            <Button variant="secondary" className="w-full rounded-2xl py-6 gap-2 border-gray-200">
                                                <ArrowLeft className="w-4 h-4" />
                                                이전
                                            </Button>
                                        </ScaleButton>
                                    )}
                                    <ScaleButton onClick={handleNext} className={currentStep === 0 ? "w-full" : "flex-[2]"}>
                                        <Button variant="brand" className="w-full rounded-2xl py-6 text-lg font-black gap-2 shadow-xl shadow-brand-lime/20">
                                            {currentStep === totalSteps - 1 ? "미션 완료!" : "다음 단계로"}
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </ScaleButton>
                                </div>
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

                    {/* Footer / Close */}
                    <button
                        onClick={onClose}
                        className="mt-8 w-full py-2 text-gray-400 text-[10px] font-black text-center hover:text-gray-600 transition-colors uppercase tracking-widest"
                    >
                        다음에 할게요
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

