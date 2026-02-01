'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { apiClient } from '@/lib/api';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            // Wait a moment for Supabase to process the session from the URL
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session) {
                console.error('Auth callback error or no session:', error);
                router.push('/login');
                return;
            }

            try {
                // Fetch profile to check for existing dogs
                const profile = await apiClient.get<any>("/auth/me", { token: session.access_token });

                if (profile?.latest_dog_id) {
                    // User has at least one dog, go to dashboard
                    router.push('/dashboard');
                } else {
                    // New user or no dog registered yet
                    router.push('/Survey');
                }
            } catch (err) {
                console.error('API Profile fetch error:', err);
                // Fallback to Survey on error
                router.push('/Survey');
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-center p-8">
            <div className="space-y-6">
                <div className="w-16 h-16 border-4 border-brand-lime border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">로그인 중입니다</h2>
                    <p className="text-gray-500">정보를 불러오고 있으니 잠시만 기다려주세요.</p>
                </div>
            </div>
        </div>
    );
}
