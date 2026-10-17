"use client";

import { useCallback } from "react";
import { Check, BookOpen } from "lucide-react";
import { useReadingProgress } from "@/lib/use-reading-progress";

const DEPTHS: Array<[string, string]> = [
  ["simple", "Simple"],
  ["deeper", "Deeper"],
  ["deepest", "Deepest"],
];

interface ReadingBadgeProps {
  conceptId: string;
  compact?: boolean;
}

export function ReadingBadge({ conceptId, compact = false }: ReadingBadgeProps) {
  const { snapshot, toggle, completed, allRead } = useReadingProgress(conceptId);

  const onToggle = useCallback(
    (depth: string) => toggle(depth as "simple" | "deeper" | "deepest"),
    [toggle]
  );

  return (
    <div className={`flex flex-col gap-2 ${compact ? "gap-1" : ""}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-wider text-white/25">
          Reading progress
        </span>
        <span className="text-[10px] font-mono text-white/40">
          {completed}/3
        </span>
      </div>
      <div className="flex gap-1">
        {DEPTHS.map(([key, label]) => {
          const done = snapshot[key as keyof typeof snapshot];
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              aria-pressed={done}
              title={`Mark ${label} as read`}
              className={`flex-1 px-2 py-1.5 rounded text-[10px] font-medium transition-all border ${
                done
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                  : "bg-white/5 border-white/10 text-white/30 hover:bg-white/10"
              }`}
            >
              {done ? <Check className="w-3 h-3 mr-1" /> : ""}
              {label}
            </button>
          );
        })}
      </div>
      {allRead && !compact && (
        <div className="flex items-center gap-2 mt-1">
          <BookOpen className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400 font-medium">
            All depths read
          </span>
        </div>
      )}
    </div>
  );
}
