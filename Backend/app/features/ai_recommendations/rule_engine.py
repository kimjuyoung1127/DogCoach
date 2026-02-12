"""Rule-based recommendation engine (Plan B / fallback).

Generates recommendations without any LLM call.
Used when:
- Budget exceeded (rule_only mode)
- Saving mode for 15/30 day windows
- OpenAI response validation failure
- User quota exceeded
"""

from typing import List, Dict, Any

# Static recommendation templates per issue type
RULE_TEMPLATES: Dict[str, List[Dict[str, Any]]] = {
    "Barking": [
        {"title": "소음 둔감화 훈련", "description": "문제 소리를 낮은 볼륨으로 틀고, 소리가 나는 동안 간식을 지급하세요. 매일 5분씩 볼륨을 점진적으로 높여갑니다.", "priority": 1},
        {"title": "대체 행동 강화", "description": "짖기 시작하기 전 '앉아' 또는 '자리' 명령을 주고, 조용히 수행하면 즉시 보상합니다.", "priority": 2},
        {"title": "환경 관리", "description": "창문에 불투명 필름을 부착하거나, 외부 소음을 줄이는 백색소음기를 활용하세요.", "priority": 3},
        {"title": "보호자 무반응 연습", "description": "짖을 때 시선/말/접촉을 완전히 차단하고, 조용해진 순간에만 관심을 줍니다.", "priority": 4},
        {"title": "에너지 소진 루틴", "description": "산책 시간을 20분 늘리거나 노즈워크 장난감을 활용하여 정신적 피로도를 높이세요.", "priority": 5},
    ],
    "SeparationAnxiety": [
        {"title": "짧은 분리 연습", "description": "현관문을 열고 닫기만 하는 것부터 시작해서, 1분→3분→5분으로 점진적으로 부재 시간을 늘려갑니다.", "priority": 1},
        {"title": "출발 신호 둔감화", "description": "열쇠 집기, 신발 신기 등 외출 신호를 하루 10회 이상 아무 때나 반복하여 불안 연결을 끊습니다.", "priority": 2},
        {"title": "안전 공간 만들기", "description": "크레이트나 특정 장소를 긍정적 경험(간식, 장난감)과 연결하여 혼자 있는 안전 공간으로 인식시킵니다.", "priority": 3},
        {"title": "차분한 복귀 루틴", "description": "돌아왔을 때 과하게 반기지 말고 조용히 인사 후, 강아지가 차분해지면 그때 관심을 줍니다.", "priority": 4},
        {"title": "Kong 활용법", "description": "외출 직전 간식이 채워진 Kong을 제공하여 긍정적 연상을 형성합니다.", "priority": 5},
    ],
    "Biting": [
        {"title": "물기 리다이렉션", "description": "입질이 시작되면 즉시 장난감으로 대체하고, 장난감을 무는 행동에 보상합니다.", "priority": 1},
        {"title": "놀이 중단 기법", "description": "이빨이 피부에 닿으면 '아!' 소리와 함께 놀이를 즉시 중단하고 30초간 무시합니다.", "priority": 2},
        {"title": "턱 터치 훈련", "description": "손바닥에 코를 대는 '터치' 명령을 가르쳐 입 대신 코를 사용하는 습관을 형성합니다.", "priority": 3},
        {"title": "흥분도 관리", "description": "놀이 중 흥분 수준이 올라가면 잠시 멈추고, 차분해진 후 다시 시작합니다.", "priority": 4},
        {"title": "씹기 욕구 해소", "description": "치석 제거 껌이나 내구성 좋은 씹기 장난감을 제공하여 정상적 씹기 욕구를 충족시킵니다.", "priority": 5},
    ],
    "Toilet": [
        {"title": "배변 스케줄 확립", "description": "식사 후 15분, 기상 직후, 놀이 후에 지정 장소로 데려가 배변을 유도합니다.", "priority": 1},
        {"title": "성공 즉시 보상", "description": "올바른 장소에서 배변하면 3초 이내에 간식과 칭찬을 제공합니다.", "priority": 2},
        {"title": "실수 무반응 처리", "description": "잘못된 장소에서의 배변은 야단치지 않고 조용히 치운 후, 효소 세정제로 냄새를 완전히 제거합니다.", "priority": 3},
        {"title": "활동 범위 제한", "description": "배변 훈련이 안정될 때까지 생활 공간을 울타리로 제한하여 실수를 줄입니다.", "priority": 4},
        {"title": "패드 위치 조정", "description": "패드를 문 가까이 배치하고, 점진적으로 바깥쪽으로 이동시켜 야외 배변으로 전환합니다.", "priority": 5},
    ],
    "Excitement": [
        {"title": "차분한 인사 훈련", "description": "손님이 올 때 '앉아' 후 인사하는 루틴을 반복하고, 네 발이 바닥에 있을 때만 관심을 줍니다.", "priority": 1},
        {"title": "임펄스 컨트롤", "description": "'기다려' 명령을 식사, 산책 전에 매번 연습하여 충동 조절 능력을 키웁니다.", "priority": 2},
        {"title": "에너지 발산 강화", "description": "아침 산책을 30분 이상 확보하고, 노즈워크나 지능 장난감으로 정신적 자극도 제공합니다.", "priority": 3},
        {"title": "이완 매트 훈련", "description": "특정 매트 위에서 '엎드려' 자세를 유지하면 보상하여, 흥분 시 매트로 가는 습관을 형성합니다.", "priority": 4},
        {"title": "과잉 반응 무시", "description": "흥분 점프를 할 때 등을 돌리고 무시하며, 네 발이 바닥에 닿는 순간 칭찬합니다.", "priority": 5},
    ],
}

