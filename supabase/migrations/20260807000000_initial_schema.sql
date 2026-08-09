-- Initial schema: profiles, task_templates, user_tasks, notifications
-- Covers the Phase 1 MVP (bureaucracy checklist + deadline notifications).

create extension if not exists "pgcrypto";

-- ===== PROFILES =====
-- One row per authenticated user, keyed to auth.users.
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  university_name text,
  study_program text,
  home_country text,
  arrival_date date,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles are viewable by owner"
  on profiles for select
  using (auth.uid() = id);

create policy "profiles are insertable by owner"
  on profiles for insert
  with check (auth.uid() = id);

create policy "profiles are updatable by owner"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===== TASK TEMPLATES =====
-- Master list of Germany-specific bureaucracy steps. Readable by everyone,
-- writable only via the service role (admin/CMS tooling), so no owner column.
create table task_templates (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text,
  typical_deadline_days_after_arrival int,
  order_index int not null default 0,
  required_documents text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table task_templates enable row level security;

create policy "task templates are publicly readable"
  on task_templates for select
  using (true);

insert into task_templates (category, title, description, typical_deadline_days_after_arrival, order_index, required_documents)
values
  ('Anmeldung', 'City Registration (Anmeldung)', 'Register your address at the local Bürgeramt within 14 days of moving in.', 14, 1, array['Passport', 'Rental contract (Wohnungsgeberbestätigung)']),
  ('Health Insurance', 'Set Up Health Insurance', 'Enroll in public or private health insurance — required before university enrollment.', 21, 2, array['Passport', 'University admission letter']),
  ('Blocked Account', 'Open a Blocked Account', 'Open a Sperrkonto to prove financial resources for your visa/residence permit.', 0, 3, array['Passport', 'Visa application']),
  ('Visa Extension', 'Visa Extension / Residence Permit', 'Book an appointment at the Ausländerbehörde before your entry visa expires.', 60, 4, array['Passport', 'Anmeldung certificate', 'Health insurance proof', 'Blocked account proof']),
  ('Transport', 'Public Transport Ticket', 'Get your semester ticket or local transport pass.', 7, 5, array['Student ID']);

-- ===== USER TASKS =====
-- Per-user progress against the task templates.
create type task_status as enum ('not_started', 'in_progress', 'pending_document', 'completed');

create table user_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  template_id uuid not null references task_templates(id) on delete cascade,
  status task_status not null default 'not_started',
  due_date date,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, template_id)
);

create index user_tasks_user_id_idx on user_tasks(user_id);
create index user_tasks_due_date_idx on user_tasks(due_date) where status <> 'completed';

alter table user_tasks enable row level security;

create policy "users manage their own tasks"
  on user_tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ===== NOTIFICATIONS =====
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  related_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on notifications(user_id);

alter table notifications enable row level security;

create policy "users view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "users mark their own notifications read"
  on notifications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Inserts come from the deadline-reminders Edge Function using the service role key,
-- which bypasses RLS — no insert policy is granted to regular users.
