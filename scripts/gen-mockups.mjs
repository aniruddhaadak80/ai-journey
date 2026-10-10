#!/usr/bin/env node
/**
 * SVG mockups for each route — used in the README and docs.
 *
 * These are hand-authored *wireframe-fidelity* mockups (not pixel screenshots),
 * drawn from the real component structure so they stay honest as the UI evolves.
 * Kept as SVG so they diff cleanly and never bloat the repo.
 *
 * Usage: bun scripts/gen-mockups.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "docs", "images");
mkdirSync(OUT, { recursive: true });

const W = (s) => `<?xml version="1.0" encoding="UTF-8"?>\n${s.trim()}\n`;

const DEFS = `
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee"/><stop offset="52%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.03"/>
    </pattern>
    <radialGradient id="g1" cx="0.2" cy="0.15" r="0.7">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.16"/><stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="0.85" cy="0.9" r="0.7">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.16"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>`;

const VB = 1200;
const VH = 750;

/** Browser chrome wrapper so each mockup reads as a page. */
const chrome = (title, inner) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${VH}" width="${VB}" height="${VH}" font-family="'Segoe UI', Inter, system-ui, sans-serif">
  ${DEFS}
  <rect width="${VB}" height="${VH}" fill="#050508"/>
  <rect width="${VB}" height="${VH}" fill="url(#grid)"/>
  <rect width="${VB}" height="${VH}" fill="url(#g1)"/>
  <rect width="${VB}" height="${VH}" fill="url(#g2)"/>

  <!-- top bar -->
  <rect x="0" y="0" width="${VB}" height="56" fill="#08080f" fill-opacity="0.92"/>
  <circle cx="30" cy="28" r="7" fill="#ef4444"/>
  <circle cx="52" cy="28" r="7" fill="#f59e0b"/>
  <circle cx="74" cy="28" r="7" fill="#22c55e"/>
  <rect x="300" y="16" width="600" height="24" rx="12" fill="#ffffff" fill-opacity="0.05"/>
  <text x="330" y="33" font-size="12" fill="rgba(255,255,255,0.35)">${title}</text>

  <!-- site nav -->
  <rect x="0" y="56" width="${VB}" height="52" fill="#08080f" fill-opacity="0.7"/>
  <rect x="28" y="70" width="22" height="22" rx="7" fill="url(#brand)"/>
  <text x="60" y="87" font-size="15" font-weight="700" fill="#ffffff">AI Journey</text>
  ${["Timeline", "Graph", "Course", "Flowcharts", "Sources"]
    .map((t, i) => {
      const active = t === title;
      return `<text x="${560 + i * 116}" y="87" font-size="13" fill="${active ? "#22d3ee" : "rgba(255,255,255,0.4)"}">${t}</text>`;
    })
    .join("\n  ")}
  <line x1="0" y1="108" x2="${VB}" y2="108" stroke="#ffffff" stroke-opacity="0.08"/>

  ${inner}
</svg>`;

const card = (x, y, w, h, r = 14, op = 0.045) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#ffffff" fill-opacity="${op}" stroke="#ffffff" stroke-opacity="0.1"/>`;

const bar = (x, y, w, h = 9, op = 0.14, fill = "#ffffff") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" fill-opacity="${op}"/>`;

const dot = (x, y, r, color, op = 1) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" fill-opacity="${op}"/>`;

