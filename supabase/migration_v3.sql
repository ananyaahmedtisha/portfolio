-- v3: editable homepage "Exploring" topics
-- Run in Supabase SQL Editor.

alter table site_settings
  add column if not exists exploring_topics text[]
  default array['Food Microbiology','AMR Awareness','Dairy Fermentation','3D Science Animation','Public Health'];

-- backfill existing row
update site_settings
set exploring_topics = array['Food Microbiology','AMR Awareness','Dairy Fermentation','3D Science Animation','Public Health']
where exploring_topics is null;
