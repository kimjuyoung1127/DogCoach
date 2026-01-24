import { useState } from "react";
import { apiClient } from "@/lib/api";
import { Toast } from "@/components/ui/Toast";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { useAuth } from "@/hooks/useAuth";

interface Props {
    dogId: string;
    onLogCreated: () => void;
}

export const QuickLogWidget = ({ dogId, onLogCreated }: Props) => {
    const { token } = useAuth();
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" as any });

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ visible: true, message, type });
        // Auto-hide handled by Toast component, but we can reset state here if needed
    };

    const handleQuickLog = async (behavior: string, label: string) => {
        if (!token) {
            showToast("로그인이 필요합니다.", "error");
            return;
        }

        try {
            const payload = {
                dog_id: dogId,
                behavior: behavior,
                intensity: 3, // Default intensity
                is_quick_log: true,
                occurred_at: new Date().toISOString()
            };

            await apiClient.post('/logs', payload, { token }); // Pass token
            showToast(`${label} 기록 완료!`, "success");
            onLogCreated();
        } catch (e: any) {
            console.error("Quick Log Failed", e);
            showToast("기록 실패: " + (e.message || e), "error");
        }
    };

    const actions = [
        { label: "짖음", val: "Barking", icon: "🔊", color: "red" },
        { label: "입질", val: "Biting", icon: "🦷", color: "orange" },
        { label: "배변실수", val: "Toileting", icon: "💧", color: "yellow" },
        { label: "분리불안", val: "Anxiety", icon: "🏠", color: "purple" },
        { label: "흥분", val: "Excitement", icon: "⚡", color: "blue" },
        { label: "기타", val: "Other", icon: "📝", color: "gray" },
    ];

    return (
        <FadeIn delay={0.2} className="px-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">빠른 기록</h3>
                <span className="text-xs text-gray-400">터치하여 즉시 기록</span>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-3 gap-3">
                {actions.map((action) => (
                    <QuickLogButton
                        key={action.val}
                        label={action.label}
                        icon={action.icon}
                        onClick={() => handleQuickLog(action.val, action.label)}
                        color={action.color}
                    />
                ))}
            </div>

            <Toast
                message={toast.message}
                isVisible={toast.visible}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, visible: false }))}
            />
        </FadeIn>
    );
}

const QuickLogButton = ({ label, icon, onClick, color }: any) => {
    const colorMap: any = {
        red: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100",
        yellow: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100",
        gray: "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100",
    };

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${colorMap[color]} active:scale-95 transition-all shadow-sm hover:shadow-md h-24`}
        >
            <span className="text-2xl mb-1 filter drop-shadow-sm">{icon}</span>
            <span className="font-bold text-sm">{label}</span>
        </button>
    )
}
