/**
 * Lightweight structural sanity check for the .mmd diagram sources.
 *
 * This is not a full Mermaid parser — it catches the failure modes that
 * actually break rendering on GitHub: unbalanced subgraph/end blocks,
 * unclosed brackets, edges pointing at undefined nodes, and quadrant charts
 * missing their four quadrant declarations.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "diagrams");
const files = readdirSync(DIR).filter((f) => f.endsWith(".mmd")).sort();

let failed = 0;

for (const file of files) {
  const raw = readFileSync(join(DIR, file), "utf8");
  const problems = [];
  let code = raw
    .split("\n")
    .filter((l) => !l.trim().startsWith("%%"))
    .join("\n");

  // Diagram types
  const isEr = /^\s*erDiagram/m.test(code);
  const isState = /^\s*stateDiagram/m.test(code);
  const isSeq = /^\s*sequenceDiagram/m.test(code);

  // ER cardinality tokens contain literal braces (||--o{, }o--||). Strip them
  // before bracket counting, otherwise every ER diagram reads as unbalanced.
  if (isEr) {
    code = code.replace(/\|\||\}o|o\{|\|\|--o\{|o\{--\|\|/g, (m) => m.replace(/[{}]/g, ""));
  }

  // 1. Balanced brackets / braces / parens
  const pairs = [
    ["[", "]"],
    ["{", "}"],
    ["(", ")"],
  ];
  for (const [open, close] of pairs) {
    const o = (code.match(new RegExp(`\\${open}`, "g")) || []).length;
    const c = (code.match(new RegExp(`\\${close}`, "g")) || []).length;
    if (o !== c) problems.push(`unbalanced ${open}${close}: ${o} open vs ${c} close`);
  }

  // 2. Block balance — subgraph plus the sequence/state block keywords.
  const openers = code.match(
    /^\s*(?:subgraph|alt|opt|loop|par|critical|rect|state\s+\w+\s*\{|note\s+\w+\s+\w+)\b/gm
  );
  const opens =
    (code.match(/^\s*subgraph\b/gm) || []).length +
    (isSeq ? (code.match(/^\s*(?:alt|opt|loop|par|critical)\b/gm) || []).length : 0);
  const ends = (code.match(/^\s*end\s*$/gm) || []).length;
  if (opens !== ends) {
    problems.push(`block/end mismatch: ${opens} opener(s) vs ${ends} end`);
  }
  void openers;

  // 3. Edge references must resolve to a declared node id (flowcharts only —
  //    ER and state diagrams have their own resolution rules).
  if (!isEr && !isState && !isSeq) {
    const declared = new Set();
    for (const m of code.matchAll(/^\s*([A-Za-z][A-Za-z0-9_]*)\s*[\[\({]/gm)) declared.add(m[1]);
    for (const m of code.matchAll(/\b([A-Za-z][A-Za-z0-9_]*)\s*(\[[^\]]*\]|\{[^\}]*\}|\([^\)]*\))/g))
      declared.add(m[1]);
    for (const line of code.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("%%")) continue;
      const edge = t.match(
        /^([A-Za-z][A-Za-z0-9_]*)\s*(?:-->|---)\s*(?:\|[^|]*\|\s*)?([A-Za-z][A-Za-z0-9_]*)/
      );
      if (edge) {
        for (const id of [edge[1], edge[2]]) {
          if (!declared.has(id)) problems.push(`edge references undeclared node "${id}"`);
        }
      }
    }
  }

  // 3b. stateDiagram: every transition endpoint should be a known state.
  if (isState) {
    const states = new Set(["[*]"]);
    for (const m of code.matchAll(/^\s*state\s+([A-Za-z][A-Za-z0-9_]*)/gm)) states.add(m[1]);
    for (const line of code.split("\n")) {
      const t = line.trim();
      const tr = t.match(/^([A-Za-z][A-Za-z0-9_]*|\[\*\])\s*-->\s*([A-Za-z][A-Za-z0-9_]*|\[\*\])/);
      if (tr) {
        states.add(tr[1] === "[*]" ? "[*]" : tr[1]);
        states.add(tr[2] === "[*]" ? "[*]" : tr[2]);
      }
    }
    for (const line of code.split("\n")) {
      const t = line.trim();
      const tr = t.match(/^([A-Za-z][A-Za-z0-9_]*|\[\*\])\s*-->\s*([A-Za-z][A-Za-z0-9_]*|\[\*\])/);
      if (!tr) continue;
      for (const id of [tr[1], tr[2]]) {
        if (!states.has(id)) problems.push(`transition references undeclared state "${id}"`);
      }
    }
  }

  // 4. quadrantChart must declare exactly 4 quadrants
  if (/^\s*quadrantChart/m.test(code)) {
    const q = (code.match(/^\s*quadrant-\d/gm) || []).length;
    if (q !== 4) problems.push(`quadrantChart declares ${q} quadrants, expected 4`);
    if (!/x-axis/.test(code)) problems.push("quadrantChart missing x-axis");
    if (!/y-axis/.test(code)) problems.push("quadrantChart missing y-axis");
  }

  // 5. Diagram type must be recognised
  const types = [
    "flowchart", "graph ", "sequenceDiagram", "stateDiagram", "erDiagram",
    "gitGraph", "gantt", "mindmap", "classDiagram", "quadrantChart",
  ];
  if (!types.some((t) => new RegExp(`^\\s*${t}`, "m").test(code))) {
    problems.push("no recognised diagram declaration found");
  }

  if (problems.length) {
    failed++;
    console.log(`FAIL ${file}`);
    for (const p of problems) console.log(`     - ${p}`);
  } else {
    console.log(`ok   ${file}`);
  }
}

console.log("");
console.log(
  failed === 0
    ? `OK — ${files.length} mermaid diagrams look structurally sound.`
    : `FAIL — ${failed} diagram(s) have problems.`
);
process.exit(failed === 0 ? 0 : 1);
