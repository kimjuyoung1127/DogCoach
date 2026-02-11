TailLog 코딩 가이드라인
기준일: 2026-02-11 | 스택: Next.js 16 + FastAPI + Supabase PostgreSQL

---

## 1) 실행 환경

Frontend
1. cd Frontend
2. npm install
3. npm run dev (개발) / npm run build (검증)

Backend
1. cd Backend
2. python -m venv venv && ./venv/Scripts/activate (Windows)
3. pip install -r requirements.txt
4. python -m uvicorn app.main:app --reload
5. 필요 시 python -m pytest tests

환경변수: Frontend/.env.local, Backend/.env (커밋 금지)

---

## 2) 아키텍처 규칙

### Frontend 구조
```
src/
├─ app/(public)/        # 비인증 라우트 (설문, 결과, 랜딩)
├─ app/(app)/           # 인증 라우트 (대시보드, 로그, 코치)
├─ components/features/ # 기능별 컴포넌트 (survey/, result/, dashboard/, log/, coach/)
├─ components/shared/   # 공유 컴포넌트 (layout/, ui/)
├─ hooks/               # useAuth, useQueries 등 커스텀 훅
├─ lib/                 # api.ts, supabase.ts, query-keys.ts 등 코어 유틸
└─ data/                # 정적 데이터 (curriculum.ts 등)
```

### Backend 구조 (Feature-Based 3-Layer)
```
app/
├─ core/                # config, database, security, exceptions
├─ features/{feature}/  # 기능 모듈
│  ├─ router.py         # HTTP 관심사 (요청/응답, 상태코드, 쿠키)
│  ├─ service.py        # 비즈니스 로직, 오케스트레이션
│  ├─ repository.py     # DB 쿼리만
│  └─ schemas.py        # Pydantic v2 입출력 모델
└─ shared/              # models.py, utils/, clients/
```

### 계층 분리 원칙
- Router: HTTP 처리만 (Depends, Request/Response, status code)
- Service: 비즈니스 규칙 (검증, 변환, 조합)
- Repository: 순수 DB 조작 (SELECT, INSERT, UPDATE)
- 역방향 호출 금지: Repository → Service ✗, Service → Router ✗

---

## 3) Frontend 코딩 규칙

### 컴포넌트 패턴
- "use client" 필수 (App Router에서 훅 사용 시)
- import 경로: `@/` alias 사용 (`@/hooks/useAuth`, `@/lib/api`)
- 로딩/에러: early return 패턴 (`if (isLoading) return <Skeleton />`)
- 애니메이션: Framer Motion의 `<FadeIn>` 래퍼 활용

### TanStack Query 규칙
- Query Key: `QUERY_KEYS` 팩토리 사용 (lib/query-keys.ts)
- Invalidation: 와일드카드 금지, `QUERY_KEYS.logs(dogId)` 정밀 무효화
- staleTime: 대시보드 2분, 로그 1분 기준
- 게스트 지원: `credentials: 'include'`, token은 optional

### 성능 (react-best-practices 참조)
- barrel import 금지: `import { X } from '@/components'` ✗ → 직접 파일 import ✓
- 독립 데이터 병렬 fetch: `Promise.all()` 또는 컴포넌트 분리로 워터폴 제거
- 비용 높은 컴포넌트: `dynamic(() => import(...))` 지연 로딩
- 반복 lookup: Array.find 대신 Map 인덱스 (O(n) → O(1))
- 불변성: `toSorted()` 사용, 원본 배열 mutate 금지

### 인터랙션 (interaction-design 참조)
- 모션 목적: 피드백, 방향, 포커스, 연속성 (장식 아님)
- 타이밍: micro 100-150ms, 토글 200-300ms, 모달 300-500ms
- CSS 우선: transform/opacity만 animate (layout thrashing 방지)
- 접근성: `prefers-reduced-motion` 항상 존중

### 라우트
- canonical: /survey (구 /Survey, /checkup 폐기)
- 인증 그룹: (app)/ 하위, 비인증 그룹: (public)/ 하위

---

## 4) Backend 코딩 규칙

### FastAPI 패턴
- 모든 엔드포인트 async
- 인증: `Depends(get_current_user_id)` (필수) 또는 `get_current_user_id_optional` (게스트 허용)
- DB 세션: `Depends(get_db)` — 함수 내에서 직접 생성 금지
- 응답 모델: `response_model=schemas.XxxResponse` 명시
- 라우터 prefix: `/api/v1/{feature}` (main.py에서 등록)

### Pydantic v2 패턴
- ORM 연동: `model_config = ConfigDict(from_attributes=True)`
- JSONB 필드: 별도 BaseModel로 중첩 구조화
- 빈 문자열: `@model_validator(mode='before')`로 sanitize
- Request/Response 스키마 분리

