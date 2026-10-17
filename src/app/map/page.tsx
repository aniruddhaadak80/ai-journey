"use client";

import { useMemo, useState, useCallback } from "react";
import { Filter, Globe, ArrowRight } from "lucide-react";
import { eras, mapLocations } from "@/data/content";

const ERA_ALL = "all";

export default function MapPage() {
  const [eraFilter, setEraFilter] = useState<string>(ERA_ALL);
  const [hovered, setHovered] = useState<string | null>(null);

  const locations = useMemo(
    () =>
      eraFilter === ERA_ALL
        ? mapLocations
        : mapLocations.filter((l) => l.era === eraFilter),
    [eraFilter]
  );

  const eraList = useMemo(
    () => [...new Set(mapLocations.map((l) => l.era))].sort(
      (a, b) => eras.find((e) => e.id === a)?.index ?? 999 -
        (eras.find((e) => e.id === b)?.index ?? 999)
    ),
    []
  );

  const project = useCallback(
    (lat: number, lng: number, w: number, h: number) => ({
      x: ((lng + 180) / 360) * w,
      y: ((90 - lat) / 180) * h,
    }),
    []
  );

  const era = (id: string) => eras.find((e) => e.id === id);

  const active = hovered ?? null;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-cyan-400" />
          <h1 className="font-display text-xl font-bold tracking-tight">
            AI on the Map
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEraFilter(ERA_ALL)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              eraFilter === ERA_ALL
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
            }`}
          >
            All eras
          </button>
          {eraList.map((id) => {
            const e = era(id);
            if (!e) return null;
            return (
              <button
                key={id}
                onClick={() => setEraFilter(id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  eraFilter === id
                    ? `bg-${e.color}/10 text-white border-${e.color}/40`
                    : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                }`}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </header>

      <main className="relative px-6 py-8">
        {/* Map canvas */}
        <div
          className="relative w-full max-w-4xl aspect-[16/9] mx-auto bg-white/3 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          style={{ position: "relative" }}
        >
          <svg
            className="w-full h-full block"
            viewBox="0 0 960 540"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={`World map showing ${locations.length} AI milestones, ${locations.length === 0 ? "none for this filter" : "listed below the map"}`}
          >
            {/* Ocean */}
            <rect width="960" height="540" fill="#0b0c10" />
            {/* Graticule: longitude lines */}
            {[150, 120, 90, 60, 30, 0, -30, -60, -90, -120, -150].map((lng) => (
              <line
                key={lng}
                x1={((lng + 180) / 360) * 960}
                y1={0}
                x2={((lng + 180) / 360) * 960}
                y2={540}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            ))}
            {/* Graticule: latitude lines */}
            {[60, 30, 0, -30, -60].map((lat) => (
              <line
                key={lat}
                x1={0}
                y1={((90 - lat) / 180) * 540}
                x2={960}
                y2={((90 - lat) / 180) * 540}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            ))}
            {/* Continent labels (stylized map) */}
            {[
              { label: "NORTH AMERICA", lat: 45, lng: -100 },
              { label: "SOUTH AMERICA", lat: -18, lng: -60 },
              { label: "EUROPE", lat: 54, lng: 15 },
              { label: "AFRICA", lat: 2, lng: 20 },
              { label: "ASIA", lat: 38, lng: 100 },
              { label: "OCEANIA", lat: -24, lng: 135 },
              { label: "ANTARCTICA", lat: -82, lng: 0 },
            ].map((c) => {
              const { x, y } = project(c.lat, c.lng, 960, 540);
              return (
                <text
                  key={c.label}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.14)"
                  fontSize={10}
                  fontFamily="var(--font-mono), monospace"
                  letterSpacing="0.06em"
                  pointerEvents="none"
                >
                  {c.label}
                </text>
              );
            })}
            {/* Pins */}
            {locations.map((loc) => {
              const e = era(loc.era);
              const { x, y } = project(loc.lat, loc.lng, 960, 540);
              const isActive = active === loc.id;
              return (
                <g
                  key={loc.id}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setHovered(isActive ? null : loc.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Generous invisible hit area so pins stay clickable
                      where locations cluster (e.g. Cambridge, MA). */}
                  <circle cx={x} cy={y} r={14} fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 7 : 5}
                    fill={e ? e.color : "#22d3ee"}
                    stroke="white"
                    strokeWidth={2}
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 11 : 8}
                    fill="none"
                    stroke={e ? e.color : "#22d3ee"}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={isActive ? 0.5 : 0.25}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
          {/* Empty state */}
          {locations.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 text-sm">
              <Filter className="w-8 h-8 mb-2 opacity-40" />
              No locations for this era yet.
            </div>
          )}
        </div>

        {/* Milestone list — the map's text equivalent. Every place name is
            rendered here, so the content is reachable without a pointer and
            is present in the static HTML for crawlers. */}
        <h2 className="sr-only">AI milestones by location</h2>
        <ul className="mt-6 max-w-3xl mx-auto grid sm:grid-cols-2 gap-3">
          {locations.map((loc) => {
            const e = era(loc.era);
            const isActive = active === loc.id;
            return (
              <li key={loc.id}>
                <button
                  onClick={() => setHovered(isActive ? null : loc.id)}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-expanded={isActive}
                  className={`w-full text-left glass rounded-xl p-4 transition-all ${
                    isActive
                      ? "border-cyan-500/50 bg-white/5"
                      : "hover:bg-white/5"
                  }`}
                  style={{ borderLeft: `4px solid ${e?.color ?? "#22d3ee"}` }}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-display text-sm font-semibold text-white">
                      {loc.label}
                    </span>
                    <span className="text-xs font-mono text-white/30">
                      {loc.year}
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/25 mb-1.5">
                    {e?.name ?? "Unknown era"}
                  </div>
                  <p
                    className={`text-xs text-white/55 leading-relaxed ${
                      isActive ? "" : "line-clamp-2"
                    }`}
                  >
                    {loc.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-cyan-400/70">
                    Open in timeline <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className="border-t border-white/5 mt-12 px-6 py-8 text-xs text-white/30 flex items-center justify-between">
        <span>
          Equirectangular projection · pins placed by latitude/longitude ·
          {locations.length} milestones
        </span>
        <span>Stylised map — not to scale for navigation</span>
      </footer>
    </div>
  );
}
