# Open Issues

Last Updated: 2026-02-14

## High
- 이슈: `Google OAuth provider` 신규 Supabase 프로젝트 재설정 미완료.
- 원인: 콘솔 수동 작업 대기.
- 다음 액션: Supabase Authentication > Providers에서 Google 재설정 후 callback 점검.
- 소유자: Product/Dev

## High
- 이슈: Supabase Storage `dog-profiles` 버킷 생성 및 RLS 정책 설정 미완료.
- 원인: SQL 스크립트 작성 완료, 수동 실행 대기 중.
- 다음 액션:
  1. Supabase Dashboard → SQL Editor 접속
  2. `Backend/migrations/create_dog_profiles_bucket.sql` 실행
  3. `Backend/migrations/fix_dog_profiles_rls.sql` 실행
  4. Survey 사진 업로드 테스트
- 소유자: Dev/Ops
- 참고: `.agent/ai-context/supabase-storage-setup.md`

## High
- 이슈: 설정 페이지가 mock 상태로 남아 있어 실제 사용자 데이터와 분리됨.
- 원인: API 연동 작업 미적용.
- 다음 액션: `SETTINGS-API-005` 수행.
- 소유자: Dev
- 상태: 부분 완료 (강아지 프로필 API 연동 완료, 나머지 설정 항목 대기)

## Medium
- 이슈: 공모전 데모용 전체 해금 기준이 코드에 고정되지 않음.
- 원인: env 플래그/해금 범위 미구현.
- 다음 액션: `SUB-UNLOCK-006` 수행 (`false` 기본, 코칭/추천/잠금 UI만 해금).
- 소유자: Dev

## Medium
- 이슈: 카카오 연동은 사업자 등록 전이라 실OAuth/실발송 불가.
- 원인: 외부 요건 미충족.
- 다음 액션: `SETTINGS-KAKAO-007` 수행(준비중 배지+비활성 토글+고정 안내문구).
- 소유자: Dev

## Low
- 이슈: Frontend E2E 자동화 미완료 (Playwright/Cypress).
- 원인: 기능 안정화 우선.
- 다음 액션: 현재 티켓 완료 후 시나리오 자동화 착수.
- 소유자: Dev
