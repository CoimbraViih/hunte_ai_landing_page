# Milestone 4 — Trust/Credibility Section — Finalized Copy

Content spec for `components/sections/trust.tsx` (`id="como-funciona"`), ready to paste verbatim into JSX. Finalized through a `copywriting` pass (tighten for a concrete, plain-terms process a non-technical owner would trust) followed by a `copy-editing` pass (pt-BR grammar/punctuation, voice match against `components/sections/hero.tsx` and `components/sections/services.tsx`, no filler, no awkward wraps).

## Header block

| Field | Copy |
|---|---|
| Eyebrow | `03 — COMO FUNCIONA` |
| `h2` | `Rastrear, mirar, capturar — em três etapas` |
| Lede | `O instinto de caça que dá nome à marca organiza a entrega do seu projeto — da primeira conversa até o serviço no ar.` |

## Steps

### Step 01
- **Label:** `Rastrear`
- **Title:** `Mapeamos seu negócio`
- **Body:** `Entendemos seus produtos, seu tom de voz, suas dúvidas mais frequentes e onde você está perdendo mais venda — no atendimento, no site ou nos dois.`

### Step 02
- **Label:** `Mirar`
- **Title:** `Definimos o que faz mais sentido pro seu negócio`
- **Body:** `Agente de IA, site novo ou redesign de site — escolhemos o que resolve seu problema agora, não um pacote fechado.`

### Step 03
- **Label:** `Capturar`
- **Title:** `Vai ao ar — e você acompanha o resultado`
- **Body:** `Atendimento, presença digital e conversão funcionando de verdade, prontos para o dia a dia do seu negócio.`

## Rationale for changes from the design doc's working draft

- **Eyebrow uppercased** (`03 — COMO FUNCIONA` vs. the working draft's `03 — Como funciona`) to match the casing convention already shipped in Services' eyebrow (`02 — O QUE FAZEMOS`).
- **Lede tightened:** dropped the filler "mesmo" ("o mesmo instinto...") and swapped the colon for an em dash, matching the em-dash construction Hero and Services both already use in their ledes. Meaning is unchanged.
- **Step 02 title rewritten** from `Construímos a solução certa pro seu momento` to `Definimos o que faz mais sentido pro seu negócio`. The original read as generic, rephrased-feature-list language ("a solução certa" is vague marketing filler that could describe any product). The new version names the reader's business directly ("seu negócio"), consistent with how Hero and Services address the reader.
- **Step 02 body tightened:** dropped `sob medida pro seu processo` — "processo" is internal-agency language a non-technical owner wouldn't naturally use to describe their own business, and "sob medida" was doing no concrete work. Replaced with `não um pacote fechado`, a concrete contrast that tells the owner plainly what they're avoiding (a rigid bundled offer), reinforcing the "we adapt to you" promise without jargon.
- **Step 03 body tightened:** dropped `com o retorno mostrando o que está funcionando` — "retorno" was ambiguous (a report? feedback? return on investment?) and didn't survive the "so what" test. Replaced with `prontos para o dia a dia do seu negócio`, which is concrete and avoids duplicating the title's own promise (`você acompanha o resultado`), removing a redundancy the copy-editing pass flagged between the step's title and body.
- **Step 01 title/body, Step 03 title, and the `h2`** were confirmed already strong in both passes — no changes made. The `h2` intentionally keeps the `rastrear/mirar/capturar` hunting motif per the task brief, since it's the brand's namesake device and each step's label/title/body immediately grounds it in a concrete action.

## Constraint check

- No mention of "n8n" or any other automation-tool name anywhere in the copy above. The AI offering is described only as "agente de IA" / "agentes de IA," consistent with `docs/CLAUDE.md`.
