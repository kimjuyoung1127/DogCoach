"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Bell, UserX, DoorOpen, Hand, Box, Monitor } from "lucide-react";
import { SelectableCard } from "@/components/ui/SelectableCard";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step5Triggers({ data, updateData }: Props) {
    const triggers = [
        { id: 'doorbell', label: '초인종 / 노크 소리', icon: <Bell className="w-5 h-5" /> },
        { id: 'stranger', label: '낯선 사람 방문', icon: <DoorOpen className="w-5 h-5" /> },
        { id: 'separation', label: '보호자 외출 시', icon: <UserX className="w-5 h-5" /> },
        { id: 'touch', label: '특정 신체 터치', icon: <Hand className="w-5 h-5" /> },
        { id: 'delivery', label: '택배/오토바이 소리', icon: <Box className="w-5 h-5" /> },
        { id: 'screen', label: 'TV/화면 속 동물', icon: <Monitor className="w-5 h-5" /> },
    ];

    const toggleTrigger = (id: string) => {
        const current = data.triggers;
        if (current.includes(id)) {
            updateData({ triggers: current.filter(t => t !== id) });
        } else {
            updateData({ triggers: [...current, id] });
        }
    };



    // ...

    // ...

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">언제 주로 반응하나요?</h2>
                <p className="text-gray-500 w-full break-keep">행동의 원인(Antecedent)을 파악하면 정확한 솔루션을 찾을 수 있어요.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {triggers.map((item) => (
                    <SelectableCard
                        key={item.id}
                        selected={data.triggers.includes(item.id)}
                        onClick={() => toggleTrigger(item.id)}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </div>
        </div>
    );
}
