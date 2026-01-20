# Project Structure

## Frontend (Next.js)
Frontend/
├── public/                      # Static assets (images, fonts, manifest)
├── src/
│   ├── app/
│   │   ├── (public)/            # Public pages (Landing, Survey, Results)
│   │   │   ├── layout.tsx       # Public layout (Header/Footer)
│   │   │   ├── page.tsx         # Landing Page (Main)
│   │   │   ├── login/           # Login Page
│   │   │   ├── Survey/          # Diagnosis Survey Page (Replacing checkup)
│   │   │   └── result/          # Analysis Result Page (Guest/User View + Challenge)
│   │   ├── (app)/               # Protected app pages (Dashboard, Log, Analytics)
│   │   │   ├── layout.tsx       # App Layout (Sidebar/BottomNav, No Footer)
│   │   │   ├── dashboard/       # Dashboard Page (Main App Entry)
│   │   │   ├── analytics/       # Data Visualization
│   │   │   ├── coach/           # AI Coaching & Advice
│   │   │   ├── log/             # Behavior Logging
│   │   │   └── settings/        # User Settings
│   │   └── api/                 # Next.js API Routes (Auth, proxy)
│   ├── components/
│   │   ├── landing/             # Landing Page Strategy Sections
│   │   │   ├── HeroSection.tsx          # Hero + Emotional Hook
│   │   │   ├── SocialProofSection.tsx   # Users & Stats
│   │   │   ├── ProblemSection.tsx       # Comparison (Generic vs Data)
│   │   │   ├── ABCSolutionSection.tsx   # ABC Model Visualization
│   │   │   ├── BehaviorMapSection.tsx   # Heatmap Feature
│   │   │   ├── SeamlessSection.tsx      # PWA & Kakao Integration
│   │   │   ├── ProcessSection.tsx       # 3-Step Flow
│   │   │   ├── ExpertSynergySection.tsx # Vet Report Sharing
│   │   │   └── PricingSection.tsx       # Plans
│   │   ├── layout/              # Global layout components
│   │   │   ├── Header.tsx       # Public Header
│   │   │   ├── Footer.tsx       # Public Footer
│   │   │   ├── Sidebar.tsx      # App Desktop Sidebar
│   │   │   └── BottomNav.tsx    # App Mobile Bottom Navigation (FAB included)
│   │   ├── challenge/           # 7-Day Challenge Onboarding
│   │   │   ├── ChallengeOnboardingModal.tsx # Journey Map Journey
│   │   │   └── MissionActionOverlay.tsx     # Day 1 Mission & Feedback
│   │   ├── charts/              # Visualizations
│   │   ├── dashboard/           # Dashboard Components
│   │   │   ├── ChallengeMap.tsx     # Endless Journey
│   │   │   ├── DailyBriefing.tsx    # Top Layer
│   │   │   ├── MissionTracker.tsx   # Mid Layer
│   │   │   └── QuickLogGrid.tsx     # Action Grid (Zero Friction)
│   │   ├── shared/              # Reusable shared components
│   │   ├── Survey/              # Onboarding Survey Components
│   │   │   ├── SurveyContainer.tsx  # Main Logic
│   │   │   ├── SurveyProgress.tsx   # Progress Bar
│   │   │   ├── SurveyControls.tsx   # Navigation
│   │   │   ├── Step1Profile.tsx     # Basic Info (Split Gender/Neutering)
│   │   │   ├── Step2Environment.tsx # Env & Carer
│   │   │   ├── Step3Health.tsx      # Health & Rewards
│   │   │   ├── Step4Problems.tsx    # Chronic Issues
│   │   │   ├── Step5Triggers.tsx    # ABC - Antecedents
│   │   │   ├── Step6PastAttempts.tsx# ABC - Consequences
│   │   │   └── Step7Temperament.tsx # Sensitivity Score
│   │   └── ui/                  # Atomic UI components (shadcn/ui)
│   │   ├── result/              # Analysis Result Page Components
│   │   │   ├── ActionPlanCard.tsx       # AI Solution
│   │   │   ├── AnalysisRadarChart.tsx   # 5-Axis Radar Chart
│   │   │   ├── BarkingHeatmap.tsx       # Heatmap Visualization
│   │   │   ├── ConversionCTA.tsx        # Guest Conversion Trigger
│   │   │   ├── LockedAnalysisSection.tsx# Guest Teaser Content
│   │   │   └── ResultHeader.tsx         # Persona & Context Snapshot
│   │   └── ui/                  # Atomic UI components (shadcn/ui)
│   ├── hooks/                   # Custom Hooks
│   ├── lib/                     # Libraries (Utils, Supabase)
│   ├── store/                   # Global State (Zustand)
│   ├── styles/                  # Global CSS (Tailwind v4)
│   └── types/                   # Type Definitions
└── ...

## Backend (FastAPI)
Backend/
├── alembic/                     # Database Migrations
├── app/
│   ├── ai/                      # AI Modules (RAG, Prompts, Vectorstore)
│   ├── api/
│   │   └── v1/                  # API Endpoints (Auth, Dogs, Logs, Coaching)
│   ├── core/                    # Core Configuration & Security
│   ├── db/                      # Database base & session info
│   ├── middleware/              # Middleware (CORS, Error Handling)
│   ├── models/                  # SQLAlchemy ORM Models
│   │   ├── coaching.py          # Coaching & Advice logic
│   │   ├── dog.py               # Dog profiles & stats
│   │   ├── log.py               # Behavior logs
│   │   ├── payment.py           # Subscriptions & payments
│   │   ├── summary.py           # AI Weekly Summaries (RAG)
│   │   ├── user.py              # User authentication & profile
│   │   └── README.md            # Models documentation
│   ├── repositories/            # Database Access Layer (CRUD)
│   ├── schemas/                 # Pydantic Data Schemas
│   ├── services/                # Business Logic Services
│   ├── tasks/                   # Background Tasks (Scheduler, Notifications)
│   ├── utils/                   # Helpers (Logger, Validators)
│   └── main.py                  # Application Entry Point
├── tests/                       # Unit & Integration Tests
└── ...