"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { buildSearchIndex, searchIndex, kindLabels, type SearchItem, type SearchKind } from "@/lib/search";
import { useRecent, pushRecent } from "@/lib/use-recent";
import {
  Search,
  Sparkles,
  Library,
  Clock,
  ArrowRight,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";

const kindIcons: Record<SearchKind, LucideIcon> = {
  concept: Sparkles,
  source: Library,
  era: Clock,
};


/** Suggest a few entry points before the user has typed anything. */
const SUGGESTIONS: SearchItem[] = [
  { id: "transformer", title: "Transformer", href: "/timeline?concept=transformer", kind: "concept", subtitle: "Suggested", score: 0 },
  { id: "rlhf", title: "RLHF", href: "/timeline?concept=rlhf", kind: "concept", subtitle: "Suggested", score: 0 },
  { id: "agents", title: "AI Agents", href: "/timeline?concept=agents", kind: "concept", subtitle: "Suggested", score: 0 },
  { id: "transformer-2017", title: "Attention Is All You Need", href: "/sources?q=Attention", kind: "source", subtitle: "Vaswani et al. · 2017 · paper", score: 0 },
  { id: "era-transformer", title: "The Transformer Era", href: "/timeline?era=transformer", kind: "era", subtitle: "2017–2020 · Suggested", score: 0 },
];

interface Props {
  /** Controlled open state — lets the navbar and the ⌘K shortcut share one instance. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandPalette({ open: controlled, onOpenChange }: Props) {
  const router = useRouter();
  const [uncontrolled, setUncontrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const recent = useRecent<SearchItem>();
  const open = controlled ?? uncontrolled;

  // Recent visits live in an external store (localStorage), read through
  // useSyncExternalStore — not a setState-in-effect, which cascades renders.
  const remember = useCallback((item: SearchItem) => {
    pushRecent(item);
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      // Reset the query as the palette opens, from the event handler rather
      // than an effect — avoids a cascading second render.
      if (next) {
        setQuery("");
        setCursor(0);
      }
      if (onOpenChange) onOpenChange(next);
      else setUncontrolled(next);
    },
    [onOpenChange]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // The index is static; build once per mount rather than per keystroke.
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchIndex(query, index, { limit: 30 }), [query, index]);

  // ── ⌘K / Ctrl-K shortcut (only when uncontrolled, so it isn't bound twice) ──
  useEffect(() => {
    if (onOpenChange) return; // the navbar owns the shortcut instead
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setUncontrolled(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // ── body scroll lock while open ───────────────────────────────
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep the highlighted row in view.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const visible: SearchItem[] =
    query.trim().length === 0
      ? recent.length
        ? recent
        : SUGGESTIONS
      : results;

  const go = useCallback(
    (item: SearchItem) => {
      remember(item);
      setOpen(false);
      router.push(item.href);
    },
    [remember, router, setOpen]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(visible.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + visible.length) % Math.max(visible.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = visible[cursor];
      if (item) go(item);
    }
  };

  return (
    <AnimatePresence>
      {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: -10, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Search"
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search concepts, papers, eras…"
                  className="flex-1 bg-transparent text-sm placeholder:text-white/25 focus:outline-none"
                  aria-label="Search query"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/40 hover:text-white/70"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
                {visible.length === 0 && (
                  <div className="px-4 py-10 text-center text-sm text-white/30">
                    <Search className="w-7 h-7 mx-auto mb-3 opacity-40" />
                    No matches for <span className="text-white/50">&ldquo;{query}&rdquo;</span>
                  </div>
                )}

                {!query.trim() && recent.length > 0 && (
                  <div className="px-4 pt-1 pb-2 text-[10px] uppercase tracking-wider text-white/25">
                    Recent
                  </div>
                )}
                {!query.trim() && recent.length === 0 && (
                  <div className="px-4 pt-1 pb-2 text-[10px] uppercase tracking-wider text-white/25">
                    Start here
                  </div>
                )}

                {visible.map((item, i) => {
                  const Icon = kindIcons[item.kind];
                  const active = i === cursor;
                  return (
                    <button
                      key={`${item.kind}:${item.id}`}
                      data-idx={i}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => go(item)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        active ? "bg-cyan-500/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          active ? "bg-cyan-500/20" : "bg-white/5"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${active ? "text-cyan-300" : "text-white/40"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm truncate ${
                            active ? "text-cyan-200" : "text-white/80"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-[11px] text-white/30 truncate">{item.subtitle}</div>
                      </div>
                      <span className="text-[10px] text-white/20 shrink-0 hidden sm:block">
                        {kindLabels[item.kind]}
                      </span>
                      {active && (
                        <CornerDownLeft className="w-3 h-3 text-cyan-400/60 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-[10px] text-white/25">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 rounded bg-white/10">↑</kbd>
                    <kbd className="px-1 rounded bg-white/10">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 rounded bg-white/10">↵</kbd>
                    open
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  {visible.length} result{visible.length === 1 ? "" : "s"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}
