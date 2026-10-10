"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Baby,
  Sun,
  Snowflake,
  Brain,
  TrendingUp,
  Flame,
  Zap,
  Rocket,
  Bot,
  Infinity as InfinityIcon,
  ChevronDown,
  ExternalLink,
  Play,
  FileText,
  BookOpen,
  PenLine,
  Newspaper,
  Library,
  Mic,
  Code,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LucideIcon } from "lucide-react";
import { eras, getConceptsForEra, getSourcesForEra, type Level, sourceKindColors } from "@/data/content";

const eraIcons: Record<string, LucideIcon> = {
  dream: Sparkles,
  birth: Baby,
  golden: Sun,
  winter1: Snowflake,
  expert: Brain,
  winter2: Snowflake,
  quiet: TrendingUp,
  "deep-learning": Flame,
  transformer: Zap,
  llm: Rocket,
  agents: Bot,
  present: InfinityIcon,
};

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

const levelOrder: Level[] = ["simple", "deeper", "deepest"];

export default function TimelinePage() {
  const [expandedEra, setExpandedEra] = useState<string | null>(null);
  const [level, setLevel] = useState<Level>("simple");
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

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
              The <span className="gradient-text">Timeline</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto mb-8">
              Scroll through 90 years of AI history. Click any era to expand its concepts, milestones, and sources.
            </p>

            {/* Level toggle */}
            <div className="inline-flex items-center gap-1 glass rounded-xl p-1">
              {levelOrder.map((l) => (
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

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-12">
            {eras.map((era, i) => {
              const Icon = eraIcons[era.icon] || Sparkles;
              const isExpanded = expandedEra === era.id;
              const concepts = getConceptsForEra(era.id);
              const sources = getSourcesForEra(era.id);
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={era.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex ${isLeft ? "sm:justify-start" : "sm:justify-end"}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                    style={{ borderColor: era.color, backgroundColor: isExpanded ? era.color : "#050508" }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] glass rounded-2xl overflow-hidden card-hover ${
                      isExpanded ? "animate-border-glow" : ""
                    }`}
                  >
                    {/* Era header */}
                    <button
                      onClick={() => setExpandedEra(isExpanded ? null : era.id)}
                      className="w-full p-6 text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${era.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: era.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-white/30">ERA {era.index + 1}</span>
                            <span className="text-xs text-white/20">•</span>
                            <span className="text-xs text-white/30">{era.years}</span>
                          </div>
                          <h3 className="font-display text-xl font-bold mb-1">{era.name}</h3>
                          <p className="text-sm text-white/40">{era.tagline}</p>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-white/30 transition-transform shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
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
                          <div className="px-6 pb-6 space-y-6">
                            {/* Summary */}
                            <p className="text-sm text-white/50 leading-relaxed">{era.summary}</p>

                            {/* Milestones */}
                            <div>
                              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                                Key Milestones
                              </h4>
                              <div className="space-y-3">
                                {era.milestones.map((m, j) => (
                                  <div key={j} className="flex gap-3">
                                    <span
                                      className="font-mono text-xs font-bold shrink-0 mt-0.5"
                                      style={{ color: era.color }}
                                    >
                                      {m.year}
                                    </span>
                                    <div>
                                      <div className="text-sm font-medium">{m.title}</div>
                                      <div className="text-xs text-white/40">{m.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Concepts */}
                            {concepts.length > 0 && (
                              <div>
                                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                                  Concepts
                                </h4>
                                <div className="space-y-2">
                                  {concepts.map((concept) => {
                                    const isConceptExpanded = expandedConcept === concept.id;
                                    return (
                                      <div key={concept.id} className="glass rounded-xl overflow-hidden">
                                        <button
                                          onClick={() => setExpandedConcept(isConceptExpanded ? null : concept.id)}
                                          className="w-full px-4 py-3 text-left flex items-center justify-between"
                                        >
                                          <div>
                                            <span className="text-sm font-medium">{concept.name}</span>
                                            <span className="text-xs text-white/30 ml-2">{concept.tagline}</span>
                                          </div>
                                          <ChevronDown
                                            className={`w-3.5 h-3.5 text-white/20 transition-transform ${
                                              isConceptExpanded ? "rotate-180" : ""
                                            }`}
                                          />
                                        </button>
                                        <AnimatePresence>
                                          {isConceptExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              className="overflow-hidden"
                                            >
                                              <div className="px-4 pb-4">
                                                <div className="text-sm text-white/60 leading-relaxed">
                                                  {level === "simple" && concept.simple}
                                                  {level === "deeper" && concept.deeper}
                                                  {level === "deepest" && concept.deepest}
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                  {concept.tags.map((tag) => (
                                                    <span
                                                      key={tag}
                                                      className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40"
                                                    >
                                                      {tag}
                                                    </span>
                                                  ))}
                                                </div>
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Sources */}
                            {sources.length > 0 && (
                              <div>
                                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                                  Sources
                                </h4>
                                <div className="space-y-2">
                                  {sources.map((source) => {
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
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
