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
  title: "TailLog | Understand Dog Behavior with Data",
  description:
    "Move beyond guesswork. TailLog analyzes dog behavior patterns and delivers practical, personalized coaching insights.",
  keywords: [
    "dog behavior",
    "dog training",
    "AI dog coaching",
    "TailLog",
    "pet analytics",
    "behavior log",
  ],
  openGraph: {
    title: "TailLog - Data-Driven Dog Behavior Coaching",
    description:
      "Trusted by thousands of dog guardians. Start with a quick behavior check today.",
    siteName: "TailLog",
    images: [
      {
        url: "/og/taillog-share-v2.png",
        width: 1200,
        height: 630,
        alt: "TailLog share image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TailLog - Data-Driven Dog Behavior Coaching",
    description:
      "Trusted by thousands of dog guardians. Start with a quick behavior check today.",
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
