# Project Context

## Repository
https://github.com/calica1999/financialfreedom

## Deployment
Not deployed yet.

## Product
Interactive financial planner for choosing a budgeting rule, entering real take-home payouts, planning expenses, checking budget status, and keeping a copy of the plan.

## Audience
Young professionals starting their careers and beginners who have difficulty managing money.

## Goal
Make budgeting feel intuitive and practical. Help a user turn actual paychecks into a workable plan without requiring a finance background.

## Brand
Friendly, practical, non-judgmental, empowering, and beginner-friendly.

## Visual Direction
Dark financial dashboard inspired by the supplied banking UI reference: deep navy/graphite surfaces, dark blue accent, soft depth, clear data hierarchy, compact controls, and a responsive layout. Inspiration is used for hierarchy, spacing, composition, and palette direction, not copied directly.

## Page Structure
- Hero with primary CTA: Build My Budget
- Interactive planner
- Budgeting rule guide
- How it works
- Footer
- Floating calculator available on demand

## Copy Direction
Direct, plain-language, supportive, specific. Avoid financial jargon, filler, hype, and judgmental language.

## Assets
No external assets required. The initial visual direction comes from the user-supplied screenshot and is not embedded or copied.

## Functionality
- Payout frequency: weekly, bi-weekly, or monthly.
- Multiple payout entries so users can enter different take-home amounts within a month.
- Preset rules: 50/30/20, 70/20/10, 60/40, 80/20, and Custom.
- Editable expense sub-items under Needs, Wants, and Savings / Debt.
- Starter suggestions: Housing, Groceries; Dining out, Subscriptions; Emergency fund, Debt payment.
- Live category and overall budget indicators showing remaining, on-target, or over-budget states.
- 60/40 and 80/20 treat spending as a combined Needs + Wants target and Savings / Debt as the savings target.
- Automatic save in browser localStorage, with a visible saved status.
- Downloadable spreadsheet-friendly CSV budget export.
- Floating calculator that can be shown or hidden, with keyboard support.
- Responsive layout with keyboard focus states and reduced-motion support.

## Avoid
Complex onboarding, account requirements for the first version, dense finance dashboards, decorative charts that do not add information, excessive animation, aggressive sales language, and implementation frameworks such as React, Tailwind, Next.js, npm, or a build system.

## Current Decisions
The first release is a lightweight single-file browser tool. No login or backend is required yet. Local browser saving plus CSV export gives users practical persistence without adding system complexity. The primary user path is: enter actual payouts → choose a rule → edit category items → see budget status → download a copy. The visual accent was changed from lime green to dark blue to better match the user's preferred direction.
