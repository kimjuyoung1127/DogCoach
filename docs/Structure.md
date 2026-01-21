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
│   │   ├── features/            # Domain-specific Feature Modules
│   │   │   ├── challenge/       # Gamification & Challenge Flow
│   │   │   │   ├── ChallengeOnboardingModal.tsx
│   │   │   │   └── MissionActionOverlay.tsx
│   │   │   ├── dashboard/       # Dashboard Widgets
│   │   │   │   ├── ChallengeMap.tsx
│   │   │   │   ├── DailyBriefing.tsx
│   │   │   │   ├── MissionTracker.tsx
│   │   │   │   └── QuickLogGrid.tsx
│   │   │   ├── landing/         # Landing Page Sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── SocialProofSection.tsx
│   │   │   │   └── PricingSection.tsx
│   │   │   ├── log/             # Behavior Logging Cards
│   │   │   ├── result/          # Analysis Result Views
│   │   │   │   ├── ActionPlanCard.tsx
│   │   │   │   ├── BarkingHeatmap.tsx
│   │   │   │   ├── LockedAnalysisSection.tsx
│   │   │   │   └── ResultHeader.tsx
│   │   │   └── survey/          # Onboarding Survey Logic
│   │   │       ├── Step1Profile.tsx
│   │   │       ├── Step4ABC.tsx
│   │   │       ├── Step5Triggers.tsx
│   │   │       └── SurveyContainer.tsx
│   │   ├── shared/              # Shared Business Components
│   │   │   └── layout/          # Global Layouts
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── BottomNav.tsx
│   │   └── ui/                  # Atomic UI Components (Buttons, Cards, Inputs)
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── SelectableCard.tsx
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