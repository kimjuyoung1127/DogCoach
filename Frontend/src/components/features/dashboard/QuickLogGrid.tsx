"use client";

import { motion } from "framer-motion";
import { AlertCircle, Heart, Footprints, PenLine, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
// Assuming we might use a toast library later, currently just console/alert mock
// import { toast } from "sonner"; 

export function QuickLogGrid() {

    const handleQuickLog = (type: string, label: string) => {
        // Mock API Call
        console.log(`Quick Log: ${type}`);

        // Simple Feedback (Replace with Toast later)
        // toast.success(`${label} 기록되었습니다.`);
        alert(`${label} 기록되었습니다! (Mock Success)`);
    };

    const buttons = [
        {
            id: 'barking',
            label: '짖음/경계',
            icon: AlertCircle,
            color: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100',
            delay: 0
        },
        {
            id: 'accident',
            label: '배변실수',
            icon: Droplets,
            color: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100',
            delay: 0.05
        },
        {
            id: 'praise',
            label: '칭찬/보상',
            icon: Heart,
            color: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100',
            delay: 0.1
        },
        {
            id: 'walk',
            label: '산책/놀이',
            icon: Footprints,
            color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100',
            delay: 0.15
        },
        {
            id: 'memo',
            label: '직접 입력',
            icon: PenLine,
            color: 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100',
            delay: 0.2
        },
    ];

    return (
        <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">빠른 기록</h2>
            <div className="grid grid-cols-2 gap-3">
                {buttons.map((btn) => (
                    <motion.button
                        key={btn.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: btn.delay }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickLog(btn.id, btn.label)}
                        className={cn(
                            "flex flex-col items-center justify-center gap-2 p-5 rounded-[2rem] border transition-all duration-300 shadow-sm h-32 relative overflow-hidden group",
                            btn.color,
                            btn.id === 'memo' ? "col-span-2 flex-row h-16 gap-4" : ""
                        )}
                    >
                        {btn.id === 'memo' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                        <btn.icon className={cn("w-8 h-8", btn.id === 'memo' ? "w-5 h-5" : "")} strokeWidth={1.5} />
                        <span className="text-sm font-black tracking-tight">{btn.label}</span>
                    </motion.button>
                ))}
            </div>
        </section>
    );
}
