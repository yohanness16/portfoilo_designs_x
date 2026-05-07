"use client";

import { type ReactNode, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TILT } from "@/lib/animation";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

/**
 * 3D Tilt Card Component
 * Applies mouse-tracking perspective transforms to create a 3D tilt effect.
 * Optional glare effect for added depth.
 * Uses Framer Motion springs for smooth, physics-based motion.
 * Respects prefers-reduced-motion.
 */
export function Card3D({
  children,
  className = "",
  maxRotation = TILT.maxRotation,
  perspective = TILT.perspective,
  scale = TILT.scale,
  glare = true,
}: Card3DProps) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const rotateXSpring = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateYSpring = useSpring(0, { stiffness: 300, damping: 25 });
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(rotateYSpring, (v) => -v * maxRotation);
  const rotateY = useTransform(rotateXSpring, (v) => v * maxRotation);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    rotateXSpring.set(normalizedX);
    rotateYSpring.set(normalizedY);
    scaleSpring.set(scale);

    if (glare) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    }
  }

  function handleMouseLeave() {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
    scaleSpring.set(1);
    setGlarePosition({ x: 50, y: 50 });
  }

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${className} will-change-transform`}
      style={{
        perspective,
        rotateX,
        rotateY,
        scale: scaleSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-20"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
