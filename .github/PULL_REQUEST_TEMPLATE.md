## What this PR does

<!-- One or two sentences. Link the issue it closes: Closes #123 -->

## Type

- [ ] Content (concept, source, era, chapter, flowchart, graph node/edge)
- [ ] Feature (new route, interaction, capability)
- [ ] Bug fix
- [ ] Design / UI
- [ ] Infrastructure (CI, deploy, tooling, docs)

## Checklist

- [ ] `bun run validate` passes — **required**, no dangling dataset references
- [ ] `bun run validate:svg` passes — if you added or changed any SVG
- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes with no new warnings
- [ ] `bun run test` passes
- [ ] `bun run build` passes

## For content changes

- [ ] New sources have absolute URLs and a one-line description
- [ ] New concepts have all **three** depths written (`simple`, `deeper`, `deepest`)
- [ ] New concepts are referenced by at least one era (orphans fail validation)
- [ ] New concept ids are unique and kebab-case
- [ ] I did **not** hand-edit generated files under `public/` or `docs/images/`
      (regenerate with `bun run assets`)

## Verification

<!-- Paste the relevant command output, e.g. the validate summary -->

```

```

## Notes for reviewers

<!-- Anything non-obvious: a judgement call, a trade-off, something I'd like checked. -->
