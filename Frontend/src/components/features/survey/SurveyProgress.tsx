"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animations/AnimatedCounter";

interface Props {
    currentStep: number;
    totalSteps: number;
}

export function SurveyProgress({ currentStep, totalSteps }: Props) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full max-w-md mx-auto mb-8 px-4">
            <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                <span>Step {currentStep}</span>
                <AnimatedCounter value={progress} suffix="% Completed" />
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-brand-lime rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
