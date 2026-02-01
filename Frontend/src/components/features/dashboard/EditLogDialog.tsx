import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiClient } from "@/lib/api";
import { RecentLog } from "./types";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateLog } from "@/hooks/useQueries";
import { Check, X, Info, Sparkles } from "lucide-react";

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
        className={`px-4 py-2 rounded-2xl text-[11px] font-black transition-all ring-1 ring-inset uppercase tracking-widest ${selected
            ? "bg-gray-900 text-brand-lime ring-gray-900 shadow-lg shadow-gray-200 scale-105"
            : "bg-white text-gray-400 ring-gray-100 hover:ring-brand-lime/30 hover:text-gray-900 hover:bg-gray-50"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-brand-lime" />
                    <h3 className="text-2xl font-black text-gray-900">상세 기록 추가</h3>
                </div>

                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    상세 기록 및 피드백 루프
                </p>

                <div className="space-y-8 mb-10 overflow-y-auto max-h-[55vh] pr-2 scrollbar-hide py-1">
                    {/* Antecedent Section */}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <label className="text-s font-black text-gray-900 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">상황</label>
                            <span className="text-[10px] font-bold text-brand-lime">원인 / 상황</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
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
                            placeholder="상황을 직접 입력해주세요..."
                            value={antecedent}
                            onChange={(e) => setAntecedent(e.target.value)}
                            className="w-full text-sm font-bold px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-lime/50 transition-all shadow-inner"
                        />
                    </div>

                    {/* Behavior Section (Read-only/Refinable) */}
                    <div className="bg-gradient-to-br from-brand-lime/10 to-brand-lime/5 p-6 rounded-[2rem] border border-brand-lime/10 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/40 rounded-full blur-xl" />

                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded">행동 (Behavior)</label>
                            <div className="text-[10px] font-black text-brand-lime uppercase tracking-widest px-2 py-1 bg-gray-900 rounded-lg shadow-sm">
                                강도 {intensity}
                            </div>
                        </div>

                        <div className="text-xl font-black text-gray-900 mb-6 relative z-10 px-1">{log.behavior}</div>

                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full h-1.5 bg-white/50 rounded-lg appearance-none cursor-pointer accent-brand-lime mb-2"
                        />
                        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                            <span>약함</span>
                            <span>심함</span>
                        </div>
                    </div>

                    {/* Consequence Section */}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <label className="text-s font-black text-gray-900 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">대처</label>
                            <span className="text-[10px] font-bold text-brand-lime">나의 대처</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
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
                            placeholder="대처 방법을 기록해주세요..."
                            value={consequence}
                            onChange={(e) => setConsequence(e.target.value)}
                            className="w-full text-sm font-bold px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-lime/50 transition-all shadow-inner"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 py-5 bg-gray-900 text-brand-lime font-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-gray-200 disabled:opacity-50 text-base"
                    >
                        {isSaving ? "저장 중..." : "수정 완료"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
