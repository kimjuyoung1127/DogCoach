import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGetCoachingAdvice } from "@/hooks/useQueries";
import { Sparkles, Lightbulb, CheckCircle2, X } from "lucide-react";
import { ScaleButton } from "@/components/ui/animations/ScaleButton";
import { cn } from "@/lib/utils";

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
        <div className="px-6 mb-10 mt-2">
            <div className="flex items-center gap-2 mb-4 px-1">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300" />
                <h3 className="text-xl font-black text-gray-900">맞춤 코칭 <span className="text-gray-400 text-sm font-bold">(AI Coach)</span></h3>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide">
                {issues.map(issue => (
                    <ScaleButton
                        key={issue}
                        onClick={() => handleGetAdvice(issue)}
                        className={cn(
                            "px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black transition-all border shadow-sm",
                            selectedIssue === issue
                                ? "bg-gray-900 text-brand-lime border-gray-900 shadow-lg"
                                : "bg-white text-gray-500 border-gray-100 hover:border-brand-lime/30"
                        )}
                    >
                        {issue} 해결하기 ✨
                    </ScaleButton>
                ))}
            </div>

            {isPending && (
                <div className="mt-2 p-8 bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50 animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full mb-4" />
                    <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                </div>
            )}

            {advice && !isPending && (
                <div className="mt-2 p-8 bg-gradient-to-br from-brand-lime/10 to-brand-lime/5 rounded-[2.5rem] border border-brand-lime/20 relative shadow-xl shadow-brand-lime/5 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-110 transition-transform" />

                    <button
                        onClick={() => setAdvice(null)}
                        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-lime text-white flex items-center justify-center shadow-lg shadow-brand-lime/30">
                            <Lightbulb className="w-5 h-5 fill-white/20" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900">{advice.title}</h4>
                    </div>

                    <p className="text-sm text-gray-600 font-medium mb-6 leading-relaxed break-keep">{advice.description}</p>

                    <div className="space-y-3 mb-6">
                        {advice.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white group/step hover:bg-white transition-all shadow-sm">
                                <div className="w-6 h-6 rounded-full bg-brand-lime/10 text-brand-lime flex items-center justify-center shrink-0 group-hover/step:bg-brand-lime group-hover/step:text-white transition-colors">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-gray-800 leading-snug">{step}</span>
                            </div>
                        ))}
                    </div>

                    {advice.advice && (
                        <div className="bg-gray-900 text-brand-lime p-5 rounded-[1.5rem] flex gap-3 shadow-xl">
                            <Sparkles className="w-5 h-5 shrink-0" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">AI Expert Tip</div>
                                <p className="text-xs font-bold leading-relaxed">{advice.advice}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
