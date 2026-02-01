import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGetCoachingAdvice } from "@/hooks/useQueries";

interface Props {
    dogId: string;
    issues: string[];
}

interface CoachingResponse {
    title: string;
    description: string;
    steps: string[];
    advice: string;
}

export const CoachingWidget = ({ dogId, issues }: Props) => {
    const { token } = useAuth();
    const { mutate: getAdvice, isPending } = useGetCoachingAdvice(token);

    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
    const [advice, setAdvice] = useState<CoachingResponse | null>(null);

    const handleGetAdvice = (issue: string) => {
        setSelectedIssue(issue);
        setAdvice(null);

        getAdvice({ dogId, issue }, {
            onSuccess: (data: any) => {
                setAdvice(data);
            },
            onError: () => {
                alert("코칭 생성 실패");
            }
        });
    };

    if (issues.length === 0) return null;

    return (
        <div className="px-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">맞춤 코칭 (AI Coach)</h3>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {issues.map(issue => (
                    <button
                        key={issue}
                        onClick={() => handleGetAdvice(issue)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold border transition-colors
                            ${selectedIssue === issue
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-600 border-gray-200"}`}
                    >
                        {issue} 해결하기 ✨
                    </button>
                ))}
            </div>

            {isPending && (
                <div className="mt-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            )}

            {advice && !isPending && (
                <div className="mt-4 p-6 bg-indigo-50 rounded-xl border border-indigo-100 relative">
                    <button
                        onClick={() => setAdvice(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                    <h4 className="text-lg font-bold text-indigo-900 mb-2">{advice.title}</h4>
                    <p className="text-sm text-indigo-800 mb-4">{advice.description}</p>

                    <div className="space-y-2 mb-4">
                        {advice.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-2 text-sm text-gray-700 bg-white p-2 rounded-lg">
                                <span className="font-bold text-indigo-500">{idx + 1}.</span>
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>

                    {advice.advice && (
                        <div className="text-xs text-indigo-600 bg-indigo-100 p-3 rounded-lg font-medium">
                            💡 Tip: {advice.advice}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
