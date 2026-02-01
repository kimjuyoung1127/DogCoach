"use client";

import { SurveyData } from "./types";
import { cn } from "@/lib/utils";
import { Activity, Bone, HeartPulse, Apple, MoreHorizontal, X, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    data: SurveyData;
    updateData: (newData: Partial<SurveyData>) => void;
}

export function Step3Health({ data, updateData }: Props) {
    const [activeModal, setActiveModal] = useState<"health" | "treat" | null>(null);
    const [tempInput, setTempInput] = useState("");

    const healthOptions = [
        { id: 'allergy', label: '알레르기 있음', icon: <Activity className="w-5 h-5" /> },
        { id: 'joint', label: '관절/슬개골 약함', icon: <Bone className="w-5 h-5" /> },
        { id: 'digestive', label: '소화기 예민', icon: <HeartPulse className="w-5 h-5" /> },
        { id: 'obesity', label: '비만/체중 관리', icon: <Apple className="w-5 h-5" /> },
        { id: 'etc', label: '기타 건강 상황', icon: <MoreHorizontal className="w-5 h-5" /> },
    ];

    const treatOptions = [
        { id: 'meat', label: '육류 간식', emoji: '🍖' },
        { id: 'vegetable', label: '채소/과일', emoji: '🥕' },
        { id: 'gum', label: '개껌/오래먹는 것', emoji: '🦴' },
        { id: 'toy', label: '장난감 보상', emoji: '🧸' },
        { id: 'etc', label: '기타 보상', emoji: '✨' },
    ];

    const toggleHealth = (id: string) => {
        if (id === 'etc') {
            setTempInput(data.healthIssuesOther || "");
            setActiveModal("health");
            return;
        }

        const current = data.healthIssues;
        if (current.includes(id)) {
            updateData({ healthIssues: current.filter(h => h !== id) });
        } else {
            updateData({ healthIssues: [...current, id] });
        }
    };

    const toggleTreat = (id: string) => {
        if (id === 'etc') {
            setTempInput(data.favoriteTreatsOther || "");
            setActiveModal("treat");
            return;
        }

        const current = data.favoriteTreats;
        if (current.includes(id)) {
            updateData({ favoriteTreats: current.filter(t => t !== id) });
        } else {
            updateData({ favoriteTreats: [...current, id] });
        }
    };

    const handleSaveOther = () => {
        if (activeModal === "health") {
            const current = data.healthIssues;
            if (tempInput.trim()) {
                updateData({
                    healthIssues: current.includes('etc') ? current : [...current, 'etc'],
                    healthIssuesOther: tempInput.trim()
                });
            } else {
                updateData({
                    healthIssues: current.filter(h => h !== 'etc'),
                    healthIssuesOther: ""
                });
            }
        } else if (activeModal === "treat") {
            const current = data.favoriteTreats;
            if (tempInput.trim()) {
                updateData({
                    favoriteTreats: current.includes('etc') ? current : [...current, 'etc'],
                    favoriteTreatsOther: tempInput.trim()
                });
            } else {
                updateData({
                    favoriteTreats: current.filter(t => t !== 'etc'),
                    favoriteTreatsOther: ""
                });
            }
        }
        setActiveModal(null);
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">건강 상태와 선호도</h2>
                <p className="text-gray-500 font-medium whitespace-nowrap">알맞은 보상과 솔루션을 위해 꼭 필요해요.</p>
            </div>

            {/* Health Issues */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">주의해야 할 건강 문제가 있나요?</label>
                <div className="grid grid-cols-2 gap-3">
                    {healthOptions.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleHealth(item.id)}
                            className={cn(
                                "p-4 rounded-2xl border text-left transition-all flex items-center gap-3 group relative overflow-hidden",
                                data.healthIssues.includes(item.id)
                                    ? "border-brand-lime bg-brand-lime/5 text-brand-dark font-bold ring-1 ring-brand-lime shadow-sm"
                                    : "border-gray-100 bg-white hover:bg-gray-50 text-gray-400"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all",
                                data.healthIssues.includes(item.id) ? "bg-brand-lime text-white" : "bg-gray-50 text-gray-400 group-hover:scale-110"
                            )}>
                                {item.icon}
                            </div>
                            <span className={cn(
                                "text-xs md:text-sm truncate",
                                data.healthIssues.includes(item.id) ? "text-gray-900" : "text-gray-500"
                            )}>
                                {item.id === 'etc' && data.healthIssuesOther ? data.healthIssuesOther : item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Favorite Treats */}
            <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">가장 좋아하는 보상은 무엇인가요?</label>
                <div className="grid grid-cols-5 gap-2">
                    {treatOptions.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleTreat(item.id)}
                            className={cn(
                                "py-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 group",
                                data.favoriteTreats.includes(item.id)
                                    ? "border-brand-lime bg-brand-lime/10 text-brand-dark shadow-sm ring-1 ring-brand-lime"
                                    : "border-gray-100 bg-white hover:bg-gray-50 text-gray-400"
                            )}
                        >
                            <span className={cn("text-2xl transition-transform group-hover:scale-125", data.favoriteTreats.includes(item.id) ? "scale-110" : "")}>{item.emoji}</span>
                            <span className={cn(
                                "text-[10px] font-bold truncate px-1",
                                data.favoriteTreats.includes(item.id) ? "text-gray-900" : "text-gray-500"
                            )}>
                                {item.id === 'etc' && data.favoriteTreatsOther ? data.favoriteTreatsOther : item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Premium Other Modal */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden relative shadow-2xl border border-gray-100 z-10"
                        >
                            <div className="p-8 pb-4 text-center">
                                <h3 className="text-xl font-black text-gray-900 mb-2">
                                    {activeModal === "health" ? "기타 건강 상황" : "기타 보상"} 입력
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {activeModal === "health"
                                        ? "목록에 없는 특별한 건강 주의사항이 있나요?"
                                        : "아이를 기쁘게 하는 특별한 보상이 있나요?"}
                                </p>
                            </div>

                            <div className="px-8 py-4">
                                <div className="relative group">
                                    <textarea
                                        value={tempInput}
                                        onChange={(e) => setTempInput(e.target.value)}
                                        placeholder={activeModal === "health" ? "예: 심장 사상충 치료 중, 특정 성분 알러지 등" : "예: 얼음 조각, 노즈워크 매트, 특정 장난감"}
                                        className="w-full h-32 p-5 rounded-2xl bg-gray-50 border-transparent focus:border-brand-lime focus:bg-white focus:ring-4 focus:ring-brand-lime/10 outline-none transition-all text-sm resize-none font-medium"
                                        autoFocus
                                    />
                                    {tempInput && (
                                        <button
                                            onClick={() => setTempInput('')}
                                            className="absolute right-3 top-3 p-1.5 rounded-full bg-gray-200/50 text-gray-500 hover:bg-gray-200 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 pt-4 flex gap-3">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="flex-1 py-4 px-6 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold transition-all text-sm"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSaveOther}
                                    className="flex-[2] py-4 px-6 rounded-2xl bg-gray-900 hover:bg-black text-brand-lime font-black shadow-lg shadow-gray-200 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    저장하기
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
