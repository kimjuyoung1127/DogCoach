"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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


import { useAuth } from "@/hooks/useAuth";
import { useSubmitSurvey } from "@/hooks/useQueries";
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

    const { mutate: submitSurvey } = useSubmitSurvey(token);

    const proceedNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Survey Completed -> Start Analysis
            console.log("Survey Completed:", data);
            setIsAnalyzing(true);

            // API Submission
            const doSubmit = () => {
                if (!token) {
                    alert("로그인이 필요합니다.");
                    router.push("/login");
                    return;
                }

                const payload = mapSurveyDataToSubmission(data);
                console.log("DEBUG: Sending Payload:", JSON.stringify(payload, null, 2));

                submitSurvey(payload, {
                    onSuccess: () => {
                        console.log("SURVEY SUBMISSION SUCCESS!");
                        alert("설문이 성공적으로 저장되었습니다!");
                        router.push('/result');
                    },
                    onError: (error) => {
                        console.error("Survey submission failed:", error);
                        setIsAnalyzing(false);
                        alert("설문 제출에 실패했습니다. 다시 시도해주세요.");
                    }
                });
            };

            doSubmit();
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
        alert("카카오 계정으로 저장되었습니다! (Mock Action)");

        setShowKakaoModal(false);
        setHasSeenKakaoModal(true);
        setDirection("forward");
        proceedNext();
    };

    const handleKakaoClose = () => {
        setShowKakaoModal(false);
        setHasSeenKakaoModal(true);
        setDirection("forward");
        proceedNext();
    };

    if (isAnalyzing) {
        return <SurveyLoading dogName={data.dogName || "반려견"} />;
    }

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
            {/* Premium Background Depth */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[120px] -z-0"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] -z-0"
            />

            <div className="flex-1 flex flex-col py-12 relative z-10 animate-in fade-in duration-1000">
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

                <div className="flex-1 container max-w-xl mx-auto px-4 relative flex flex-col items-center">
                    <div className="w-full h-[720px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white/50 overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10 relative">
                            <PageTransition
                                direction={direction}
                                stepKey={step}
                                className="min-h-full"
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

                        <div className="p-6 md:p-10 pt-0">
                            <SurveyControls
                                step={step}
                                totalSteps={TOTAL_STEPS}
                                onNext={handleNext}
                                onBack={handleBack}
                                canNext={validateStep(step, data, IS_DEBUG)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function validateStep(step: number, data: SurveyData, isDebug: boolean): boolean {
    if (isDebug) return true;

    switch (step) {
        case 1:
            return !!data.dogName && !!data.breed && !!data.sex && !!data.weight && !!data.adoptionDate;
        case 2:
            return !!data.householdType && !!data.primaryCarer;
        case 3:
            return true;
        case 4:
            return data.chronicIssues.length > 0;
        case 5:
            return data.triggers.length > 0;
        case 6:
            return data.pastAttempts.length > 0;
        case 7:
            return !!data.sensitivityScore;
        default:
            return true;
    }
}
