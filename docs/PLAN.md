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

## Milestone 3 — Services section (3 offers) ✅ Done

- Section presenting the 3 services as distinct cards/blocks:
  1. Agentes de IA humanizados para atendimento
  2. Criação de site
  3. Redesign/otimização de site
- Copy must describe outcomes, not the automation tooling (no mention of n8n)
- Verify: each service is scannable, hierarchy is clear, no implementation-detail leaks in copy
- Tooling: use the shadcn MCP for the card primitive, the `frontend-design` skill for layout/visual quality, and `motion-design`/`gsap-scrolltrigger` if cards get scroll-triggered entrances.

**Delivered:** `components/sections/services.tsx` — a 3-card grid (shadcn `Card` primitive, `lucide-react` icons: `MessageCircle`/`Globe`/`RefreshCw`) below the hero, wired into `app/page.tsx`. Copy and a schema.org `Service`/`Organization` JSON-LD block were finalized in a dedicated content pass (`docs/plans/2026-07-23-milestone-3-content-spec.md`) using the `copywriting`, `copy-editing`, `schema`, and `ai-seo` skills before implementation. Built via subagent-driven development (implementer + reviewer per task) with two extra mandatory quality gates beyond the usual hero-style pass: an independent design review (`ui-designer` agent, fixed a generic corner-badge icon layout and cramped card padding) and an SEO audit (`seo-specialist` agent + `seo-audit` skill — verdict: pass). Accessibility QA caught and fixed a real defect: shadcn's `CardTitle` renders a non-semantic `<div>`, silently dropping all 3 service titles from the heading outline — replaced with native `<h3>`. Entrance animation reuses the hero's exact `whileInView` stagger timing/easing and `prefers-reduced-motion` detection pattern for a consistent motion system. **Known follow-up (deferred, not a defect):** the embedded JSON-LD's `Organization` node uses a placeholder domain (`https://hunterai.com.br`) and lacks `logo`/`sameAs`/`contactPoint` — both require real brand assets/domain not yet finalized; revisit when Milestone 6 configures `app/layout.tsx` metadata. Design: [`docs/plans/2026-07-23-milestone-3-services-section-design.md`](./plans/2026-07-23-milestone-3-services-section-design.md). Content spec: [`docs/plans/2026-07-23-milestone-3-content-spec.md`](./plans/2026-07-23-milestone-3-content-spec.md). Plan: [`docs/plans/2026-07-23-milestone-3-services-section.md`](./plans/2026-07-23-milestone-3-services-section.md).

## Milestone 4 — Trust/credibility section ✅ Done

- Section reinforcing why a non-technical owner should trust Hunter.AI (e.g., how it works in plain terms, what to expect after reaching out)
- Keep light — this is not a full case-studies/testimonials system, just enough to reduce friction before the CTA
- Verify: section supports conversion intent without overloading the page
- Tooling: `frontend-design` skill for layout; keep animation consistent with earlier sections via `motion-design` principles.

