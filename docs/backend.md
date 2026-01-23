DogCoach 백엔드는 Feature-based Architecture(기능 기반 아키텍처) 를 채택하여 유지보수성과 확장성을 높였습니다.

## 1. 아키텍처 개요 (Architecture)
```
Backend/
├── app/
│   ├── core/                  # 프로젝트 전역 설정 (정적/인프라)
│   │   ├── config.py          # 환경 변수 관리 (Pydantic Settings)
│   │   ├── database.py        # 비동기 DB 세션 (SQLAlchemy + AsyncPG)
│   │   ├── security.py        # Supabase 인증 / JWT 검증
│   │   └── exceptions.py      # 글로벌 예외 처리기 (Custom Exception)
│   │
│   ├── shared/                # 기능 간 공통 리소스
│   │   ├── models.py          # SQLAlchemy ORM 모델 (중앙 집중화)
│   │   └── utils/             # 타임존, 로거 등 유틸
│   │
│   ├── features/              # 비즈니스 로직 (도메인 주도)
│   │   ├── auth/              # 사용자 인증/접근
│   │   ├── onboarding/        # 설문 및 프로필 관리
│   │   ├── dashboard/         # 메인 뷰 집계
│   │   ├── log/               # 행동 기록 관리
│   │   ├── coach/             # AI 분석 (코치 기능)
│   │   └── settings/          # 사용자 환경설정
│   │
│   └── main.py                # 앱 엔트리포인트
```

## 2. 기술 스택 (Tech Stack)
- **프레임워크**: FastAPI (Python 3.10+)
- **데이터베이스**: Supabase (PostgreSQL)
- **ORM**: SQLAlchemy 2.0 (AsyncIO)
- **드라이버**: asyncpg
- **인증**: Supabase Auth (JWT)
- **검증**: Pydantic v2
- **AI**: OpenAI API (GPT-4o)

## 3. 구현 단계 (Implementation Status)

### ✅ Phase 1: 기반 (Core & Shared)
- [x] **환경 변수 관리**: `pydantic-settings` 적용
- [x] **DB 연결**: `async_sessionmaker` 풀링 설정
- [x] **모델링**: `User`, `Dog`, `BehaviorLog` 등 전체 스키마 (Shared Model)
- [x] **보안**: JWT 검증 의존성 (`get_current_user`)

### ✅ Phase 2: 사용자 접근 (Auth & Onboarding)
- [x] **Auth** (`GET /me`)
    - [x] `features/auth` 모듈 구현 및 `UserResponse` 스키마 정의
    - [x] JWT 검증 미들웨어 연동
- [x] **Onboarding** (`POST /survey`)
    - [x] **Atomic Transaction**: `Dog` + `DogEnv` + `Seed Log` 동시 생성 보장
    - [x] **JSONB Typing**: `household_info`, `triggers` 등 Pydantic 모델로 타입 안정성 확보

### ⏳ Phase 3: 핵심 루프 (Log & Dashboard)
- [ ] **Log**: 행동 로그 CRUD (`POST /logs`) - 복합 인덱스 활용
- [ ] **Dashboard**: 통계 집계 및 일일 미션 상태

### ⏳ Phase 4: 지능 (Coach & Settings)
- [ ] **Coach**: RAG 기반 AI 조언 파이프라인
- [ ] **Settings**: 사용자 환경설정 관리

## 4. 리팩토링 및 개선 사항 (Refactoring & Improvements)
Node.js 백엔드 패턴 및 클린 아키텍처 원칙을 적용하여 코드를 개선했습니다.

- [x] **Layered Architecture 준수**:
    - `Router` (HTTP) → `Service` (Business Logic) → `Repository` (DB Access) 계층 분리 확실화.
- [x] **Dependency Injection (DI) 적용**:
    - `FastAPI Depends`를 사용하여 DB 세션 및 User ID 주입. (Testability 향상)
- [x] **예외 처리 표준화 (Error Handling)**:
    - [x] `app/core/exceptions.py`에 `DomainException` (NotFound, BadRequest 등) 정의.
    - [x] `Service` 계층에서 `HTTPException` 제거 및 `DomainException` 사용.
    - [x] `main.py`에 글로벌 예외 처리기(`domain_exception_handler`) 등록하여 비즈니스 로직과 HTTP 상태 코드 분리.