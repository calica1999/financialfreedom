# Project Context

## Repository
https://github.com/calica1999/financialfreedom

## Deployment
https://calica1999.github.io/financialfreedom/

## Product
Beginner-friendly financial planner with a fixed landing page and a protected budget-planner page.

## Audience
Young professionals starting their careers and people who have difficulty managing money.

## Goal
Turn real paychecks into a practical budget without requiring a finance background.

## Brand
Friendly, practical, non-judgmental, empowering, beginner-friendly.

## Visual Direction
Dark navy/graphite financial dashboard, dark blue accent, soft depth, compact controls, restrained hover motion, clear hierarchy.

## Page Structure
- `index.html`: non-scrollable landing page only.
- `planner.html`: authenticated budgeting workspace.
- Landing page contains login plus Build My Budget / Compare budgeting rules entry points.
- Logging out from the planner returns to the landing page.
- Planner contains payout setup, rules, editable expense groups, save, Excel export, and floating calculator.

## Copy Direction
Direct, plain-language, supportive, specific. Avoid financial jargon, filler, hype, and judgmental language.

## Functionality
- Landing page has no budgeting controls and does not scroll.
- Login/sign-up uses Supabase Auth.
- Build My Budget requires authentication, then opens `planner.html`.
- `planner.html` redirects unauthenticated visitors back to the landing page.
- Logout returns to the landing page.
- Payout frequency: weekly, bi-weekly, or monthly.
- Multiple payout entries with different take-home amounts.
- Rules: 50/30/20, 70/20/10, 60/40, 80/20, Custom.
- Editable expense sub-items under Needs, Wants, and Savings / Debt.
- Starter suggestions: Housing, Groceries; Dining out, Subscriptions; Emergency fund, Debt payment.
- Live budget indicators show remaining, on-target, or over-budget states.
- Planner edits are drafts until the authenticated user clicks **Save budget**. No autosave to cloud.
- Save budget writes the current planner state to that user's Supabase budget record using Row Level Security.
- Existing saved cloud budget is restored on authenticated planner load.
- Excel export creates a styled `.xlsx` workbook with navy/blue Financial Freedom styling and PHP currency formatting.
- Floating calculator shows the active operation, keeps calculation history locally, supports keyboard input, has a hold-to-drag control, and diagonally resizes from 75%–125% scale.

## Assets
No external visual assets required.

## Avoid
Complex onboarding, excessive animation, decorative charts without information value, aggressive sales language, and unnecessary frameworks/build systems.

## Current Decisions
Authentication and budgeting are intentionally separated: the landing page is a simple entry page, while the planner is a protected workspace. Saving is always explicit and only available to authenticated users. The landing page is the post-logout destination.
