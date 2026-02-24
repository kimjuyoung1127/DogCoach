# Dashboard Feature Components
사용자의 강아지 상태와 최근 활동을 한눈에 보여주는 대시보드 관련 컴포넌트들입니다.

## 주요 컴포넌트
- `DashboardHeader.tsx`: 환영 메시지 및 강아지 전환 등 상단 영역.
- `QuickLogWidget.tsx`: 빠르고 간편하게 행동을 기록할 수 있는 위젯.
- `RecentLogList.tsx`: 최근 기록된 행동 로그의 타임라인 요약.
- `CreateLogDialog.tsx`: 상세 행동 로그 입력을 위한 모달.

## 가이드라인
- `useDashboardData` 훅을 통해 데이터를 조회하며, `DashboardSkeleton`을 사용하여 로딩 상태를 관리합니다.
- 행동 기록 성공 시 `invalidateQueries`를 호출하여 데이터를 최신화합니다.
