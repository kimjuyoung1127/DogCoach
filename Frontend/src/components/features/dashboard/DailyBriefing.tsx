"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface DailyBriefingProps {
    userName?: string;
    dogName?: string;
    streak?: number;
}

export function DailyBriefing({ userName = "보호자", dogName = "Bella", streak = 1 }: DailyBriefingProps) {
    return (
        <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-900">안녕하세요, {userName}님!</h1>
                </div>
                <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-orange-100">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" />
                    <span>{streak}일째 실천 중</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4"
            >
                <div className="text-3xl">🐶</div>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800">"어제 3번 칭찬해주셨네요! 훌륭해요."</p>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">
                        {dogName}가 어제보다 한결 편안해 보여요. 오늘도 작은 성공을 쌓아볼까요?
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
