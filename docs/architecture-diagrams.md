# DogCoach — 프로젝트 시각화

> Mermaid 기반 다이어그램. GitHub, Notion, VS Code(Mermaid Preview)에서 렌더링 가능.

---

## 1. 시스템 아키텍처

```mermaid
graph TB
  subgraph Client["🖥️ Frontend (Next.js + React)"]
    direction TB
    AppRouter["App Router<br/>SSR + CSR"]
    TanStack["TanStack Query<br/>서버 상태 관리"]
    SupabaseAuth["Supabase Auth<br/>세션/토큰 관리"]
    Components["Feature Components<br/>dashboard / coach / log"]
  end

  subgraph Server["⚙️ Backend (FastAPI + Python)"]
    direction TB
    API["REST API<br/>8 도메인"]
    Services["Services Layer<br/>비즈니스 로직"]
    subgraph AIEngine["🤖 AI Engine"]
      AIClient["ai_client<br/>(OpenAI GPT-4o-mini)"]
      RuleEngine["Rule Fallback Engine<br/>규칙 기반 분석"]
      RecoEngine["ai_recommendations<br/>Cache-first 추천"]
    end
    Middleware["CORS / Logging<br/>Proxy Middleware"]
  end

  subgraph DB["🗄️ Supabase (PostgreSQL)"]
    Tables["14+ 테이블<br/>RLS Enabled"]
    Auth["Supabase Auth<br/>OAuth / 익명 / JWT"]
    Storage["File Storage<br/>프로필 사진"]
  end

  subgraph External["🌐 External / Infra"]
    Vercel["Vercel<br/>(FE Deploy)"]
    Fly["Fly.io<br/>(BE Deploy)"]
    OpenAI["OpenAI API<br/>GPT-4o-mini"]
  end

  Client -->|"REST API<br/>apiClient()"| Server
  Server -->|"SQL / ORM"| DB
  Client -->|"Auth Session"| Auth
  AIClient -->|"API 호출"| OpenAI
  AppRouter --> TanStack
  AppRouter --> SupabaseAuth
  API --> Services
  Services --> AIEngine
  Services --> Middleware

  Vercel -.->|"호스팅"| Client
  Fly -.->|"호스팅"| Server

  style Client fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
  style Server fill:#1e293b,stroke:#10b981,color:#e2e8f0
  style DB fill:#1e293b,stroke:#f59e0b,color:#e2e8f0
  style AIEngine fill:#0f172a,stroke:#8b5cf6,color:#e2e8f0
  style External fill:#1e293b,stroke:#6b7280,color:#e2e8f0
```

---

## 2. 핵심 데이터 흐름 (행동 로그 → AI 추천)

```mermaid
flowchart LR
  subgraph UserInput["📝 사용자 입력"]
    U1["행동 기록<br/>(QuickLog / 상세 로그)"]
    U2["강아지 프로필<br/>설문 설정"]
  end

  subgraph LogFlow["📊 로그 처리"]
    L1["POST /logs<br/>행동 저장"]
    L2["BehaviorLog DB<br/>저장"]
    L3["LogSummary<br/>집계 (7/15/30일)"]
  end

  subgraph AIFlow["🤖 AI 추천 생성"]
    A1["dedupe_key 계산<br/>(sha256)"]
    A2{"캐시 HIT?"}
    A3["캐시 반환<br/>(Zero-call)"]
    A4["예산/쿼터 체크"]
    A5["OpenAI GPT-4o-mini<br/>추천 생성"]
    A6["Rule Engine<br/>폴백"]
    A7["스냅샷 저장<br/>(ai_recommendation_snapshots)"]
  end

  subgraph Output["📱 결과 출력"]
    O1["대시보드 표시"]
    O2["코칭 가이드"]
    O3["AI 추천 카드"]
  end

  U1 --> L1 --> L2 --> L3
  U2 --> L3
  L3 --> A1 --> A2
  A2 -->|"HIT"| A3 --> O3
  A2 -->|"MISS"| A4 --> A5 --> A7 --> O3
  A4 -->|"예산 초과"| A6 --> A7
  L2 --> O1
  L3 --> O2

  style UserInput fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
  style LogFlow fill:#1a3a2a,stroke:#10b981,color:#e2e8f0
  style AIFlow fill:#3a2a1a,stroke:#f59e0b,color:#e2e8f0
  style Output fill:#2a1a3a,stroke:#8b5cf6,color:#e2e8f0
```

---

## 3. ERD (데이터베이스 관계도)

