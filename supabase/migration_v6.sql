-- v6: gallery visibility flag
-- Run in Supabase SQL Editor.

alter table portfolio_items
  add column if not exists show_in_gallery boolean default true;

update portfolio_items set show_in_gallery = true where show_in_gallery is null;

alter table portfolio_items
  add column if not exists show_on_home boolean default false;
