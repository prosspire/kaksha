-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price INTEGER NOT NULL DEFAULT 0,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create course modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL DEFAULT 'video',
  content_url TEXT NOT NULL,
  order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create discussion replies table
CREATE TABLE IF NOT EXISTS discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create discussion votes table
CREATE TABLE IF NOT EXISTS discussion_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_upvote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(discussion_id, user_id)
);

-- Create reply votes table
CREATE TABLE IF NOT EXISTS reply_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reply_id UUID NOT NULL REFERENCES discussion_replies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_upvote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(reply_id, user_id)
);

-- Create course progress table
CREATE TABLE IF NOT EXISTS course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  last_position_seconds INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(user_id, module_id)
);

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reply_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

-- Add to realtime publication
alter publication supabase_realtime add table courses;
alter publication supabase_realtime add table course_modules;
alter publication supabase_realtime add table discussions;
alter publication supabase_realtime add table discussion_replies;
alter publication supabase_realtime add table discussion_votes;
alter publication supabase_realtime add table reply_votes;
alter publication supabase_realtime add table course_progress;

-- Create policies for courses
DROP POLICY IF EXISTS "Courses are viewable by community members" ON courses;
CREATE POLICY "Courses are viewable by community members"
  ON courses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = courses.community_id
      AND community_members.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = courses.community_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Courses are insertable by community creators" ON courses;
CREATE POLICY "Courses are insertable by community creators"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = courses.community_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Courses are updatable by community creators" ON courses;
CREATE POLICY "Courses are updatable by community creators"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = courses.community_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Courses are deletable by community creators" ON courses;
CREATE POLICY "Courses are deletable by community creators"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = courses.community_id
      AND communities.creator_id = auth.uid()
    )
  );

-- Create policies for course modules
DROP POLICY IF EXISTS "Course modules are viewable by community members" ON course_modules;
CREATE POLICY "Course modules are viewable by community members"
  ON course_modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      JOIN community_members ON community_members.community_id = courses.community_id
      WHERE courses.id = course_modules.course_id
      AND community_members.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM courses
      JOIN communities ON communities.id = courses.community_id
      WHERE courses.id = course_modules.course_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Course modules are insertable by course creators" ON course_modules;
CREATE POLICY "Course modules are insertable by course creators"
  ON course_modules FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_modules.course_id
      AND courses.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Course modules are updatable by course creators" ON course_modules;
CREATE POLICY "Course modules are updatable by course creators"
  ON course_modules FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_modules.course_id
      AND courses.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Course modules are deletable by course creators" ON course_modules;
CREATE POLICY "Course modules are deletable by course creators"
  ON course_modules FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_modules.course_id
      AND courses.creator_id = auth.uid()
    )
  );

-- Create policies for discussions
DROP POLICY IF EXISTS "Discussions are viewable by community members" ON discussions;
CREATE POLICY "Discussions are viewable by community members"
  ON discussions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = discussions.community_id
      AND community_members.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = discussions.community_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Discussions are insertable by community members" ON discussions;
CREATE POLICY "Discussions are insertable by community members"
  ON discussions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = discussions.community_id
      AND community_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Discussions are updatable by authors and admins" ON discussions;
CREATE POLICY "Discussions are updatable by authors and admins"
  ON discussions FOR UPDATE
  USING (
    discussions.user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = discussions.community_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    ) OR
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = discussions.community_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Discussions are deletable by authors and admins" ON discussions;
CREATE POLICY "Discussions are deletable by authors and admins"
  ON discussions FOR DELETE
  USING (
    discussions.user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = discussions.community_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    ) OR
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = discussions.community_id
      AND communities.creator_id = auth.uid()
    )
  );

-- Create policies for discussion replies
DROP POLICY IF EXISTS "Discussion replies are viewable by community members" ON discussion_replies;
CREATE POLICY "Discussion replies are viewable by community members"
  ON discussion_replies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM discussions
      JOIN community_members ON community_members.community_id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND community_members.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM discussions
      JOIN communities ON communities.id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Discussion replies are insertable by community members" ON discussion_replies;
