/**
 * Animation constants and utility functions.
 * Centralized timing, easing, and configuration for consistent motion design.
 */

// Duration constants (in seconds for GSAP, ms for Framer Motion)
export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  dramatic: 1.0,
} as const;

// Easing curves — using cubic-bezier for natural motion
export const EASING = {
  // Standard ease for most UI transitions
  standard: [0.4, 0, 0.2, 1],
  // Decelerate — elements entering the viewport
  decelerate: [0, 0, 0.2, 1],
  // Accelerate — elements leaving
  accelerate: [0.4, 0, 1, 1],
  // Spring-like bounce for playful micro-interactions
  spring: [0.34, 1.56, 0.64, 1],
  // Smooth ease-in-out for continuous motion
  smooth: [0.45, 0.05, 0.55, 0.95],
} as const;

// Stagger delays for sequential animations
export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
  dramatic: 0.2,
} as const;

// 3D card tilt configuration
export const TILT = {
  maxRotation: 15, // degrees
  perspective: 1000, // px
  scale: 1.05,
  speed: 400, // ms for return transition
} as const;

// Parallax speed multipliers for depth layers
export const PARALLAX = {
  deep: 0.2,
  background: 0.4,
  midground: 0.7,
  foreground: 1.0,
  float: 1.3,
} as const;

// Scroll-triggered reveal defaults
export const REVEAL = {
  distance: 60, // px to translate from
  scale: 0.95,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
} as const;

/**
 * Convert degrees to radians
 */
export const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;

/**
 * Linear interpolation between two values
 */
export const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * t;

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Map a value from one range to another
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
