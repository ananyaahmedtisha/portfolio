-- v5: admin allowlist for password recovery guard
-- Run in Supabase SQL Editor.

create table if not exists admin_allowlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table admin_allowlist enable row level security;

drop policy if exists "public read allowlist" on admin_allowlist;
create policy "public read allowlist" on admin_allowlist for select using (true);

do $$ begin
  create policy "auth manage allowlist" on admin_allowlist for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

insert into admin_allowlist (email) values ('ananyaahmedtisha@gmail.com')
on conflict (email) do nothing;
