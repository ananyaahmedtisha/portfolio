-- v2: multi-page support (academics, blog, home gallery, portrait)
-- Run AFTER supabase/schema.sql in Supabase SQL Editor.

alter table profile add column if not exists portrait_url text;

alter table portfolio_items add column if not exists show_on_home boolean default false;

create table if not exists academics (
  id uuid primary key default gen_random_uuid(),
  level text not null check (level in ('University','College','School','Other')),
  institution text not null,
  program text,
  period text,
  result text,
  description text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  excerpt text,
  body text,
  cover_url text,
  published boolean default true,
  published_at date default current_date,
  read_minutes int default 5,
  created_at timestamptz default now()
);

alter table academics enable row level security;
alter table blog_posts enable row level security;

drop policy if exists "public read academics" on academics;
create policy "public read academics" on academics for select using (true);
drop policy if exists "public read blogs" on blog_posts;
create policy "public read blogs" on blog_posts for select using (published = true);

do $$ begin
  create policy "auth manage academics" on academics for all using (auth.role()='authenticated') with check (auth.role()='authenticated');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth manage blogs" on blog_posts for all using (auth.role()='authenticated') with check (auth.role()='authenticated');
exception when duplicate_object then null; end $$;
