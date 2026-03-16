-- ============================================
-- DAILY DROPS — Database Migration
-- Run on: enfabyxcrdnqyuxfxkhj (Mikki Mase)
-- ============================================

-- 1. Add role column to profiles (admin vs member)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member'
  CHECK (role IN ('member', 'admin'));

-- 2. Helper: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 3. Helper: check if current user has an active masterclass purchase
CREATE OR REPLACE FUNCTION public.is_paid_member()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.purchases
    WHERE user_id = auth.uid()
      AND product_key = 'masterclass'
      AND status = 'completed'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================
-- DAILY DROPS POSTS (admin-created content)
-- ============================================
CREATE TABLE public.daily_drops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'insight'
    CHECK (category IN ('insight', 'strategy', 'mindset', 'story', 'challenge', 'qa')),
  pinned BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- REACTIONS (emoji reactions on posts)
-- ============================================
CREATE TABLE public.daily_drops_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.daily_drops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction TEXT NOT NULL
    CHECK (reaction IN ('fire', 'brain', 'money', 'clap', 'goat')),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- One reaction type per user per post
  UNIQUE (post_id, user_id, reaction)
);

-- ============================================
-- COMMENTS (user comments on posts)
-- ============================================
CREATE TABLE public.daily_drops_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.daily_drops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_daily_drops_published ON daily_drops(published_at DESC);
CREATE INDEX idx_daily_drops_category ON daily_drops(category);
CREATE INDEX idx_daily_drops_pinned ON daily_drops(pinned) WHERE pinned = true;
CREATE INDEX idx_reactions_post ON daily_drops_reactions(post_id);
CREATE INDEX idx_reactions_user ON daily_drops_reactions(user_id);
CREATE INDEX idx_comments_post ON daily_drops_comments(post_id, created_at);
CREATE INDEX idx_comments_user ON daily_drops_comments(user_id);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE daily_drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_drops_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_drops_comments ENABLE ROW LEVEL SECURITY;

-- Posts: paid members can read, admins can insert/update/delete
CREATE POLICY "Paid members can read posts"
  ON daily_drops FOR SELECT
  USING (is_paid_member() OR is_admin());

CREATE POLICY "Admins can create posts"
  ON daily_drops FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update posts"
  ON daily_drops FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete posts"
  ON daily_drops FOR DELETE
  USING (is_admin());

-- Reactions: paid members can read all, manage own
CREATE POLICY "Paid members can read reactions"
  ON daily_drops_reactions FOR SELECT
  USING (is_paid_member() OR is_admin());

CREATE POLICY "Paid members can add reactions"
  ON daily_drops_reactions FOR INSERT
  WITH CHECK (is_paid_member() AND auth.uid() = user_id);

CREATE POLICY "Users can remove own reactions"
  ON daily_drops_reactions FOR DELETE
  USING (auth.uid() = user_id);

-- Comments: paid members can read all, manage own, admins can delete any
CREATE POLICY "Paid members can read comments"
  ON daily_drops_comments FOR SELECT
  USING (is_paid_member() OR is_admin());

CREATE POLICY "Paid members can add comments"
  ON daily_drops_comments FOR INSERT
  WITH CHECK (is_paid_member() AND auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON daily_drops_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users or admins can delete comments"
  ON daily_drops_comments FOR DELETE
  USING (auth.uid() = user_id OR is_admin());

-- ============================================
-- AGGREGATION VIEW (reaction counts per post)
-- ============================================
CREATE OR REPLACE VIEW public.daily_drops_reaction_counts AS
SELECT
  post_id,
  reaction,
  COUNT(*) as count
FROM daily_drops_reactions
GROUP BY post_id, reaction;

-- Grant select on the view to authenticated users
GRANT SELECT ON public.daily_drops_reaction_counts TO authenticated;

-- ============================================
-- DONE
-- ============================================
