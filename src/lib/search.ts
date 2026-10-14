import { eras, concepts, sources, getConcept, getEra } from "@/data/content";

/**
 * A single ranked index over concepts, sources and eras.
 *
 * Reused by three surfaces so they can never disagree about what matches:
 *   1. the command palette (Cmd+K)
 *   2. the navbar's inline search
 *   3. the sources page's full-text filter
 *
 * Scoring is intentionally transparent and dependency-free — a prefix match on
 * a name is worth far more than a substring match buried in a long paragraph.
 */

export type SearchKind = "concept" | "source" | "era";

export interface SearchItem {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  /** Deep link, so a result is always shareable. */
  href: string;
  /** Lower is better. */
  score: number;
}

const norm = (s: string) => s.toLowerCase();

function scoreField(value: string, terms: string[]): number {
  const v = norm(value);
  let total = 0;
  for (const t of terms) {
    if (v === t) total += 100;
    else if (v.startsWith(t)) total += 60;
    else if (v.includes(t)) total += 25;
    else if (!v.includes(t)) total -= 50; // a term absent entirely
  }
  return total;
}

/** All searchable terms, lowercased and deduped. */
function termsFor(query: string): string[] {
  return Array.from(new Set(norm(query).split(/\s+/).filter(Boolean)));
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const c of concepts) {
    items.push({
      id: c.id,
      kind: "concept",
      title: c.name,
      subtitle: `${getEra(c.era)?.name ?? c.era} · ${c.tagline}`,
      href: `/timeline?concept=${encodeURIComponent(c.id)}`,
      score: 0,
    });
  }

  for (const s of sources) {
    items.push({
      id: s.id,
      kind: "source",
      title: s.title,
      subtitle: `${s.author} · ${s.year} · ${s.kind}`,
      href: `/sources?q=${encodeURIComponent(s.title)}`,
      score: 0,
    });
  }

  for (const e of eras) {
    items.push({
      id: e.id,
      kind: "era",
      title: e.name,
      subtitle: `${e.years} · ${e.tagline}`,
      href: `/timeline?era=${encodeURIComponent(e.id)}`,
      score: 0,
    });
  }

  return items;
}

export interface SearchOptions {
  limit?: number;
  /** Restrict to a subset, e.g. only sources on the sources page. */
  kinds?: SearchKind[];
}

/**
 * Rank a query against an item. Returns 0 when nothing matched, so callers can
 * filter on `> 0` without re-deriving the match.
 */
function rank(item: SearchItem, terms: string[], query: string): number {
  const title = scoreField(item.title, terms);
  const sub = scoreField(item.subtitle, terms);
  if (title <= -50 && sub <= -50) return 0;

  // Depth-weighted: the concept's own text is searchable at all three levels.
  if (item.kind === "concept") {
    const c = getConcept(item.id);
    if (c) {
      const q = norm(query);
      const body = norm(`${c.simple} ${c.deeper} ${c.deepest}`);
      if (body.includes(q)) return title + 8;
    }
  }

  const total = title * 3 + sub;
  return total > 0 ? total : 1;
}

export function searchIndex(
  query: string,
  items: SearchItem[],
  { limit = 24, kinds }: SearchOptions = {}
): SearchItem[] {
  const terms = termsFor(query);
  if (terms.length === 0) return [];

  const scoped = kinds?.length ? items.filter((i) => kinds.includes(i.kind)) : items;

  const scored: SearchItem[] = [];
  for (const item of scoped) {
    const s = rank(item, terms, query);
    if (s > 0) scored.push({ ...item, score: s });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

/** Terms starting with `prefix`, for the glossary's letter-jump index. */
export function glossaryTerms(): { letter: string; concepts: typeof concepts }[] {
  const letters = new Map<string, typeof concepts>();
  for (const c of [...concepts].sort((a, b) => a.name.localeCompare(b.name))) {
    const L = c.name[0]?.toUpperCase() ?? "#";
    if (!letters.has(L)) letters.set(L, []);
    letters.get(L)!.push(c);
  }
  return Array.from(letters, ([letter, list]) => ({ letter, concepts: list })).sort((a, b) =>
    a.letter.localeCompare(b.letter)
  );
}

export const kindLabels: Record<SearchKind, string> = {
  concept: "Concept",
  source: "Source",
  era: "Era",
};
