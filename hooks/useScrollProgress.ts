import { useEffect, useState, useCallback } from "react";
import { throttle } from "@/lib/utils";

interface ScrollData {
  progress: number;
  direction: "up" | "down" | "none";
}

/**
 * Hook that tracks scroll progress (0-1) and direction.
 * Throttled for performance.
 */
export function useScrollProgress(throttleMs = 16): ScrollData {
  const [data, setData] = useState<ScrollData>({ progress: 0, direction: "none" });

  const handleScroll = useCallback(
    throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setData((prev) => ({
        progress: Math.min(Math.max(progress, 0), 1),
        direction: scrollTop > (prev.progress * docHeight) ? "down" : scrollTop < (prev.progress * docHeight) ? "up" : prev.direction,
      }));
    }, throttleMs),
    [throttleMs]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return data;
}
