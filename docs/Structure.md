# 프로젝트 구조 (Project Structure)

## Frontend (Next.js)
```
Frontend/
├── public/                      # 정적 자원 (이미지, 아이콘)
│   ├── fonts/                   # [NEW] 로컬 폰트 (NanumSquareRound TTF)
├── src/
│   ├── app/
│   │   ├── (public)/            # 공개 페이지
│   │   ├── (app)/               # 로그인 후 접근 가능한 앱 페이지
│   │   │   ├── dashboard/       # 메인 대시보드 (Quick Log, 최근 기록)
│   │   │   ├── log/             # 행동 기록 분석 & 고화질 PDF 리포트
│   │   │   └── coach/           # [NEW] AI 코칭 아카데미 (7일 챌린지, 로드맵)
│   │   ├── providers.tsx        # 전역 Provider (QueryClientProvider 등)
│   │   └── api/                 # Next.js API Routes (Proxy/Edge)
│   ├── components/
│   │   ├── features/            # 기능별 컴포넌트 모듈
│   │   │   ├── survey/          # 설문 로직
│   │   │   ├── dashboard/       # 대시보드 (행동 기록 중심)
│   │   │   │   ├── MainDashboardTab.tsx # 대시보드 메인 레이아웃 통합
│   │   │   │   ├── QuickLogWidget.tsx   # 빠른 기록
│   │   │   │   ├── RecentLogList.tsx    # 최근 기록 목록
│   │   │   │   └── EditLogDialog.tsx    # 기록 상세 수정 모달
│   │   │   ├── coach/           # [NEW] AI 코칭 & 7일 챌린지 시스템
│   │   │   │   ├── ChallengeJourneyMap.tsx # 챌린지 여정 로드맵 시각화
│   │   │   │   ├── ChallengeOnboardingModal.tsx # 챌린지 시작 안내 모달
│   │   │   │   └── MissionActionOverlay.tsx # 단계별 미션 수행 오버레이
│   │   └── shared/              # 재사용 UI 컴포넌트
│   │       ├── ui/
│   │       │   └── LottieLoading.tsx   # [NEW] Lottie 로딩 애니메이션
│   │       ├── animations/
│   │       │   ├── FadeIn.tsx      # 페이드인 애니메이션
│   │       │   └── ScaleButton.tsx # 터치 피드백 (Scale) 버튼
│   │       └── Toast.tsx           # 알림 토스트
│   ├── hooks/
│   │   ├── useAuth.ts           # Supabase Auth & 게스트 로그인 핸들링
│   │   └── useQueries.ts        # [UPDATED] TanStack Query 훅 (Queries & Mutations, 낙관적 업데이트)
│   ├── lib/
│   │   ├── api.ts               # Backend API 클라이언트 (Fetch Wrapper, Token Interceptor)
│   │   ├── localization.ts      # [NEW] 영문 DB ID -> 한글 마스킹 맵
│   │   ├── query-client.ts      # [NEW] QueryClient 설정 (Cache StaleTime 등)
│   │   ├── query-keys.ts        # [NEW] Query Key Factory (Collision 방지)
│   │   ├── supabase.ts          # Supabase 클라이언트 설정
│   │   └── utils.ts             # 유틸리티 (Tailwind Merge 등)
│   ├── store/                   # 전역 상태 (Zustand)
│   └── types/                   # TypeScript 타입 정의
```

## Backend (FastAPI - 기능 중심 아키텍처)
```
Backend/
├── app/
│   ├── core/
│   │   ├── config.py            # 환경 설정 (Pydantic Settings)
│   │   ├── database.py          # 비동기 DB 세션 관리 (AsyncSession)
│   │   ├── security.py          # JWT 검증 & 사용자 식별
│   │   └── exceptions.py        # 글로벌 예외 처리
│   ├── shared/
│   │   ├── models.py            # 통합 데이터베이스 모델 (순환 참조 방지)
│   │   ├── clients/             # 외부 서비스 연동
│   │   │   ├── ai_client.py     # [NEW] Ollama/Tunnel 연동 AI 클라이언트
│   │   │   └── supabase_client.py # Supabase 관리자 연동
│   │   └── utils/
│   │       └── timezone.py      # 타임존 변환 유틸리티 (UTC 저장 표준화)
│   ├── features/                # 도메인별 기능 모듈 (Router → Service → Repo)
│   │   ├── auth/                # 인증 및 사용자 프로필
│   │   ├── onboarding/          # 설문조사 & 강아지 등록
│   │   ├── log/                 # 행동 로그 관리
│   │   ├── dashboard/           # 대시보드 데이터 집계
│   │   └── coach/               # AI 코칭 및 LLM 리포트 분석
│   │       ├── router.py        # /analyze, /generate 엔드포인트
│   │       ├── service.py       # LLM 연동 및 챌린지 생성 로직
│   │       ├── prompts.py       # [NEW] AI 행동 분석 시스템 프롬프트
│   │       ├── schemas.py       # 요청/응답 스키마
│   │       └── templates.py     # 상용구 훈련 템플릿
│   └── main.py                  # 앱 진입점 & 라우터 통합
├── tests/                       # Pytest 테스트 코드
├── .env                         # 환경 변수 (DB URL, API Key)
└── requirements.txt             # 파이썬 의존성 패키지
```