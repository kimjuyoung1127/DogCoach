"use client";

import { motion } from "framer-motion";
import { Download, MessageCircle, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export function SeamlessSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
                        복잡한 건 딱 질색이니까.
                    </h2>
                    <p className="text-lg text-gray-600 break-keep">
                        앱 설치 없이, 평소 쓰는 카카오톡으로. <br className="hidden md:block" />
                        가장 자연스러운 흐름으로 기록을 도와드립니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* PWA Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors p-8 md:p-12">
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-gray-900">
                                <Smartphone className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 break-keep">앱 설치 없는 <span className="text-brand-lime">1초 접속</span></h3>
                            <p className="text-gray-600 mb-8 leading-relaxed break-keep">
                                스토어 가실 필요 없어요. <br />
                                홈 화면에 추가만 하세요. <br />
                                네이티브 앱처럼 빠르고 부드럽습니다.
                            </p>
                            <div className="inline-flex items-center text-sm font-bold text-gray-400 group-hover:text-brand-dark transition-colors">
                                <Download className="w-4 h-4 mr-2" />
                                PWA 지원
                            </div>
                        </div>
                    </div>

                    {/* Kakao Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-[#FAE100] p-8 md:p-12">
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center mb-6 text-[#3C1E1E]">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3C1E1E] mb-4 break-keep">머루가 보낸 <span className="underline decoration-[#3C1E1E]/20">알림톡</span></h3>
                            <p className="text-[#3C1E1E]/80 mb-8 leading-relaxed break-keep">
                                "엄마, 지금 산책 갈 시간이에요!" <br />
                                깜빡해도 괜찮아요. <br />
                                TailLog가 훈련 시간을 다정하게 챙겨드립니다.
                            </p>
                            <div className="inline-block px-4 py-2 bg-white/40 rounded-full text-xs font-bold text-[#3C1E1E]">
                                Pro 플랜 기능
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
