import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animations/AnimatedCounter";

interface SurveyLoadingProps {
    dogName: string;
}

export function SurveyLoading({ dogName }: SurveyLoadingProps) {
    return (
        <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center p-6 text-center">
            {/* Header Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center"
            >
                <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold tracking-wide mb-4">
                    데이터 분석 중
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight break-keep">
                    <span className="text-green-500">{dogName}</span>의 행동 패턴을<br /> 정밀 분석하고 있어요...
                </h2>
                <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto break-keep">
                    입력하신 정보를 바탕으로 ABC(선행사건-행동-결과) 모델을 생성하고 있습니다.
                </p>
            </motion.div>

            {/* Lottie Animation Placeholder */}
            {/* 
                TODO: Replace this div with your Lottie player component.
                Example: <Lottie animationData={animationData} loop={true} />
            */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-[400px] aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center mb-10 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 translate-x-[-200%] animate-[shimmer_2s_infinite]" />
                <p className="text-gray-400 font-medium z-10 text-sm">로티 애니메이션 영역</p>
                <p className="text-gray-300 text-xs mt-1 z-10">(ABC 분석 시각화)</p>
            </motion.div>

            {/* Progress Bar (Mock) */}
            <div className="w-full max-w-md mb-12">
                <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                    <span>행동 빈도 분석 중...</span>
                    <span className="text-brand-lime font-bold">
                        <AnimatedCounter value={78} suffix="%" duration={2} />
                    </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    />
                </div>
            </div>

            {/* Tip Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-lg bg-gray-50 rounded-2xl p-5 flex items-start gap-4 text-left border border-gray-100"
            >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">알고 계셨나요?</h4>
                    <p className="text-xs text-gray-600 leading-relaxed break-keep">
                        직접적인 교정보다 환경 변화가 더 효과적일 때가 많아요.
                        테일로그는 행동이 시작되기 전 '선행 사건(Antecedent)'을 변화시키는 데 집중합니다.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
