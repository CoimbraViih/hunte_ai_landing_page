# PLAN — Hunter.AI Landing Page

Development milestones. Each milestone is a deliverable, testable increment. Do not start a milestone until the previous one is verified working. See [`../PRD.md`](../PRD.md) for full context and [`CLAUDE.md`](./CLAUDE.md) for working conventions.

## Milestone 0 — Project setup ✅ Done

- Scaffold Next.js (App Router) + TypeScript + Tailwind CSS project
- Install and configure shadcn/ui
- Set up Space Grotesk, Manrope, JetBrains Mono fonts (next/font)
- Configure Tailwind theme tokens: ink `#0A0F0D`, signal green `#2EE6A0`, amber `#FFB23E`
- Import brand assets (logo, crosshair symbol) from `brand/` into `public/`
- Verify: app runs locally (`next dev`), base theme colors/fonts render on a blank page

**Delivered:** Next.js + TypeScript + Tailwind + shadcn/ui scaffolded, brand fonts/colors wired into `tailwind.config`/`app/globals.css`, logo/symbol imported into `public/`, Three.js/React Three Fiber + drei + framer-motion installed with a particle-field smoke-test component (`components/visuals/particle-field.tsx`). Verified with `npm run dev` + `npm run build`. Plan: [`docs/plans/2026-07-22-milestone-0-project-setup.md`](./plans/2026-07-22-milestone-0-project-setup.md).

## Milestone 1 — Page shell & navigation ✅ Done

- Build base layout: header with logo, single WhatsApp CTA button, footer
- Implement `wa.me` link (confirm target phone number with user before hardcoding)
- Responsive shell: mobile-first, works down to small phone widths
- Verify: header/footer render correctly across breakpoints, WhatsApp link opens correctly

**Delivered:** `lib/whatsapp.ts` (centralized `buildWhatsAppLink()` helper, placeholder number), `components/layout/whatsapp-cta.tsx` (reusable CTA with signal-green glow + hover/tap micro-interaction, server-renderable), `components/layout/site-header.tsx` (sticky header, client component — transparent-to-blurred transition on scroll, signal-tinted border, one-time entrance animation via framer-motion), `components/layout/site-footer.tsx` (minimal footer, symbol + copyright), all wired into `app/layout.tsx`. Built via subagent-driven development (implementer + reviewer per task, plus a final whole-branch review); merged to `master` and pushed to GitHub. No nav anchor links yet (no sections to link to). **Known follow-up:** placeholder WhatsApp number (`5511999999999`, flagged with `TODO` in `lib/whatsapp.ts`) needs the real number before launch; `pt-20` hero clearance is hand-tuned to the header's current height. Design: [`docs/plans/2026-07-22-milestone-1-page-shell-navigation-design.md`](./plans/2026-07-22-milestone-1-page-shell-navigation-design.md). Plan: [`docs/plans/2026-07-22-milestone-1-page-shell-navigation.md`](./plans/2026-07-22-milestone-1-page-shell-navigation.md).

## Milestone 2 — Hero section ✅ Done

- Hero headline + subheadline addressing the core pain (slow/disorganized customer service losing sales)
- Primary WhatsApp CTA above the fold
- Crosshair/brand visual treatment per brand book
- Verify: hero is the clear first impression, CTA is prominent and functional on mobile + desktop

**Delivered:** `components/sections/hero.tsx` — headline/subheadline naming the pain and the `agentes de IA humanizados` solution, a prominent `WhatsAppCta`, and the crosshair/mira symbol as a centered, non-distorted decorative background (`alt=""`/`aria-hidden`), with a staggered framer-motion entrance and a subtle desktop-only mouse parallax, both correctly disabled under `prefers-reduced-motion`. Depth cues added to `components/visuals/particle-field.tsx` (vertex-color brightness variation by depth) to reinforce the 3D field without introducing new colors or glass panels. Built via subagent-driven development (implementer + reviewer per task); two real defects — a reduced-motion race condition and a crosshair aspect-ratio distortion — were caught during browser-based verification and fixed before task approval. A dedicated accessibility pass confirmed contrast, the decorative-image treatment, and keyboard focus all PASS via real browser testing. A final independent bug hunt (post-review) also caught and fixed a reduced-motion hydration mismatch and a stale parallax offset before merge. Merged to `master` and pushed to GitHub via [PR #1](https://github.com/CoimbraViih/hunte_ai_landing_page/pull/1); feature branch deleted. Design: [`docs/plans/2026-07-22-milestone-2-hero-section-design.md`](./plans/2026-07-22-milestone-2-hero-section-design.md). Plan: [`docs/plans/2026-07-22-milestone-2-hero-section.md`](./plans/2026-07-22-milestone-2-hero-section.md).

## Milestone 3 — Services section (3 offers)

- Section presenting the 3 services as distinct cards/blocks:
  1. Agentes de IA humanizados para atendimento
  2. Criação de site
  3. Redesign/otimização de site
- Copy must describe outcomes, not the automation tooling (no mention of n8n)
- Verify: each service is scannable, hierarchy is clear, no implementation-detail leaks in copy

## Milestone 4 — Trust/credibility section

- Section reinforcing why a non-technical owner should trust Hunter.AI (e.g., how it works in plain terms, what to expect after reaching out)
- Keep light — this is not a full case-studies/testimonials system, just enough to reduce friction before the CTA
- Verify: section supports conversion intent without overloading the page

## Milestone 5 — Final CTA & footer

- Closing CTA section repeating the WhatsApp contact path
- Footer with brand mark, minimal links (no dead links/pages)
- Verify: full page scroll flows logically from hero → services → trust → final CTA

## Milestone 6 — Polish & QA

- Cross-browser/responsive pass (mobile, tablet, desktop)
- Accessibility check: contrast (dark background + accent colors), focus states, semantic HTML
- Performance pass: image optimization, font loading strategy, Lighthouse check
- Verify: production build (`next build`) is clean, Lighthouse scores are healthy

## Milestone 7 — Deploy

- Deploy to Vercel
- Confirm domain, verify WhatsApp CTA in production
- Verify: live URL matches local build, CTA tested end-to-end on real devices

---

## Future / out of scope for now

- Contact form with Resend email delivery (only if scope expands beyond WhatsApp-only CTA)
- Any Supabase-backed data capture or platform features
- Do not start these until explicitly requested — see [`CLAUDE.md`](./CLAUDE.md) constraints.
