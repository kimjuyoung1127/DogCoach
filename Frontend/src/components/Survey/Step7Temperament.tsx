"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step7Temperament({ data, updateData }: Props) {
    const scores = [1, 2, 3, 4, 5];
    const descriptions = [
        "매우 둔감함 (천사견)",
        "대체로 무던함",
        "보통 (상황에 따라 다름)",
        "약간 예민함",
        "매우 예민함 (경계심 높음)"
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">타고난 기질은 어떤가요?</h2>
                <p className="text-gray-500">낯선 사람이나 소리에 얼마나 민감하게 반응하나요?</p>
            </div>

            <div className="relative py-8 px-4">
                {/* Track */}
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-100 rounded-full -z-10 mx-6"></div>

                {/* Steps */}
                <div className="flex justify-between relative z-0">
                    {scores.map((score) => (
                        <div key={score} className="flex flex-col items-center gap-4">
                            <button
                                onClick={() => updateData({ sensitivityScore: score })}
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all shadow-sm border-4",
                                    data.sensitivityScore === score
                                        ? "bg-brand-lime border-white text-white scale-125 shadow-brand-lime/30 z-10"
                                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                                )}
                            >
                                {score}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Description Text */}
                <div className="mt-8 text-center">
                    <div className="inline-block bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                        <span className="font-bold text-brand-dark text-lg block mb-1">
                            Lv.{data.sensitivityScore}
                        </span>
                        <span className="text-gray-600 text-sm">
                            {descriptions[data.sensitivityScore - 1]}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700 leading-relaxed text-center break-keep">
                💡 <strong>AI Tip:</strong> 기질 점수에 따라 훈련 강도와 속도를 조절하여 맞춤형 커리큘럼을 제안해드려요.
            </div>
        </div>
    );
}
