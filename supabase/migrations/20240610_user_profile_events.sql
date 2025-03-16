-- Add social media and profile fields to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS youtube_url TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS expertise TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS interests TEXT;

-- Create community events table
CREATE TABLE IF NOT EXISTS public.community_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME,
    location TEXT,
    is_online BOOLEAN DEFAULT false,
    meeting_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create event attendees table
CREATE TABLE IF NOT EXISTS public.event_attendees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.community_events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'going', -- going, maybe, not_going
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_community_events_community_id ON public.community_events(community_id);
CREATE INDEX IF NOT EXISTS idx_community_events_creator_id ON public.community_events(creator_id);
CREATE INDEX IF NOT EXISTS idx_community_events_event_date ON public.community_events(event_date);
CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON public.event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON public.event_attendees(user_id);

-- Enable realtime for events
alter publication supabase_realtime add table community_events;
alter publication supabase_realtime add table event_attendees;