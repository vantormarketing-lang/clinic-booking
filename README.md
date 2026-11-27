# Clinic Booking

Clinic Booking is an Arabic appointment-booking web app with a Node.js API backed by Neon Postgres. Work is being developed on `neon-backend-bootstrap`; production data and the default branch are not changed.

## Current features in this branch
- Public clinic profile and active doctors
- Weekly schedule list and appointment/time-off availability
- Patient booking endpoint; creates/updates patient by clinic+phone
- Database exclusion constraint handles simultaneous overlapping bookings
- Server-side schedule/time-off validation and future-time checks
- Staff API authenticated with Neon Auth JWT/JWKS and staff clinic membership
- Appointment list/status updates and doctor activation controls
- Basic public endpoint rate limiting, request validation, Helmet, explicit CORS allowlist, Render proxy IP handling
- Public booking UI at `public/index.html`
- CI workflow runs TypeScript build and tests

## Local development
1. Copy `.env.example` to `.env` and set a test-branch connection string.
2. Set `NEON_AUTH_JWKS_URL`, `NEON_AUTH_ISSUER`, and `NEON_AUTH_AUDIENCE` from the Neon Auth configuration for the deployment branch.
3. Set `CORS_ORIGIN` to the public frontend origin.
4. `npm install`
5. `npm run dev`

## Deployment (Render)
The repository includes `render.yaml` and `Dockerfile`. To deploy, connect the repository/branch to Render as a Blueprint and provide the environment values above in Render's dashboard. Never paste connection strings or auth secrets into GitHub. Use the isolated test branch during setup. Health endpoint: `/health/db`; booking page: `/`.

## Remaining release blockers
- Staff login UI/Neon Auth browser sign-in and staff onboarding/role management are not implemented.
- Admin interface is API-only; no visual admin console yet.
- Automated API integration tests against a disposable database are not complete; current tests cover input validation and a static security regression.
- Deployment has not been performed and the deployed health checks are not verified.
- Timezone-specific schedule rendering and end-to-end acceptance need a final pass.
- Before production: configure backup/restore, monitoring, privacy retention, and verify all access policies/roles.
