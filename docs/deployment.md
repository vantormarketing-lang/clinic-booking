# Deployment readiness checklist

This project has a Render Blueprint template in `render.yaml`, but no service is deployed yet.

## Required environment values (configure in Render dashboard; do not commit secrets)
- `DATABASE_URL`: Neon connection string for the isolated test branch until production launch is approved.
- `NEON_AUTH_JWKS_URL`: JWKS URL for the same Neon Auth environment.
- `NEON_AUTH_ISSUER`: exact JWT issuer from Neon Auth configuration.
- `NEON_AUTH_AUDIENCE`: exact JWT audience from Neon Auth configuration.
- `CORS_ORIGIN`: origin(s) of the deployed website, comma separated.
- `DATABASE_SSL=true`

## Launch steps
1. Confirm migrations against the isolated Neon test branch and test a full booking flow.
2. Sign in/configure Neon Auth and verify the issuer, audience and JWKS values.
3. Configure Render Blueprint from this repository and add environment variables in its dashboard.
4. Deploy, then verify `/health`, `/health/db`, and the public booking page.
5. Add a staff record only after the owner identity has been verified; do not grant owner role to unverified users.
6. Complete staff login UI/admin screens and cross-role tests before using real patient data.
7. Production connection and migrations require a separate explicit approval; this branch is intentionally isolated.
