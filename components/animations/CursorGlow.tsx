"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [isIdle, setIsIdle] = useState(false);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      setIsIdle(false);
    },
    [isVisible, x, y]
  );

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetIdle = () => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      idleTimer = setTimeout(() => setIsIdle(true), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", resetIdle, { passive: true });
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", resetIdle);
      document.removeEventListener("mouseleave", () => setIsVisible(false));
      document.removeEventListener("mouseenter", () => setIsVisible(true));
      clearTimeout(idleTimer);
    };
  }, [handleMouseMove]);

  if (prefersReduced || isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      aria-hidden="true"
      animate={{
        x: x.get() - 150,
        y: y.get() - 150,
        opacity: isVisible ? (isIdle ? 0.08 : 0.15) : 0,
      }}
      transition={{ opacity: { duration: 0.5 } }}
      style={{ x, y }}
    >
      <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-[80px]" />
    </motion.div>
  );
}
