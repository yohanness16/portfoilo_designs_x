"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  underlineColor?: string;
}

/**
 * Animated Link Component
 * Features an underline that slides in from left on hover.
 * Uses Framer Motion for smooth spring-based animation.
 */
export function AnimatedLink({
  href,
  children,
  className = "",
  underlineColor = "bg-violet-500",
}: AnimatedLinkProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      {children}
      <motion.span
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${underlineColor}`}
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.a>
  );
}
