
ALTER TABLE public.profiles
  ADD COLUMN avatar_url TEXT,
  ADD COLUMN preferred_difficulty TEXT NOT NULL DEFAULT 'beginner',
  ADD COLUMN daily_reminder BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN favorite_topics TEXT[] NOT NULL DEFAULT '{}';
