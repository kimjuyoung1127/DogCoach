import { motion } from "framer-motion";

export function BarkingHeatmap() {
    // Mock Data: 0-24 hours. Peaks at 10 (10 AM) and 19 (7 PM).
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const getIntensity = (h: number) => {
        if (h === 10) return 90; // 10 AM Peak
        if (h === 19) return 85; // 7 PM Peak
        if (h >= 9 && h <= 11) return 60;
        if (h >= 18 && h <= 20) return 50;
        return 10 + Math.random() * 20;
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-6 py-6"
        >
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">행동 지도 (Heatmap)</h3>
                <p className="text-sm text-gray-500 break-keep mb-3">
                    Bella의 스트레스 지수는 <span className="text-red-500 font-bold">오전 10시(택배)</span>와 <span className="text-red-500 font-bold">오후 7시(가족 귀가)</span>에 가장 높습니다.
                </p>
                <div className="bg-orange-50 text-orange-800 text-xs px-2.5 py-1.5 rounded-lg break-keep font-medium">
                    🚨 <strong>동일 견종(포메라니안) 대비 상위 15%</strong> 빈도입니다.
                </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-x-auto">
                <div className="flex items-end justify-between h-32 gap-1.5 min-w-[300px]">
                    {hours.map((h) => {
                        const intensity = getIntensity(h);
                        const isPeak = intensity > 80;
                        return (
                            <div key={h} className="group relative flex-1 flex flex-col items-center gap-1">
                                {isPeak && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: 1.5 + h * 0.05, type: "spring" }}
                                        className="absolute -top-8 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm whitespace-nowrap z-10 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-red-500"
                                    >
                                        {h}시 주의
                                    </motion.div>
                                )}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${intensity}%` }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                        delay: 0.5 + h * 0.02
                                    }}
                                    className={`w-full rounded-t-sm ${isPeak ? 'bg-red-400' : 'bg-green-100'}`}
                                />
                                <span className="text-[9px] text-gray-300 font-medium">
                                    {h % 6 === 0 ? h : ''}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400 border-t border-gray-100 pt-2">
                    <span>0시</span>
                    <span>12시</span>
                    <span>24시</span>
                </div>
            </div>
        </motion.section>
    );
}
