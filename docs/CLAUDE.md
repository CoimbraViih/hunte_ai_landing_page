# CLAUDE.md — Hunter.AI Landing Page

Instructions for Claude Code when working in this repository. Full product context lives in [`../PRD.md`](../PRD.md); milestones live in [`PLAN.md`](./PLAN.md).

## What this project is

A static, institutional landing page for Hunter.AI, a digital solutions agency for small/medium businesses. No platform, no auth, no forms — the only CTA is a WhatsApp link (`wa.me`). The page presents 3 services and drives leads to direct contact.

## Stack

Next.js (App Router) + React + TypeScript + Tailwind CSS + shadcn/ui, deployed on Vercel. Supabase and Resend are provisioned in the stack for future phases (contact form, lead capture) — do not wire them up unless explicitly asked.

## Non-negotiable constraints

- **No forms, no login, no backend calls in this phase.** The single CTA is a `wa.me` link. Do not add a contact form, email capture, or database write unless the user explicitly requests a scope change.
- **Never mention n8n publicly.** The AI agents are built internally with n8n, but this is an implementation detail. All public copy must describe the service as "agentes de IA humanizados para atendimento" — never name the automation tool.
- **Static/institutional tone.** This is a marketing page, not a product with an auth boundary. Don't introduce state management, API routes, or database schemas unless a milestone explicitly calls for it.

## Design language

- Dark background: ink `#0A0F0D`
- Signal green (AI/action accent): `#2EE6A0`
- Amber (human warmth accent): `#FFB23E`
- Typography: Space Grotesk (display), Manrope (body), JetBrains Mono (data/mono)
- Brand symbol: crosshair/mira motif
- Visual references: Linear (clarity, typographic hierarchy, color as accent not decoration), Vercel/Intercom institutional sites (lean pages, single clear CTA)
- Full brand assets and brand books are in [`../brand/`](../brand/) — check there before inventing new visual treatments.

## Content structure (3 services to present)

1. Agentes de IA humanizados para atendimento (WhatsApp/Instagram/site — tom natural, qualificação de lead, agendamento)
2. Criação de site para quem ainda não tem presença digital
3. Redesign/otimização de site existente que não converte

## Working conventions

- Prefer editing existing files over creating new ones; keep the page composition simple (sections, not a component sprawl) given the scope.
- Follow milestones in [`PLAN.md`](./PLAN.md) in order — each is meant to be a testable, deployable increment.
- Test each milestone in the browser (dev server) before moving to the next, especially responsive behavior and the WhatsApp CTA link.
- Don't add Supabase/Resend integration code until a milestone explicitly introduces the contact form phase.
