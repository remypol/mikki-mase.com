-- ============================================
-- Migration V2: Revenue Plan
-- Adds: orders, order_items, entitlements, email_flow_state, ai_usage
-- Enhances: checkout_intents (recovery columns), profiles (age_verified, primary_game)
-- Safe to re-run (IF NOT EXISTS everywhere)
-- Run in Supabase SQL Editor AFTER all previous migrations
-- ============================================


-- ============================================
-- SECTION 1: ALTER EXISTING TABLES
-- ============================================

-- Add new columns to profiles (age gate + game preference)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'age_verified'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN age_verified BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'primary_game'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN primary_game TEXT;
  END IF;
END $$;

-- Enhance checkout_intents with recovery tracking columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'checkout_intents' AND column_name = 'recovery_emails_sent'
  ) THEN
    ALTER TABLE public.checkout_intents ADD COLUMN recovery_emails_sent INTEGER DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'checkout_intents' AND column_name = 'converted'
  ) THEN
    ALTER TABLE public.checkout_intents ADD COLUMN converted BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'checkout_intents' AND column_name = 'converted_at'
  ) THEN
    ALTER TABLE public.checkout_intents ADD COLUMN converted_at TIMESTAMPTZ;
  END IF;
END $$;


-- ============================================
-- SECTION 2: NEW TABLES
-- ============================================

-- ORDERS: Central order record linked to Stripe checkout sessions.
-- Replaces the old "purchases" table as the canonical order ledger.
-- Webhooks write here; frontend reads via RLS.
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, completed, refunded, disputed
  total_amount INTEGER NOT NULL,           -- amount in cents
  currency TEXT DEFAULT 'usd',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ORDER_ITEMS: Line items per order (supports bundles / multi-product checkout).
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL,    -- 'playbook', 'toolkit', 'masterclass', 'inner_circle'
  stripe_price_id TEXT NOT NULL,
  amount INTEGER NOT NULL,       -- amount in cents
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENTITLEMENTS: What the customer currently has access to.
-- Decoupled from orders so refunds/gifts/manual grants all work cleanly.
-- expires_at NULL = lifetime access.
-- revoked_at set on refund to revoke without deleting history.
CREATE TABLE IF NOT EXISTS public.entitlements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  product_type TEXT NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,          -- NULL = lifetime
  revoked_at TIMESTAMPTZ,          -- set on refund to revoke access
  source_order_id UUID REFERENCES public.orders(id),
  UNIQUE(customer_id, product_type)
);

-- EMAIL_FLOW_STATE: Tracks where each customer is in each email sequence.
-- Prevents duplicate sends and allows pause/resume.
CREATE TABLE IF NOT EXISTS public.email_flow_state (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  sequence_name TEXT NOT NULL,     -- 'activation', 'masterclass_upsell', 'inner_circle', 'abandoned'
  current_step INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_sent_at TIMESTAMPTZ,
  completed BOOLEAN DEFAULT FALSE,
  paused BOOLEAN DEFAULT FALSE,
  UNIQUE(customer_id, sequence_name)
);

-- AI_USAGE: Per-query cost tracking for the AI coach feature.
-- Used for rate limiting, cost dashboards, and per-user spend caps.
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  query_at TIMESTAMPTZ DEFAULT NOW(),
  tokens_used INTEGER,
  model TEXT,
  cost_cents INTEGER
);


