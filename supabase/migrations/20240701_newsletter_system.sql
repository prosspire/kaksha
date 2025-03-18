-- Add email_notifications column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true;

-- Create community_newsletters table
CREATE TABLE IF NOT EXISTS community_newsletters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE community_newsletters ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Creators can manage their newsletters" ON community_newsletters;
CREATE POLICY "Creators can manage their newsletters"
  ON community_newsletters
  FOR ALL
  USING (creator_id = auth.uid());

DROP POLICY IF EXISTS "Community members can view newsletters" ON community_newsletters;
CREATE POLICY "Community members can view newsletters"
  ON community_newsletters
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_newsletters.community_id
      AND community_members.user_id = auth.uid()
    )
  );

-- Enable realtime
alter publication supabase_realtime add table community_newsletters;