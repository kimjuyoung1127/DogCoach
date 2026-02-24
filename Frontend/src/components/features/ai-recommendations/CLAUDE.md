# AI Recommendations Components
AI가 제안하는 행동 개선 추천 항목을 노출하고 피드백을 수집하는 컴포넌트들입니다.

## 주요 내용
- 추천 항목 카드 및 상세 분석 레이아웃.
- AI 생성 비용 최적화를 위한 캐시 상태 안내.

## 가이드라인
- `useAIRecommendations` 훅을 통해 추천 데이터를 관리합니다.
- 사용자의 피드백(도움됨/안됨)은 `useSubmitRecommendationFeedback`을 사용하여 즉시 반영합니다.
