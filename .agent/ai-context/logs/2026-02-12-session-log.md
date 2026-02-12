### [2026-02-12 13:10 KST] TailLog ai-context 리템플릿 초기화
- 목표:
  - `.agent/ai-context`를 TailLog 기준 템플릿으로 전면 교체
- 범위:
  - `.agent/ai-context` 문서 세트 전체(템플릿/가이드/handoff/log)
- 변경 파일:
  - `.agent/ai-context/*.md` - 타 프로젝트 문맥 제거 및 TailLog 기준 재정의
  - `.agent/ai-context/logs/*.md` - 로그 운영 템플릿 재정의 및 초기화
- 검증 명령:
  - `rg -n "GameLab|smart-spectro-tagging|음향|spectro" .agent/ai-context`
- 결과:
  - TailLog 기준 초기화 완료 (기존 타 프로젝트 로그/문맥 제거)
- 커밋:
  - (미커밋)
- 다음 작업:
  1. 신규 작업부터 TailLog 템플릿으로 로그 누적
  2. 마일스톤 종료 시 worklog/review-log/master-plan 반영

---

### [2026-02-12 세션] Supabase 프로젝트 마이그레이션 + MCP 서버 설정

#### 배경
- 기존 Supabase 프로젝트가 **인도 뭄바이(ap-south-1)** 리전 → 한국 서비스 기준 레이턴시 문제
- 무료 플랜 제한으로 정지 후 새로 만들기 불가 → **삭제 후 재생성**
- 테이블 내부에 가치 있는 데이터 없음, 테이블 구조만 보존 필요

#### 변경 전 (삭제됨)
| 항목 | 값 |
|------|-----|
| Project URL | `https://twgrykfzuslbccfxwzvq.supabase.co` |
| Project ID | `twgrykfzuslbccfxwzvq` |
| Region | ap-south-1 (인도 뭄바이) |

#### 변경 후 (새 프로젝트)
| 항목 | 값 |
|------|-----|
| Project URL | `https://kvknerzsqgmmdmyxlorl.supabase.co` |
| Project ID | `kvknerzsqgmmdmyxlorl` |
| Region | 사용자 선택 리전 (서울 추정) |
| Pooler Host | `aws-0-ap-northeast-2.pooler.supabase.com:6543` |

#### 수행 작업

**1. 테이블 구조 SQL 백업**
- 파일: `Backend/supabase_schema.sql`
- `Backend/app/shared/models.py` 기반 완전한 DDL 생성
- 포함: 7 Enum, 11 테이블, 인덱스, RLS 정책, updated_at 트리거

**2. MCP 서버 설정**
- 파일: `.claude/mcp.json`
- `@supabase/mcp-server-supabase` + PAT 토큰
- Claude Code 재시작 시 자동 연결

**3. 환경변수 파일**
| 파일 | 상태 | 내용 |
|------|------|------|
| `Frontend/.env.local` | 신규 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `Backend/.env` | 신규 | `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`(service_role), 기타 |
| `Backend/.env.example` | 수정 | 새 프로젝트 기준 예시 |

#### 남은 작업 (TODO)
1. ~~테이블 구조 복원~~ ✅ Management API로 11 테이블 + 7 Enum + RLS + 인덱스 + 트리거 전부 생성 완료
2. Google OAuth 재설정: 새 프로젝트에서 Authentication > Providers > Google 재설정 (수동 대기)
3. ~~`.gitignore` 확인~~ ✅ `.env`, `.env.local` 포함 확인됨
4. ~~인덱스 추가~~ ✅ `idx_dogs_anonymous_sid` Management API로 생성 완료
5. `Backend/.env` credential 교체 (수동 대기)

#### 테이블 구조 ER 요약
```
Users
  ├─ Subscriptions (1:1)
  ├─ UserSettings (1:1)
  ├─ NotiHistory (1:N)
  └─ Dogs (1:N)
      ├─ DogEnv (1:1)
      ├─ BehaviorLogs (1:N)
      │   └─ MediaAssets (1:N)
      ├─ AICoaching (1:N)
      │   └─ ActionTracker (1:N)
      └─ LogSummaries (1:N)
```

---

### [2026-02-12 세션] Sprint: 데이터 정합성/보안/성능 안정화

#### 목표
- Sprint Handoff(2026-02-11) 4가지 핵심 과제 해결
- guest→user 데이터 이전, 소유권 검증, timezone 일관성, 캐시 정합성

#### 변경 파일

**Backend (신규)**
- `Backend/app/shared/utils/ownership.py` - 공유 dog 소유권 검증 유틸리티

