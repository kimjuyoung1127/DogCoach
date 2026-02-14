"use client";

import { useState, useEffect } from "react";
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
import { ValidationErrorModal } from "@/components/shared/modals/ValidationErrorModal";

import { useAuth } from "@/hooks/useAuth";
import { useSubmitSurvey } from "@/hooks/useQueries";
import { mapSurveyDataToSubmission } from "./survey-mapper";
import { saveSurveyState, restoreSurveyState, clearSurveyState } from "@/lib/survey-storage";
import { supabase } from "@/lib/supabase";

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

    // Validation Error Modal
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showValidationModal, setShowValidationModal] = useState(false);

    const TOTAL_STEPS = 7;

    // Direction State for Transitions
    const [direction, setDirection] = useState<"forward" | "back">("forward");

    // Restore survey state after OAuth redirect
    useEffect(() => {
        const restored = restoreSurveyState();
        if (restored) {
            setData(restored.data);
            setStep(restored.currentStep);
            setHasSeenKakaoModal(true);
            clearSurveyState();
        }
    }, []);

    const updateData = (newData: Partial<SurveyData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        // Intercept logic for Step 3 -> 4 (only for unauthenticated users)
        if (step === 3 && !hasSeenKakaoModal && !token) {
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
            // Final validation before submission
            const errors = validateAllRequiredFields(data);
            if (errors.length > 0) {
                setValidationErrors(errors);
                setShowValidationModal(true);
                return;
            }

            // Survey Completed -> Start Analysis
            console.log("Survey Completed:", data);
            setIsAnalyzing(true);

            // API Submission (guest submit allowed via credentials cookie)
            const payload = mapSurveyDataToSubmission(data);

            submitSurvey(payload, {
                onSuccess: () => {
                    console.log("SURVEY SUBMISSION SUCCESS!");
                    router.push('/result');
                },
                onError: (error) => {
                    console.error("Survey submission failed:", error);
                    setIsAnalyzing(false);
                    alert("설문 제출에 실패했습니다. 다시 시도해주세요.");
                }
            });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setDirection("back");
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleKakaoConfirm = async () => {
        try {
            // 현재 설문 상태 저장
            saveSurveyState(data, step);

            setShowKakaoModal(false);

            // 카카오 OAuth 트리거
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'kakao',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?returnTo=/survey`,
                },
            });

            if (error) {
                console.error('Kakao OAuth error:', error);
                alert('카카오 로그인 중 오류가 발생했습니다');
                clearSurveyState();
            }
            // OAuth 리다이렉트 자동 발생
        } catch (error) {
            console.error('Kakao sync error:', error);
            alert('카카오 로그인 연결에 실패했습니다');
            clearSurveyState();

            // Fallback: 로그인 없이 계속
            setHasSeenKakaoModal(true);
            setDirection("forward");
            proceedNext();
        }
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
                className="absolute top-[-4%] right-[-3%] w-[300px] h-[300px] sm:top-[-10%] sm:right-[-5%] sm:w-[600px] sm:h-[600px] bg-brand-lime/5 rounded-full blur-[64px] sm:blur-[120px] -z-0"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="absolute bottom-[-3%] left-[-2%] w-[260px] h-[260px] sm:bottom-[-10%] sm:left-[-5%] sm:w-[500px] sm:h-[500px] bg-brand-orange/5 rounded-full blur-[56px] sm:blur-[100px] -z-0"
            />

            <div className="flex-1 flex flex-col py-12 relative z-10 animate-in fade-in duration-1000">
                <KakaoSyncModal
                    isOpen={showKakaoModal}
                    onClose={handleKakaoClose}
                    onConfirm={handleKakaoConfirm}
                />

                <ValidationErrorModal
                    isOpen={showValidationModal}
                    onClose={() => setShowValidationModal(false)}
                    errors={validationErrors}
                />

                <SurveyProgress currentStep={step} totalSteps={TOTAL_STEPS} />

                <div className="flex-1 container max-w-xl mx-auto px-4 relative flex flex-col items-center">
                    <div className="w-full min-h-[720px] h-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white/50 overflow-visible flex flex-col">
                        <div className="flex-1 p-6 md:p-10 relative">
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

                        <div className="p-6 md:p-10 pt-2 md:pt-4">
                            <SurveyControls
                                step={step}
                                totalSteps={TOTAL_STEPS}
                                onNext={handleNext}
                                onBack={handleBack}
                                canNext={validateStep(step, data)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function validateStep(step: number, data: SurveyData): boolean {
    switch (step) {
        case 1:
            // 필수: 이름 + 견종만 (나머지는 선택)
            return !!data.dogName && !!data.breed;
        case 2:
            // 선택사항
            return true;
        case 3:
            // 선택사항
            return true;
        case 4:
            // 필수: 최소 1개 이상의 행동 문제
            return data.chronicIssues.length > 0;
        case 5:
            // 필수: 최소 1개 이상의 트리거
            return data.triggers.length > 0;
        case 6:
            // 선택사항
            return true;
        case 7:
            // 선택사항
            return true;
        default:
            return true;
    }
}

function validateAllRequiredFields(data: SurveyData): string[] {
    const errors: string[] = [];

    if (!data.dogName || data.dogName.trim() === '') {
        errors.push('강아지 이름');
    }

    if (!data.breed) {
        errors.push('견종 정보');
    }

    if (data.chronicIssues.length === 0) {
        errors.push('주요 행동 문제 (최소 1개)');
    }

    if (data.triggers.length === 0) {
        errors.push('문제 발생 상황 (최소 1개)');
    }

    return errors;
}
