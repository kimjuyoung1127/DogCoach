# Log Feature Components
행동 기록의 상세 조회, 분석 및 리포트 생성을 담당하는 컴포넌트들입니다.

## 주요 컴포넌트
- `AnalyticsView.tsx`: 기간별 행동 빈도 및 패턴 분석 시각화.
- `LogCard.tsx`: 개별 행동 로그의 상세 내용을 표시하는 카드.
- `RecommendationSection.tsx`: 행동 데이터를 바탕으로 한 AI 추천 항목 노출.
- `ReportDocument.tsx`: 분석 결과를 PDF 등 문서 형태로 출력하기 위한 레이아웃.

## 가이드라인
- 차트 데이터 시각화 시 복잡한 연산은 `useMemo`를 사용합니다.
- `LogCard`는 대시보드와 타임라인에서 재사용되므로 Props 구조를 범용성 있게 유지합니다.
