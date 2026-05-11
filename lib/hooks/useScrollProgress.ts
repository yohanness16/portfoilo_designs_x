import { useEffect, useState, useRef } from "react";

interface ScrollData {
  progress: number;
  direction: "up" | "down" | "none";
}

/**
 * Hook that tracks scroll progress using requestAnimationFrame.
 * Returns progress (0-1) and scroll direction.
 */
export function useScrollProgress() {
  const [data, setData] = useState<ScrollData>({ progress: 0, direction: "none" });
  const rafId = useRef<number>();
  const lastScrollY = useRef(0;

  useEffect(() => {
    const tick = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      const direction = scrollTop > lastScrollY.current ? "down" as const : scrollTop < lastScrollY.current ? "up" as const : "none" as const;

      lastScrollY.current = scrollTop;
      setData({ progress, direction });
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return data;
}
