"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function getIsTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia("(pointer: fine)").matches;
}

/**
 * Cursor Glow Effect
 * A subtle glowing orb that follows the cursor with spring physics.
 * Adds depth and interactivity to the entire page.
 * Only visible on non-touch devices. Hidden for reduced motion.
 */
export function CursorGlow() {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch] = useState(getIsTouchDevice);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, x, y]);

  if (prefersReduced || isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      aria-hidden="true"
      animate={{
        x: x.get() - 150,
        y: y.get() - 150,
        opacity: isVisible ? 0.15 : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
      style={{ x, y }}
    >
      <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-[80px]" />
    </motion.div>
  );
}
