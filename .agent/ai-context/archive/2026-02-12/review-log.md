# 리뷰 로그 (TailLog)

기준 폴더: `.agent/ai-context`
기준 시간: KST

## 작성 규칙
- 오픈 이슈는 심각도 순으로 기록: 치명적 -> 높음 -> 보통 -> 낮음
- 형식: `[심각도] 파일:라인 - 문제 - 영향 - 수정 제안 - 검증 방법`
- 해결된 이슈는 `해결됨` 섹션으로 분리
- 리뷰 결론(머지 가능/조건부/불가)을 명시

## 템플릿
### [YYYY-MM-DD HH:mm KST] 리뷰 대상
- 범위:
- 전체 위험도:
- 최종 판단:

#### 해결됨
- [해결됨] `파일:라인` - 해결 내용 - 근거 커밋

#### 오픈 이슈
- [치명적] `파일:라인` - 문제 - 영향 - 수정 제안 - 검증 방법
- [높음] `파일:라인` - 문제 - 영향 - 수정 제안 - 검증 방법
- [보통] `파일:라인` - 문제 - 영향 - 수정 제안 - 검증 방법
- [낮음] `파일:라인` - 문제 - 영향 - 수정 제안 - 검증 방법

## 기록

### [2026-02-12] Sprint: 데이터 정합성/보안/성능 안정화
- 범위: Backend 9파일 + Frontend 6파일 (총 15파일)
- 전체 위험도: 보통
- 최종 판단: **조건부 머지 가능** (아래 오픈 이슈 해결 후)

#### 해결됨
- [해결됨] `Frontend/src/app/(public)/result/page.tsx` - `debugForcePro` state로 비구독자가 Pro 컨텐츠 접근 가능 - 완전 제거, `isPro = userRole === 'PRO_USER'`로 단순화
- [해결됨] `Backend/app/features/log/router.py` - dog 소유권 미검증 → 타인 dog에 로그 생성/조회/수정 가능 - `verify_dog_ownership()` 추가 (create:L22, read:L37, update:L53)
- [해결됨] `Backend/app/features/coach/router.py` - dog 소유권 미검증 → 타인 dog에 코칭 생성 가능 - `verify_dog_ownership()` 추가 (L20)
- [해결됨] `Backend/app/features/dashboard/service.py` - `date.today()` 사용 → 서버 TZ 기준 streak 계산 오류 - `get_today_with_timezone(timezone_str)` + `ZoneInfo` 변환 적용
- [해결됨] `Frontend/src/hooks/useQueries.ts` - `useUpdateLog`가 `['logs']` wildcard invalidation → 전체 로그 캐시 무효화 - `QUERY_KEYS.logs(dogId)` 정밀 invalidation으로 변경
- [해결됨] guest→user 데이터 이전 로직 부재 → 게스트 설문 데이터 유실 - `POST /auth/migrate-guest` 엔드포인트 + Frontend `useAuth.ts` 자동 호출 구현
- [해결됨] `Backend/app/shared/models.py:117` - `anonymous_sid` 컬럼 인덱스 없음 → 게스트 조회 풀스캔 - `index=True` 추가 + Supabase에 인덱스 생성 완료
- [해결됨] Supabase DB 스키마 복원 - 11 테이블, 7 Enum, RLS, 트리거, 인덱스 전부 생성 완료

#### 오픈 이슈
- [보통] `Backend/.env` - DB 비밀번호/JWT Secret/OpenAI API Key가 플레이스홀더 상태 - 배포 전 실제 값으로 교체 필요 - 검증: `grep 'YOUR_' Backend/.env`
- [보통] Supabase Google OAuth - 새 프로젝트에서 미설정 - Supabase Dashboard > Authentication > Providers > Google에서 수동 설정 필요
- [낮음] `Backend/app/features/auth/router.py:21` - `migrate-guest` 엔드포인트의 E2E 테스트 미작성 - 게스트 설문 → 로그인 → 마이그레이션 플로우 수동 검증 필요
- [낮음] `Backend/app/features/dashboard/service.py` - `ZoneInfo`에 잘못된 timezone 문자열 전달 시 예외 - 프론트에서 `Intl.DateTimeFormat().resolvedOptions().timeZone` 사용하므로 실질적 위험 낮음

#### 검증 결과
- `cd Backend && python -m compileall app` → ✅ 성공
- `cd Frontend && npm run build` → ✅ 성공 (12/12 pages)

#### Codex 리뷰 체크리스트
| # | 수용 기준 | 상태 | 검증 포인트 |
|---|----------|------|-----------|
| AC-1 | guest→user 전환 후 데이터 1회만 정확히 이전 | ✅ 구현됨 | `claim_dogs_for_user`의 `WHERE user_id IS NULL` 멱등성 보장 |
| AC-2 | 비구독자 상세 솔루션 DOM 미노출 | ✅ 구현됨 | `debugForcePro` 제거, `LockedAnalysisSection` skeleton만 렌더링 |
| AC-3 | timezone 적용 집계 일관성 | ✅ 구현됨 | `X-Timezone` → `get_today_with_timezone()` + `ZoneInfo` 변환 |
| AC-4 | stale 데이터 미잔존 | ✅ 구현됨 | `QUERY_KEYS.logs(dogId)` 정밀 invalidation + survey 후 dashboard 갱신 |

