# 프로젝트 구조 (Project Structure)

## Frontend (Next.js)
```
Frontend/
├── public/                      # 정적 자원 (이미지, 아이콘)
├── src/
│   ├── app/
│   │   ├── (public)/            # 공개 페이지
│   │   ├── (app)/               # 로그인 후 접근 가능한 앱 페이지
│   │   │   ├── dashboard/       # 메인 대시보드 (Quick Log, 통계)
│   │   │   └── log/             # [UPDATED] 행동 기록 분석 & 타임라인 (Real-data 연동)
│   │   ├── providers.tsx        # [NEW] 전역 Provider (QueryClientProvider 등)
│   │   └── api/                 # Next.js API Routes (Proxy/Edge)
│   ├── components/
│   │   ├── features/            # 기능별 컴포넌트 모듈
│   │   │   ├── survey/          # 설문 로직
│   │   │   └── dashboard/       # 대시보드 위젯
│   │   │       ├── quick-log-widget.tsx # 빠른 기록 (1-touch)
│   │   │       ├── recent-log-list.tsx  # 기록 목록 & 수정 모달 호출
│   │   │       ├── edit-log-dialog.tsx  # ABC 상호작용 및 태그 선택 모달
│   │   │       ├── dashboard-header.tsx # 헤더 & 통계 (한글화, 애니메이션)
│   │   │       └── dashboard-skeleton.tsx # 데이터 로딩용 스켈레톤 UI
│   │   └── shared/              # 재사용 UI 컴포넌트
│   │       ├── animations/
│   │       │   ├── FadeIn.tsx      # 페이드인 애니메이션
│   │       │   └── ScaleButton.tsx # 터치 피드백 (Scale) 버튼
│   │       └── Toast.tsx           # 알림 토스트
│   ├── hooks/
│   │   ├── useAuth.ts           # Supabase Auth & 게스트 로그인 핸들링
│   │   └── useQueries.ts        # [NEW] TanStack Query 커스텀 훅 (Dashboard, Logs, Context)
│   ├── lib/
│   │   ├── api.ts               # Backend API 클라이언트 (Fetch Wrapper, Token Interceptor)
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
│   │   └── utils/
│   │       └── timezone.py      # 타임존 변환 유틸리티 (UTC 저장 표준화)
│   ├── features/                # 도메인별 기능 모듈 (Router → Service → Repo)
│   │   ├── auth/                # 인증 및 사용자 프로필
│   │   ├── onboarding/          # 설문조사 & 강아지 등록
│   │   ├── log/                 # 행동 로그 관리
│   │   ├── dashboard/           # 대시보드 데이터 집계
│   │   └── coach/               # (예정) AI 코칭 및 RAG
│   └── main.py                  # 앱 진입점 & 라우터 통합
├── tests/                       # Pytest 테스트 코드
├── .env                         # 환경 변수 (DB URL, API Key)
└── requirements.txt             # 파이썬 의존성 패키지
```