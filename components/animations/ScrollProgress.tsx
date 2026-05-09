"use client";

import { motion, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollProgressProps {
  className?: string;
  barColor?: string;
  height?: number;
}

/**
 * Scroll Progress Indicator
 * Fixed bar at the top of the page showing scroll progress.
 * Uses spring physics for smooth updates.
 * Hidden when prefers-reduced-motion is active.
 */
export function ScrollProgress({
  className = "",
  barColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  height = 3,
}: ScrollProgressProps) {
  const progress = useScrollProgress();
  const prefersReduced = useReducedMotion();

  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });

  if (prefersReduced) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
    >
      <motion.div
        className={`h-full w-full origin-left ${barColor}`}
        style={{ scaleX }}
      />
    </div>
  );
}
