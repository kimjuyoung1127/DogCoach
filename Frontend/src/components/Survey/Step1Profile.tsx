"use client";

import { DogSex, SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Calendar, Dog } from "lucide-react";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step1Profile({ data, updateData }: Props) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">누구를 위한 교육인가요?</h2>
                <p className="text-gray-500">맞춤형 교육 과정을 위해 반려견의 기본 정보를 알려주세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">이름이 무엇인가요?</label>
                    <input
                        type="text"
                        value={data.dogName}
                        onChange={(e) => updateData({ dogName: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                        placeholder="예: 머루"
                    />
                </div>

                {/* Breed Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">견종을 알려주세요</label>
                    <div className="relative">
                        <Dog className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={data.breed}
                            onChange={(e) => updateData({ breed: e.target.value })}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                            placeholder="견종 검색 또는 입력..."
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Birth Date */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">생년월일</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={data.birthDate}
                            onChange={(e) => updateData({ birthDate: e.target.value })}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all placeholder-gray-400 text-gray-900"
                        />
                    </div>
                </div>

                {/* Adoption Date */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">입양일 (가족이 된 날)</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={data.adoptionDate}
                            onChange={(e) => updateData({ adoptionDate: e.target.value })}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all placeholder-gray-400 text-gray-900"
                        />
                    </div>
                </div>
            </div>

            {/* Weight */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">몸무게 (kg)</label>
                <input
                    type="number"
                    step="0.1"
                    value={data.weight}
                    onChange={(e) => updateData({ weight: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                    placeholder="예: 5.2"
                />
            </div>

            {/* Sex Selection */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">성별은 무엇인가요?</label>
                <div className="grid grid-cols-2 gap-3">
                    <SexButton
                        label="수컷"
                        subLabel="(중성화 안 함)"
                        selected={data.sex === 'MALE'}
                        onClick={() => updateData({ sex: 'MALE' })}
                    />
                    <SexButton
                        label="암컷"
                        subLabel="(중성화 안 함)"
                        selected={data.sex === 'FEMALE'}
                        onClick={() => updateData({ sex: 'FEMALE' })}
                    />
                    <SexButton
                        label="수컷"
                        subLabel="(중성화 완료)"
                        selected={data.sex === 'MALE_NEUTERED'}
                        onClick={() => updateData({ sex: 'MALE_NEUTERED' })}
                    />
                    <SexButton
                        label="암컷"
                        subLabel="(중성화 완료)"
                        selected={data.sex === 'FEMALE_NEUTERED'}
                        onClick={() => updateData({ sex: 'FEMALE_NEUTERED' })}
                    />
                </div>
            </div>
        </div>
    );
}

function SexButton({ label, subLabel, selected, onClick }: { label: string, subLabel: string, selected: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-3 rounded-xl border transition-all text-center",
                selected
                    ? "border-brand-lime bg-brand-lime/5 text-brand-lime font-bold ring-1 ring-brand-lime"
                    : "border-gray-200 hover:border-brand-lime/50 text-gray-600"
            )}
        >
            <div className="text-sm">{label}</div>
            <div className="text-xs text-gray-400 font-normal">{subLabel}</div>
        </button>
    );
}
