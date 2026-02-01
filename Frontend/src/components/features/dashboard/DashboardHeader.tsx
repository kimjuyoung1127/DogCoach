import { DashboardData } from "./types";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { Trophy, Calendar, Sparkles } from "lucide-react";

interface Props {
    data: DashboardData;
}

export const DashboardHeader = ({ data }: Props) => {
    return (
        <FadeIn className="bg-gradient-to-b from-white to-gray-50 p-6 pt-10 rounded-b-[3rem] shadow-sm mb-8 border-b border-gray-100 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-lime/10 text-brand-lime rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-brand-lime/20">
                        <Sparkles className="w-3 h-3" />
                        Today's DogCoach
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 leading-tight">
                        반가워요, <br />
                        <span className="text-brand-lime">{data.dog_profile.name}</span> <span className="text-gray-400">보호자님</span>
                    </h1>
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4 relative z-10">
                <div className="bg-white p-5 rounded-[2rem] flex-1 shadow-md shadow-orange-500/5 border border-orange-100/50 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute -right-2 -top-2 w-16 h-16 bg-orange-50 rounded-full opacity-50 group-hover:scale-125 transition-transform" />
                    <div className="relative">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-orange-500" />
                            </div>
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Current Streak</span>
                        </div>
                        <div className="text-3xl font-black text-gray-900">{data.stats.current_streak} <span className="text-sm font-bold text-gray-400">일</span></div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-[2rem] flex-1 shadow-md shadow-brand-lime/5 border border-brand-lime/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute -right-2 -top-2 w-16 h-16 bg-brand-lime/5 rounded-full opacity-50 group-hover:scale-125 transition-transform" />
                    <div className="relative">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-brand-lime/20 flex items-center justify-center">
                                <Calendar className="w-3.5 h-3.5 text-brand-lime" />
                            </div>
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Total Logs</span>
                        </div>
                        <div className="text-3xl font-black text-gray-900">{data.stats.total_logs} <span className="text-sm font-bold text-gray-400">개</span></div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};
