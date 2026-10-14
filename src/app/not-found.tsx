import Link from "next/link";
import { Home, Compass } from "lucide-react";

const suggestions = [
  { href: "/timeline", label: "The Timeline", hint: "12 eras, 1936 → 2026+" },
  { href: "/glossary", label: "The Glossary", hint: "all 60 terms, A–Z" },
  { href: "/graph", label: "The Knowledge Graph", hint: "how ideas connect" },
  { href: "/sources", label: "The Source Library", hint: "96 papers & videos" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-grid noise flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="font-display text-7xl font-bold gradient-text mb-4">404</div>
        <h1 className="font-display text-2xl font-bold mb-2">
          Lost in the possibility space
        </h1>
        <p className="text-sm text-white/40 mb-8">
          This route doesn&apos;t exist. The good news: every real page is one
          step away.
        </p>

        <div className="grid sm:grid-cols-2 gap-2 mb-8">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="glass rounded-xl p-4 text-left card-hover group"
            >
              <div className="flex items-center gap-2 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                <Compass className="w-3.5 h-3.5 text-white/30" />
                {s.label}
              </div>
              <div className="text-xs text-white/30 mt-1">{s.hint}</div>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
