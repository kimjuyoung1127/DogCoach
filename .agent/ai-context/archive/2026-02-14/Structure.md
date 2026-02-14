# 프로젝트 구조 (Project Structure)

## Root
```
/
├── .agent/              # AI 협업 컨텍스트 및 워크플로우
├── .claude/             # Claude Code 설정 (MCP 등)
├── .vscode/             # VSCode 프로젝트 설정
├── Backend/             # FastAPI 백엔드
├── Frontend/            # Next.js 프론트엔드
├── docs/                # 프로젝트 기술 문서
├── .editorconfig        # 인코딩/포맷 규칙 (UTF-8 + LF)
├── .gitattributes       # Git 속성 설정
├── .gitignore           # Git 제외 규칙
└── README.md            # 메인 가이드
```

## Frontend (Next.js)
```
Frontend/
├── public/                      # 정적 자원 (이미지, 아이콘, OG)
│   ├── fonts/                   # 로컬 폰트 (NanumSquareRound)
│   └── og/                      # 오픈그래프/카카오 공유 썸네일
├── src/
│   ├── app/
│   │   ├── (public)/            # 비인증 공개 라우트 (랜딩, 설문, 결과)
│   │   ├── (app)/               # 인증용 내부 라우트 (대시보드, 로그, 코치)
│   │   ├── auth/                # OAuth 콜백 처리
│   │   ├── login/               # 로그인 페이지
│   │   ├── layout.tsx           # 전역 레이아웃 (Metadata, Font)
│   │   └── providers.tsx        # React Query, Auth 공급자
│   ├── components/
│   │   ├── features/            # 기능별 섹션/데이터 의존 컴포넌트
│   │   │   ├── ai-recommendations/ # [NEW] Phase 7 AI 코칭 알고리즘 UI
│   │   │   ├── survey/          # 온보딩 설문
│   │   │   ├── result/          # 분석 결과 (히트맵, 솔루션)
│   │   │   ├── dashboard/       # 대시보드 (Quick Log, Streak)
│   │   │   └── landing/         # 랜딩 페이지 섹션
│   │   └── shared/              # 재사용 가능 UI (Layout, Common UI)
│   ├── hooks/
│   │   ├── useAuth.ts           # 게스트/유저 인증 상태 관리
│   │   ├── useQueries.ts        # TanStack Query (Query/Mutation)
│   │   └── usePersonalizedCurriculum.ts # 맞춤형 훈련 로직
│   ├── lib/
│   │   ├── api.ts               # Backend 통신 (buildUrl, fetcher)
│   │   ├── query-keys.ts        # Query Key Factory
│   │   └── supabase.ts          # Supabase Client 설정
│   └── types/                   # 전역 TypeScript 인터페이스
└── .env.local                   # 로컬 환경 변수 (NEXT_PUBLIC_*)
```

## Backend (FastAPI)
```
Backend/
├── app/
│   ├── core/
│   │   ├── config.py            # Pydantic Settings
│   │   ├── database.py          # SQLAlchemy 비동기 세션
│   │   └── security.py          # JWT 및 권한 검증
│   ├── shared/
│   │   ├── models.py            # 통합 SQLAlchemy Base 모델
│   │   ├── clients/             # 외부 API (OpenAI, Supabase)
│   │   └── utils/               # 타임존, 소유권 검증 유틸
│   ├── features/                # Domain-Driven 기능 모듈
│   │   ├── auth/                # OAuth, 게스트 마이그레이션
│   │   ├── onboarding/          # 설문 및 강아지 프로필
│   │   ├── log/                 # ABC 행동 로그
│   │   ├── dashboard/           # 대시보드 집계 로직
│   │   ├── coach/               # AI 코칭 리포트
│   │   └── ai_recommendations/  # [NEW] Phase 7 AI 추천 알고리즘 (정책 강화)
│   └── main.py                  # FastAPI 앱 엔트리
├── tests/                       # Pytest (단위/통합 테스트)
│   └── features/                # 기능별 정책 테스트
├── .env                         # 백엔드 환경 변수 (DATABASE_URL 등)
└── requirements.txt             # 의존성 패키지 목록
```