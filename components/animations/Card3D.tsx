"use client";

import { type ReactNode, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TILT } from "@/lib/animation";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
  scale?: number;
}

/**
 * 3D Tilt Card Component
 * Applies mouse-tracking perspective transforms to create a 3D tilt effect.
 * Uses Framer Motion springs for smooth, physics-based motion.
 * Respects prefers-reduced-motion — renders static when reduced.
 */
export function Card3D({
  children,
  className = "",
  maxRotation = TILT.maxRotation,
  perspective = TILT.perspective,
  scale = TILT.scale,
}: Card3DProps) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Spring physics for smooth tilt return
  const rotateXSpring = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateYSpring = useSpring(0, { stiffness: 300, damping: 25 });
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 25 });

  // Transform mouse position to rotation values
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
  }

  function handleMouseLeave() {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
    scaleSpring.set(1);
  }

  // Static fallback for reduced motion
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
    </motion.div>
  );
}