**Backend (수정)**
- `Backend/app/shared/models.py` - `Dog.anonymous_sid`에 인덱스 추가
- `Backend/app/features/auth/schemas.py` - `MigrateGuestResponse` 스키마 추가
- `Backend/app/features/auth/repository.py` - `find_guest_dogs`, `claim_dogs_for_user` 추가
- `Backend/app/features/auth/service.py` - `migrate_guest_data` 비즈니스 로직 추가
- `Backend/app/features/auth/router.py` - `POST /auth/migrate-guest` 엔드포인트 추가
- `Backend/app/features/log/router.py` - 모든 엔드포인트에 dog 소유권 검증 추가
- `Backend/app/features/coach/router.py` - 코칭 생성에 dog 소유권 검증 추가
- `Backend/app/features/dashboard/router.py` - `X-Timezone` 헤더를 service에 전달
- `Backend/app/features/dashboard/service.py` - streak/age 계산에 사용자 TZ 적용

**Frontend (수정)**
- `Frontend/src/app/(public)/result/page.tsx` - `debugForcePro` 완전 제거 (보안)
- `Frontend/src/hooks/useQueries.ts` - `useUpdateLog`에 dogId 추가, `useSubmitSurvey`에 캐시 무효화 추가
- `Frontend/src/hooks/useAuth.ts` - 로그인 시 `POST /auth/migrate-guest` 자동 호출
- `Frontend/src/components/features/dashboard/EditLogDialog.tsx` - `dogId` prop 추가
- `Frontend/src/app/(app)/dashboard/page.tsx` - `EditLogDialog`에 `dogId` 전달

#### 검증 명령
- `cd Backend && python -m compileall app` → ✅ 성공
- `cd Frontend && npm run build` → ✅ 성공 (12/12 pages)

#### 결과
- 15개 파일 수정/생성, Backend + Frontend 빌드 모두 통과

#### 다음 작업
1. ~~Supabase 인덱스 실행~~ ✅ Management API로 완료
2. E2E 테스트: 게스트 설문 → 로그인 → 마이그레이션 동작 확인 (대기)
3. 소유권 검증 후 기존 API 호출 정상 동작 확인 (대기)

---

### [2026-02-12 세션] Supabase DB 스키마 전체 복원

#### 배경
- 신규 Supabase 프로젝트(kvknerzsqgmmdmyxlorl)에 테이블이 없는 빈 상태
- `Backend/supabase_schema.sql` 기반으로 Management API를 통해 복원

#### 수행 내용 (Supabase Management API)
1. `uuid-ossp` Extension 활성화
2. 7개 Enum 타입 생성: `user_role_enum`, `subscription_plan_enum`, `gender_enum`, `neuter_status_enum`, `log_category_enum`, `coaching_status_enum`, `noti_type_enum`
3. 11개 테이블 생성: `users`, `subscriptions`, `dogs`, `dog_env`, `behavior_logs`, `media_assets`, `ai_coaching`, `action_tracker`, `noti_history`, `log_summaries`, `user_settings`
4. 11개 테이블 RLS 활성화 + service_role 전체 접근 정책 + 유저별 읽기 정책
5. `update_updated_at_column()` trigger 함수 + 7개 테이블 트리거 생성
6. `idx_dogs_anonymous_sid` 인덱스 생성

#### 기술 이슈
- Windows shell에서 curl로 `$$` dollar-quoting 전달 시 PID로 치환되는 문제 발생
- 해결: Python `urllib.request`로 우회 + `$tg$` named dollar-quoting 사용

#### 검증
- `SELECT count(*) FROM information_schema.tables WHERE table_schema='public'` → 11
- `SELECT trigger_name FROM information_schema.triggers WHERE trigger_schema='public'` → 7개 확인

---

### [2026-02-12 세션] 협업문서 정리 (Codex 리뷰 대비)

#### 목표
- Sprint 완료 후 모든 협업문서를 Codex 리뷰 에이전트가 검증할 수 있도록 구조화

#### 업데이트 파일
- `review-log.md` - Codex 검증용 체크리스트 + 변경 파일 매트릭스 + AC 매핑 테이블 작성
- `worklog.md` - Supabase 인프라 복원 로그 추가 + 기존 작업 상태 업데이트
- `sprint-handoff-2026-02-11.md` - 4개 AC 모두 ✅ 완료 표시 + 잔여 수동 작업 명시
- `logs/2026-02-12-session-log.md` - DB 복원/트리거 생성/문서 정리 세션 추가

---

### [2026-02-12 세션] 오늘 마감 정리 + 내일 이어서 작업 준비

#### 목표
- 비개발자 데모를 위한 프론트 단독 배포 가능 상태 확보
- 백엔드 실행 오류(`psycopg2`, `supabase`, `pytz`) 해결
- 내일 재개 시 혼선 없도록 협업문서 최신화

