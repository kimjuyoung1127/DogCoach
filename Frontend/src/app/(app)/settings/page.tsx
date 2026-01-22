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

export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettings>(MOCK_SETTINGS);
    const [subscription, setSubscription] = useState<Subscription>(MOCK_SUBSCRIPTION);
    const [user, setUser] = useState<UserProfile>(MOCK_USER);

    const handleSettingsUpdate = (key: keyof UserSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        // Ideally call API here
        console.log('Settings Updated:', key, value);
    };

    const handlePhoneUpdate = async (phone: string) => {
        // API Call simulation
        await new Promise(r => setTimeout(r, 500));
        setUser(prev => ({ ...prev, phone_number: phone }));
    };

    const handleTimezoneUpdate = async (tz: string) => {
        setUser(prev => ({ ...prev, timezone: tz }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 py-4 transition-all">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">설정</h1>
            </header>

            <main className="px-6 py-6 container mx-auto max-w-2xl space-y-8 animate-in fade-in duration-500">

                {/* 1. 멤버십 (최우선) */}
                <section id="subscription">
                    <SubscriptionSection
                        subscription={subscription}
                        onUpgrade={() => console.log('Upgrade clicked')}
                        onManageSubscription={() => console.log('Manage clicked')}
                    />
                </section>

                <hr className="border-gray-200" />

                {/* 2. 알림 (이탈 방지) */}
                <section id="notifications">
                    <NotificationSection
                        settings={settings.notification_pref}
                        onUpdate={(newPref) => handleSettingsUpdate('notification_pref', newPref)}
                    />
                </section>

                <hr className="border-gray-200" />

                {/* 3. 계정 (기본 정보) */}
                <section id="account">
                    <AccountSection
                        user={user}
                        onUpdatePhone={handlePhoneUpdate}
                        onUpdateTimezone={handleTimezoneUpdate}
                    />
                </section>

                <hr className="border-gray-200" />

                {/* 4. AI 설정 (개인화) */}
                <section id="ai-preference">
                    <AiPreferenceSettings
                        preference={settings.ai_persona}
                        onUpdate={(newPersona) => handleSettingsUpdate('ai_persona', newPersona)}
                    />
                </section>

                <hr className="border-gray-200" />

                {/* 5. 데이터 (전문가/초기화) */}
                <section id="data">
                    <DataSection isPro={subscription.plan_type !== 'FREE'} />
                </section>

                {/* 6. 앱 정보 */}
                <section id="app-info">
                    <AppInfoSection />
                </section>

            </main>
        </div>
    );
}
