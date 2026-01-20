"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import confetti from "canvas-confetti";

export function MissionTracker() {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        if (isCompleted) return;

        setIsCompleted(true);
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#22c55e', '#86efac', '#fbbf24']
        });
    };

    return (
        <section className="mb-6">
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm font-bold text-gray-700">오늘의 미션 (Day 1)</h2>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">진행중</span>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">현관 앞 가림막 설치하기</h3>
                    <p className="text-xs text-gray-500">시각적 차단만으로도 짖음이 30% 줄어듭니다.</p>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-between items-center mb-6 px-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div key={day} className="flex flex-col items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${day === 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                            <span className={`text-[10px] ${day === 1 ? 'text-green-600 font-bold' : 'text-gray-300'}`}>{day}</span>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleComplete}
                    disabled={isCompleted}
                    className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCompleted
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-gray-900 text-white shadow-lg hover:bg-black'
                        }`}
                >
                    {isCompleted ? (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>완료했습니다!</span>
                        </>
                    ) : (
                        <>
                            <span>오늘 미션 완료 체크</span>
                        </>
                    )}
                </motion.button>
            </div>
        </section>
    );
}
