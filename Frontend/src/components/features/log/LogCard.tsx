"use client";

import { motion } from "framer-motion";
import { ArrowDown, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LogData {
    id: string;
    time: string;
    location: string;
    intensity: number; // 1-10
    duration: string; // e.g., "5분"
    antecedent: string; // A: 원인
    behavior: string; // B: 행동
    consequence: string; // C: 반응
    tags: string[];
    aiComment?: string;
}

interface Props {
    log: LogData;
}

export function LogCard({ log }: Props) {
    // Intensity Color Logic
    const getIntensityColor = (level: number) => {
        if (level <= 3) return "bg-green-500";
        if (level <= 7) return "bg-amber-500";
        return "bg-red-500";
    };

    const getIntensityBg = (level: number) => {
        if (level <= 3) return "bg-green-50";
        if (level <= 7) return "bg-amber-50";
        return "bg-red-50";
    };

    const getIntensityText = (level: number) => {
        if (level <= 3) return "text-green-700";
        if (level <= 7) return "text-amber-700";
        return "text-red-700";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4 cursor-pointer transition-colors hover:border-brand-lime/50"
        >
            {/* Header: Time & Location & Intensity Badge */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold text-white", getIntensityColor(log.intensity))}>
                        Lv.{log.intensity}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{log.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{log.location}</span>
                    </div>
                </div>
                <button className="text-gray-300 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Body: ABC Flow */}
            <div className="p-5 relative">
                {/* Visual Connector Line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "calc(100% - 64px)" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute left-[29px] top-8 w-0.5 bg-gray-100 -z-10"
                />

                {/* A: Antecedent */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 z-10 bg-white ring-4 ring-white">
                        A
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">{log.antecedent}</div>
                        <div className="text-xs text-gray-500 mt-1">원인 (상황)</div>
                    </div>
                </div>

                {/* B: Behavior */}
                <div className="flex items-start gap-4 mb-4">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 z-10 bg-white ring-4 ring-white", getIntensityBg(log.intensity), getIntensityText(log.intensity))}>
                        B
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">{log.behavior}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {log.duration} 동안 지속됨
                        </div>
                    </div>
                </div>

                {/* C: Consequence */}
                <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 z-10 bg-white ring-4 ring-white">
                        C
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">{log.consequence}</div>
                        <div className="text-xs text-gray-500 mt-1">나의 대처 (반응)</div>
                    </div>
                </div>
            </div>

            {/* Tags & AI Feedback */}
            <div className="px-5 pb-5 space-y-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* AI Comment (If exists) */}
                {log.aiComment && (
                    <div className="flex gap-3 bg-brand-lime/10 p-3 rounded-xl">
                        <span className="text-lg">💡</span>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            <span className="font-bold text-brand-lime-darker block mb-0.5">TailLog AI 코치</span>
                            {log.aiComment}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
