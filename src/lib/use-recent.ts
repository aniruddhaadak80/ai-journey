import { useSyncExternalStore } from "react";

const RECENT_KEY = "ai-journey:recent";

type Stored = unknown;

let cache: Stored[] = [];
let loaded = false;

/** Minimal, SSR-safe store backed by localStorage (the localStorage store). */
function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === RECENT_KEY) {
      cache = read();
      onChange();
    }
  };
  // Also pick up writes from other components in the same tab.
  window.addEventListener("storage", onStorage);
  window.addEventListener("ai-journey:recent", onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("ai-journey:recent", onChange);
  };
}

function read(): Stored[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function emit() {
  window.dispatchEvent(new Event("ai-journey:recent"));
}

function snapshot(): Stored[] {
  if (!loaded) {
    cache = read();
    loaded = true;
  }
  return cache;
}

/** Stable server snapshot so hydration always matches. */
function getServerSnapshot(): Stored[] {
  return [];
}

/** Everything the palette needs to render and link a remembered item. */
export interface RecentItem {
  id: string;
  title: string;
  subtitle?: string;
  kind: string;
  href: string;
}

export function useRecent<T extends RecentItem>(): T[] {
  return useSyncExternalStore(subscribe, () => snapshot() as T[], getServerSnapshot) as T[];
}

export function pushRecent<T extends RecentItem>(item: T, limit = 5): T[] {
  const next = [item, ...(read() as T[]).filter((p) => p.id !== item.id)].slice(0, limit);
  cache = next;
  loaded = true;
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* storage full or unavailable — non-fatal */
  }
  emit();
  return next;
}
