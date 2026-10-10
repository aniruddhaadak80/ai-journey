/**
 * Validates that every generated SVG is well-formed XML.
 * A single malformed SVG silently breaks an image in the README.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
      out.push(...walk(p));
    } else if (extname(p) === ".svg") {
      out.push(p);
    }
  }
  return out;
}

const files = [...walk(join(ROOT, "public")), ...walk(join(ROOT, "docs")), ...walk(join(ROOT, "src"))];

let failed = 0;
for (const f of files) {
  const text = readFileSync(f, "utf8");
  // Structural checks that catch the usual generation mistakes.
  const problems = [];
  if (!text.trimStart().startsWith("<?xml")) problems.push("missing XML declaration");
  if (!text.includes("<svg")) problems.push("missing <svg> root");
  if (!text.includes("</svg>")) problems.push("unclosed <svg>");

  // Balanced tag check for the elements we actually emit.
  for (const tag of ["defs", "g", "text", "rect", "linearGradient", "radialGradient", "pattern"]) {
    const open = (text.match(new RegExp(`<${tag}[\\s>]`, "g")) || []).length;
    const close = (text.match(new RegExp(`</${tag}>`, "g")) || []).length;
    const selfClosed = (text.match(new RegExp(`<${tag}[^>]*/>`, "g")) || []).length;
    if (open !== close + selfClosed) {
      problems.push(`<${tag}> unbalanced: ${open} open, ${close} close, ${selfClosed} self-closed`);
    }
  }

  // NaN / undefined leaking into geometry attributes.
  if (/(?:x|y|cx|cy|x1|y1|x2|y2|r|width|height)="(?:NaN|undefined|Infinity)"/.test(text)) {
    problems.push("contains NaN/undefined/Infinity in an attribute");
  }

  const rel = f.replace(ROOT + "\\", "").replace(/\//g, "/");
  if (problems.length) {
    failed++;
    console.log(`FAIL ${rel}`);
    for (const p of problems) console.log(`     - ${p}`);
  } else {
    console.log(`ok   ${rel}`);
  }
}

console.log("");
console.log(failed === 0 ? `OK — ${files.length} SVG files are well-formed.` : `FAIL — ${failed} SVG file(s) broken.`);
process.exit(failed === 0 ? 0 : 1);
