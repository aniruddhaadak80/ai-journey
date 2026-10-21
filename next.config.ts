import type { NextConfig } from "next";

/**
 * The baseline security headers, checked against the live deployment with
 * `curl -I` before being added here: Vercel sets HSTS itself, and nothing else
 * in this list was present.
 *
 * - `nosniff` stops a browser from second-guessing a content type;
 * - `Referrer-Policy` keeps full URLs out of third-party referrers while still
 *   telling same-origin navigation where the reader came from;
 * - `X-Frame-Options` refuses framing outright — the atlas is not a widget;
 * - `Permissions-Policy` switches off device APIs the site never calls.
 *
 * Deliberately absent: a Content-Security-Policy. A strict one needs tuning
 * against the runtime and a permissive one is decoration, so it is a decision
 * for its own change.
 */
const securityHeaders: Array<{ key: string; value: string }> = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The framework name in every response is free reconnaissance; nothing needs it.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
