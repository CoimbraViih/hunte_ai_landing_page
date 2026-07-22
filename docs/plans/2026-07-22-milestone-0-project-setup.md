# Milestone 0 — Project Setup Implementation Plan

**Goal:** Scaffold the Next.js + TypeScript + Tailwind + shadcn/ui project with the Hunter.AI brand theme (fonts, colors) and brand assets in place, verified running locally.

**Architecture:** Single Next.js App Router project at the repo root (no monorepo needed for a static landing page). Tailwind theme tokens and next/font are configured once in Milestone 0 so every later milestone can consume them directly.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, next/font (Space Grotesk, Manrope, JetBrains Mono), Three.js + React Three Fiber + drei (cinematic/particle visuals), framer-motion (camera-like transitions), deployed later to Vercel.

**Note on process:** This milestone is infrastructure scaffolding, not application logic — there's no unit under test yet, so steps use "run the command → verify the expected output/render" instead of a red/green TDD loop. TDD applies starting Milestone 1+ where there's actual component behavior to assert on.

**Note on visual direction:** The user wants an immersive, sci-fi-inspired feel (floating holographic glass cards, particle simulations, cinematic transitions) — but adapted to stay inside the brand system already defined in `docs/CLAUDE.md`: ink `#0A0F0D` background, signal green `#2EE6A0` and amber `#FFB23E` as the only accent colors (no arbitrary neon gradients), Space Grotesk/Manrope/JetBrains Mono typography, and an institutional/lean structure (not a literal gaming/movie-intro site). Concretely this means: a WebGL particle field in the brand colors behind the hero, glassmorphism cards (`backdrop-blur` + translucent ink background + signal-green glow border) for content sections, and framer-motion scroll/section transitions — all layered on top of, not replacing, the existing content structure in `docs/PLAN.md`.

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: project root files via `create-next-app` (`package.json`, `tsconfig.json`, `next.config.ts`, `app/`, etc.)

**Step 1:** Run the scaffold command from the repo root:
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*"
```
When prompted, accept defaults consistent with the flags above. Since the directory already has `PRD.md`, `docs/`, `brand/`, `.claude/`, confirm "yes" to scaffold into a non-empty directory if asked.

**Step 2:** Verify install succeeded:
```bash
npm run dev
```
Expected: dev server starts on `localhost:3000`, default Next.js starter page loads in the browser.

**Step 3:** Stop the dev server (Ctrl+C). Confirm `package.json`, `tailwind.config.ts` (or `.js`), `app/layout.tsx`, `app/page.tsx`, `app/globals.css` exist.

---

### Task 2: Install and configure shadcn/ui

**Files:**
- Modify: `components.json` (created by init)
- Modify: `app/globals.css` (CSS variables injected by init)
- Create: `lib/utils.ts`

**Step 1:** Run shadcn/ui init:
```bash
npx shadcn@latest init
```
Choose: TypeScript = yes, style = default (or "New York" if asked — either is fine, will be themed anyway), base color = neutral (will override with brand tokens next), CSS variables = yes.

**Step 2:** Verify by adding one test component:
```bash
npx shadcn@latest add button
```
Expected: `components/ui/button.tsx` is created with no errors.

**Step 3:** Temporarily drop the button into `app/page.tsx` to sanity-check it renders, then run `npm run dev` and confirm the button shows up styled. Remove the test usage afterward (keep the component file — it'll be needed for the CTA in Milestone 1).

---

### Task 3: Configure fonts (Space Grotesk, Manrope, JetBrains Mono)

**Files:**
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`

**Step 1:** In `app/layout.tsx`, import the three fonts via `next/font/google` and expose them as CSS variables:
```tsx
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```
Apply the variables to the `<html>` or `<body>` className:
```tsx
<html lang="pt-BR" className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
  <body className="font-body">{children}</body>
</html>
```

**Step 2:** In `tailwind.config.ts`, map the CSS variables to Tailwind font families:
```ts
theme: {
  extend: {
    fontFamily: {
      display: ["var(--font-display)"],
      body: ["var(--font-body)"],
      mono: ["var(--font-mono)"],
    },
  },
},
```

**Step 3:** Verify: in `app/page.tsx`, add a heading with `className="font-display"` and a paragraph with `className="font-body"`. Run `npm run dev`, inspect in browser devtools that computed `font-family` resolves to Space Grotesk / Manrope respectively.

---

### Task 4: Configure Tailwind theme tokens (brand colors)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css` (if using CSS variables for shadcn compatibility)

