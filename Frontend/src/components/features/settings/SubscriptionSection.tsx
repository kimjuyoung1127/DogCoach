'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Subscription } from '@/lib/types';

interface Props {
    subscription?: Subscription;
    onUpgrade: () => void;
    onManageSubscription: () => void;
}

export function SubscriptionSection({ subscription, onUpgrade, onManageSubscription }: Props) {
    const isPro = subscription?.plan_type === 'PRO_MONTHLY' || subscription?.plan_type === 'PRO_YEARLY';

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">멤버십 및 구독</h2>

            <Card>
                <CardHeader className="pt-8">
                    <CardTitle className="flex justify-between items-center text-lg">
                        <span>현재 플랜</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${isPro ? 'bg-brand-lime/10 text-brand-lime' : 'bg-gray-100 text-gray-600'}`}>
                            {isPro ? 'PRO' : 'FREE'}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {isPro ? (
                            <>
                                <p className="text-sm text-gray-600">
                                    다음 결제일: {subscription?.next_billing_date ? new Date(subscription.next_billing_date).toLocaleDateString() : '-'}
                                </p>
                                <div className="flex gap-2 mt-4">
                                    <Button variant="outline" onClick={onManageSubscription} className="w-full text-sm">
                                        결제 수단 관리
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600 mb-4 whitespace-pre-line break-keep">
                                    Pro로 업그레이드하고 AI 심층 분석과 무제한 코칭을 받아보세요.
                                </p>
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
                                    <ul className="text-sm space-y-1 text-gray-700">
                                        <li>✨ AI 정밀 행동 분석</li>
                                        <li>📊 주간/월간 리포트</li>
                                        <li>👩‍⚕️ 전문가 코칭 연계</li>
                                    </ul>
                                </div>
                                <Button onClick={onUpgrade} className="w-full bg-gray-900 hover:bg-black text-white shadow-md">
                                    Pro 시작하기 (7일 무료)
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
                {!isPro && (
                    <CardFooter className="pt-4">
                        <div className="w-full flex gap-2">
                            <input
                                type="text"
                                placeholder="초대/프로모션 코드"
                                className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                            />
                            <Button variant="ghost" className="shrink-0">적용</Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
