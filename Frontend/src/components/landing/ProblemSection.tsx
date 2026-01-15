"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";

export function ProblemSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
                        유튜브 보고 따라 해도<br />
                        <span className="text-brand-orange">우리 아이에겐 안 맞지 않던가요?</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto break-keep">
                        강아지마다 성격도, 환경도 다릅니다. <br className="hidden md:block" />
                        모두에게 똑같은 "국민 훈련법"은 정답이 아닐 수 있습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* BAD: Generic Video */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white border border-gray-200 grayscale opacity-80"
                    >
                        <div className="flex items-center gap-2 mb-6 text-gray-500">
                            <XCircle className="w-6 h-6" />
                            <span className="font-bold text-lg">일반적인 조언</span>
                        </div>
                        <div className="bg-gray-200 rounded-xl aspect-video mb-6 flex items-center justify-center text-gray-400">
                            🎥 일반 훈련 영상
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 break-keep">
                            "짖으면 간식을 주지 마세요"
                        </h3>
                        <p className="text-gray-500 break-keep">
                            원인을 모른 채 무조건 참게 하거나, <br />
                            우리 아이 상황에는 맞지 않는 훈련법.
                        </p>
                    </motion.div>

                    {/* GOOD: TailLog Data */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white border-2 border-brand-lime shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-brand-lime text-white text-xs font-bold px-3 py-1 rounded-bl-xl">TailLog 솔루션</div>
                        <div className="flex items-center gap-2 mb-6 text-brand-dark">
                            <CheckCircle className="w-6 h-6 text-brand-lime" />
                            <span className="font-bold text-lg">데이터 기반 맞춤 처방</span>
                        </div>

                        {/* Visual Representation of Insight */}
                        <div className="bg-brand-lime/10 rounded-xl p-6 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-brand-lime uppercase">인사이트 카드</span>
                                <span className="text-xs text-gray-500">방금 전</span>
                            </div>
                            <p className="text-gray-800 font-medium text-sm leading-relaxed break-keep">
                                "머루는 <span className="text-brand-orange font-bold">화요일 저녁 8시 현관 소음</span>에 예민하군요.<br />
                                이 시간엔 '앉아' 대신 <span className="underline decoration-brand-lime decoration-2">노즈워크</span>를 먼저 시도해보세요."
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 break-keep">
                            "시간, 장소, 원인에 맞는 솔루션"
                        </h3>
                        <p className="text-gray-600 break-keep">
                            언제, 어디서, 왜 짖는지 분석하여 <br />
                            가장 효과적인 행동 교정법을 제안합니다.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
