import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KakaoSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    currentStep?: number;
}

export function KakaoSyncModal({ isOpen, onClose, onConfirm }: KakaoSyncModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px] z-[101]"
                    >
                        <div className="bg-white rounded-[24px] p-6 text-center shadow-xl relative overflow-hidden">
                            {/* Decorative top gradient/light */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-50" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Icon/Illustration Area */}
                            <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                                💾
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight break-keep">
                                기록이 날아가지 않게<br />
                                저장해둘까요?
                            </h3>

                            <p className="text-sm text-gray-500 mb-6 leading-relaxed break-keep">
                                지금까지 입력한 <span className="text-green-600 font-medium">정보</span>를<br />
                                안전하게 저장하고 이어서 진행하세요.
                            </p>

                            {/* Primary Action - Kakao */}
                            <button
                                onClick={onConfirm}
                                className="w-full bg-[#FEE500] hover:bg-[#FDD835] active:scale-[0.98] transition-all text-[#3C1E1E] font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 mb-3 shadow-sm"
                            >
                                <MessageCircle className="w-5 h-5 fill-[#3C1E1E]" />
                                <span>카카오로 3초 만에 저장하기</span>
                            </button>

                            {/* Secondary Action */}
                            <button
                                onClick={onClose}
                                className="text-xs text-gray-400 hover:text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors p-2"
                            >
                                그냥 계속 진행할게요
                            </button>

                            {/* Bottom Toggle Visual (Optional/Mock) */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-left">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">임시 저장 알림</p>
                                    <p className="text-[10px] text-gray-400">매 단계마다 안전하게 저장해 드릴게요!</p>
                                </div>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
