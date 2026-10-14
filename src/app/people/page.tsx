"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Award, Sparkles, ArrowUpDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { people, eras, getConcept, type Person } from "@/data/content";

const MAX_WEIGHT = 5;

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

/** Deterministic hue per person so the avatars stay stable across renders. */
const hueFor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
};

export default function PeoplePage() {
  const [eraFilter, setEraFilter] = useState("all");
  const [sort, setSort] = useState<"era" | "name" | "weight">("era");

  const sorted = useMemo(() => {
    const list = people.filter((p) => eraFilter === "all" || p.era === eraFilter);
    const eraIndex = new Map(eras.map((e) => [e.id, e.index]));
    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "weight") return b.weight - a.weight || a.name.localeCompare(b.name);
      return (eraIndex.get(a.era) ?? 0) - (eraIndex.get(b.era) ?? 0);
    });
  }, [eraFilter, sort]);

  // Only eras that actually have people, for the filter chips.
  const erasWithPeople = useMemo(
    () => eras.filter((e) => people.some((p) => p.era === e.id)),
    []
  );

  return (
    <div className="min-h-screen bg-grid noise pt-16">
      <Navbar />

      {/* Header */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">
              The <span className="gradient-text">People</span>
            </h1>
            <p className="text-white/40 max-w-2xl mb-8">
              The field is a set of arguments between identifiable people. Twelve of them, what each
              actually contributed, and where to hear it from them directly.
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setEraFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    eraFilter === "all"
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      : "glass text-white/40 hover:text-white/70"
                  }`}
                >
                  All eras
                </button>
                {erasWithPeople.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setEraFilter(era.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      eraFilter === era.id
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                        : "glass text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: era.color }}
                    />
                    {era.name.replace(/^The /, "")}
                  </button>
                ))}
              </div>

              <div className="sm:ml-auto flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-white/25" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  aria-label="Sort people"
                  className="glass rounded-lg px-3 py-2 text-xs bg-transparent text-white/60 focus:outline-none cursor-pointer"
                >
                  <option value="era" className="bg-[#0a0a14]">Chronological</option>
                  <option value="name" className="bg-[#0a0a14]">Name A–Z</option>
                  <option value="weight" className="bg-[#0a0a14]">Most contributions</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((person, i) => (
              <PersonCard key={person.id} person={person} index={i} />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20 text-white/30">No people in this era.</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  const era = eras.find((e) => e.id === person.era);
  const hue = hueFor(person.id);
  const concepts = person.conceptIds
    .map((id) => getConcept(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="glass rounded-2xl p-5 card-hover flex flex-col"
    >
      {/* Avatar + name */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-sm font-bold shrink-0"
          style={{
            backgroundImage: `linear-gradient(135deg, hsl(${hue} 70% 55% / 0.25), hsl(${(hue + 60) % 360} 70% 55% / 0.15))`,
            border: `1px solid hsl(${hue} 70% 60% / 0.35)`,
            color: `hsl(${hue} 80% 75%)`,
          }}
          aria-hidden="true"
        >
          {initials(person.name)}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold leading-tight truncate">
            {person.name}
          </h3>
          <p className="text-[11px] text-white/30 mt-0.5">{person.years}</p>
          <p className="text-xs text-white/50 mt-1 line-clamp-2">{person.role}</p>
        </div>
      </div>

      {/* Era + weight */}
      <div className="flex items-center justify-between mb-3">
        {era && (
          <span
            className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${era.color}18`,
              color: era.color,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: era.color }}
            />
            {era.name.replace(/^The /, "")}
          </span>
        )}
        <div className="flex items-center gap-0.5" title={`${person.weight} major contributions`}>
          {Array.from({ length: MAX_WEIGHT }).map((_, i) => (
            <Sparkles
              key={i}
              className="w-2.5 h-2.5"
              style={{
                color: i < person.weight ? era?.color ?? "#22d3ee" : "rgba(255,255,255,0.08)",
              }}
              fill={i < person.weight ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-white/55 leading-relaxed mb-4">{person.summary}</p>

      {/* Contributions */}
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider text-white/25 mb-2">
          Signature contributions
        </div>
        <ul className="space-y-1.5">
          {person.contributions.map((c, i) => (
            <li key={i} className="flex gap-2 text-xs text-white/50 leading-relaxed">
              <span className="text-white/20 shrink-0 mt-px">›</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Concept chips */}
      {concepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {concepts.map((c) => (
            <a
              key={c.id}
              href={`/timeline?concept=${c.id}`}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/35 hover:text-cyan-300 hover:bg-white/10 transition-colors"
            >
              {c.name}
            </a>
          ))}
        </div>
      )}

      {/* Link */}
      {person.link && (
        <a
          href={person.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-cyan-400/70 hover:text-cyan-300 transition-colors pt-3 border-t border-white/5"
        >
          Hear it from them
          <ExternalLink className="w-3 h-3" />
        </a>
      )}

      {!person.link && (
        <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-white/20">
          <Award className="w-3 h-3" />
          {person.contributions.length} contributions listed
        </div>
      )}
    </motion.article>
  );
}
