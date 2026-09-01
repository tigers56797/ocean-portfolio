"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";

/** Re-animates each time the block enters or leaves the viewport. */
const viewport = { amount: 0.18, once: false } as const;

/** Calm ease-out (no spring bounce). */
const easeOut = [0.16, 1, 0.3, 1] as const;

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger when multiple blocks share viewport (seconds). */
  delay?: number;
  /** lift = opacity + y; fade = opacity only (images, compact blocks). */
  variant?: "lift" | "fade";
} & Pick<ComponentPropsWithoutRef<"div">, "id" | "role" | "aria-labelledby" | "aria-label">;

const hiddenStates = {
  lift: { opacity: 0, y: 32 },
  fade: { opacity: 0 },
} as const;

const visibleStates = {
  lift: { opacity: 1, y: 0 },
  fade: { opacity: 1 },
} as const;

export function SectionReveal({
  children,
  className,
  delay = 0,
  variant = "lift",
  id,
  role,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, viewport);

  const shared = { className, id, role, "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel };

  if (reduced) {
    return (
      <div ref={ref} {...shared}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      {...shared}
      initial={hiddenStates[variant]}
      animate={inView ? visibleStates[variant] : hiddenStates[variant]}
      transition={{
        duration: variant === "fade" ? 0.55 : 0.82,
        ease: easeOut,
        delay: inView ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
