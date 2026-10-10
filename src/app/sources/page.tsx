"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  ExternalLink,
  Play,
  FileText,
  BookOpen,
  PenLine,
  Newspaper,
  Library,
  Mic,
  Code,
  Filter,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sources, eras, sourceKindColors } from "@/data/content";
import { filterSources, countByKind, distinctKinds } from "@/lib/filter-sources";

const kindIcons: Record<string, LucideIcon> = {
  paper: FileText,
  video: Play,
  blog: PenLine,
  essay: BookOpen,
  article: Newspaper,
  book: Library,
  talk: Mic,
  code: Code,
};

export default function SourcesPage() {
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [eraFilter, setEraFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year" | "title">("year");

  const kinds = ["all", ...distinctKinds(sources)];

  // No manual useMemo: the React Compiler auto-memoizes these pure calls,
  // and `preserve-manual-memoization` rejects hand-rolled versions.
  const filtered = filterSources(sources, {
    search,
    kind: kindFilter,
    era: eraFilter,
    sortBy,
  });

  const stats = countByKind(sources);

  return (
    <div className="min-h-screen bg-grid noise pt-16">
      <Navbar />

      {/* Header */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Source <span className="gradient-text">Library</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto">
              Every paper, video, blog, essay, and article referenced in the journey.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(stats).map(([kind, count]) => {
              const Icon = kindIcons[kind] || FileText;
              return (
                <div key={kind} className="glass rounded-xl px-3 py-2 flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" style={{ color: sourceKindColors[kind] }} />
                  <span className="text-xs text-white/50">{count}</span>
                  <span className="text-xs capitalize" style={{ color: sourceKindColors[kind] }}>
                    {kind}s
                  </span>
                </div>
              );
            })}
          </div>

          {/* Search & Filters */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search papers, videos, authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 glass rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/30"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 text-xs text-white/30 mr-2">
                <Filter className="w-3 h-3" />
                Filters:
              </div>

              {/* Kind filter */}
              <select
                value={kindFilter}
                onChange={(e) => setKindFilter(e.target.value)}
                className="glass rounded-lg px-3 py-1.5 text-xs bg-transparent text-white/60 focus:outline-none cursor-pointer"
              >
                {kinds.map((k) => (
                  <option key={k} value={k} className="bg-[#0a0a14]">
                    {k === "all" ? "All types" : k.charAt(0).toUpperCase() + k.slice(1)}
                  </option>
                ))}
              </select>

              {/* Era filter */}
              <select
                value={eraFilter}
                onChange={(e) => setEraFilter(e.target.value)}
                className="glass rounded-lg px-3 py-1.5 text-xs bg-transparent text-white/60 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#0a0a14]">All eras</option>
                {eras.map((era) => (
                  <option key={era.id} value={era.id} className="bg-[#0a0a14]">
                    {era.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "year" | "title")}
                className="glass rounded-lg px-3 py-1.5 text-xs bg-transparent text-white/60 focus:outline-none cursor-pointer"
              >
                <option value="year" className="bg-[#0a0a14]">Newest first</option>
                <option value="title" className="bg-[#0a0a14]">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-sm text-white/30 mb-6">
            {filtered.length} source{filtered.length !== 1 ? "s" : ""} found
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((source, i) => {
              const KindIcon = kindIcons[source.kind] || FileText;
              const era = eras.find((e) => e.id === source.era);

              return (
                <motion.a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  className="glass rounded-xl p-4 card-hover group block"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${sourceKindColors[source.kind]}15` }}
                    >
                      <KindIcon
                        className="w-4 h-4"
                        style={{ color: sourceKindColors[source.kind] }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {source.title}
                      </h3>
                      <div className="text-xs text-white/30 mt-1">
                        {source.author} · {source.year}
                      </div>
                      <p className="text-xs text-white/25 mt-1.5 line-clamp-2">
                        {source.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full capitalize"
                          style={{
                            backgroundColor: `${sourceKindColors[source.kind]}10`,
                            color: sourceKindColors[source.kind],
                          }}
                        >
                          {source.kind}
                        </span>
                        {era && (
                          <span className="text-xs text-white/20">{era.name}</span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white/10 group-hover:text-white/30 shrink-0 mt-1" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No sources match your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
