import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  underlineColor?: string;
  external?: boolean;
}

export function AnimatedLink({
  href,
  children,
  className = "",
  underlineColor = "bg-violet-500",
  external = false,
}: AnimatedLinkProps) {
  const prefersReduced = useReducedMotion();

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (prefersReduced) {
    return (
      <a href={href} className={className} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover="hover"
      {...externalProps}
    >
      {children}
      <motion.span
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${underlineColor}`}
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.a>
  );
}
