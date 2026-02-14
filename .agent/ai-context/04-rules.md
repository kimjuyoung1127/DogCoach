# Engineering Rules

Last Updated: 2026-02-14

## Runbook
- Frontend:
  - `cd Frontend`
  - `npm install`
  - `npm run dev`
  - `npm run build`
- Backend:
  - `cd Backend`
  - `python -m venv venv`
  - `./venv/Scripts/activate`
  - `pip install -r requirements.txt`
  - `python -m uvicorn app.main:app --reload`
  - `python -m compileall app`

## Core Coding Rules
- Frontend Query Key는 `QUERY_KEYS` 팩토리만 사용.
- mutation 후 무효화는 대상 key만 정밀 invalidation.
- canonical route는 `/survey`만 사용 (`/Survey`, `/checkup` 금지).
- Backend는 Router/Service/Repository 계층 분리 준수.
- 모든 엔드포인트는 소유권/권한 검증 포함.
- `X-Timezone` 헤더 기반 시간 집계 일관성 유지.

## Security Rules
- `POST /auth/migrate-guest`는 멱등 동작 보장.
- dog/log/coach 엔드포인트는 소유권 검증 필수.
- 비구독자 잠금 모드에서 실제 솔루션 데이터 DOM 노출 금지.
- `.env` 계열 파일 커밋 금지.

## Review Rubric
- 우선순위: 동작 회귀 > 데이터 정합성 > 보안/권한 > 성능 회귀 > 테스트 누락.
- 심각도:
  - `critical`: 데이터 유출/권한 우회/핵심 플로우 완전 차단
  - `high`: 핵심 기능 오동작
  - `medium`: 성능/모바일/엣지 케이스
  - `low`: 문구/UI/리팩터링
- 머지 기준: `critical`, `high` 0개.

## Encoding Rules
- 모든 코드/문서 UTF-8 + LF.
- ANSI/EUC-KR/CP949 저장 금지.
- 로그/핸드오프에 아래 문구 포함:
  - `Encoding check: UTF-8 + LF verified for changed files.`

## Quick Check Commands
- `rg -n "/Survey|/checkup|TODO|FIXME" Frontend/src docs -S`
- `rg -n "invalidateQueries|queryKey|useQuery|useMutation" Frontend/src -S`
- `rg -n "auth/callback|getSession|signInWithOAuth|migrate-guest" Frontend/src Backend/app -S`
- `cd Frontend && npm run build`
- `cd Backend && python -m compileall app`
