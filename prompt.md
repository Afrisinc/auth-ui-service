You are refactoring the current project into Afrisinc Auth UI (Production-Ready Identity Platform).

Your task is to:

Audit the entire existing project structure.

Convert it into a centralized Auth UI application.

Add all required pages for Afrisinc Identity Platform.

Preserve and strictly reuse the existing Tailwind config (colors, font sizes, spacing, design tokens).

Do NOT introduce new random styles.

Keep UI consistent and professional.

Do not remove working infrastructure unless unnecessary.

✅ STEP 1 — Audit First

Analyze folder structure.

Analyze routing setup.

Analyze layout components.

Analyze Tailwind config.

Analyze shared UI components.

Identify reusable layout elements (sidebar, header, container, card, form components).

Identify design tokens inside tailwind.config.

Then:

Output a short summary of:

Current structure

What will be reused

What must be added

What must be reorganized

Do NOT start coding before this summary.

✅ STEP 2 — Convert Project to Auth UI

Refactor project identity:

Title: Afrisinc Identity Platform
Base URL assumption: auth.afrisinc.com

Rename navigation labels and structure to reflect:

Identity

Accounts

Product Access

Platform Admin

Ensure route grouping is clean and scalable.

✅ STEP 3 — Add Required Pages

Implement the following route structure:

🌍 Public Pages

/login
/register
/forgot-password
/reset-password
/verify-email

Each must:

Use existing form components

Follow existing input styles

Follow existing button variants

Use same border radius and spacing

Be responsive

Be centered layout

👤 Authenticated User Area

/dashboard
/accounts
/accounts/create
/accounts/[accountId]
/accounts/[accountId]/members
/accounts/[accountId]/products
/switch-product
/profile

Requirements:

Reuse current dashboard layout

Reuse sidebar if exists

Use existing card components

Follow same grid spacing pattern

Maintain consistent typography scale from tailwind config

🏢 Platform Admin (Role Based)

/admin
/admin/dashboard
/admin/users
/admin/accounts
/admin/products
/admin/analytics
/admin/audit-logs

Requirements:

Separate visual section in sidebar

Add role-based route protection wrapper

Only allow platform_admin role

Keep consistent spacing and color scheme

Do NOT invent new colors

✅ STEP 4 — Layout Requirements

If layout does not exist:

Create:

Public Layout

Minimal header

Centered content

Clean background

No sidebar

App Layout

Sidebar (collapsible if current style supports it)

Top header (user dropdown, account switcher)

Main content container with max width

Use existing Tailwind spacing scale

Admin Section

Use badge or divider in sidebar to separate from user section

✅ STEP 5 — State & Routing

Add route guards

Add auth context/provider

Add loading states

Add proper redirect handling (support redirect_uri and product param)

Do not hardcode tokens

✅ STEP 6 — Product Switch Flow UI

Create clean UI for:

/switch-product

It must:

List accounts

Show enrolled products

Show role

Show plan

Allow switching

Trigger API call placeholder

Follow existing card/grid style.

✅ STEP 7 — Code Quality Rules

Strict TypeScript types

Reusable components

No inline styles

No magic values

Extract constants

Follow current folder naming conventions

Keep file structure clean and scalable

✅ STEP 8 — Tailwind Requirements

Only use colors defined in tailwind.config

Only use font sizes defined

Only use spacing scale defined

Do NOT introduce arbitrary values like text-[13px]

Reuse button and input variants

Respect dark mode if current project supports it

✅ STEP 9 — Deliverables

After refactor:

Output updated folder structure.

List all new routes added.

Confirm style consistency.

Confirm production-readiness checklist:

Clean routing

Reusable layouts

Role-based protection

No broken imports

No duplicated styles

Do not provide partial changes.
Provide full structured update.

⚠️ Important

Do NOT convert this into a different design system.

Do NOT replace Tailwind config.

Do NOT remove reusable components.

Build on top of current styling.

Keep UI minimal, enterprise-grade, not flashy.

End of instructions.

If you want, I can also give you:

A stricter enterprise-level version

A version optimized for Next.js App Router

A version optimized for React +