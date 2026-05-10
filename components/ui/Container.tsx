import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerElement = "div" | "section" | "article" | "main" | "header" | "footer" | "nav" | "aside";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: ContainerElement;
}

/**
 * Responsive container with consistent max-width and padding.
 * Supports polymorphic rendering via the `as` prop.
 */
export function Container({
  children,
  className,
  size = "lg",
  as: Element = "div",
}: ContainerProps) {
  const sizes = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Element
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizes[size],
        className
      )}
    >
      {children}
    </Element>
  );
}
