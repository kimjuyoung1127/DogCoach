"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Activity, Bone, HeartPulse, Apple } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step3Health({ data, updateData }: Props) {
    const healthOptions = [
        { id: 'allergy', label: '알레르기 있음', icon: <Activity className="w-5 h-5" /> },
        { id: 'joint', label: '관절/슬개골 약함', icon: <Bone className="w-5 h-5" /> },
        { id: 'digestive', label: '소화기 예민', icon: <HeartPulse className="w-5 h-5" /> },
        { id: 'obesity', label: '비만/체중 관리', icon: <Apple className="w-5 h-5" /> },
    ];

    const treatOptions = [
        { id: 'meat', label: '육류 간식', emoji: '🍖' },
        { id: 'vegetable', label: '채소/과일', emoji: '🥕' },
        { id: 'gum', label: '개껌/오래먹는 것', emoji: '🦴' },
        { id: 'toy', label: '장난감 보상', emoji: '🧸' },
    ];

    const toggleHealth = (id: string) => {
        const current = data.healthIssues;
        if (current.includes(id)) {
            updateData({ healthIssues: current.filter(h => h !== id) });
        } else {
            updateData({ healthIssues: [...current, id] });
        }
    };

    const toggleTreat = (id: string) => {
        const current = data.favoriteTreats;
        if (current.includes(id)) {
            updateData({ favoriteTreats: current.filter(t => t !== id) });
        } else {
            updateData({ favoriteTreats: [...current, id] });
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">건강 상태와 선호도</h2>
                <p className="text-gray-500">알맞은 보상과 솔루션을 위해 꼭 필요해요.</p>
            </div>

            {/* Health Issues */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">혹시 앓고 있거나 주의해야 할 건강 문제가 있나요?</label>
                <div className="grid grid-cols-2 gap-3">
                    {healthOptions.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleHealth(item.id)}
                            className={cn(
                                "p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                                data.healthIssues.includes(item.id)
                                    ? "border-brand-lime bg-green-50 text-brand-dark font-bold ring-1 ring-brand-lime"
                                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                            )}
                        >
                            <div className={cn("p-1.5 rounded-full", data.healthIssues.includes(item.id) ? "bg-brand-lime text-white" : "bg-gray-100 text-gray-400")}>
                                {item.icon}
                            </div>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Favorite Treats */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">가장 좋아하는 보상은 무엇인가요? (다중 선택)</label>
                <div className="grid grid-cols-4 gap-2">
                    {treatOptions.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleTreat(item.id)}
                            className={cn(
                                "py-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2",
                                data.favoriteTreats.includes(item.id)
                                    ? "border-brand-lime bg-brand-lime/10 text-brand-dark"
                                    : "border-gray-100 hover:bg-gray-50 text-gray-600"
                            )}
                        >
                            <span className="text-2xl">{item.emoji}</span>
                            <span className="text-xs font-bold">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
