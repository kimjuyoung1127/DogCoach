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
        <div className="space-y-4">
            <h2 className="text-xl font-bold">계정 및 보안</h2>
            <Card>
                <CardHeader className="pt-8 pb-2">
                    <CardTitle className="text-lg">기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Provider */}
                    <div className="flex justify-between items-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">로그인 연결</label>
                            <div className="mt-1 flex items-center gap-2">
                                {user?.provider === 'kakao' && (
                                    <span className="bg-[#FEE500] text-[#3c1e1e] text-xs font-bold px-2 py-1 rounded">KAKAO</span>
                                )}
                                {user?.provider === 'apple' && (
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">APPLE</span>
                                )}
                                {!user?.provider && <span className="text-sm text-gray-500">Email Login</span>}
                                <span className="text-sm text-gray-600">{user?.email || '이메일 정보 없음'}</span>
                            </div>
                        </div>
                        {/* <Button variant="outline" size="sm" className="text-xs">관리</Button> */}
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Phone Number */}
                    <div className="flex justify-between items-start">
                        <div className="flex-1 mr-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                            {isEditingPhone ? (
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="010-0000-0000"
                                />
                            ) : (
                                <div className="text-gray-900">{user?.phone_number || '등록된 번호 없음'}</div>
                            )}
                            <p className="text-xs text-gray-400 mt-1">알림톡 발송을 위해 정확한 번호가 필요합니다.</p>
                        </div>
                        {isEditingPhone ? (
                            <div className="flex gap-2 mt-6">
                                <Button variant="ghost" size="sm" onClick={() => setIsEditingPhone(false)} disabled={isLoading}>취소</Button>
                                <Button size="sm" onClick={handlePhoneSave} disabled={isLoading}>저장</Button>
                            </div>
                        ) : (
                            <Button variant="outline" size="sm" onClick={() => setIsEditingPhone(true)} className="mt-1">변경</Button>
                        )}
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Timezone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">시간대 (Timezone)</label>
                        <select
                            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-brand-lime focus:border-brand-lime"
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
                </CardContent>
            </Card>
        </div>
    );
}
