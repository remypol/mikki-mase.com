-- Migration: Add subscriptions table for Inner Circle membership
-- Run this in Supabase SQL Editor

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE,
  plan text NOT NULL CHECK (plan IN ('monthly', 'yearly', 'lifetime')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete', 'trialing')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);

-- RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do everything (webhooks)
CREATE POLICY "Service role full access on subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.role() = 'service_role');

-- Checkout intents table (for abandoned checkout tracking)
CREATE TABLE IF NOT EXISTS public.checkout_intents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  product_key text NOT NULL,
  tier text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  abandoned_email_sent boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_checkout_intents_email ON public.checkout_intents(email);
CREATE INDEX IF NOT EXISTS idx_checkout_intents_completed ON public.checkout_intents(completed_at);

-- RLS for checkout_intents (service role only)
ALTER TABLE public.checkout_intents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on checkout_intents"
  ON public.checkout_intents FOR ALL
  USING (auth.role() = 'service_role');

-- Course progress table (server-side tracking)
CREATE TABLE IF NOT EXISTS public.course_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_slug text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  quiz_scores jsonb,
  scenarios_completed text[],
  UNIQUE(user_id, lesson_slug)
);

CREATE INDEX IF NOT EXISTS idx_course_progress_user ON public.course_progress(user_id);

ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON public.course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.course_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access on course_progress"
  ON public.course_progress FOR ALL
  USING (auth.role() = 'service_role');

-- Referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  code text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'rewarded')),
  reward_given boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  converted_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_id);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_id);

CREATE POLICY "Service role full access on referrals"
  ON public.referrals FOR ALL
  USING (auth.role() = 'service_role');
