# Milestone 2 — Hero Section — Design

**Goal:** Replace the Milestone 0 smoke-test hero in `app/page.tsx` with the real hero: a pain-focused headline/subheadline, a prominent WhatsApp CTA above the fold, and a crosshair/mira brand visual treatment. Still a single static section — no services/trust content yet (Milestones 3+).

## Component

- `components/sections/hero.tsx` — new server component holding all hero markup (headline, subheadline, CTA, crosshair visual). `app/page.tsx` is trimmed down to just render `<Hero />` (mirrors the "sections, not a component sprawl" convention from `docs/CLAUDE.md`).
- Reuses existing `WhatsAppCta` (`components/layout/whatsapp-cta.tsx`) — no new CTA component.
- Reuses existing `ParticleField` (`components/visuals/particle-field.tsx`) as the ambient background layer — already signal-green, already positioned `absolute inset-0 -z-10`, no changes needed.
- Adds one new visual element: the brand crosshair mark (`/public/symbol.svg`) as a large, low-opacity centered accent behind the headline — per `brand/hunter-ai-brandbook.html`: mira centered, minimum clearance = center-dot radius × 3, never distorted, never oversaturated in green.

## Copy (pain → solution → action)

- **Eyebrow** (JetBrains Mono, small caps, muted): `ATENDIMENTO LENTO. VENDA PERDIDA.` — names the pain in one line before the headline.
- **Headline** (Space Grotesk, large, existing `.text-signal` treatment for the brand-colored word):
  `Enquanto seu negócio demora para responder, o cliente já fechou com o concorrente.`
- **Subheadline** (Manrope, body):
  `Agentes de IA humanizados da <span class="text-signal">Hunter.AI</span> respondem, qualificam e agendam no WhatsApp, Instagram e site — 24 horas por dia, sem perder o tom humano.`
  (No mention of automation tooling, per `docs/CLAUDE.md` constraint.)
- **CTA:** `WhatsAppCta` with `label="Falar no WhatsApp agora"`, sized up (own visual weight, not the compact header variant).

Exact wording stays adjustable during implementation — the above is the working draft; direction (pain-first eyebrow → consequence headline → solution subheadline → action) is the fixed part.

## Layout

- Keep the existing full-viewport section (`min-h-screen`, `bg-ink`, centered, `pt-20` clearance for the fixed header — unchanged from Milestone 1).
- Stack order (mobile-first, all breakpoints): eyebrow → headline → subheadline → CTA → crosshair visual as background (not in flow — `absolute`, `-z-10`, behind `ParticleField`'s particles but above the flat `bg-ink`).
- Desktop (`sm:`/`lg:`): same centered single-column stack (this is a lean institutional hero, not a two-column split) — widen `max-w-xl` to `max-w-2xl` for the headline so it doesn't wrap too aggressively at large sizes.
- Crosshair mark: centered, large (`~60vh` or fixed large px on desktop, smaller on mobile so it doesn't overpower the copy), low opacity (`opacity-[0.08]`–`0.12` range, tuned visually), `pointer-events-none` so it never intercepts clicks/taps meant for the CTA.

## Elevated motion & depth (within brand)

Direction requested for this milestone: raise the hero's motion/depth/interactivity quality (inspired by immersive WebGL/particle sites) while staying **strictly inside** the existing brand system — confirmed with the user after flagging the conflict with `docs/CLAUDE.md`'s institutional/Linear-Vercel tone and the brand book's "no generic AI gradients, don't flood the screen with green" rule. Concretely, in scope:

- **Richer `ParticleField`:** keep the existing signal-green points, but add depth cues — vary point size/opacity slightly by z-position so the field reads as 3D space, not a flat texture. Still one color (`#2EE6A0`), still low-key ambient, not a light show.
- **Subtle parallax:** on desktop (pointer-fine devices), the crosshair mark and particle field drift a few pixels opposite mouse movement (cheap `translate` via a `mousemove` listener or CSS `transform` driven by state, no new heavy library) so the scene has a light "camera" feel. Must respect `prefers-reduced-motion: reduce` — disable parallax and continuous motion entirely when set.
- **Staggered entrance:** eyebrow → headline → subheadline → CTA fade/slide up in sequence via framer-motion (already a dependency, same pattern as `SiteHeader`'s existing entrance animation from Milestone 1) — reads as a composed reveal rather than everything popping in at once.
- **One glass accent, not a UI of them:** the eyebrow label (`ATENDIMENTO LENTO. VENDA PERDIDA.`) sits in a single small pill with `bg-white/5 backdrop-blur-sm border border-white/10` — a restrained nod to "floating glass card," not a page full of translucent panels.
- **CTA glow:** `WhatsAppCta` already ships a signal-green box-shadow glow (Milestone 1) — this milestone can intensify it slightly on hover only; no continuously pulsing/animated glow (would compete with the "lean, single clear CTA" convention).

Explicitly **out of scope** (this is where the sci-fi prompt's literal ask gets rejected, not adapted):
- Neon multi-color gradients, purple/blue sci-fi palettes — signal-green + amber + ink only, per brand book.
- Multiple floating holographic/glassmorphism panels covering the viewport.
- Literal "cinematic camera transitions" between sections, 3D scene navigation, or game-like interaction — this is a single static hero, not a WebGL experience site.
- Saturating the viewport in green ("não encha a tela de verde") — the particle field and crosshair stay low-opacity ambient accents, never the visual foreground.

## Verify

- `npm run dev`: hero is the first thing visible on load (no scrolling needed to see headline + CTA) at common viewport heights (mobile ~667px, laptop ~800px+).
- CTA is clickable/tappable and opens the correct `wa.me` link (inherits `buildWhatsAppLink()` — no changes to `lib/whatsapp.ts` in this milestone).
- Crosshair visual doesn't reduce text contrast (WCAG check on headline/subheadline against `bg-ink` with the mark behind it) and doesn't block CTA interaction.
- Mobile (360px) and desktop (1280px+): no horizontal scroll, no overlap between crosshair mark and text/CTA.
- `prefers-reduced-motion: reduce` (OS/browser setting): parallax and entrance animation are disabled/instant — content is still fully visible and functional, just static.

## Out of scope

- Services section, trust section, final CTA — later milestones.
- New CTA variants or WhatsApp helper changes — Milestone 1's `WhatsAppCta`/`buildWhatsAppLink()` are reused as-is.
- Real WhatsApp number — still the placeholder from Milestone 1 (tracked TODO in `lib/whatsapp.ts`).
- Scroll-triggered/complex animation beyond what `ParticleField` already does — a simple entrance fade-in for the headline/CTA (matching the header's existing framer-motion pattern) is in scope; anything heavier is not.
