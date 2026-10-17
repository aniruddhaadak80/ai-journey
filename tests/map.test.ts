import { describe, expect, test } from "bun:test";
import { mapLocations, eras, concepts } from "../src/data/content";

// The /map lens projects these coords with an equirectangular formula into an
// SVG canvas, so the invariant that matters is: everything stays inside the
// graticule and every pin resolves to a real era.
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 960,
  y: ((90 - lat) / 180) * 540,
});

describe("mapLocations dataset", () => {
  test("is non-empty and every id is unique", () => {
    expect(mapLocations.length).toBeGreaterThan(10);
    const ids = new Set(mapLocations.map((l) => l.id));
    expect(ids.size).toBe(mapLocations.length);
  });

  test("every pin projects inside the 960x540 canvas", () => {
    for (const l of mapLocations) {
      const { x, y } = project(l.lat, l.lng);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(960);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(540);
    }
  });

  test("every pin references a real era and deep-links into the timeline", () => {
    const eraIds = new Set(eras.map((e) => e.id));
    for (const l of mapLocations) {
      expect(eraIds.has(l.era)).toBe(true);
      expect(l.link.startsWith("/timeline?era=")).toBe(true);
      expect(l.link.slice("/timeline?era=".length)).toBe(l.era);
    }
  });

  test("years are ordered per era so the map reads as a story", () => {
    const byEra = new Map<string, number[]>();
    for (const l of mapLocations) {
      const arr = byEra.get(l.era) ?? [];
      arr.push(l.year);
      byEra.set(l.era, arr);
    }
    for (const years of byEra.values()) {
      const sorted = [...years].sort((a, b) => a - b);
      expect(years).toEqual(sorted);
      expect(years.length).toBeGreaterThan(0);
    }
  });

  test("pins are not all stacked on one spot", () => {
    // Guards against copy-paste coordinate bugs.
    const coords = new Set(mapLocations.map((l) => `${l.lat},${l.lng}`));
    expect(coords.size).toBeGreaterThanOrEqual(mapLocations.length * 0.6);
  });

  test("every era used by the map exists in the concept graph", () => {
    for (const l of mapLocations) {
      const eraId = l.era;
      // The era should actually have concepts, otherwise the pin leads nowhere.
      expect(concepts.some((c) => c.era === eraId)).toBe(true);
    }
  });
});