"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "@/lib/i18n/locale-provider";

const ease = [0.16, 1, 0.3, 1] as const;

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

type HeroFlipTextProps = {
  className?: string;
  words: readonly string[];
};

function FlipWord({ word, color }: { word: string; color: string }) {
  return (
    <span
      className="relative inline-grid overflow-hidden align-baseline [grid-template-areas:'flip']"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="invisible whitespace-nowrap [grid-area:flip]" aria-hidden>
        {word}
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

export function HeroFlipText({ className, words }: HeroFlipTextProps) {
  const reduced = useReducedMotion();
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  const flipItems = useMemo(
    () => words.map((word, i) => ({ word, color: FLIP_COLORS[i % FLIP_COLORS.length] })),
    [words],
  );

  useEffect(() => {
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % flipItems.length);
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [flipItems.length, reduced]);

  const current = flipItems[index] ?? flipItems[0];

  return (
    <span className={`inline-flex items-baseline gap-[0.2em] ${className ?? ""}`.trim()}>
      <span className="shrink-0 text-[#e8f4ff]/95">{t("hero.into")}</span>
      {reduced ? (
        <span style={{ color: flipItems[0].color }}>{flipItems[0].word}</span>
      ) : (
        <FlipWord word={current.word} color={current.color} />
      )}
    </span>
  );
}
