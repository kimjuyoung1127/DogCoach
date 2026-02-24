# Frontend (app) Route Group
인증된 사용자만 접근 가능한 보호된 경로들을 관리하는 디렉토리입니다.

## 주요 내용
- `/dashboard`: 메인 대시보드 및 로그 타임라인.
- `/dogs`: 강아지 프로필 관리.
- `/settings`: 알림 및 AI 페르소나 설정.

## 가이드라인
- `layout.tsx`에서 인증 세션을 확인하고, 세션이 없을 경우 `/login`으로 리다이렉트합니다.
- TanStack Query를 사용하여 서버 상태를 관리하며, `QUERY_KEYS` 표준을 준수합니다.
- 데이터 로딩 중에는 스켈레톤 UI(Loading 스켈레톤)를 제공하여 UX를 개선합니다.
