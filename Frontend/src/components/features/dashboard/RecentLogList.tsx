import { RecentLog } from "./types";
import { Clock, ChevronRight, History } from "lucide-react";

interface Props {
    logs: RecentLog[];
    onLogUpdated: () => void;
    onEditLog: (log: RecentLog) => void;
}

export const RecentLogList = ({ logs, onLogUpdated, onEditLog }: Props) => {
    // Simple icon mapper
    const getIcon = (behavior: string) => {
        if (behavior.includes("Barking") || behavior === "짖음") return "🔊";
        if (behavior.includes("Biting") || behavior === "입질") return "🦷";
        if (behavior.includes("Toileting") || behavior === "배변") return "💧";
        if (behavior.includes("Anxiety") || behavior === "분리불안") return "🏠";
        if (behavior.includes("Excitement") || behavior === "흥분") return "⚡";
        return "📝";
    };

    const getLabel = (behavior: string) => {
        const map: any = {
            "Barking": "짖음",
            "Biting": "입질",
            "Toileting": "배변실수",
            "Anxiety": "분리불안",
            "Excitement": "흥분"
        };
        return map[behavior] || behavior;
    }

    return (
        <div className="px-6 pb-24">
            <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-400" />
                    <h3 className="text-xl font-black text-gray-900">최근 기록</h3>
                </div>
                {logs.length > 0 && (
                    <span className="text-[10px] font-black text-brand-lime uppercase tracking-widest bg-brand-lime/10 px-2 py-0.5 rounded-full">
                        {logs.length}개 기록됨
                    </span>
                )}
            </div>

            <div className="space-y-4">
                {logs.map((log) => (
                    <button
                        key={log.id}
                        onClick={() => onEditLog(log)}
                        className="w-full bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:border-brand-lime/30 transition-all active:scale-[0.98] text-left group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-brand-lime/10 transition-colors">
                                {getIcon(log.behavior)}
                            </div>
                            <div>
                                <div className="font-black text-gray-900 text-base mb-0.5">{getLabel(log.behavior)}</div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                        <Clock className="w-3 h-3" />
                                        {new Date(log.occurred_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <div className="text-[10px] font-black text-brand-lime uppercase tracking-widest bg-brand-lime/5 px-2 py-0.5 rounded-full ring-1 ring-brand-lime/10">
                                        강도 {log.intensity}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-brand-lime transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </button>
                ))}
                {logs.length === 0 && (
                    <div className="text-center text-gray-400 py-12 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 shadow-inner">
                        <p className="font-black text-gray-300">로그 데이터가 아직 없네요</p>
                        <p className="text-[10px] mt-2 font-bold uppercase tracking-widest text-gray-400">첫 기록을 남겨보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
