-- ============================================================================
-- Course progress cross-device sync
-- Adds a single row per user storing the CourseProgress blob.
-- Referenced from: src/pages/api/progress/me.ts, src/hooks/useCourseProgress.ts
--
-- Safety: the API endpoint gracefully no-ops when this table doesn't exist,
-- so the app keeps working from localStorage until this migration runs.
-- Run this on the Supabase project whenever you want to flip on sync.
-- ============================================================================

create table if not exists public.course_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh on every upsert (idempotent)
create or replace function public.course_progress_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end
$$;

drop trigger if exists course_progress_set_updated_at on public.course_progress;
create trigger course_progress_set_updated_at
  before update on public.course_progress
  for each row execute function public.course_progress_touch_updated_at();

-- Row-level security: users can only read/write their own row.
alter table public.course_progress enable row level security;

drop policy if exists "course_progress_select_own" on public.course_progress;
create policy "course_progress_select_own"
  on public.course_progress for select
  using (auth.uid() = user_id);

drop policy if exists "course_progress_insert_own" on public.course_progress;
create policy "course_progress_insert_own"
  on public.course_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "course_progress_update_own" on public.course_progress;
create policy "course_progress_update_own"
  on public.course_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- No delete policy — course progress is append-only from a user's perspective;
-- row auto-deletes when the auth.user record is deleted via ON DELETE CASCADE.
