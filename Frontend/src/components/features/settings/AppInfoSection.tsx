import { motion } from 'framer-motion';
import { DownloadCloud, Shield, HelpCircle, FileText } from 'lucide-react';

export function AppInfoSection() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-1">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">앱 정보</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-10 rounded-[3rem] border border-white/60 shadow-sm ring-1 ring-black/5 text-center relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime via-emerald-400 to-brand-lime" />

                <div className="space-y-6 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/80 shadow-inner flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <span className="text-3xl">🐕</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">DogCoach Academy</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Version 2.4.0 (Premium)</p>
                    </div>

                    <button className="w-full bg-gray-900 text-white p-5 rounded-3xl font-black text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-black hover:shadow-xl hover:shadow-black/20 group/btn">
                        <DownloadCloud className="w-4 h-4 text-brand-lime" />
                        홈 화면에 바로가기 설치
                    </button>

                    <div className="pt-4 border-t border-gray-100/50">
                        <div className="flex justify-center gap-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                            <a href="#" className="hover:text-brand-lime transition-colors flex items-center gap-1.5">
                                <FileText className="w-3 h-3" />
                                약관
                            </a>
                            <a href="#" className="hover:text-brand-lime transition-colors flex items-center gap-1.5">
                                <Shield className="w-3 h-3" />
                                개인정보
                            </a>
                            <a href="#" className="hover:text-brand-lime transition-colors flex items-center gap-1.5">
                                <HelpCircle className="w-3 h-3" />
                                문의
                            </a>
                        </div>
                    </div>

                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                        © 2024 DogCoach Inc. Professional Coaching Platform.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
