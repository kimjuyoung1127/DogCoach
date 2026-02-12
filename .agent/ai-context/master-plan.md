# TailLog Master Plan

기준일: 2026-02-12 (KST) — Sprint 완료 반영
프로젝트: TailLog
협업 폴더: `.agent/ai-context`

## 1) 시작 문서 순서
1. `.agent/ai-context/START-HERE.md`
2. `.agent/ai-context/master-plan.md`
3. `.agent/ai-context/project-context.md`
4. `.agent/ai-context/claude-coding-guideline.md`
5. `.agent/ai-context/codex-review-guideline.md`
6. `.agent/ai-context/encoding-guideline.md`
7. `.agent/ai-context/logs`의 최신 session log

## 2) Source of Truth 문서
1. `docs/README.md`
2. `docs/Structure.md`
3. `docs/schema.md`
4. `docs/Plan.md`
5. `docs/SurveyPlan.md`
6. `docs/ResultIntegrationPlan.md`
7. `docs/backend.md`

## 3) 실행 기본 경로
- Frontend 실행:
  1. `cd Frontend`
  2. `npm install`
  3. `npm run dev`
- Backend 실행:
  1. `cd Backend`
  2. `python -m venv venv`
  3. `./venv/Scripts/activate` (Windows)
  4. `pip install -r requirements.txt`
  5. `python -m uvicorn app.main:app --reload`

## 4) 단계별 백로그
### 완료
1. 기반 구축(DB/보안/모델)
2. 온보딩(설문, 게스트/유저 인증)
3. 핵심 루프(로그, 대시보드, timezone)
4. 분석 시각화 및 PDF 리포트
5. UI 구조화/TanStack Query 고도화
6. **데이터 정합성/보안/성능 Sprint (2026-02-12 완료)**
   - guest→user 마이그레이션 (`POST /auth/migrate-guest`)
   - dog 소유권 검증 (log/coach 엔드포인트)
   - timezone 일관성 (`X-Timezone` → `ZoneInfo` 변환)
   - 캐시 정밀 invalidation (`QUERY_KEYS.logs(dogId)`)
   - Result 페이지 보안 강화 (`debugForcePro` 제거)
   - Supabase DB 스키마 전체 복원 (11 테이블, 7 트리거, RLS)
7. **AI Recommendation 정책 고도화 (2026-02-12 완료)**
   - Admin 전용 비용 조회 엔드포인트 (`GET /cost-status`)
   - Feedback Action Enum 및 window_days 제약 (`7/15/30`)
   - 스냅샷 소유권/존재 여부 검증 강화

### 진행
1. AI 코칭 고도화(RAG 준비)
2. AI 비용 최적화(요약/임베딩 전략)
3. 예산 대시보드 (Budget Dashboard) 인프라
4. Recommendation UX 정교화

### 다음
1. E2E 테스트 (게스트→로그인→마이그레이션 플로우)
2. PWA 오프라인 고도화
3. 충돌 해결 정책(오프라인 기록 동기화)
4. 대용량 알림 큐 설계

## 5) 우선순위 실행 순서
1. ~~데이터 정합성(guest->user 이전, timezone)~~ ✅ 완료
2. ~~보안/권한(구독 분기, 데이터 가시성, RLS 가정 검증)~~ ✅ 완료
3. ~~성능/캐시 안정화(대시보드/로그)~~ ✅ 완료
4. AI 고도화(RAG + 비용 최적화) ← 다음 우선순위
5. 배포/운영 안정화(PWA, 알림)

## 6) 완료 보고 템플릿
- 변경 요약:
  1. 파일/기능
  2. 핵심 로직
  3. 영향 범위
- 검증:
  1. 실행 명령
  2. 결과(성공/실패 + 핵심 로그)
- 리스크:
  1. 오픈 이슈
  2. 다음 작업
