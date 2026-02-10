# Future Roadmap: Scalable Training Alternatives (Plan C, D...)

Current implementation supports a binary choice (Plan A vs. Plan B). To support multiple alternatives (Plan C, D, etc.) and infinite scalability, the following architectural evolutionary steps are proposed.

## 1. Database Schema Evolution
The current `UserTrainingStatus` Enum (`SKIPPED_INEFFECTIVE`) does not distinguish *which* alternative was selected once 2+ alternatives exist.

### Phase 1: Enhanced Status Tracking (Short-term)
- **Action**: Add a `metadata` or `note` JSONB column to `user_training_status` table.
- **Purpose**: Store specific alternative IDs.
    ```json
    { "selected_alternative_id": "C", "reason": "ineffective" }
    ```

### Phase 2: Dedicated Alternatives Table (Long-term)
- **Action**: Create `CurriculumAlternatives` and `UserTrainingCommonHistory` tables.
- **Structure**:
    - `CurriculumAlternatives`: Store content for Plan B, C, D separate from the main JSON to reduce payload size.
    - `UserAlternativeHistory`: Track every attempt/swap history.

## 2. API & Backend Logic Updates
- **Endpoint**: `POST /coach/status` needs to accept dynamic status descriptors.
- **Migration**:
    - Deprecate rigid Enum `TrainingStatus` for *detailed* tracking.
    - Introduce `TrainingOutcome` type: `SUCCESS | STOPPED | SWAPPED`.
    - If `SWAPPED`, require `next_plan_id`.

## 3. Frontend Architecture Refactor
The current UI is optimized for a binary toggle.

### component/MissionActionOverlay
- **State Management**:
    - Change `swappedSteps: Record<number, boolean>` → `swappedSteps: Record<number, string>` (stores Plan ID).
- **UI UX**:
    - **Selector Interface**: Instead of a "Swap" button, introduce a "Find Alternative" carousel or list.
    - **Dynamic Flow**:
        - "This didn't work" → Show List of Options (Plan B, Plan C, Plan D).
        - User selects "Plan C" → UI transitions to Plan C content.
- **Data Hook**:
    - `useMissionAction` needs to handle array-based alternative lookups dynamically.

## 4. Content Management (CMS)
- **Scalability**: Hardcoding Typescript files (`separation_anxiety.ts`) will become unmanageable.
- **Goal**: Move curriculum data to a database or Headless CMS.
    - Allow Content Designers to add Plan C/D without code deploys.
    - Dynamic fetching of alternatives based on User's Dog Profile (AI Matching).

## 5. AI Recommendation Engine
- **Feature**: "Smart Plan Selection"
- **Logic**: instead of static A → B → C order, AI analyzes user logs and suggest the *best* alternative immediately.
    - e.g., "For a high-energy dog, skip Plan B (Food) and go straight to Plan C (Toy Reward)."
