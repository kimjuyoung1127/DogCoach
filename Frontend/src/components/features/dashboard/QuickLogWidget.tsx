import { useState } from "react";
import { Toast } from "@/components/ui/Toast";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { ScaleButton } from "@/components/ui/animations/ScaleButton";
import { useAuth } from "@/hooks/useAuth";
import { useCreateLog } from "@/hooks/useQueries";
import { Zap, Plus } from "lucide-react";

interface Props {
    dogId: string;
    onLogCreated: (log?: any) => void;
}

export const QuickLogWidget = ({ dogId, onLogCreated }: Props) => {
    const { token } = useAuth();
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" as any });

    // Use Mutation Hook
    const { mutate: createLog } = useCreateLog(dogId, token);

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ visible: true, message, type });
    };

    const handleQuickLog = (behavior: string, label: string) => {
        if (!token) {
            showToast("로그인이 필요합니다.", "error");
            return;
        }

        const payload = {
            behavior: behavior,
            intensity: 3, // Default intensity
            is_quick_log: true,
            occurred_at: new Date().toISOString()
        };

        createLog(payload as any, {
            onSuccess: (newLog) => {
                showToast(`${label} 기록 완료!`, "success");
                onLogCreated(newLog);
            },
            onError: (error: any) => {
                showToast("기록 실패: " + (error.message || "Unknown error"), "error");
            }
        });
    };

    const actions = [
        { label: "짖음", val: "Barking", icon: "🔊", color: "red" },
        { label: "입질", val: "Biting", icon: "🦷", color: "orange" },
        { label: "배변실수", val: "Toileting", icon: "💧", color: "yellow" },
        { label: "분리불안", val: "Anxiety", icon: "🏠", color: "purple" },
        { label: "흥분", val: "Excitement", icon: "⚡", color: "blue" },
        { label: "기타", val: "기타", icon: "📝", color: "gray" },
    ];

    return (
        <FadeIn delay={0.2} className="px-6 mb-10">
            <div className="flex justify-between items-center mb-5 px-1">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-lime fill-brand-lime" />
                    <h3 className="text-xl font-black text-gray-900">빠른 기록</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded-full">
                    <div className="w-1 h-1 bg-brand-lime rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">실시간 트래킹</span>
                </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-3 gap-4">
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
        red: "hover:border-red-200 hover:bg-red-50/30 text-red-500 bg-white shadow-sm ring-red-50",
        orange: "hover:border-orange-200 hover:bg-orange-50/30 text-orange-500 bg-white shadow-sm ring-orange-50",
        yellow: "hover:border-amber-200 hover:bg-amber-50/30 text-amber-500 bg-white shadow-sm ring-amber-50",
        purple: "hover:border-purple-200 hover:bg-purple-50/30 text-purple-500 bg-white shadow-sm ring-purple-50",
        blue: "hover:border-blue-200 hover:bg-blue-50/30 text-blue-500 bg-white shadow-sm ring-blue-50",
        gray: "hover:border-gray-200 hover:bg-gray-50/30 text-gray-500 bg-white shadow-sm ring-gray-50",
    };

    return (
        <ScaleButton
            onClick={onClick}
            scale={0.95}
            className={`group flex flex-col items-center justify-center p-5 rounded-[2rem] border border-gray-100 transition-all h-28 relative overflow-hidden ${colorMap[color]}`}
        >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-20 transition-opacity">
                <Plus className="w-4 h-4" />
            </div>
            <span className="text-3xl mb-2 filter drop-shadow-sm group-hover:scale-110 transition-transform">{icon}</span>
            <span className="font-black text-xs tracking-tight">{label}</span>
        </ScaleButton>
    )
}
