# Milestone 4 — Trust/Credibility Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add a "Como funciona" section (3 steps: Rastrear/Mirar/Capturar) directly below Services, giving a plain-terms answer to "what happens after I reach out" — light-touch trust-building, not a full case-studies system.

**Architecture:** One new component, `components/sections/trust.tsx` (client component — `whileInView` + `prefers-reduced-motion`, same pattern as `hero.tsx`/`services.tsx`), rendered in `app/page.tsx` right after `<Services />`. No new dependencies. No changes to `WhatsAppCta`, `lib/whatsapp.ts`, `SiteHeader`, `ParticleField`, or the shadcn `Card` primitive (this section is a step-list, not cards).

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, framer-motion (existing dependency).

**Design reference:** `docs/plans/2026-07-24-milestone-4-trust-credibility-design.md` — read in full before starting; it has the layout/motion spec and the brand source (`brand/hunter-ai-landing.html#como-funciona`) this content is adapted from.

**Note on process:** No test runner in this project. Verification is manual: `npm run dev` + browser check, `npm run build` at the end.

**Prerequisite (resolved):** Milestone 3 (`worktree-milestone-3-services-section`) has been merged into `master` (merge commit, `Services` section + shadcn `Card` live on `master`), the branch deleted locally and on `origin`. `app/page.tsx` on `master` now renders `<Hero /><Services />`. This plan's Task 2 adds `<Trust />` after that.

## Mandatory design tooling (project `.claude/` skills, agents, commands)

Per explicit instruction, every task below names which of this project's own `.claude/skills`, `.claude/agents`, and `.claude/commands` design tooling must be invoked while doing the work — not treated as optional. Reviewed against the full `.claude/` inventory:

- **Used, with a task each below:** `copywriting`, `copy-editing`, `frontend-design`, `motion-design`, `tailwind-patterns`, `ui-design-system`, `ui-ux-pro-max`, `web-design-guidelines`, `screenshot` (skills); `ui-designer`, `accessibility-tester`, `screenshot-ui-analyzer` (agents); `web-design-reviewer` (command).
- **Reviewed, deliberately not used, with reason:** `gsap-core/-frameworks/-performance/-plugins/-react/-scrolltrigger/-timeline/-utils` and all `threejs-*` skills — this section has no WebGL/canvas and no choreography framer-motion can't do (a two-block staggered fade, identical to Hero/Services); reaching for GSAP would add a second animation library the rest of the page doesn't use, and Three.js has no surface here at all. `text-to-lottie` — no Lottie asset is needed for a numbered step list. `seo-analyzer`/`seo-specialist` (agents) and SEO-flavored skills — Milestone 3 already added the page's `Service`/`Organization` JSON-LD; this section has no new structured-data surface, so an SEO pass would have nothing to check. `ui-ux-designer` (agent) — functionally overlaps `ui-designer` (used below) and `web-design-reviewer` (used below); running all three on the same small section would be redundant review, not more thorough review.

## Global Constraints (binding — copy into every task reviewer dispatch)

- Colors: only `bg-ink` (`#0A0F0D`), `text-signal`/`bg-signal`/`border-signal` (`#2EE6A0`), `text-amber` (`#FFB23E`), and existing zinc/white neutrals. No new colors, no gradients.
- No mention of "n8n" or any automation-tool name anywhere in copy, comments, or commit messages.
- No contact form, email capture, per-step links/CTAs, testimonials, logos, or numeric proof points — the only interactive element on the page stays the existing `WhatsAppCta`.
- All scroll-triggered entrance animation MUST be skipped (render final state immediately) when `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is `true`.
- 3 steps only, presented as a vertical numbered list (not a card grid — that pattern already belongs to Services).
- No icons, no new animation library (framer-motion only — see "Mandatory design tooling" above for why GSAP/Three.js are out of scope).

---

### Task 1: Content & copy pass

**Mandatory tooling:** the `copywriting` skill and the `copy-editing` skill MUST both be invoked while producing this task's output.

**Files:**
- Create: `docs/plans/2026-07-24-milestone-4-content-spec.md`

**Step 1:** Take the working-draft copy from `docs/plans/2026-07-24-milestone-4-trust-credibility-design.md` (eyebrow, `h2`, lede, 3× step label/title/body — sourced from `brand/hunter-ai-landing.html#como-funciona`) through a real copy pass:
- Use the `copywriting` skill to check the copy reads as a concrete, plain-terms process a non-technical owner would trust (each step should describe what happens and what the owner experiences, not internal process jargon) — tighten anything that reads generic or like a rephrased feature list.
- Use the `copy-editing` skill to proofread the result: pt-BR grammar/punctuation, tone consistent with Hero and Services (read `components/sections/hero.tsx` and `components/sections/services.tsx` for the established voice), no filler, no line that would wrap awkwardly at the ~56ch body-text width called out in the design doc.
- Hard constraint carried over from `docs/CLAUDE.md`: no mention of "n8n" or any automation-tool name in any candidate copy.

