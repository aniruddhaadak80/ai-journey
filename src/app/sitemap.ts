import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/timeline", priority: 0.9, freq: "monthly" as const },
    { path: "/course", priority: 0.9, freq: "monthly" as const },
    { path: "/graph", priority: 0.8, freq: "monthly" as const },
    { path: "/flowcharts", priority: 0.8, freq: "monthly" as const },
    { path: "/glossary", priority: 0.8, freq: "weekly" as const },
    { path: "/sources", priority: 0.7, freq: "weekly" as const },
    { path: "/people", priority: 0.7, freq: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
