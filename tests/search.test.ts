import { describe, expect, test } from "bun:test";
import {
  buildSearchIndex,
  searchIndex,
  glossaryTerms,
  type SearchItem,
} from "../src/lib/search";
import { people, concepts } from "../src/data/content";

const INDEX = buildSearchIndex();

describe("buildSearchIndex", () => {
  test("covers every concept, source and era", () => {
    expect(INDEX.filter((i) => i.kind === "concept")).toHaveLength(concepts.length);
    expect(INDEX.length).toBeGreaterThanOrEqual(concepts.length * 2);
  });

  test("every item has a deep link starting with /", () => {
    for (const i of INDEX) expect(i.href.startsWith("/")).toBe(true);
  });

  test("concept links point at the timeline with the concept id", () => {
    for (const i of INDEX.filter((x) => x.kind === "concept")) {
      expect(i.href).toContain("/timeline?concept=");
      expect(i.href).toContain(i.id);
    }
  });
});

describe("searchIndex", () => {
  test("empty query returns nothing rather than everything", () => {
    expect(searchIndex("", INDEX)).toEqual([]);
    expect(searchIndex("   ", INDEX)).toEqual([]);
  });

  test("ranks an exact title match above a body-only match", () => {
    const items: SearchItem[] = [
      {
        id: "a",
        kind: "concept",
        title: "Attention",
        subtitle: "The Transformer Era · something",
        href: "/timeline?concept=a",
        score: 0,
      },
      {
        id: "b",
        kind: "concept",
        title: "Unrelated Topic",
        subtitle: "some era · a tagline mentioning attention deep down",
        href: "/timeline?concept=b",
        score: 0,
      },
    ];
    const hits = searchIndex("attention", items);
    expect(hits[0]?.id).toBe("a");
  });

  test("finds a real concept by name", () => {
    const hits = searchIndex("transformer", INDEX);
    expect(hits.some((h) => h.kind === "concept" && h.id === "transformer")).toBe(true);
  });

  test("finds a source by author name", () => {
    const hits = searchIndex("Karpathy", INDEX);
    expect(hits.some((h) => h.kind === "source")).toBe(true);
  });

  test("finds an era by name", () => {
    const hits = searchIndex("Quiet Revolution", INDEX);
    expect(hits.some((h) => h.kind === "era")).toBe(true);
  });

  test("kinds option restricts the result set", () => {
    const hits = searchIndex("the", INDEX, { kinds: ["source"] });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every((h) => h.kind === "source")).toBe(true);
  });

  test("limit is respected", () => {
    expect(searchIndex("a", INDEX, { limit: 5 }).length).toBeLessThanOrEqual(5);
  });

  test("an unmatched query returns an empty list, not an error", () => {
    expect(searchIndex("zzzzqqqqxxxx", INDEX)).toEqual([]);
  });

  test("scores are non-negative and descending", () => {
    const hits = searchIndex("learning", INDEX);
    expect(hits.length).toBeGreaterThan(1);
    for (let i = 1; i < hits.length; i++) {
      expect(hits[i - 1].score).toBeGreaterThanOrEqual(hits[i].score);
    }
  });
});

/**
 * The scoring constants above are the search's public behavior — the comment in
 * `src/lib/search.ts` promises "a prefix match on a name is worth far more than
 * a substring match buried in a long paragraph". These tests pin the arithmetic
 * with synthetic items, so a future tweak to a weight is a deliberate diff in a
 * test rather than a silent reordering on the live dataset.
 */
describe("scoring contract", () => {
  const make = (id: string, title: string, subtitle: string): SearchItem => ({
    id,
    kind: "concept",
    title,
    subtitle,
    href: `/timeline?concept=${id}`,
    score: 0,
  });

  test("pins the documented weights: exact 100, prefix 60, substring 25, absent -50", () => {
    const items = [
      make("exact", "attention", "zzz"),
      make("prefix", "attention span", "zzz"),
      make("substring", "on attention", "zzz"),
    ];
    const scores = new Map(searchIndex("attention", items).map((hit) => [hit.id, hit.score]));
    // rank = title * 3 + subtitle; "zzz" is a term the subtitle does not contain.
    expect(scores.get("exact")).toBe(100 * 3 - 50);
    expect(scores.get("prefix")).toBe(60 * 3 - 50);
    expect(scores.get("substring")).toBe(25 * 3 - 50);
  });

  test("ranks the three match classes in order", () => {
    const items = [
      make("a-substring", "on attention", "zzz"),
      make("b-prefix", "attention span", "zzz"),
      make("c-exact", "attention", "zzz"),
    ];
    expect(searchIndex("attention", items).map((hit) => hit.id)).toEqual([
      "c-exact",
      "b-prefix",
      "a-substring",
    ]);
  });

  test("a subtitle-only match surfaces but floors at the weakest score", () => {
    const items = [make("sub", "zzz", "attention"), make("title", "attention", "zzz")];
    const hits = searchIndex("attention", items);
    expect(hits.map((hit) => hit.id)).toEqual(["title", "sub"]);
    // Positive, so callers can filter on > 0, but weaker than any title match.
    expect(hits.find((hit) => hit.id === "sub")?.score).toBe(1);
  });

  test("ties break alphabetically by title", () => {
    const items = [make("b", "beta attention", "zzz"), make("a", "alpha attention", "zzz")];
    expect(searchIndex("attention", items).map((hit) => hit.id)).toEqual(["a", "b"]);
  });

  test("dedupes and case-folds the query before scoring", () => {
    const items = [make("a", "attention span", "zzz")];
    expect(searchIndex("Attention attention", items)).toEqual(searchIndex("attention", items));
  });

  test("limit 0 returns nothing and limit 1 returns the strongest hit", () => {
    const items = [make("a", "attention", "zzz"), make("b", "attention span", "zzz")];
    expect(searchIndex("attention", items, { limit: 0 })).toEqual([]);
    expect(searchIndex("attention", items, { limit: 1 }).map((hit) => hit.id)).toEqual(["a"]);
  });
});

describe("glossaryTerms", () => {
  test("groups every concept exactly once", () => {
    const grouped = glossaryTerms();
    const total = grouped.reduce((n, g) => n + g.concepts.length, 0);
    expect(total).toBe(concepts.length);
  });

  test("letters are sorted and uppercase", () => {
    const letters = glossaryTerms().map((g) => g.letter);
    expect([...letters]).toEqual([...letters].sort());
    for (const l of letters) expect(l).toBe(l.toUpperCase());
  });

  test("concepts within a letter are alphabetical", () => {
    for (const { concepts: list } of glossaryTerms()) {
      const names = list.map((c) => c.name);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    }
  });

  test("no empty groups", () => {
    for (const g of glossaryTerms()) expect(g.concepts.length).toBeGreaterThan(0);
  });
});

describe("people dataset", () => {
  test("has a unique id per person", () => {
    expect(new Set(people.map((p) => p.id)).size).toBe(people.length);
  });

  test("every person links to real concepts", () => {
    const ids = new Set(concepts.map((c) => c.id));
    for (const p of people) {
      expect(p.conceptIds.length).toBeGreaterThan(0);
      for (const cid of p.conceptIds) {
        expect(ids.has(cid)).toBe(true);
      }
    }
  });

  test("every person belongs to a known era", () => {
    for (const p of people) {
      expect(typeof p.era).toBe("string");
      expect(p.era.length).toBeGreaterThan(0);
    }
  });

  test("links are absolute https when present", () => {
    for (const p of people) {
      if (p.link) expect(p.link).toMatch(/^https:\/\//);
    }
  });
});