```mermaid
erDiagram
  users ||--o{ dogs : "has"
  users ||--|| subscriptions : "has"
  users ||--|| user_settings : "has"
  users ||--o{ user_training_status : "tracks"
  dogs ||--|| dog_env : "has env"
  dogs ||--o{ behavior_logs : "has logs"
  dogs ||--o{ ai_coaching : "has coaching"
  dogs ||--o{ ai_recommendation_snapshots : "has snapshots"
  behavior_logs ||--o{ media_assets : "has media"
  behavior_logs ||--o{ log_summaries : "summarized in"
  ai_recommendation_snapshots ||--o{ ai_recommendation_feedback : "receives"

  users {
    uuid id PK
    string role "GUEST|USER|PRO_USER|ADMIN"
    string status "ACTIVE|INACTIVE|BANNED"
    string timezone "Asia/Seoul"
    string provider "kakao|google"
    timestamptz created_at
  }

  dogs {
    uuid id PK
    uuid user_id FK
    string name
    string breed
    date birth_date
    string sex
    string anonymous_sid "게스트 연동키"
    timestamptz created_at
  }

  dog_env {
    uuid id PK
    uuid dog_id FK
    jsonb household_info
    jsonb health_meta
    jsonb rewards_meta
    jsonb chronic_issues
    jsonb triggers
    jsonb temperament
  }

  behavior_logs {
    uuid id PK
    uuid dog_id FK
    text behavior
    text antecedent
    text consequence
    int intensity "1~5"
    boolean is_quick_log
    timestamptz occurred_at
  }

  ai_recommendation_snapshots {
    uuid id PK
    uuid dog_id FK
    string dedupe_key "sha256, unique"
    string source "ai|rule"
    jsonb recommendations
    text rationale
    timestamptz expires_at
    numeric cost_usd
  }

  subscriptions {
    uuid id PK
    uuid user_id FK
    string plan_type "FREE|PRO_MONTHLY|PRO_YEARLY"
    boolean is_active
    timestamptz next_billing_date
  }
```

---

## 4. 프론트엔드 라우트 & 컴포넌트 트리

```mermaid
graph TD
  subgraph Routes["📁 App Router"]
    Root["/ → 온보딩/로그인"]
    subgraph PublicGroup["(public) — 비인증"]
      Onboarding["/survey<br/>온보딩 설문"]
      Login["/login<br/>소셜 로그인"]
      Result["/result<br/>분석 결과"]
      Legal["/privacy, /terms"]
    end
    subgraph AppGroup["(app) — 인증 필요"]
      Dashboard["/dashboard<br/>메인 대시보드"]
      Coach["/coach<br/>AI 코칭 가이드"]
      Log["/log<br/>행동 로그"]
      Dog["/dog<br/>강아지 프로필"]
      Settings["/settings<br/>알림/AI 페르소나"]
    end
    AuthCallback["/auth/callback<br/>OAuth 콜백"]
  end

  subgraph DashboardComponents["📊 Dashboard 컴포넌트"]
    DH["DashboardHeader"]
    QLW["QuickLogWidget"]
    RLL["RecentLogList"]
    CLD["CreateLogDialog"]
    ELD["EditLogDialog"]
    BNR["CoreDataRequiredBanner"]
  end

  subgraph CoachComponents["🤖 Coach 컴포넌트"]
    CJM["ChallengeJourneyMap"]
    CAO["ChallengeOnboardingModal"]
    MAO["MissionActionOverlay"]
  end

  subgraph SharedLayout["🧩 Layout 컴포넌트"]
    Header["Header"]
    Sidebar["Sidebar"]
    BottomNav["BottomNav"]
    Footer["Footer"]
  end

  Root --> Login
  Dashboard --> DH
  Dashboard --> QLW
  Dashboard --> RLL
  QLW --> CLD
  RLL --> ELD
  Coach --> CJM
  Coach --> CAO
  CJM --> MAO
  AppGroup --> Header
  AppGroup --> BottomNav

  style Routes fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
  style DashboardComponents fill:#1e293b,stroke:#f59e0b,color:#e2e8f0
  style CoachComponents fill:#1e293b,stroke:#8b5cf6,color:#e2e8f0
  style SharedLayout fill:#1e293b,stroke:#10b981,color:#e2e8f0
```

---

## 5. 상태 관리 흐름 (TanStack Query + useAuth)

