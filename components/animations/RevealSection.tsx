"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING, REVEAL } from "@/lib/animation";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * Scroll-Triggered Reveal Section
 * Animates children from a hidden state (translated + scaled + transparent)
 * to their natural position when they enter the viewport.
 * Uses IntersectionObserver for performance.
 * Falls back to static rendering when prefers-reduced-motion is active.
 */
export function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = REVEAL.distance,
  duration = REVEAL.duration,
  threshold = 0.1,
  once = true,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold, once });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { y: 0, x: distance };
      case "right":
        return { y: 0, x: -distance };
      case "none":
        return { y: 0, x: 0 };
    }
  };

  const initial = getInitialPosition();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...initial, scale: REVEAL.scale }}
        animate={
          isInView
            ? { opacity: 1, y: 0, x: 0, scale: 1 }
            : { opacity: 0, ...initial, scale: REVEAL.scale }
        }
        transition={{
          duration,
          delay,
          ease: EASING.decelerate,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
