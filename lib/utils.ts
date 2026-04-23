/**
 * General utility functions.
 */

/**
 * Conditionally join class names together.
 * Simplified version of clsx/classnames.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Delay execution for a specified duration.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique ID string.
 */
export function uid(): string {
  return Math.random().toString(36).substring(2, 11);
}
