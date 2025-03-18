-- Enable RLS on discussions table if not already enabled
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all discussions" ON discussions;
DROP POLICY IF EXISTS "Users can insert their own discussions" ON discussions;
DROP POLICY IF EXISTS "Users can update their own discussions" ON discussions;
DROP POLICY IF EXISTS "Users can delete their own discussions" ON discussions;

-- Create policies for discussions table
CREATE POLICY "Users can view all discussions"
ON discussions FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own discussions"
ON discussions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own discussions"
ON discussions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions"
ON discussions FOR DELETE
USING (auth.uid() = user_id);