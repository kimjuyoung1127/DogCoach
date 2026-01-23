# Backend Documentation (DogCoach API)

## 1. Architecture Overview
The backend follows a **Feature-based Architecture** to ensure maintenance and scalability.

```
Backend/
├── app/
│   ├── core/                  # Project-wide settings (Static/Infra)
│   │   ├── config.py          # Env vars (Pydantic Settings)
│   │   ├── database.py        # Async Database Session (SQLAlchemy + AsyncPG)
│   │   ├── security.py        # Supabase Auth / JWT Validation
│   │   └── exceptions.py      # Global Exception Handlers
│   │
│   ├── shared/                # Common resources across features
│   │   ├── models.py          # SQLAlchemy ORM Models (Centralized)
│   │   └── utils/             # Timezone, Logger, etc.
│   │
│   ├── features/              # Business Logic (Domain Driven)
│   │   ├── auth/              # User Access
│   │   ├── onboarding/        # Survey & Profile
│   │   ├── dashboard/         # Main View Aggregation
│   │   ├── log/               # Behavior Tracking
│   │   ├── coach/             # AI Analysis
│   │   └── settings/          # User Preferences
│   │
│   └── main.py                # App Entrypoint
```

## 2. Technology Stack
-   **Framework**: FastAPI (Python 3.10+)
-   **Database**: Supabase (PostgreSQL)
-   **ORM**: SQLAlchemy 2.0 (AsyncIO)
-   **Driver**: asyncpg
-   **Auth**: Supabase Auth (JWT)
-   **Validation**: Pydantic v2
-   **AI**: OpenAI API (GPT-4o)

## 3. Implementation Status

### ✅ Phase 1: Foundation (Core & Shared)
Infrastructure setup is complete.
-   **Config**: Environment variables loaded via `pydantic-settings`.
-   **Database**: Connection pooling configured with `async_sessionmaker`.
-   **Models**: Full schema implementation (`User`, `Dog`, `BehaviorLog`, etc.) with correct relationships and types.
-   **Security**: JWT validation dependency (`get_current_user`).

### ⏳ Phase 2: User Access (Auth & Onboarding)
-   [ ] **Auth**: `GET /me` endpoint to verify token and return user profile.
-   [ ] **Onboarding**: Survey submission API (`POST /survey`) to save dog profile and initial logs.

### ⏳ Phase 3: Core Loop (Log & Dashboard)
-   [ ] **Log**: CRUD for behavior logs (`POST /logs`).
-   [ ] **Dashboard**: Aggregated stats and daily mission status.

### ⏳ Phase 4: Intelligence (Coach & Settings)
-   [ ] **Coach**: RAG pipeline for AI advice.
-   [ ] **Settings**: User preference management.

## 4. Key Implementation Rules
1.  **One-Way Dependency**: Router -> Service -> Repository.
2.  **Shared Models**: All ORM models reside in `app/shared/models.py` to prevent circular imports.
3.  **Type Safety**: Use Pydantic schemas for all API Inputs/Outputs and JSONB fields.
