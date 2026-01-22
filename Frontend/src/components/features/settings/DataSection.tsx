'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Props {
    isPro?: boolean;
}

export function DataSection({ isPro = false }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">데이터 및 관리</h2>

            <Card>
                <CardHeader className="pt-8 pb-2">
                    <CardTitle className="text-lg">데이터 관리</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">반려견 프로필 관리</div>
                            <div className="text-sm text-gray-500">등록된 강아지 정보를 수정합니다.</div>
                        </div>
                        <Button variant="outline" onClick={() => window.location.href = '/dog/profile'}>
                            이동
                        </Button>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium flex items-center gap-2">
                                기록 데이터 내보내기
                                {!isPro && <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded border">PRO Only</span>}
                            </div>
                            <div className="text-sm text-gray-500">최근 30일 기록을 PDF로 다운로드합니다.</div>
                        </div>
                        <Button variant="outline" disabled={!isPro}>다운로드</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8">
                <Card className="border-red-100 bg-red-50/30">
                    <CardHeader className="pt-8 pb-2">
                        <CardTitle className="text-lg text-red-700">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-red-700">데이터 초기화</div>
                            <div className="text-sm text-red-500">모든 기록을 삭제하고 초기화합니다. (복구 불가)</div>
                        </div>
                        <Button className="bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700">
                            초기화
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
