# Project Structure

## Frontend (Next.js)
Frontend/
├── public/                      # Static assets (images, fonts, manifest)
├── src/
│   ├── app/
│   │   ├── (public)/            # Public pages
│   │   │   ├── layout.tsx       # Public layout (Header/Footer wrapper)
│   │   │   ├── page.tsx         # Landing Page (Main)
│   │   │   ├── login/           # Login Page
│   │   │   ├── checkup/         # Diagnosis Survey Page
│   │   │   └── result/          # Analysis Result Page
│   │   ├── (app)/               # Protected app pages (Dashboard, Log, Analytics)
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
│   │   │   ├── Header.tsx       # Responsive Navigation
│   │   │   ├── Footer.tsx       # Site Footer
│   │   │   └── Sidebar.tsx      # App Sidebar
│   │   ├── cards/               # Business UI Cards
│   │   ├── charts/              # Visualizations
│   │   ├── features/            # Feature-specific logic
│   │   ├── forms/               # Complex logic forms
│   │   ├── shared/              # Reusable shared components
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
│   ├── repositories/            # Database Access Layer (CRUD)
│   ├── schemas/                 # Pydantic Data Schemas
│   ├── services/                # Business Logic Services
│   ├── tasks/                   # Background Tasks (Scheduler, Notifications)
│   ├── utils/                   # Helpers (Logger, Validators)
│   └── main.py                  # Application Entry Point
├── tests/                       # Unit & Integration Tests
└── ...
