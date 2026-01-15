import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ActionPlanCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6"
        >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">AI 맞춤형<br /> 오늘의 시도</h3>
                </div>

                <div className="mb-4">
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md mb-2 inline-block">SOLUTION</span>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 break-keep">현관 앞 가림막 설치하기</h4>
                    <p className="text-sm text-gray-500 break-keep">
                        Bella가 소리의 근원을 시각적으로 확인하지 못하게 하는 것만으로도 불안도를 <span className="text-green-600 font-bold">30%</span> 낮출 수 있습니다.
                    </p>
                </div>

                <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1 group">
                    가림막 설치 가이드 보기
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
