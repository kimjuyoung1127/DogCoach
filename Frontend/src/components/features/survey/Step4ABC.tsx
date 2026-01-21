"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Bell, UserX, DoorOpen, Hand } from "lucide-react";
import { SelectableCard } from "@/components/ui/SelectableCard";
import { Input } from "@/components/ui/Input";

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



    // ... (inside component)

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">언제 주로 발생하나요?</h2>
                <p className="text-gray-500">행동이 발생하는 상황(Antecedent)을 파악하면 원인을 알 수 있어요.</p>
            </div>

            <div className="space-y-3">
                {triggers.map((item) => (
                    <SelectableCard
                        key={item.id}
                        selected={data.antecedents.includes(item.id)}
                        onClick={() => toggleTrigger(item.id)}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </div>

            <div className="pt-4">
                <label className="text-sm font-bold text-gray-700 mb-2 block">기타 상황 (직접 입력)</label>
                <Input
                    placeholder="예: 천둥 번개가 칠 때"
                    onChange={(e) => { /* Handle custom input if needed */ }}
                />
            </div>
        </div>
    );
}
