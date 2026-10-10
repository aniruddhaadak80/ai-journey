# Support

## Before opening an issue

Most questions are already answered by the repo itself:

| I want to… | Look at |
|---|---|
| Run it locally | [Quick start](README.md#-quick-start) |
| Understand the architecture | [Architecture](README.md#-architecture) |
| Add a concept or source | [Contributing content](CONTRIBUTING.md#contributing-content) |
| Understand the dataset | [`src/data/content.ts`](src/data/content.ts) |
| See all the diagrams | [`docs/diagrams/`](docs/diagrams/) |
| Understand the quality gates | [Quality gates](README.md#-quality-gates) |

## Troubleshooting

<details>
<summary><b>Port 3000 already in use</b></summary>

```bash
bun run dev --port 3001
```
</details>

<details>
<summary><b>"Compilation Skipped: Existing memoization could not be preserved"</b></summary>

The React Compiler (via `eslint-plugin-react-hooks` v6) rejects hand-rolled
`useMemo` it can't preserve. Remove the manual `useMemo` and let the compiler
memoize the pure call, or extract the logic into `src/lib/` as a pure function.
Do **not** disable the rule.
</details>

<details>
<summary><b>My content addition isn't showing up</b></summary>

Almost always a dangling reference. Run:

```bash
bun run validate
```

It will name the exact broken id. Remember a new concept must be referenced by
at least one era's `concepts[]` — orphans are treated as errors because nothing
would render them.
</details>

<details>
<summary><b>An image in the README is broken</b></summary>

```bash
bun run validate:svg
bun run assets
```
</details>

## Asking a question

Open a [GitHub Discussion](https://github.com/aniruddhaadak80/ai-journey/discussions)
or an issue. For factual corrections to the content specifically, use the
**Content correction** template — it routes faster because it asks for the
supporting source up front.

## Reporting a security issue

Do **not** open a public issue. See [SECURITY.md](SECURITY.md).
