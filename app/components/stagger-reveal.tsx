"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

const viewport = { once: false, amount: 0.18 } as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: easeOut },
  },
} as const;

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child (seconds). */
  stagger?: number;
  /** Delay before first child animates. */
  delayChildren?: number;
} & Pick<ComponentPropsWithoutRef<"div">, "id">;

export function StaggerReveal({
  children,
  className,
  stagger = 0.11,
  delayChildren = 0.06,
  id,
}: StaggerRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
