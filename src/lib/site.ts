/**
 * Single source of truth for the canonical site URL.
 *
 * On Vercel, NEXT_PUBLIC_SITE_URL is set as an env var in project settings.
 * Locally it falls back to localhost so `next build` never fails on a missing var.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProject = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProject) return `https://${vercelProject}`;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}
