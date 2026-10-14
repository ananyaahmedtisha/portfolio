-- v7: free-form categories (admin can add new ones)
-- Run in Supabase SQL Editor.

alter table experiences drop constraint if exists experiences_category_check;
alter table portfolio_items drop constraint if exists portfolio_items_category_check;
alter table achievements drop constraint if exists achievements_category_check;
alter table skills drop constraint if exists skills_group_name_check;
alter table academics drop constraint if exists academics_level_check;
