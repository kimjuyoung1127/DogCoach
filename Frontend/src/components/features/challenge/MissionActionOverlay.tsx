import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { TrainingStage } from "@/data/curriculum";

interface MissionActionOverlayProps {
    isOpen: boolean;
    mission: TrainingStage | null;
    onClose?: () => void;
    onComplete: (reaction: string) => void;
}

export function MissionActionOverlay({ isOpen, mission, onClose, onComplete }: MissionActionOverlayProps) {
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsCompleted(false);
            setIsGuideOpen(false);
        }
    }, [isOpen, mission]);

    if (!isOpen || !mission) return null;

    const handleComplete = () => {
        setIsCompleted(true);
        // Trigger Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#86efac', '#f0fdf4']
        });
    };

    const handleReaction = (reaction: string) => {
        onComplete(reaction);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                key={mission.id} // Re-render animation on mission change
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl w-full max-w-sm md:max-w-md overflow-hidden relative max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 pt-8 bg-green-50 shrink-0">
                    <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold mb-3">Day {mission.day}</span>
                    <h1 className="text-xl font-bold text-gray-900 leading-tight break-keep">
                        {mission.title}
                    </h1>
                    <p className="text-sm text-gray-600 mt-2 break-keep">{mission.goal}</p>
                </div>

                {/* Content & Actions (Scrollable) */}
                <div className="flex-1 overflow-y-auto">
                    {/* Illustration Area (Simplified for now - could be dynamic or generic) */}
                    <div className="bg-gray-50 flex items-center justify-center p-6 h-[150px] shrink-0">
                        <div className="w-full max-w-[140px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center aspect-square flex items-center justify-center text-5xl">
                            🐕
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-t-3xl -mt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] relative z-10">
                        {/* Accordion Guide */}
                        <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setIsGuideOpen(!isGuideOpen)}
                                className="w-full flex items-center justify-between p-4 bg-white text-left font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm">어떻게 하나요? (가이드 보기)</span>
                                {isGuideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <AnimatePresence>
                                {isGuideOpen && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden bg-gray-50 border-t border-gray-100"
                                    >
                                        <div className="p-4 text-xs text-gray-600 space-y-3">
                                            {mission.steps.map((step) => (
                                                <div key={step.step_number} className="flex gap-2">
                                                    <span className="font-bold text-green-600 shrink-0">{step.step_number}.</span>
                                                    <div>
                                                        <p className="font-bold text-gray-800 mb-0.5">{step.title}</p>
                                                        <p className="leading-relaxed">{step.description}</p>
                                                        <p className="text-green-700 mt-1 bg-green-100/50 p-1.5 rounded text-[10px] font-medium">🎯 성공: {step.success_criteria}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Main Action or Feedback Loop */}
                        {!isCompleted ? (
                            <button
                                onClick={handleComplete}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                완료했어요!
                            </button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">축하합니다! 🎉</h3>
                                    <p className="text-gray-500 text-xs">Bella가 한결 편안해질 거예요.</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h4 className="text-xs font-bold text-gray-700 mb-3 text-center">설치 후 Bella의 반응은?</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button onClick={() => handleReaction("neutral")} className="flex flex-col items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                                            <span className="text-xl">😐</span>
                                            <span className="text-[10px] font-medium text-gray-500">무관심</span>
                                        </button>
                                        <button onClick={() => handleReaction("comfortable")} className="flex flex-col items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                                            <span className="text-xl">🙂</span>
                                            <span className="text-[10px] font-medium text-gray-500">편안함</span>
                                        </button>
                                        <button onClick={() => handleReaction("barking")} className="flex flex-col items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                                            <span className="text-xl">😠</span>
                                            <span className="text-[10px] font-medium text-gray-500">여전함</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Close Button if not completed or just to dismiss */}
                        <button onClick={onClose} className="mt-4 w-full py-2 text-gray-400 text-xs text-center hover:text-gray-600">
                            닫기
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
