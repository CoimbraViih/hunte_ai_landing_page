# PLAN — Hunter.AI Landing Page

Development milestones. Each milestone is a deliverable, testable increment. Do not start a milestone until the previous one is verified working. See [`../PRD.md`](../PRD.md) for full context and [`CLAUDE.md`](./CLAUDE.md) for working conventions.

## Milestone 0 — Project setup

- Scaffold Next.js (App Router) + TypeScript + Tailwind CSS project
- Install and configure shadcn/ui
- Set up Space Grotesk, Manrope, JetBrains Mono fonts (next/font)
- Configure Tailwind theme tokens: ink `#0A0F0D`, signal green `#2EE6A0`, amber `#FFB23E`
- Import brand assets (logo, crosshair symbol) from `brand/` into `public/`
- Verify: app runs locally (`next dev`), base theme colors/fonts render on a blank page

## Milestone 1 — Page shell & navigation

- Build base layout: header with logo, single WhatsApp CTA button, footer
- Implement `wa.me` link (confirm target phone number with user before hardcoding)
- Responsive shell: mobile-first, works down to small phone widths
- Verify: header/footer render correctly across breakpoints, WhatsApp link opens correctly

## Milestone 2 — Hero section

- Hero headline + subheadline addressing the core pain (slow/disorganized customer service losing sales)
- Primary WhatsApp CTA above the fold
- Crosshair/brand visual treatment per brand book
- Verify: hero is the clear first impression, CTA is prominent and functional on mobile + desktop

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
