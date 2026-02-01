import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";

interface ActionPlanCardProps {
    stage: {
        title: string;
        goal: string;
        icon: LucideIcon;
    };
    onStart: () => void;
    isLocked?: boolean;
}

export function ActionPlanCard({ stage, onStart, isLocked = false }: ActionPlanCardProps) {
    const Icon = stage.icon || CheckCircle2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6"
        >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-brand-lime/20 rounded-lg text-brand-lime-darker">
                        <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">AI 맞춤형<br /> 오늘의 시도</h3>
                </div>

                <div className="mb-4">
                    <span className="text-xs font-bold text-brand-lime-darker bg-brand-lime/10 px-2.5 py-1 rounded-md mb-2 inline-block">SOLUTION</span>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 break-keep">
                        {stage.title}
                    </h4>
                    <p className="text-sm text-gray-500 break-keep leading-relaxed">
                        {stage.goal}
                    </p>
                </div>

                <button
                    onClick={onStart}
                    disabled={isLocked}
                    className="w-full py-3.5 bg-gray-900 hover:bg-black text-brand-lime font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                    {isLocked ? "로그인하고 시작하기" : "훈련 시작하기"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
