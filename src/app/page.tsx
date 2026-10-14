"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Clock,
  Network,
  BookOpen,
  GitBranch,
  Library,
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  ChevronDown,
  BookMarked,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { eras as erasData } from "@/data/content";

const modes = [
  {
    href: "/timeline",
    icon: Clock,
    title: "Interactive Timeline",
    description:
      "Scroll through 90 years of AI history — from Turing's dream to the age of agents. Each era expands with concepts, papers, and videos.",
    color: "from-cyan-400 to-blue-500",
    glow: "glow-cyan",
  },
  {
    href: "/graph",
    icon: Network,
    title: "Knowledge Graph",
    description:
      "Explore the connections between every concept, person, and paper. Pan, zoom, and click through the web of AI.",
    color: "from-violet-400 to-purple-500",
    glow: "glow-violet",
  },
  {
    href: "/course",
    icon: BookOpen,
    title: "Structured Course",
    description:
      "A step-by-step curriculum from 'what is AI?' to the frontier of reasoning agents. Three depth levels for every topic.",
    color: "from-pink-400 to-rose-500",
    glow: "glow-pink",
  },
  {
    href: "/flowcharts",
    icon: GitBranch,
    title: "Visual Flowcharts",
    description:
      "See how everything works — neural network training, transformers, RLHF, agents, diffusion, and RAG — as interactive diagrams.",
    color: "from-amber-400 to-orange-500",
    glow: "",
  },
  {
    href: "/sources",
    icon: Library,
    title: "Source Library",
    description:
      "Every paper, video, blog, essay, and article referenced in the journey. Filter by era, type, or search.",
    color: "from-emerald-400 to-green-500",
    glow: "",
  },
  {
    href: "/glossary",
    icon: BookMarked,
    title: "Glossary",
    description:
      "All 60 terms A–Z, expandable at the depth you want. Start here if you arrived looking up one word.",
    color: "from-sky-400 to-blue-500",
    glow: "",
  },
  {
    href: "/people",
    icon: Users,
    title: "People",
    description:
      "Twelve researchers, what each actually contributed, and where to hear it from them directly.",
    color: "from-orange-400 to-amber-500",
    glow: "",
  },
];

const stats = [
  { value: "12", label: "Eras", icon: Clock },
  { value: "60", label: "Concepts", icon: Brain },
  { value: "96", label: "Sources", icon: Library },
  { value: "6", label: "Flowcharts", icon: GitBranch },
  { value: "11", label: "Chapters", icon: BookOpen },
  { value: "12", label: "People", icon: Users },
];

// Derived from the data layer so the preview can never drift from the timeline.
const eras = erasData.map((e) => ({
  name: e.name.replace(/^The /, ""),
  years: e.years,
  color: e.color,
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-grid noise">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-cyan-300 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            The Complete Interactive History of AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            The Journey
            <br />
            <span className="gradient-text">to AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12"
          >
            From Turing&apos;s dream in 1936 to autonomous agents in 2026 — explore
            every era, concept, paper, and breakthrough in one interactive experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/timeline"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <Clock className="w-4 h-4" />
              Start the Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/course"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-white/80 font-semibold hover:text-white hover:border-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Take the Course
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-white/20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 py-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-5 text-center card-hover"
                >
                  <Icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Modes ── */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Seven Ways to <span className="gradient-text">Explore</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Each mode is a different lens on the same story. Combine them for the full picture.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modes.map((mode, i) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={mode.href}
                    className={`glass rounded-2xl p-6 block h-full card-hover ${mode.glow}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{mode.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{mode.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Era preview ── */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              12 Eras. <span className="gradient-text">One Story.</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              From the dream of artificial minds to the age of autonomous agents.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {eras.map((era, i) => (
              <motion.div
                key={era.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 card-hover"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: era.color }}
                />
                <span className="text-sm font-medium">{era.name}</span>
                <span className="text-xs text-white/30">{era.years}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Explore?</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto mb-10">
              Every paper, video, and essay is linked. Read, watch, and learn at your own pace.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/timeline"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Zap className="w-4 h-4" />
                Begin the Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/graph"
                className="flex items-center gap-2 px-8 py-4 rounded-xl glass text-white/80 font-semibold hover:text-white hover:border-white/20 transition-all"
              >
                <Network className="w-4 h-4" />
                Explore the Graph
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
