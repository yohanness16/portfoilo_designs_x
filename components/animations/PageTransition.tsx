"use client";

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASING } from "@/lib/animation";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "fade" | "scale";
}

const variants = {
  default: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

function getInitialPathname(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/**
 * Page Transition Wrapper
 * Wraps page content with AnimatePresence for smooth route transitions.
 * Supports multiple transition variants.
 * Falls back to static rendering when prefers-reduced-motion is active.
 */
export function PageTransition({
  children,
  className = "",
  variant = "default",
}: PageTransitionProps) {
  const prefersReduced = useReducedMotion();
  const [pathname] = useState(getInitialPathname);
  const selectedVariant = variants[variant];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={`${className} will-change-transform`}
        variants={selectedVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: DURATION.normal,
          ease: EASING.smooth,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
