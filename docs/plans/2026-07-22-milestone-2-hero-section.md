# Milestone 2 — Hero Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the Milestone 0 smoke-test hero into the real Milestone 2 hero: pain-focused headline/subheadline, prominent above-the-fold WhatsApp CTA, and a crosshair/mira brand visual treatment.

**Architecture:** One new server component, `components/sections/hero.tsx`, replaces the inline markup currently in `app/page.tsx`. It reuses `WhatsAppCta` and `ParticleField` unchanged, and adds the brand crosshair mark (`/public/symbol.svg`) as a low-opacity centered background accent.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, existing brand tokens (`ink`, `signal`, `amber`, `font-display`/`font-body`/`font-mono`), framer-motion (already a dependency, used for the header's entrance animation).

**Design reference:** `docs/plans/2026-07-22-milestone-2-hero-section-design.md`

**Note on process:** No test runner in this project (confirmed convention from Milestone 1). Verification is manual: `npm run dev` + browser check, `npm run build` at the end.

---

### Task 1: Build the `Hero` section component

**Files:**
- Create: `components/sections/hero.tsx`

**Step 1:** Build the hero as a server component with the copy, layout, and crosshair accent from the design doc:

```tsx
// components/sections/hero.tsx
import Image from "next/image";
import { ParticleField } from "@/components/visuals/particle-field";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink px-6 pt-20 text-center">
      <ParticleField />

      <Image
        src="/symbol.svg"
        alt=""
        aria-hidden
        width={640}
        height={640}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] sm:h-[55vh] sm:w-[55vh]"
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          Atendimento lento. Venda perdida.
        </span>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Enquanto seu negócio demora para responder, o cliente já fechou com o concorrente.
        </h1>

        <p className="font-body text-base leading-relaxed text-zinc-400 sm:text-lg">
          Agentes de IA humanizados da{" "}
          <span className="text-signal">Hunter.AI</span> respondem, qualificam
          e agendam no WhatsApp, Instagram e site — 24 horas por dia, sem
          perder o tom humano.
        </p>

        <WhatsAppCta
          label="Falar no WhatsApp agora"
          className="mt-2 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
        />
      </div>
    </section>
  );
}
```

**Step 2:** Tune the crosshair opacity/size visually in the browser (Step in Task 2) — the `0.08`/`70vh` values above are a starting point, not final.

**Step 3:** Commit:

```bash
git add components/sections/hero.tsx
git commit -m "feat: add Hero section component"
```

---

### Task 2: Wire `Hero` into `app/page.tsx` and verify in-browser

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
- Crosshair mark is visible but subtle — doesn't fight the headline for attention, doesn't reduce text legibility. Adjust `opacity`/size in `hero.tsx` until it reads as a background texture, not competing artwork.
- `ParticleField` still renders underneath/around the crosshair without visual conflict (z-index stacking: particles behind text, crosshair behind particles — confirm the layering looks intentional, not muddy).
- WhatsApp CTA button is clearly the largest/most prominent interactive element on the page.
- Click the CTA — confirm it opens the correct `wa.me` link (same placeholder number/message as Milestone 1, via `buildWhatsAppLink()`).
- No console errors/hydration warnings.

**Step 3:** Responsive pass — devtools responsive mode at 360px, 768px, 1280px, 1440px:
- No horizontal scroll at any width.
- Text wraps sensibly (headline doesn't break into awkward single-word lines).
- Crosshair mark stays centered and doesn't overflow its container or clip strangely at any width.

**Step 4:** Commit:

```bash
git add app/page.tsx
git commit -m "feat: wire Hero section into homepage"
```

---

### Task 3: Accessibility & contrast check

**Step 1:** Verify contrast of headline (`text-zinc-50`), subheadline (`text-zinc-400`), and eyebrow (`text-amber`) against `bg-ink` (`#0A0F0D`) — all three should clear WCAG AA for their respective text sizes even with the crosshair mark and particles layered behind them. Spot-check with browser devtools' contrast checker on the rendered page (not just the flat color values), since the layered background could theoretically shift perceived contrast at the mark's edges.

**Step 2:** Confirm the crosshair `<Image>` has `alt=""` and `aria-hidden` (decorative, not content) so screen readers skip it — already in the Task 1 snippet, just verify it survived any tuning edits.

**Step 3:** Tab through the page with keyboard only — confirm focus lands on the WhatsApp CTA with a visible focus ring (inherited from existing `WhatsAppCta`/global focus styles; flag if not visible and fix in `globals.css` or the CTA component if missing).

---

### Task 4: Final verification of Milestone 2

**Step 1:** Run through the milestone acceptance bar from `docs/PLAN.md`:
- Hero is the clear first impression (headline addresses the pain, subheadline names the solution, CTA is prominent).
- CTA is prominent and functional on mobile + desktop.
- Crosshair/brand visual treatment matches the brand book (`brand/hunter-ai-brandbook.html`): centered mira, no distortion, no oversaturated green fill.

**Step 2:** Run `npm run build` to confirm a clean production build (no SSR/hydration issues from the new `Image` usage or component split).

**Step 3:** Update `docs/PLAN.md` — mark Milestone 2 as done with a "Delivered" summary line + link to this plan and the design doc, matching the Milestone 0/1 convention.

---

## Out of scope for this milestone

- Services section, trust section, final CTA — Milestones 3–5.
- Changes to `WhatsAppCta` or `lib/whatsapp.ts` beyond passing a different `label`/`className` — reused as-is from Milestone 1.
- Real WhatsApp phone number — still the Milestone 1 placeholder/TODO.
- Nav anchor links in the header — still no sections to link to after this milestone (services/trust land next).
