"use client";

import { useEffect, useState } from "react";

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hook to detect user's reduced motion preference.
 * Returns true if the user prefers reduced motion.
 * All animations should check this before applying motion effects.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(getInitialReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
