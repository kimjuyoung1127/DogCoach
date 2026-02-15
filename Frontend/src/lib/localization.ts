const LABEL_MAP: Record<string, string> = {
  // Behaviors
  Barking: "짖음",
  Biting: "입질",
  Toileting: "배변",
  Anxiety: "분리불안",
  Excitement: "흥분",
  separation: "분리불안",
  barking: "과도한 짖음",
  potty: "배변",
  destructive: "파괴 행동",
  aggression: "공격성",
  jumping: "점프/뛰어오르기",
  pulling: "줄 당기기",
  begging: "구걸",
  toileting: "배변 문제",
  chewing: "물어뜯기",
  digging: "파기",
  escaping: "탈출",
  hyperactivity: "과잉행동",

  // Training methods
  ignoring: "무시하기",
  treat_reward: "간식 보상",
  clicker: "클리커 훈련",
  kennel: "켄넬 적응",
  toy: "장난감 활용",
  sound_desensitization: "소리 둔감화",
  nosework: "노즈워크",
  waiting: "기다리기",

  // Past attempts / Responses
  scolding: "혼내기",
  timeout: "타임아웃",
  redirection: "주의 돌리기",
  distraction: "주의 분산",
  positive_reinforcement: "긍정 강화",
  punishment: "벌 주기",
  professional_training: "전문 훈련",
  medication: "약물 치료",
  nothing: "시도 안 함",

  // Triggers
  doorbell: "초인종",
  stranger: "낯선 사람",
  dog: "다른 개",
  cat: "고양이",
  car: "차량",
  loud_noise: "큰 소리",
  food: "음식",
  vacuum: "청소기",
  children: "어린이",
  vet: "동물병원",
  grooming: "미용",
  touch: "특정 신체 접촉",
  delivery: "택배 / 오토바이 소리",
  screen: "TV / 화면 속 동물",

  // Rewards
  meat: "고기/육포",
  vegetable: "채소",
  fruit: "과일",
  gum: "껌",
  praise: "칭찬",
  petting: "쓰다듬기",

  // Health
  allergy: "알레르기",
  joint: "관절 문제",
  skin: "피부 질환",
  digestive: "소화 문제",
  heart: "심장 질환",
  dental: "치아 문제",
  obesity: "비만",
  anxiety: "불안증",

  // General
  etc: "기타",
  none: "없음",
};

export function translate(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  const translateToken = (token: string) => {
    const t = token.trim();
    return LABEL_MAP[t] || LABEL_MAP[t.toLowerCase()] || t;
  };

  if (trimmed.includes(",") || trimmed.includes(";")) {
    return trimmed
      .split(/[;,]/)
      .map(translateToken)
      .filter(Boolean)
      .join(", ");
  }

  return translateToken(trimmed);
}