// ── 1. home ─────────────────────────────────────────────────────
const home = `
  <g>
    <rect x="440" y="150" width="320" height="30" rx="15" fill="url(#brand)" fill-opacity="0.14" stroke="#22d3ee" stroke-opacity="0.3"/>
    <text x="600" y="170" text-anchor="middle" font-size="12" fill="#67e8f9">The Complete Interactive History of AI</text>

    <text x="600" y="268" text-anchor="middle" font-size="66" font-weight="800" fill="#ffffff" letter-spacing="-2">The Journey</text>
    <text x="600" y="336" text-anchor="middle" font-size="66" font-weight="800" fill="url(#brand)" letter-spacing="-2">to AI</text>

    <text x="600" y="384" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.45)">From Turing's dream in 1936 to autonomous agents in 2026</text>

    <rect x="470" y="412" width="150" height="42" rx="12" fill="url(#brand)"/>
    <text x="545" y="438" text-anchor="middle" font-size="14" font-weight="600" fill="#050508">Start the Journey</text>
    <rect x="636" y="412" width="130" height="42" rx="12" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.15"/>
    <text x="701" y="438" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.7)">Take the Course</text>

    <!-- stats -->
    ${[["12", "Eras"], ["60", "Concepts"], ["96", "Sources"], ["6", "Flowcharts"], ["11", "Chapters"], ["90+", "Years"]]
      .map(([v, l], i) => {
        const x = 150 + i * 152;
        return `<g transform="translate(${x} 502)">${card(0, 0, 132, 74, 14)}
          <text x="66" y="34" text-anchor="middle" font-size="22" font-weight="700" fill="#ffffff">${v}</text>
          <text x="66" y="56" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.4)">${l}</text></g>`;
      })
      .join("\n  ")}

    <!-- mode cards -->
    ${["Timeline", "Knowledge Graph", "Structured Course", "Visual Flowcharts", "Source Library"]
      .map((t, i) => {
        const x = 150 + (i % 3) * 320;
        const y = 604 + Math.floor(i / 3) * 84;
        return `<g transform="translate(${x} ${y})">${card(0, 0, 300, 68, 14)}
          <rect x="16" y="18" width="32" height="32" rx="10" fill="url(#brand)" fill-opacity="0.25"/>
          <text x="60" y="30" font-size="13" font-weight="600" fill="#ffffff">${t}</text>
          ${bar(60, 42, 200, 7, 0.1)}</g>`;
      })
      .join("\n  ")}
  </g>`;

// ── 2. timeline ────────────────────────────────────────────────
const timelineRows = [
  ["The Dream", "Pre-1950", "#8b5cf6"],
  ["The Birth of AI", "1956–1969", "#6366f1"],
  ["The Golden Age", "1956–1974", "#3b82f6"],
  ["The First AI Winter", "1974–1980", "#64748b"],
  ["The Expert Systems Era", "1980–1987", "#10b981"],
  ["The Second AI Winter", "1987–1993", "#64748b"],
  ["The Quiet Revolution", "1993–2011", "#f59e0b"],
  ["The Deep Learning Explosion", "2012–2017", "#ef4444"],
  ["The Transformer Era", "2017–2020", "#ec4899"],
  ["The LLM & Foundation Model Era", "2020–2023", "#a855f7"],
];

const timeline = `
  <g>
    <text x="600" y="164" text-anchor="middle" font-size="34" font-weight="700" fill="#ffffff">The Timeline</text>
    <text x="600" y="192" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.4)">Scroll through 90 years of AI history</text>

    <!-- level toggle -->
    ${["Simple", "Deeper", "Deepest"]
      .map((t, i) => {
        const x = 528 + i * 100;
        const on = i === 0;
        return `<g><rect x="${x}" y="208" width="92" height="30" rx="10" fill="${on ? "#22d3ee" : "#ffffff"}" fill-opacity="${on ? 0.15 : 0.04}" stroke="${on ? "#22d3ee" : "#ffffff"}" stroke-opacity="${on ? 0.4 : 0.1}"/>
        <text x="${x + 46}" y="228" text-anchor="middle" font-size="12" fill="${on ? "#22d3ee" : "rgba(255,255,255,0.4)"}">${t}</text></g>`;
      })
      .join("\n  ")}

    <!-- spine -->
    <line x1="600" y1="262" x2="600" y2="730" stroke="url(#brand)" stroke-opacity="0.35" stroke-width="2"/>

    ${timelineRows
      .map(([name, years, color], i) => {
        const y = 282 + i * 50;
        const left = i % 2 === 0;
        const cw = 430;
        const cx = left ? 600 - 20 - cw : 620;
        return `<g>
        ${dot(600, y, 6, color, 1)}
        <circle cx="600" cy="${y}" r="11" fill="none" stroke="${color}" stroke-opacity="0.4"/>
        <g transform="translate(${cx} ${y - 34})">
          ${card(0, 0, cw, 40, 11)}
          <rect x="12" y="9" width="22" height="22" rx="7" fill="${color}" fill-opacity="0.18"/>
          <text x="44" y="18" font-size="9" fill="rgba(255,255,255,0.3)">ERA ${i + 1} · ${years}</text>
          <text x="44" y="32" font-size="13" font-weight="600" fill="#ffffff">${name}</text>
        </g>
        <line x1="${left ? 600 - 20 : 600 + 20}" y1="${y}" x2="${left ? cx + cw : cx}" y2="${y}" stroke="${color}" stroke-opacity="0.35"/>
      </g>`;
      })
      .join("\n  ")}
  </g>`;

// ── 3. course ──────────────────────────────────────────────────
const courseRows = [
  ["1", "What is Intelligence?", "simple"],
  ["2", "The Birth of AI", "simple"],
  ["3", "Symbolic AI & The Golden Age", "deeper"],
  ["4", "The AI Winters", "simple"],
  ["5", "Expert Systems & Backpropagation", "deeper"],
  ["6", "The Quiet Revolution", "deeper"],
  ["7", "The Deep Learning Explosion", "deeper"],
  ["8", "The Transformer Era", "deepest"],
  ["9", "The LLM & Foundation Model Era", "deepest"],
  ["10", "The Agent & Reasoning Era", "deepest"],
  ["11", "The Present & Beyond", "deepest"],
];
const lvlColor = { simple: "#10b981", deeper: "#f59e0b", deepest: "#ef4444" };

const course = `
  <g>
    <text x="600" y="162" text-anchor="middle" font-size="34" font-weight="700" fill="#ffffff">The Course</text>
    <text x="600" y="190" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.4)">11 chapters · 3 depth levels</text>

    <!-- progress -->
    <rect x="440" y="208" width="320" height="8" rx="4" fill="#ffffff" fill-opacity="0.08"/>
    <rect x="440" y="208" width="96" height="8" rx="4" fill="url(#brand)"/>
    <text x="440" y="234" font-size="11" fill="rgba(255,255,255,0.35)">Progress</text>
    <text x="760" y="234" text-anchor="end" font-size="11" fill="rgba(255,255,255,0.35)">3/11 chapters</text>

    ${["Simple", "Deeper", "Deepest"]
      .map((t, i) => {
        const x = 528 + i * 100;
        const on = i === 0;
        return `<g><rect x="${x}" y="248" width="92" height="28" rx="9" fill="${on ? "#22d3ee" : "#ffffff"}" fill-opacity="${on ? 0.15 : 0.04}" stroke="${on ? "#22d3ee" : "#ffffff"}" stroke-opacity="${on ? 0.4 : 0.1}"/>
        <text x="${x + 46}" y="267" text-anchor="middle" font-size="11" fill="${on ? "#22d3ee" : "rgba(255,255,255,0.4)"}">${t}</text></g>`;
      })
      .join("\n  ")}

    ${courseRows
      .map(([n, title, lvl], i) => {
        const y = 292 + i * 38;
        const done = i < 3;
        const eraColor = ["#8b5cf6", "#6366f1", "#3b82f6", "#64748b", "#10b981", "#64748b", "#f59e0b", "#ef4444", "#ec4899", "#06b6d4", "#22d3ee"][i];
        return `<g>
        ${card(300, y, 600, 32, 10)}
        <rect x="312" y="${y + 5}" width="22" height="22" rx="6" fill="${eraColor}" fill-opacity="0.18"/>
        <text x="323" y="${y + 20}" text-anchor="middle" font-size="11" font-weight="700" fill="${eraColor}">${n}</text>
        <text x="346" y="${y + 21}" font-size="12" fill="#ffffff">${title}</text>
        ${done ? dot(806, y + 16, 6, "#10b981", 1) : dot(806, y + 16, 5, "#ffffff", 0.15)}
        <rect x="836" y="${y + 9}" width="52" height="15" rx="7" fill="${lvlColor[lvl]}" fill-opacity="0.15"/>
        <text x="862" y="${y + 20}" text-anchor="middle" font-size="9" fill="${lvlColor[lvl]}">${lvl}</text>
      </g>`;
      })
      .join("\n  ")}
  </g>`;

// ── 4. graph ───────────────────────────────────────────────────
const nodes = [
  [220, 250, 26, "#8b5cf6", "Dream"],
  [380, 190, 22, "#6366f1", "Birth"],
  [540, 250, 26, "#3b82f6", "Golden"],
  [700, 310, 18, "#64748b", "Winter"],
  [860, 250, 26, "#10b981", "Expert"],
  [1000, 320, 16, "#f59e0b", "Quiet"],
  [300, 430, 20, "#ef4444", "AlexNet"],
  [520, 480, 24, "#ec4899", "Transf."],
  [740, 460, 26, "#a855f7", "LLM"],
  [900, 540, 24, "#06b6d4", "Agents"],
  [1060, 620, 20, "#22d3ee", "AGI"],
];
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7], [7, 8], [8, 9], [9, 10], [5, 8],
];

const graph = `
  <g>
    <text x="48" y="156" font-size="30" font-weight="700" fill="#ffffff">The Knowledge Graph</text>
    <text x="48" y="180" font-size="12" fill="rgba(255,255,255,0.4)">Drag to pan · scroll to zoom · click a node</text>

    ${["all", "era", "concept", "person"]
      .map((t, i) => {
        const x = 48 + i * 92;
        const on = i === 0;
        return `<g><rect x="${x}" y="196" width="84" height="26" rx="9" fill="${on ? "#22d3ee" : "#ffffff"}" fill-opacity="${on ? 0.15 : 0.04}" stroke="${on ? "#22d3ee" : "#ffffff"}" stroke-opacity="${on ? 0.4 : 0.1}"/>
        <text x="${x + 42}" y="213" text-anchor="middle" font-size="11" fill="${on ? "#22d3ee" : "rgba(255,255,255,0.4)"}">${t}</text></g>`;
      })
      .join("\n  ")}

    <rect x="48" y="240" width="1104" height="460" rx="14" fill="#ffffff" fill-opacity="0.015" stroke="#ffffff" stroke-opacity="0.06"/>

    ${edges
      .map(([a, b]) => {
        const [ax, ay] = nodes[a];
        const [bx, by] = nodes[b];
        return `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#ffffff" stroke-opacity="0.12"/>`;
      })
      .join("\n  ")}

    ${nodes
      .map(([x, y, r, c, label]) => `<g>
      ${dot(x, y, r + 8, c, 0.1)}
      ${dot(x, y, r, c, 0.3)}
      <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="1.5"/>
      ${dot(x, y, r * 0.32, c, 1)}
      <text x="${x}" y="${y + r + 16}" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.6)">${label}</text>
    </g>`)
      .join("\n  ")}

    <!-- legend -->
    ${card(64, 620, 150, 66, 12)}
    <text x="80" y="642" font-size="10" fill="rgba(255,255,255,0.35)">Legend</text>
    ${[["era", "#22d3ee"], ["concept", "#8b5cf6"], ["person", "#f59e0b"]]
      .map(([l, c], i) => `<g>${dot(86, 660 + i * 18, 4, c, 1)}<text x="98" y="${664 + i * 18}" font-size="10" fill="rgba(255,255,255,0.45)">${l}</text></g>`)
      .join("\n  ")}
  </g>`;

// ── 5. flowcharts ──────────────────────────────────────────────
const fcNode = (x, y, w, h, color, label, round = 10) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${round}" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-opacity="0.8"/>
  <text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="11" fill="${color}">${label}</text>`;

