"use client";

import { useMemo, useState } from "react";
import { concepts, type Concept } from "@/data/content";
import { Scale, List } from "lucide-react";

const conceptOptions = [...concepts].sort((a, b) => a.name.localeCompare(b.name));

const eraLabel = (eraId: string) =>
  eraId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function ComparePage() {
  const [leftId, setLeftId] = useState<string>("transformer");
  const [rightId, setRightId] = useState<string>("attention");

  const left = concepts.find((c) => c.id === leftId);
  const right = concepts.find((c) => c.id === rightId);

  const sharedTags = useMemo(
    () => (left?.tags ?? []).filter((t) => (right?.tags ?? []).includes(t)),
    [left, right]
  );

  const leftColor = "#22d3ee";
  const rightColor = "#8b5cf6";

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="w-5 h-5 text-cyan-400" />
          <h1 className="font-display text-xl font-bold tracking-tight">
            Concept Comparison
          </h1>
        </div>
        <p className="text-xs text-white/40 ml-4">
          Two ideas, one dataset — see how they sit side by side.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Picker row */}
        <div className="glass rounded-2xl p-5 mb-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <ConceptPicker
              side="Left"
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
            />
            <div className="flex items-center gap-2 px-4 py-1 text-white/40 text-sm">
              vs
            </div>
            <ConceptPicker
              side="Right"
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
            />
          </div>
        </div>

        {!left || !right ? (
          <div className="text-center text-white/40 py-20">
            <List className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Select two concepts to compare.</p>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-2 gap-6">
              {conceptCard(left, leftColor)}
              {conceptCard(right, rightColor)}
            </div>

            {/* Shared tags callout */}
            {sharedTags.length > 0 && (
              <div className="mt-8 glass rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30">
                    What they share
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sharedTags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white border border-cyan-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function ConceptPicker({
  side,
  value,
  onChange,
}: {
  side: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-wider text-white/30">
        {side}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
      >
        {conceptOptions.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function conceptCard(c: Concept, accentColor: string) {
  const eraName = eraLabel(c.era);
  return (
    <article
      className="glass rounded-2xl p-6 relative overflow-hidden border border-white/10"
      style={{
        borderLeftColor: accentColor,
        borderLeftWidth: "4px",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-white/40">
          {eraName}
        </span>
        <span className="text-xs text-white/30">{c.year}</span>
      </div>
      <h2 className="font-display text-2xl font-bold mb-2">{c.name}</h2>
      <p className="text-white/70 text-sm leading-relaxed mb-4">{c.tagline}</p>

      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-wider text-white/25 mb-1 block">
          Depth levels
        </span>
        {((["simple", "deeper", "deepest"] as const) as Array<"simple" | "deeper" | "deepest">).map((key) => (
          <div
            key={key}
            className="border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-sm font-medium text-white">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className="text-[10px] text-white/30 font-mono">
                {c[key].length} chars
              </span>
            </div>
            <p
              className={`text-xs text-white/50 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300`}
            >
              {c[key]}
            </p>
          </div>
        ))}
      </div>

      {c.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[10px] uppercase tracking-wider text-white/25 mb-2 block">
            Tags
          </span>
          {c.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/40 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <footer className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/30">
        <List className="w-3 h-3" />
        <span>{c.sources.length} source(s)</span>
      </footer>
    </article>
  );
}
