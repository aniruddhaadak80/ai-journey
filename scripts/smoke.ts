/**
 * Smoke-tests the running production server by asserting that each route
 * actually renders real content in its server-rendered HTML.
 *
 * Guards against the classic failure mode where a page returns 200 but an
 * expandable section is empty because a data reference is broken.
 *
 * Run with the prod server up:  bun run scripts/smoke.ts
 */
export {}; // mark as a module so top-level await is legal under TS

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

type Check = { label: string; pass: boolean; detail: string };

const checks: Check[] = [];
function expect(label: string, haystack: string, needles: string[]) {
  const missing = needles.filter((n) => !haystack.includes(n));
  checks.push({
    label,
    pass: missing.length === 0,
    detail: missing.length ? `missing: ${missing.join(", ")}` : `${needles.length} assertion(s) ok`,
  });
}

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`);
  const text = await res.text();
  return { status: res.status, text, type: res.headers.get("content-type") ?? "" };
}

const results: { path: string; status: number; ok: boolean; note: string }[] = [];

async function route(path: string, needles: string[], label: string) {
  try {
    const { status, text } = await get(path);
    expect(label, text, needles);
    results.push({ path, status, ok: status === 200, note: `${needles.length} content checks` });
  } catch (e) {
    checks.push({ label, pass: false, detail: `request failed: ${(e as Error).message}` });
    results.push({ path, status: 0, ok: false, note: "request failed" });
  }
}

// ── Home ───────────────────────────────────────────────────────
await route(
  "/",
  [
    "The Journey",
    "to AI",
    "Interactive Timeline",
    "Knowledge Graph",
    "Structured Course",
    "Visual Flowcharts",
    "Source Library",
    "12 Eras",
    // Derived from the data layer: must match the timeline era names exactly.
    "First AI Winter",
    "Second AI Winter",
    "Turing",
  ],
  "home"
);

// ── Timeline ───────────────────────────────────────────────────
// The interactive body streams inside Suspense (deep links need
// useSearchParams), so the prerender is a shell: brand, metadata, the
// streaming boundary. Full text lives in the glossary + course instead.
await route(
  "/timeline",
  [
    "AI Journey", // navbar brand in the shell
    'property="og:title"',
    "<template", // Suspense streaming boundary marker
  ],
  "timeline"
);

// ── Course ─────────────────────────────────────────────────────
// Only SSR-visible content is asserted; chapter bodies render on click.
await route(
  "/course",
  [
    "What is Intelligence?",
    "The Birth of AI",
    "The Transformer Era",
    "The Present &amp; Beyond",
    "Progress",
  ],
  "course"
);

// ── Graph ──────────────────────────────────────────────────────
// The heading is split across elements in SSR, so assert its parts.
await route(
  "/graph",
  ["Knowledge Graph", "Legend", "Concept", "Person", "Drag to pan"],
  "graph"
);

// ── Flowcharts ─────────────────────────────────────────────────
await route(
  "/flowcharts",
  [
    "How a Neural Network Learns",
    "Transformer Architecture",
    "RLHF Training Pipeline",
    "AI Agent Loop",
    "Diffusion Generation",
    "RAG Pipeline",
  ],
  "flowcharts"
);

// ── Sources ────────────────────────────────────────────────────
// Same streaming architecture as the timeline (?q= seeds the search box).
await route(
  "/sources",
  ["AI Journey", 'property="og:title"', "<template"],
  "sources"
);

// ── Glossary ───────────────────────────────────────────────────
await route(
  "/glossary",
  ["Glossary", "Filter 60 terms", "Simple", "Deeper", "Deepest", "Sources"],
  "glossary"
);

// ── People ─────────────────────────────────────────────────────
await route(
  "/people",
  [
    "People",
    "Alan Turing",
    "Geoffrey Hinton",
    "Ashish Vaswani",
    "Signature contributions",
    "Chronological",
  ],
  "people"
);

// ── Map ─────────────────────────────────────────────────────
await route(
  "/map",
  [
    "AI on the Map",
    "Cambridge, UK", // first map pin
    "Dartmouth, NH, USA", // the 1956 milestone
    "All eras",
    "Open in timeline",
    "Equirectangular",
  ],
  "map"
);

// ── Compare ─────────────────────────────────────────────────
await route(
  "/compare",
  ["Concept Comparison", "Transformer", "Attention", "Depth levels", "vs"],
  "compare"
);

{
  const home = await get("/");
  checks.push({
    label: "seo: canonical + og + twitter on home",
    pass:
      home.text.includes('rel="canonical"') &&
      home.text.includes('property="og:title"') &&
      home.text.includes('name="twitter:card"') &&
      home.text.includes('rel="icon"'),
    detail: "metadata tags present",
  });

  const robots = await get("/robots.txt");
  checks.push({
    label: "robots.txt",
    pass: robots.status === 200 && robots.text.includes("Sitemap:"),
    detail: robots.text.trim().split("\n")[0],
  });

  const sitemap = await get("/sitemap.xml");
  checks.push({
    label: "sitemap.xml lists all 8 routes",
    pass:
      sitemap.status === 200 &&
      ["/timeline", "/course", "/graph", "/flowcharts", "/sources", "/glossary", "/people"].every(
        (p) => sitemap.text.includes(p)
      ),
    detail: `${(sitemap.text.match(/<url>/g) ?? []).length} urls`,
  });

  const og = await get("/opengraph-image");
  checks.push({
    label: "opengraph-image is a PNG",
    pass: og.status === 200 && og.type.includes("image/png"),
    detail: og.type,
  });

  const icon = await get("/icon.svg");
  checks.push({
    label: "icon.svg served as svg",
    pass: icon.status === 200 && icon.text.includes("<svg"),
    detail: icon.type,
  });

  // Deep links — the command palette and cross-links depend on these.
  for (const [path, label] of [
    ["/timeline?concept=transformer", "timeline deep link (?concept=)"],
    ["/timeline?era=agents", "timeline deep link (?era=)"],
    ["/sources?q=attention", "sources deep link (?q=)"],
  ] as const) {
    const r = await get(path);
    checks.push({
      label,
      pass: r.status === 200,
      detail: `${path} → ${r.status}`,
    });
  }
}

// ── report ─────────────────────────────────────────────────────
console.log("── route status ──");
for (const r of results) {
  console.log(`${r.ok ? "ok  " : "FAIL"} ${r.path.padEnd(14)} ${r.status}  (${r.note})`);
}

console.log("\n── content assertions ──");
let failed = 0;
for (const c of checks) {
  if (!c.pass) failed++;
  console.log(`${c.pass ? "ok  " : "FAIL"} ${c.label.padEnd(38)} ${c.detail}`);
}

console.log("");
if (failed === 0) {
  console.log(`OK — ${checks.length} assertions passed across ${results.length} routes.`);
  process.exit(0);
}
console.log(`FAIL — ${failed}/${checks.length} assertions failed.`);
process.exit(1);
