"""Fixed prompt template PROMPT_V1 for AI recommendations.

Rules:
- No dynamic long instructions.
- summary_text truncated to 1200 chars before calling.
- Response must be valid JSON.
"""

PROMPT_VERSION = "PROMPT_V1"

SYSTEM_PROMPT = (
    "당신은 반려견 행동 전문가이자 AI 코치입니다.\n"
    "주어진 행동 요약 데이터를 분석하여 정확히 3가지 맞춤 추천을 제공하세요.\n"
    "응답은 반드시 아래 JSON 형식만 출력하세요. 다른 텍스트는 절대 포함하지 마세요.\n\n"
    '{"recommendations": [{"title": "제목", "description": "구체적 실행 방법", "priority": 1}, '
    '{"title": "제목", "description": "구체적 실행 방법", "priority": 2}, '
    '{"title": "제목", "description": "구체적 실행 방법", "priority": 3}], '
    '"rationale": "3줄 이내 근거", '
    '"period_comparison": "기간 비교 요약 3줄"}'
)


def build_user_prompt(issue: str, summary_text: str, window_days: int) -> str:
    """Build the user prompt from issue, summary, and window."""
    truncated = summary_text[:1200]
    return (
        f"[분석 기간] 최근 {window_days}일\n"
        f"[주요 이슈] {issue}\n"
        f"[행동 요약]\n{truncated}\n\n"
        "위 데이터를 바탕으로 JSON 형식으로 응답하세요."
    )
