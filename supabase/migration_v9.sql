-- v9: managed categories (admin adds, pickers list them)
-- Run in Supabase SQL Editor.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  scope text not null default 'Gallery' check (scope in ('Gallery', 'Experience', 'Achievement', 'Skill')),
  sort_order int default 0,
  created_at timestamptz default now(),
  unique(label, scope)
);

alter table categories enable row level security;

drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

do $$ begin
  create policy "auth manage categories" on categories for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

insert into categories (label, scope, sort_order) values
  ('Animation', 'Gallery', 0), ('Poster', 'Gallery', 1),
  ('Art', 'Gallery', 2), ('Photography', 'Gallery', 3),
  ('Research', 'Experience', 0), ('Leadership', 'Experience', 1),
  ('Volunteer', 'Experience', 2), ('Fellowship', 'Experience', 3),
  ('Club', 'Experience', 4),
  ('Poster', 'Achievement', 0), ('Art', 'Achievement', 1),
  ('Photography', 'Achievement', 2), ('Writing', 'Achievement', 3),
  ('Other', 'Achievement', 4),
  ('Digital', 'Skill', 0), ('Academic', 'Skill', 1),
  ('Soft', 'Skill', 2), ('Research Interest', 'Skill', 3)
on conflict (label, scope) do nothing;
