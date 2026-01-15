"use client";

import { motion } from "framer-motion";

export function BehaviorMapSection() {
    return (
        <section className="py-24 bg-brand-dark text-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight break-keep">
                        언제, 어디서 힘들어하는지<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-orange">
                            행동 지도(Heatmap)
                        </span>로 확인하세요.
                    </h2>
                    <p className="text-gray-400 text-lg break-keep">
                        막연한 불안감이 사라집니다. <br className="hidden md:block" />
                        데이터가 쌓이면 우리 아이만의 스트레스 패턴이 보이기 시작합니다.
                    </p>
                    <ul className="space-y-4 pt-4">
                        {["가장 많이 짖는 시간대 파악", "장소별 문제 행동 빈도 분석", "주간 개선율 그래프"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                                <span className="text-gray-300 break-keep">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual Mockup */}
                <div className="flex-1 w-full max-w-md">
                    <motion.div
                        className="relative aspect-square bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl"
                        initial={{ rotate: 5, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* Mock Heatmap Grid */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl" />

                        <div className="relative z-10 space-y-4">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-bold text-gray-400">3주차 행동 지도</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-sm bg-gray-600" />
                                    <div className="w-2 h-2 rounded-sm bg-brand-lime/50" />
                                    <div className="w-2 h-2 rounded-sm bg-brand-lime" />
                                    <div className="w-2 h-2 rounded-sm bg-brand-orange" />
                                </div>
                            </div>

                            {/* Simulated Heatmap Blocks */}
                            <div className="grid grid-cols-7 gap-2">
                                {Array.from({ length: 49 }).map((_, i) => {
                                    // Simulating some "hot spots"
                                    const isHot = [10, 11, 18, 24, 25, 32].includes(i);
                                    const isWarm = [9, 12, 17, 19, 31, 33].includes(i);
                                    return (
                                        <motion.div
                                            key={i}
                                            className={`aspect-square rounded-sm ${isHot ? 'bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.5)]' : isWarm ? 'bg-brand-lime' : 'bg-gray-700/50'}`}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ delay: i * 0.01 }}
                                        />
                                    )
                                })}
                            </div>
                            <div className="text-center pt-4">
                                <p className="text-xs text-gray-400 break-keep">
                                    "화요일 저녁에 짖음 빈도가 가장 높아요!"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
