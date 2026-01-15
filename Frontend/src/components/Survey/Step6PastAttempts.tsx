"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { XCircle, MicOff, Frown, HandMetal } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step6PastAttempts({ data, updateData }: Props) {
    const attempts = [
        { id: 'scolding', label: '혼내기 / 소리치기', icon: <MegaphoneIcon className="w-5 h-5" /> },
        { id: 'ignoring', label: '무시하기 (등 돌리기)', icon: <MicOff className="w-5 h-5" /> },
        { id: 'blocking', label: '바디 블로킹', icon: <HandMetal className="w-5 h-5" /> },
        { id: 'distraction', label: '간식으로 시선 돌리기', icon: <Frown className="w-5 h-5" /> },
    ];

    const toggleAttempt = (id: string) => {
        const current = data.pastAttempts;
        if (current.includes(id)) {
            updateData({ pastAttempts: current.filter(a => a !== id) });
        } else {
            updateData({ pastAttempts: [...current, id] });
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">효과가 없던 방법은?</h2>
                <p className="text-gray-500 break-keep">과거에 시도했지만 실패했던 경험을 알려주시면, 중복된 조언을 피할 수 있어요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attempts.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleAttempt(item.id)}
                        className={cn(
                            "p-5 rounded-2xl border transition-all flex flex-col items-center gap-3 text-center",
                            data.pastAttempts.includes(item.id)
                                ? "border-red-400 bg-red-50 text-red-600 font-bold"
                                : "border-gray-200 hover:bg-gray-50 text-gray-600"
                        )}
                    >
                        <div className={cn(
                            "p-3 rounded-full mb-1 transition-colors",
                            data.pastAttempts.includes(item.id) ? "bg-red-200 text-red-600" : "bg-gray-100 text-gray-400"
                        )}>
                            {item.icon}
                        </div>
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}

                <button
                    onClick={() => {
                        if (data.pastAttempts.includes('none')) {
                            updateData({ pastAttempts: [] });
                        } else {
                            updateData({ pastAttempts: ['none'] });
                        }
                    }}
                    className={cn(
                        "p-5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 text-center col-span-1 md:col-span-2",
                        data.pastAttempts.includes('none')
                            ? "border-brand-lime bg-brand-lime text-white font-bold"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600"
                    )}
                >
                    <span className="text-sm">특별히 시도해본 적 없어요</span>
                </button>
            </div>
        </div>
    );
}

// Icon helper
function MegaphoneIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
    )
}