```mermaid
graph TB
  subgraph Auth["🔑 인증 레이어"]
    UseAuth["useAuth()<br/>user | token | loading"]
    SupabaseSession["Supabase Session<br/>onAuthStateChange"]
    GuestMigration["Guest Migration<br/>POST /auth/migrate-guest"]
  end

  subgraph Queries["📡 TanStack Query Hooks"]
    Dashboard["useDashboardData()"]
    DogLogs["useDogLogs()"]
    Profile["useUserProfile()"]
    AIRec["useAIRecommendations()"]
    DogProfile["useDogProfile()"]
    Settings["useUserSettings()"]
    Training["useTrainingStatuses()"]
  end

  subgraph Mutations["✏️ Mutations"]
    CreateLog["useCreateLog()<br/>Optimistic Update"]
    UpdateLog["useUpdateLog()"]
    SubmitSurvey["useSubmitSurvey()"]
    UpdateSettings["useUpdateUserSettings()"]
    UpdateDog["useUpdateDogProfile()"]
    Feedback["useSubmitRecommendationFeedback()"]
  end

  subgraph Pages["📄 Pages"]
    DashPage["Dashboard"]
    LogPage["Log"]
    CoachPage["Coach"]
    SettingsPage["Settings"]
    DogPage["Dog Profile"]
  end

  SupabaseSession --> UseAuth
  UseAuth -->|"로그인 시"| GuestMigration
  UseAuth -->|"token"| Queries
  UseAuth -->|"token"| Mutations

  DashPage --> Dashboard
  DashPage --> DogLogs
  DashPage --> CreateLog
  CoachPage --> AIRec
  CoachPage --> Training
  SettingsPage --> Settings
  SettingsPage --> UpdateSettings
  DogPage --> DogProfile
  DogPage --> UpdateDog
  Dashboard -->|"invalidate"| CreateLog

  style Auth fill:#0f172a,stroke:#f59e0b,color:#e2e8f0
  style Queries fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
  style Mutations fill:#1e293b,stroke:#10b981,color:#e2e8f0
  style Pages fill:#1e293b,stroke:#8b5cf6,color:#e2e8f0
```

---

## 6. 사용자 여정 (User Journey)

```mermaid
journey
  title DogCoach 사용자 여정
  section 온보딩
    앱 접속 (게스트): 4: User
    강아지 기본 정보 입력: 4: User
    환경/행동 특성 설문: 3: User
    AI 분석 결과 확인: 5: User, System
  section 소셜 로그인 & 데이터 연동
    Google/Kakao 로그인: 5: User
    게스트 데이터 자동 마이그레이션: 5: System
    대시보드 진입: 5: User
  section 일상 행동 기록
    빠른 기록 (QuickLog): 5: User
    상세 로그 입력 (A-B-C): 4: User
    기록 저장 & 타임라인 갱신: 5: System
  section AI 코칭
    AI 행동 분석 요청: 4: User
    캐시 확인 (Cache-first): 5: System
    GPT-4o-mini 추천 생성: 4: System
    추천 항목 조회 & 피드백: 5: User
  section 트레이닝
    코칭 커리큘럼 선택: 4: User
    단계별 미션 진행: 4: User
    완료/건너뛰기 처리: 5: User
  section 구독 (PRO)
    PRO 요금제 업그레이드: 3: User
    무제한 AI 코칭 사용: 5: User
```

---

## 7. API 엔드포인트 맵

