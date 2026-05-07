"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Lazy-load the 3D canvas to avoid SSR issues and reduce initial bundle
const Canvas3D = lazy(() => import("./Canvas3D"));

/**
 * Floating 3D Background Shapes
 * Renders animated geometric shapes in the background.
 * Falls back to CSS-only animation for reduced motion or when WebGL unavailable.
 */
export function FloatingShapes() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    // CSS-only subtle floating animation for reduced motion
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
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* CSS gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      {/* 3D Canvas with floating shapes */}
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
