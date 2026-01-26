import { RecentLog } from "./types";

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
        <div className="px-6 pb-20">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-brand-lime">📅</span> 최근 기록
            </h3>
            <div className="space-y-3">
                {logs.map((log) => (
                    <button
                        key={log.id}
                        onClick={() => onEditLog(log)}
                        className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all active:scale-98 text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl">
                                {getIcon(log.behavior)}
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">{getLabel(log.behavior)}</div>
                                <div className="text-xs text-cool-gray-400 font-medium">강도 {log.intensity}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                {new Date(log.occurred_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="text-[10px] text-gray-300">수정 &gt;</span>
                        </div>
                    </button>
                ))}
                {logs.length === 0 && (
                    <div className="text-center text-gray-400 py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p>아직 기록이 없습니다.</p>
                        <p className="text-xs mt-1">첫 기록을 남겨보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
