"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin (only on client)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to initialize GSAP ScrollTrigger parallax on an element.
 * Apply data-speed attribute to control parallax speed (0.2 = slow, 1.5 = fast).
 *
 * Usage:
 *   const ref = useParallax();
 *   <div ref={ref}>
 *     <div data-speed="0.2">Background layer</div>
 *     <div data-speed="1.0">Normal layer</div>
 *     <div data-speed="1.5">Foreground layer</div>
 *   </div>
 */
export function useParallax<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const layers = el.querySelectorAll<HTMLElement>("[data-speed]");
    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed || "1");
        const yPercent = (speed - 1) * 100;

        gsap.to(layer, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // Use GPU-accelerated transforms
            invalidateOnRefresh: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook for scroll-triggered section reveals.
 * Animates children from hidden state to visible on viewport entry.
 *
 * Usage:
 *   const { ref, isInView } = useScrollReveal();
 *   <section ref={ref} className={isInView ? "visible" : ""}>...</section>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      // Animate the section container
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: [0, 0, 0.2, 1],
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger-animate direct children with data-reveal attribute
      const children = el.querySelectorAll<HTMLElement>("[data-reveal]");
      if (children.length > 0) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: [0, 0, 0.2, 1],
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook for horizontal scroll sections.
 * Translates a container horizontally as the user scrolls vertically.
 */
export function useHorizontalScroll<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const scrollWidth = el.scrollWidth - window.innerWidth;

      gsap.to(el, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export { gsap };
