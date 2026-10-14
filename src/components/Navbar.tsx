"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Sparkles,
  Clock,
  Network,
  BookOpen,
  GitBranch,
  Library,
  Users,
  BookMarked,
  Menu,
  X,
  MoreHorizontal,
  Search,
} from "lucide-react";
import CommandPalette from "@/components/CommandPalette";

const primaryNav = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/graph", label: "Graph", icon: Network },
  { href: "/course", label: "Course", icon: BookOpen },
  { href: "/flowcharts", label: "Flowcharts", icon: GitBranch },
];

const moreNav = [
  { href: "/sources", label: "Source Library", icon: Library, hint: "96 papers & videos" },
  { href: "/people", label: "People", icon: Users, hint: "12 researchers" },
  { href: "/glossary", label: "Glossary", icon: BookMarked, hint: "60 terms, A–Z" },
];

const GITHUB_URL = "https://github.com/aniruddhaadak80/ai-journey";

/** Inline GitHub mark — lucide v1 dropped brand icons. */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.9 0-.85.3-1.53.79-2.07-.08-.2-.34-.98.08-2.04 0 0 .64-.21 2.1.81a7.3 7.3 0 0 1 3.82 0c1.46-1.02 2.1-.81 2.1-.81.42 1.06.16 1.84.08 2.04.49.54.79 1.22.79 2.07 0 2.03-1.14 2.7-2.92 2.9.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/** Closes the "More" menu on outside click / Escape. */
function useDismiss(ref: React.RefObject<HTMLDivElement | null>, open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, ref]);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useDismiss(moreRef, moreOpen, () => setMoreOpen(false));

  const moreActive = moreNav.some((m) => m.href === pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="gradient-text">AI Journey</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium ${
                    isActive ? "active text-cyan-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}

            {/* Search */}
            <div className="ml-1.5 mr-0.5">
              <CommandPaletteTrigger />
            </div>

            {/* More */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  moreActive ? "active-cyan text-cyan-400" : "text-white/60 hover:text-white"
                }`}
              >
                <MoreHorizontal className="w-4 h-4" />
                More
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 glass-strong rounded-2xl p-2 shadow-2xl"
                    role="menu"
                  >
                    {moreNav.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                            isActive ? "bg-cyan-500/10 text-cyan-300" : "hover:bg-white/5 text-white/70"
                          }`}
                          role="menuitem"
                        >
                          <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium">{item.label}</span>
                            <span className="block text-xs text-white/30">{item.hint}</span>
                          </span>
                        </Link>
                      );
                    })}

                    <div className="my-1 border-t border-white/5" />

                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-colors"
                      role="menuitem"
                    >
                      <GitHubMark className="w-4 h-4 shrink-0" />
                      View source on GitHub
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: search + toggle */}
          <div className="flex md:hidden items-center gap-1">
            <CommandPaletteTrigger compact />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-lg text-white/60 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {[...primaryNav.slice(1), ...moreNav].map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5"
              >
                <GitHubMark className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/**
 * Thin wrapper so the palette (which owns its own trigger UI) can be mounted
 * twice — desktop full, mobile icon-only — without duplicating state.
 */
function CommandPaletteTrigger({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search AI Journey"
        className={`flex items-center gap-1.5 rounded-lg glass text-white/40 hover:text-white/70 hover:border-white/20 transition-all ${
          compact ? "p-2" : "px-2.5 py-1.5 text-xs"
        }`}
      >
        <Search className="w-3.5 h-3.5" />
        {!compact && (
          <>
            <span>Search</span>
            <kbd className="hidden lg:inline-flex items-center px-1 rounded bg-white/10 text-[10px] font-mono text-white/40">
              ⌘K
            </kbd>
          </>
        )}
      </button>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
