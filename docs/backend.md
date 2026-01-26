DogCoach 백엔드는 Feature-based Architecture(기능 기반 아키텍처) 를 채택하여 유지보수성과 확장성을 높였습니다.

## 1. 아키텍처 개요 (Architecture)
```
Backend/
├── app/
│   ├── core/                  # 프로젝트 전역 설정 (정적/인프라)
│   ├── shared/                # 기능 간 공통 리소스
│   ├── features/              # 비즈니스 로직 (도메인 주도)
│   └── main.py                # 앱 엔트리포인트
```

## 2. 기술 스택 (Tech Stack)
- **Framework**: FastAPI (Python 3.10+)
- **Database**: Supabase (PostgreSQL)
- **ORM**: SQLAlchemy 2.0 (AsyncIO)
- **Auth**: Supabase Auth (JWT)
- **Frontend Caching**: TanStack Query (React Query) [NEW]
- **AI**: OpenAI API (GPT-4o)

## 3. 구현 단계 (Implementation Status)

### ✅ Phase 1: 기반 (Core & Shared)
- [x] 환경 변수 관리, DB 연결, 공통 모델링, JWT 보안 설정 완료.

### ✅ Phase 2: 사용자 접근 (Auth & Onboarding)
- [x] 익명 로그인(Guest Support) 및 설문 API 연동 완료.

### ✅ Phase 3: 핵심 루프 (Log & Dashboard)
- [x] **Log & Dashboard API**: CRUD 및 통계 집계 연동 완료.
- [x] **프론트엔드 최적화**: 
    - [x] **TanStack Query**를 통한 서버 상태 캐싱 및 데이터 무결성 보장.
    - [x] **Strict Query Keys** 설계를 통한 캐시 충돌 방지 및 자동 무효화(Invalidation) 적용.
    - [x] **Timezone Awareness**: `X-Timezone` 헤더 기반 로컬 시간 처리.

### ⏳ Phase 4: 지능 (Coach & Settings)
- [ ] AI 파이프라인 (RAG) 및 사용자 환경설정 구현 예정.

## 4. 리팩토링 및 개선 사항
- [x] **Feature-based Isolation**: 각 기능 폴더 내에서 Router-Service-Repository 패턴 준수.
- [x] **React Query Factory**: 도메인별 쿼리 키 중앙 관리 (`src/lib/query-keys.ts`).
- [x] **Error Boundary & Error Handling**: 백엔드 DomainException 및 프론트엔드 API 클라이언트 에러 핸들링 고도화.