const fcEdge = (x1, y1, x2, y2) =>
  `<path d="M ${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="#ffffff" stroke-opacity="0.25" marker-end="url(#ah)"/>
   <defs><marker id="ah" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0, 7 3, 0 6" fill="rgba(255,255,255,0.35)"/></marker></defs>`;

const flowcharts = `
  <g>
    <text x="600" y="162" text-anchor="middle" font-size="34" font-weight="700" fill="#ffffff">Visual Flowcharts</text>
    <text x="600" y="190" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.4)">How the machinery actually works</text>

    <!-- training loop diagram -->
    <rect x="60" y="230" width="560" height="450" rx="14" fill="#ffffff" fill-opacity="0.015" stroke="#ffffff" stroke-opacity="0.06"/>
    <text x="86" y="262" font-size="14" font-weight="600" fill="#ffffff">How a Neural Network Learns</text>

    ${fcEdge(340, 330, 340, 362)}
    ${fcEdge(340, 424, 340, 456)}
    ${fcEdge(340, 518, 340, 550)}
    ${fcEdge(340, 582, 520, 582)}
    ${fcEdge(520, 582, 520, 508)}
    ${fcEdge(520, 508, 420, 508)}
    ${fcEdge(420, 508, 420, 392)}
    ${fcEdge(340, 392, 340, 362)}
    ${fcEdge(340, 614, 340, 646)}

    ${fcNode(250, 296, 180, 34, "#22d3ee", "Training Data", 17)}
    ${fcNode(250, 362, 180, 34, "#8b5cf6", "Forward Pass")}
    ${fcNode(250, 424, 180, 34, "#8b5cf6", "Compute Loss")}
    ${fcNode(250, 490, 180, 34, "#f59e0b", "Loss < threshold?")}
    ${fcNode(430, 565, 180, 34, "#8b5cf6", "Backpropagation")}
    ${fcNode(430, 441, 180, 34, "#8b5cf6", "Update Weights")}
    ${fcNode(250, 646, 180, 34, "#ec4899", "Trained Model", 17)}
    <text x="596" y="574" font-size="10" fill="rgba(255,255,255,0.3)">repeat</text>
    <text x="360" y="482" font-size="10" fill="rgba(255,255,255,0.3)">No</text>
    <text x="360" y="662" font-size="10" fill="rgba(255,255,255,0.3)">Yes</text>

    <!-- other diagrams grid -->
    ${[
      ["Transformer Architecture", "#ec4899", "Attention · FFN · ×N"],
      ["RLHF Training Pipeline", "#c084fc", "SFT · Reward · PPO"],
      ["AI Agent Loop", "#22d3ee", "Plan · Act · Observe"],
      ["Diffusion Generation", "#f59e0b", "Noise → Image"],
      ["RAG Pipeline", "#34d399", "Retrieve · Generate"],
      ["Knowledge Graph", "#8b5cf6", "Explore connections"],
    ]
      .map(([t, c, s], i) => {
        const x = 656 + (i % 2) * 272;
        const y = 230 + Math.floor(i / 2) * 156;
        return `<g>${card(x, y, 252, 136, 14)}
        <rect x="${x + 16}" y="${y + 18}" width="26" height="26" rx="8" fill="${c}" fill-opacity="0.2"/>
        <text x="${x + 74}" y="${y + 36}" font-size="13" font-weight="600" fill="#ffffff">${t}</text>
        ${bar(x + 16, y + 62, 210, 8, 0.08, c)}
        ${bar(x + 16, y + 80, 150, 8, 0.06)}
        <text x="${x + 16}" y="${y + 114}" font-size="10" fill="rgba(255,255,255,0.3)">${s}</text>
      </g>`;
      })
      .join("\n  ")}
  </g>`;

