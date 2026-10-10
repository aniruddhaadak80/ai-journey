import type { Source } from "@/data/content";

export interface SourceFilters {
  search: string;
  kind: string;
  era: string;
  sortBy: "year" | "title";
}

/**
 * Pure filter + sort for the source library.
 *
 * Kept out of the component so it can be unit-tested directly and so the
 * React compiler can memoize the (now referentially transparent) call site.
 */
export function filterSources(all: readonly Source[], f: SourceFilters): Source[] {
  const q = f.search.trim().toLowerCase();

  const matched = all.filter((s) => {
    if (
      q &&
      !s.title.toLowerCase().includes(q) &&
      !s.author.toLowerCase().includes(q) &&
      !s.description.toLowerCase().includes(q)
    ) {
      return false;
    }
    if (f.kind !== "all" && s.kind !== f.kind) return false;
    if (f.era !== "all" && s.era !== f.era) return false;
    return true;
  });

  return matched.toSorted((a, b) =>
    f.sortBy === "year" ? b.year - a.year : a.title.localeCompare(b.title)
  );
}

/** Counts per source kind, for the filter summary chips. */
export function countByKind(all: readonly Source[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const s of all) {
    counts[s.kind] = (counts[s.kind] ?? 0) + 1;
  }
  return counts;
}

/** All distinct source kinds, in stable alphabetical order. */
export function distinctKinds(all: readonly Source[]): string[] {
  return Array.from(new Set(all.map((s) => s.kind))).toSorted();
}
