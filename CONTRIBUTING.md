# Contributing to AI Journey

Thanks for helping make AI's history easier to understand. This project is
small, static, and entirely open — a focused PR is genuinely easier to review
than a large one.

## The one rule that matters most

**This project's value is that its claims are traceable.** If you add or change
content, every claim should end up linked to a real source, and every reference
in the dataset must resolve.

There is an automated guard for this:

```bash
bun run validate
```

It walks every foreign key in `src/data/content.ts` — era → concept, concept →
source, chapter → concept/source, milestone → source, graph edge → node,
flowchart edge → node — and fails with a named report if anything dangles. It
also rejects **orphans**: a concept that no era references, because nothing
would ever render it.

> This validator found 8 real dangling references the first time it ran. If you
> add content and the site renders an empty section, this is why.

## Setup

```bash
bun install
bun run dev
```

## Before you open a PR

Everything must be green:

```bash
bun run verify   # validate → validate:svg → typecheck → lint → test → build
```

Individual gates:

| Command | Gate |
|---|---|
| `bun run validate` | Dataset referential integrity |
| `bun run validate:svg` | Every SVG is well-formed XML |
| `bun run typecheck` | TypeScript strict, no errors |
| `bun run lint` | ESLint, no errors or warnings |
| `bun run test` | Unit tests |
| `bun run build` | Production build succeeds |
| `bun run smoke` | Live server renders real content on every route (needs `bun run start` running) |

CI runs the same chain, then smoke-tests the production server.

## Adding content

All content lives in one file: `src/data/content.ts`. That is deliberate — the
value of this project is the *relationships* between facts, and keeping the
dataset in one module lets the validator prove it consistent in milliseconds.

**1. Add a source:**

```ts
{
  id: "your-source-id",           // unique, kebab-case
  kind: "paper",                  // paper|video|blog|essay|article|book|talk|code
  title: "Exact Title Of The Work",
  author: "Author et al.",
  year: 2024,
  url: "https://…",               // must be absolute
  description: "One sentence: what it is, and why it mattered.",
  era: "agents",                  // must match an existing era id
}
```

**2. Add a concept — all three depths, please:**

```ts
{
  id: "your-concept-id",
  name: "Your Concept",
  era: "agents",
  tagline: "One line that makes someone want to click.",
  simple:  "Plain English, with an analogy. No jargon. This is what a smart 15-year-old reads.",
  deeper:  "The mechanism, and why it beat whatever came before it.",
  deepest: "The formalism, the papers, the open debates, the failure modes.",
  year: 2024,
  sources: ["your-source-id"],
  tags: ["agents", "tools"],
}
```

**3. Wire it up** — add the id to an era's `concepts[]`, and/or a chapter's
`conceptIds[]`, and/or cite it from related concepts' `sources[]`.

**4. Verify.** `bun run validate` will name anything you missed.

### Style rules for writing

- **Simple** must be readable by someone who has never taken a CS course.
  Analogy over definition. No acronyms without expansion.
- **Deeper** explains *why*, not just *what*. What did it replace, and what
  problem did it solve that the previous approach couldn't?
- **Deepest** goes to the formalism and names the disagreements in the field.
  If a claim is contested, say so and say who's on which side.
- **No filler.** If you can't write something meaningfully deeper than the
  existing text, the concept may not need a third level yet.
- Prefer naming real papers over describing them vaguely.
- Keep the tone confident but not breathless. The two AI winters were real; say
  so. Don't oversell the current moment.

### Code style

- TypeScript **strict**, no `any` (use `LucideIcon`, `Source`, `Concept`, etc.).
- The React Compiler is enabled via `eslint-plugin-react-hooks` v6. Prefer plain
  derived values over manual `useMemo` — the compiler memoizes pure calls for
  you and rejects hand-rolled memoization it can't preserve.
- Put pure logic in `src/lib/` where it can be unit-tested directly, rather than
  inline in a component.
- Don't disable a lint rule to make CI pass. Fix the code.

### Generated files

`public/*.svg` (brand assets) and `docs/images/*.svg` (UI mockups) are
**generated**. Don't hand-edit them — change the generator and run:

```bash
bun run assets
```

## Commit messages

Conventional commits, one logical change per commit:

```
feat(content): add RLHF concept at three depths
fix(data): remove dangling era → bert-era reference
docs: add CI/CD diagram
chore: regenerate brand assets
```

## Good first issues

- **Deepen an existing concept.** Some entries have thinner `deepest` levels than
  others — enrich the weakest ones.
- **Add missing primary sources.** Several concepts cite only a survey. The
  original paper is almost always worth linking.
- **Expand the graph.** Nodes and edges are hand-placed; more labelled
  relationships between concepts would make the graph more useful.
- **Add a flowchart.** Six exist; training loop, Transformer, RLHF, agent loop,
  diffusion and RAG are covered. Contrastive learning, MoE routing, and
  speculative decoding are not.

## Reporting a factual error

Use the **Content correction** issue template. Include the corrected passage and
a source that supports it — that makes the fix fast to merge.

## Code of Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
