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
        <div id={id} className="space-y-6">
            {/* 1. Radar Chart: Major Causes */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-lime rounded-full" />
                    주요 원인 분석
                </h4>
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 'auto']}
                                tick={false}
                                axisLine={false}
                            />
                            <Radar
                                name="Frequency"
                                dataKey="A"
                                stroke="#a3e635"
                                strokeWidth={2}
                                fill="#a3e635"
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                    {radarData.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                            데이터 부족
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Hourly Activity (Bar Chart) */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-lime rounded-full" />
                    시간대별 활동 패턴
                </h4>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                            <XAxis
                                dataKey="hour"
                                tick={{ fontSize: 10, fill: '#9ca3af' }}
                                tickLine={false}
                                axisLine={false}
                                interval={3}
                            />
                            <YAxis
                                tick={{ fontSize: 10, fill: '#9ca3af' }}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                            />
                            <Bar
                                dataKey="count"
                                fill="#27272a"
                                radius={[4, 4, 0, 0]}
                                activeBar={{ fill: '#a3e635' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. Daily Heatmap (Simple Grid) */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-lime rounded-full" />
                    요일별 빈도
                </h4>
                <div className="grid grid-cols-7 gap-2">
                    {dayData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="relative w-full aspect-[1/3] bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.min((d.count / (Math.max(...dayData.map(x => x.count)) || 1)) * 100, 100)}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="absolute bottom-0 w-full bg-brand-lime rounded-full"
                                />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">{d.day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
