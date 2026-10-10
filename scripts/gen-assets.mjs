#!/usr/bin/env node
/**
 * Deterministic brand-asset generator for AI Journey.
 *
 * Emits the logo, banner, social card, favicon set and SVG UI mockups into
 * ./public and ./docs/images. Re-runnable and deterministic — no design tool
 * required, and the repo stays diff-friendly because output is generated.
 *
 * Usage: bun scripts/gen-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const DOCS = join(ROOT, "docs", "images");

for (const d of [PUB, DOCS, join(PUB, "screenshots")]) {
  mkdirSync(d, { recursive: true });
}

const W = (s) => `<?xml version="1.0" encoding="UTF-8"?>\n${s.trim()}\n`;

/** Shared gradient + grid defs so every asset shares one visual language. */
const DEFS = `
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="52%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="60%" stop-color="#ec4899"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.18" cy="0.2" r="0.6">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.85" cy="0.85" r="0.6">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.035"/>
    </pattern>
  </defs>`;

/** The brand mark: an ascending neural path with nodes. */
const mark = (s, x, y, strokeW = 3.4) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 34 C 10 34, 12 16, 22 16 S 34 10, 42 6"
          fill="none" stroke="url(#brand)" stroke-width="${strokeW}" stroke-linecap="round"/>
    <circle cx="0" cy="34" r="4.4" fill="#22d3ee"/>
    <circle cx="22" cy="16" r="5.4" fill="#a855f7"/>
    <circle cx="42" cy="6" r="4" fill="#ec4899"/>
    <path d="M30 0 l2.4 6 L38 8.4 l-5.6 2.4 L30 16.8 l-2.4 -6 L22 8.4 l5.6 -2.4 Z" fill="#c4b5fd"/>
  </g>`;

/** Wordmark used next to the mark. */
const wordmark = (x, y, size = 30, sub = 13) => `
  <g transform="translate(${x} ${y})" font-family="'Segoe UI', Inter, system-ui, sans-serif">
    <text y="${size}" font-size="${size}" font-weight="700" fill="#ffffff" letter-spacing="-0.5">AI Journey</text>
    <text y="${size + sub + 6}" font-size="${sub}" fill="rgba(255,255,255,0.5)">The complete interactive history of AI</text>
  </g>`;

// ── 1. logo.svg ────────────────────────────────────────────────
writeFileSync(
  join(PUB, "logo.svg"),
  W(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  ${DEFS}
  <rect width="320" height="80" fill="#050508"/>
  ${mark(0.95, 18, 26)}
  ${wordmark(78, 26)}
</svg>`)
);

// ── 2. banner.svg (GitHub social, 1280x640) ─────────────────────
const eraChips = [
  ["The Dream", "#8b5cf6"],
  ["Birth", "#6366f1"],
  ["Golden Age", "#3b82f6"],
  ["AI Winters", "#64748b"],
  ["Expert Systems", "#10b981"],
  ["Quiet Revolution", "#f59e0b"],
  ["Deep Learning", "#ef4444"],
  ["Transformer", "#ec4899"],
  ["LLM Era", "#a855f7"],
  ["Agent Era", "#06b6d4"],
  ["Present & Beyond", "#22d3ee"],
]
  .map(([label, color], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const w = 40 + label.length * 10.5;
    const x = 80 + col * 292;
    const y = 400 + row * 62;
    return `<g transform="translate(${x} ${y})">
      <rect width="${w}" height="42" rx="21" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-opacity="0.4"/>
      <circle cx="24" cy="21" r="5" fill="${color}"/>
      <text x="40" y="26" font-family="'Segoe UI', Inter, sans-serif" font-size="15" fill="rgba(255,255,255,0.75)">${label}</text>
    </g>`;
  })
  .join("\n  ");

