"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";

const STORAGE_KEY = "ai-journey:reading";

type Depth = "simple" | "deeper" | "deepest";

type ProgressEntry = Record<Depth, boolean>;

type Store = Map<string, ProgressEntry>;

// Load persisted progress once on first access (client only).
let store: Store = (() => {
  if (typeof window === "undefined") return new Map();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const parsed = JSON.parse(raw) as Record<string, ProgressEntry>;
    return new Map(Object.entries(parsed));
  } catch {
    return new Map();
  }
})();

let listeners: Array<() => void> = [];

function write(next: Store) {
  store = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(next)));
  } catch {
    /* storage full — non-fatal */
  }
  emit();
}

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function emit() {
  for (const fn of listeners) fn();
}

export function useReadingProgress(conceptId: string) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => store.get(conceptId) ?? { simple: false, deeper: false, deepest: false },
    () => ({ simple: false, deeper: false, deepest: false })
  );

  const toggle = useCallback(
    (depth: Depth) => {
      write(
        new Map(store).set(conceptId, {
          ...snapshot,
          [depth]: !snapshot[depth],
        })
      );
    },
    [conceptId, snapshot]
  );

  const completed = useMemo(
    () => Object.values(snapshot).filter(Boolean).length,
    [snapshot]
  );

  const allRead = completed === 3;

  return { snapshot, toggle, completed, allRead };
}

export function useOverallReadingProgress() {
  const snapshot = useSyncExternalStore(subscribe, () => store, () => new Map());

  const conceptIds = useMemo(() => Array.from(snapshot.keys()), [snapshot]);

  const totalDepths = conceptIds.length * 3;
  const completedDepths = useMemo(
    () =>
      conceptIds.reduce(
        (sum, id) =>
          sum +
          Object.values(snapshot.get(id) ?? {}).filter(Boolean).length,
        0
      ),
    [snapshot, conceptIds]
  );

  return {
    conceptsTracked: conceptIds.length,
    completedDepths,
    totalDepths,
    percent: totalDepths === 0 ? 0 : Math.round((completedDepths / totalDepths) * 100),
  };
}
