"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, ExternalLink, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { eras, sources, sourceKindColors, type Level } from "@/data/content";
import { glossaryTerms } from "@/lib/search";
import { FileText, Play, PenLine, BookOpen, Library, Mic, Code, type LucideIcon } from "lucide-react";

const kindIcons: Record<string, LucideIcon> = {
  paper: FileText,
  video: Play,
  blog: PenLine,
  essay: BookOpen,
  article: BookOpen,
  book: Library,
  talk: Mic,
  code: Code,
};

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level>("simple");
  const [eraFilter, setEraFilter] = useState("all");

  // Terms grouped A-Z are precomputed once; the same structure seeds the
  // letter-jump rail whether or not a filter is active.
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms()
      .map(({ letter, concepts: list }) => ({
        letter,
        concepts: list
          .filter((c) => {
            if (eraFilter !== "all" && c.era !== eraFilter) return false;
            if (!q) return true;
            const era = eras.find((e) => e.id === c.era);
            return (
              c.name.toLowerCase().includes(q) ||
              c.tagline.toLowerCase().includes(q) ||
              c[level].toLowerCase().includes(q) ||
              c.tags.some((t) => t.includes(q)) ||
              (era?.name.toLowerCase().includes(q) ?? false)
            );
          })
          .sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter((g) => g.concepts.length > 0);
  }, [query, level, eraFilter]);

  const total = grouped.reduce((n, g) => n + g.concepts.length, 0);

  const scrollToLetter = (letter: string) => {
    document.getElementById(`glossary-${letter}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-grid noise pt-16">
      <Navbar />
      <Footer />

      {/* Header */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">
              The <span className="gradient-text">Glossary</span>
            </h1>
            <p className="text-white/40 max-w-2xl mb-8">
              Every term in the dataset, A–Z. One tap to expand at the depth you want, with the
              era it belongs to and its sources. Start here if you arrived looking up one word.
            </p>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter 60 terms…"
                  aria-label="Filter glossary terms"
                  className="w-full pl-10 pr-4 py-2.5 glass rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={eraFilter}
                  onChange={(e) => setEraFilter(e.target.value)}
                  aria-label="Filter by era"
                  className="glass rounded-lg px-3 py-2 text-xs bg-transparent text-white/60 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0a0a14]">All eras</option>
                  {eras.map((era) => (
                    <option key={era.id} value={era.id} className="bg-[#0a0a14]">
                      {era.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1 glass rounded-xl p-1">
                  {(["simple", "deeper", "deepest"] as Level[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={`level-toggle px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                        level === l ? "active" : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/25">
              {total} term{total === 1 ? "" : "s"}
              {query && ` matching “${query}”`}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Letter rail */}
      <div className="sticky top-16 z-30 bg-[#050508]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 py-2.5 overflow-x-auto">
            {grouped.map(({ letter }) => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className="w-7 h-7 rounded-md text-[11px] font-mono font-medium text-white/50 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors shrink-0"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms */}
      <section className="py-10 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {grouped.map(({ letter, concepts: list }) => (
            <div key={letter} id={`glossary-${letter}`} className="mb-10 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-3xl font-bold text-white/10">{letter}</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <div className="space-y-2">
                {list.map((concept) => {
                  const era = eras.find((e) => e.id === concept.era);
                  const conceptSources = concept.sources
                    .map((id) => sources.find((s) => s.id === id))
                    .filter(Boolean);

                  return (
                    <motion.details
                      key={concept.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="glass rounded-xl overflow-hidden group"
                    >
                      <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: era?.color ?? "#8b5cf6" }}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-display text-[15px] font-semibold group-open:text-cyan-300 transition-colors">
                            {concept.name}
                          </span>
                          <span className="hidden sm:inline text-xs text-white/30 ml-2">
                            {concept.tagline}
                          </span>
                        </div>
                        {era && (
                          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-white/25 shrink-0">
                            <Clock className="w-3 h-3" />
                            {era.years}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/20 shrink-0 group-open:rotate-90 transition-transform" />
                      </summary>

                      <div className="px-4 pb-4 pl-7">
                        <p className="text-sm text-white/60 leading-relaxed">{concept[level]}</p>

                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          {concept.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30"
                            >
                              {t}
                            </span>
                          ))}
                          <span className="text-[10px] text-white/20 ml-1">{concept.year}</span>
                        </div>

                        {conceptSources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/5">
                            <div className="text-[10px] uppercase tracking-wider text-white/25 mb-2">
                              Sources
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {conceptSources.map((s) => {
                                if (!s) return null;
                                const Icon = kindIcons[s.kind] ?? FileText;
                                return (
                                  <a
                                    key={s.id}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md bg-white/5 text-white/40 hover:text-white/70 transition-colors"
                                    title={`${s.title} — ${s.author}`}
                                  >
                                    <Icon
                                      className="w-3 h-3"
                                      style={{ color: sourceKindColors[s.kind] }}
                                    />
                                    {s.kind}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <Link
                          href={`/timeline?concept=${concept.id}`}
                          className="inline-flex items-center gap-1 mt-3 text-[11px] text-cyan-400/70 hover:text-cyan-300 transition-colors"
                        >
                          Open in the timeline
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.details>
                  );
                })}
              </div>
            </div>
          ))}

          {total === 0 && (
            <div className="text-center py-20 text-white/30">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              No terms match that filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
