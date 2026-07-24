# Milestone 3 — Services Section — Content & SEO Spec

Finalized, verbatim copy and structured-data block for `components/sections/services.tsx` (Task 3 builds from this file — no code changes were made in this task, it is spec-only).

Produced with a real pass through four skills: `copywriting`, `copy-editing`, `schema`, `ai-seo`. See "Skill passes" below for what each one changed or confirmed.

---

## Finalized copy (verbatim, ready to paste into JSX)

**Eyebrow:**
```
02 — O QUE FAZEMOS
```

**Heading (`h2`):**
```
Três formas de parar de perder venda por atendimento e presença digital fracos
```

**Lede:**
```
A Hunter.AI cuida da parte técnica. Você recebe o resultado pronto — sem precisar entender de IA ou de código.
```

**Card 1 — Agentes de IA para atendimento**
- Title:
  ```
  Agentes de IA para atendimento
  ```
- Body:
  ```
  Um agente humanizado atende seus clientes pelo WhatsApp, Instagram ou site, qualifica cada conversa e já marca o horário na sua agenda — 24 horas por dia.
  ```

**Card 2 — Criação de site**
- Title:
  ```
  Criação de site
  ```
- Body:
  ```
  Sua empresa ainda não tem site? A gente cria uma presença digital profissional que passa credibilidade e traz o cliente até você.
  ```

**Card 3 — Redesign de site**
- Title:
  ```
  Redesign de site
  ```
- Body:
  ```
  Site que já existe, mas não converte? A gente reconstrói com foco em deixar o visitante virar cliente.
  ```

No occurrence of "n8n" or any automation-tool name anywhere above. The AI agent service is described only as a "agente humanizado" performing "atendimento" — never as a bot, chatbot, or automation product, consistent with `docs/CLAUDE.md`'s "agentes de IA humanizados para atendimento" framing.

---

## Changes from the design doc's working draft (rationale)

The working draft in `docs/plans/2026-07-23-milestone-3-services-section-design.md` was already close to final. Two small edits came out of the copy passes:

1. **Card 1 body** — removed the relative pronoun "que" (`"Um agente humanizado que atende..."` → `"Um agente humanizado atende..."`). Copy-editing principle: cut hedging/relative-clause filler for a more direct, active sentence — matches the hero's declarative style (`"Enquanto seu negócio demora..."`, no throat-clearing).
2. **Card 1 body** — replaced `"agenda direto na sua agenda"` with `"já marca o horário na sua agenda"`. The original repeated "agenda" as both verb and noun in the same clause, which reads as a typo/redundancy on a re-read aloud (copy-editing Sweep 1, clarity). The new phrasing keeps the same claim (the agent books the appointment) without the repetition, and "já" (a temporal marker meaning "already/right away") reinforces the same-day, no-back-and-forth outcome that the card is selling.
3. **Card 3 body** — added a comma before "mas" (`"Site que já existe, mas não converte?"`). Minor grammar correction; the original ran the two clauses together without a pause, which is a common pt-BR copy-editing catch for readability at speaking pace.

Eyebrow, heading, lede, and Card 2/3 titles/bodies are unchanged from the working draft — they already passed the copywriting and copy-editing sweeps (benefit-first, active voice, no filler, consistent tone with the hero, no automation-tool naming).

---

## Skill passes

### 1. `copywriting`
Checked all six copy blocks against outcome-focused, benefit-first principles (specificity over vagueness, active over passive, confident over qualified, show over tell). Card 2 and Card 3 already use the strongest pattern in the set — a rhetorical question naming the reader's exact situation ("Sua empresa ainda não tem site?" / "Site que já existe, mas não converte?") followed by the outcome, no feature-listing. Card 1 was the one card written as a "what it does" list (channels → qualifies → schedules) rather than a rhetorical hook; kept that shape deliberately because it needs to convey three concrete capabilities (channel coverage, qualification, scheduling) in one sentence for the AI-agent service — but tightened the wording (see rationale above) so it reads as a direct claim, not a spec sheet. No line reads generic/AI-flavored ("streamline," "leverage," "solução completa," etc. — none present).

### 2. `copy-editing`
Ran a clarity + voice/tone sweep against the hero's shipped copy. Confirmed tone consistency: dark, second-person-implicit, confident, no exclamation points, no corporate jargon, mirrors the hero's cadence of short declarative clauses joined by em dashes. Caught and fixed the "agenda...agenda" repetition in Card 1 and the missing comma before "mas" in Card 3 (both above). Verified every body copy string is a single sentence, short enough to read as 2–4 lines at a ~280px card width without an awkward orphan word wrap. Confirmed no automation-tool naming anywhere.

