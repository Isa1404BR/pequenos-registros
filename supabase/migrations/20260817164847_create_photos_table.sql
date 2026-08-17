create table public.photos (
  id uuid primary key default gen_random_uuid(),
  milestone_id uuid not null references public.baby_milestones (id) on delete cascade,
  storage_path text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.photos enable row level security;
