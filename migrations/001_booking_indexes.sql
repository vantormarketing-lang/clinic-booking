-- Add performance indexes for booking lookup patterns.
-- This migration is intentionally additive. Run it on an isolated Neon branch first.
CREATE INDEX IF NOT EXISTS doctors_clinic_active_name_idx
  ON public.doctors (clinic_id, is_active, name);

CREATE INDEX IF NOT EXISTS patients_clinic_phone_idx
  ON public.patients (clinic_id, phone);

CREATE INDEX IF NOT EXISTS appointments_clinic_status_start_idx
  ON public.appointments (clinic_id, status, starts_at);

CREATE INDEX IF NOT EXISTS appointments_doctor_status_start_idx
  ON public.appointments (doctor_id, status, starts_at);

CREATE INDEX IF NOT EXISTS schedules_doctor_weekday_idx
  ON public.schedules (doctor_id, weekday);

CREATE INDEX IF NOT EXISTS time_off_doctor_starts_idx
  ON public.time_off (doctor_id, starts_at);

CREATE INDEX IF NOT EXISTS weekly_reports_clinic_week_idx
  ON public.weekly_reports (clinic_id, week_start DESC);
