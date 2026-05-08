"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed: number; // 0 = stationary, 1 = normal scroll, >1 = faster than scroll
  className?: string;
}

/**
 * Individual parallax layer that moves at a different speed than the page scroll.
 * Uses Framer Motion's useScroll and useTransform for GPU-accelerated parallax.
 */
function ParallaxLayer({ children, speed, className = "" }: ParallaxLayerProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to translateY based on speed
  // Speed 0 = no movement, 1 = normal, >1 = faster
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${(speed - 1) * -50}%`, `${(speed - 1) * 50}%`]
  );

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxHeroProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Multi-layer Parallax Hero Section
 * Creates depth by moving layers at different speeds on scroll.
 *
 * Usage:
 *   <ParallaxHero>
 *     <ParallaxLayer speed={0.2}>Background gradient</ParallaxLayer>
 *     <ParallaxLayer speed={0.5}>Floating shapes</ParallaxLayer>
 *     <ParallaxLayer speed={1.0}>Main content</ParallaxLayer>
 *     <ParallaxLayer speed={1.3}>Foreground accent</ParallaxLayer>
 *   </ParallaxHero>
 */
export function ParallaxHero({ children, className = "" }: ParallaxHeroProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

export { ParallaxLayer };
