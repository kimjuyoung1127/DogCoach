const LABEL_MAP: Record<string, string> = {
  Barking: "짖음",
  Biting: "입질",
  Toileting: "배변",
  Anxiety: "분리불안",
  Excitement: "흥분",
  separation: "분리불안",
  barking: "짖음",
  potty: "배변",
  destructive: "파괴행동",
  aggression: "공격성",
  etc: "기타",
};

export function translate(input: string): string {
  if (!input) return "";
  return LABEL_MAP[input] || input;
}

