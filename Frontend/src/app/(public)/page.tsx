import { type Metadata } from "next";
import { HeroSection } from "@/components/features/landing/HeroSection";
import { SocialProofSection } from "@/components/features/landing/SocialProofSection";
import { ProblemSection } from "@/components/features/landing/ProblemSection";
import { ABCSolutionSection } from "@/components/features/landing/ABCSolutionSection";
import { BehaviorMapSection } from "@/components/features/landing/BehaviorMapSection";
import { SeamlessSection } from "@/components/features/landing/SeamlessSection";
import { ProcessSection } from "@/components/features/landing/ProcessSection";
import { ExpertSynergySection } from "@/components/features/landing/ExpertSynergySection";
import { PricingSection } from "@/components/features/landing/PricingSection";

export const metadata: Metadata = {
    title: "TailLog | 데이터로 이해하는 반려견 행동 분석",
    description: "머루의 짖음, 이제 감이 아닌 데이터로 해결하세요. AI 행동 분석, 맞춤 솔루션, 수의사 리포트까지. 오늘 시작하면 내일의 10년 평화가 찾아옵니다.",
    keywords: ["반려견 훈련", "강아지 행동 교정", "AI Dog Training", "TailLog", "테일로그", "분리불안", "강아지 히트맵"],
    openGraph: {
        title: "TailLog - 데이터 기반 반려견 행동 교정",
        description: "이미 5,000명의 보호자가 경험한 변화. 3분 무료 진단으로 시작하세요.",
        siteName: "TailLog",
    },
};

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col">
            {/* 1. Hero: Emotional Hook & Data Promise */}
            <HeroSection />

            {/* 2. Social Proof: 5k+ Users Trust */}
            <SocialProofSection />

            {/* 3. Problem: Generic Advice vs Data Prescription */}
            <ProblemSection />

            {/* 4. Solution: Scientific ABC Model */}
            <ABCSolutionSection />

            {/* 5. Key Feature: Visualization (Heatmap) */}
            <BehaviorMapSection />

            {/* 6. Seamless: PWA & Kakao */}
            <SeamlessSection />

            {/* 7. Process: Simple 3 Steps */}
            <ProcessSection />

            {/* 8. Expert Synergy: Vet Report */}
            <ExpertSynergySection />

            {/* 9. Pricing: Emotional Closing */}
            <PricingSection />
        </div>
    );
}
