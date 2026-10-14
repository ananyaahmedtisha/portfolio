-- v8: multiple photos per achievement
-- Run in Supabase SQL Editor.

create table if not exists achievement_photos (
  id uuid primary key default gen_random_uuid(),
  achievement_id uuid references achievements(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int default 0
);

alter table achievement_photos enable row level security;

drop policy if exists "public read ach photos" on achievement_photos;
create policy "public read ach photos" on achievement_photos
  for select using (true);

do $$ begin
  create policy "auth manage ach photos" on achievement_photos for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

-- backfill existing single thumbnails as first photos
insert into achievement_photos (achievement_id, image_url, caption, sort_order)
select id, thumbnail_url, title, 0 from achievements
where thumbnail_url is not null and thumbnail_url <> ''
  and not exists (select 1 from achievement_photos ap where ap.achievement_id = achievements.id);
