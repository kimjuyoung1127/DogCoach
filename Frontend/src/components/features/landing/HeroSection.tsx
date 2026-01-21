"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-orange-50/30">
            {/* Background Decor (Blob) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl space-y-8"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-600 mb-4 hover:border-brand-lime transition-colors">
                        <Activity className="w-4 h-4 text-brand-lime" />
                        <span className="text-brand-dark">데이터로 보는 우리 아이 마음</span>
                    </div>

                    {/* Copy */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight break-keep">
                        머루의 짖음,<br />
                        이제 '감'이 아닌 <span className="relative inline-block text-brand-lime px-2">
                            <span className="relative z-10">'데이터'</span>
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-lime/20 -z-0 rounded-sm"></span>
                        </span>로 <br className="hidden md:block" />해결하세요.
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed break-keep">
                        매번 똑같은 훈련 영상은 그만.<br className="hidden md:block" />
                        <strong>TailLog</strong>가 머루의 행동 패턴을 분석해<br className="md:hidden" />
                        딱 맞는 솔루션을 찾아드립니다.
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 items-center">
                        <Link
                            href="/Survey"
                            className={cn(
                                "group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-brand-lime rounded-full overflow-hidden hover:scale-105 shadow-xl shadow-brand-lime/30"
                            )}
                        >
                            <span className="relative z-10 flex items-center">
                                무료로 머루 행동 리포트 받기
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        <span className="text-sm text-gray-400">⚡️ 3분이면 충분해요</span>
                    </div>

                    <div className="pt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for trusted logos or simplified social proof icons */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
