"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const line1Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease },
  },
  hover: {
    opacity: 1,
    y: 0,
    x: -8,
    transition: { duration: 0.55, ease },
  },
} as const;

const line2Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease, delay: 0.12 },
  },
  hover: {
    opacity: 1,
    y: -5,
    x: 10,
    rotate: 0.7,
    transition: { duration: 0.55, ease },
  },
} as const;

const FLIP_COLORS = [
  "rgba(255, 238, 168, 0.84)",
  "rgba(158, 228, 162, 0.84)",
  "#D8F0D0",
] as const;

const DISPLAY_MS = 2500;
const TRANSITION_MS = 600;
const CYCLE_MS = DISPLAY_MS + TRANSITION_MS;

const flipTransition = {
  duration: TRANSITION_MS / 1000,
  ease,
} as const;

const flipVariants = {
  enter: {
    y: "100%",
    opacity: 0,
    filter: "blur(2px)",
  },
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: "-100%",
    opacity: 0,
    filter: "blur(2px)",
  },
} as const;

export type HeroFlipLine = {
  lead: string;
  into: string;
  word: string;
};

type HeroFlipTextProps = {
  className?: string;
  lines: readonly HeroFlipLine[];
};

function FlipWord({
  word,
  color,
  sizer,
}: {
  word: string;
  color: string;
  sizer: string;
}) {
  return (
    <span
      className="relative inline-grid overflow-hidden align-baseline [grid-template-areas:'flip']"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="invisible whitespace-nowrap [grid-area:flip]" aria-hidden>
        {sizer}
      </span>
      <span className="relative h-[1.05em] overflow-hidden [grid-area:flip]">
        <AnimatePresence initial={false}>
          <motion.span
            key={word}
            className="absolute inset-x-0 bottom-0 block whitespace-nowrap will-change-[transform,opacity,filter]"
            style={{ color }}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={flipTransition}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function HeroFlipText({ className, lines }: HeroFlipTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  const flipItems = useMemo(
    () =>
      lines.map((line, i) => ({
        ...line,
        color: FLIP_COLORS[i % FLIP_COLORS.length],
      })),
    [lines],
  );

  const longestLead = useMemo(
    () => lines.reduce((a, b) => (a.lead.length >= b.lead.length ? a : b)).lead,
    [lines],
  );
  const longestInto = useMemo(
    () => lines.reduce((a, b) => (a.into.length >= b.into.length ? a : b)).into,
    [lines],
  );
  const longestWord = useMemo(
    () => lines.reduce((a, b) => (a.word.length >= b.word.length ? a : b)).word,
    [lines],
  );

  useEffect(() => {
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % flipItems.length);
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [flipItems.length, reduced]);

  const current = flipItems[index] ?? flipItems[0];
  if (!current) return null;

  if (reduced) {
    const first = flipItems[0];
    return (
      <>
        <span className="block text-balance">{first.lead}</span>
        <span className="block font-normal italic">
          <span className="text-[#e8f4ff]/95">{first.into} </span>
          <span style={{ color: first.color }}>{first.word}</span>
        </span>
      </>
    );
  }

  return (
    <>
      <motion.span className="block text-balance" variants={line1Variants}>
        <FlipWord word={current.lead} color="inherit" sizer={longestLead} />
      </motion.span>
      <motion.span className="block font-normal italic" variants={line2Variants}>
        <span className="inline-flex items-baseline gap-[0.2em]">
          <FlipWord word={current.into} color="rgba(232, 244, 255, 0.95)" sizer={longestInto} />
          <FlipWord word={current.word} color={current.color} sizer={longestWord} />
        </span>
      </motion.span>
    </>
  );
}
