"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASING, STAGGER } from "@/lib/animation";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animation?: "fadeUp" | "fadeIn" | "slideIn" | "scaleIn";
  stagger?: number;
  delay?: number;
}

/**
 * Animated Text Component
 * Reveals text with per-character or per-word stagger animations.
 * Triggers on viewport entry via IntersectionObserver.
 */
export function AnimatedText({
  text,
  className = "",
  as: Tag = "h1",
  animation = "fadeUp",
  stagger = STAGGER.tight,
  delay = 0,
}: AnimatedTextProps) {
  const prefersReduced = useReducedMotion();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const words = text.split(" ");

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.normal, ease: EASING.decelerate },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: DURATION.normal, ease: EASING.standard },
      },
    },
    slideIn: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.normal, ease: EASING.decelerate },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.normal, ease: EASING.spring },
      },
    },
  };

  const chosenVariant = childVariants[animation];

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        ref={ref}
        className="inline-flex flex-wrap"
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            variants={chosenVariant}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
