import { motion } from "framer-motion";
import { AlertCircle, History } from "lucide-react";

export function BarkingHeatmap() {
    // Mock Data: 0-24 hours. Peaks at 10 (10 AM) and 19 (7 PM).
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const getIntensity = (h: number) => {
        if (h === 10) return 92; // 10 AM Peak
        if (h === 19) return 88; // 7 PM Peak
        if (h >= 9 && h <= 11) return 65;
        if (h >= 18 && h <= 20) return 55;
        return 12 + Math.random() * 20;
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pb-10 font-outfit"
        >
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-gray-900 text-brand-lime">
                        <History className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">AI 행동 지도</h3>
                </div>

                <p className="text-sm text-gray-500 break-keep mb-5 font-medium leading-relaxed">
                    Bella의 사회적 스트레스는 <span className="text-brand-orange-darker font-black underline decoration-2 decoration-brand-orange/30 underline-offset-4">오전 10시</span>와 <span className="text-brand-orange-darker font-black underline decoration-2 decoration-brand-orange/30 underline-offset-4">오후 7시</span>에 대형견 평균을 상회합니다.
                </p>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="inline-flex items-center gap-2 bg-brand-orange/5 text-brand-orange-darker text-[11px] px-3 py-1.5 rounded-full border border-brand-orange/10 font-black uppercase tracking-widest"
                >
                    <AlertCircle className="w-3.5 h-3.5" />
                    상위 15% 활동 빈도 감지
                </motion.div>
            </div>

            <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/40 border border-white relative overflow-hidden group">
                {/* Visual Depth */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-3xl -z-10" />

                <div className="flex items-end justify-between h-40 gap-1 md:gap-2 min-w-[280px]">
                    {hours.map((h) => {
                        const intensity = getIntensity(h);
                        const isPeak = intensity > 80;
                        return (
                            <div key={h} className="group relative flex-1 flex flex-col items-center gap-2">
                                {isPeak && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: 1.5 + h * 0.05, type: "spring" }}
                                        className="absolute -top-10 px-2.5 py-1 bg-gray-900 text-brand-lime text-[10px] font-black rounded-xl shadow-xl whitespace-nowrap z-20"
                                    >
                                        PEAK
                                    </motion.div>
                                )}
                                <div className="w-full relative h-full flex flex-col justify-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${intensity}%` }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 80,
                                            damping: 20,
                                            delay: 0.6 + h * 0.03
                                        }}
                                        className={`w-full rounded-full transition-all duration-500 ${isPeak
                                                ? 'bg-gradient-to-t from-brand-orange to-orange-300 shadow-[0_0_15px_rgba(255,165,116,0.3)]'
                                                : 'bg-gradient-to-t from-brand-lime/40 to-brand-lime/10'
                                            }`}
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                </div>
                                <span className={`text-[9px] font-black tracking-tighter ${h % 4 === 0 ? 'text-gray-400' : 'text-transparent'}`}>
                                    {h}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-t border-gray-100/50 pt-4">
                    <span>Morning</span>
                    <span>Noon</span>
                    <span>Night</span>
                </div>
            </div>
        </motion.section>
    );
}
