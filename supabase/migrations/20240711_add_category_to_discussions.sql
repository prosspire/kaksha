-- Add category column to discussions table
ALTER TABLE discussions ADD COLUMN IF NOT EXISTS category TEXT;

-- Enable realtime for discussions table
alter publication supabase_realtime add table discussions;