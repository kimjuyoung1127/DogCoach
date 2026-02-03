'use client';

import { useState } from 'react';
import { SubscriptionSection } from '@/components/features/settings/SubscriptionSection';
import { NotificationSection } from '@/components/features/settings/NotificationSection';
import { AccountSection } from '@/components/features/settings/AccountSection';
import { AiPreferenceSettings } from '@/components/features/settings/AiPreferenceSettings';
import { DataSection } from '@/components/features/settings/DataSection';
import { AppInfoSection } from '@/components/features/settings/AppInfoSection';
import { UserSettings, Subscription, UserProfile } from '@/lib/types';

// Mock Data for Initial State
const MOCK_SUBSCRIPTION: Subscription = {
    id: 'sub-1',
    user_id: 'user-1',
    plan_type: 'FREE',
    is_active: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
};

const MOCK_SETTINGS: UserSettings = {
    id: 'set-1',
    user_id: 'user-1',
    notification_pref: {
        channels: { alimtalk: true, push: true, email: false },
        types: { reminder: true, weekly_report: true, marketing: false },
        quiet_hours: { enabled: false, start: '22:00', end: '07:00' },
        remind_time: '20:00'
    },
    ai_persona: {
        tone: 'EMPATHETIC',
        perspective: 'COACH'
    },
    marketing_agreed: false,
    updated_at: new Date().toISOString()
};

const MOCK_USER: UserProfile = {
    id: 'user-1',
    role: 'USER',
    status: 'ACTIVE',
    timezone: 'Asia/Seoul',
    phone_number: '010-1234-5678',
    provider: 'kakao',
    created_at: new Date().toISOString()
};

import { PremiumBackground } from '@/components/shared/ui/PremiumBackground';

export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettings>(MOCK_SETTINGS);
    const [subscription, setSubscription] = useState<Subscription>(MOCK_SUBSCRIPTION);
    const [user, setUser] = useState<UserProfile>(MOCK_USER);

    const handleSettingsUpdate = (key: keyof UserSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        console.log('Settings Updated:', key, value);
    };

    const handlePhoneUpdate = async (phone: string) => {
        await new Promise(r => setTimeout(r, 500));
        setUser(prev => ({ ...prev, phone_number: phone }));
    };

    const handleTimezoneUpdate = async (tz: string) => {
        setUser(prev => ({ ...prev, timezone: tz }));
    };

    return (
        <div className="min-h-screen pb-32 relative">
            <PremiumBackground />

            {/* 1. Glass Header */}
            <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-md border-b border-white/60 ring-1 ring-black/5 px-6 py-5">
                <div className="container mx-auto max-w-2xl flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.2em] mb-0.5">Configuration</span>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">환경 설정</h1>
                    </div>
                </div>
            </header>

            <main className="px-6 py-10 container mx-auto max-w-2xl space-y-10 relative z-10">
                {/* 1. 멤버십 (Bento Card) */}
                <section id="subscription" className="transition-all hover:translate-y-[-2px] duration-500">
                    <SubscriptionSection
                        subscription={subscription}
                        onUpgrade={() => console.log('Upgrade clicked')}
                        onManageSubscription={() => console.log('Manage clicked')}
                    />
                </section>

                {/* Grid for settings sections */}
                <div className="grid grid-cols-1 gap-10">
                    {/* 2. 알림 */}
                    <section id="notifications">
                        <NotificationSection
                            settings={settings.notification_pref}
                            onUpdate={(newPref) => handleSettingsUpdate('notification_pref', newPref)}
                        />
                    </section>

                    {/* 3. 계정 */}
                    <section id="account">
                        <AccountSection
                            user={user}
                            onUpdatePhone={handlePhoneUpdate}
                            onUpdateTimezone={handleTimezoneUpdate}
                        />
                    </section>

                    {/* 4. AI 설정 */}
                    <section id="ai-preference">
                        <AiPreferenceSettings
                            preference={settings.ai_persona}
                            onUpdate={(newPersona) => handleSettingsUpdate('ai_persona', newPersona)}
                        />
                    </section>

                    {/* 5. 데이터 */}
                    <section id="data">
                        <DataSection isPro={subscription.plan_type !== 'FREE'} />
                    </section>

                    {/* 6. 앱 정보 */}
                    <section id="app-info">
                        <AppInfoSection />
                    </section>
                </div>
            </main>
        </div>
    );
}