-- ============================================
-- SECTION 3: INDEXES
-- ============================================

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_customer       ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status          ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session  ON public.orders(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_created         ON public.orders(created_at DESC);

-- Order items
CREATE INDEX IF NOT EXISTS idx_order_items_order      ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product    ON public.order_items(product_type);

-- Entitlements (fast "does user have access?" check)
CREATE INDEX IF NOT EXISTS idx_entitlements_customer  ON public.entitlements(customer_id);
CREATE INDEX IF NOT EXISTS idx_entitlements_product   ON public.entitlements(product_type);
-- Note: partial index cannot use NOW() (not immutable). Use a simple filter instead.
CREATE INDEX IF NOT EXISTS idx_entitlements_active    ON public.entitlements(customer_id, product_type)
  WHERE revoked_at IS NULL;

-- Email flow state
CREATE INDEX IF NOT EXISTS idx_email_flow_customer    ON public.email_flow_state(customer_id);
CREATE INDEX IF NOT EXISTS idx_email_flow_pending     ON public.email_flow_state(sequence_name)
  WHERE completed = FALSE AND paused = FALSE;

-- AI usage (cost reporting + rate limiting)
CREATE INDEX IF NOT EXISTS idx_ai_usage_customer      ON public.ai_usage(customer_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_query_at      ON public.ai_usage(query_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_customer_day  ON public.ai_usage(customer_id, query_at);

-- Checkout intents (recovery queries)
CREATE INDEX IF NOT EXISTS idx_checkout_intents_recovery
  ON public.checkout_intents(completed_at)
  WHERE completed_at IS NULL AND abandoned_email_sent = FALSE;


-- ============================================
-- SECTION 4: ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all new tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_flow_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

-- ---- ORDERS ----
-- Users can read their own orders
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own orders' AND tablename = 'orders') THEN
    CREATE POLICY "Users read own orders"
      ON public.orders FOR SELECT
      USING (auth.uid() = customer_id);
  END IF;
END $$;

-- Service role full access (webhook creates + status updates)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access on orders' AND tablename = 'orders') THEN
    CREATE POLICY "Service role full access on orders"
      ON public.orders FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ---- ORDER_ITEMS ----
-- Users can read items for their own orders (join through orders)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own order items' AND tablename = 'order_items') THEN
    CREATE POLICY "Users read own order items"
      ON public.order_items FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM public.orders
          WHERE orders.id = order_items.order_id
            AND orders.customer_id = auth.uid()
        )
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access on order_items' AND tablename = 'order_items') THEN
    CREATE POLICY "Service role full access on order_items"
      ON public.order_items FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ---- ENTITLEMENTS ----
-- Users can read their own entitlements (the main "do I have access?" query)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own entitlements' AND tablename = 'entitlements') THEN
    CREATE POLICY "Users read own entitlements"
      ON public.entitlements FOR SELECT
      USING (auth.uid() = customer_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access on entitlements' AND tablename = 'entitlements') THEN
    CREATE POLICY "Service role full access on entitlements"
      ON public.entitlements FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ---- EMAIL_FLOW_STATE ----
-- Users can read their own email flow state (show progress in UI if needed)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own email flow state' AND tablename = 'email_flow_state') THEN
    CREATE POLICY "Users read own email flow state"
      ON public.email_flow_state FOR SELECT
      USING (auth.uid() = customer_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access on email_flow_state' AND tablename = 'email_flow_state') THEN
    CREATE POLICY "Service role full access on email_flow_state"
      ON public.email_flow_state FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ---- AI_USAGE ----
-- Users can read their own usage (show remaining quota in UI)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own ai usage' AND tablename = 'ai_usage') THEN
    CREATE POLICY "Users read own ai usage"
      ON public.ai_usage FOR SELECT
      USING (auth.uid() = customer_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access on ai_usage' AND tablename = 'ai_usage') THEN
    CREATE POLICY "Service role full access on ai_usage"
      ON public.ai_usage FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- ---- CHECKOUT_INTENTS ----
-- Already has service_role-only policy from migration-subscriptions.sql
-- No additional policies needed (service role only)


-- ============================================
-- SECTION 5: HELPER VIEWS (optional but useful)
-- ============================================

-- Quick "active entitlements" view for the frontend
CREATE OR REPLACE VIEW public.active_entitlements AS
SELECT
  customer_id,
  product_type,
  granted_at,
  expires_at,
  source_order_id
FROM public.entitlements
WHERE revoked_at IS NULL
  AND (expires_at IS NULL OR expires_at > NOW());

-- Daily AI spend per customer (for rate limiting)
CREATE OR REPLACE VIEW public.ai_usage_daily AS
SELECT
  customer_id,
  DATE(query_at) AS usage_date,
  COUNT(*) AS query_count,
  SUM(tokens_used) AS total_tokens,
  SUM(cost_cents) AS total_cost_cents
FROM public.ai_usage
GROUP BY customer_id, DATE(query_at);


-- ============================================
-- DONE
-- ============================================
-- New tables: orders, order_items, entitlements, email_flow_state, ai_usage
-- Enhanced: profiles (+age_verified, +primary_game), checkout_intents (+recovery_emails_sent, +converted, +converted_at)
-- All tables have RLS enabled with appropriate policies
-- Safe to re-run: all CREATE IF NOT EXISTS, all policies guarded with DO $$ checks