### 3. `schema`
Modeled the JSON-LD below as a single `@graph` with one `Organization` node (Hunter.AI, the `provider`) and three `Service` nodes referencing it. Each `Service.name` and `Service.description` is copied verbatim from the finalized card title/body above — no paraphrasing, so the structured data can never drift from the visible copy. `areaServed` is set to Brazil (`"BR"`), appropriate for a small/medium Brazilian business audience per `docs/CLAUDE.md`. Deliberately excluded: `aggregateRating`, `review`, `offers`/pricing — none of that data exists in the PRD, and inventing it would be fabricated structured data (a Rich Results Test / Search Console penalty risk, and simply dishonest). `provider.url` is a placeholder (`https://hunterai.com.br`) since no production domain is configured yet in `app/layout.tsx` (no `metadataBase` set) — **update this to the real domain before shipping the script tag**.

### 4. `ai-seo`
Reviewed the h2 + card titles for extractability against a query like "atendimento automatizado para pequenos negócios." Findings:
- The `h2` ("Três formas de parar de perder venda...") is a *reframe* line, not itself a literal service description — but it sits immediately above three `h3` card titles that **are** literal, extractable statements of what Hunter.AI offers ("Agentes de IA para atendimento," "Criação de site," "Redesign de site"). An answer engine parsing the section reads the heading + card titles + bodies as one contiguous block, so the reframe doesn't create a citation risk in practice — the literal statements are one DOM-level away, not buried in metaphor with no literal anchor nearby. **No structural change recommended.**
- Card 1's body ("Um agente humanizado atende seus clientes pelo WhatsApp, Instagram ou site, qualifica cada conversa e já marca o horário na sua agenda — 24 horas por dia.") is already a self-contained ~30-word answer block naming the channels, the qualification behavior, the scheduling behavior, and the 24/7 availability — this is the passage most likely to get pulled into an AI Overview or Perplexity answer for the target query, and it works standalone without needing the surrounding heading for context.
- The word "automatizado" itself is intentionally never used in card copy (page-wide, the brand voice frames this as "agente humanizado," not "automação/chatbot," per `docs/CLAUDE.md` and the brand reference's explicit contrast — "Chatbot decorado assusta mais do que ajuda"). This is fine for AI-SEO purposes: LLM-based answer engines match on semantic equivalence, not exact keyword strings, and "atende... 24 horas por dia" is the same claim as "atendimento automatizado" without the word that would undercut the humanized positioning. No copy change recommended to insert that term.
- Minor gap noted (not actioned, out of scope for this section/task): none of the services-section copy explicitly names the audience ("pequenas e médias empresas"), which appears in the page's `<meta name="description">` (`app/layout.tsx`) but not in on-page body copy anywhere yet. If a later milestone's content audit wants a stronger literal match to "pequenos negócios"-style queries, that's a candidate for the About/credibility section (Milestone 4), not a change to this already-tight card copy.

---

## JSON-LD structured-data block (verbatim, ready to paste into a `<script type="application/ld+json">` tag)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hunterai.com.br/#organization",
      "name": "Hunter.AI",
      "url": "https://hunterai.com.br",
      "description": "Agentes de IA humanizados, criação de sites e redesign de sites para pequenos e médios negócios no Brasil."
    },
    {
      "@type": "Service",
      "name": "Agentes de IA para atendimento",
      "description": "Um agente humanizado atende seus clientes pelo WhatsApp, Instagram ou site, qualifica cada conversa e já marca o horário na sua agenda — 24 horas por dia.",
      "provider": { "@id": "https://hunterai.com.br/#organization" },
      "areaServed": {
        "@type": "Country",
        "name": "Brazil"
      },
      "serviceType": "Atendimento ao cliente com agente de IA humanizado"
    },
    {
      "@type": "Service",
      "name": "Criação de site",
      "description": "Sua empresa ainda não tem site? A gente cria uma presença digital profissional que passa credibilidade e traz o cliente até você.",
      "provider": { "@id": "https://hunterai.com.br/#organization" },
      "areaServed": {
        "@type": "Country",
        "name": "Brazil"
      },
      "serviceType": "Criação de site institucional"
    },
    {
      "@type": "Service",
      "name": "Redesign de site",
      "description": "Site que já existe, mas não converte? A gente reconstrói com foco em deixar o visitante virar cliente.",
      "provider": { "@id": "https://hunterai.com.br/#organization" },
      "areaServed": {
        "@type": "Country",
        "name": "Brazil"
      },
      "serviceType": "Redesign e otimização de site existente"
    }
  ]
}
```

Notes for Task 3's implementation:
- No `aggregateRating`, `review`, `offers`, or `priceRange` fields — none of that data exists yet; do not add placeholder/fake values.
- `provider.url`/`@id` use a placeholder domain (`https://hunterai.com.br`) — replace with the real production domain before shipping (check Vercel project settings / `app/layout.tsx` `metadataBase` once configured).
- This block is designed to be embedded once on the page (e.g. rendered in `app/page.tsx` or within `Services`) via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />` — standard Next.js JSON-LD pattern, no new dependency needed.
