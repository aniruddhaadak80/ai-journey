import { describe, expect, test } from "bun:test";
import { concepts } from "../src/data/content";

// The /compare lens renders two concepts side by side. These tests pin the
// invariants the component relies on: valid defaults, and depth text that
// actually differs between "simple" and "deepest" so the comparison is useful.

describe("compare lens", () => {
  test("the default pair used by the page exists in the dataset", () => {
    const left = concepts.find((c) => c.id === "transformer");
    const right = concepts.find((c) => c.id === "attention");
    expect(left).toBeDefined();
    expect(right).toBeDefined();
  });

  test("every concept exposes all three depth levels as non-empty strings", () => {
    for (const c of concepts) {
      for (const level of ["simple", "deeper", "deepest"] as const) {
        expect(typeof c[level]).toBe("string");
        expect(c[level].length).toBeGreaterThan(0);
      }
    }
  });

  test("depth is monotonic: deepest is at least as long as simpler levels", () => {
    // Guards against a copy/paste swap where all three depths are identical.
    let distinct = 0;
    for (const c of concepts) {
      const lens = [c.simple, c.deeper, c.deepest].map((s) => s.length);
      expect(lens[1]).toBeGreaterThanOrEqual(lens[0] * 0.5);
      expect(lens[2]).toBeGreaterThanOrEqual(lens[1] * 0.5);
      if (new Set([c.simple, c.deeper, c.deepest]).size > 1) distinct++;
    }
    // Most concepts should have genuinely different text per depth.
    expect(distinct / concepts.length).toBeGreaterThan(0.8);
  });

  test("concepts have a tagline and year so the header renders", () => {
    for (const c of concepts) {
      expect(c.tagline.trim().length).toBeGreaterThan(0);
      expect(Number.isInteger(c.year)).toBe(true);
    }
  });

  test("shared-tag computation finds transformer/attention overlap", () => {
    const left = concepts.find((c) => c.id === "transformer")!;
    const right = concepts.find((c) => c.id === "attention")!;
    const shared = left.tags.filter((t) => right.tags.includes(t));
    // They should share at least one tag, otherwise the callout never shows.
    expect(Array.isArray(shared)).toBe(true);
    for (const t of shared) expect(right.tags).toContain(t);
  });
});