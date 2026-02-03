"use client";

import { useMemo } from "react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";
import { motion } from "framer-motion";
import { LogData } from "./LogCard"; // Assuming LogData type is exported or accessible
import { cn } from "@/lib/utils";

interface AnalyticsViewProps {
    logs: any[]; // Replace with implicit Log type
    id?: string; // Optional ID for capturing
}

export function AnalyticsView({ logs, id }: AnalyticsViewProps) {

    // 1. Radar Chart Data: Top 5 Triggers
    const radarData = useMemo(() => {
        if (!logs || logs.length === 0) return [];

        const counts: Record<string, number> = {};
        logs.forEach(log => {
            const key = log.antecedent || "알 수 없음";
            counts[key] = (counts[key] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([subject, A]) => ({ subject, A, fullMark: 10 }))
            .sort((a, b) => b.A - a.A)
            .slice(0, 5);
    }, [logs]);

    // 2. Heatmap Data: Frequency by Hour (0-23)
    const hourlyData = useMemo(() => {
        const hours = new Array(24).fill(0);
        logs?.forEach(log => {
            const date = new Date(log.occurred_at);
            const h = date.getHours();
            hours[h]++;
        });
        return hours.map((count, hour) => ({
            hour,
            count,
            label: `${hour}시`
        }));
    }, [logs]);

    // 3. Weekly Heatmap Grid (7 days x 3 time slots: Morning, Afternoon, Night)
    // Simplified for mobile view -> Just "Day of Week" frequency
    const dayData = useMemo(() => {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const counts = new Array(7).fill(0);
        logs?.forEach(log => {
            const d = new Date(log.occurred_at).getDay();
            counts[d]++;
        });
        return days.map((day, idx) => ({ day, count: counts[idx] }));
    }, [logs]);

    if (!logs || logs.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400 text-sm">
                데이터가 충분하지 않아요.
            </div>
        );
    }

    return (
        <div id={id} className="space-y-8">
            {/* 1. Radar Chart: Major Causes */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 relative overflow-hidden ring-1 ring-black/5"
            >
                <div className="flex flex-col mb-6">
                    <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.2em] mb-1">Causes Analysis</span>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        주요 원인 분석
                    </h4>
                </div>

                <div className="h-72 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 'auto']}
                                tick={false}
                                axisLine={false}
                            />
                            <Radar
                                name="Frequency"
                                dataKey="A"
                                stroke="#4ADE80"
                                strokeWidth={3}
                                fill="url(#radarGradient)"
                                fillOpacity={0.6}
                            />
                            <defs>
                                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                        </RadarChart>
                    </ResponsiveContainer>
                    {radarData.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-300 uppercase tracking-widest">
                            No Data Available
                        </div>
                    )}
                </div>
            </motion.div>

            {/* 2. Hourly Activity (Bar Chart) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 relative overflow-hidden ring-1 ring-black/5"
            >
                <div className="flex flex-col mb-6">
                    <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] mb-1">Activity Pattern</span>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">
                        시간대별 활동 패턴
                    </h4>
                </div>

                <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                            <XAxis
                                dataKey="hour"
                                tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 700 }}
                                tickLine={false}
                                axisLine={false}
                                interval={3}
                            />
                            <YAxis
                                tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 700 }}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                contentStyle={{
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
                                }}
                                labelStyle={{ color: '#111827', fontWeight: 900, marginBottom: '4px' }}
                            />
                            <Bar
                                dataKey="count"
                                fill="#111827"
                                radius={[6, 6, 2, 2]}
                                activeBar={{ fill: '#4ADE80' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* 3. Daily Heatmap (Simple Grid) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 relative overflow-hidden ring-1 ring-black/5"
            >
                <div className="flex flex-col mb-8">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Weekly Frequency</span>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">
                        요일별 빈도
                    </h4>
                </div>

                <div className="grid grid-cols-7 gap-3 sm:gap-4 h-40">
                    {dayData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className="relative w-full aspect-[1/4] bg-gray-50/50 rounded-full overflow-hidden border border-gray-100/50 shadow-inner">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.min((d.count / (Math.max(...dayData.map(x => x.count)) || 1)) * 100, 100)}%` }}
                                    transition={{ duration: 1, delay: 0.3 + (i * 0.05), type: "spring", damping: 15 }}
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-brand-lime to-emerald-400 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                                />
                            </div>
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{d.day}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
