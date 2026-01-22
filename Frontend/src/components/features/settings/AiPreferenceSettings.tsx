'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AiPersona } from '@/lib/types';
import { useMemo } from 'react';

interface Props {
    preference: AiPersona;
    onUpdate: (pref: AiPersona) => void;
}

const PREVIEWS = {
    EMPATHETIC: {
        COACH: "보호자님, 오늘 하루도 정말 고생 많으셨어요. 콩이가 조금 짖었지만, 보호자님의 대처는 훌륭했습니다. 내일은 산책을 조금 더 길게 해볼까요?",
        DOG: "엄마! 오늘 나 때문에 힘들었지? 그래도 엄마가 안아줘서 금방 진정됐어. 사랑해! 내일은 공놀이 5분만 더 하자 멍! 🐶"
    },
    SOLUTION: {
        COACH: "금일 짖음 빈도가 전주 대비 15% 감소했습니다. 긍정 강화 훈련이 효과를 보고 있습니다. 내일은 '기다려' 훈련 강도를 1단계 높여주세요.",
        DOG: "대장님, 오늘 훈련 성과가 좋아. 간식 보상 타이밍이 완벽했어. 내일도 일관된 규칙으로 리드해줘! 🫡"
    }
};

export function AiPreferenceSettings({ preference, onUpdate }: Props) {
    const previewText = useMemo(() => {
        return PREVIEWS[preference.tone][preference.perspective];
    }, [preference]);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">AI 코칭 개인화</h2>
            <Card>
                <CardHeader className="pt-8 pb-2">
                    <CardTitle className="text-lg">코칭 스타일 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* Tone Selection */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">말투 스타일</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onUpdate({ ...preference, tone: 'EMPATHETIC' })}
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${preference.tone === 'EMPATHETIC'
                                    ? 'bg-pink-50 border-pink-200 text-pink-700 ring-2 ring-pink-500 ring-offset-1'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                🥰 다정한 공감형
                            </button>
                            <button
                                onClick={() => onUpdate({ ...preference, tone: 'SOLUTION' })}
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${preference.tone === 'SOLUTION'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-500 ring-offset-1'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                😎 명확한 해결형
                            </button>
                        </div>
                    </div>

                    {/* Perspective Selection */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">화자 시점</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onUpdate({ ...preference, perspective: 'COACH' })}
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${preference.perspective === 'COACH'
                                    ? 'bg-brand-lime/10 border-brand-lime text-gray-900 ring-2 ring-brand-lime ring-offset-1'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                🧑‍🏫 전문 코치님
                            </button>
                            <button
                                onClick={() => onUpdate({ ...preference, perspective: 'DOG' })}
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${preference.perspective === 'DOG'
                                    ? 'bg-amber-50 border-amber-200 text-amber-700 ring-2 ring-amber-500 ring-offset-1'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                🐶 우리집 강아지
                            </button>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="mt-4">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 block">미리보기</label>
                        <div className="bg-gray-100 p-4 rounded-xl relative group">
                            <div className="absolute -top-3 left-4 bg-white px-2 py-0.5 rounded-md border text-xs shadow-sm">
                                AI Message
                            </div>
                            <p className="text-gray-800 leading-relaxed text-sm">
                                "{previewText}"
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
