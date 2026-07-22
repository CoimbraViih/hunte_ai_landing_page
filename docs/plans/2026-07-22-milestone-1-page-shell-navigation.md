# Milestone 1 — Page Shell & Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the base page shell — sticky header with logo + WhatsApp CTA, and a minimal footer — wired into `app/layout.tsx` so every future page/section inherits it, fully responsive down to small phone widths.

**Architecture:** Two new layout components (`SiteHeader`, `SiteFooter`) plus a reusable `WhatsAppCta` button and a `lib/whatsapp.ts` helper that centralizes the (placeholder) phone number and prefilled message. `SiteHeader` is a client component (tracks scroll position for the sticky/blur effect); `SiteFooter` and `WhatsAppCta` are plain server-renderable markup. `app/layout.tsx` composes them around `{children}`.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS (existing brand tokens: `ink`, `signal`, `amber`, `font-display`/`font-body`).

**Note on process:** No test runner is installed in this project yet (confirmed with user — deliberately not introducing Vitest/Jest for a single pure-string-building helper on a static marketing site). Verification is manual: `npm run dev` + browser check at each step, `npm run build` at the end, matching the Milestone 0 convention in `docs/plans/2026-07-22-milestone-0-project-setup.md`.

**Design reference:** `docs/plans/2026-07-22-milestone-1-page-shell-navigation-design.md`

---

### Task 1: WhatsApp link helper

**Files:**
- Create: `lib/whatsapp.ts`

**Step 1:** Create the helper that centralizes the phone number and builds the `wa.me` URL with an optional prefilled, URL-encoded message:

```ts
// lib/whatsapp.ts

// TODO: replace with real Hunter.AI WhatsApp number
const WHATSAPP_NUMBER = "5511999999999";

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site e quero saber mais sobre os serviços da Hunter.AI";

export function buildWhatsAppLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

**Step 2:** Sanity-check the encoding manually. In a scratch file or the browser console, confirm `encodeURIComponent("Olá! Vim pelo site...")` produces a valid URL-safe string (accented characters and `!` get percent-encoded, spaces become `%20`). No automated test — see process note above.

**Step 3:** Commit:

```bash
git add lib/whatsapp.ts
git commit -m "feat: add WhatsApp link helper"
```

---

### Task 2: Reusable WhatsApp CTA button

**Files:**
- Create: `components/layout/whatsapp-cta.tsx`

**Step 1:** Build the CTA as a plain anchor styled like a button (no client state needed here — it's just a link):

```tsx
// components/layout/whatsapp-cta.tsx
import { buildWhatsAppLink } from "@/lib/whatsapp";

type WhatsAppCtaProps = {
  label?: string;
  className?: string;
};

