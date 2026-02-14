'use client';

import { motion } from 'framer-motion';
import { Globe, ShieldCheck } from 'lucide-react';

interface Props {
    timezone: string;
    onUpdateTimezone: (tz: string) => Promise<void>;
}

export function AccountSection({ timezone, onUpdateTimezone }: Props) {

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-1">
                <ShieldCheck className="w-5 h-5 text-brand-lime" />
                <h2 className="text-xl font-black text-gray-900 tracking-tight">계정 및 보안</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-[2.5rem] border border-white/60 shadow-sm ring-1 ring-black/5"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">지역 설정</h3>
                    </div>
                    <div className="p-6 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-inner">
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">표시 시간대</span>
                            <select
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-lime/30 shadow-sm appearance-none cursor-pointer"
                                value={timezone}
                                onChange={(e) => onUpdateTimezone(e.target.value)}
                            >
                                <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                                <option value="America/New_York">America/New_York (EST)</option>
                                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                                <option value="Europe/London">Europe/London (GMT)</option>
                                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                            </select>
                            <div className="text-[10px] font-bold text-gray-400 leading-relaxed flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-brand-lime" />
                                기록 시간과 알림 시간대를 설정합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