### SQLAlchemy Async
- 모델: shared/models.py에 집중 (PostgreSQL UUID, JSONB, ARRAY 사용)
- 연결: asyncpg + connection pooling (pool_size=20, max_overflow=10)
- 트랜잭션: 짧게 유지, 외부 API 호출 포함 금지

### 데이터베이스 (supabase-postgres 참조)
- 인덱스: WHERE/JOIN 컬럼에 반드시 추가 (anonymous_sid 등)
- RLS: 활성화 상태, service_role 정책 유지
- 페이지네이션: OFFSET 대신 cursor-based 사용
- 대량 INSERT: batch로 묶기

---

## 5) 인증/보안 규칙

### 인증 흐름
- 게스트: anonymous_sid 쿠키 (httponly, 1년 만료) → 로그인 없이 설문/결과 접근
- 로그인: Supabase Google OAuth → /auth/callback → /dashboard 또는 /survey
- 마이그레이션: 로그인 시 POST /auth/migrate-guest 자동 호출 (1회, 멱등)
- Anonymous Auth: 비활성 — signInAnonymously() 사용 금지

### 보안 체크리스트
- [ ] dog/log/coach 엔드포인트: verify_dog_ownership() 적용
- [ ] 비구독자 잠금 모드: 실제 솔루션 데이터 DOM 비렌더링 (prop으로 전달 금지)
- [ ] 쿠키: httponly + secure (production) + sameSite=lax
- [ ] RLS 정책: user_id 기반 행 접근 제한
- [ ] 환경변수: .env 파일 커밋 금지, NEXT_PUBLIC_ 접두사 주의

---

## 6) 공통 규칙

### 인코딩 (UTF-8 Guideline 참조)
- 모든 파일: UTF-8 + LF (CRLF 금지)
- .editorconfig, .gitattributes로 강제
- 빌드 전 확인: "Encoding check: UTF-8 + LF verified for changed files."

### 네이밍 컨벤션
| 대상 | Frontend | Backend |
|------|----------|---------|
| 파일 | PascalCase (컴포넌트), camelCase (유틸) | snake_case |
| 함수 | camelCase | snake_case |
| 클래스/타입 | PascalCase | PascalCase |
| 상수 | SCREAMING_SNAKE | SCREAMING_SNAKE |
| CSS | Tailwind 유틸리티 클래스 | N/A |

### 타입 안전
- Frontend: TypeScript strict mode, 제네릭 API 응답 (`apiClient.get<T>`)
- Backend: 모든 함수에 타입 힌트, Pydantic 스키마로 입출력 검증

---

## 7) 자주 발생하는 실수 방지

| 실수 | 방지책 |
|------|--------|
| API URL 이중 접두사 | api.ts의 buildUrl()이 자동 처리, .env에 /api/v1 포함 여부 무관 |
| Query key 불일치 | QUERY_KEYS 팩토리만 사용, 문자열 직접 사용 금지 |
| 게스트 데이터 미전달 | credentials: 'include' 누락 시 쿠키 미전송 → 게스트 식별 실패 |
| 잠금 모드 데이터 노출 | isPro 조건 외부에서 솔루션 텍스트 렌더링 금지 |
| 빌드 타입 에러 | 미사용 import/변수 제거, any 타입 명시적 annotation |
| timezone 불일치 | 프론트: X-Timezone 헤더, 백엔드: ZoneInfo 변환 (date.today() 금지) |
| DB 커넥션 누수 | get_db() Depends로만 세션 획득, 수동 close 불필요 |

---

## 8) 완료 보고 형식
- 변경 요약: 파일, 핵심 로직, 영향 범위
- 검증: 실행 명령 + 결과 (성공/실패 + 핵심 로그)
- 리스크/후속 작업

## 9) 기록 규칙
- 작업 중: sprint-handoff + logs 우선 갱신
- 마일스톤 종료 시: worklog, review-log, master-plan 반영
- 빌드 검증 후 기록: `npm run build` 결과 포함 필수

## 10) 스킬 참조
코딩 시 아래 스킬 문서를 상황에 맞게 참조:
- React 성능: `.agent/skills/react-best-practices/SKILL.md`
- Supabase/DB: `.agent/skills/supabase-postgres-best-practices/SKILL.md`
- 인증 패턴: `.agent/skills/auth-implementation-patterns/SKILL.md`
- 인터랙션: `.agent/skills/interaction-design/SKILL.md`
- 프리미엄 UI: `.agent/skills/premium-frontend-design/SKILL.md`
- 랜딩 페이지: `.agent/skills/landing-page-guide-v2/SKILL.md`
