"use client";

import { useEffect, useRef, useState } from "react";

export interface MousePosition {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
  rawX: number; // actual pixel value
  rawY: number;
}

const INITIAL: MousePosition = { x: 0, y: 0, rawX: 0, rawY: 0 };

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>(INITIAL);
  const rafId = useRef<number | null>(null);
  const latestEvent = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestEvent.current = { x: e.clientX, y: e.clientY };
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          if (!latestEvent.current) return;
          const { x, y } = latestEvent.current;
          setPosition({
            x: (x / window.innerWidth) * 2 - 1,
            y: (y / window.innerHeight) * 2 - 1,
            rawX: x,
            rawY: y,
          });
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return position;
}
