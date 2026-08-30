# Project Context

## Repository
https://github.com/calica1999/financialfreedom

## Deployment
https://calica1999.github.io/financialfreedom/

## Product
Beginner-friendly interactive financial planner for choosing a budgeting rule, entering real take-home payouts, planning expenses, checking budget status, saving a budget locally or to the cloud, and exporting a styled Excel workbook.

## Audience
Young professionals starting their careers and beginners who have difficulty managing money.

## Goal
Make budgeting intuitive, practical, and non-judgmental. Help users turn actual paychecks into a workable plan without requiring a finance background.

## Brand
Friendly, practical, supportive, empowering, and beginner-friendly.

## Visual Direction
Dark financial dashboard inspired by the user's supplied banking UI reference: deep navy/graphite surfaces, dark blue accent, soft depth, clear hierarchy, compact controls, and restrained hover motion. Reference is used only for hierarchy, spacing, composition, color direction, and overall feel.

## Page Structure
- Sticky navigation with planner links and account action
- Hero with primary CTA: Build My Budget
- Interactive planner
- Budget rule guide
- How it works
- Footer
- Floating calculator available on demand
- Authentication modal

## Copy Direction
Direct, plain-language, supportive, specific. Avoid financial jargon, filler, hype, and judgmental language.

## Assets
No local image assets required. Third-party browser libraries are loaded only when needed for Supabase and Excel export.

## Functionality
- Payout frequency: weekly, bi-weekly, or monthly.
- Multiple payout entries for months with varying take-home amounts.
- Preset rules: 50/30/20, 70/20/10, 60/40, 80/20, and Custom.
- Editable expense sub-items under Needs, Wants, and Savings / Debt.
- Starter suggestions: Housing, Groceries; Dining out, Subscriptions; Emergency fund, Debt payment.
- Live category and overall budget indicators showing remaining, on-target, or over-budget states.
- 60/40 and 80/20 use a combined Needs + Wants spending target plus Savings / Debt.
- Local browser persistence for anonymous users.
- Supabase email/password login and signup.
- Cloud budget storage in the Supabase `budgets` table with Row Level Security so users can access only their own budgets.
- Automatic cloud sync after authenticated changes, with local saving retained as fallback.
- Styled `.xlsx` export matching the site's navy/blue visual language with PHP currency formatting, payout summary, targets, expenses, and status fields.
- Floating calculator with operation display, history, keyboard support, draggable position, and diagonal resize limited to 75%–125% of original size.
- Restrained hover/focus transitions and reduced-motion support.

## Avoid
Excessive animation, complex onboarding, dense finance dashboards, decorative charts that do not add information, judgmental language, aggressive sales messaging, and frameworks/build systems such as React, Tailwind, Next.js, or npm.

## Current Decisions
The project remains a lightweight static GitHub Pages site. Because cloud authentication and styled Excel export add meaningful client-side complexity, the app is split between a minimal root `index.html` loader and `app.js`; it still requires no build system. Supabase is used for optional cloud accounts while local browser saving remains available for users who do not sign in. The Supabase project URL is `https://woxdfibdpbsxqhmvmjoz.supabase.co`; only the publishable client key is used in the browser. GitHub Pages remains the deployment target.
