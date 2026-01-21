"use client";

import { motion } from "framer-motion";
import { AlertCircle, Heart, Footprints, PenLine } from "lucide-react";
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
            delay: 0.2
        },
        {
            id: 'memo',
            label: '직접 입력',
            icon: PenLine,
            color: 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100',
            delay: 0.3
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
                        className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border ${btn.color} transition-colors shadow-sm h-32`}
                    >
                        <btn.icon className="w-8 h-8" strokeWidth={1.5} />
                        <span className="text-sm font-bold">{btn.label}</span>
                    </motion.button>
                ))}
            </div>
        </section>
    );
}
