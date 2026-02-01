import { motion } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";
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
        <section className="text-center px-6 py-6 pb-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-6"
            >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI 정밀 분석 완료 (신뢰도 {score}%)</span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative mx-auto w-32 h-32 mb-6"
            >
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-pulse" />
                <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center text-4xl">
                    {profileImage ? (
                        <img src={profileImage} alt={dogName} className="w-full h-full object-cover" />
                    ) : (
                        "🐶"
                    )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-white">
                        {score}%
                    </div>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 mb-3 break-keep leading-tight"
            >
                {dogName}는 지금<br />
                <span className="text-green-600">'{issueTitle}'</span> 상태예요
            </motion.h1>

            {/* Radar Chart Visual */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="my-6"
            >
                <AnalysisRadarChart />
            </motion.div>

            {/* Context Snapshot - Optional or Generic for now */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-xl p-3 mb-4 mx-auto max-w-sm text-left flex items-start gap-2 relative"
            >
                <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 break-keep">
                    <strong>분석 맥락:</strong> 보호자님의 설문 답변을 바탕으로 환경적 요인과 기질을 종합적으로 분석했습니다.
                </p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto break-keep"
            >
                {issueDescription}
            </motion.p>
        </section >
    );
}
