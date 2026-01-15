"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Building2, Home, Users } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step2Environment({ data, updateData }: Props) {
    const handleFamilyToggle = (member: string) => {
        const current = data.familyMembers;
        if (current.includes(member)) {
            updateData({ familyMembers: current.filter(m => m !== member) });
        } else {
            updateData({ familyMembers: [...current, member] });
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">어떤 환경에서 지내나요?</h2>
                <p className="text-gray-500">주거 형태와 가족 구성원은 행동 교정의 중요한 요소입니다.</p>
            </div>

            {/* Household Type */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">주거 형태</label>
                <div className="grid grid-cols-2 gap-4">
                    <SelectCard
                        icon={<Building2 className="w-8 h-8 mb-2" />}
                        label="아파트 / 빌라"
                        selected={data.householdType === 'APARTMENT'}
                        onClick={() => updateData({ householdType: 'APARTMENT' })}
                    />
                    <SelectCard
                        icon={<Home className="w-8 h-8 mb-2" />}
                        label="주택 / 마당 있음"
                        selected={data.householdType === 'HOUSE'}
                        onClick={() => updateData({ householdType: 'HOUSE' })}
                    />
                </div>
            </div>

            {/* Family Members */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">함께 사는 가족 (중복 선택)</label>
                <div className="grid grid-cols-2 gap-3">
                    {['1인 가구', '부부/커플', '자녀 있음', '다른 반려동물'].map((member) => (
                        <button
                            key={member}
                            onClick={() => handleFamilyToggle(member)}
                            className={cn(
                                "p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                                data.familyMembers.includes(member)
                                    ? "border-brand-lime bg-green-50 text-brand-lime font-bold"
                                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                            )}
                        >
                            <Users className="w-5 h-5 opacity-50" />
                            <span className="text-sm">{member}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Primary Carer (New) */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">주 양육자가 누구인가요? (AI 말투 설정용)</label>
                <div className="grid grid-cols-3 gap-3">
                    {['본인', '어머니', '아버지', '배우자', '자녀'].map((carer) => (
                        <button
                            key={carer}
                            onClick={() => updateData({ primaryCarer: carer })}
                            className={cn(
                                "p-3 rounded-xl border text-center transition-all",
                                data.primaryCarer === carer
                                    ? "border-brand-lime bg-brand-lime text-white font-bold shadow-md"
                                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                            )}
                        >
                            {carer}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SelectCard({ icon, label, selected, onClick }: { icon: React.ReactNode, label: string, selected: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all h-32",
                selected
                    ? "border-brand-lime bg-green-50 text-brand-lime"
                    : "border-gray-100 bg-white hover:border-gray-300 text-gray-400"
            )}
        >
            {icon}
            <span className={cn("font-bold text-sm", selected ? "text-brand-dark" : "text-gray-600")}>{label}</span>
        </button>
    );
}
