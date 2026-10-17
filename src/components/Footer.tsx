import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import { getSiteUrl } from "@/lib/site";

const GITHUB_URL = "https://github.com/aniruddhaadak80/ai-journey";

/** Inline GitHub mark — lucide v1 dropped brand icons. */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.9 0-.85.3-1.53.79-2.07-.08-.2-.34-.98.08-2.04 0 0 .64-.21 2.1.81a7.3 7.3 0 0 1 3.82 0c1.46-1.02 2.1-.81 2.1-.81.42 1.06.16 1.84.08 2.04.49.54.79 1.22.79 2.07 0 2.03-1.14 2.7-2.92 2.9.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

const sections = [
  { href: "/timeline", label: "Timeline" },
  { href: "/graph", label: "Knowledge Graph" },
  { href: "/course", label: "Course" },
  { href: "/flowcharts", label: "Flowcharts" },
  { href: "/glossary", label: "Glossary" },
  { href: "/map", label: "Map" },
  { href: "/compare", label: "Compare" },
  { href: "/sources", label: "Sources" },
  { href: "/people", label: "People" },
];

export default function Footer() {
  const siteUrl = getSiteUrl();

  return (
    <footer className="relative z-10 border-t border-white/5 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-display font-semibold gradient-text">AI Journey</span>
            </div>
            <p className="text-xs text-white/30">
              The complete interactive history of artificial intelligence.
            </p>
          </div>

          {/* links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-xs text-white/40 hover:text-cyan-300 transition-colors"
              >
                {s.label}
              </Link>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
            >
              <GitHubMark className="w-3 h-3" />
              GitHub
            </a>
            <a
              href={`${siteUrl}/sitemap.xml`}
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Sitemap
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/20">
          <span>
            Built by{" "}
            <a
              href="https://github.com/aniruddhaadak80"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              Aniruddha Adak
            </a>
          </span>
          <span className="inline-flex items-center gap-1">
            Every source linked <Heart className="w-2.5 h-2.5 text-pink-500/60" fill="currentColor" />
          </span>
        </div>
      </div>
    </footer>
  );
}
