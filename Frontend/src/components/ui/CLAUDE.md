# Frontend UI Components
디자인 시스템의 기본이 되는 가장 작은 단위의 컴포넌트들을 관리합니다.

## 구성 요소
- `Button.tsx`, `Input.tsx`, `Card.tsx` 등 기본적인 UI 요소.
- `animations/`: Framer Motion 기반의 공통 애니메이션 컴포넌트.

## 가이드라인
- 이 디렉토리의 컴포넌트는 가급적 비즈니스 로직을 포함하지 않아야 합니다 (Pure Components).
- 스타일 수정 시 전역적인 영향을 미치므로 신중하게 판단해야 합니다.
- Tailwind CSS 클래스 조합을 통해 일관된 테마를 유지합니다.
