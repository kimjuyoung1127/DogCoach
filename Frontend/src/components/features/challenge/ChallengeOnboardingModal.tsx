"use client";

import { motion } from "framer-motion";
import { Home, Shield, Music, Dog, Eye, Footprints, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeOnboardingModalProps {
    isOpen: boolean;
    onStart: () => void;
}

export function ChallengeOnboardingModal({ isOpen, onStart }: ChallengeOnboardingModalProps) {
    if (!isOpen) return null;

    // 7 Steps Configuration
    const steps = [
        { day: 1, icon: Home, label: "환경 설정", active: true },
        { day: 2, icon: Shield, label: "안전", active: false },
        { day: 3, icon: Music, label: "안정화", active: false },
        { day: 4, icon: Dog, label: "기초", active: false },
        { day: 5, icon: Eye, label: "소통", active: false },
        { day: 6, icon: Footprints, label: "산책", active: false },
        { day: 7, icon: Flag, label: "위생", active: false },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl w-full max-w-sm md:max-w-md overflow-hidden relative"
            >
                <div className="p-8 text-center bg-green-50">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 break-keep">Bella를 위한<br />7일간의 약속</h2>
                    <p className="text-sm text-gray-600 break-keep">꾸준한 습관이 우리 아이를 바꿉니다.</p>
                </div>

                <div className="p-6 relative min-h-[300px] flex items-center justify-center">
                    {/* S-Shape Path SVG Background (Abstract Representation) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 300 400">
                        <motion.path
                            d="M150,50 C250,50 250,150 150,150 C50,150 50,250 150,250 C250,250 250,350 150,350"
                            fill="none"
                            stroke="#16a34a"
                            strokeWidth="10"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Nodes Grid - Simply represented for visual clarity in this mock */}
                    <div className="grid grid-cols-2 gap-y-8 gap-x-12 relative z-10 w-full max-w-[240px]">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.day}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className={cn(
                                    "flex flex-col items-center gap-2",
                                    step.active ? "text-green-600" : "text-gray-300"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center shadow-sm border-2",
                                    step.active ? "bg-white border-green-500 shadow-green-200" : "bg-gray-50 border-gray-200"
                                )}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold">Day {step.day}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        onClick={onStart}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98]"
                    >
                        여정 시작하기
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
