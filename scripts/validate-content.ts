/**
 * Content integrity validator.
 * Run: bun run validate
 *
 * Catches broken references that silently render empty UI:
 *  - era -> concept ids that do not exist
 *  - concept -> source ids that do not exist
 *  - chapter -> concept / source ids that do not exist
 *  - milestone -> source ids that do not exist
 *  - graph edges pointing at nodes that do not exist
 *  - duplicate ids anywhere
 */
import {
  eras,
  concepts,
  sources,
  chapters,
  flowcharts,
  graphNodes,
  graphEdges,
} from "../src/data/content";

type Problem = { kind: string; detail: string };

const problems: Problem[] = [];
const add = (kind: string, detail: string) => problems.push({ kind, detail });

const conceptIds = new Set(concepts.map((c) => c.id));
const sourceIds = new Set(sources.map((s) => s.id));
const nodeIds = new Set(graphNodes.map((n) => n.id));
const eraIds = new Set(eras.map((e) => e.id));

// ── duplicate ids ──────────────────────────────────────────────
function dupes(label: string, ids: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) add("duplicate-id", `${label}: "${id}"`);
    seen.add(id);
  }
}
dupes("concept", concepts.map((c) => c.id));
dupes("source", sources.map((s) => s.id));
dupes("era", eras.map((e) => e.id));
dupes("graphNode", graphNodes.map((n) => n.id));
dupes("chapter", chapters.map((c) => c.id));

// ── era -> concepts ─────────────────────────────────────────────
for (const era of eras) {
  for (const cid of era.concepts) {
    if (!conceptIds.has(cid)) {
      add("era->concept", `era "${era.id}" references missing concept "${cid}"`);
    }
  }
  era.milestones.forEach((m, i) => {
    for (const sid of m.sourceIds) {
      if (!sourceIds.has(sid)) {
        add("milestone->source", `era "${era.id}" milestone #${i} ("${m.title}") -> missing source "${sid}"`);
      }
    }
  });
}

// ── concept -> sources + field sanity ──────────────────────────
for (const c of concepts) {
  for (const sid of c.sources) {
    if (!sourceIds.has(sid)) {
      add("concept->source", `concept "${c.id}" -> missing source "${sid}"`);
    }
  }
  if (!eraIds.has(c.era)) add("concept->era", `concept "${c.id}" -> missing era "${c.era}"`);
  for (const field of ["simple", "deeper", "deepest"] as const) {
    const v = c[field];
    if (!v || v.trim().length < 40) {
      add("concept-field", `concept "${c.id}".${field} is empty or too short`);
    }
  }
  if (!c.tagline?.trim()) add("concept-field", `concept "${c.id}".tagline is empty`);
  if (!c.tags?.length) add("concept-field", `concept "${c.id}" has no tags`);
}

// ── chapters ───────────────────────────────────────────────────
for (const ch of chapters) {
  if (!eraIds.has(ch.era)) add("chapter->era", `chapter "${ch.id}" -> missing era "${ch.era}"`);
  for (const cid of ch.conceptIds) {
    if (!conceptIds.has(cid)) add("chapter->concept", `chapter "${ch.id}" -> missing concept "${cid}"`);
  }
  for (const sid of ch.sources) {
    if (!sourceIds.has(sid)) add("chapter->source", `chapter "${ch.id}" -> missing source "${sid}"`);
  }
  if (!ch.conceptIds.length) add("chapter-empty", `chapter "${ch.id}" has no concepts`);
}

// ── sources ────────────────────────────────────────────────────
const kinds = new Set(["paper", "video", "blog", "essay", "article", "book", "talk", "code"]);
for (const s of sources) {
  if (!kinds.has(s.kind)) add("source-kind", `source "${s.id}" has unknown kind "${s.kind}"`);
  if (!eraIds.has(s.era)) add("source->era", `source "${s.id}" -> missing era "${s.era}"`);
  if (!/^https?:\/\//.test(s.url)) add("source-url", `source "${s.id}" has non-absolute url "${s.url}"`);
  if (!s.description?.trim()) add("source-field", `source "${s.id}" has no description`);
}

// ── graph ──────────────────────────────────────────────────────
for (const e of graphEdges) {
  if (!nodeIds.has(e.source)) add("graph-edge", `edge source "${e.source}" missing`);
  if (!nodeIds.has(e.target)) add("graph-edge", `edge target "${e.target}" missing`);
}

// ── flowcharts ─────────────────────────────────────────────────
for (const fc of flowcharts) {
  const localIds = new Set(fc.nodes.map((n) => n.id));
  for (const e of fc.edges) {
    if (!localIds.has(e.from)) add("flowchart-edge", `${fc.id}: from "${e.from}" missing`);
    if (!localIds.has(e.to)) add("flowchart-edge", `${fc.id}: to "${e.to}" missing`);
  }
}

// ── reachability: every concept must be reachable from some era ─
const reachable = new Set(eras.flatMap((e) => e.concepts));
for (const c of concepts) {
  if (!reachable.has(c.id)) add("orphan-concept", `concept "${c.id}" is not linked to any era (unreachable in UI)`);
}

// ── report ─────────────────────────────────────────────────────
const videos = sources.filter((s) => s.kind === "video" || s.kind === "talk").length;

console.log("── content inventory ──");
console.log(`eras          ${eras.length}`);
console.log(`concepts      ${concepts.length}`);
console.log(`sources       ${sources.length}  (${videos} video/talk)`);
console.log(`chapters      ${chapters.length}`);
console.log(`flowcharts    ${flowcharts.length}`);
console.log(`graph nodes   ${graphNodes.length}`);
console.log(`graph edges   ${graphEdges.length}`);
console.log("");

if (problems.length === 0) {
  console.log("OK — no integrity problems found.");
  process.exit(0);
}

const byKind = new Map<string, string[]>();
for (const p of problems) {
  if (!byKind.has(p.kind)) byKind.set(p.kind, []);
  byKind.get(p.kind)!.push(p.detail);
}
console.log(`FAIL — ${problems.length} problem(s):`);
for (const [kind, details] of byKind) {
  console.log(`\n[${kind}] (${details.length})`);
  for (const d of details) console.log(`  - ${d}`);
}
process.exit(1);
