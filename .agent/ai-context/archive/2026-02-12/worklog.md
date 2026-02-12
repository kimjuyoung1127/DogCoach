# 작업 로그 (TailLog)

기준 폴더: `.agent/ai-context`
기준 시간: KST

## 작성 규칙
- 작업 1건당 로그 1개
- 포맷: 목표 / 범위 / 변경 파일 / 검증 명령 / 결과 / 다음 작업
- 커밋 ID와 작업 항목 1:1 매핑

## 템플릿
### [YYYY-MM-DD HH:mm KST] 작업 제목
- 목표:
- 범위:
- 변경 파일:
  - `경로` - 변경 이유
- 검증 명령:
- 결과:
- 커밋:
- 다음 작업:
  1.
  2.

## 기록

### [2026-02-12] Supabase 프로젝트 마이그레이션 + MCP 서버 설정
- 목표: 인도 뭄바이 리전 Supabase 삭제 → 신규 리전 재생성 + MCP 연동
- 범위: Supabase 인프라, 환경변수, MCP 설정
- 변경 파일:
  - `Backend/supabase_schema.sql` - 신규: 전체 DDL 백업 (11 테이블, 7 Enum, RLS, 트리거)
  - `.claude/mcp.json` - 신규: Supabase MCP 서버 설정
  - `Frontend/.env.local` - 신규: Frontend Supabase 환경변수
  - `Backend/.env` - 신규: Backend 전체 환경변수
  - `Backend/.env.example` - 수정: 새 프로젝트 기준 예시
  - `.agent/ai-context/project-context.md` - 수정: Supabase 프로젝트 정보 업데이트
  - `.agent/ai-context/logs/2026-02-12-session-log.md` - 수정: 세션 로그 추가
- 검증 명령: Claude Code 재시작 후 MCP 연결 확인
- 결과: 환경변수 설정 완료, SQL 백업 완료, MCP 설정 완료
- 커밋: (미커밋)
- 다음 작업:
  1. ~~Supabase SQL Editor에서 `Backend/supabase_schema.sql` 실행~~ ✅ Management API로 완료
  2. `Backend/.env`에서 DB 비밀번호/JWT Secret/OpenAI 키 수동 교체 (대기)
  3. Google OAuth 재설정 — Supabase Dashboard UI에서 수동 설정 필요 (대기)

### [2026-02-12] Sprint: 데이터 정합성/보안/성능 안정화
- 목표: Sprint Handoff 4대 과제 해결 (guest→user 이전, 소유권 검증, TZ 일관성, 캐시 정합성)
- 범위: Backend auth/log/coach/dashboard + Frontend result/useAuth/useQueries
- 변경 파일:
  - `Backend/app/shared/utils/ownership.py` - 신규: 공유 dog 소유권 검증
  - `Backend/app/shared/models.py` - 수정: `anonymous_sid` 인덱스 추가
  - `Backend/app/features/auth/*` - 수정: `POST /auth/migrate-guest` 엔드포인트 추가
  - `Backend/app/features/log/router.py` - 수정: 모든 엔드포인트 소유권 검증
  - `Backend/app/features/coach/router.py` - 수정: 코칭 생성 소유권 검증
  - `Backend/app/features/dashboard/router.py` - 수정: X-Timezone 전달
  - `Backend/app/features/dashboard/service.py` - 수정: streak/age에 사용자 TZ 적용
  - `Frontend/src/app/(public)/result/page.tsx` - 수정: debugForcePro 제거
  - `Frontend/src/hooks/useAuth.ts` - 수정: 로그인 시 마이그레이션 호출
  - `Frontend/src/hooks/useQueries.ts` - 수정: useUpdateLog dogId 추가, useSubmitSurvey 캐시 무효화
  - `Frontend/src/components/features/dashboard/EditLogDialog.tsx` - 수정: dogId prop 추가
  - `Frontend/src/app/(app)/dashboard/page.tsx` - 수정: dogId prop 전달
- 검증 명령: `cd Backend && python -m compileall app` + `cd Frontend && npm run build`
- 결과: 모두 성공 (15파일 수정/생성)
- 커밋: (미커밋)
- 다음 작업:
  1. ~~Supabase 인덱스 생성~~ ✅ Management API로 완료
  2. E2E: 게스트 설문 → 로그인 → 마이그레이션 동작 확인 (대기)

### [2026-02-12] Supabase DB 스키마 복원 + 트리거 생성
- 목표: 신규 Supabase 프로젝트에 전체 테이블/인덱스/RLS/트리거 복원
- 범위: Supabase Management API (코드 변경 없음)
- 수행 내용:
  - `uuid-ossp` Extension 생성
  - 7개 Enum 타입 생성 (`user_role_enum`, `subscription_plan_enum` 등)
  - 11개 테이블 생성 (users, subscriptions, dogs, dog_env, behavior_logs 등)
  - 11개 테이블 RLS 활성화
  - service_role 전체 접근 + 유저별 읽기 정책 생성
  - `update_updated_at_column()` 함수 + 7개 트리거 생성
  - `idx_dogs_anonymous_sid` 인덱스 생성
