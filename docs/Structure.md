# 프로젝트 구조 (Project Structure)

## Frontend (Next.js)
```
Frontend/
├── public/                      # 정적 자원 (이미지, 아이콘)
├── src/
│   ├── app/
│   │   ├── (public)/            # 공개 페이지
│   │   │   ├── Survey/          # 진단 설문 플로우 (Wizard 형태)
│   │   │   └── result/          # 분석 결과 페이지
│   │   ├── (app)/               # 로그인 후 접근 가능한 앱 페이지
│   │   │   ├── dashboard/       # 메인 대시보드 (Quick Log, 통계)
│   │   │   └── log/             # 행동 기록 상세 페이지
│   │   └── api/                 # Next.js API Routes (Proxy/Edge)
│   ├── components/
│   │   ├── features/            # 기능별 컴포넌트 모듈
│   │   │   ├── survey/          # 설문 로직
│   │   │   │   ├── SurveyContainer.tsx
│   │   │   │   ├── survey-mapper.ts  # 데이터 변환 (Frontend -> Backend)
│   │   │   │   └── steps/...
│   │   │   └── dashboard/       # 대시보드 위젯
│   │   │       ├── quick-log-widget.tsx # [UPDATED] 빠른 기록 (1-touch)
│   │   │       ├── recent-log-list.tsx  # [UPDATED] 기록 목록 & 수정 모달 호출
│   │   │       ├── edit-log-dialog.tsx  # [NEW] 기록 강도 수정 모달
│   │   │       └── dashboard-header.tsx # [UPDATED] 헤더 & 통계 (한글화, 애니메이션)
│   │   └── shared/              # 재사용 UI 컴포넌트 (FadeIn, Toast 등)
│   ├── hooks/
│   │   └── useAuth.ts           # Supabase Auth & 게스트 로그인 핸들링
│   ├── lib/
│   │   ├── api.ts               # Backend API 클라이언트 (Fetch Wrapper, Token Interceptor)
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
│   │   │   ├── router.py        # GET /me
│   │   │   └── ...
│   │   ├── onboarding/          # 설문조사 & 강아지 등록
│   │   │   ├── router.py        # POST /survey
│   │   │   └── ...
│   │   ├── log/                 # 행동 로그 관리
│   │   │   ├── router.py        # POST /logs, PATCH /logs/{id} [UPDATED]
│   │   │   ├── service.py       # 타임존 변환, 업데이트 로직
│   │   │   ├── repository.py    # 복합 인덱스 조회, 레코드 수정
│   │   │   └── schemas.py       # LogCreate, LogUpdate, LogResponse
│   │   ├── dashboard/           # 대시보드 데이터 집계
│   │   │   ├── router.py        # GET /dashboard
│   │   │   └── service.py       # 통계 계산 (Streak, Total Logs) 및 데이터 조합
│   │   └── coach/               # (예정) AI 코칭 및 RAG
│   └── main.py                  # 앱 진입점 & 라우터 통합
├── tests/                       # Pytest 테스트 코드
├── .env                         # 환경 변수 (DB URL, API Key)
└── requirements.txt             # 파이썬 의존성 패키지
```