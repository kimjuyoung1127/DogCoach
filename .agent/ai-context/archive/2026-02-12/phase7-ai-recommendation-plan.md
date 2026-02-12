# TailLog AI Recommendation System - Implementation Plan

Last Updated: 2026-02-12 (KST)
Status: In progress (policy hardening completed)

## Context
Phase 7 focuses on cost-first AI coaching recommendations for hackathon demo quality.
The system uses OpenAI `gpt-4o-mini` with cache/dedupe/budget controls.

## Fixed Policies
1. `GET /api/v1/coach/cost-status` is ADMIN-only.
2. Feedback action accepts only:
   - `archive`
   - `helpful`
   - `not_helpful`
3. `window_days` accepts only `7 | 15 | 30`.
4. Do not expose AI/rule source mode (`source`, `saving_mode`) to end users.
5. If `log_summaries` is missing, build a <=1200-char fallback summary from `behavior_logs`.

---

## Completed (Implemented)

### Backend
1. Admin-only `cost-status` enforcement
- File: `Backend/app/features/ai_recommendations/router.py`
- Change:
  - switched to required auth (`get_current_user_id`)
  - checks user role is `ADMIN`
  - returns `403` for non-admin

2. User role lookup utility added
- File: `Backend/app/features/auth/repository.py`
- Change:
  - added `get_user_role_by_id(db, user_id)`

3. Feedback action Enum enforcement
- File: `Backend/app/features/ai_recommendations/schemas.py`
- Change:
  - added `FeedbackAction` enum (`archive`, `helpful`, `not_helpful`)
  - `FeedbackRequest.action` and `FeedbackResponse.action` now enum-typed

4. `window_days` constraint hardening
- File: `Backend/app/features/ai_recommendations/schemas.py`
- Change:
  - `RecommendationRequest.window_days` changed to `Literal[7, 15, 30]`
- File: `Backend/app/features/ai_recommendations/router.py`
- Change:
  - `GET /recommendations/latest` query param `window_days` also restricted to `Literal[7, 15, 30]`

5. Snapshot existence/ownership validation for feedback
- Files:
  - `Backend/app/features/ai_recommendations/repository.py`
  - `Backend/app/features/ai_recommendations/service.py`
- Change:
  - added `get_snapshot_by_id`
  - `submit_feedback` now:
    - returns `404` if snapshot not found
    - returns `403` if owner mismatch (user_id/anonymous_sid)

### Frontend
6. Feedback action type safety
- File: `Frontend/src/components/features/ai-recommendations/types.ts`
- Change:
  - added `RecommendationFeedbackAction` union type

7. Hook mutation input hardening
- File: `Frontend/src/hooks/useQueries.ts`
- Change:
  - `useSubmitRecommendationFeedback` now requires `action: RecommendationFeedbackAction`

8. Component state/action typing updated
- File: `Frontend/src/components/features/ai-recommendations/RecommendationCard.tsx`
- Change:
  - internal feedback state/handler now strongly typed to allowed actions

### Docs
9. Deploy doc updated
- File: `docs/deploy.md`
- Change:
  - validation checklist now includes non-admin `403` check for `/api/v1/coach/cost-status`

10. Plan doc sanitized
- File: `.agent/ai-context/phase7-ai-recommendation-plan.md`
- Change:
  - removed secrets from plan content
  - aligned plan with fixed policy decisions

---

## Validation Results

### Backend
- `python -m compileall app` -> success
- `python -m pytest tests/features/test_ai_recommendations_policy.py -q` -> 3 passed

### Frontend
- `npm run build` -> success

### Encoding
- All changed files verified as UTF-8 + LF.
- Required note: `Encoding check: UTF-8 + LF verified for changed files.`

---

## Remaining Work (Next)
1. Add explicit API tests for:
   - `cost-status` auth matrix (ADMIN=200, USER/GUEST=403, unauth=401)
2. Wire admin-only usage path for `cost-status` (if admin UI is added later)
3. Continue Phase 7 items (budget dashboards, recommendation UX refinements)

---

## Files changed in this hardening step
- `Backend/app/features/auth/repository.py`
- `Backend/app/features/ai_recommendations/router.py`
- `Backend/app/features/ai_recommendations/schemas.py`
- `Backend/app/features/ai_recommendations/repository.py`
- `Backend/app/features/ai_recommendations/service.py`
- `Backend/tests/features/test_ai_recommendations_policy.py`
- `Frontend/src/components/features/ai-recommendations/types.ts`
- `Frontend/src/components/features/ai-recommendations/RecommendationCard.tsx`
- `Frontend/src/hooks/useQueries.ts`
- `docs/deploy.md`
- `.agent/ai-context/phase7-ai-recommendation-plan.md`

