"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ResultHeader } from "@/components/features/result/ResultHeader";
import { BarkingHeatmap } from "@/components/features/result/BarkingHeatmap";
import { ActionPlanCard } from "@/components/features/result/ActionPlanCard";
import { ConversionCTA } from "@/components/features/result/ConversionCTA";
import { DebugLoginToggle } from "@/components/shared/layout/materials/DebugLoginToggle";
import { LockedAnalysisSection } from "@/components/features/result/LockedAnalysisSection";
import { ChallengeOnboardingModal } from "@/components/features/coach/ChallengeOnboardingModal";
import { MissionActionOverlay } from "@/components/features/coach/MissionActionOverlay";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SurveyLoading } from "@/components/features/survey/SurveyLoading";

import { TRAINING_CURRICULUM, mapIssueToCurriculum } from "@/data/curriculum";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useQueries";

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
        return (
            <div className="min-h-screen flex items-center justify-center font-outfit">
                <p>데이터를 불러오는데 실패했습니다. 다시 시도해주세요.</p>
            </div>
        );
    }

    const { dog_profile, issues } = dashboardData;
    const curriculum = mapIssueToCurriculum(issues);
    const firstStage = curriculum.stages[0];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden pb-40 font-outfit">
            {/* Premium Background Depth (Organic Blobs) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-lime/10 rounded-full blur-[120px] -z-0"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] -z-0"
            />

            <div className="relative z-10 animate-in fade-in duration-1000">
                {/* Debug Button for Testing Pro vs Free */}
                <DebugLoginToggle isLoggedIn={isPro} onToggle={handleToggleDebug} />

                {/* Challenge Flow Modals */}
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
                            onClose={() => setShowMissionOverlay(false)} curriculumId={null}                        />
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

                {/* Main Content Sections with Staggered Entrance */}
                <div className="max-w-xl mx-auto px-6">
                    {/* Heatmap Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-10"
                    >
                        <BarkingHeatmap />
                    </motion.div>

                    {/* Conditional Content: Pro vs Free/Guest */}
                    {isPro ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Pro: Unlocked Analysis */}
                            <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 mb-10 shadow-xl shadow-gray-200/50 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 rounded-xl bg-brand-lime/10 text-brand-lime">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-black text-gray-900 tracking-tight">AI 통합 행동 분석 리포트</h3>
                                </div>
                                <p className="text-sm text-gray-700 break-keep leading-relaxed relative z-10 font-medium opacity-90">
                                    {curriculum.description} (전체 리포트 열람 중)
                                </p>
                            </div>

                            {/* Unlocked Action Plan */}
                            <ActionPlanCard
                                stage={firstStage}
                                onStart={() => setShowChallengeModal(true)}
                                isLocked={false}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Free/Guest: Locked Teasers */}
                            <div className="space-y-6">
                                <LockedAnalysisSection
                                    title={`1단계: ${firstStage.title}`}
                                    description="지금 바로 시작할 수 있는 맞춤 훈련법"
                                />
                                <LockedAnalysisSection
                                    title={`2단계: ${curriculum.stages[1]?.title || '심화 과정'}`}
                                    description="근본 원인을 해결하는 행동 교정"
                                />
                            </div>

                            <div className="mt-10">
                                <ActionPlanCard
                                    stage={firstStage}
                                    onStart={() => router.push('/login')}
                                    isLocked={true}
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Sticky bottom CTA with premium glass */}
            {!isPro ? (
                <div className="fixed bottom-0 left-0 right-0 p-6 z-50">
                    <ConversionCTA />
                </div>
            ) : (
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/40 backdrop-blur-xl border-t border-white/50 z-50 safe-area-bottom">
                    <div className="max-w-xl mx-auto">
                        <button
                            onClick={() => setShowChallengeModal(true)}
                            className="w-full bg-gray-900 hover:bg-black text-brand-lime font-black py-5 rounded-[1.5rem] shadow-2xl shadow-gray-300 flex items-center justify-center gap-2 active:scale-[0.98] transition-all group overflow-hidden relative"
                        >
                            <span className="relative z-10">{dog_profile.name} 맞춤형 7일 챌린지 시작하기</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
