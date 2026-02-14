"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResultHeader } from "@/components/features/result/ResultHeader";
import { BehaviorIssueSummary } from "@/components/features/result/BehaviorIssueSummary";
import { ActionPlanCard } from "@/components/features/result/ActionPlanCard";
import { ConversionCTA } from "@/components/features/result/ConversionCTA";
import { LockedAnalysisSection } from "@/components/features/result/LockedAnalysisSection";
import { ChallengeOnboardingModal } from "@/components/features/coach/ChallengeOnboardingModal";
import { MissionActionOverlay } from "@/components/features/coach/MissionActionOverlay";
import { Check, ArrowRight } from "lucide-react";
import { SurveyLoading } from "@/components/features/survey/SurveyLoading";

import { mapIssueToCurriculum } from "@/data/curriculum";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useQueries";

export default function ResultPage() {
    const router = useRouter();
    const { token, user } = useAuth();

    // Fetch Data (Guest supported via Cookie)
    const { data: dashboardData, isLoading } = useDashboardData(true, token);

    // Local State for interactions
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [showMissionOverlay, setShowMissionOverlay] = useState(false);

    // Determine Pro Status
    const userRole = (user as { role?: string } | null)?.role;
    const isPro = userRole === 'PRO_USER';

    const handleStartJourney = () => {
        setShowChallengeModal(false);
        setShowMissionOverlay(true);
    };

    const handleMissionComplete = (reaction: string) => {
        console.log("Mission Completed:", reaction);
        setShowMissionOverlay(false);
    };

    if (isLoading) {
        return <SurveyLoading dogName="분석중" />;
    }

    // Fallback for guests without data — show partial result with locked UI
    const dog_profile = dashboardData?.dog_profile ?? { name: "반려견", profile_image_url: null };
    const issues = dashboardData?.issues ?? [];
    const curriculum = mapIssueToCurriculum(issues);
    const firstStage = curriculum.stages[0];

    return (
        <div className="min-h-screen bg-gray-50 pb-40">
            {/* Challenge Flow Modals (Only active if Unlocked/Pro) */}
            {isPro && (
                <>
                    <ChallengeOnboardingModal
                        isOpen={showChallengeModal}
                        onStart={handleStartJourney}
                    />
                    <MissionActionOverlay
                        isOpen={showMissionOverlay}
                        curriculumId={curriculum.id}
                        dogId={dashboardData?.dog_profile?.id}
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
                curriculumId={curriculum.id}
                score={94} // Hardcoded confidence for now
            />

            {/* Behavior Issue Summary */}
            <BehaviorIssueSummary
                dogName={dog_profile.name}
                issues={issues}
                curriculumTitle={curriculum.title}
            />

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
                <ConversionCTA isAuthenticated={!!token} />
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
