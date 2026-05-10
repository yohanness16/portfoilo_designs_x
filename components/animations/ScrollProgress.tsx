"use client";

import { motion, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollProgressProps {
  className?: string;
  barColor?: string;
  height?: number;
  showPercentage?: boolean;
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
  showPercentage = false,
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
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <motion.div
        className={`h-full w-full origin-left ${barColor}`}
        style={{ scaleX }}
      />
      {showPercentage && (
        <span className="absolute right-2 top-2 text-[10px] text-zinc-400 font-mono">
          {Math.round(progress * 100)}%
        </span>
      )}
    </div>
  );
}
