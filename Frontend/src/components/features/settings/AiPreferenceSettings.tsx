'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AiPersona } from '@/lib/types';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, User as UserIcon, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    preference: AiPersona;
    onUpdate: (pref: AiPersona) => void;
}

const PREVIEWS = {
    EMPATHETIC: {
        COACH: "보호자님, 오늘 하루도 정말 고생 많으셨어요. 콩이가 조금 짖었지만, 보호자님의 대처는 훌륭했습니다. 내일은 산책을 조금 더 길게 해볼까요?",
        DOG: "엄마! 오늘 나 때문에 힘들었지? 그래도 엄마가 안아줘서 금방 진정됐어. 사랑해! 내일은 공놀이 5분만 더 하자 멍! 🐶"
    },
    SOLUTION: {
        COACH: "금일 짖음 빈도가 전주 대비 15% 감소했습니다. 긍정 강화 훈련이 효과를 보고 있습니다. 내일은 '기다려' 훈련 강도를 1단계 높여주세요.",
        DOG: "대장님, 오늘 훈련 성과가 좋아. 간식 보상 타이밍이 완벽했어. 내일도 일관된 규칙으로 리드해줘! 🫡"
    }
};

export function AiPreferenceSettings({ preference, onUpdate }: Props) {
    const previewText = useMemo(() => {
        return PREVIEWS[preference.tone][preference.perspective];
    }, [preference]);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-1">
                <Settings2 className="w-5 h-5 text-brand-lime" />
                <h2 className="text-xl font-black text-gray-900 tracking-tight">AI 코칭 개인화</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-[2.5rem] border border-white/60 shadow-sm ring-1 ring-black/5"
            >
                <div className="space-y-10">
                    {/* 1. Tone Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-gray-400" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Communication Style</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'EMPATHETIC', label: '다정한 공감형', icon: '🥰' },
                                { id: 'SOLUTION', label: '명확한 해결형', icon: '😎' }
                            ].map((tone) => (
                                <button
                                    key={tone.id}
                                    onClick={() => onUpdate({ ...preference, tone: tone.id as any })}
                                    className={cn(
                                        "p-5 rounded-3xl border-2 transition-all duration-300 text-sm font-black text-center flex flex-col items-center gap-2",
                                        preference.tone === tone.id
                                            ? "bg-white border-brand-lime text-gray-900 shadow-lg shadow-brand-lime/10 ring-4 ring-brand-lime/5"
                                            : "bg-white/40 border-white/60 text-gray-400 hover:bg-white hover:border-brand-lime/30"
                                    )}
                                >
                                    <span className="text-2xl">{tone.icon}</span>
                                    <span>{tone.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Perspective Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-gray-400" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Speaker Perspective</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'COACH', label: '전문 코치님', icon: '🧑‍🏫' },
                                { id: 'DOG', label: '우리집 강아지', icon: '🐶' }
                            ].map((perspective) => (
                                <button
                                    key={perspective.id}
                                    onClick={() => onUpdate({ ...preference, perspective: perspective.id as any })}
                                    className={cn(
                                        "p-5 rounded-3xl border-2 transition-all duration-300 text-sm font-black text-center flex flex-col items-center gap-2",
                                        preference.perspective === perspective.id
                                            ? "bg-white border-brand-lime text-gray-900 shadow-lg shadow-brand-lime/10 ring-4 ring-brand-lime/5"
                                            : "bg-white/40 border-white/60 text-gray-400 hover:bg-white hover:border-brand-lime/30"
                                    )}
                                >
                                    <span className="text-2xl">{perspective.icon}</span>
                                    <span>{perspective.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Live Preview */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-lime" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Example Message</h3>
                        </div>
                        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-inner relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                <Sparkles className="w-16 h-16 text-brand-lime" />
                            </div>
                            <div className="relative z-10">
                                <span className="text-[9px] font-black text-brand-lime uppercase tracking-widest bg-brand-lime/10 px-2 py-1 rounded-lg border border-brand-lime/20 mb-3 inline-block">
                                    AI Coaching Context
                                </span>
                                <p className="text-gray-900 font-bold leading-relaxed text-sm break-keep">
                                    "{previewText}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
