# Frontend Source Directory Guide

프론트엔드 핵심 소스 코드가 위치한 디렉토리입니다.

## 파일 상단 지침
- 모든 신규 파일 상단에는 해당 파일의 역할과 구성 요소를 설명하는 1~3줄의 요약 주석을 포함해야 합니다.

## 주요 구조
- `app/`: Next.js App Router 기반의 페이지 및 라우팅 레이아웃
- `components/`: UI 컴포넌트 (`features/` 기능별 및 `shared/` 공통 UI 분리)
- `lib/`: API 클라이언트, 상태 관리(Zustand), 유틸리티 로직
- `types/`: 전역 TypeScript 인터페이스 및 타입 정의
- `hooks/`: 재사용 가능한 커스텀 React 훅
- `styles/`: CSS Modules 및 전역 스타일 (`globals.css`)

## 개발 규칙
- **의존성 방향**: `app` -> `components` -> `lib` -> `types`. 역방향 의존성을 지양합니다.
- **상태 관리**: 서버 데이터는 TanStack Query를, 클라이언트 전역 상태는 Zustand를 사용합니다.
- **스타일링**: 컴포넌트 특화 스타일은 CSS Modules(`*.module.css`)를 우선하며, 인라인 스타일은 동적 값 계산시에만 제한적으로 사용합니다.
