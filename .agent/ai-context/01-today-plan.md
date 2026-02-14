# Today Plan

Last Updated: 2026-02-14

## Sprint Focus
- Sidebar/BottomNav `+`를 대시보드 상세기록 모달 오픈으로 통일
- 코칭/상세기록 UI 한글화 및 코칭 레벨 제거
- 설정 페이지 mock 제거 및 핵심 API 연동 기반 확정
- 공모전 해금 플래그/카카오 준비중 정책 반영
- 로그인 페이지 디자인 통일

## Task Tickets

### UI-NAV-001
- id: `UI-NAV-001`
- goal: `사이드바/바텀 FAB 플러스 동작을 /dashboard?openDetailLog=1로 변경, 코칭 아이콘 45도 회전`
- files:
  - `Frontend/src/components/shared/layout/Sidebar.tsx`
  - `Frontend/src/components/shared/layout/BottomNav.tsx`
- changes:
  - `href=/quick-log` 제거
  - `href=/dashboard?openDetailLog=1` 적용
  - 코칭 아이콘 회전 스타일 적용
- verify:
  - `플러스 클릭 시 대시보드 이동 + 쿼리 확인`
- acceptance_criteria:
  - `데스크톱/모바일 모두 동일 동작`
- status: `todo`

### DASH-LOG-002
- id: `DASH-LOG-002`
- goal: `대시보드에서 openDetailLog=1 쿼리로 상세 기록 추가 모달 즉시 오픈`
- files:
  - `Frontend/src/app/(app)/dashboard/page.tsx`
  - `Frontend/src/components/features/dashboard/EditLogDialog.tsx`
- changes:
  - 쿼리 감지 후 create 모드 모달 오픈
  - 신규 기본 행동값 `기타`
  - 저장 성공 시 쿼리 제거
- verify:
  - `+/URL 진입 시 모달 자동 오픈`
  - `저장 후 로그 생성/목록 반영`
- acceptance_criteria:
  - `대시보드에서만 자동 오픈`
- status: `todo`

### COACH-I18N-003
- id: `COACH-I18N-003`
- goal: `ChallengeOnboardingModal 및 상세기록 태그/피드백 문구 한글화`
- files:
  - `Frontend/src/components/features/coach/ChallengeOnboardingModal.tsx`
  - `Frontend/src/components/features/dashboard/EditLogDialog.tsx`
  - `Frontend/src/lib/localization.ts`
- changes:
  - 영문 텍스트 제거
  - 태그 번역 누락 키 보강
  - `피드백 루프` 문구를 자연스러운 한글로 정리
- verify:
  - `모달/상세기록 화면 영문 잔존 여부 확인`
- acceptance_criteria:
  - `해당 범위 영문 문구 0건`
- status: `todo`

### COACH-UX-004
- id: `COACH-UX-004`
- goal: `코칭 페이지 보호자 레벨/XP UI 제거`
- files:
  - `Frontend/src/app/(app)/coach/page.tsx`
- changes:
  - 레벨 뱃지/XP 바/관련 상태 제거
- verify:
  - `코칭 페이지 렌더 및 미션 동작 확인`
- acceptance_criteria:
  - `레벨 기능 UI가 완전히 제거됨`
- status: `todo`

### SETTINGS-API-005
- id: `SETTINGS-API-005`
- goal: `설정 페이지 mock 제거 및 핵심 API 연동 구조 적용`
- files:
  - `Frontend/src/app/(app)/settings/page.tsx`
  - `Frontend/src/components/features/settings/*`
  - `Frontend/src/hooks/useQueries.ts`
  - `Frontend/src/lib/query-keys.ts`
  - `Frontend/src/lib/types.ts`
- changes:
  - mock state 제거
  - 핵심 3종 + 구독상태 조회 API 연동 구조
  - 전화번호 기능 제거
- verify:
  - `settings 로드/저장 흐름 확인`
- acceptance_criteria:
  - `설정 페이지가 mock 없이 동작`
- status: `todo`

### SUB-UNLOCK-006
- id: `SUB-UNLOCK-006`
- goal: `공모전 해금 플래그 기반 코칭/추천/잠금 UI 해금`
- files:
  - `Frontend/src/components/features/settings/SubscriptionSection.tsx`
  - `Frontend/src/app/(app)/coach/page.tsx`
  - `Backend/app/features/settings/*` (필요 시)
- changes:
  - env 플래그 도입 (`false` 기본)
  - 해금 범위는 코칭/추천/잠금 UI만
- verify:
  - `플래그 true/false 각각 동작 확인`
- acceptance_criteria:
  - `공모전 모드 on/off 즉시 전환 가능`
- status: `todo`

### SETTINGS-KAKAO-007
- id: `SETTINGS-KAKAO-007`
- goal: `카카오 연동 준비중 상태 UI 반영`
- files:
  - `Frontend/src/components/features/settings/NotificationSection.tsx`
  - `Frontend/src/components/features/settings/AccountSection.tsx`
- changes:
  - `준비중` 배지 + 비활성 토글
  - 안내문구 고정:
    - `카카오 연동 준비 중입니다. 사업자 등록/채널 승인 후 사용 가능합니다.`
- verify:
  - `카카오 영역 노출 및 비활성 상태 확인`
- acceptance_criteria:
  - `실OAuth/실발송 코드 없이 준비중 안내만 표시`
- status: `todo`

### LOGIN-UI-008
- id: `LOGIN-UI-008`
- goal: `login 페이지를 앱 디자인 톤과 통일`
- files:
  - `Frontend/src/app/login/page.tsx`
- changes:
  - 배경/타이포/카피 한글화
  - 기존 인증 로직 유지
- verify:
  - `로그인 페이지 렌더 및 OAuth 진입 확인`
- acceptance_criteria:
  - `디자인 일관성 + 기능 회귀 없음`
- status: `todo`

## Verification Baseline
- `cd Frontend && npm run build`
- `cd Backend && python -m compileall app`
