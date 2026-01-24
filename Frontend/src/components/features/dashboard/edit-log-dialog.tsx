import { useState } from "react";
import { apiClient } from "@/lib/api";
import { RecentLog } from "./types";
import { Toast } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/useAuth";

interface Props {
    log: RecentLog | null;
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export const EditLogDialog = ({ log, open, onClose, onUpdate }: Props) => {
    const { token } = useAuth();
    const [intensity, setIntensity] = useState<number>(log?.intensity || 5);
    const [isSaving, setIsSaving] = useState(false);

    // Reset state when log changes, but do it in useEffect or key update. 
    // Here we use key={log.id} in parent to force re-render, 
    // or simplified: just rely on initial state if component remounts.

    if (!open || !log) return null;

    const handleSave = async () => {
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        setIsSaving(true);
        try {
            await apiClient.patch(`/logs/${log.id}`, {
                intensity: intensity
            }, { token }); // Pass token here
            onUpdate();
            onClose();
        } catch (e) {
            console.error("Failed to update log", e);
            alert("수정 실패"); // Ideally use toast context
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">기록 수정하기 ✏️</h3>
                <p className="text-sm text-gray-500 mb-6">
                    {new Date(log.occurred_at).toLocaleString()}에 기록된
                    <br /><span className="text-brand-lime font-bold">{log.behavior}</span> 행동의 강도를 조절합니다.
                </p>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-600">강도 (Intensity)</span>
                        <span className="text-lg font-bold text-brand-lime bg-gray-900 px-3 py-1 rounded-full">{intensity}</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={intensity}
                        onChange={(e) => setIntensity(Number(e.target.value))}
                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-lime"
                    />
                    <div className="flex justify-between text-xs text-gray-300 mt-2 px-1">
                        <span>1 (약함)</span>
                        <span>10 (심함)</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
                    >
                        {isSaving ? "저장 중..." : "저장하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};
