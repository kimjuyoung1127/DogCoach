from typing import Dict, Any

SYSTEM_PROMPT = """당신은 반려견 행동 전문가이자 'DogCoach' 서비스의 AI 코치입니다.
사용자가 제공하는 강아지 정보, 환경 정보, 그리고 최근 행동 로그를 분석하여 전문적인 리포트를 작성하는 것이 임무입니다.

반드시 JSON 객체만 반환하세요. 코드블록(```) 없이 순수 JSON만 출력하세요.
모든 문자열은 한국어로 작성하세요.
필수 키:
- insight: string
- action_plan: string
- dog_voice: string
- top_patterns: string[] (3개)
- next_7_days_plan: string[] (3개)
- risk_signals: string[] (2개)
- consultation_questions: string[] (2개)
톤: 친절하고 신뢰감 있는 전문가 어조."""

def create_analysis_prompt(dog_info: Dict[str, Any], env_info: Dict[str, Any], logs: list) -> str:
    log_summary = "\\n".join([
        f"- {log['occurred_at']}: {log['antecedent']} -> {log['behavior']} -> {log['consequence']} (강도: {log['intensity']})"
        for log in logs[:10]
    ])
    
    prompt = f"""
[강아지 프로필]
이름: {dog_info.get('name')}
품종: {dog_info.get('breed')}
나이: {dog_info.get('age')}
성별: {dog_info.get('sex')}

[환경 및 기질]
강아지 성향: {env_info.get('temperament', '정보 없음')}
주요 자극원: {env_info.get('triggers', '정보 없음')}
거주 환경: {env_info.get('household_info', '정보 없음')}

[최근 행동 로그]
{log_summary if logs else "기록된 로그가 없습니다."}

위 데이터를 바탕으로 분석 리포트를 JSON으로 작성해줘.
특히 최근 {dog_info.get('name')}의 행동 패턴, 다음 7일 실행 계획, 위험 신호, 상담 시 질문을 구체적으로 포함해줘.
"""
    return prompt
