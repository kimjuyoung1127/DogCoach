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
import { TestimonialsSection } from "@/components/features/landing/TestimonialsSection";
import { FAQSection } from "@/components/features/landing/FAQSection";
import { FinalCTASection } from "@/components/features/landing/FinalCTASection";

export const metadata: Metadata = {
    title: "TailLog | ?�이?�로 ?�해?�는 반려�??�동 분석",
    description: "머루??짖음, ?�제 감이 ?�닌 ?�이?�로 ?�결?�세?? AI ?�동 분석, 맞춤 ?�루?? ?�물병원 ??리포?�까지. ?�늘 ?�작?�면 ?�일??10???�화가 찾아?�니??",
    keywords: ["반려�??�련", "강아지 ?�동 교정", "AI Dog Training", "TailLog", "?�일로그", "분리불안", "강아지 ?�트�?],
    openGraph: {
        title: "TailLog - ?�이??기반 반려�??�동 교정",
        description: "?��? 5,000명의 보호?��? 경험??변?? 3�?무료 진단?�로 ?�작?�세??",
        siteName: "TailLog",
        images: [
            {
                url: "/og/taillog-share-v2.png",
                width: 1200,
                height: 630,
                alt: "TailLog ?�이??기반 반려�??�동 코칭",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "TailLog - ?�이??기반 반려�??�동 교정",
        description: "?��? 5,000명의 보호?��? 경험??변?? 3�?무료 진단?�로 ?�작?�세??",
        images: ["/og/taillog-share-v2.png"],
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

            {/* 9. Testimonials: Real Stories */}
            <TestimonialsSection />

            {/* 10. Pricing: Emotional Closing */}
            <PricingSection />

            {/* 11. FAQ: Resolving Doubts */}
            <FAQSection />

            {/* 12. Final CTA: Last Chance */}
            <FinalCTASection />
        </div>
    );
}
