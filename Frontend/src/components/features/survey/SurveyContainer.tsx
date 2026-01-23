"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/animations/PageTransition";
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
import { KakaoSyncModal } from "./KakaoSyncModal";
import { SurveyLoading } from "./SurveyLoading";

import { apiClient } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { mapSurveyDataToSubmission } from "./survey-mapper";

export function SurveyContainer() {
    const router = useRouter();
    const { token } = useAuth(); // Get Auth Token
    const [step, setStep] = useState(1);
    const [data, setData] = useState<SurveyData>(INITIAL_DATA);
    const [showKakaoModal, setShowKakaoModal] = useState(false);

    // Track if user has seen/interacted with the modal to avoid showing it repeatedly if they back-navigate
    const [hasSeenKakaoModal, setHasSeenKakaoModal] = useState(false);

    // Loading State
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const TOTAL_STEPS = 7;
    const IS_DEBUG = process.env.NODE_ENV === 'development';

    // Direction State for Transitions
    const [direction, setDirection] = useState<"forward" | "back">("forward");

    const updateData = (newData: Partial<SurveyData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        // Intercept logic for Step 3 -> 4
        if (step === 3 && !hasSeenKakaoModal) {
            setShowKakaoModal(true);
            return;
        }

        setDirection("forward");
        proceedNext();
    };

    const proceedNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Survey Completed -> Start Analysis
            console.log("Survey Completed:", data);
            setIsAnalyzing(true);

            // API Submission
            const submitData = async () => {
                try {
                    const payload = mapSurveyDataToSubmission(data);
                    // Ensure token is ready (useAuth handles auto-login, but we might wait a bit if it's strictly async)
                    // For now, we assume token is available or request handles it if we pass it
                    await apiClient.post('/onboarding', payload, { token: token || undefined });
                    router.push('/result');
                } catch (error) {
                    console.error("Survey submission failed:", error);
                    setIsAnalyzing(false);
                    alert("설문 제출에 실패했습니다. 다시 시도해주세요.");
                }
            };

            submitData();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setDirection("back");
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleKakaoConfirm = () => {
        // Mock Kakao Login / Save action
        // In reality, this would likely be a redirect or an API call
        alert("카카오 계정으로 저장되었습니다! (Mock Action)");

        setShowKakaoModal(false);
        setHasSeenKakaoModal(true);
        setDirection("forward");
        proceedNext();
    };

    const handleKakaoClose = () => {
        // User chose to continue without saving
        setShowKakaoModal(false);
        setHasSeenKakaoModal(true);
        setDirection("forward");
        proceedNext();
    };

    if (isAnalyzing) {
        return <SurveyLoading dogName={data.dogName || "반려견"} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12 pb-24 relative">
            <KakaoSyncModal
                isOpen={showKakaoModal}
                onClose={handleKakaoClose}
                onConfirm={handleKakaoConfirm}
            />

            {IS_DEBUG && (
                <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold z-50 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setStep((s) => (s < TOTAL_STEPS ? s + 1 : 1))}>
                    🚧 DEBUG MODE ON (Click to Skip)
                </div>
            )}
            <SurveyProgress currentStep={step} totalSteps={TOTAL_STEPS} />

            <div className="flex-1 container max-w-xl mx-auto px-4 relative">
                <PageTransition
                    direction={direction}
                    stepKey={step}
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[400px]"
                >
                    {step === 1 && <Step1Profile data={data} updateData={updateData} />}
                    {step === 2 && <Step2Environment data={data} updateData={updateData} />}
                    {step === 3 && <Step3Health data={data} updateData={updateData} />}
                    {step === 4 && <Step4Problems data={data} updateData={updateData} />}
                    {step === 5 && <Step5Triggers data={data} updateData={updateData} />}
                    {step === 6 && <Step6PastAttempts data={data} updateData={updateData} />}
                    {step === 7 && <Step7Temperament data={data} updateData={updateData} />}
                </PageTransition>
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