```mermaid
graph LR
  subgraph AuthAPI["🔑 Auth (/api/v1/auth)"]
    GET_me["GET /me<br/>내 프로필"]
    POST_migrate["POST /migrate-guest<br/>게스트 데이터 마이그레이션"]
    DELETE_me["DELETE /me<br/>계정 삭제"]
  end

  subgraph OnboardingAPI["📋 Onboarding (/api/v1/onboarding)"]
    POST_survey["POST /survey<br/>설문 제출"]
  end

  subgraph DashboardAPI["📊 Dashboard (/api/v1/dashboard)"]
    GET_dashboard["GET /<br/>대시보드 통합 데이터"]
  end

  subgraph CoachAPI["🤖 Coach (/api/v1/coach)"]
    POST_generate["POST /generate<br/>코칭 생성"]
    GET_status["GET /status<br/>훈련 현황"]
    POST_status["POST /status<br/>훈련 상태 업데이트"]
    POST_reco["POST /recommendations<br/>AI 추천 생성(캐시 우선)"]
    GET_reco_latest["GET /recommendations/latest<br/>최근 추천 조회"]
    POST_reco_fb["POST /recommendations/{id}/feedback<br/>피드백 제출"]
    POST_snapshot["POST /behavior-snapshot<br/>행동 스냅샷 촬영"]
    GET_snapshot_cmp["GET /behavior-snapshot/compare<br/>스냅샷 비교"]
  end

  subgraph LogAPI["📝 Log (/api/v1/logs)"]
    GET_logs["GET /{dog_id}<br/>로그 목록"]
    POST_log["POST /<br/>로그 생성"]
    PATCH_log["PATCH /{id}<br/>로그 수정"]
    DELETE_log["DELETE /{id}<br/>로그 삭제"]
  end

  subgraph DogsAPI["🐕 Dogs (/api/v1/dogs)"]
    GET_profile["GET /profile<br/>강아지 프로필"]
    PUT_profile["PUT /profile<br/>프로필 수정"]
  end

  subgraph SettingsAPI["⚙️ Settings (/api/v1/settings)"]
    GET_settings["GET /<br/>사용자 설정 조회"]
    PATCH_settings["PATCH /<br/>설정 업데이트"]
  end

  POST_survey -->|"dog_id 생성"| GET_dashboard
  GET_dashboard -->|"dog_id"| GET_logs
  POST_log -->|"로그 누적"| POST_reco
  POST_status -->|"훈련 진도"| GET_status

  style AuthAPI fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
  style OnboardingAPI fill:#1a3a2a,stroke:#10b981,color:#e2e8f0
  style DashboardAPI fill:#2a1a3a,stroke:#8b5cf6,color:#e2e8f0
  style CoachAPI fill:#3a1a2a,stroke:#ec4899,color:#e2e8f0
  style LogAPI fill:#3a2a1a,stroke:#f59e0b,color:#e2e8f0
  style DogsAPI fill:#1a2a3a,stroke:#06b6d4,color:#e2e8f0
  style SettingsAPI fill:#2a3a1a,stroke:#84cc16,color:#e2e8f0
```

---

## 8. AI 코칭 엔진 파이프라인

```mermaid
graph TD
  subgraph Input["입력"]
    DogData["강아지 기본 정보<br/>(품종, 나이, 성별)"]
    EnvData["환경 데이터<br/>(DogEnv: 가족 구성, 건강, 보상 등)"]
    LogData["행동 로그<br/>(BehaviorLog 또는 LogSummary)"]
  end

  subgraph CoachPipeline["🤖 Coach Service Pipeline"]
    P1["1. 강아지 데이터 조회<br/>(Dog + DogEnv)"]
    P2["2. 행동 로그 집계<br/>(최근 30일)"]
    P3["3. 프롬프트 생성<br/>(templates.py)"]
    P4["4. AI 호출<br/>(ai_client)"]
    P5["5. JSON 파싱<br/>(_extract_json_object)"]
    P6["6. 톤/페르소나 적용<br/>(EMPATHETIC / SOLUTION)"]
  end

  subgraph RecoPipeline["💡 Recommendation Pipeline"]
    R1["dedupe_key 계산<br/>(summary_hash + window_days)"]
    R2{"캐시 유효?<br/>(expires_at > now)"}
    R3["캐시 즉시 반환<br/>⚡ Zero-call"]
    R4["예산 체크<br/>(AICostUsageMonthly)"]
    R5["쿼터 체크<br/>(사용자 일별 한도)"]
    R6["OpenAI 호출<br/>(GPT-4o-mini)"]
    R7["Rule Engine 폴백<br/>(규칙 기반 3개 추천)"]
    R8["스냅샷 저장<br/>+ 비용 기록"]
  end

  subgraph Output["출력"]
    CoachResult["코칭 응답<br/>(tips, analysis, actions)"]
    RecoResult["추천 응답<br/>(3개 항목 + rationale)"]
  end

  DogData --> P1
  EnvData --> P1
  LogData --> P2
  P1 --> P3
  P2 --> P3
  P3 --> P4 --> P5 --> P6 --> CoachResult

  DogData --> R1
  LogData --> R1
  R1 --> R2
  R2 -->|"HIT"| R3 --> RecoResult
  R2 -->|"MISS"| R4 --> R5 --> R6 --> R8 --> RecoResult
  R4 -->|"예산 초과"| R7 --> R8
  R5 -->|"쿼터 초과"| R7

  style Input fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
  style CoachPipeline fill:#1a3a2a,stroke:#10b981,color:#e2e8f0
  style RecoPipeline fill:#3a2a1a,stroke:#f59e0b,color:#e2e8f0
  style Output fill:#2a1a3a,stroke:#8b5cf6,color:#e2e8f0
```

