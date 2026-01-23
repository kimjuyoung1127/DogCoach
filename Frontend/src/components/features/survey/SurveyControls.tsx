"use client";

import { ArrowRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
    step: number;
    totalSteps: number;
    onNext: () => void;
    onBack: () => void;
    canNext: boolean;
}

export function SurveyControls({ step, totalSteps, onNext, onBack, canNext }: Props) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-[env(safe-area-inset-bottom)] z-50">
            <div className="container max-w-xl mx-auto flex items-center justify-between gap-4">
                <button
                    onClick={onBack}
                    disabled={step === 1}
                    className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-600 transition-colors",
                        step === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50 active:scale-95"
                    )}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.button
                    onClick={onNext}
                    disabled={!canNext}
                    whileTap={{ scale: 0.95 }}
                    animate={!canNext ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={cn(
                        "flex-1 h-12 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg",
                        canNext
                            ? "bg-brand-lime hover:bg-green-500 hover:shadow-brand-lime/30"
                            : "bg-gray-300 cursor-not-allowed text-gray-50"
                    )}
                >
                    {step === totalSteps ? "진단 결과 보기" : "다음으로"}
                    {step !== totalSteps && <ArrowRight className="w-5 h-5" />}
                </motion.button>
            </div>
        </div>
    );
}
