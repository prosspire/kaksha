-- Add category column to discussions table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'discussions' 
                AND column_name = 'category') THEN
    ALTER TABLE discussions ADD COLUMN category TEXT;
  END IF;
END $$;