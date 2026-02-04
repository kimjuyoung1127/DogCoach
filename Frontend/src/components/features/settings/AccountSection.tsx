'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserProfile } from '@/lib/types';
import { useState } from 'react';

interface Props {
    user?: UserProfile;
    onUpdatePhone: (phone: string) => Promise<void>;
    onUpdateTimezone: (tz: string) => Promise<void>;
}

import { motion } from 'framer-motion';
import { User, Phone, Globe, ShieldCheck, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccountSection({ user, onUpdatePhone, onUpdateTimezone }: Props) {
    const [phone, setPhone] = useState(user?.phone_number || '');
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePhoneSave = async () => {
        setIsLoading(true);
        await onUpdatePhone(phone);
        setIsLoading(false);
        setIsEditingPhone(false);
    };

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
                <div className="space-y-10">
                    {/* 1. Login Provider */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Profile Info</h3>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-inner">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Linked Account</span>
                                <div className="flex items-center gap-3">
                                    <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 opacity-40" />
                                        {user?.email || 'No email registered'}
                                    </h4>
                                    <div className={cn(
                                        "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                        user?.provider === 'kakao' ? "bg-[#FEE500] text-[#3c1e1e]" : "bg-black text-white"
                                    )}>
                                        {user?.provider?.toUpperCase() || 'EMAIL'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Phone Number */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Communication</h3>
                        </div>
                        <div className="p-6 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-inner group">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</span>
                                    {isEditingPhone ? (
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="010-0000-0000"
                                            className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-lime/30 shadow-sm w-48"
                                        />
                                    ) : (
                                        <div className="text-base font-black text-gray-900">
                                            {user?.phone_number || 'Not verified'}
                                        </div>
                                    )}
                                </div>

                                {isEditingPhone ? (
                                    <div className="flex gap-2">
                                        <button onClick={() => setIsEditingPhone(false)} className="px-4 py-2 text-xs font-black text-gray-400 hover:text-gray-900 transition-all">Cancel</button>
                                        <button onClick={handlePhoneSave} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-black transition-all shadow-lg active:scale-95">Save</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditingPhone(true)} className="px-5 py-2.5 bg-white/60 border border-white/80 rounded-xl text-xs font-black text-gray-600 hover:bg-white transition-all shadow-sm">
                                        Update
                                    </button>
                                )}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 mt-4 leading-relaxed flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-brand-lime" />
                                AI 분석 결과 및 중요 정기 솔루션을 발송하는 데 사용됩니다.
                            </div>
                        </div>
                    </div>

                    {/* 3. Timezone */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Localization</h3>
                        </div>
                        <div className="p-6 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-inner">
                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Timezone</span>
                                <select
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-lime/30 shadow-sm appearance-none cursor-pointer"
                                    value={user?.timezone || 'Asia/Seoul'}
                                    onChange={(e) => onUpdateTimezone(e.target.value)}
                                >
                                    <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                                    <option value="America/New_York">America/New_York (EST)</option>
                                    <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                                    <option value="Europe/London">Europe/London (GMT)</option>
                                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
