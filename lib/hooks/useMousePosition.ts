import { useEffect, useState, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks mouse position using requestAnimationFrame for smooth updates.
 * Optimized for animation-heavy use cases.
 */
export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const latestEvent = useRef<MouseEvent | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestEvent.current = e;
    };

    const tick = () => {
      if (latestEvent.current) {
        setPosition({ x: latestEvent.current.clientX, y: latestEvent.current.clientY });
        latestEvent.current = null;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return position;
}
