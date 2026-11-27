# Security Notes

- DATABASE_URL is server-only; never use it in browser bundles.
- .env files are ignored by Git. Use environment secrets in hosting.
- CORS must list explicit trusted origins.
- Staff APIs must authenticate bearer tokens and verify signature, issuer, audience, and expiry before role checks.
- Every staff query must enforce clinic membership and role.
- Do not rely on RLS being enabled without policies; test using non-owner DB roles.
- Public booking routes need input validation, rate limiting, idempotency, and generic error messages.
- Do not expose patient data in logs or error payloads.


## Review notes
- Public booking is intentionally unauthenticated; apply per-IP rate limiting and monitor abuse before opening to real patients.
- Render proxy trust is limited to one hop so Express rate limiting can distinguish client IPs.
- Booking UI inserts doctor/day/slot labels as text, not HTML. Regression test guards against `innerHTML` assignments in the public page.
- Helmet Content Security Policy is disabled because the current static page uses inline scripts/styles. This remains a hardening item before production.
- No RLS policies are present on the test branch. Keep database credentials server-only and use a least-privilege DB role before production.
- Staff JWT middleware has not been verified with a real Neon Auth token and should not be considered production-ready until issuer/audience and sign-in flow are proven.
