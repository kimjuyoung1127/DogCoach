/**
 * Survey data ID to Korean label mappings
 * Used for displaying survey responses in Korean
 */

export const HEALTH_LABELS: Record<string, string> = {
    'allergy': '알레르기',
    'joint': '관절 문제',
    'skin': '피부 질환',
    'digestive': '소화 문제',
    'heart': '심장 질환',
    'dental': '치아 문제',
    'obesity': '비만',
    'anxiety': '불안증',
    'none': '없음'
};

export const REWARD_LABELS: Record<string, string> = {
    'meat': '고기/육포',
    'vegetable': '채소',
    'fruit': '과일',
    'gum': '껌',
    'toy': '장난감',
    'praise': '칭찬',
    'petting': '쓰다듬기',
    'none': '없음'
};

export const CHRONIC_ISSUE_LABELS: Record<string, string> = {
    'barking': '과도한 짖음',
    'aggression': '공격성',
    'separation': '분리불안',
    'destructive': '파괴 행동',
    'jumping': '점프/뛰어오르기',
    'pulling': '줄 당기기',
    'begging': '구걸',
    'toileting': '배변 문제',
    'chewing': '물어뜯기',
    'digging': '파기',
    'escaping': '탈출',
    'hyperactivity': '과잉행동'
};

export const TRIGGER_LABELS: Record<string, string> = {
    'doorbell': '초인종',
    'stranger': '낯선 사람',
    'dog': '다른 개',
    'cat': '고양이',
    'car': '차량',
    'loud_noise': '큰 소리',
    'separation': '분리(혼자 남겨짐)',
    'food': '음식',
    'vacuum': '청소기',
    'children': '어린이',
    'vet': '동물병원',
    'grooming': '미용'
};

export const PAST_ATTEMPT_LABELS: Record<string, string> = {
    'scolding': '혼내기',
    'ignoring': '무시하기',
    'timeout': '타임아웃',
    'redirection': '주의 돌리기',
    'positive_reinforcement': '긍정 강화',
    'punishment': '벌 주기',
    'professional_training': '전문 훈련',
    'medication': '약물 치료',
    'nothing': '시도 안 함'
};

export const PRIMARY_CARER_LABELS: Record<string, string> = {
    'father': '아버지',
    'mother': '어머니',
    'son': '아들',
    'daughter': '딸',
    'grandparent': '조부모',
    'other_family': '기타 가족',
    'professional': '전문 돌보미',
    'alone': '혼자'
};

/**
 * Get Korean label for a given ID from any category
 * Falls back to the original ID if no mapping is found
 */
export function getLabel(id: string, category: 'health' | 'reward' | 'issue' | 'trigger' | 'attempt' | 'carer'): string {
    const maps = {
        health: HEALTH_LABELS,
        reward: REWARD_LABELS,
        issue: CHRONIC_ISSUE_LABELS,
        trigger: TRIGGER_LABELS,
        attempt: PAST_ATTEMPT_LABELS,
        carer: PRIMARY_CARER_LABELS
    };

    return maps[category][id] || id;
}
