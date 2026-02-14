'use client';

import { supabase } from '@/lib/supabase';
import { apiClient } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PremiumBackground } from '@/components/shared/ui/PremiumBackground';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    // Check if already logged in (non-anonymous) and redirect
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session && !session.user.is_anonymous) {
                try {
                    const profile = await apiClient.get<any>("/auth/me", { token: session.access_token });
                    if (profile?.latest_dog_id) {
                        router.push('/dashboard');
                    } else {
                        router.push('/survey');
                    }
                    return;
                } catch {
                    router.push('/survey');
                    return;
                }
            }

            setChecking(false);
        };

        checkSession();
    }, [router]);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error('Error logging in with Google:', error);
            alert('Error logging in with Google');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <PremiumBackground />
                <div className="relative z-10 w-8 h-8 border-4 border-brand-lime border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center p-4">
            <PremiumBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md space-y-8"
            >
                {/* Logo & Title */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-brand-lime flex items-center justify-center shadow-lg">
                            <span className="text-2xl">🐶</span>
                        </div>
                    </motion.div>

                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Tail<span className="text-brand-lime">Log</span>
                    </h1>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/80 shadow-sm">
                        <Sparkles className="w-4 h-4 text-brand-lime" />
                        <p className="text-sm font-bold text-gray-700">
                            AI 기반 반려견 행동 교정 솔루션
                        </p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="glass p-8 rounded-[2.5rem] border border-white/60 shadow-xl ring-1 ring-black/5 space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-gray-900">
                            시작하기
                        </h2>
                        <p className="text-sm font-bold text-gray-500">
                            Google 계정으로 간편하게 시작하세요
                        </p>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-700 shadow-md ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-gray-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 font-bold"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>Google로 시작하기</span>
                            </>
                        )}
                    </button>

                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 text-center leading-relaxed">
                            로그인 시 개인정보 처리방침 및 서비스 이용약관에 동의하게 됩니다
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
