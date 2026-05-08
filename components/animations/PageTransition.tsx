"use client";

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASING } from "@/lib/animation";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
};

function getInitialPathname(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/**
 * Page Transition Wrapper
 * Wraps page content with AnimatePresence for smooth route transitions.
 * Exit: fade out + slight scale down + slide up
 * Enter: fade in + slide up from below
 * Falls back to static rendering when prefers-reduced-motion is active.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();
  const [pathname] = useState(getInitialPathname);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={`${className} will-change-transform`}
        variants={pageVariants}
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
