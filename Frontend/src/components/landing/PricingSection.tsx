"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Free",
        price: "0",
        description: "가볍게 시작하는 행동 기록",
        features: ["기본 행동 로그 기록", "주간 히트맵(Heatmap) 제공", "커뮤니티 접근 권한"],
        cta: "무료로 시작하기",
        href: "/checkup",
        popular: false,
    },
    {
        name: "Pro",
        price: "9,900",
        period: "/월",
        description: "AI 코칭으로 확실한 행동 교정",
        features: [
            "AI 행동 원인 분석 (ABC 모델)",
            "맞춤형 일일 코칭 & 미션",
            "머루가 보내는 알림톡 서비스",
            "수의사 제출용 PDF 리포트",
        ],
        cta: "7일 무료 체험 시작",
        href: "/checkup",
        popular: true,
    },
];

export function PricingSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
                        오늘의 기록 1분이<br />
                        <span className="text-brand-orange">내일의 10년 평화를 만듭니다.</span>
                    </h2>
                    <p className="text-lg text-gray-600 break-keep">
                        부담 없는 가격으로, 평생의 행복을 구독하세요.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative p-8 rounded-3xl border flex flex-col",
                                plan.popular
                                    ? "border-brand-lime bg-white shadow-xl scale-105 z-10"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-lime text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                                    <Zap className="w-4 h-4 fill-current" />
                                    가장 인기
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">₩{plan.price}</span>
                                    {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                                </div>
                                <p className="text-gray-500 mt-2 text-sm break-keep">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className={cn("w-5 h-5 shrink-0", plan.popular ? "text-brand-lime" : "text-gray-400")} />
                                        <span className="text-gray-700 text-sm font-medium break-keep">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={cn(
                                    "w-full py-4 rounded-xl text-center font-bold text-sm transition-all",
                                    plan.popular
                                        ? "bg-brand-dark text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                                        : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
                                )}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400 break-keep">
                        * 수익금의 일부는 유기견 행동 교정 센터에 기부됩니다.
                    </p>
                </div>
            </div>
        </section>
    );
}
