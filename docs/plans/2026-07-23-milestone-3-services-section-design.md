# Milestone 3 — Services Section — Design

**Goal:** Add the second section of the page — 3 distinct, scannable cards presenting Hunter.AI's services (AI agents, site creation, site redesign) — directly below the hero. Outcome-focused copy only; no mention of the automation tooling (n8n) per `docs/CLAUDE.md`.

## Component

- `components/sections/services.tsx` — new client component (`"use client"` — needed for framer-motion `whileInView` scroll-triggered entrance, same library already used by `SiteHeader`/`Hero`, no new animation dependency).
- `app/page.tsx` renders `<Hero />` then `<Services />` (mirrors the "sections, not a component sprawl" convention).
- Card primitive: shadcn/ui `Card` (`components/ui/card.tsx`) — not present yet, add via `npx shadcn@latest add card` (project already has `components.json` configured, `style: "base-nova"`, `iconLibrary: "lucide"`). Use the shadcn MCP (`get_item_examples_from_registries`) to confirm current `Card`/`CardHeader`/`CardTitle`/`CardDescription` API before wiring it up — don't hand-roll a card div.
- Icons: `lucide-react` (already a dependency) — `MessageCircle` (agent), `Globe` (site creation), `RefreshCw` (redesign). Matches the brand reference mockup's icon choices (`brand/hunter-ai-landing.html` lines 303/309/315) without copying its raw inline SVGs.
- Section gets `id="servicos"` so a future header nav link can anchor to it — adding that link to `SiteHeader` is explicitly **out of scope** for this milestone (header nav wiring wasn't part of Milestone 1 and isn't listed for Milestone 3 either; flag as a follow-up once Milestones 4–5 give the page enough sections to justify in-page nav).

## Copy (outcomes, not tooling)

Direction: eyebrow (section marker) → heading (reframes the 3 services as one promise) → lede (what the customer gets, not how) → 3 cards (service name + outcome-focused description). Adapted from the existing brand reference (`brand/hunter-ai-landing.html`) but tightened and re-checked against the "no n8n" constraint:

- **Eyebrow** (JetBrains Mono, small caps, muted, same treatment as the hero's eyebrow pill): `02 — O QUE FAZEMOS`
- **Heading** (`h2`, Space Grotesk): `Três formas de parar de perder venda por atendimento e presença digital fracos`
- **Lede** (Manrope, muted): `A Hunter.AI cuida da parte técnica. Você recebe o resultado pronto — sem precisar entender de IA ou de código.`
- **Card 1 — Agentes de IA humanizados:**
  - Title: `Agentes de IA para atendimento`
  - Body: `Um agente humanizado que atende seus clientes pelo WhatsApp, Instagram ou site, qualifica cada conversa e agenda direto na sua agenda — 24 horas por dia.`
- **Card 2 — Criação de site:**
  - Title: `Criação de site`
  - Body: `Sua empresa ainda não tem site? A gente cria uma presença digital profissional que passa credibilidade e traz o cliente até você.`
- **Card 3 — Redesign de site:**
  - Title: `Redesign de site`
  - Body: `Site que já existe mas não converte? A gente reconstrói com foco em deixar o visitante virar cliente.`

No mention of "n8n", "automação", or any implementation-detail tooling anywhere in the above — confirmed against `docs/CLAUDE.md`'s constraint.

## Layout

- Section: `bg-ink`, `py-24 sm:py-32`, `id="servicos"`, contains a `max-w-6xl mx-auto px-6` wrapper (match the hero's horizontal padding/max-width so both sections align).
- Header block (eyebrow → heading → lede): left-aligned, `max-w-2xl`, stacked, mirrors the hero's text stack spacing.
- Cards: CSS grid, `grid-cols-1 gap-6 sm:grid-cols-3` (equal-width 3-up on tablet/desktop, stacked on mobile) — no carousel, no horizontal scroll (keeps it simple per `docs/CLAUDE.md`'s "sections, not component sprawl").
- Each `Card`: icon in a small square accent box (`bg-signal/10 border border-signal/20`, icon `text-signal`), numbered index (`01`/`02`/`03` in `font-mono text-xs text-zinc-500`, echoes the brand reference), title (`font-display`), body (`font-body text-zinc-400`).
- No card is visually "featured"/larger than the others — all 3 services are presented as equally valid entry points into contact (per PRD: the page doesn't push one service over another).

## Motion (consistent with Hero, still restrained)

- Header block and the 3 cards fade/slide up on scroll into view via framer-motion `whileInView` (`viewport={{ once: true, amount: 0.3 }}`), staggered (header first, then cards left-to-right with a small stagger) — same visual language as the hero's mount stagger, just scroll-triggered instead of mount-triggered.
- Respect `prefers-reduced-motion: reduce`: reuse the same detection approach as `Hero` (read `window.matchMedia("(prefers-reduced-motion: reduce)").matches`; when true, skip `whileInView` animation and render final state immediately via `initial={false}`).
- No hover-tilt/3D-card gimmicks, no per-card glow loop — a subtle `border-color`/`translate-y` lift on hover (`hover:border-signal/40 hover:-translate-y-1 transition`) is enough to signal interactivity-adjacent polish without the cards being clickable (they aren't — no per-service CTA/link in this phase, the single WhatsApp CTA stays the only interactive element on the page, consistent with `docs/CLAUDE.md`'s "single CTA" constraint).
- `motion-design` skill consulted for stagger timing/easing so this section's entrance feels like the same system as the hero's, not a different animation library's default.

## Verify

- `npm run dev`: scroll from hero into services — heading/lede appear first, then the 3 cards fade/slide in with a visible but quick stagger (not simultaneous, not sluggish).
- Each card is scannable in under a couple seconds: icon, title, one-sentence outcome — no paragraph-length copy.
- Mobile (360px): cards stack single-column, no horizontal scroll, spacing doesn't feel cramped.
- Desktop (1280px+): 3 equal-width cards, aligned to the same `max-w-6xl` container as future sections will use.
- No occurrence of "n8n" or automation-tool naming anywhere in rendered copy.
- `prefers-reduced-motion: reduce`: cards and header render immediately in final position, no animation.
- Contrast check: card body text (`text-zinc-400` on `bg-ink`/card background) meets WCAG AA.

## Out of scope

- Header nav anchor link to `#servicos` — flagged as a follow-up, not required by this milestone.
- Per-service CTAs/links (e.g. "saiba mais" per card) — the page's only CTA remains the WhatsApp button (hero + later final-CTA section).
- Trust/credibility content, testimonials, case studies — Milestone 4.
- Any scroll-jacking, pinned sections, or GSAP ScrollTrigger — framer-motion's `whileInView` is sufficient for a simple fade/stagger; reaching for `gsap-scrolltrigger` is reserved for choreography this section doesn't need.
