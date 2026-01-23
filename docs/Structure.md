# Project Structure

## Frontend (Next.js)
```
Frontend/
├── public/                      # Static assets
├── src/
│   ├── app/
│   │   ├── (public)/            # Public pages
│   │   │   ├── Survey/          # Diagnosis Survey Flow
│   │   │   └── result/          # Analysis Result Page
│   │   ├── (app)/               # Protected app pages
│   │   │   ├── dashboard/       # Main App Entry
│   │   │   └── log/             # Behavior Logging
│   │   └── api/                 # Next.js API Routes (Proxy/Edge)
│   ├── components/
│   │   ├── features/            # Feature Modules
│   │   │   ├── survey/          # Survey Logic (Wizard Flow)
│   │   │   │   ├── SurveyContainer.tsx
│   │   │   │   ├── survey-mapper.ts  # [NEW] Data Transformation
│   │   │   │   └── steps/...
│   │   │   └── result/          # Analysis Result Views
│   │   │   └── dashboard/       # Dashboard Widgets
│   │   └── shared/              # Reusable UI Components
│   ├── hooks/
│   │   └── useAuth.ts           # [NEW] Supabase Auth & Guest Login
│   ├── lib/
│   │   ├── api.ts               # [NEW] Backend API Client (Fetch Wrapper)
│   │   ├── supabase.ts          # [NEW] Supabase Client Setup
│   │   └── utils.ts             # Tailwind Merge & Helper
│   ├── store/                   # Global State (Zustand)
│   └── types/                   # TypeScript Definitions
```

## Backend (FastAPI - Feature-based Architecture)
```
Backend/
├── app/
│   ├── core/
│   │   ├── config.py            # Environment Variables (Pydantic Settings)
│   │   ├── database.py          # Async Database Session
│   │   ├── security.py          # JWT & Supabase Auth Verification
│   │   └── exceptions.py        # [NEW] Global Exception Handler
│   ├── shared/
│   │   ├── models.py            # Centralized Database Models
│   │   └── utils/
│   │       └── timezone.py      # [NEW] Timezone conversion utils
│   ├── features/                # Domain Modules (Router → Service → Repo)
│   │   ├── auth/                # Authentication & User Profile
│   │   │   ├── router.py
│   │   │   ├── service.py
│   │   │   ├── repository.py
│   │   │   └── schemas.py
│   │   ├── onboarding/          # Survey & Dog Registration
│   │   │   ├── router.py        # POST /survey
│   │   │   ├── service.py
│   │   │   ├── repository.py    # Atomic Transaction
│   │   │   └── schemas.py       # Pydantic Validation
│   │   ├── log/                 # [NEW] Behavior Logging
│   │   │   ├── router.py        # POST /logs (X-Timezone support)
│   │   │   ├── service.py
│   │   │   ├── repository.py    # Composite Index Optimization
│   │   │   └── schemas.py
│   │   ├── dashboard/           # (Planned) Stats & Metrics
│   │   └── coach/               # (Planned) RAG & AI Advice
│   └── main.py                  # App Entry Point & Router Assembly
├── tests/                       # Pytest
├── .env                         # Environment Variables
└── requirements.txt
```