"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Clock,
  ExternalLink,
  Play,
  FileText,
  BookOpen as BookIcon,
  PenLine,
  Newspaper,
  Library,
  Mic,
  Code,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { chapters, getConcept, getSource, eras, type Level, sourceKindColors } from "@/data/content";

const kindIcons: Record<string, LucideIcon> = {
  paper: FileText,
  video: Play,
  blog: PenLine,
  essay: BookIcon,
  article: Newspaper,
  book: Library,
  talk: Mic,
  code: Code,
};

const levelColors: Record<Level, string> = {
  simple: "#10b981",
  deeper: "#f59e0b",
  deepest: "#ef4444",
};

export default function CoursePage() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [level, setLevel] = useState<Level>("simple");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = (completed.size / chapters.length) * 100;

  return (
    <div className="min-h-screen bg-grid noise pt-16">
      <Navbar />

      {/* Header */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              The <span className="gradient-text">Course</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto mb-8">
              A structured path from &quot;what is AI?&quot; to the frontier of reasoning agents. 11 chapters, 3 depth levels.
            </p>

            {/* Progress bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                <span>Progress</span>
                <span>{completed.size}/{chapters.length} chapters</span>
              </div>
              <div className="h-2 glass rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Level toggle */}
            <div className="inline-flex items-center gap-1 glass rounded-xl p-1">
              {(["simple", "deeper", "deepest"] as Level[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`level-toggle px-4 py-1.5 rounded-lg text-sm font-medium capitalize ${
                    level === l ? "active" : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {l === "simple" ? "Simple" : l === "deeper" ? "Deeper" : "Deepest"}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {chapters.map((chapter, i) => {
              const isExpanded = expandedChapter === chapter.id;
              const isCompleted = completed.has(chapter.id);
              const era = eras.find((e) => e.id === chapter.era);
              const concepts = chapter.conceptIds.map((id) => getConcept(id)).filter(Boolean);
              const sources = chapter.sources.map((id) => getSource(id)).filter(Boolean);

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`glass rounded-2xl overflow-hidden card-hover ${
                    isExpanded ? "animate-border-glow" : ""
                  }`}
                >
                  {/* Chapter header */}
                  <button
                    onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                    className="w-full p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      {/* Number */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0"
                        style={{
                          backgroundColor: `${era?.color}15`,
                          color: era?.color,
                        }}
                      >
                        {chapter.index}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-display text-lg font-semibold truncate">
                            {chapter.title}
                          </h3>
                          {isCompleted && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-white/40 truncate">{chapter.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:flex items-center gap-1 text-xs text-white/30">
                          <Clock className="w-3 h-3" />
                          {chapter.duration}
                        </span>
                        <span
                          className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${levelColors[chapter.level]}15`,
                            color: levelColors[chapter.level],
                          }}
                        >
                          {chapter.level}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white/30 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-6">
                          {/* Concepts */}
                          <div>
                            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                              What you&apos;ll learn
                            </h4>
                            <div className="space-y-3">
                              {concepts.map((concept) => {
                                if (!concept) return null;
                                return (
                                  <div key={concept.id} className="glass rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                                      <span className="text-sm font-semibold">{concept.name}</span>
                                      <span className="text-xs text-white/30">{concept.year}</span>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                      {level === "simple" && concept.simple}
                                      {level === "deeper" && concept.deeper}
                                      {level === "deepest" && concept.deepest}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {concept.tags.map((tag) => (
                                        <span
                                          key={tag}
                                          className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sources */}
                          {sources.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                                Read & Watch
                              </h4>
                              <div className="space-y-2">
                                {sources.map((source) => {
                                  if (!source) return null;
                                  const KindIcon = kindIcons[source.kind] || FileText;
                                  return (
                                    <a
                                      key={source.id}
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                      <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${sourceKindColors[source.kind]}15` }}
                                      >
                                        <KindIcon
                                          className="w-3.5 h-3.5"
                                          style={{ color: sourceKindColors[source.kind] }}
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium group-hover:text-cyan-300 transition-colors">
                                          {source.title}
                                        </div>
                                        <div className="text-xs text-white/30">
                                          {source.author} · {source.year}
                                        </div>
                                      </div>
                                      <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 shrink-0 mt-1" />
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Mark complete */}
                          <button
                            onClick={() => toggleComplete(chapter.id)}
                            className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                              isCompleted
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "glass text-white/50 hover:text-white/70"
                            }`}
                          >
                            {isCompleted ? "Completed" : "Mark as Complete"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
