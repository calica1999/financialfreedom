# Project Context

## Repository
https://github.com/calica1999/financialfreedom

## Deployment
https://calica1999.github.io/financialfreedom/

## Product
Interactive financial planner for choosing a budgeting rule, entering real take-home payouts, planning expenses, checking budget status, saving a chosen budget version, and keeping an Excel copy.

## Audience
Young professionals starting their careers and beginners who have difficulty managing money.

## Goal
Make budgeting feel intuitive and practical. Help a user turn actual paychecks into a workable plan without requiring a finance background.

## Brand
Friendly, practical, non-judgmental, empowering, and beginner-friendly.

## Visual Direction
Dark financial dashboard inspired by the supplied banking UI reference: deep navy/graphite surfaces, dark blue accent, soft depth, compact controls, clear data hierarchy, and restrained hover motion.

## Page Structure
- Hero with primary CTA: Build My Budget
- Interactive planner
- Budgeting rule guide
- How it works
- Footer
- Floating calculator available on demand
- Login/account modal for cloud saving

## Copy Direction
Direct, plain-language, supportive, specific. Avoid financial jargon, filler, hype, and judgmental language.

## Assets
No external visual assets required.

## Functionality
- Payout frequency: weekly, bi-weekly, or monthly.
- Multiple payout entries for different take-home amounts within a month.
- Preset rules: 50/30/20, 70/20/10, 60/40, 80/20, and Custom.
- Editable expense sub-items under Needs, Wants, and Savings / Debt.
- Starter suggestions: Housing, Groceries; Dining out, Subscriptions; Emergency fund, Debt payment.
- Live category and overall budget indicators showing remaining, on-target, or over-budget states.
- 60/40 and 80/20 use a combined spending target plus a savings/debt target.
- Planner changes are drafts until the user clicks **Save budget**. No planner autosave while editing.
- Save budget stores the chosen version locally and, when logged in, syncs it to the user's Supabase budget record.
- Email/password login and sign-up are available through Supabase Auth.
- Cloud budget rows use per-user Row Level Security.
- Excel budget export with Financial Freedom styling and PHP currency formatting.
- Floating calculator with operation display, history, keyboard support, draggable movement, and diagonal resize limited to 75%–125% scale.
- Calculator history/position/size remain local to the device.

## Avoid
Complex onboarding, judgmental messaging, excessive animation, decorative charts that do not add information, aggressive sales language, and unnecessary frameworks/build systems.

## Current Decisions
The planner uses an explicit-save workflow so users can experiment without overwriting the saved budget until they choose Save budget. Local storage is used for the saved planner copy and calculator preferences; authenticated users can also save the selected budget to Supabase. GitHub Pages is the deployment target.
