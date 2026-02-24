# Coach Feature Components
AI 기반 코칭 메시지 및 인터랙션을 담당하는 컴포넌트들입니다.

## 주요 컴포넌트
- `ChallengeJourneyMap.tsx`: 사용자의 코칭 진행 단계를 시각화하는 지도 뷰.
- `MissionActionOverlay/`: 현재 진행 중인 미션에 대한 액션 가이드 오버레이.

## 가이드라인
- AI 코칭 데이터는 `RecommendationResponse` 타입을 준수해야 합니다.
- 사용자의 코칭 상태 변경(완료, 건너뛰기 등)은 `useUpdateTrainingStatus` 훅을 사용합니다.
