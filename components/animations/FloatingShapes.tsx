"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Canvas3D = lazy(() => import("./Canvas3D"));

/**
 * Floating 3D Background Shapes
 * Renders animated geometric shapes in the background.
 * Falls back to CSS-only animation for reduced motion or when WebGL unavailable.
 */
export function FloatingShapes() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-fuchsia-500/5 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        }
      >
        <Canvas3D />
      </Suspense>
    </div>
  );
}