const statCards = [
  ["12", "Eras"],
  ["60", "Concepts"],
  ["96", "Sources"],
  ["11", "Chapters"],
  ["6", "Flowcharts"],
]
  .map(([v, l], i) => {
    const x = 80 + i * 228;
    return `<g transform="translate(${x} 500)">
      <rect width="206" height="88" rx="18" fill="#ffffff" fill-opacity="0.045" stroke="#ffffff" stroke-opacity="0.12"/>
      <text x="26" y="48" font-family="'Segoe UI', Inter, sans-serif" font-size="36" font-weight="800" fill="#22d3ee">${v}</text>
      <text x="26" y="72" font-family="'Segoe UI', Inter, sans-serif" font-size="15" fill="rgba(255,255,255,0.55)">${l}</text>
    </g>`;
  })
  .join("\n  ");

writeFileSync(
  join(PUB, "banner.svg"),
  W(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640" width="1280" height="640">
  ${DEFS}
  <rect width="1280" height="640" fill="#050508"/>
  <rect width="1280" height="640" fill="url(#glow1)"/>
  <rect width="1280" height="640" fill="url(#glow2)"/>
  <rect width="1280" height="640" fill="url(#grid)"/>

  ${mark(1.7, 84, 96, 4.2)}
  ${wordmark(210, 104, 44, 20)}

  <text x="80" y="290" font-family="'Segoe UI', Inter, sans-serif" font-size="76" font-weight="800" fill="#ffffff" letter-spacing="-2.5">From Turing's question to</text>
  <text x="80" y="368" font-family="'Segoe UI', Inter, sans-serif" font-size="76" font-weight="800" fill="url(#brand)" letter-spacing="-2.5">autonomous agents.</text>

  ${statCards}
  ${eraChips}
</svg>`)
);

// ── 3. og.svg (social card, 1200x630) ───────────────────────────
writeFileSync(
  join(PUB, "og.svg"),
  W(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${DEFS}
  <rect width="1200" height="630" fill="#050508"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  ${mark(1.4, 68, 74, 3.8)}
  ${wordmark(168, 84, 34, 15)}

  <text x="68" y="300" font-family="'Segoe UI', Inter, sans-serif" font-size="82" font-weight="800" fill="#ffffff" letter-spacing="-2.5">The Journey to AI</text>
  <text x="68" y="356" font-family="'Segoe UI', Inter, sans-serif" font-size="27" fill="rgba(255,255,255,0.6)">One interactive experience — timeline, knowledge graph, course,</text>
  <text x="68" y="394" font-family="'Segoe UI', Inter, sans-serif" font-size="27" fill="rgba(255,255,255,0.6)">flowcharts, and every source paper, video and essay linked.</text>

  ${["12 Eras", "60 Concepts", "96 Sources", "11 Chapters", "6 Flowcharts"]
    .map((t, i) => {
      const x = 68 + i * 220;
      const w = 40 + t.length * 10;
      return `<g transform="translate(${x} 460)">
        <rect width="${w}" height="46" rx="23" fill="url(#brand)" fill-opacity="0.14" stroke="#22d3ee" stroke-opacity="0.35"/>
        <text x="${w / 2}" y="30" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="16" fill="#cffafe">${t}</text>
      </g>`;
    })
    .join("\n  ")}

  <text x="68" y="576" font-family="'Segoe UI', Inter, sans-serif" font-size="19" fill="rgba(255,255,255,0.4)">1936 Turing Machine → 1956 Dartmouth → 2012 AlexNet → 2017 Transformer → 2025 Agents</text>
</svg>`)
);

// ── 4. favicon.svg ──────────────────────────────────────────────
writeFileSync(
  join(PUB, "favicon.svg"),
  W(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${DEFS}
  <rect width="64" height="64" rx="14" fill="#050508"/>
  ${mark(0.92, 10, 16, 3.2)}
</svg>`)
);

// ── 5. apple-touch-icon (180x180, no transparency) ─────────────
writeFileSync(
  join(PUB, "apple-touch-icon.svg"),
  W(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  ${DEFS}
  <rect width="180" height="180" rx="40" fill="#050508"/>
  ${mark(2.1, 30, 52, 5)}
</svg>`)
);

console.log("assets written:");
for (const f of ["logo.svg", "banner.svg", "og.svg", "favicon.svg", "apple-touch-icon.svg"]) {
  console.log("  public/" + f);
}
