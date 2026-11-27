# Security Notes

- DATABASE_URL is server-only; never use it in browser bundles.
- .env files are ignored by Git. Use environment secrets in hosting.
- CORS must list explicit trusted origins.
- Staff APIs must authenticate bearer tokens and verify signature, issuer, audience, and expiry before role checks.
- Every staff query must enforce clinic membership and role.
- Do not rely on RLS being enabled without policies; test using non-owner DB roles.
- Public booking routes need input validation, rate limiting, idempotency, and generic error messages.
- Do not expose patient data in logs or error payloads.
