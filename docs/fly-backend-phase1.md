# DogCoach Fly.io Phase 1 Runbook (Backend Only)

## 1) Scope
- Frontend (`www.mungai.co.kr`) stays as-is.
- Backend moves to Fly.io only.
- New API domain: `api.mungai.co.kr`.
- Keep Render as rollback safety for 7-14 days.

## 2) Backend App Bootstrap
From `Backend` directory:

```bash
fly launch --no-deploy --copy-config
```

Use these values:
- App name: `dogcoach-api` (or `dogcoach-api-prod` if unavailable)
- Region: `nrt`
- Config file: `Backend/fly.toml`

## 3) Secrets (Fly)
Set on `dogcoach-api`:

```bash
fly secrets set \
  DATABASE_URL="..." \
  SECRET_KEY="..." \
  SUPABASE_URL="..." \
  SUPABASE_ANON_KEY="..." \
  OPENAI_API_KEY="..." \
  KAKAO_API_KEY="..." \
  BACKEND_CORS_ORIGINS="https://www.mungai.co.kr,https://mungai.co.kr,http://localhost:3000,http://localhost:3001" \
  ANONYMOUS_COOKIE_SECURE="true" \
  ANONYMOUS_COOKIE_SAMESITE="none" \
  -a dogcoach-api
```

Notes:
- If Kakao is not used in production, skip `KAKAO_API_KEY`.
- Never commit secret values to git.

## 4) Deploy
From `Backend` directory:

```bash
fly deploy -a dogcoach-api
```

Smoke check:

```bash
fly status -a dogcoach-api
fly checks list -a dogcoach-api
curl https://dogcoach-api.fly.dev/health
```

Expected response:

```json
{"status":"ok"}
```

## 5) DNS Record Table (Input Template)
Only add `api` in phase 1.

| Host | Type | Value | TTL | Purpose |
|---|---|---|---|---|
| `api.mungai.co.kr` | `CNAME` | `<dogcoach-api.fly.dev>` | `300` | Fly backend API |
| `www.mungai.co.kr` | no change | existing value | existing | keep frontend stable |
| `mungai.co.kr` | no change | existing value | existing | keep frontend stable |

## 6) TLS Certificate

```bash
fly certs add api.mungai.co.kr -a dogcoach-api
fly certs check api.mungai.co.kr -a dogcoach-api
```

Proceed only after cert status is `Ready`.

## 7) Frontend Env Cutover
In current frontend hosting provider:

- `NEXT_PUBLIC_API_URL=https://api.mungai.co.kr`

No frontend code change required.

## 8) Validation Checklist
1. `GET https://api.mungai.co.kr/health` returns `{"status":"ok"}`.
2. `/api/v1/auth/me` works with valid token.
3. Survey submit -> result page load works.
4. Dashboard fetch works.
5. Supabase image upload works.
6. Browser console has no CORS errors on `www.mungai.co.kr`.
7. Guest cookie flow still works (survey -> dashboard -> migrate-guest).

## 9) Rollback
If API errors spike:
1. Revert frontend env `NEXT_PUBLIC_API_URL` to previous Render backend URL.
2. Redeploy/restart frontend.
3. Keep Fly app running for inspection.

## 10) Post-Cutover Cleanup (After 7-14 days stable)
1. Disable Render auto deploy.
2. Remove `render.yaml`.
3. Archive/replace old Render docs.
