-- v4: editable hero role lines + status pill
-- Run in Supabase SQL Editor.

alter table site_settings
  add column if not exists role_line_1 text default 'BSc in Microbiology · BRAC University',
  add column if not exists role_line_2 text default 'Millennium Fellow · Project Manager & Science Communicator',
  add column if not exists status_pill text default 'Open to Opportunities · Dhaka, Bangladesh';

update site_settings set
  role_line_1 = coalesce(role_line_1, 'BSc in Microbiology · BRAC University'),
  role_line_2 = coalesce(role_line_2, 'Millennium Fellow · Project Manager & Science Communicator'),
  status_pill = coalesce(status_pill, 'Open to Opportunities · Dhaka, Bangladesh')
where id = 1;
