"use client";

import { MotionConfig } from "motion/react";

/**
 * Single-source wrapper that makes every `motion.*` component on the site
 * honour the visitor's prefers-reduced-motion setting (Lighthouse a11y).
 * Rendered once in the root layout so individual pages never have to think
 * about it.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
