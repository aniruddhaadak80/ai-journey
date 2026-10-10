/**
 * Pre-commit secret scan — runs as part of `bun run verify`.
 *
 * Catches the credentials that would be catastrophic to push to a public repo.
 * Patterns cover GitHub, OpenAI, Anthropic, AWS, Slack, Stripe, private keys,
 * and generic "password/secret = <literal>" assignments.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", ".vercel", "dist"]);

const PATTERNS = [
  { name: "OpenAI key", re: /sk-[A-Za-z0-9_-]{20,}/g },
  { name: "Anthropic key", re: /sk-ant-[A-Za-z0-9_-]{20,}/g },
  { name: "GitHub PAT", re: /ghp_[A-Za-z0-9]{30,}/g },
  { name: "GitHub fine-grained PAT", re: /github_pat_[A-Za-z0-9_]{50,}/g },
  { name: "AWS access key", re: /AKIA[0-9A-Z]{16}/g },
  { name: "Slack token", re: /xox[baprs]-[A-Za-z0-9-]{10,}/g },
  { name: "Stripe key", re: /(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{20,}/g },
  { name: "Google API key", re: /AIza[0-9A-Za-z_-]{35}/g },
  { name: "Private key block", re: /-----BEGIN (?:RSA |OPENSSH |EC |PGP )?PRIVATE KEY-----/g },
  {
    name: "Hardcoded password/secret assignment",
    re: /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token)\b\s*[:=]\s*["'][^"'\s]{8,}["']/gi,
  },
];

const SCANNABLE = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json",
  ".yml", ".yaml", ".md", ".svg", ".css", ".env", ".example", ".toml",
]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (SCANNABLE.has(extname(p))) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const findings = [];

for (const file of files) {
  // .env.example is a template and must stay free of real values too, but it
  // legitimately contains the *names* of variables, which is fine.
  const text = readFileSync(file, "utf8");
  const rel = relative(ROOT, file).replace(/\\/g, "/");

  for (const { name, re } of PATTERNS) {
    // Skip matches that are clearly placeholders in docs/templates.
    const matches = text.match(re) ?? [];
    for (const m of matches) {
      const isPlaceholder =
        /example|your-|xxx|placeholder|<|\$\{|\.\.\.|redacted|changeme/i.test(m) ||
        rel === ".env.example" || rel.endsWith("SECURITY.md");
      if (!isPlaceholder) findings.push({ rel, name, sample: m.slice(0, 12) + "…" });
    }
  }
}

console.log(`scanned ${files.length} text files for secrets`);
if (findings.length === 0) {
  console.log("OK — no secrets detected.");
  process.exit(0);
}
console.log(`\nFAIL — ${findings.length} potential secret(s):`);
for (const f of findings) console.log(`  - ${f.rel}: ${f.name} (${f.sample})`);
process.exit(1);
