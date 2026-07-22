# Milestone 1 — Page Shell & Navigation — Design

**Goal:** Base layout (sticky header + footer) wrapping every page via `app/layout.tsx`, with a working WhatsApp CTA, responsive down to small phone widths. No hero/services/trust content — that's Milestones 2+.

## Components

- `components/layout/site-header.tsx` — client component (needs scroll state for sticky/blur effect). Renders symbol/wordmark on the left, WhatsApp CTA button on the right. No nav links (no other sections exist yet).
- `components/layout/site-footer.tsx` — server component. Small symbol + "© 2026 Hunter.AI. Todos os direitos reservados."
- `components/layout/whatsapp-cta.tsx` — reusable CTA button (label + optional variant prop), will be reused in Milestones 2 and 5.
- `lib/whatsapp.ts` — `buildWhatsAppLink(message?: string)` helper centralizing the phone number (placeholder) + prefilled message + URL encoding, so the number only needs to change in one place later.
- `app/layout.tsx` — modified to render `<SiteHeader />{children}<SiteFooter />`.

## WhatsApp CTA data

- Placeholder number `5511999999999` in `lib/whatsapp.ts`, flagged with `// TODO: replace with real Hunter.AI WhatsApp number`.
- Prefilled message: "Olá! Vim pelo site e quero saber mais sobre os serviços da Hunter.AI" (URL-encoded).
- Link opens in a new tab (`target="_blank" rel="noopener noreferrer"`).

## Sticky header & responsive behavior

- Header is fixed/sticky at top; transparent background at scroll top, `bg-ink/80 backdrop-blur` once scrolled (simple scroll listener via `useEffect`).
- Mobile (< 640px): compact logo/symbol, compact CTA button, no hamburger menu (there are no nav links to hide).
- Footer: `flex-col` on mobile, `flex-row justify-between` on desktop.

## Verification

- `npm run dev`: header renders fixed, changes appearance on scroll, CTA opens `wa.me` link correctly (check mobile viewport in devtools).
- `npm run build`: confirm the client-component header doesn't break SSR.
- No automated tests for this phase (static UI) — manual/visual verification only, per `docs/CLAUDE.md` convention.

## Out of scope

- Nav anchor links (Serviços, Como funciona) — sections don't exist yet, deferred to when those milestones land.
- Real WhatsApp phone number — placeholder until user provides it.
- Hero content, services, trust section, final CTA — later milestones.
