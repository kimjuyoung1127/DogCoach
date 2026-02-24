# Frontend Shared Components
애플리케이션 전반에서 재사용되는 중급 단위의 컴포넌트들을 관리합니다.

## 구성 요소
- `layout/`: `AppLayout`, `Sidebar`, `Header` 등 페이지 구조 관련.
- `modals/`: 프로젝트 공용 모달 및 팝업 시스템.

## 가이드라인
- 피처 간의 공유가 빈번한 복합 UI는 이곳에서 관리합니다.
- 특정 피처에만 종속된 로직은 `features/` 디렉토리로 이동하는 것을 검토합니다.