---

## 9. BE ↔ FE 미러 구조

```mermaid
graph LR
  subgraph BE["⚙️ Backend (Python)"]
    BM1["features/auth/schemas.py<br/>UserResponse, UserBase"]
    BM2["features/dogs/schemas.py<br/>DogProfileFull, DogProfileUpdate"]
    BM3["features/coach/schemas.py<br/>CoachingRequest/Response"]
    BM4["features/ai_recommendations<br/>RecommendationRequest/Response"]
    BM5["features/log/schemas.py<br/>BehaviorLogCreate"]
    BM6["features/settings/schemas.py<br/>UserSettings, AiPersona"]
    BR1["features/auth/router.py"]
    BR2["features/dogs/router.py"]
    BR3["features/coach/router.py"]
    BR4["features/ai_recommendations/router.py"]
    BR5["features/log/router.py"]
    BR6["features/settings/router.py"]
  end

  subgraph FE["🖥️ Frontend (TypeScript)"]
    FT1["lib/types.ts<br/>UserProfile, Subscription"]
    FT2["lib/types.ts<br/>DogProfileFull"]
    FT3["features/coach/types"]
    FT4["features/ai-recommendations/types<br/>RecommendationResponse"]
    FT5["hooks/useQueries.ts<br/>useDogLogs, useCreateLog"]
    FT6["lib/types.ts<br/>UserSettings, AiPersona"]
    FA1["hooks/useQueries.ts → /auth"]
    FA2["hooks/useQueries.ts → /dogs"]
    FA3["hooks/useQueries.ts → /coach"]
    FA4["hooks/useQueries.ts → /coach/recommendations"]
    FA5["hooks/useQueries.ts → /logs"]
    FA6["hooks/useQueries.ts → /settings"]
  end

  BM1 ---|"1:1 타입"| FT1
  BM2 ---|"1:1 타입"| FT2
  BM3 ---|"1:1 타입"| FT3
  BM4 ---|"1:1 타입"| FT4
  BM5 ---|"1:1 타입"| FT5
  BM6 ---|"1:1 타입"| FT6
  BR1 ---|"1:1 API"| FA1
  BR2 ---|"1:1 API"| FA2
  BR3 ---|"1:1 API"| FA3
  BR4 ---|"1:1 API"| FA4
  BR5 ---|"1:1 API"| FA5
  BR6 ---|"1:1 API"| FA6

  style BE fill:#1a3a2a,stroke:#10b981,color:#e2e8f0
  style FE fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
```

---

## 10. 기술 스택 요약

```mermaid
mindmap
  root((DogCoach))
    Frontend
      Next.js 15
      React 19
      TypeScript
      TanStack Query v5
      Tailwind CSS
      Framer Motion
      Supabase JS Client
    Backend
      FastAPI
      Pydantic v2
      SQLAlchemy 2 async
      Python 3.x
      OpenAI SDK
      Fly.io 배포
    Database
      Supabase
      PostgreSQL
      JSONB 컬럼 활용
      TIMESTAMPTZ
      RLS Enabled
    AI Layer
      GPT-4o-mini
      Cache-first 전략
      Rule Fallback
      dedupe_key 최적화
      예산/쿼터 관리
    Auth
      Supabase Auth
      Google OAuth
      Kakao OAuth
      익명 세션 지원
      Guest Migration
    Features
      행동 로그 A-B-C
      AI 코칭 추천
      트레이닝 커리큘럼
      강아지 프로필 설문
      PRO 구독 시스템
      알림 채널 설정
```

---

## 11. 인증 흐름 (Auth Flow)

```mermaid
sequenceDiagram
  actor User
  participant FE as Frontend
  participant Supabase as Supabase Auth
  participant BE as Backend API

  User->>FE: 앱 접속
  FE->>Supabase: getSession() 확인
  alt 세션 없음
    FE->>User: 게스트 모드 시작
    User->>FE: 설문/로그 데이터 입력
    FE->>BE: Cookie 기반 익명 요청
  end

  User->>FE: 소셜 로그인 클릭
  FE->>Supabase: signInWithOAuth(provider)
  Supabase-->>FE: access_token 발급
  FE->>BE: POST /auth/migrate-guest<br/>Bearer token + anonymous_sid
  BE->>BE: 게스트 강아지 → 사용자 소유 이전
  BE-->>FE: migrated_count 반환
  FE->>User: 대시보드 진입 (데이터 연속성 유지)
```
