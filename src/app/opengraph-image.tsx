import { ImageResponse } from "next/og";
import { eras, concepts, sources, chapters, flowcharts } from "@/data/content";

export const alt = "AI Journey — the complete interactive history of artificial intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const stats = [
    { v: String(eras.length), l: "Eras" },
    { v: String(concepts.length), l: "Concepts" },
    { v: String(sources.length), l: "Sources" },
    { v: String(chapters.length), l: "Chapters" },
    { v: String(flowcharts.length), l: "Flowcharts" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050508",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(34,211,238,0.22) 0%, transparent 42%), radial-gradient(circle at 88% 82%, rgba(139,92,246,0.22) 0%, transparent 45%)",
          padding: 68,
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #8b5cf6 55%, #ec4899 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z"
                fill="#050508"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
              AI Journey
            </div>
            <div style={{ fontSize: 17, color: "rgba(255,255,255,0.5)" }}>
              1936 → 2026 and beyond
            </div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            The Journey to AI
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 27,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.42,
              maxWidth: 900,
            }}
          >
            From Turing&apos;s question to autonomous agents — one interactive experience
            with every paper, video, and essay linked.
          </div>
        </div>

        {/* stats */}
        <div style={{ display: "flex", gap: 16 }}>
          {stats.map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 34px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.13)",
                backgroundColor: "rgba(255,255,255,0.045)",
                minWidth: 150,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 800, color: "#22d3ee" }}>{s.v}</div>
              <div style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
