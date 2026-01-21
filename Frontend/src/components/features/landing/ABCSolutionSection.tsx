"use client";

import { motion } from "framer-motion";

export function ABCSolutionSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-lime/5" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-lime font-bold tracking-wider text-sm uppercase mb-2 block">TailLog만의 비결</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
                        행동 분석의 과학, <span className="text-brand-lime">ABC 모델</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto break-keep">
                        단순히 기록만 하는 게 아닙니다.<br className="hidden md:block" />
                        AI가 상황(A), 행동(B), 결과(C)를 분석하여 진짜 원인을 찾아냅니다.
                    </p>
                </div>

                {/* Diagram */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
                    {/* A: Antecedent */}
                    <motion.div
                        className="flex-1 w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative group hover:border-brand-lime transition-colors"
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 mb-4 group-hover:bg-brand-lime group-hover:text-white transition-colors">A</div>
                        <h3 className="font-bold text-lg mb-2">Antecedent (상황)</h3>
                        <p className="text-sm text-gray-500 break-keep">"초인종 소리가 났을 때"</p>
                    </motion.div>

                    {/* Arrow */}
                    <div className="text-gray-300 md:rotate-0 rotate-90">➔</div>

                    {/* B: Behavior */}
                    <motion.div
                        className="flex-1 w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative group hover:border-brand-lime transition-colors"
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">B</div>
                        <h3 className="font-bold text-lg mb-2">Behavior (행동)</h3>
                        <p className="text-sm text-gray-500 break-keep">"현관으로 달려가 짖음"</p>
                    </motion.div>

                    {/* Arrow */}
                    <div className="text-gray-300 md:rotate-0 rotate-90">➔</div>

                    {/* C: Consequence */}
                    <motion.div
                        className="flex-1 w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative group hover:border-brand-lime transition-colors"
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">C</div>
                        <h3 className="font-bold text-lg mb-2">Consequence (결과)</h3>
                        <p className="text-sm text-gray-500 break-keep">"보호자가 안아서 달램"</p>
                    </motion.div>
                </div>

                {/* AI Insight Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-12 bg-gray-900 text-white p-6 rounded-2xl relative"
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-lime text-brand-dark text-xs font-bold rounded-full">
                        AI 코치의 조언
                    </div>
                    <p className="text-center font-medium break-keep">
                        "보호자님! 짖을 때 안아주는 행동(C)은 보상이 되어 <span className="text-brand-lime">짖음을 강화</span>시키고 있어요.
                        대신 '자리로' 훈련을 시켜보세요."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
