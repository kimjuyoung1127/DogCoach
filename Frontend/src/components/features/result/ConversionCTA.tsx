import { motion } from "framer-motion";
import { MessageCircle, Download } from "lucide-react";

export function ConversionCTA() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-white via-white to-transparent z-50 flex flex-col items-center"
        >
            <div className="w-full max-w-xl mx-auto space-y-3">
                <button className="w-full bg-[#FEE500] hover:bg-[#FDD835] active:scale-[0.98] text-[#3C1E1E] font-bold py-4 px-6 rounded-2xl shadow-lg shadow-yellow-200/50 flex items-center justify-center gap-2 transition-all">
                    <MessageCircle className="w-6 h-6 fill-[#3C1E1E]" />
                    <span>Bella의 리포트 저장하고 매일 코칭받기</span>
                </button>

                <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">
                        카카오로 1초 만에 시작하면, 내일부터 Bella가 직접 보내는 알림톡을 받을 수 있어요.
                    </p>
                    <button className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                        <Download className="w-3 h-3" />
                        <span>홈 화면에 추가하여 1초 만에 기록하기</span>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