export function WhatsAppCta({
  label = "Falar no WhatsApp",
  className = "",
}: WhatsAppCtaProps) {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-base ${className}`}
    >
      {label}
    </a>
  );
}
```

**Step 2:** Temporarily render `<WhatsAppCta />` in `app/page.tsx` to smoke-test it in isolation before wiring it into the header:

```tsx
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
// ...inside the returned JSX, anywhere temporary:
<WhatsAppCta />
```

Run `npm run dev`, open `localhost:3000`, confirm:
- Button renders with signal-green background, ink text, rounded-full shape.
- Clicking it opens a new tab to `https://wa.me/5511999999999?text=...` with the WhatsApp web/app prompt.
- On a mobile viewport (devtools responsive mode, e.g. 360px wide), the button doesn't overflow or wrap awkwardly.

**Step 3:** Remove the temporary render from `app/page.tsx` (keep the component file — it's wired into the header in Task 4).

**Step 4:** Commit:

```bash
git add components/layout/whatsapp-cta.tsx
git commit -m "feat: add reusable WhatsApp CTA button"
```

---

### Task 3: Site footer

**Files:**
- Create: `components/layout/site-footer.tsx`

**Step 1:** Build the minimal footer (server component, no "use client" needed):

```tsx
// components/layout/site-footer.tsx
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/symbol.svg" alt="" width={20} height={20} aria-hidden />
          <span className="font-display text-sm font-medium text-zinc-300">
            Hunter.AI
          </span>
        </div>
        <p className="font-body text-xs text-zinc-500">
          © 2026 Hunter.AI. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
```

**Step 2:** Temporarily render `<SiteFooter />` at the bottom of `app/page.tsx`'s returned JSX (below the existing hero section) to check it in isolation:

Run `npm run dev`, confirm:
- Footer sits below the hero content, dark ink background, subtle top border separating it.
- Mobile (< 640px): symbol + wordmark stacked above the copyright line, centered.
- Desktop (≥ 640px): symbol/wordmark on the left, copyright on the right, same row.

**Step 3:** Remove the temporary render from `app/page.tsx` (it moves into `app/layout.tsx` in Task 5).

**Step 4:** Commit:

```bash
git add components/layout/site-footer.tsx
git commit -m "feat: add site footer"
```

---

### Task 4: Sticky site header

**Files:**
- Create: `components/layout/site-header.tsx`

**Step 1:** Build the header as a client component tracking scroll position for the blur/background transition:

```tsx
// components/layout/site-header.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Image src="/logo.svg" alt="Hunter.AI" width={120} height={30} priority />
        <WhatsAppCta label="WhatsApp" className="sm:hidden" />
        <WhatsAppCta label="Falar no WhatsApp" className="hidden sm:inline-flex" />
      </div>
    </header>
  );
}
```

**Step 2:** Temporarily render `<SiteHeader />` at the top of `app/page.tsx`'s returned JSX to check it in isolation. Since the header is `fixed`, add `pt-20` (or similar) to the section below it temporarily so content isn't hidden underneath.

Run `npm run dev`, confirm:
- Header sits at the top, transparent background initially.
- Scrolling down past ~8px triggers `bg-ink/80` + blur.
- Logo renders at readable size; CTA button renders on the right.
- Mobile viewport (360px): logo doesn't overlap the CTA button; the compact "WhatsApp" label variant shows instead of "Falar no WhatsApp".
- No hydration warnings in the browser console (this is a client component using `window`, guarded by `useEffect`, so it should be safe — confirm no red errors on load).

**Step 3:** Remove the temporary render and the temporary `pt-20` from `app/page.tsx` (it moves into `app/layout.tsx` in Task 5).

**Step 4:** Commit:

```bash
git add components/layout/site-header.tsx
git commit -m "feat: add sticky site header"
```

---

### Task 5: Wire header + footer into the root layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx` (add top padding so content clears the fixed header)

**Step 1:** Import and render `SiteHeader` and `SiteFooter` around `{children}` in `app/layout.tsx`:

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
// ...existing font imports...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

**Step 2:** Since the header is `fixed`, `app/page.tsx`'s root section needs top padding so its content isn't hidden underneath on load. Add `pt-20` (adjust to match header's actual rendered height) to the existing hero `<section>` className in `app/page.tsx`.

**Step 3:** Run `npm run dev` and verify the full page:
- Header is fixed at top across the whole scroll range, footer sits at the bottom of the page (after the hero content, given there's only one section right now).
- No content is hidden behind the header on initial load.
- Resize the browser / use devtools responsive mode across a few breakpoints (360px, 768px, 1280px) — header and footer both reflow correctly, no horizontal scrollbar, no overlapping elements.
- Click the WhatsApp CTA in the header — confirm it opens the correct `wa.me` link with the prefilled message.

**Step 4:** Run a production build to catch SSR/hydration issues:

```bash
npm run build
```
Expected: build completes cleanly, no "window is not defined" or hydration mismatch errors.

**Step 5:** Commit:

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: wire site header and footer into root layout"
```

---

### Task 6: Final verification of Milestone 1

**Step 1:** Run through the full milestone acceptance bar from `docs/PLAN.md`:
- `npm run dev` — header/footer render correctly across breakpoints (mobile ~360px, tablet ~768px, desktop ~1280px+).
- WhatsApp link opens correctly (new tab, correct placeholder number, correct prefilled message) from both the compact mobile CTA and the full-label desktop CTA.
- No console errors or hydration warnings anywhere in the page.

**Step 2:** Run `npm run build` one final time to confirm a clean production build.

**Step 3:** Confirm with the user before replacing the placeholder WhatsApp number — this stays a TODO in `lib/whatsapp.ts` until the real number is provided (per the design doc).

---

## Out of scope for this milestone
- Nav anchor links (Serviços, Como funciona) — no sections to link to yet, revisit once Milestones 3/4 land.
- Real WhatsApp phone number — placeholder in `lib/whatsapp.ts` until provided.
- Hero copy, services, trust section, final CTA content — later milestones.
- Automated tests / test runner setup — deliberately deferred (confirmed with user).
