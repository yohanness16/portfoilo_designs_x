"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook to track mouse position relative to an element or the viewport.
 * Used for 3D card tilt and magnetic cursor effects.
 * Uses requestAnimationFrame for 60fps performance.
 */
export function useMousePosition<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) {
        rafId.current = null;
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized position: -1 to 1 from center
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setPosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
      rafId.current = null;
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ref, position, isHovering };
}
