# Release Acceptance Checklist

Do not mark the site production-ready until each item has evidence.

## Database
- [ ] Migrations run from a clean test branch
- [ ] Foreign keys and check constraints reviewed
- [ ] Schedule-overlap prevention validated
- [ ] Appointment-overlap exclusion validated (including cancelled/no-show edge cases)
- [ ] Clinic boundaries validated for every query
- [ ] Audit events written for booking and status transitions
- [ ] RLS enabled and policies tested using non-owner roles

## Auth and staff access
- [ ] Auth provider integration and JWT issuer/audience verified
- [ ] Owner/doctor/receptionist role checks on every management endpoint
- [ ] Clinic-scoped access checked (no cross-clinic access)
- [ ] Unauthenticated and unauthorized requests rejected
- [ ] Secrets never included in client code or Git

## Booking API
- [ ] Clinic and active doctor lookup
- [ ] Schedule/time-off validation
- [ ] Slot duration and timezone handling
- [ ] Booking transaction + patient upsert
- [ ] Concurrent same-slot request test: one success, one conflict
- [ ] Idempotency-key behavior
- [ ] Rate limiting and input validation
- [ ] Cancellation/status transitions authorized and audited

## Frontend and deploy
- [ ] UI consumes API only (no direct database credentials)
- [ ] Error, loading, and retry states
- [ ] Responsive behavior and accessibility checks
- [ ] README and environment examples complete
- [ ] npm build and automated tests pass
- [ ] Deployment environment secrets configured
- [ ] Smoke test in deployed environment

## Evidence
Attach test run output, migration logs, and deployment URL before approval.