# Default fallback for unknown issues
DEFAULT_TEMPLATES = [
    {"title": "기본 복종 강화", "description": "'앉아', '기다려', '이리와' 3가지 기본 명령을 하루 10분씩 연습합니다.", "priority": 1},
    {"title": "산책 루틴 개선", "description": "매일 같은 시간에 30분 이상 산책하고, 산책 중 '힐' 훈련을 병행합니다.", "priority": 2},
    {"title": "긍정 강화 습관화", "description": "원하는 행동을 보일 때 3초 이내 보상하는 습관을 들이세요. 하루 최소 10회 칭찬 목표.", "priority": 3},
    {"title": "환경 스트레스 점검", "description": "강아지의 생활 공간에서 스트레스 요인(소음, 좁은 공간, 외부 자극)을 점검하고 개선합니다.", "priority": 4},
    {"title": "일관성 유지 가이드", "description": "가족 구성원 전체가 동일한 명령어와 규칙을 사용하도록 합의합니다.", "priority": 5},
]


def _score_candidates(
    candidates: List[Dict[str, Any]], summary_text: str
) -> List[Dict[str, Any]]:
    """Score candidates by keyword relevance to summary_text."""
    scored = []
    summary_lower = summary_text.lower() if summary_text else ""
    for c in candidates:
        score = c["priority"]  # lower priority number = better base score
        title_words = c["title"].lower().split()
        desc_words = c["description"].lower().split()
        # Boost if keywords from title/description appear in summary
        for word in title_words + desc_words:
            if len(word) > 1 and word in summary_lower:
                score -= 0.1
        scored.append((score, c))
    scored.sort(key=lambda x: x[0])
    return [item[1] for item in scored]


def generate_rule_based(
    issue: str, summary_text: str, window_days: int
) -> dict:
    """Generate rule-based recommendations without LLM.

    Returns same structure as AI response.
    """
    candidates = RULE_TEMPLATES.get(issue, DEFAULT_TEMPLATES)
    ranked = _score_candidates(candidates, summary_text)
    top3 = ranked[:3]
    # Re-assign priority 1-3
    for i, item in enumerate(top3):
        top3[i] = {**item, "priority": i + 1}

    return {
        "recommendations": top3,
        "rationale": f"최근 {window_days}일간 {issue} 관련 기록을 분석하여 가장 효과적인 훈련법 3가지를 선정했습니다.",
        "period_comparison": None,
        "source": "rule",
    }
