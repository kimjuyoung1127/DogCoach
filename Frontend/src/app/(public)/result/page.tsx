"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResultHeader } from "@/components/features/result/ResultHeader";
import { BarkingHeatmap } from "@/components/features/result/BarkingHeatmap";
import { ActionPlanCard } from "@/components/features/result/ActionPlanCard";
import { ConversionCTA } from "@/components/features/result/ConversionCTA";
import { DebugLoginToggle } from "@/components/shared/layout/materials/DebugLoginToggle";
import { LockedAnalysisSection } from "@/components/features/result/LockedAnalysisSection";
import { ChallengeOnboardingModal } from "@/components/features/challenge/ChallengeOnboardingModal";
import { MissionActionOverlay } from "@/components/features/challenge/MissionActionOverlay";
import { Check, ArrowRight } from "lucide-react";
import { SurveyLoading } from "@/components/features/survey/SurveyLoading";

import { TRAINING_CURRICULUM, mapIssueToCurriculum } from "@/data/curriculum";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useQueries";

// Issue Mapping

export default function ResultPage() {
    const router = useRouter();
    const { token, user } = useAuth();

    // Debug State for Testing Pro vs Free
    const [debugForcePro, setDebugForcePro] = useState(false);

    // Fetch Data (Guest supported via Cookie)
    const { data: dashboardData, isLoading, error } = useDashboardData(true, token);

    // Local State for interactions
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [showMissionOverlay, setShowMissionOverlay] = useState(false);

    // Determine Pro Status (Mock logic or Real Check)
    const isPro = debugForcePro || user?.role === 'PRO_USER';

    const handleToggleDebug = () => {
        setDebugForcePro(!debugForcePro);
    };

    const handleStartJourney = () => {
        router.push("/coach?highlight=true");
    };

    const handleMissionComplete = (reaction: string) => {
        console.log("Mission Completed:", reaction);
        router.push("/dashboard");
    };

    if (isLoading) {
        return <SurveyLoading dogName="분석중" />;
    }

    if (error || !dashboardData) {
        // Fallback or Error Display. 
        // For MVP, just redirect to home or show error.
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>데이터를 불러오는데 실패했습니다. 다시 시도해주세요.</p>
            </div>
        );
    }

    const { dog_profile, issues } = dashboardData;
    const curriculum = mapIssueToCurriculum(issues);
    const firstStage = curriculum.stages[0];

    return (
        <div className="min-h-screen bg-gray-50 pb-40">
            {/* Debug Button for Testing Pro vs Free */}
            <DebugLoginToggle isLoggedIn={isPro} onToggle={handleToggleDebug} />

            {/* Challenge Flow Modals (Only active if Unlocked/Pro) */}
            {isPro && (
                <>
                    <ChallengeOnboardingModal
                        isOpen={showChallengeModal}
                        onStart={handleStartJourney}
                    />
                    <MissionActionOverlay
                        isOpen={showMissionOverlay}
                        mission={firstStage}
                        onComplete={handleMissionComplete}
                        onClose={() => setShowMissionOverlay(false)}
                    />
                </>
            )}

            {/* Header / Diagnosis */}
            <ResultHeader
                dogName={dog_profile.name}
                profileImage={dog_profile.profile_image_url}
                issueTitle={curriculum.title}
                issueDescription={curriculum.description}
                score={94} // Hardcoded confidence for now
            />

            {/* Heatmap Evidence */}
            <BarkingHeatmap />

            {/* Conditional Content: Pro vs Free/Guest */}
            {isPro ? (
                <>
                    {/* Pro: Unlocked Analysis */}
                    <div className="px-6 py-4">
                        <div className="bg-brand-lime/10 border border-brand-lime/20 rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="font-black text-brand-lime-darker mb-2 flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                통합 행동 분석 리포트
                            </h3>
                            <p className="text-sm text-gray-700 break-keep leading-relaxed relative z-10">
                                {curriculum.description} (전체 리포트 열람 중)
                            </p>
                        </div>
                    </div>
                    {/* Unlocked Action Plan */}
                    <ActionPlanCard
                        stage={firstStage}
                        onStart={() => setShowChallengeModal(true)}
                        isLocked={false}
                    />
                </>
            ) : (
                <>
                    {/* Free/Guest: Locked Teasers */}
                    <LockedAnalysisSection
                        title={`1단계: ${firstStage.title}`}
                        description="지금 바로 시작할 수 있는 맞춤 훈련법"
                        bgClass="bg-white"
                    />
                    <LockedAnalysisSection
                        title={`2단계: ${curriculum.stages[1]?.title || '심화 과정'}`}
                        description="근본 원인을 해결하는 행동 교정"
                        bgClass="bg-gray-50"
                    />

                    <ActionPlanCard
                        stage={firstStage}
                        onStart={() => router.push('/login')}
                        isLocked={true}
                    />
                </>
            )}

            {/* CTA */}
            {!isPro ? (
                <ConversionCTA />
            ) : (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50 safe-area-bottom">
                    <button
                        onClick={() => setShowChallengeModal(true)}
                        className="w-full bg-gray-900 hover:bg-black text-brand-lime font-black py-4.5 rounded-2xl shadow-xl shadow-gray-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all group overflow-hidden relative"
                    >
                        <span className="relative z-10">{dog_profile.name} 맞춤형 7일 챌린지 시작하기</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );
}