// ── 6. sources ─────────────────────────────────────────────────
const kinds = [
  ["paper", "#60a5fa", 34],
  ["video", "#f87171", 22],
  ["blog", "#34d399", 18],
  ["essay", "#fbbf24", 6],
  ["article", "#c084fc", 4],
  ["book", "#f472b6", 4],
  ["talk", "#22d3ee", 6],
  ["code", "#a3e635", 2],
];

const sources = `
  <g>
    <text x="600" y="160" text-anchor="middle" font-size="34" font-weight="700" fill="#ffffff">Source Library</text>
    <text x="600" y="188" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.4)">Every paper, video, blog, essay and article — linked</text>

    <!-- search -->
    <rect x="380" y="210" width="440" height="40" rx="12" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1"/>
    <circle cx="404" cy="230" r="7" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
    <line x1="409" y1="235" x2="414" y2="240" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
    <text x="426" y="235" font-size="12" fill="rgba(255,255,255,0.25)">Search papers, videos, authors...</text>

    <!-- kind chips -->
    ${kinds
      .map(([k, c, n], i) => {
        const x = 250 + i * 92;
        return `<g><rect x="${x}" y="264" width="84" height="26" rx="13" fill="${c}" fill-opacity="0.12"/>
        ${dot(x + 16, 277, 4, c, 1)}
        <text x="${x + 26}" y="281" font-size="10" fill="rgba(255,255,255,0.6)">${k}s ${n}</text></g>`;
      })
      .join("\n  ")}

    <!-- filters -->
    <rect x="330" y="306" width="140" height="28" rx="9" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.1"/>
    <text x="346" y="325" font-size="11" fill="rgba(255,255,255,0.45)">All eras</text>
    <rect x="482" y="306" width="150" height="28" rx="9" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.1"/>
    <text x="498" y="325" font-size="11" fill="rgba(255,255,255,0.45)">Newest first</text>
    <text x="870" y="325" font-size="11" fill="rgba(255,255,255,0.3)">96 sources found</text>

    <!-- result cards -->
    ${[
      ["Attention Is All You Need", "Vaswani et al. · 2017", "paper", "#60a5fa"],
      ["But what is a neural network?", "3Blue1Brown · 2017", "video", "#f87171"],
      ["Learning Representations by Back-Propagating Errors", "Rumelhart, Hinton & Williams · 1986", "paper", "#60a5fa"],
      ["Let's build GPT: from scratch, in code, spelled out", "Andrej Karpathy · 2023", "video", "#f87171"],
      ["Scaling Laws for Neural Language Models", "Kaplan et al. · 2020", "paper", "#60a5fa"],
      ["A Path Towards Autonomous Machine Intelligence", "Yann LeCun · 2022", "paper", "#60a5fa"],
      ["Constitutional AI: Harmlessness from AI Feedback", "Anthropic · 2022", "essay", "#fbbf24"],
      ["High-Resolution Image Synthesis with Latent Diffusion", "Rombach et al. · 2022", "paper", "#60a5fa"],
    ]
      .map(([t, a, k, c], i) => {
        const x = 90 + (i % 2) * 520;
        const y = 356 + Math.floor(i / 2) * 96;
        return `<g>${card(x, y, 500, 80, 13)}
        <rect x="${x + 14}" y="${y + 16}" width="30" height="30" rx="9" fill="${c}" fill-opacity="0.15"/>
        <circle cx="${x + 29}" cy="${y + 31}" r="6" fill="none" stroke="${c}" stroke-width="1.4"/>
        <text x="${x + 56}" y="${y + 28}" font-size="12" fill="#ffffff">${t.length > 46 ? t.slice(0, 44) + "…" : t}</text>
        <text x="${x + 56}" y="${y + 47}" font-size="10" fill="rgba(255,255,255,0.3)">${a}</text>
        <rect x="${x + 56}" y="${y + 56}" width="${34 + k.length * 7}" height="14" rx="7" fill="${c}" fill-opacity="0.12"/>
        <text x="${x + 66}" y="${y + 67}" font-size="9" fill="${c}">${k}</text>
      </g>`;
      })
      .join("\n  ")}
  </g>`;

const pages = {
  "screen-home.svg": ["AI Journey — Home", home],
  "screen-timeline.svg": ["Timeline", timeline],
  "screen-course.svg": ["Course", course],
  "screen-graph.svg": ["Knowledge Graph", graph],
  "screen-flowcharts.svg": ["Flowcharts", flowcharts],
  "screen-sources.svg": ["Source Library", sources],
};

for (const [file, [title, inner]] of Object.entries(pages)) {
  writeFileSync(join(OUT, file), W(chrome(title, inner)));
}

console.log("mockups written to docs/images:");
for (const f of Object.keys(pages)) console.log("  " + f);