---

## Additional Implementation Update (2026-02-12, same day)

### Scope
Challenge modal flow was converted to support `A -> B -> C` in-place without exposing AI source details.

### Completed
1. Frontend API layer switched to real API only (DEMO removed)
- File: `Frontend/src/lib/api.ts`
- Change:
  - removed `DEMO_MODE`/`mockRequest`/local demo store logic
  - `NEXT_PUBLIC_API_URL` now required at runtime

2. Env guide updated for production-first flow
- File: `Frontend/.env.example`
- Change:
  - removed demo mode guidance
  - `NEXT_PUBLIC_API_URL` documented as required

3. Challenge modal C-option API hook added
- File: `Frontend/src/hooks/useQueries.ts`
- Change:
  - added `useFetchCAlternative(token)`
  - calls `POST /coach/recommendations`
  - normalizes top recommendation into modal `TrainingAlternative` (`id: "C"`)

4. Mission action logic refactored to queue model
- File: `Frontend/src/components/features/coach/MissionActionOverlay/useMissionAction.ts`
- Change:
  - added per-step queue/index state
  - flow fixed to `A -> B -> C`
  - C is requested on-demand (second ineffective action) and cached per step (max 1 API call/step)
  - API failure fallback to local C
  - source is never surfaced to UI

5. Mission overlay UI updated for A/B/C progression
- File: `Frontend/src/components/features/coach/MissionActionOverlay/index.tsx`
- Change:
  - aligned rendering with queue-based selection
  - user-facing labels unified as `Plan A/B/C`
  - removed source-exposing copy
  - fixed bug where some steps jumped to next A-step instead of switching to B

6. Separate AI recommendation card removed from coach page
- File: `Frontend/src/app/(app)/coach/page.tsx`
- Change:
  - removed top recommendation card/tabs section
  - modal-centric challenge UX retained
  - passes `dogId` to mission overlay for C fetch context

7. Result page mission overlay props synchronized
- File: `Frontend/src/app/(public)/result/page.tsx`
- Change:
  - passes `dogId` into mission overlay

8. Coach status API endpoints restored (regression fix)
- File: `Backend/app/features/coach/router.py`
- Change:
  - restored `POST /coach/status`
  - restored `GET /coach/status`
  - restored `DELETE /coach/status/{curriculum_id}/{stage_id}/{step_number}`

9. Supabase pgbouncer compatibility fix
- File: `Backend/app/core/database.py`
- Change:
  - when using `pooler.supabase.com`, use `NullPool`
  - set `connect_args.statement_cache_size = 0`
  - resolves `DuplicatePreparedStatementError` with transaction pooling

10. DB hotfix for training status persistence
- File: `Backend/supabase_schema.sql`
- Change:
  - added missing `training_status` enum (if not exists)
  - added missing `user_training_status` table
  - added required unique index for upsert conflict target
  - added RLS + service role policy

### Validation (additional)
- Backend: `python -m compileall app` -> success
- Frontend: `npm run build` -> success

### Notes
1. C-option requests can still return rule fallback when AI JSON validation fails; user flow is maintained.
2. Source transparency policy is preserved: users only see plan labels (`A/B/C`), not `AI/rule`.

---

## Additional Implementation Update (2026-02-12, end-of-day)

### Scope
Implemented time-series behavior snapshot comparison to support
"baseline vs later snapshot" trend analysis (improved/worsened/same).

### Completed
1. Snapshot storage policy changed to accumulate over time
- Files:
  - `Backend/app/shared/models.py`
  - `Backend/app/features/coach/service.py`
- Change:
  - removed single-row-per-curriculum behavior in service
  - changed model indexes from unique to normal lookup indexes
  - snapshot creation now always inserts a new row

2. Snapshot comparison response schema added
- File: `Backend/app/features/coach/schemas.py`
- Change:
  - added `BehaviorComparisonMetric`
  - added `BehaviorSnapshotComparisonResponse`
  - includes baseline/latest values, delta, change rate, trend, overall trend

3. Comparison service logic added
- File: `Backend/app/features/coach/service.py`
- Change:
  - added `get_behavior_snapshot_comparison(...)`
  - compares earliest snapshot vs latest snapshot
  - computes:
    - `avg_intensity` metric trend
    - `log_frequency_per_week` metric trend
    - `overall_trend` derived from metric trends

4. Behavior snapshot API contract updated
- File: `Backend/app/features/coach/router.py`
- Change:
  - `POST /coach/behavior-snapshot` now requires authenticated user
  - `GET /coach/behavior-snapshot/{curriculum_id}` now requires `dog_id` query for multi-dog safety
  - added `GET /coach/behavior-snapshot/compare?dog_id=...&curriculum_id=...`
  - compare route returns 404 when fewer than 2 snapshots exist