CREATE POLICY "Discussion replies are insertable by community members"
  ON discussion_replies FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM discussions
      JOIN community_members ON community_members.community_id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND community_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Discussion replies are updatable by authors and admins" ON discussion_replies;
CREATE POLICY "Discussion replies are updatable by authors and admins"
  ON discussion_replies FOR UPDATE
  USING (
    discussion_replies.user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM discussions
      JOIN community_members ON community_members.community_id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    ) OR
    EXISTS (
      SELECT 1 FROM discussions
      JOIN communities ON communities.id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND communities.creator_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Discussion replies are deletable by authors and admins" ON discussion_replies;
CREATE POLICY "Discussion replies are deletable by authors and admins"
  ON discussion_replies FOR DELETE
  USING (
    discussion_replies.user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM discussions
      JOIN community_members ON community_members.community_id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    ) OR
    EXISTS (
      SELECT 1 FROM discussions
      JOIN communities ON communities.id = discussions.community_id
      WHERE discussions.id = discussion_replies.discussion_id
      AND communities.creator_id = auth.uid()
    )
  );

-- Create policies for votes
DROP POLICY IF EXISTS "Votes are viewable by community members" ON discussion_votes;
CREATE POLICY "Votes are viewable by community members"
  ON discussion_votes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Votes are insertable by community members" ON discussion_votes;
CREATE POLICY "Votes are insertable by community members"
  ON discussion_votes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM discussions
      JOIN community_members ON community_members.community_id = discussions.community_id
      WHERE discussions.id = discussion_votes.discussion_id
      AND community_members.user_id = auth.uid()
    ) AND discussion_votes.user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Votes are updatable by the voter" ON discussion_votes;
CREATE POLICY "Votes are updatable by the voter"
  ON discussion_votes FOR UPDATE
  USING (discussion_votes.user_id = auth.uid());

DROP POLICY IF EXISTS "Votes are deletable by the voter" ON discussion_votes;
CREATE POLICY "Votes are deletable by the voter"
  ON discussion_votes FOR DELETE
  USING (discussion_votes.user_id = auth.uid());

-- Create policies for reply votes
DROP POLICY IF EXISTS "Reply votes are viewable by community members" ON reply_votes;
CREATE POLICY "Reply votes are viewable by community members"
  ON reply_votes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Reply votes are insertable by community members" ON reply_votes;
CREATE POLICY "Reply votes are insertable by community members"
  ON reply_votes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM discussion_replies
      JOIN discussions ON discussions.id = discussion_replies.discussion_id
      JOIN community_members ON community_members.community_id = discussions.community_id
      WHERE discussion_replies.id = reply_votes.reply_id
      AND community_members.user_id = auth.uid()
    ) AND reply_votes.user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Reply votes are updatable by the voter" ON reply_votes;
CREATE POLICY "Reply votes are updatable by the voter"
  ON reply_votes FOR UPDATE
  USING (reply_votes.user_id = auth.uid());

DROP POLICY IF EXISTS "Reply votes are deletable by the voter" ON reply_votes;
CREATE POLICY "Reply votes are deletable by the voter"
  ON reply_votes FOR DELETE
  USING (reply_votes.user_id = auth.uid());

-- Create policies for course progress
DROP POLICY IF EXISTS "Course progress is viewable by the user" ON course_progress;
CREATE POLICY "Course progress is viewable by the user"
  ON course_progress FOR SELECT
  USING (course_progress.user_id = auth.uid());

DROP POLICY IF EXISTS "Course progress is insertable by the user" ON course_progress;
CREATE POLICY "Course progress is insertable by the user"
  ON course_progress FOR INSERT
  WITH CHECK (course_progress.user_id = auth.uid());

DROP POLICY IF EXISTS "Course progress is updatable by the user" ON course_progress;
CREATE POLICY "Course progress is updatable by the user"
  ON course_progress FOR UPDATE
  USING (course_progress.user_id = auth.uid());

DROP POLICY IF EXISTS "Course progress is deletable by the user" ON course_progress;
CREATE POLICY "Course progress is deletable by the user"
  ON course_progress FOR DELETE
  USING (course_progress.user_id = auth.uid());
