'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserSettings } from '@/lib/types';
import { useState } from 'react';

interface Props {
    settings: UserSettings['notification_pref'];
    onUpdate: (newPref: UserSettings['notification_pref']) => void;
}

function Toggle({ checked, onCheckedChange, label, description }: { checked: boolean; onCheckedChange: (v: boolean) => void; label: string; description?: string }) {
    return (
        <div className="flex items-center justify-between py-4 border-b last:border-0 border-gray-100">
            <div>
                <div className="font-medium text-gray-900">{label}</div>
                {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
            </div>
            <button
                onClick={() => onCheckedChange(!checked)}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-lime ${checked ? 'bg-brand-lime' : 'bg-gray-200'}`}
            >
                <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform transform shadow-sm ${checked ? 'translate-x-5' : ''}`}
                />
            </button>
        </div>
    );
}

export function NotificationSection({ settings, onUpdate }: Props) {
    const handleChannelChange = (channel: keyof typeof settings.channels, value: boolean) => {
        onUpdate({
            ...settings,
            channels: { ...settings.channels, [channel]: value },
        });
    };

    const handleTypeChange = (type: keyof typeof settings.types, value: boolean) => {
        onUpdate({
            ...settings,
            types: { ...settings.types, [type]: value },
        });
    };

    const handleQuietHoursChange = (key: keyof typeof settings.quiet_hours, value: any) => {
        onUpdate({
            ...settings,
            quiet_hours: { ...settings.quiet_hours, [key]: value },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 px-1">
                <h2 className="text-xl font-bold">알림 설정</h2>
                {(!settings.channels.alimtalk && !settings.channels.push) && (
                    <span className="text-xs text-orange-500 font-semibold animate-pulse break-keep">
                        알림을 끄면 습관 형성이 3배 어려워져요 🥺
                    </span>
                )}
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader className="pt-8 pb-2">
                        <CardTitle className="text-lg">채널</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Toggle
                            label="카카오 알림톡"
                            description="중요 정보 및 AI 리포트 수신"
                            checked={settings.channels.alimtalk}
                            onCheckedChange={(v: boolean) => handleChannelChange('alimtalk', v)}
                        />
                        <Toggle
                            label="앱 푸시"
                            description="데일리 미션 및 가벼운 알림"
                            checked={settings.channels.push}
                            onCheckedChange={(v: boolean) => handleChannelChange('push', v)}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pt-8 pb-2">
                        <CardTitle className="text-lg">알림 유형</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Toggle
                            label="기록 리마인더"
                            description={`매일 ${settings.remind_time}에 기록 알림`}
                            checked={settings.types.reminder}
                            onCheckedChange={(v) => handleTypeChange('reminder', v)}
                        />
                        {settings.types.reminder && (
                            <div className="flex items-center justify-between py-3 pl-4 border-l-2 border-brand-lime bg-gray-50 pr-4 rounded mb-2 mt-2">
                                <span className="text-sm text-gray-700">발송 시간</span>
                                <input
                                    type="time"
                                    value={settings.remind_time}
                                    onChange={(e) => onUpdate({ ...settings, remind_time: e.target.value })}
                                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-brand-lime"
                                />
                            </div>
                        )}
                        <Toggle
                            label="주간 리포트"
                            description="매주 월요일 분석 리포트 발송"
                            checked={settings.types.weekly_report}
                            onCheckedChange={(v) => handleTypeChange('weekly_report', v)}
                        />
                        <Toggle
                            label="마케팅 정보"
                            description="이벤트 및 혜택 소식"
                            checked={settings.types.marketing}
                            onCheckedChange={(v) => handleTypeChange('marketing', v)}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pt-8 pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">방해 금지 시간</CardTitle>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={settings.quiet_hours.enabled} onChange={(e) => handleQuietHoursChange('enabled', e.target.checked)} />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-lime rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-lime"></div>
                            </label>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {settings.quiet_hours.enabled && (
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">시작</label>
                                    <input
                                        type="time"
                                        value={settings.quiet_hours.start}
                                        onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                                    />
                                </div>
                                <div className="text-gray-400">~</div>
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">종료</label>
                                    <input
                                        type="time"
                                        value={settings.quiet_hours.end}
                                        onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                                    />
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-gray-400">이 시간대에는 긴급 알림을 제외한 모든 알림이 차단됩니다.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