#### 변경 파일 매트릭스 (Codex 검증용)
```
Backend (신규 1 + 수정 8)
├─ shared/utils/ownership.py          [신규] dog 소유권 검증 공유 유틸
├─ shared/models.py:117               [수정] anonymous_sid 인덱스
├─ features/auth/schemas.py:33        [수정] MigrateGuestResponse
├─ features/auth/repository.py:23,34  [수정] find_guest_dogs, claim_dogs_for_user
├─ features/auth/service.py:31        [수정] migrate_guest_data
├─ features/auth/router.py:21         [수정] POST /migrate-guest
├─ features/log/router.py:8,22,37,53  [수정] 전 엔드포인트 소유권 검증
├─ features/coach/router.py:7,20      [수정] 코칭 생성 소유권 검증
├─ features/dashboard/router.py:51    [수정] X-Timezone 전달
└─ features/dashboard/service.py:11   [수정] timezone_str 적용

Frontend (수정 5)
├─ app/(public)/result/page.tsx       [수정] debugForcePro 완전 제거
├─ hooks/useAuth.ts:60-71             [수정] 로그인 시 마이그레이션 자동 호출
├─ hooks/useQueries.ts:97,114         [수정] dogId 정밀 invalidation + survey 캐시
├─ components/.../EditLogDialog.tsx    [수정] dogId prop 추가
└─ app/(app)/dashboard/page.tsx:96    [수정] dogId prop 전달

Supabase (인프라)
├─ 11 테이블 생성 (supabase_schema.sql 기반)
├─ 7 Enum 타입 생성
├─ RLS 활성화 + service_role/user 정책
├─ 7 updated_at 트리거 생성
└─ anonymous_sid 인덱스 생성
```

### [2026-02-12] 데모 배포 전 점검 (Frontend-only + Backend boot)
- 범위: `Frontend/src/lib/*`, `Frontend/src/app/(app)/coach/page.tsx`, `Frontend/src/hooks/useAuth.ts`, `Backend/.env`, `Backend/requirements.txt`, `.gitignore`
- 전체 위험도: 보통
- 최종 판단: **조건부 머지 가능** (OAuth 및 운영 환경변수 수동 설정 필요)

#### 해결됨
- [해결됨] `Frontend/src/lib/*` - 누락 모듈로 인해 빌드 불가(`@/lib/api`, `@/lib/supabase`, `@/lib/query-client`, `@/lib/query-keys`, `@/lib/localization`, `@/lib/hangulUtils`) - 전부 추가되어 `npm run build` 통과
- [해결됨] `Frontend/src/app/(app)/coach/page.tsx` - `useSearchParams`로 인한 prerender 실패 - 브라우저 `URLSearchParams` 기반으로 전환
- [해결됨] `Backend/.env` - `postgresql://` 스킴으로 `psycopg2` 의존 발생 - `postgresql+asyncpg://`로 정정
- [해결됨] `Backend` 런타임 의존성 누락 - `supabase`, `pytz` 설치 및 `requirements.txt` 반영

#### 오픈 이슈
- [보통] `Backend/.env` - 실제 운영 키(`SECRET_KEY`, `OPENAI_API_KEY`) 플레이스홀더 상태 - 배포 전 실값 교체 필요
- [낮음] `127.0.0.1:8000` 포트 점유 - 로컬 기동 시 `--port 8001` 사용 또는 점유 프로세스 정리 필요

### [2026-02-12] 모바일 스크롤/OG 썸네일 점검
- 범위: `Frontend/src/styles/globals.css`, `Frontend/src/components/shared/ui/PremiumBackground.tsx`, `Frontend/src/components/features/survey/*`, `Frontend/src/components/features/result/BarkingHeatmap.tsx`, `Frontend/src/app/layout.tsx`, `Frontend/src/app/(public)/page.tsx`, `Frontend/public/og/taillog-share.png`, `docs/deploy.md`
- 전체 위험도: 낮음
- 최종 판단: **머지 가능**

#### 해결됨
- [해결됨] 모바일 가로 스크롤로 인한 멀미 - `html/body overflow-x hidden` + 블롭/최소폭 요소 반응형 축소 적용
- [해결됨] 카카오 공유 썸네일 불일치 - TailLog 전용 OG 이미지 추가 및 메타(`openGraph`, `twitter`) 연동
- [해결됨] 배포 시 재현 절차 부재 - `docs/deploy.md`에 OG 경로/규격/카카오 캐시 갱신 절차 문서화

#### 오픈 이슈
- [낮음] 실제 카카오톡 앱 캐시 반영 시간은 환경별 편차가 있음 - 재수집 후 확인 필요
