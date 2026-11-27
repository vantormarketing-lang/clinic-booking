# Clinic Booking

Clinic booking platform: static client + Express/TypeScript API + PostgreSQL (Neon).

## Status
This branch is a work-in-progress integration branch. The API currently provides health endpoints only; appointment booking, staff authentication/authorization, management endpoints, frontend API integration, and automated DB tests are not complete or validated.

## Run locally
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a Neon connection string (server-only; never expose it to the browser).
3. Set `CORS_ORIGIN` to the exact frontend origin.
4. Run `npm install`, then `npm run dev`.
5. Check `GET /health` and `GET /health/db`.

## Database migrations
Review and apply migration files manually only after testing against a separate Neon branch. Never run unreviewed migrations against production.

## Security checklist before deployment
- JWT verification and clinic-scoped staff roles (owner, doctor, receptionist)
- server-only database connection with least-privilege role
- RLS policies and permission tests
- booking transaction + overlap constraint handling
- rate limits, input validation, audit logs, and secret rotation
- automated build/test and deploy health checks
- frontend moved from legacy direct Supabase access to API calls
