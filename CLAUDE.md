# TailLog (DogCoach) - Claude Code 프로젝트 가이드

개 행동 교정 SaaS. ABC(선행-행동-결과) 기록 → 데이터 시각화 → AI 코칭.

## 빌드 & 실행

```bash
# Frontend (Next.js 16, App Router)
cd Frontend && npm run dev        # 개발 서버
cd Frontend && npm run build      # 프로덕션 빌드 (12페이지 전체 검증)

# Backend (FastAPI, Python 3.10+)
cd Backend && python -m uvicorn app.main:app --reload
cd Backend && python -m pytest tests
```

## 아키텍처

### Backend 3-Layer (엄격 분리)
- **Router** → HTTP 관심사만 (status code, response)
- **Service** → 비즈니스 로직, 검증, 오케스트레이션
- **Repository** → 순수 DB 작업 (SELECT/INSERT/UPDATE)
- **역방향 호출 금지**: Repo ↛ Service, Service ↛ Router

### Frontend 구조
- `app/(public)/` 비인증 라우트 | `app/(app)/` 인증 라우트
- `components/features/` 기능별 컴포넌트 | `components/shared/` 공통 UI
- `hooks/` 커스텀 훅 | `lib/` 코어 유틸 (api.ts, query-keys.ts, supabase.ts)

## 코드 규칙

### Backend
- 모든 엔드포인트 **async** 필수
- 인증: `Depends(get_current_user_id)` 또는 `get_current_user_id_optional` (게스트)
- DB 세션: `Depends(get_db)` 사용, 수동 close() 금지
- Pydantic v2: `model_config = ConfigDict(from_attributes=True)`
- 라우터 prefix: `/api/v1/{feature}`
- dog/log/coach 엔드포인트: **반드시** `verify_dog_ownership()` 적용

### Frontend
- TanStack Query 키: **반드시** `QUERY_KEYS` 팩토리 사용 (하드코딩 금지)
- 캐시 무효화: 정밀하게 (예: `QUERY_KEYS.logs(dogId)`), 와일드카드 금지
- barrel import 금지 (직접 파일 임포트만)
- `@/` alias 사용 (예: `@/hooks/useAuth`)
- 컴포넌트: PascalCase | 유틸: camelCase

## 인증 & 보안

- **게스트**: `anonymous_sid` 쿠키 (httponly) → 설문 + 부분 결과만
- **OAuth**: Supabase Google OAuth → `/auth/callback`
- **게스트→회원 전환**: `POST /auth/migrate-guest` (자동, 멱등, 1회)
- **Pro 데이터**: 비구독자에게 실제 솔루션 데이터 절대 노출 금지 (DOM 레벨)
- 게스트 쿠키 전송: `credentials: 'include'` 필수

## DB & 타임존

- **Supabase** PostgreSQL (RLS 활성화, user_id 기반 접근제어)
- 프론트엔드: `X-Timezone` 헤더 전송 → 백엔드: `ZoneInfo` 변환
- `date.today()` 사용 금지 → 항상 타임존 인식 날짜 사용
- 페이지네이션: 커서 기반 (OFFSET 금지)

## AI 추천 시스템 (Phase 7)

- 비용 상태 엔드포인트: **admin 전용** (`get_user_role_by_id` 체크)
- window_days: `Literal[7, 15, 30]` 고정
- 스냅샷: 시계열 누적 (덮어쓰기 금지)
- 로그 요약 fallback: behavior_logs에서 <=1200자
- 사용자에게 `source`, `saving_mode` 노출 금지
- 플랜 라벨: 사용자 대면 `A/B/C`만 (AI/rule 구분 노출 금지)

## 흔한 실수 방지

| 실수 | 방지법 |
|------|--------|
| API URL 이중 prefix | `api.ts:buildUrl()`이 자동 처리, .env에 `/api/v1` 넣지 말 것 |
| 게스트 데이터 유실 | `credentials: 'include'` 누락 확인 |
| DB 커넥션 누수 | `Depends(get_db)` 사용, 수동 close() 금지 |
| 스냅샷 덮어쓰기 | 새 row INSERT (upsert 금지) |
| 빌드 타입 에러 | 미사용 import/변수 제거, 명시적 타입 선언 |

## 인코딩

**UTF-8 + LF 필수** (.editorconfig & .gitattributes로 강제)

## 참고 문서

- 프로젝트 상세: @.agent/ai-context/project-context.md
- 마스터 플랜: @.agent/ai-context/master-plan.md
- DB 스키마: @Backend/supabase_schema.sql
- 코딩 가이드라인: @.agent/ai-context/claude-coding-guideline.md