**Step 1:** Add brand colors to the Tailwind theme:
```ts
theme: {
  extend: {
    colors: {
      ink: "#0A0F0D",
      signal: "#2EE6A0",
      amber: "#FFB23E",
    },
  },
},
```
Keep these alongside (not replacing) the shadcn CSS-variable-based color tokens already injected in Task 2 — shadcn components (button, etc.) rely on `--background`, `--primary`, etc. Use `ink`/`signal`/`amber` for custom brand-specific elements (hero, CTA, section backgrounds); leave shadcn's semantic tokens alone unless a later milestone asks to re-theme them.

**Step 2:** Verify: in `app/page.tsx`, set the page background to `bg-ink` and a text/button element to `text-signal` or `bg-amber`. Run `npm run dev`, confirm the dark ink background (`#0A0F0D`) and accent colors render correctly.

---

### Task 5: Import brand assets into `public/`

**Files:**
- Create: `public/logo.svg` (copy of `brand/hunter-ai-logo.svg`)
- Create: `public/symbol.svg` (copy of `brand/hunter-ai-symbol.svg`)

**Step 1:** Copy the two relevant brand SVGs (the project is "Hunter.AI", so use the `hunter-ai-*` files, not the `adhunter-*` ones):
```bash
cp "brand/hunter-ai-logo.svg" "public/logo.svg"
cp "brand/hunter-ai-symbol.svg" "public/symbol.svg"
```

**Step 2:** Verify: reference `/logo.svg` via Next.js `<Image>` in `app/page.tsx` temporarily (e.g., `<Image src="/logo.svg" alt="Hunter.AI" width={120} height={40} />`), run `npm run dev`, confirm it renders. This is just a smoke test — the real header placement happens in Milestone 1.

---

### Task 6: Install and smoke-test the cinematic/particle visual stack (Three.js)

**Files:**
- Modify: `package.json` (new dependencies)
- Create: `components/visuals/particle-field.tsx`
- Modify: `app/page.tsx` (temporary smoke test only)

**Step 1:** Install the 3D/motion libraries:
```bash
npm install three @react-three/fiber @react-three/drei framer-motion
npm install -D @types/three
```

**Step 2:** Create a minimal client-side particle background component. This must be a `"use client"` component — `@react-three/fiber`'s `Canvas` cannot render on the server:
```tsx
// components/visuals/particle-field.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Points() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#2EE6A0" size={0.02} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Points />
      </Canvas>
    </div>
  );
}
```
This is deliberately minimal (a rotating point cloud in signal-green) — it proves the WebGL pipeline works end-to-end. The real hero-scene composition (camera moves, holographic layers) is Milestone 2's job, not Milestone 0's.

**Step 3:** Smoke-test by temporarily rendering `<ParticleField />` inside a `relative` wrapper in `app/page.tsx`. Run:
```bash
npm run dev
```
Expected: no console/hydration errors, a field of small green points renders and slowly rotates over the ink background.

**Step 4:** Run a production build to confirm the client-only Three.js code doesn't break SSR:
```bash
npm run build
```
Expected: build completes with no errors (watch specifically for "window is not defined" or hydration mismatch errors — if these appear, confirm the component has `"use client"` at the top and isn't imported into a server component that tries to use it directly without it being marked client-side).

**Step 5:** Remove the temporary render from `app/page.tsx` (keep the component file — Milestone 2 wires it into the real hero).

---

### Task 7: Final verification of Milestone 0

**Step 1:** Clean up any temporary test markup added in Tasks 2, 3, 4, 5, 6 from `app/page.tsx`, leaving a minimal blank page that still demonstrates the theme (dark background, brand font headline, logo, particle field) since that's the milestone's actual acceptance bar.

**Step 2:** Run:
```bash
npm run dev
```
Expected: no console errors, page loads at `localhost:3000` with:
- Ink-colored (`#0A0F0D`) background
- Text rendered in Space Grotesk (headings) / Manrope (body)
- Hunter.AI logo/symbol visible
- shadcn/ui button component available (proven in Task 2, doesn't need to stay visible)
- Signal-green particle field rendering via Three.js (proven in Task 6, doesn't need to stay visible on the blank page)

**Step 3:** Run a production build to catch config errors early:
```bash
npm run build
```
Expected: build completes with no errors.

**Step 4 (optional but recommended):** Initialize git if not already a repo, and commit:
```bash
git init
git add .
git commit -m "chore: milestone 0 - project setup (Next.js, Tailwind, shadcn/ui, fonts, brand theme)"
```
Note: the working directory is currently not a git repo — confirm with the user before running `git init`.

---

## Out of scope for this milestone
- Header/footer/nav layout → Milestone 1
- Hero copy/content → Milestone 2
- WhatsApp CTA wiring → Milestone 1
- Any Supabase/Resend setup → explicitly out of scope per `docs/CLAUDE.md`
