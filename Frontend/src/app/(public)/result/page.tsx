"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResultHeader } from "@/components/result/ResultHeader";
import { BarkingHeatmap } from "@/components/result/BarkingHeatmap";
import { ActionPlanCard } from "@/components/result/ActionPlanCard";
import { ConversionCTA } from "@/components/result/ConversionCTA";
import { DebugLoginToggle } from "@/components/layout/materials/DebugLoginToggle";
import { LockedAnalysisSection } from "@/components/result/LockedAnalysisSection";
import { ChallengeOnboardingModal } from "@/components/challenge/ChallengeOnboardingModal";
import { MissionActionOverlay } from "@/components/challenge/MissionActionOverlay";

export default function ResultPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Challenge Flow State
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [showMissionOverlay, setShowMissionOverlay] = useState(false);

    const handleLoginDebug = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const handleStartJourney = () => {
        setShowChallengeModal(false);
        setShowMissionOverlay(true);
    };

    const handleMissionComplete = (reaction: string) => {
        console.log("Mission Completed with reaction:", reaction);
        // Navigate to Dashboard
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-40">
            {/* Debug Button for Testing */}
            <DebugLoginToggle isLoggedIn={isLoggedIn} onToggle={handleLoginDebug} />

            {/* Challenge Flow Modals */}
            <ChallengeOnboardingModal
                isOpen={showChallengeModal}
                onStart={handleStartJourney}
            />
            <MissionActionOverlay
                isOpen={showMissionOverlay}
                onComplete={handleMissionComplete}
            />

            {/* Header / Persona (Same for both, but Header is richer now) */}
            <ResultHeader />

            {/* Heatmap Evidence (Data Evidence) */}
            <BarkingHeatmap />

            {/* Conditional Content: User vs Guest */}
            {isLoggedIn ? (
                <>
                    {/* User: Full Analysis & Detailed Plans */}
                    <div className="px-6 py-4">
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6">
                            <h3 className="font-bold text-green-800 mb-2">✅ 통합 행동 분석 리포트</h3>
                            <p className="text-sm text-green-700 break-keep">회원님은 현재 <strong>정밀 진단 모드</strong>로 모든 데이터를 확인하실 수 있습니다. Bella의 입질과 하우스 거부 원인은 '불안성 공격'으로 진단되었습니다.</p>
                        </div>
                    </div>
                    <ActionPlanCard />
                    {/* Detailed Roadmap, etc. could go here */}
                </>
            ) : (
                <>
                    {/* Guest: Locked Teasers */}
                    <LockedAnalysisSection
                        title="Bella의 '입질' 습관 교정 3단계"
                        description="무는 행동을 멈추게 하는 터치 교육법"
                        bgClass="bg-white"
                    />
                    <LockedAnalysisSection
                        title="피부 알러지 맞춤 영양 가이드"
                        description="스트레스를 낮추는 저알러지 식단 추천"
                        bgClass="bg-gray-50"
                    />

                    {/* Guest sees 'Today's Mission' too, but maybe simpler? Let's show it as 'Taste' */}
                    <ActionPlanCard />
                </>
            )}

            {/* Fixed Bottom CTA (Show Conversion for Guest, or 'Start Day 1' for User) */}
            {!isLoggedIn ? (
                <ConversionCTA />
            ) : (
                <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-100 z-50 safe-area-bottom">
                    <button
                        onClick={() => setShowChallengeModal(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                    >
                        <span>Bella 맞춤형 7일 챌린지 시작하기</span>
                    </button>
                </div>
            )}
        </div>
    );
}
