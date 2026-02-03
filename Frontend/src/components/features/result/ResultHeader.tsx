import { motion } from "framer-motion";
import { ShieldCheck, Info, Sparkles, Brain } from "lucide-react";
import { AnalysisRadarChart } from "./AnalysisRadarChart";

interface ResultHeaderProps {
    dogName: string;
    profileImage: string | null;
    issueTitle: string;
    issueDescription: string;
    score: number;
}

export function ResultHeader({ dogName, profileImage, issueTitle, issueDescription, score }: ResultHeaderProps) {
    return (
        <section className="text-center px-6 py-12 pb-6 font-outfit">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-lime/10 text-brand-lime rounded-full text-[10px] font-black tracking-widest uppercase mb-8 shadow-sm border border-brand-lime/20"
            >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI 정밀 분석 완료 • 신뢰도 {score}%</span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative mx-auto w-40 h-40 mb-10"
            >
                {/* Profile Glow */}
                <div className="absolute inset-x-0 bottom-0 top-0 bg-brand-lime/20 rounded-full blur-3xl animate-pulse" />

                <div className="relative w-full h-full rounded-[3rem] border-4 border-white shadow-2xl overflow-hidden bg-gray-50 flex items-center justify-center text-5xl">
                    {profileImage ? (
                        <img src={profileImage} alt={dogName} className="w-full h-full object-cover" />
                    ) : (
                        "🐶"
                    )}
                </div>

                {/* Score Tag */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-3 -right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-1.5"
                >
                    <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                    <span className="text-sm font-black text-gray-900 tracking-tight">{score}%</span>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 break-keep leading-tight tracking-tight">
                    {dogName}는 지금<br />
                    <span className="text-brand-lime">'{issueTitle}'</span> 상태예요
                </h1>

                <p className="text-gray-500 text-sm md:text-md leading-relaxed max-w-sm mx-auto break-keep font-medium opacity-80">
                    {issueDescription}
                </p>
            </motion.div>

            {/* Radar Chart Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-10 relative"
            >
                {/* Background flourish for chart */}
                <div className="absolute inset-0 bg-brand-lime/5 rounded-full blur-3xl -z-10 scale-75" />
                <AnalysisRadarChart />
            </motion.div>

            {/* Context Snapshot - Premium Glass Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/60 backdrop-blur-xl border border-white rounded-3xl p-5 mb-10 mx-auto max-w-sm text-left flex items-start gap-3 shadow-xl shadow-gray-200/50"
            >
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-brand-lime/10 flex items-center justify-center text-brand-lime mt-0.5">
                    <Brain className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-black text-gray-900 text-xs mb-1 uppercase tracking-widest opacity-50">Analysis Context</h4>
                    <p className="text-xs text-gray-600 break-keep font-medium leading-relaxed">
                        보호자님의 <strong>설문 답변</strong>을 바탕으로 유전적 기질과 환경적 요인을 교차 분석한 결과입니다.
                    </p>
                </div>
            </motion.div>
        </section >
    );
}
