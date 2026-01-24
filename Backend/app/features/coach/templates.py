from typing import Dict, List

# Hybrid AI Strategy:
# These templates are "skeletons". The AI only fills in the {{variables}}.

TRAINING_TEMPLATES: Dict[str, Dict] = {
    "Barking": {
        "title": "짖음 (Barking) 완화 훈련",
        "description": "외부 소리에 예민하게 반응하는 {{name}}를 위한 둔감화 교육",
        "steps": [
            "1. {{trigger}} 소리가 들리면 즉시 {{treat}}을 뿌려주세요. (소리 = 간식)",
            "2. 짖기 전에 주는 것이 핵심입니다.",
            "3. {{primary_carer}}님이 평온한 태도를 유지해야 합니다."
        ],
        "tone_adjustment": {
            "high_sensitivity": "아주 작은 소리부터 시작하여 천천히 강도를 높이세요.",
            "low_sensitivity": "소리를 조금 더 크게 들려주며 훈련 속도를 높여도 좋습니다."
        }
    },
    "SeparationAnxiety": {
        "title": "분리불안 (Separation Anxiety) 훈련",
        "description": "{{name}}가 혼자 있는 시간을 긍정적으로 인식하도록 돕는 교육",
        "steps": [
            "1. 현관문 앞에서 5초만 있다가 다시 들어옵니다.",
            "2. 들어올 때는 {{name}}를 무심하게 대하세요.",
            "3. 나갈 때 {{treat}}이 든 노즈워크 장난감을 주고 나가세요."
        ]
    }
}

def get_template(issue_type: str) -> Dict:
    return TRAINING_TEMPLATES.get(issue_type, {})