- 검증 명령: `SELECT count(*) FROM information_schema.tables WHERE table_schema='public'` → 11
- 결과: ✅ 전부 성공
- 커밋: 인프라 작업 (코드 커밋 해당 없음)
- 다음 작업:
  1. `Backend/.env` 실제 credential 교체
  2. Google OAuth 설정 (Supabase Dashboard)

### [2026-02-12] 프론트 단독 데모 배포 준비 + 백엔드 실행 복구
- 목표: 오늘 데모를 위한 프론트 단독 배포 가능 상태 확보 및 로컬 백엔드 기동 오류 해결
- 범위: Frontend 빌드 실패 복구, Backend 가상환경/의존성 정리, Git push 대상 정리
- 변경 파일:
  - `Frontend/src/lib/*` - 누락된 API/Auth/Query 유틸 모듈 신규 추가(`api.ts`, `supabase.ts`, `query-client.ts`, `query-keys.ts`, `localization.ts`, `hangulUtils.ts`)
  - `Frontend/src/app/(app)/coach/page.tsx` - `useSearchParams` 빌드 제약 제거
  - `Frontend/src/hooks/useAuth.ts` - 타입 명시 보강
  - `.gitignore` - `Frontend/src/lib/*.ts` 추적 예외 규칙 추가
  - `Backend/.env` - `DATABASE_URL`을 `postgresql+asyncpg://`로 수정 (`@` 인코딩 포함)
  - `Backend/requirements.txt` - `supabase`, `pytz` 반영
- 검증 명령:
  - `cd Frontend && npm run build` → 성공 (12/12 pages)
  - `cd Backend && .\\venv\\Scripts\\python -c "import app.main; print('APP_IMPORT_OK')"` → 성공
  - `cd Backend && .\\venv\\Scripts\\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000` → 앱 시작 성공, 단 8000 포트 충돌 확인
- 결과: 프론트 단독 Vercel 배포 가능 상태 확보, 백엔드 psycopg2/supabase/pytz 오류 해결
- 커밋: (예정)
- 다음 작업:
  1. `python -m uvicorn app.main:app --reload --port 8001`로 로컬 백엔드 기동
  2. Google OAuth Provider 설정 완료 후 E2E 로그인 플로우 검증

### [2026-02-12] Vercel 배포 전 빌드 에러 수정
- 목표: `npm run build` TypeScript 에러 해결 → Vercel 배포 가능 상태 확보
- 범위: Frontend 빌드 에러 3건 수정
- 변경 파일:
  - `Frontend/src/app/(app)/coach/page.tsx` - `MissionActionOverlay`에 누락된 `curriculumId` prop 추가
  - `Frontend/src/app/(public)/result/page.tsx` - `MissionActionOverlay`에 누락된 `curriculumId` prop 추가
  - `Frontend/src/app/(app)/log/page.tsx` - `apiClient.coach.analyze()` → `apiClient.post()` 변환
  - `Frontend/src/lib/api.ts` - `delete` 메서드 추가, `mockRequest`/`request` 타입에 `"DELETE"` 추가
- 검증 명령: `cd Frontend && npm run build`
- 결과: ✅ 성공 (12/12 pages)
- 커밋: (예정)
- 다음 작업:
  1. Git 커밋 & 푸시
  2. Vercel 프로젝트 설정 (Root: `Frontend`, 환경변수 2개)

### [2026-02-12] 모바일 가로 스크롤/카카오 썸네일 일관성 개선
- 목표: 모바일 좌우 스크롤 멀미 제거 + 카카오 공유 썸네일을 TailLog 주제에 맞게 교체
- 범위: Frontend 스타일/컴포넌트/메타데이터 + 배포 문서
- 변경 파일:
  - `Frontend/src/styles/globals.css` - `html, body` 가로 오버플로 차단
  - `Frontend/src/components/shared/ui/PremiumBackground.tsx` - 모바일 블롭 크기/오프셋/blur 축소
  - `Frontend/src/components/features/survey/SurveyContainer.tsx` - 배경 블롭 반응형 조정
  - `Frontend/src/components/features/survey/SurveyLoading.tsx` - 배경 블롭 반응형 조정
  - `Frontend/src/components/features/result/BarkingHeatmap.tsx` - `min-w-0`/모바일 gap 적용
  - `Frontend/src/app/layout.tsx` - `metadataBase`, `openGraph.images`, `twitter.images` 추가
  - `Frontend/src/app/(public)/page.tsx` - 랜딩 OG/Twitter 이미지 override 추가
  - `Frontend/public/og/taillog-share.png` - 신규 공유 썸네일 이미지(1200x630)
  - `docs/deploy.md` - OG 운영 및 카카오 캐시 갱신 절차 정리
- 검증 명령:
  - `cd Frontend && npm run build`
- 결과:
  - ✅ 성공 (12/12 pages)
- 커밋:
  - (예정)
- 다음 작업:
  1. Vercel 재배포
  2. 카카오 디버거 재수집 후 링크 썸네일 검증
