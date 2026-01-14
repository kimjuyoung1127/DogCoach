# Project Structure

## Frontend (Next.js)
Frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/            # Public pages (Landing, Login, Checkup, Result)
│   │   ├── (app)/               # Protected app pages (Dashboard, Log, Analytics, etc.)
│   │   └── api/                 # Next.js API Routes (Auth, proxy, etc.)
│   ├── components/
│   │   ├── cards/               # Business UI Cards (Behavior, Stats, Mission)
│   │   ├── charts/              # Visualizations (Heatmap, Trends)
│   │   ├── features/            # Feature-specific logic grouping
│   │   ├── forms/               # Complex forms (Login, LogEntry, Profile)
│   │   ├── layout/              # Global layout components (Header, Sidebar)
│   │   ├── shared/              # Reusable shared components
│   │   └── ui/                  # Atomic UI components (shadcn/ui)
│   ├── hooks/                   # Custom Hooks (useAuth, useLogs, etc.)
│   ├── lib/                     # Libraries & Utils (Supabase, API client, Zod)
│   ├── store/                   # Global State (Zustand)
│   ├── styles/                  # Global CSS
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
