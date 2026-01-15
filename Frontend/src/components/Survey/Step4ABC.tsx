"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Bell, UserX, DoorOpen, Hand } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step4ABC({ data, updateData }: Props) {
    const triggers = [
        { id: 'doorbell', label: '초인종 / 노크 소리', icon: <Bell className="w-5 h-5" /> },
        { id: 'separation', label: '보호자가 외출할 때', icon: <UserX className="w-5 h-5" /> },
        { id: 'stranger', label: '낯선 사람 방문 시', icon: <DoorOpen className="w-5 h-5" /> },
        { id: 'touch', label: '특정 부위를 만질 때', icon: <Hand className="w-5 h-5" /> },
    ];

    const toggleTrigger = (id: string) => {
        const current = data.antecedents;
        if (current.includes(id)) {
            updateData({ antecedents: current.filter(a => a !== id) });
        } else {
            updateData({ antecedents: [...current, id] });
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">언제 주로 발생하나요?</h2>
                <p className="text-gray-500">행동이 발생하는 상황(Antecedent)을 파악하면 원인을 알 수 있어요.</p>
            </div>

            <div className="space-y-3">
                {triggers.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleTrigger(item.id)}
                        className={cn(
                            "w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4",
                            data.antecedents.includes(item.id)
                                ? "border-brand-lime bg-green-50 text-brand-dark shadow-sm"
                                : "border-gray-100 bg-white hover:bg-gray-50 text-gray-600"
                        )}
                    >
                        <div className={cn(
                            "p-2 rounded-lg",
                            data.antecedents.includes(item.id) ? "bg-brand-lime text-white" : "bg-gray-100 text-gray-400"
                        )}>
                            {item.icon}
                        </div>
                        <span className="font-bold flex-1">{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="pt-4">
                <label className="text-sm font-bold text-gray-700 mb-2 block">기타 상황 (직접 입력)</label>
                <input
                    type="text"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all placeholder-gray-300"
                    placeholder="예: 천둥 번개가 칠 때"
                    // Simple handler for demo, ideally add to 'antecedents' custom list
                    onChange={(e) => { /* Handle custom input if needed */ }}
                />
            </div>
        </div>
    );
}
