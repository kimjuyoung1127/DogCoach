export interface ResultCopy {
  headline: string;
  subline: string;
  nextAction: string;
}

const FALLBACK_COPY: ResultCopy = {
  headline: "행동 패턴을 더 관찰해 맞춤 코스를 추천했어요.",
  subline: "기록이 쌓일수록 우리 아이에게 맞는 원인 분석 정확도가 올라갑니다.",
  nextAction: "오늘부터 같은 상황의 기록을 3회 이상 남겨보세요.",
};

const COPY_BY_CURRICULUM_ID: Record<string, ResultCopy> = {
  separation_anxiety: {
    headline: "혼자 있는 상황에서 불안 신호가 보여요.",
    subline: "분리 상황에서 긴장이 올라가며 짖음/초조 행동이 반복될 수 있습니다.",
    nextAction: "아주 짧은 분리 연습(10~30초)부터 차근히 시작해보세요.",
  },
  barking_noise: {
    headline: "소리 자극에 예민하게 반응하는 상태예요.",
    subline: "초인종, 복도 소리, 방문자 자극에서 경계 반응이 빠르게 올라옵니다.",
    nextAction: "소리 자극 전환 루틴(자리 이동 + 보상)을 먼저 고정해보세요.",
  },
  toilet_training: {
    headline: "배변 루틴을 다시 안정화할 시점이에요.",
    subline: "장소/시간 신호가 아직 불안정해서 실수가 반복될 수 있습니다.",
    nextAction: "식후·기상 직후 골든타임 유도와 성공 직후 보상을 고정해보세요.",
  },
  pica_correction: {
    headline: "물건 물기·파괴 행동 관리가 필요한 상태예요.",
    subline: "에너지 잔여, 탐색 욕구, 환경 자극이 겹칠 때 문제가 커질 수 있습니다.",
    nextAction: "대체 행동(노즈워크/장난감) 루틴을 먼저 배치해보세요.",
  },
  leash_walking: {
    headline: "산책 중 흥분 조절 훈련이 필요한 상태예요.",
    subline: "리드 당김과 자극 추적 반응이 누적되며 보호자 통제가 어려워질 수 있습니다.",
    nextAction: "짧은 거리에서 보행 템포 맞추기부터 반복해보세요.",
  },
  multi_dog: {
    headline: "여러 요인이 함께 작동하는 복합 이슈 상태예요.",
    subline: "단일 원인보다 환경·상황·반응이 겹쳐 나타나는 패턴이 보입니다.",
    nextAction: "우선순위 1개 행동부터 정해 1주 단위로 확인해보세요.",
  },
  fear_avoidance: {
    headline: "낯선 자극을 피하려는 두려움 신호가 보여요.",
    subline: "강한 자극 상황에서 회피·긴장 반응이 먼저 나타나는 패턴입니다.",
    nextAction: "안전 거리 확보와 짧은 노출 훈련을 병행해보세요.",
  },
};

export function getResultCopy(curriculumId?: string): ResultCopy {
  if (!curriculumId) return FALLBACK_COPY;
  return COPY_BY_CURRICULUM_ID[curriculumId] || FALLBACK_COPY;
}
