"use client";

import { motion } from "framer-motion";
import { FileText, Stethoscope } from "lucide-react";
import Image from "next/image";

export function ExpertSynergySection() {
    return (
        <section className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Left: Text */}
                    <div className="flex-1 space-y-6 order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-2">
                            <Stethoscope className="w-3 h-3" />
                            수의사 친화적
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight break-keep">
                            진료실에서<br />
                            당황하지 마세요.
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed break-keep">
                            "집에서는 어떻게 행동하나요?"라는 수의사 선생님 질문에
                            리포트를 보여주세요. <br /><br />
                            TailLog의 데이터 리포트는 <br className="hidden md:block" />
                            <span className="font-bold text-gray-900">전문가가 신뢰할 수 있는 문진표</span>가 됩니다.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500">Doc</div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">행동 전문 수의사 자문 감수</span>
                        </div>
                    </div>

                    {/* Right: Report Mockup */}
                    <div className="flex-1 order-1 md:order-2 w-full max-w-md relative">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative bg-white p-6 rounded-xl shadow-2xl border border-gray-100 rotate-3 hover:rotate-0 transition-transform duration-500"
                        >
                            <div className="flex items-center justify-between border-b pb-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <span className="font-bold text-gray-900">TailLog 월간 리포트</span>
                                </div>
                                <span className="text-xs text-brand-lime font-bold bg-brand-lime/10 px-2 py-1 rounded">PRO</span>
                            </div>

                            <div className="space-y-4 filter blur-[1px] hover:blur-none transition-all duration-300 cursor-pointer">
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                                <div className="h-32 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                                    행동 그래프 시각화
                                </div>
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-5/6" />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] hover:backdrop-blur-none hover:bg-transparent transition-all group">
                                <div className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg group-hover:opacity-0 transition-opacity">
                                    샘플 미리보기
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
