-- Ananya Ahmed Tisha Portfolio — Supabase schema
-- Run in Supabase SQL Editor. Idempotent with IF NOT EXISTS where possible.

-- 1. Profile (single row, editable hero/about/contact)
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Ananya Ahmed Tisha',
  tagline text not null default 'Microbiology Researcher, Project Manager & Digital Science Communicator.',
  bio text not null default '',
  email text not null default 'ananyaahmedtisha@gmail.com',
  phone text not null default '+8801749911824',
  linkedin text not null default 'https://linkedin.com/in/ananya-ahmed-tisha',
  university text default 'BRAC University',
  degree text default 'BSc in Microbiology',
  credits_completed int default 105,
  cgpa numeric(3,2) default 3.83,
  hero_video_url text,
  hero_image_url text,
  resume_url text,
  available_for text default 'Research internships, translational projects & science communication collabs',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Experiences (timeline)
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  organization text not null,
  category text not null default 'Research' check (category in ('Research','Leadership','Volunteer','Fellowship','Club')),
  start_date date,
  end_date date,
  is_current boolean default false,
  location text,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists experience_photos (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid references experiences(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int default 0
);

-- 3. Projects & science communication
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  link_url text,
  link_label text,
  thumbnail_url text,
  tags text[] default '{}',
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. Portfolio gallery (Animation / Poster / Art / Photography)
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Animation','Poster','Art','Photography')),
  media_type text not null default 'image' check (media_type in ('image','video')),
  media_url text not null,
  thumbnail_url text,
  description text,
  year int,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 5. Achievements
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_name text not null,
  organizer text,
  award_placement text not null,
  date date,
  year int,
  thumbnail_url text,
  description text,
  category text default 'Poster' check (category in ('Poster','Art','Photography','Writing','Other')),
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 6. Skills (grouped)
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  group_name text not null check (group_name in ('Digital','Academic','Soft','Research Interest')),
  level int default 3 check (level between 1 and 5),
  sort_order int default 0
);

-- 7. Contact inbox (public can insert, only admin can read)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  body text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 8. Site settings (hero toggles, marquee, section visibility)
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  show_hero_video boolean default true,
  show_marquee boolean default true,
  marquee_items text[] default array['One-Health','AMR Awareness','Food Microbiology','3D Science Animation','Public Health','Dairy Fermentation'],
  updated_at timestamptz default now()
);

-- Updated-at trigger
create or replace function touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists trg_profile on profile;
create trigger trg_profile before update on profile for each row execute function touch_updated_at();
drop trigger if exists trg_settings on site_settings;
create trigger trg_settings before update on site_settings for each row execute function touch_updated_at();

-- RLS
alter table profile enable row level security;
alter table experiences enable row level security;
alter table experience_photos enable row level security;
alter table projects enable row level security;
alter table portfolio_items enable row level security;
alter table achievements enable row level security;
alter table skills enable row level security;
alter table messages enable row level security;
alter table site_settings enable row level security;

-- Public read for everything except messages
drop policy if exists "public read profile" on profile;
create policy "public read profile" on profile for select using (true);
drop policy if exists "public read experiences" on experiences;
create policy "public read experiences" on experiences for select using (true);
drop policy if exists "public read exp photos" on experience_photos;
create policy "public read exp photos" on experience_photos for select using (true);
drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects for select using (true);
drop policy if exists "public read portfolio" on portfolio_items;
create policy "public read portfolio" on portfolio_items for select using (true);
drop policy if exists "public read achievements" on achievements;
create policy "public read achievements" on achievements for select using (true);
drop policy if exists "public read skills" on skills;
create policy "public read skills" on skills for select using (true);
drop policy if exists "public read settings" on site_settings;
create policy "public read settings" on site_settings for select using (true);

-- Messages: anyone can insert, only authenticated can read/update/delete
drop policy if exists "anyone insert message" on messages;
create policy "anyone insert message" on messages for insert with check (true);
drop policy if exists "auth read messages" on messages;
create policy "auth read messages" on messages for select using (auth.role() = 'authenticated');
drop policy if exists "auth manage messages" on messages;
create policy "auth manage messages" on messages for update using (auth.role() = 'authenticated');
drop policy if exists "auth delete messages" on messages;
create policy "auth delete messages" on messages for delete using (auth.role() = 'authenticated');

-- Authenticated (admin) full access on content tables
do $$ begin
  -- helper: create manage policy per table
  create policy "auth manage profile" on profile for all using (auth.role()='authenticated') with check (auth.role()='authenticated');
exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage experiences" on experiences for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage exp photos" on experience_photos for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage projects" on projects for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage portfolio" on portfolio_items for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage achievements" on achievements for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage skills" on skills for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;
do $$ begin create policy "auth manage settings" on site_settings for all using (auth.role()='authenticated') with check (auth.role()='authenticated'); exception when duplicate_object then null; end $$;

-- Storage buckets (run once): portfolio-media (public), resumes (public)
-- insert into storage.buckets (id, name, public) values ('portfolio-media','portfolio-media', true) on conflict (id) do nothing;
-- insert into storage.buckets (id, name, public) values ('resumes','resumes', true) on conflict (id) do nothing;
-- Storage policies: public read, authenticated write
-- create policy "public read media" on storage.objects for select using (bucket_id in ('portfolio-media','resumes'));
-- create policy "auth upload media" on storage.objects for insert with check (bucket_id in ('portfolio-media','resumes') and auth.role()='authenticated');
-- create policy "auth update media" on storage.objects for update using (bucket_id in ('portfolio-media','resumes') and auth.role()='authenticated');
-- create policy "auth delete media" on storage.objects for delete using (bucket_id in ('portfolio-media','resumes') and auth.role()='authenticated');
