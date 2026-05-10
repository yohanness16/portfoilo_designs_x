import { useEffect, useState, useCallback } from "react";
import { throttle } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks the user's mouse position with throttling.
 * Uses passive event listeners for performance.
 */
export function useMousePosition(throttleMs = 16): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    }, throttleMs),
    [throttleMs]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