**Step 2:** Write `docs/plans/2026-07-24-milestone-4-content-spec.md` containing the finalized exact copy strings (eyebrow, `h2`, lede, 3× step label/title/body — verbatim, ready to paste into JSX) and a short rationale note for any change from the design doc's working draft. No code changes to `components/` in this task — it is a content/spec-only deliverable.

**Step 3:** Commit:
```bash
git add docs/plans/2026-07-24-milestone-4-content-spec.md
git commit -m "docs: finalize trust section copy"
```

---

### Task 2: Build the `Trust` section component

**Mandatory tooling:** the `frontend-design` skill (visual quality/layout execution), the `motion-design` skill (entrance stagger timing/easing), the `tailwind-patterns` skill (utility structure/consistency), and the `ui-design-system` and `ui-ux-pro-max` skills (design-system/token consistency with Hero and Services) MUST all be used while implementing this task.

**Files:**
- Create: `components/sections/trust.tsx`
- Modify: `app/page.tsx`

**Step 1:** Read `docs/plans/2026-07-24-milestone-4-content-spec.md` (Task 1's output) first — it has the exact, final copy strings to use verbatim. Do not re-draft copy in this task.

**Step 2:** Build a client component (`"use client"`) with the structure from the design doc:

- `<section id="como-funciona" className="bg-ink py-24 sm:py-32">` containing `<div className="mx-auto max-w-6xl px-6">`.
- Header block (left-aligned, `max-w-2xl`, same eyebrow-pill treatment as Hero/Services): eyebrow, `h2` (`font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl`), lede (`font-body text-base text-zinc-400 sm:text-lg mt-4`) — exact text from the content spec.
- Step list below the header (`mt-16`), 3 rows, each `grid grid-cols-[56px_1fr] sm:grid-cols-[80px_1fr] gap-4 sm:gap-7 py-9 border-b border-dashed border-white/10` (omit the border on the last row):
  - Number badge: `flex h-14 w-14 items-center justify-center rounded-full border border-signal/30 bg-signal/5 font-display text-base font-bold text-signal` — `01`/`02`/`03`.
  - Content column: label (`font-mono text-xs uppercase tracking-widest text-amber`) → `h3` (`font-display text-xl font-semibold text-zinc-50 mt-2`) → body (`font-body text-zinc-400 mt-2 max-w-[56ch]`).
  - Exact copy (label / title / body) per the content spec.

**Step 3:** **Reduced-motion + entrance animation:** reuse the exact pattern from `components/sections/hero.tsx` — `useLayoutEffect` reading `window.matchMedia("(prefers-reduced-motion: reduce)")` into state, subscribed to its `change` event. Wrap the header and the step list in framer-motion (`motion.div` per row, `variants`, `initial={prefersReducedMotion ? false : "hidden"}`, `whileInView="visible"`, `viewport={{ once: true, amount: 0.3 }}`), staggering: header first, then the 3 steps top-to-bottom via `staggerChildren` — use the `motion-design` skill to pick stagger delay/easing so it reads as the same system as Hero/Services, not a different feel.

**Step 4:** Wire into `app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Trust } from "@/components/sections/trust";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
    </>
  );
}
```

**Step 5:** Run `npm run dev` and check in-browser (use the `screenshot` skill to capture mobile 360px and desktop 1280px+ views for the record):
- Scrolling from Services into Trust triggers the header-then-steps stagger once.
- All 3 steps render with correct number, label, title, body, in order (matching the content spec exactly); dashed divider between rows, none after the last row.
- Mobile (360px): no horizontal scroll, badge column doesn't crowd the text.
- Desktop (1280px+): body text doesn't run edge-to-edge (respects `max-w-[56ch]`).
- Toggle `prefers-reduced-motion: reduce` and reload/re-scroll: header and steps appear immediately, no animation.
- Confirm no "n8n"/automation-tool wording anywhere in the rendered section.
- `npm run build`: clean, no type/lint errors.

**Step 6:** Commit:
```bash
git add components/sections/trust.tsx app/page.tsx
git commit -m "feat: add Trust/how-it-works section"
```

---

### Task 3: Accessibility & visual QA pass

**Mandatory tooling:** the `web-design-guidelines` skill and the `accessibility-tester` agent MUST both be used for this pass, in addition to the manual checks below.

**Step 1:** Dispatch the `accessibility-tester` agent against `components/sections/trust.tsx` (and the rendered section in-browser) for a structured WCAG 2.2 pass: contrast (`text-zinc-400` body, `text-amber` label, `text-signal` number badge, all against `bg-ink`/card background), heading hierarchy (`h2` for the section, `h3` per step, no skipped levels, still only one `h1` on the page), keyboard/tab order (step rows have no interactive elements — confirm nothing stray appears in tab order), and screen-reader reading order per row (label → title → body).

**Step 2:** Run the `web-design-guidelines` skill against the same section and cross-check its findings against the `accessibility-tester` agent's report — resolve any disagreement by re-checking directly in-browser rather than picking one report by default.

**Step 3:** Fix any issues found directly in `components/sections/trust.tsx`, then re-verify. Commit as:
```bash
git commit -m "fix: trust section accessibility nits"
```
(only if fixes are needed after Task 2's commit)

---

### Task 4: Design quality review (dedicated design-agent pass)

**Mandatory tooling:** dispatch the `ui-designer` agent and run the `web-design-reviewer` command against the shipped section — this is in addition to, not a replacement for, Task 2's `frontend-design`/`motion-design`/`tailwind-patterns`/`ui-design-system`/`ui-ux-pro-max` usage during implementation. Use the `screenshot-ui-analyzer` agent on the Task 2 screenshots to cross-check the same layout/hierarchy findings from a second, independent angle.

**Step 1:** Have the `ui-designer` agent evaluate `components/sections/trust.tsx` (and the rendered page) against: `docs/plans/2026-07-24-milestone-4-trust-credibility-design.md`, the brand book (`brand/hunter-ai-brandbook.html`, `brand/Hunter-AI-Brand-Book.pdf`), and how it reads next to the already-shipped Hero/Services (hierarchy, spacing rhythm, alignment to the shared `max-w-6xl` container, whether the step list reads as a distinct but consistent third section rather than a generic AI-generated list).

**Step 2:** Run the `web-design-reviewer` command over the same section for a second, differently-framed pass, and have the `screenshot-ui-analyzer` agent review the Task 2 mobile/desktop screenshots specifically for layout/spacing issues a static image makes obvious (e.g. badge/text misalignment, uneven row heights) that a code-only review could miss.

**Step 3:** Triage findings across all three: fix anything Critical/Important directly in `components/sections/trust.tsx` (colors/tokens/copy stay within this plan's Global Constraints and the Task 1 content spec — a design finding cannot introduce a new color or rewrite the approved copy; if any tool proposes either, that's a conflict to flag, not silently apply). Record Minor polish suggestions even if not applied.

**Step 4:** If any fix was applied, commit:
```bash
git commit -m "fix: trust section design review polish"
```

---

## Definition of done

- `components/sections/trust.tsx` exists, renders the 3-step "Como funciona" list, right below Services.
- Scroll entrance animation matches Hero/Services' visual language and fully respects `prefers-reduced-motion`.
- `npm run build` passes cleanly.
- No mention of "n8n" or automation tooling anywhere in the section.
- Mobile (360px) and desktop (1280px+) both verified in-browser, no horizontal scroll, no contrast/accessibility regressions.
- All four tasks' mandatory design tooling actually invoked (not skipped) — see task list above.
- `docs/PLAN.md` updated to mark Milestone 4 done with a "Delivered" summary and links to this plan + its design doc, once merged.
