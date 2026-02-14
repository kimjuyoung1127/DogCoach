# E2E Test Scenarios: Guest → Login → Migrate

Last Updated: 2026-02-14

## Backend API Tests (✅ Implemented)

Location: `Backend/tests/features/test_e2e_guest_migration.py`

### Test Cases
1. ✅ `test_e2e_guest_to_user_migration`: 게스트 → 인증 → 마이그레이션 성공
2. ✅ `test_e2e_guest_no_data_migration`: 게스트 데이터 없는 경우
3. ✅ `test_e2e_idempotent_migration`: 멱등성 검증 (2회 호출)
4. ✅ `test_e2e_jit_user_creation`: JIT 사용자 생성 + 마이그레이션

### Running Tests
```bash
cd Backend
source venv/Scripts/activate  # or .\venv\Scripts\activate (PowerShell)
python -m pytest tests/features/test_e2e_guest_migration.py -v
```

---

## Frontend E2E Scenarios (📋 Manual Checklist)

### Pre-requisites
- Backend server running: http://127.0.0.1:8000
- Frontend server running: http://localhost:3000
- Supabase OAuth configured (Google Provider)

### Scenario 1: Guest → OAuth Login → Migration

#### Step 1: Guest Survey (Anonymous)
1. Open browser in **Incognito/Private mode**
2. Navigate to `http://localhost:3000/survey`
3. Complete survey questions:
   - Dog name: "TestDog"
   - Breed: "Labrador"
   - Age, sex, behavior issues
4. Submit survey
5. **Verify**: `anonymous_sid` cookie is set (DevTools > Application > Cookies)
6. **Verify**: Can view partial results (non-Pro features only)

#### Step 2: OAuth Login
1. Click "로그인" or "Sign In" button
2. Redirect to Supabase OAuth (Google)
3. Authenticate with Google account
4. **Verify**: Redirected to `/auth/callback`
5. **Verify**: Session token stored (localStorage or cookie)

#### Step 3: Automatic Migration
1. After login redirect, app automatically calls `POST /auth/migrate-guest`
2. **Verify**: No error toast/notification
3. **Verify**: Dashboard shows migrated dog ("TestDog")
4. **Verify**: `anonymous_sid` cookie still exists (used for migration)

#### Step 4: Data Verification
1. Navigate to Dashboard
2. **Verify**: Dog "TestDog" is listed under current user
3. **Verify**: Behavior logs (if any) are visible
4. **Verify**: No duplicate dogs created

#### Step 5: Idempotency Check
1. Manually call migration again (or trigger re-login)
2. **Verify**: No errors
3. **Verify**: No duplicate data
4. **Verify**: `migrated_count=0` in response (check Network tab)

---

### Scenario 2: Direct Login (No Guest Data)

#### Steps
1. Open browser in **Incognito mode**
2. Navigate to `http://localhost:3000`
3. Click "로그인" (without taking survey)
4. Authenticate with Google
5. **Verify**: Redirected to Dashboard
6. **Verify**: No dogs listed (empty state)
7. **Verify**: Can create new dog via onboarding

---

### Scenario 3: Multiple Guest Sessions → Single User

#### Steps
1. **Session A** (Browser 1, Incognito):
   - Take survey, create "DogA"
   - Note `anonymous_sid` from cookie (e.g., "session_abc")
2. **Session B** (Browser 2, Incognito):
   - Take survey, create "DogB"
   - Note `anonymous_sid` (e.g., "session_xyz")
3. **Login as User**:
   - Use Session A browser
   - Login with Google (User ID: `user_123`)
   - **Verify**: Only "DogA" migrated
4. **Login as Same User (Session B)**:
   - Use Session B browser
   - Login with same Google account (`user_123`)
   - **Expected**: "DogB" also migrated to `user_123`
   - **Verify**: Dashboard shows both "DogA" and "DogB"

---

## Automated Frontend E2E (🔜 Future)

### Tools
- **Playwright** (recommended for Next.js)
- **Cypress** (alternative)

### Implementation Plan
1. Create `Frontend/tests/e2e/guest-migration.spec.ts`
2. Mock Supabase OAuth redirect (or use test account)
3. Automate:
   - Survey submission
   - Cookie capture
   - OAuth flow (with test credentials)
   - Migration API call verification
   - Dashboard data assertion

### Sample Test Structure (Playwright)
```typescript
// Frontend/tests/e2e/guest-migration.spec.ts
import { test, expect } from '@playwright/test';

test('Guest → Login → Migration', async ({ page, context }) => {
  // Step 1: Guest survey
  await page.goto('http://localhost:3000/survey');
  await page.fill('[name="dogName"]', 'TestDog');
  await page.click('button[type="submit"]');

  // Capture anonymous_sid cookie
  const cookies = await context.cookies();
  const anonymousSid = cookies.find(c => c.name === 'anonymous_sid');
  expect(anonymousSid).toBeDefined();

  // Step 2: Login (mock OAuth or use test account)
  await page.goto('http://localhost:3000/login');
  // ... OAuth flow ...

  // Step 3: Verify migration
  await expect(page.locator('text=TestDog')).toBeVisible();
});
```

---

## Acceptance Criteria

### Backend Tests ✅
- [x] All 4 test cases pass
- [x] No `critical` or `high` severity issues
- [x] Test execution time < 5 seconds

### Frontend Manual Tests 📋
- [ ] Scenario 1: Guest → Login → Migration (all steps verified)
- [ ] Scenario 2: Direct Login (no guest data)
- [ ] Scenario 3: Multiple guest sessions

### Production Readiness 🚀
- [ ] Backend tests pass in CI/CD
- [ ] Frontend E2E automated (Playwright/Cypress)
- [ ] OAuth callback tested on production domain
- [ ] Migration tracking/logging in place

---

## Troubleshooting

### Issue: anonymous_sid not set
- **Cause**: Cookie not sent with `credentials: 'include'`
- **Fix**: Verify `api.ts` uses `credentials: 'include'`

### Issue: Migration returns 0 dogs
- **Cause**: Guest dog not found (wrong `anonymous_sid`)
- **Debug**: Check `dogs` table for `anonymous_sid` match

### Issue: OAuth callback 404
- **Cause**: Supabase redirect URL mismatch
- **Fix**: Update Supabase Console: `http://localhost:3000/auth/callback`

### Issue: Duplicate dogs after migration
- **Cause**: Migration called multiple times, non-idempotent
- **Fix**: Verify `claim_dogs_for_user` updates `anonymous_sid` to `NULL`

---

## Next Steps

1. ✅ Backend API tests implemented and passing
2. 📋 Manual Frontend testing (use checklist above)
3. 🔜 Playwright setup for automated E2E
4. 🔜 Add migration tracking/analytics
5. 🔜 Production OAuth callback testing
