import { motion } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";
import { AnalysisRadarChart } from "./AnalysisRadarChart";

export function ResultHeader() {
    return (
        <section className="text-center px-6 py-6 pb-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-6"
            >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI 정밀 분석 완료 (신뢰도 94%)</span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative mx-auto w-32 h-32 mb-6"
            >
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-pulse" />
                <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center text-4xl">
                    🐶
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-white">
                        94%
                    </div>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 mb-3 break-keep leading-tight"
            >
                Bella는 지금<br />
                <span className="text-green-600">'예민한 문지기'</span> 타입이에요
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

            {/* Context Snapshot */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-xl p-3 mb-4 mx-auto max-w-sm text-left flex items-start gap-2 relative"
            >
                <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 break-keep">
                    <strong>분석 맥락:</strong> 보호자님이 언급하신 <span className="underline decoration-gray-300 underline-offset-2">유기 경험</span>과 <span className="underline decoration-gray-300 underline-offset-2">피부 알러지</span> 이력을 중요 변수로 반영했습니다.
                </p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto break-keep"
            >
                Bella는 외부 소음을 위험으로 인지하고 가족에게 알리려는 책임감이 강한 상태입니다.
                현재 보호자님의 '달래기' 반응이 Bella에게는 '함께 경계하는 것'으로 오해받고 있을 가능성이
                <span className="font-bold text-gray-900"> 78%</span>입니다.
            </motion.p>
        </section >
    );
}
