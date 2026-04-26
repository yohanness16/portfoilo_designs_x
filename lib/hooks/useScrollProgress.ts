"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrollProgress {
  progress: number; // 0 to 1 across the whole page
  elementProgress: number | null; // 0 to 1 within a target element (null if no target)
  scrollY: number;
}

export function useScrollProgress(
  targetRef?: React.RefObject<HTMLElement | null>
): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    elementProgress: targetRef ? 0 : null,
    scrollY: 0,
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const scrollY = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollY / docHeight : 0;

        let elementProgress: number | null = null;
        if (targetRef?.current) {
          const rect = targetRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          // Element enters from bottom, exits at top
          const elementTop = rect.top;
          const elementHeight = rect.height;
          const rawProgress =
            (viewportHeight - elementTop) / (viewportHeight + elementHeight);
          elementProgress = Math.max(0, Math.min(1, rawProgress));
        }

        setState({ progress, elementProgress, scrollY });
      });
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [targetRef]);

  return state;
}
