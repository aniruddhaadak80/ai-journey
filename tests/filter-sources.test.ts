import { describe, expect, test } from "bun:test";
import { filterSources, countByKind, distinctKinds } from "../src/lib/filter-sources";
import { sources, eras, concepts } from "../src/data/content";

const ALL = { search: "", kind: "all", era: "all", sortBy: "year" as const };

describe("filterSources", () => {
  test("returns everything when no filters are applied", () => {
    expect(filterSources(sources, ALL)).toHaveLength(sources.length);
  });

  test("does not mutate the input array", () => {
    const before = [...sources];
    filterSources(sources, { ...ALL, sortBy: "title" });
    expect(sources).toEqual(before);
  });

  test("filters by kind", () => {
    const papers = filterSources(sources, { ...ALL, kind: "paper" });
    expect(papers.length).toBeGreaterThan(0);
    expect(papers.every((s) => s.kind === "paper")).toBe(true);
  });

  test("filters by era", () => {
    const result = filterSources(sources, { ...ALL, era: "transformer" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((s) => s.era === "transformer")).toBe(true);
  });

  test("search matches title, author and description case-insensitively", () => {
    const byTitle = filterSources(sources, { ...ALL, search: "ATTENTION IS ALL" });
    expect(byTitle.some((s) => s.id === "transformer-2017")).toBe(true);

    const byAuthor = filterSources(sources, { ...ALL, search: "3blue1brown" });
    expect(byAuthor.length).toBeGreaterThan(0);

    const byDesc = filterSources(sources, { ...ALL, search: "imagenet" });
    expect(byDesc.length).toBeGreaterThan(0);
  });

  test("combines search with kind and era filters", () => {
    const result = filterSources(sources, {
      search: "learning",
      kind: "paper",
      era: "expert",
      sortBy: "year",
    });
    result.forEach((s) => {
      expect(s.kind).toBe("paper");
      expect(s.era).toBe("expert");
      expect(
        s.title.toLowerCase().includes("learning") ||
          s.author.toLowerCase().includes("learning") ||
          s.description.toLowerCase().includes("learning")
      ).toBe(true);
    });
  });

  test("whitespace-only search does not filter everything out", () => {
    expect(filterSources(sources, { ...ALL, search: "   " })).toHaveLength(
      sources.length
    );
  });

  test("unmatched search yields an empty list rather than throwing", () => {
    expect(filterSources(sources, { ...ALL, search: "zzzzz-no-such-thing" })).toEqual([]);
  });

  test("sorts by year descending by default", () => {
    const result = filterSources(sources, ALL);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].year).toBeGreaterThanOrEqual(result[i].year);
    }
  });

  test("sorts by title alphabetically when requested", () => {
    const result = filterSources(sources, { ...ALL, sortBy: "title" });
    const titles = result.map((s) => s.title);
    expect([...titles].toSorted((a, b) => a.localeCompare(b))).toEqual(titles);
  });
});

describe("countByKind", () => {
  test("counts sum to the total source count", () => {
    const counts = countByKind(sources);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(total).toBe(sources.length);
  });

  test("includes video sources", () => {
    expect(countByKind(sources)["video"]).toBeGreaterThan(0);
  });
});

describe("distinctKinds", () => {
  test("every kind is a known Source kind", () => {
    const known = new Set(["paper", "video", "blog", "essay", "article", "book", "talk", "code"]);
    for (const k of distinctKinds(sources)) {
      expect(known.has(k)).toBe(true);
    }
  });

  test("has no duplicates", () => {
    const kinds = distinctKinds(sources);
    expect(new Set(kinds).size).toBe(kinds.length);
  });
});

describe("content dataset sanity", () => {
  test("every source url is absolute https/http", () => {
    for (const s of sources) {
      expect(s.url).toMatch(/^https?:\/\//);
    }
  });

  test("every source belongs to a real era", () => {
    const eraIds = new Set(eras.map((e) => e.id));
    for (const s of sources) {
      expect(eraIds.has(s.era)).toBe(true);
    }
  });

  test("every concept has all three depth levels filled in", () => {
    for (const c of concepts) {
      expect(c.simple.length).toBeGreaterThan(40);
      expect(c.deeper.length).toBeGreaterThan(40);
      expect(c.deepest.length).toBeGreaterThan(40);
    }
  });

  test("ids are unique across concepts", () => {
    expect(new Set(concepts.map((c) => c.id)).size).toBe(concepts.length);
  });
});
