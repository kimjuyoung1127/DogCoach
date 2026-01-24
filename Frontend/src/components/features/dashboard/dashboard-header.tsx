import { DashboardData } from "./types";

interface Props {
    data: DashboardData;
}

import { FadeIn } from "@/components/ui/animations/FadeIn";

export const DashboardHeader = ({ data }: Props) => {
    return (
        <FadeIn className="bg-gradient-to-br from-white to-gray-50 p-6 pt-8 rounded-b-[2.5rem] shadow-sm mb-8 border-b border-gray-100">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1 animate-pulse">
                        오늘도 행복한 하루 되세요! ☀️
                    </p>
                    <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                        안녕, <span className="text-brand-lime text-3xl block mt-1">{data.dog_profile.name} 🐶</span>
                    </h1>
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4">
                <div className="bg-white p-4 rounded-2xl flex-1 text-center shadow-sm border border-orange-50 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-orange-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                    <div className="relative">
                        <div className="text-3xl font-extrabold text-orange-500 mb-1">{data.stats.current_streak}일</div>
                        <div className="text-xs text-gray-400 font-bold tracking-wide">연속 기록 🔥</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl flex-1 text-center shadow-sm border border-blue-50 relative overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-blue-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                    <div className="relative">
                        <div className="text-3xl font-extrabold text-blue-500 mb-1">{data.stats.total_logs}개</div>
                        <div className="text-xs text-gray-400 font-bold tracking-wide">누적 기록 📝</div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};
