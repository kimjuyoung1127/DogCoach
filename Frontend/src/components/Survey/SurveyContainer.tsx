"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SurveyProgress } from "./SurveyProgress";
import { SurveyData, INITIAL_DATA } from "./types";
import { Step1Profile } from "./Step1Profile";
import { Step2Environment } from "./Step2Environment";
import { Step3Health } from "./Step3Health";
import { Step4Problems } from "./Step4Problems";
import { Step5Triggers } from "./Step5Triggers";
import { Step6PastAttempts } from "./Step6PastAttempts";
import { Step7Temperament } from "./Step7Temperament";
import { SurveyControls } from "./SurveyControls";

export function SurveyContainer() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<SurveyData>(INITIAL_DATA);
    const TOTAL_STEPS = 7;
    const IS_DEBUG = process.env.NODE_ENV === 'development';

    const updateData = (newData: Partial<SurveyData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            console.log("Survey Completed:", data);
            alert("설문이 완료되었습니다! (결과 페이지로 이동 예정)");
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12 pb-24 relative">
            {IS_DEBUG && (
                <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold z-50 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setStep((s) => (s < TOTAL_STEPS ? s + 1 : 1))}>
                    🚧 DEBUG MODE ON (Click to Skip)
                </div>
            )}
            <SurveyProgress currentStep={step} totalSteps={TOTAL_STEPS} />

            <div className="flex-1 container max-w-xl mx-auto px-4 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[400px]"
                    >
                        {step === 1 && <Step1Profile data={data} updateData={updateData} />}
                        {step === 2 && <Step2Environment data={data} updateData={updateData} />}
                        {step === 3 && <Step3Health data={data} updateData={updateData} />}
                        {step === 4 && <Step4Problems data={data} updateData={updateData} />}
                        {step === 5 && <Step5Triggers data={data} updateData={updateData} />}
                        {step === 6 && <Step6PastAttempts data={data} updateData={updateData} />}
                        {step === 7 && <Step7Temperament data={data} updateData={updateData} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <SurveyControls
                step={step}
                totalSteps={TOTAL_STEPS}
                onNext={handleNext}
                onBack={handleBack}
                canNext={validateStep(step, data, IS_DEBUG)}
            />
        </div>
    );
}

function validateStep(step: number, data: SurveyData, isDebug: boolean): boolean {
    if (isDebug) return true;

    switch (step) {
        case 1:
            // Name, Breed, Sex, Weight, AdoptionDate required
            return !!data.dogName && !!data.breed && !!data.sex && !!data.weight && !!data.adoptionDate;
        case 2:
            // Household, Primary Carer required
            return !!data.householdType && !!data.primaryCarer;
        case 3:
            // Optional, but good to check if they clicked something? No, optional is fine.
            return true;
        case 4:
            return data.chronicIssues.length > 0;
        case 5:
            return data.triggers.length > 0;
        case 6:
            // Optional or required? Let's make it optional or "none" selected
            return data.pastAttempts.length > 0;
        case 7:
            return !!data.sensitivityScore;
        default:
            return true;
    }
}
