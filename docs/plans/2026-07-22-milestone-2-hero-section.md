# Milestone 2 — Hero Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the Milestone 0 smoke-test hero into the real Milestone 2 hero: pain-focused headline/subheadline, prominent above-the-fold WhatsApp CTA, a crosshair/mira brand visual treatment, and an elevated (but brand-constrained) sense of depth and motion.

**Architecture:** One new component, `components/sections/hero.tsx` (client component — it needs `mousemove` state for parallax and `prefers-reduced-motion` detection, same pattern already used by `SiteHeader`), replaces the inline markup currently in `app/page.tsx`. It reuses `WhatsAppCta` unchanged and a lightly enhanced `ParticleField` (depth cues added), plus the brand crosshair mark (`/public/symbol.svg`) as a low-opacity centered background accent that drifts subtly with the particle field on desktop pointer devices.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, existing brand tokens (`ink`, `signal`, `amber`, `font-display`/`font-body`/`font-mono`), framer-motion (already a dependency, used for the header's entrance animation), React Three Fiber / drei (already a dependency, used by `ParticleField`).

**Design reference:** `docs/plans/2026-07-22-milestone-2-hero-section-design.md` — read the "Elevated motion & depth (within brand)" section before starting; it lists what is and is not in scope for the motion/visual treatment.

**Note on process:** No test runner in this project (confirmed convention from Milestone 1). Verification is manual: `npm run dev` + browser check, `npm run build` at the end.

## Global Constraints (binding — copy into every task reviewer dispatch)

- Colors: only `bg-ink` (`#0A0F0D`), `text-signal`/`bg-signal` (`#2EE6A0`), `text-amber`/`bg-amber` (`#FFB23E`), and the existing zinc/white neutrals already used in `WhatsAppCta`/`SiteHeader`/`SiteFooter`. No new colors, no gradients other than what's explicitly specified below.
- No mention of "n8n" or any automation-tool name anywhere in copy or code comments (per `docs/CLAUDE.md`).
- No contact form, email capture, or backend/database call of any kind — the only interactive element is the existing `WhatsAppCta` component, reused as-is (only `label`/`className` props may vary).
- All motion (parallax drift, entrance stagger) MUST be fully disabled (or reduced to an instant, static state) when `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is `true`. This is a hard requirement, not a nice-to-have.
- Exactly one low-opacity crosshair mark (`/public/symbol.svg`) as a centered background accent — no additional decorative panels, no multiple floating glass cards. The single eyebrow pill (`bg-white/5 backdrop-blur-sm border border-white/10`) is the only "glass" element permitted this milestone.
- `ParticleField`'s points stay signal-green only (`#2EE6A0`) — depth cues are expressed via size/opacity variation, not additional colors.
- The hero must remain a single static section (`min-h-screen`, centered content) — no scroll-jacking, no camera/3D-scene navigation, no section-to-section cinematic transitions.

---

### Task 1: Add depth cues to `ParticleField`

**Files:**
- Modify: `components/visuals/particle-field.tsx`

**Step 1:** The current implementation (`components/visuals/particle-field.tsx`) renders 800 uniformly-sized, uniformly-opaque signal-green points in a `THREE.Points` cloud with a slow constant Y-rotation. Add depth cues so the field reads as 3D space rather than a flat texture, while keeping the single signal-green color and the existing slow rotation:

- Compute each point's distance from camera-space origin (or reuse its stored `z` coordinate at generation time) and derive a per-point size/opacity factor from it — points further back (more negative/positive `z`, whichever is "further" given `camera={{ position: [0, 0, 5] }}`) should render slightly smaller/dimmer, points closer should render slightly larger/brighter. `pointsMaterial` only supports a single uniform `size`/`opacity`, so achieve this via a custom `THREE.ShaderMaterial` (vertex shader varies `gl_PointSize` by depth, fragment shader varies alpha by depth) or via `vertexColors` with a precomputed alpha-like brightness baked into a `THREE.BufferAttribute("color", ...)` array (simpler — no shader needed, use `pointsMaterial`'s `vertexColors` prop with an RGB array where each point's green channel intensity encodes its "brightness" and overall alpha stays via material `opacity`). Prefer the `vertexColors` approach — it's a smaller diff and avoids hand-written GLSL.
- Keep `count = 800`, keep the existing rotation behavior (`ref.current.rotation.y += delta * 0.02`) unchanged.
- No new colors: every point's color is a shade of `#2EE6A0` (vary brightness/lightness, not hue).

**Step 2:** Run `npm run dev`, view the hero (still the Milestone 0 placeholder markup in `app/page.tsx` at this point — that's fine, this task only touches `particle-field.tsx`) and visually confirm the particle field now has a sense of depth (some points visibly dimmer/smaller than others) without looking noisy or like a bug (no flickering, no points at 0 opacity that look like missing particles).

**Step 3:** Commit:

```bash
git add components/visuals/particle-field.tsx
git commit -m "feat: add depth cues to particle field"
```

---

### Task 2: Build the `Hero` section component (copy, layout, crosshair, entrance animation, parallax)

**Files:**
- Create: `components/sections/hero.tsx`

**Step 1:** Build the hero as a client component (`"use client"` — needed for the `mousemove` parallax listener and `prefers-reduced-motion` check) with the copy, layout, crosshair accent, staggered entrance animation, and subtle parallax from the design doc:

- Structure: `<section>` (`min-h-screen`, `bg-ink`, centered, `pt-20`, `overflow-hidden`, `relative`) containing, in this stacking order: `<ParticleField />` (background), the crosshair `<Image>` (background, centered, `opacity-[0.08]`, `pointer-events-none`), then the foreground content column (eyebrow pill → `h1` headline → `p` subheadline → `WhatsAppCta`).
- Copy (exact wording, from the design doc):
  - Eyebrow: `Atendimento lento. Venda perdida.` in a pill (`inline-flex`, `bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5`, `font-mono text-xs uppercase tracking-widest text-amber`).
  - Headline (`h1`, `font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl`): `Enquanto seu negócio demora para responder, o cliente já fechou com o concorrente.`
  - Subheadline (`p`, `font-body text-base leading-relaxed text-zinc-400 sm:text-lg`): `Agentes de IA humanizados da `, then `Hunter.AI` in `text-signal`, then `respondem, qualificam e agendam no WhatsApp, Instagram e site — 24 horas por dia, sem perder o tom humano.`
  - CTA: `<WhatsAppCta label="Falar no WhatsApp agora" className="mt-2 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg" />`
- Crosshair mark: `<Image src="/symbol.svg" alt="" aria-hidden width={640} height={640} className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] sm:h-[55vh] sm:w-[55vh]" />` (starting values — visually tune size/opacity in Task 3, keep within the range noted in the design doc).
- **Reduced-motion detection:** on mount, read `window.matchMedia("(prefers-reduced-motion: reduce)").matches` into state (and subscribe to its `change` event for correctness if the user toggles the OS setting mid-session). Store as `prefersReducedMotion: boolean`.
- **Staggered entrance:** wrap the foreground content in framer-motion, animating the eyebrow/headline/subheadline/CTA in sequence (e.g. a parent `motion.div` with `variants` + `staggerChildren`, each child a `motion.*` with a fade + slight `y` translate on mount). When `prefersReducedMotion` is `true`, skip the animation entirely (render final state immediately — e.g. pass `initial={prefersReducedMotion ? false : "hidden"}`).
- **Parallax:** on pointer-fine devices only (guard with `window.matchMedia("(pointer: fine)").matches`, in addition to the reduced-motion guard — both must allow motion), track mouse position relative to viewport center in state, and apply a small inverse `transform: translate(...)` (a few pixels of travel, e.g. `mouseX * -0.02`) to the crosshair `<Image>` and/or the `ParticleField` wrapper `<div>` so they drift opposite the cursor. Throttle/guard appropriately (a plain `mousemove` listener with direct state updates is fine at this scale — no need for a virtualization/rAF library, but do wrap the DOM update in `requestAnimationFrame` if you observe jank). Skip entirely (don't attach the listener) when reduced-motion is preferred or the device isn't pointer-fine.

**Step 2:** Do not render `<Hero />` anywhere yet — that's Task 3. Just get the file compiling (`tsc`/`next build` will catch this once wired in Task 3; for now, sanity-check with your editor/type-checker that props and imports resolve).

**Step 3:** Commit:

```bash
git add components/sections/hero.tsx
git commit -m "feat: add Hero section component"
```

---

### Task 3: Wire `Hero` into `app/page.tsx` and verify in-browser

**Files:**
- Modify: `app/page.tsx`

**Step 1:** Replace the current inline smoke-test markup with the new component:

```tsx
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return <Hero />;
}
```

**Step 2:** Run `npm run dev` and check:
- Headline + subheadline + CTA are fully visible without scrolling on mobile (~360×667) and desktop (~1280×800) viewports.
- Entrance animation plays once on load: eyebrow, then headline, then subheadline, then CTA, each appearing in quick succession (not simultaneous, not a long sluggish delay — should feel snappy, under ~1s total).
- On a desktop browser (mouse, not touch emulation), move the mouse around the hero — confirm the crosshair mark (and/or particle field) drifts subtly opposite the cursor. The effect should be barely-there, not disorienting.
- Crosshair mark is visible but subtle — doesn't fight the headline for attention, doesn't reduce text legibility. Adjust `opacity`/size in `hero.tsx` until it reads as a background texture, not competing artwork.
- `ParticleField` (with its new depth cues from Task 1) still renders underneath/around the crosshair without visual conflict (z-index stacking: particles behind text, crosshair behind particles — confirm the layering looks intentional, not muddy).
- WhatsApp CTA button is clearly the largest/most prominent interactive element on the page.
- Click the CTA — confirm it opens the correct `wa.me` link (same placeholder number/message as Milestone 1, via `buildWhatsAppLink()`).
- No console errors/hydration warnings.

**Step 3:** Responsive pass — devtools responsive mode at 360px, 768px, 1280px, 1440px:
- No horizontal scroll at any width.
- Text wraps sensibly (headline doesn't break into awkward single-word lines).
- Crosshair mark stays centered and doesn't overflow its container or clip strangely at any width.
- Confirm parallax doesn't activate in devtools' mobile/touch emulation (pointer-fine guard working).

**Step 4:** Reduced-motion check — in devtools, simulate `prefers-reduced-motion: reduce` (Rendering tab → "Emulate CSS media feature prefers-reduced-motion"), reload, and confirm: content appears immediately in its final state (no entrance animation), no parallax drift when moving the mouse.

**Step 5:** Commit:

```bash
git add app/page.tsx
git commit -m "feat: wire Hero section into homepage"
```

---

### Task 4: Accessibility & contrast check

**Step 1:** Verify contrast of headline (`text-zinc-50`), subheadline (`text-zinc-400`), and eyebrow (`text-amber`) against `bg-ink` (`#0A0F0D`) — all three should clear WCAG AA for their respective text sizes even with the crosshair mark and particles layered behind them. Spot-check with browser devtools' contrast checker on the rendered page (not just the flat color values), since the layered background could theoretically shift perceived contrast at the mark's edges.

**Step 2:** Confirm the crosshair `<Image>` has `alt=""` and `aria-hidden` (decorative, not content) so screen readers skip it — already specified in Task 2, just verify it survived any tuning edits.

**Step 3:** Tab through the page with keyboard only — confirm focus lands on the WhatsApp CTA with a visible focus ring (inherited from existing `WhatsAppCta`/global focus styles; flag if not visible and fix in `globals.css` or the CTA component if missing).

**Step 4:** Re-confirm the reduced-motion behavior from Task 3 Step 4 holds (this task is the acceptance gate for it, Task 3 was the build-time check).

---

### Task 5: Final verification of Milestone 2

**Step 1:** Run through the milestone acceptance bar from `docs/PLAN.md`:
- Hero is the clear first impression (headline addresses the pain, subheadline names the solution, CTA is prominent).
- CTA is prominent and functional on mobile + desktop.
- Crosshair/brand visual treatment matches the brand book (`brand/hunter-ai-brandbook.html`): centered mira, no distortion, no oversaturated green fill.
- Motion/depth treatment stays within the Global Constraints above — no colors outside ink/signal/amber/neutrals, no extra glass panels, no scroll-jacking.

**Step 2:** Run `npm run build` to confirm a clean production build (no SSR/hydration issues from the new client component, `Image` usage, or `ParticleField` shader/vertex-color changes).

**Step 3:** Update `docs/PLAN.md` — mark Milestone 2 as done with a "Delivered" summary line + link to this plan and the design doc, matching the Milestone 0/1 convention.

---

## Out of scope for this milestone

- Services section, trust section, final CTA — Milestones 3–5.
- Changes to `WhatsAppCta` or `lib/whatsapp.ts` beyond passing a different `label`/`className` — reused as-is from Milestone 1.
- Real WhatsApp phone number — still the Milestone 1 placeholder/TODO.
- Nav anchor links in the header — still no sections to link to after this milestone (services/trust land next).
- Neon/multi-color gradients, multiple floating glass panels, literal "holographic"/gaming aesthetics, scroll-jacked camera transitions — considered and explicitly rejected in favor of the brand-constrained treatment above (see design doc's "Elevated motion & depth" section).