5. Frontend query hook added for comparison
- File: `Frontend/src/hooks/useQueries.ts`
- Change:
  - added `useBehaviorSnapshotComparison(...)`
  - wired to new compare endpoint

6. Supabase SQL updated for time-series behavior snapshots
- File: `Backend/supabase_schema.sql`
- Change:
  - dropped unique index `idx_behavior_snapshot_unique`
  - added lookup index `idx_behavior_snapshot_user_dog_curriculum`
  - added time index `idx_behavior_snapshot_created_at`
  - preserves RLS policy

### Validation (end-of-day)
- Backend: `python -m compileall app` -> success
- Frontend: `npm run build` -> success

### Operational notes
1. Run SQL section updates in Supabase before using compare endpoint in production.
2. Compare endpoint requires at least two snapshots for the same `(user, dog, curriculum)`.

---

## Additional Implementation Update (2026-02-12, late-night)

### Scope
Improved recommendation UX continuity (Result/Coach/Log), stabilized AI analysis API for report generation, and upgraded PDF report quality to be consultation-ready.

### Completed
1. Personalized challenge accessibility + immediate start flow
- Files:
  - `Frontend/src/components/features/coach/ChallengeJourneyMap.tsx`
  - `Frontend/src/app/(app)/coach/page.tsx`
  - `Frontend/src/app/(public)/result/page.tsx`
  - `Frontend/src/components/features/coach/ChallengeOnboardingModal.tsx`
  - `Frontend/src/data/curriculum/index.ts`
- Change:
  - added `unlockMode` (`all | progressive`) and applied `unlockMode="all"` on coach map
  - result-page onboarding now opens mission overlay directly (no forced redirect to coach)
  - onboarding copy updated to "recommended start + all days explorable"
  - issue-to-curriculum mapping hardened to scan all issue candidates (not only first entry)

2. Mission confetti policy refined
- File: `Frontend/src/components/features/coach/MissionActionOverlay/useMissionAction.ts`
- Change:
  - removed confetti on alternative-switch events
  - confetti now fires only on mission completion action

3. Entry-source-based completion navigation unified
- Files:
  - `Frontend/src/app/(app)/log/page.tsx`
  - `Frontend/src/app/(app)/coach/page.tsx`
  - `Frontend/src/app/(public)/result/page.tsx`
- Change:
  - pass `from=log` when entering coach from log page
  - on coach completion: if `from=log`, return to `/log?trainingSaved=1&tab=analytics`
  - result-origin completion now closes overlay without forced dashboard redirect

4. Analytics low-data UX upgraded
- File: `Frontend/src/components/features/log/AnalyticsView.tsx`
- Change:
  - for `< 5` logs, show preview/mock charts with explicit "example data" signaling
  - added progress indicator and guidance messaging to prevent "app not ready" perception

5. Report analysis API endpoint restored and hardened
- Files:
  - `Backend/app/features/coach/router.py`
  - `Backend/app/features/coach/service.py`
- Change:
  - added `POST /coach/analyze/{dog_id}` route with ownership verification
  - fixed model mismatch bug (`dog.age` -> computed age from `birth_date`)

6. AI analysis output structured + robust fallback
- Files:
  - `Backend/app/features/coach/prompts.py`
  - `Backend/app/features/coach/schemas.py`
  - `Backend/app/features/coach/service.py`
- Change:
  - prompt now enforces JSON-only response contract
  - response schema expanded with:
    - `top_patterns`
    - `next_7_days_plan`
    - `risk_signals`
    - `consultation_questions`
  - implemented JSON extraction/parsing utility and quality guards
  - added rule-based analysis fallback so placeholder texts are no longer emitted in normal failure paths

7. PDF report content enriched for trainer/vet consultation
- Files:
  - `Frontend/src/app/(app)/log/page.tsx`
  - `Frontend/src/components/features/log/ReportDocument.tsx`
- Change:
  - fallback analysis payload now includes concrete action plan/pattern/risk/question fields
  - PDF sections expanded:
    - top patterns
    - next 7-day plan
    - risk signals
    - consultation questions
  - fixed font runtime issue by removing unsupported italic style for `NotoSansKR`

### Validation (late-night)
- Backend: `python -m compileall app` -> success
- Frontend: `npm run build` -> success

### Operational notes
1. Restart backend server after router/service updates to expose `/api/v1/coach/analyze/{dog_id}`.
2. PDF generation now depends on structured analysis but remains resilient via rule-based fallback when AI output format drifts.