#### 수행 내용
1. Frontend 빌드 실패 원인(누락 `src/lib/*`) 복구
   - 신규 파일: `api.ts`, `supabase.ts`, `query-client.ts`, `query-keys.ts`, `localization.ts`, `hangulUtils.ts`
   - `coach/page.tsx`의 `useSearchParams` 제거로 Next.js prerender 오류 해결
2. Backend 실행 환경 복구
   - `python -m venv venv` 생성
   - `pip install -r requirements.txt`
   - `DATABASE_URL`을 `postgresql+asyncpg://`로 수정 (`@` URL 인코딩 반영)
   - 누락 패키지(`supabase`, `pytz`) 설치 + requirements 반영
3. Git 푸시 계정/원격 확인
   - origin: `https://github.com/kimjuyoung1127/DogCoach.git`
   - 로컬 user: `kimjuyoung1127 / kimjuyoung1127@users.noreply.github.com`

#### 검증 결과
- `cd Frontend && npm run build` → ✅ 성공 (12/12 pages)
- `cd Backend && .\\venv\\Scripts\\python -c "import app.main; print('APP_IMPORT_OK')"` → ✅ 성공
- `cd Backend && .\\venv\\Scripts\\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000` → 앱 시작 성공, 단 포트 충돌 확인

#### 내일 시작 체크
1. 백엔드 실행: `python -m uvicorn app.main:app --reload --port 8001`
2. Supabase Google OAuth Provider 설정 완료
3. E2E 플로우(게스트→로그인→마이그레이션→대시보드) 재검증

---

### [2026-02-12 세션] 모바일 UX/카카오 썸네일 정리 + 배포 문서 업데이트

#### 목표
- 모바일 좌우 스크롤(멀미 유발) 제거
- 카카오 링크 썸네일을 TailLog 주제에 맞게 교체
- 내일 협업자가 그대로 실행할 수 있도록 배포 문서 갱신

#### 수행 내용
1. 모바일 오버플로 완화
   - `globals.css`에 `html, body { overflow-x: hidden; }`
   - `PremiumBackground`, `SurveyContainer`, `SurveyLoading`의 대형 블롭을 모바일에서 축소
   - `BarkingHeatmap`의 `min-w` 제거(`min-w-0`) 및 모바일 간격 축소
2. OG 썸네일 구성
   - `Frontend/public/og/taillog-share.png` 신규 생성(1200x630)
   - `layout.tsx` + 랜딩 `page.tsx`에 `openGraph.images`/`twitter.images` 연결
   - `metadataBase` 추가
3. 배포/검증 문서화
   - `docs/deploy.md`에 OG 경로/규격/카카오 캐시 재수집 절차 추가

#### 검증 결과
- `cd Frontend && npm run build` → ✅ 성공 (12/12 pages)

#### 다음 작업
1. Vercel 재배포
2. 카카오 디버거 재수집
3. 카톡 공유 링크 썸네일 최종 확인

---

### [2026-02-12 세션] Phase 7 마감: 시계열 스냅샷 비교(개선/악화/유지) 반영

#### 목표
- 한 시점 스냅샷과 나중 시점 스냅샷을 비교해 행동 변화 추세를 판단할 수 있도록 구현

#### 수행 내용
1. Backend 스냅샷 누적 저장으로 전환
   - 기존 curriculum 단일 스냅샷 제약 제거
2. 비교 스키마/서비스/엔드포인트 추가
   - `GET /api/v1/coach/behavior-snapshot/compare?dog_id=...&curriculum_id=...`
   - 지표: `avg_intensity`, `log_frequency_per_week`, `overall_trend`
3. 다견 사용자 오조회 방지
   - snapshot 조회에 `dog_id` 조건 포함
4. Supabase SQL 반영안 추가
   - unique index 제거 + 조회/시간 인덱스 추가

#### 변경 파일
- `Backend/app/shared/models.py`
- `Backend/app/features/coach/schemas.py`
- `Backend/app/features/coach/service.py`
- `Backend/app/features/coach/router.py`
- `Backend/supabase_schema.sql`
- `Frontend/src/hooks/useQueries.ts`
- `.agent/ai-context/phase7-ai-recommendation-plan.md`
- `.agent/ai-context/ay-close-checklist.md`

#### 검증
- `cd Backend && python -m compileall app` -> success
- `cd Frontend && npm run build` -> success

#### 내일 첫 작업
1. Supabase SQL editor에 snapshot index migration 적용
2. Render backend 재시작
3. 스모크 테스트:
   - 로그인 -> 로그 페이지
   - 훈련 시작(스냅샷 1 생성)
   - 추가 스냅샷 생성 후 compare endpoint 확인
