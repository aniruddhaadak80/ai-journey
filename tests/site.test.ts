import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { getSiteUrl } from "../src/lib/site";

/**
 * The canonical URL is consumed by robots.txt, the sitemap and the metadata
 * base, so the failure mode is silent: a wrong URL here does not break a page,
 * it teaches a crawler the wrong page exists. The precedence ladder is pinned
 * here rather than discovered from a Vercel diff.
 */
const KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
] as const;

// Captured once, before any test mutates the environment, so restore is exact.
const originals: Record<string, string | undefined> = Object.fromEntries(
  KEYS.map((key) => [key, process.env[key]])
);

beforeEach(() => {
  for (const key of KEYS) delete process.env[key];
});

afterEach(() => {
  for (const key of KEYS) {
    const value = originals[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("getSiteUrl", () => {
  test("prefers NEXT_PUBLIC_SITE_URL over every Vercel fallback", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://ai-journey.example";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "ai-journey.vercel.app";
    process.env.VERCEL_URL = "ai-journey-git-main.vercel.app";
    expect(getSiteUrl()).toBe("https://ai-journey.example");
  });

  test("trims whitespace and strips a single trailing slash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = " https://ai-journey.example/ ";
    expect(getSiteUrl()).toBe("https://ai-journey.example");
  });

  test("strips every trailing slash, not just the last one", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://ai-journey.example///";
    expect(getSiteUrl()).toBe("https://ai-journey.example");
  });

  test("treats an empty or whitespace-only explicit value as unset", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "   ";
    process.env.VERCEL_URL = "ai-journey-git-main.vercel.app";
    expect(getSiteUrl()).toBe("https://ai-journey-git-main.vercel.app");
  });

  test("falls back to the Vercel production domain", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "ai-journey.vercel.app";
    expect(getSiteUrl()).toBe("https://ai-journey.vercel.app");
  });

  test("prefers the production domain over the deployment URL", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "ai-journey.vercel.app";
    process.env.VERCEL_URL = "ai-journey-git-main.vercel.app";
    expect(getSiteUrl()).toBe("https://ai-journey.vercel.app");
  });

  test("falls back to the deployment URL", () => {
    process.env.VERCEL_URL = "ai-journey-git-main.vercel.app";
    expect(getSiteUrl()).toBe("https://ai-journey-git-main.vercel.app");
  });

  test("falls back to localhost when nothing is set", () => {
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });
});
