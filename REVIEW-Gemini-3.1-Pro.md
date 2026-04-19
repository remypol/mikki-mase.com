# Mikki Mase Rebrand — Gemini 3.1 Pro Review

_2026-04-18T13:46:08.038Z · 45.3s_

Here is the senior-level audit of the autonomous session. 

## 1. SECURITY
**Severity: HIGH (Business Logic Flaw)**
* **RLS Fallback (`src/pages/api/account/me.ts`):** The explicit `.eq('user_id', user.id)` is excellent defense-in-depth. If Supabase RLS is accidentally disabled or misconfigured, this prevents IDOR. 
* **Download IDOR Prevention (`src/pages/checkout/success.astro`):** Checking `metadataUserId` against the currently authenticated user's ID before generating download tokens is implemented correctly. It successfully prevents unauthenticated visitors from ripping bonus materials using leaked `payment_intent` URLs.
* **Missing Server-Side Validation / Upgrade Logic Flaw (`src/pages/checkout/masterclass.astro`):** The entitlement guard is overly strict and introduces a revenue-impacting bug. 
  ```javascript
  const isLifetimeUpgrade = tier === 'lifetime-vip' && hasAnyTier;
  if (hasAnyTier && !isLifetimeUpgrade) {
    return Astro.redirect('/masterclass/course?returning=1');
  }
  ```
  **Bug:** If a base Masterclass owner attempts to upgrade to `inner-circle-yearly`, this logic evaluates `isLifetimeUpgrade` to `false` and immediately kicks them back to the dashboard. You have successfully prevented the double-charge, but you have also **blocked legitimate annual upgrades**. The guard must evaluate the *weight* of the tier being purchased vs. the owned tier.

## 2. DATA INTEGRITY
**Severity: MEDIUM**
* **Read-only Safety:** `/api/account/me` performs purely read operations. No risk of race conditions on write.
* **Eventual Consistency:** Relying on `status === 'completed'` via Supabase for the `/account` page immediately post-purchase introduces a timing risk. If Stripe's webhook hasn't fired and updated the `purchases` table by the time the user clicks "Account", their purchase list will be empty.
* **Fix:** Add a client-side polling mechanism or an optimistic UI state if `?session_id=` is present in the referring URL.

## 3. CHECKOUT GUARD
**Severity: CRITICAL**
* **Guest Checkout Bypass:** The entitlement guard entirely relies on `if (user)`. If a paid user clicks an ad on a new device, remains logged out, enters the same email they previously used, and hits "Pay", they will bypass the Astro guard completely. 
* **Fix:** You need Stripe-level duplicate prevention. Pass `customer_update: { name: 'auto' }` and use Stripe's `checkout.session` logic to restrict purchases for existing customer objects, or enforce auth-first checkout for existing emails.

## 4. STRIPE LOCALE FIX
**Severity: LOW**
* **The fix is incomplete.** You added `locale: 'en'` to `CustomMasterclassCheckout.tsx` (`<Elements>`), but the summary states the site also uses Stripe's Embedded Checkout UI. 
* **Side effect:** Embedded Checkout locale is dictated by the Session creation on the server. If `/api/checkout/create.ts` is still defaulting to the Dutch merchant entity, users will still see Dutch strings on the embedded form. You must pass `locale: 'en'` into the Stripe `stripe.checkout.sessions.create()` payload.

## 5. DASHBOARD HERO
**Severity: MEDIUM**
* **LocalStorage Limitations:** `useCourseProgress` relying solely on `localStorage` for a $67–$249 product is unacceptable long-term.
* **Impact:** A user who starts the course on their phone and switches to their desktop will see "Start Module 1" with 0% progress instead of "Continue where you left off". For a premium product, this feels broken and cheapens the experience.
* **Verdict:** Acceptable as a rapid fix to kill the "locked upsell honeymoon killer," but server-side sync is an immediate technical debt priority.

## 6. BRAND SAFETY
**Severity: LOW (Resolved)**
* **PUA Purge:** The prop-drilling implementation in `SalesHero.astro` and `GuaranteeSeal.astro` is clean. Defaulting to safe, gambling-native copy (`"GET INSTANT ACCESS"`, `"The 'Casino Clarity' Guarantee"`) while allowing overrides ensures old products don't leak legacy copy. 
* No lingering PUA strings detected in the provided diffs.

## 7. TYPOGRAPHY/DESIGN SYSTEM
**Severity: MEDIUM**
* **Fixed-Height Breakage:** Bumping body copy from 16/1.5 to 20/1.7 (desktop) is a massive footprint increase (roughly a 30% taller text block). 
* **Impact:** Any component using fixed heights (`h-64`), absolute positioning, or line-clamping (`line-clamp-3`) will break or clip.
* **Review needed:** Check the testimonials grid, pricing cards (`/masterclass#pricing`), and footer links. Ensure they are using `h-auto` and `flex`/`grid` to accommodate the larger typographic scale.

## 8. ACCESSIBILITY
**Severity: MEDIUM**
* **Heading Hierarchy (`src/components/account/AccountPanel.tsx`):**
  You broke the document outline. The page uses `<h1>` for the user's name, but then uses `<p className="text-tertiary">` and `<p className="display-h3">` for section headings ("Current plan", "Purchases").
  * **Fix:** Screen readers rely on `<h2/h3>` tags for navigation. Swap `<p className="display-h3 mb-1">` to `<h2 className="display-h3 mb-1">` inside the sections.
* **Color Contrast:** The new `--color-gray-500: #9A9A9A` text on `--color-gray-900: #1A1A1A` backgrounds has a contrast ratio of ~3.9:1. This fails WCAG AA standards (4.5:1 requirement for normal text). Darken the background or lighten the gray to `#A3A3A3`.

## 9. TRUST FRAMING
**Severity: LOW (UX Win)**
* **Claimed vs. Documented:** Splitting 150 vs 47 into "Claimed Total" and "Documented" is a masterclass in risk-mitigation. It allows Mikki to maintain his larger-than-life lore (150) without making a legally actionable false claim, while backing up the brand with verified, defensible data (47). This builds immense trust with skeptical buyers.

## 10. ROADMAP
**The single highest-leverage thing Hugo should ship NEXT:**
**Fix the Checkout Guard + Stripe Session Locale.** 
Right now, you have broken the path for a Masterclass user to upgrade to an Inner Circle annual subscription because the checkout guard blindly redirects them away. Fix the tier-weight logic in `/checkout/masterclass.astro` and push the `locale: 'en'` config to the server-side Stripe session creation. 

*Immediately following that:* Wire `useCourseProgress` to Supabase. Premium users expect cross-device sync.