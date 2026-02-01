import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiClient } from "@/lib/api";
import { RecentLog } from "./types";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateLog } from "@/hooks/useQueries";

interface Props {
    log: RecentLog | null;
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
    envTriggers: string[];
    envConsequences: string[];
}

// Simple Chip Component
const TagChip = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ring-1 ring-inset ${selected
            ? "bg-brand-lime text-gray-900 ring-brand-lime shadow-sm"
            : "bg-white text-gray-500 ring-gray-200 hover:bg-gray-50"
            }`}
    >
        {label}
    </button>
);

export const EditLogDialog = ({ log, open, onClose, onUpdate, envTriggers, envConsequences }: Props) => {
    const { token } = useAuth();
    const { mutate: updateLog, isPending } = useUpdateLog(token);

    const [intensity, setIntensity] = useState<number>(5);
    const [antecedent, setAntecedent] = useState<string>("");
    const [consequence, setConsequence] = useState<string>("");

    // Initialize state when log changes
    useEffect(() => {
        if (log) {
            setIntensity(log.intensity || 5);
            setAntecedent(log.antecedent || "");
            setConsequence(log.consequence || "");
        }
    }, [log]);

    if (!open || !log) return null;

    const handleSave = () => {
        if (!token) return;

        updateLog({
            logId: log.id,
            data: {
                intensity,
                antecedent,
                consequence
            }
        }, {
            onSuccess: () => {
                onUpdate();
                onClose();
            },
            onError: (error) => {
                alert("수정 실패: " + error.message);
            }
        });
    };

    // Mapping isPending to isSaving for UI compatibility
    const isSaving = isPending;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-gray-900 mb-2">기록 상세 추가 📝</h3>
                <p className="text-sm text-gray-500 mb-6">
                    {new Date(log.occurred_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}에 기록된
                    <span className="text-brand-lime font-bold mx-1">{log.behavior}</span>
                    상황을 구체화합니다.
                </p>

                <div className="space-y-6 mb-8 overflow-y-auto max-h-[60vh] pr-1 scrollbar-hide">
                    {/* Antecedent Section */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">원인 / 상황 (A)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {envTriggers.map((tag) => (
                                <TagChip
                                    key={tag}
                                    label={tag}
                                    selected={antecedent === tag}
                                    onClick={() => setAntecedent(tag === antecedent ? "" : tag)}
                                />
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="직접 입력 (예: 초인종 소리)"
                            value={antecedent}
                            onChange={(e) => setAntecedent(e.target.value)}
                            className="w-full text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime/50"
                        />
                    </div>

                    {/* Behavior Section (Read-only/Refinable) */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <label className="block text-sm font-bold text-gray-700 mb-2">행동 (B)</label>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">{log.behavior}</span>
                            <span className="text-xs text-brand-lime bg-gray-900 px-2 py-1 rounded-md font-bold">강도 {intensity}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-lime mt-3"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                            <span>1 (미약함)</span>
                            <span>10 (매우 심각)</span>
                        </div>
                    </div>

                    {/* Consequence Section */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">나의 대처 (C)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {envConsequences.map((tag) => (
                                <TagChip
                                    key={tag}
                                    label={tag}
                                    selected={consequence === tag}
                                    onClick={() => setConsequence(tag === consequence ? "" : tag)}
                                />
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="직접 입력 (예: 간식 주기)"
                            value={consequence}
                            onChange={(e) => setConsequence(e.target.value)}
                            className="w-full text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime/50"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        다음에
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
                    >
                        {isSaving ? "저장..." : "저장완료"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
