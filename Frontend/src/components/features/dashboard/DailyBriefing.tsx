"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface DailyBriefingProps {
    userName?: string;
    dogName?: string;
    streak?: number;
}

export function DailyBriefing({ userName = "보호자", dogName = "Bella", streak = 1 }: DailyBriefingProps) {
    const defaultMessage = `"${dogName}가 어제보다 한결 편안해 보여요. 오늘도 작은 성공을 쌓아볼까요?"`;
    const [scrambledMessage, setScrambledMessage] = useState("");

    useEffect(() => {
        const chars = "!<>-_\\/[]{}—=+*^?#";
        let iteration = 0;
        let interval: any;

        const scramble = () => {
            setScrambledMessage(
                defaultMessage
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return char;
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= defaultMessage.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        };

        interval = setInterval(scramble, 30);
        return () => clearInterval(interval);
    }, [defaultMessage]);

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                >
                    <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.2em] mb-1">Welcome back</span>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">안녕하세요, {userName}님!</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20 ring-1 ring-black/5"
                >
                    <div className="relative">
                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                        <div className="absolute inset-0 bg-orange-400 blur-sm opacity-50 animate-pulse" />
                    </div>
                    <span className="text-sm font-black text-gray-700">{streak}일째</span>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="glass rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 flex items-start gap-5 relative overflow-hidden group"
            >
                {/* Subtle highlight effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-lime/30 to-transparent" />

                <div className="w-14 h-14 bg-brand-lime/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner relative group-hover:scale-110 transition-transform duration-500">
                    🐶
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-brand-lime opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-lime/10 rounded-full w-fit">
                        <div className="w-1 h-1 bg-brand-lime rounded-full animate-pulse" />
                        <span className="text-[9px] text-brand-lime font-black uppercase tracking-widest">AI 행동 브리핑</span>
                    </div>
                    <p className="text-base font-black text-gray-900 leading-snug">"어제 {dogName}를 3번 칭찬해주셨네요! 훌륭해요."</p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed font-mono opacity-80">
                        {scrambledMessage}
                    </p>
                </div>

                {/* Ambient glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-lime/10 blur-[50px] rounded-full pointer-events-none" />
            </motion.div>
        </section>
    );
}
