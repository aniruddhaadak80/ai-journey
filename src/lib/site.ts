/**
 * Single source of truth for the canonical site URL.
 *
 * On Vercel, NEXT_PUBLIC_SITE_URL is set as an env var in project settings.
 * Locally it falls back to localhost so `next build` never fails on a missing var.
 *
 * The explicit value is trimmed and stripped of every trailing slash: this
 * string is concatenated with paths (`${base}${path}` in the sitemap,
 * `${getSiteUrl()}/sitemap.xml` in robots.txt), and one stray slash turns every
 * advertised URL into a double-slashed one that looks fine in a browser and is
 * wrong to a crawler.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProject = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProject) return `https://${vercelProject}`;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}
