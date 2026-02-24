# Frontend Components Directory
애플리케이션의 모든 UI 구성 요소를 관리하는 디렉토리입니다.

## 컴포넌트 계층 구조
- `ui/`: 가장 작은 단위의 공통 컴포넌트 (Atomic Components). 스타일과 접근성에 집중.
- `shared/`: 여러 피처에서 공유되는 레이아웃, 모달, 위젯 등 (Mid-level Components).
- `features/`: 특정 도메인 로직과 밀접하게 결합된 컴포넌트 (Domain Components).

## 가이드라인
- 모든 컴포넌트는 `memo` 사용을 권장하여 불필요한 리렌더링을 방지합니다.
- 복잡한 상태 관리보다는 Props를 통한 데이터 전달을 우선하며, 로직은 필요 시 커스텀 훅으로 분리합니다.
- 파일 상단에 1~3줄의 기능 요약 주석을 추가합니다.
- 새로운 피처 추가 시 `features/` 하위에 적절한 폴더를 생성하고 `CLAUDE.md`를 작성합니다.
