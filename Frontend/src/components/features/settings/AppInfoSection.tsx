'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function AppInfoSection() {
    // PWA install logic would go here

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">앱 정보</h2>
            <Card>
                <CardHeader className="pt-8 pb-2">
                    <CardTitle className="text-lg text-center">앱 정보 확인</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <div className="text-sm text-gray-500">현재 버전 1.0.0</div>

                    <Button variant="outline" className="w-full">
                        홈 화면에 앱 설치하기
                    </Button>

                    <div className="flex justify-center gap-4 text-xs text-gray-400 mt-4">
                        <a href="#" className="hover:underline">이용약관</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">개인정보처리방침</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">문의하기</a>
                    </div>

                    <div className="text-[10px] text-gray-300">
                        DogCoach Inc. All rights reserved.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
