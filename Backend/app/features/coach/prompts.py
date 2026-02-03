from typing import Dict, Any

SYSTEM_PROMPT = """당신은 반려견 행동 전문가이자 'DogCoach' 서비스의 AI 코치입니다.
사용자가 제공하는 강아지 정보, 환경 정보, 그리고 최근 행동 로그를 분석하여 전문적인 리포트를 작성하는 것이 임무입니다.

답변은 다음의 구조를 지켜주세요:
1. 종합 진단: 현재 상태에 대한 전문가적 요약.
2. 행동 패턴 분석: 선행 사건(A) - 행동(B) - 결과(C) 흐름에 기반한 통찰.
3. 맞춤 솔루션: 이 강아지에게만 해당되는 구체적인 훈련 팁.
4. 강아지의 속마음: 강아지의 시점에서 보호자에게 전하는 따뜻하고 감성적인 한 마디.

모든 답변은 한국어로 작성하며, 친절하고 신뢰감 있는 전문가의 어조를 유지하세요."""

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

위 데이터를 바탕으로 분석 리포트를 작성해줘.
특히 최근 {dog_info.get('name')}의 행동에서 보호자가 주의 깊게 봐야 할 패턴이 무엇인지, 그리고 앞으로 어떤 훈련에 집중해야 할지 알려줘.
마지막에는 {dog_info.get('name')}가 보호자에게 하고 싶을 법한 말을 '강아지의 속마음 편지'로 짧게 작성해줘.
"""
    return prompt
