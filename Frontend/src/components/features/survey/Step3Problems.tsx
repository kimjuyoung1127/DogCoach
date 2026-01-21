"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Megaphone, Zap, Home, Skull, Ban, MoreHorizontal } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step3Problems({ data, updateData }: Props) {
    const problems = [
        { id: 'barking', label: '짖음 / 하울링', icon: <Megaphone className="w-6 h-6" /> },
        { id: 'separation', label: '분리불안', icon: <Home className="w-6 h-6" /> },
        { id: 'aggression', label: '공격성 (입질)', icon: <Zap className="w-6 h-6" /> },
        { id: 'destructive', label: '물건 파괴', icon: <Skull className="w-6 h-6" /> },
        { id: 'potty', label: '배변 실수', icon: <Ban className="w-6 h-6" /> },
        { id: 'etc', label: '기타', icon: <MoreHorizontal className="w-6 h-6" /> },
    ];

    const toggleProblem = (id: string) => {
        const current = data.problemBehaviors;
        if (current.includes(id)) {
            updateData({ problemBehaviors: current.filter(p => p !== id) });
        } else {
            updateData({ problemBehaviors: [...current, id] });
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    <span className="text-brand-lime">{data.dogName || '강아지'}</span>(이)의 고민은 무엇인가요?
                </h2>
                <p className="text-gray-500">해당하는 모든 항목을 선택해주세요. (중복 선택 가능)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {problems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleProblem(item.id)}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all h-32 gap-3",
                            data.problemBehaviors.includes(item.id)
                                ? "border-brand-lime bg-green-50 shadow-md ring-1 ring-brand-lime"
                                : "border-gray-100 bg-white hover:bg-gray-50 text-gray-400"
                        )}
                    >
                        <div className={cn(
                            "p-2 rounded-full",
                            data.problemBehaviors.includes(item.id) ? "bg-brand-lime text-white" : "bg-gray-100 text-gray-400"
                        )}>
                            {item.icon}
                        </div>
                        <span className={cn(
                            "font-bold text-sm",
                            data.problemBehaviors.includes(item.id) ? "text-brand-dark" : "text-gray-600"
                        )}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
