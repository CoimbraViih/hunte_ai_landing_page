# Milestone 4 — Trust/Credibility Section — Design

**Goal:** Add a third section — "Como funciona" — directly below Services, giving a non-technical owner a plain-terms mental model of what happens after they reach out (3 steps), without turning into a full case-studies/testimonials system. Per `docs/PLAN.md`: keep it light, support conversion intent, don't overload the page.

## Prerequisite (blocking)

`components/sections/services.tsx` does not exist on `master` yet. Milestone 3 was fully built and committed (`d4e5288`…`79c1407`) but only on the `worktree-milestone-3-services-section` branch (locked worktree at `.claude/worktrees/milestone-3-services-section`, also pushed to `origin`) — it was never merged via PR like Milestone 2 was (PR #1). `master` is still at `e403b65` (Milestone 2 only), and the working tree currently has an uncommitted, stray edit to `docs/PLAN.md` that already marks Milestone 3 "done" even though the code isn't on this branch.

**Recommendation:** merge the `worktree-milestone-3-services-section` branch into `master` via PR (same flow as PR #1) before writing any Milestone 4 code — Milestone 4 renders after `<Services />`, which doesn't exist on `master` yet. This is a git/GitHub action (visible, not easily reversible) so it's called out separately rather than done silently; the plan below assumes it has happened.

## Component

- `components/sections/trust.tsx` — new client component (`"use client"`, same reason as `Hero`/`Services`: framer-motion `whileInView` + `prefers-reduced-motion` detection).
- `app/page.tsx` renders `<Hero />` → `<Services />` → `<Trust />`.
- `id="como-funciona"` on the section (matches the brand reference's own anchor naming — see below), for a future in-page nav link. Wiring that link into `SiteHeader` stays out of scope for this milestone (same deferral Milestone 3 already flagged) — revisit once Milestone 5 completes the page and there's a full set of sections to link to.
- No new dependency: reuses `framer-motion` (already installed) and no icons (see Layout — this section deliberately doesn't reuse Services' icon-card language).

## Copy (adapted from the brand reference, on-brand hunter motif, no tooling leaks)

Source: `brand/hunter-ai-landing.html` (`#como-funciona`, lines 355–388) already contains a Hunter.AI-specific, n8n-free "how it works" write-up built around the hunting motif (rastrear/mirar/capturar) that gives the brand its name — this is a strong, ready-made fit for "why trust us" framed as "here's exactly what happens," so no copy is invented from scratch, only lightly tightened for section numbering:

- **Eyebrow:** `03 — Como funciona`
- **Heading (`h2`):** `Rastrear, mirar, capturar — em três etapas`
- **Lede:** `O mesmo instinto de caça que dá nome à marca organiza a entrega do seu projeto: da primeira conversa até o serviço no ar.`
- **Step 01 — Rastrear:** title `Mapeamos seu negócio` / body `Entendemos seus produtos, seu tom de voz, suas dúvidas mais frequentes e onde você está perdendo mais venda — no atendimento, no site ou nos dois.`
- **Step 02 — Mirar:** title `Construímos a solução certa pro seu momento` / body `Agente de IA, site novo ou redesign — o que fizer mais sentido pro seu negócio agora, sob medida pro seu processo.`
- **Step 03 — Capturar:** title `Vai ao ar — e você acompanha o resultado` / body `Atendimento, presença digital e conversão rodando de verdade, com o retorno mostrando o que está funcionando.`

Confirmed against `docs/CLAUDE.md`: no "n8n", no automation-tool naming anywhere in the above.

## Layout

- Section: `bg-ink`, `py-24 sm:py-32`, `id="como-funciona"`, `mx-auto max-w-6xl px-6` wrapper (matches Hero/Services container).
- Header block (eyebrow → heading → lede): left-aligned, `max-w-2xl`, same text-stack spacing as Services' header.
- Steps: a vertical list, not a grid of cards — this is a deliberate visual differentiator from Services (which already owns the "3-up card grid" pattern). Each step is a row: `grid grid-cols-[56px_1fr] sm:grid-cols-[80px_1fr] gap-4 sm:gap-7 py-9`, separated by `border-b border-dashed border-white/10` (last row: no border) — directly translates the brand reference's `.step-row`/`.steps` CSS into Tailwind utilities/tokens already in use (no new colors).
- Step number badge: a circle, `flex h-14 w-14 items-center justify-center rounded-full border border-signal/30 bg-signal/5 font-display text-base font-bold text-signal` (`01`/`02`/`03`) — translates `.step-num` from the brand CSS using only `signal`/existing neutrals.
- Step content column: label (`font-mono text-xs uppercase tracking-widest text-amber`, e.g. `Rastrear`) → `h3` (`font-display text-xl font-semibold text-zinc-50`) → body (`font-body text-zinc-400`, `max-w-[56ch]` per the brand reference's own reading-width constraint).

## Motion (consistent with Hero/Services)

- Header block and the 3 step-rows fade/slide up on scroll into view via framer-motion `whileInView` (`viewport={{ once: true, amount: 0.3 }}`), staggered top-to-bottom (header first, then steps in order) — same `containerVariants`/`itemVariants` pattern already used in `components/sections/hero.tsx`.
- `prefers-reduced-motion: reduce`: identical detection pattern to `Hero` (`useLayoutEffect` + `matchMedia` + `change` listener); when true, `initial={false}` so everything renders in final position immediately.
- No new animation library, no scroll-jacking/pinning — `gsap-scrolltrigger` is not warranted for a simple staggered list.

## Verify

- `npm run dev`: scrolling from Services into Trust triggers the header-then-steps stagger once (not re-triggered scrolling back up/down past threshold).
- All 3 steps render in order with correct number, label, title, body; dashed divider between rows, no divider after the last row.
- Mobile (360px): number badge shrinks to the `56px` column, no horizontal scroll, text doesn't feel cramped against the badge.
- Desktop (1280px+): `80px` badge column, body text capped at `56ch` so lines don't run edge-to-edge.
- No "n8n"/automation-tool wording anywhere in rendered copy.
- `prefers-reduced-motion: reduce`: header and steps render immediately, no animation.
- Contrast check: body text (`text-zinc-400`), label (`text-amber`), and number (`text-signal`) all against `bg-ink` — WCAG AA.
- `npm run build` clean.

## Out of scope

- In-page nav link to `#como-funciona` in `SiteHeader` — deferred again (see Prerequisite/Component notes); revisit once Milestone 5's final-CTA section completes the page.
- Testimonials, logos, case studies, numeric proof points (e.g. "N clientes atendidos") — none of these exist yet as verified claims; PLAN.md explicitly scopes Milestone 4 as light-touch, not a full credibility system.
- Per-step CTAs/links — the page's only interactive element remains the existing `WhatsAppCta` (hero only, so far).
- Any icon system for the steps — numbered badges only, to keep this section visually distinct from Services' icon-cards.