**Delivered:** `components/sections/trust.tsx` — a "Como funciona" 3-step list (Rastrear/Mirar/Capturar, adapted from `brand/hunter-ai-landing.html`'s own hunting-motif copy) below Services, wired into `app/page.tsx`. Deliberately a vertical numbered `<ol>` with dashed row dividers and signal-colored circular badges, not a card grid, to read as a distinct-but-consistent third section rather than a Services reskin. Copy finalized in a dedicated content pass (`docs/plans/2026-07-24-milestone-4-content-spec.md`) using the `copywriting` and `copy-editing` skills. Built via subagent-driven development in an isolated worktree (implementer + reviewer per task, plus a final whole-branch review): Task 2's implementation used `frontend-design`, `motion-design`, `tailwind-patterns`, `ui-design-system`, and `ui-ux-pro-max`; Task 3's accessibility pass (via the `accessibility-tester` agent and the `web-design-guidelines` skill) caught and fixed a real defect — the steps were plain `div`s instead of a semantic `<ol>/<li>`, so screen readers had no sense of step order — fixed with native list semantics plus `aria-hidden` on the now-redundant visible `01/02/03` numerals; Task 4's design-quality pass (`ui-designer` agent, the `web-design-reviewer` command, and the `screenshot-ui-analyzer` agent) investigated every finding against live DOM measurements and found no real defect, only spec-matched decisions (e.g. the Services→Trust whitespace follows both sections' already-approved `py-24 sm:py-32` padding) and screenshot capture-timing artifacts. Entrance animation reuses Hero/Services' exact `whileInView` stagger timing/easing and `prefers-reduced-motion` detection pattern. Reviewed but deliberately not used: `gsap-*`/`threejs-*` skills (no WebGL/choreography need beyond what framer-motion already does), `text-to-lottie` (no Lottie asset needed), SEO agents/skills (no new structured-data surface), `ui-ux-designer` (redundant with `ui-designer`+`web-design-reviewer` on the same section). Merged to `master`; feature branch (`worktree-milestone-4-trust-credibility-section`) deleted locally and on GitHub. Design: [`docs/plans/2026-07-24-milestone-4-trust-credibility-design.md`](./plans/2026-07-24-milestone-4-trust-credibility-design.md). Content spec: [`docs/plans/2026-07-24-milestone-4-content-spec.md`](./plans/2026-07-24-milestone-4-content-spec.md). Plan: [`docs/plans/2026-07-24-milestone-4-trust-credibility.md`](./plans/2026-07-24-milestone-4-trust-credibility.md).

## Cross-milestone review & bugfix pass (2026-07-24) ✅ Done

A full review of everything delivered in Milestones 0-4, run before starting Milestone 5, using the project's error-correction tooling: the `code-reviewer`, `security-auditor`, `unused-code-cleaner`, and `accessibility-tester` agents in parallel across the whole app (`app/`, `components/`, `lib/`), followed by root-cause-first fixes per the `systematic-debugging` skill.

**Found and fixed:**
- `app/layout.tsx` never actually applied the dark theme — `<html>`/`<body>` had no `.dark` class, so the page's real background was shadcn's light-mode white token, only hidden by coincidental section backgrounds (would show through on overscroll/tall viewports). Set `bg-ink text-zinc-50` directly on `<body>`.
- `<html lang="en">` on an all-Portuguese page (confirmed independently by both the code review and the accessibility audit) — corrected to `lang="pt-BR"`.
- Two real ESLint failures (`react-hooks/set-state-in-effect` in `hero.tsx`'s parallax effect, `react-hooks/purity` in `particle-field.tsx`'s `Math.random()`-inside-`useMemo`) — both fixed at the root (render-time derivation for the former, a `useState` lazy initializer for the latter), not suppressed.
- A WCAG AA contrast failure: `text-zinc-500` (4.00:1 against `bg-ink`) used inconsistently in two spots (services card index, footer copyright) while every other muted-text instance on the page already used the passing `text-zinc-400` (7.54:1) — brought in line.
- Missing `scroll-margin-top` on the `#servicos`/`#como-funciona` anchor targets — preventive fix so a future nav link won't land content under the fixed header.
- Added a skip-to-content link + `id="main-content"` (page-composition-level a11y gap no single-section review would catch).
- Dead code: `components/ui/button.tsx` (zero consumers — CTAs use the hand-rolled `WhatsAppCta`) and unused `CardTitle`/`CardAction`/`CardFooter` exports from `components/ui/card.tsx` removed entirely.
- `eslint.config.mjs` was linting an unrelated foreign project directory that happened to be sitting under `.claude/worktrees/` (not a git worktree of this repo) — scoped `.claude/**` out of lint.
- `npm dedupe` hoisted a duplicate dev-only `zod` resolution; a separate `three@0.170.0`/`0.185.1` duplication (via `@react-three/drei`'s `stats-gl` transitive dependency) remains and isn't fixable via dedupe alone — `stats-gl` itself pins an incompatible range.

**Investigated, no fix needed:** the `AGENTS.md`/`CLAUDE.md` claim that this is a modified Next.js with docs at `node_modules/next/dist/docs/` was independently flagged as a possible prompt-injection by the code-review pass — verified directly (`ls node_modules/next/dist/docs`) and confirmed the directory genuinely exists in this project's installed `next@16.2.11`, so no action taken. `dangerouslySetInnerHTML` (services JSON-LD) confirmed safe (static data only, no user input). `npm audit`'s 6 advisories (postcss/sharp bundled inside `next`, `@hono/node-server` via the `shadcn` dev CLI) all require a breaking downgrade to "fix" (`next` 16→9) that would be far worse than the advisories themselves — left as a known, accepted pre-launch item, not force-fixed.

**Deferred (noted, not blockers):** security headers (CSP/`X-Frame-Options`/etc.) in `next.config.ts` — appropriate for Milestone 6/7, not a defect in existing code; `@react-three/drei` unused-in-code-today status — kept, since Milestone 0 explicitly provisioned it for future 3D work.

Verified via `npm run lint` (0 problems) and `npm run build` (clean) after every fix. Built in an isolated worktree, merged to `master`, feature branch deleted locally and on GitHub.

## Milestone 5 — Final CTA & footer

- Closing CTA section repeating the WhatsApp contact path
- Footer with brand mark, minimal links (no dead links/pages)
- Verify: full page scroll flows logically from hero → services → trust → final CTA
- Tooling: reuse existing `WhatsAppCta`/`site-footer` patterns; `frontend-design` skill for the closing CTA treatment.

## Milestone 6 — Polish & QA

- Cross-browser/responsive pass (mobile, tablet, desktop)
- Accessibility check: contrast (dark background + accent colors), focus states, semantic HTML
- Performance pass: image optimization, font loading strategy, Lighthouse check
- Verify: production build (`next build`) is clean, Lighthouse scores are healthy
- Tooling: drive the pass with the **Chrome DevTools MCP** (console/network/perf traces, screenshots across breakpoints) and audit against the **web-design-guidelines** skill before sign-off.

## Milestone 7 — Deploy

- Deploy to Vercel
- Confirm domain, verify WhatsApp CTA in production
- Verify: live URL matches local build, CTA tested end-to-end on real devices

---

## Future / out of scope for now

- Contact form with Resend email delivery (only if scope expands beyond WhatsApp-only CTA)
- Any Supabase-backed data capture or platform features
- Do not start these until explicitly requested — see [`CLAUDE.md`](./CLAUDE.md) constraints.
