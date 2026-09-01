"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "@/lib/i18n/locale-provider";
import { messages } from "@/lib/i18n/messages";
import { HeroFlipText } from "./hero-flip-text";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.88, ease },
  },
} as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
} as const;

const headlineClass =
  "text-center font-serif text-[clamp(2.75rem,7vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white drop-shadow-[0_1px_28px_rgba(15,60,100,0.18)]";

/** Headline orchestrates its own entrance (fade + stagger) after pill / subtitle. */
const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
  hover: {},
} as const;

/** After pill (0.06) + subtitle (~0.16) — headline block enters. */
const headlineEnterDelay = 0.2;

/** After headline lines finish (~1s + stagger). */
const descriptionEnterDelay = 1.32;

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

type HeroContentProps = {
  className?: string;
};

export function HeroContent({ className }: HeroContentProps) {
  const reduced = useReducedMotion();
  const t = useTranslations();
  const locale = useLocale();
  const flipWords = messages[locale].hero.flipWords;

  if (reduced) {
    return (
      <div className={className}>
        <div className="mb-10 flex w-full flex-col items-center gap-4">
          <span className="role-pill-shimmer inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-white/45 bg-white/25 px-4 py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/95 shadow-sm backdrop-blur-sm">
            <span className="relative z-[1] inline-flex items-center justify-center gap-2">
              {t("hero.pill")}
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ecf7e]" aria-hidden />
            </span>
          </span>
          <p className="max-w-md text-sm font-medium tracking-[0.08em] text-white/90 md:text-[0.95rem]">
            {t("hero.subtitle")}
          </p>
        </div>
        <h1 className={headlineClass}>
          <span className="block text-balance">{t("hero.headline")}</span>
          <span className="block font-normal italic">
            <HeroFlipText words={flipWords} />
          </span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/88 md:max-w-3xl md:text-xl">
          {t("hero.description")}
        </p>
      </div>
    );
  }

  return (
    <motion.div className={className} initial="hidden" animate="visible" variants={container}>
      <div className="mb-10 flex w-full flex-col items-center gap-4">
        <motion.span
          variants={fadeUp}
          className="role-pill-shimmer inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-white/45 bg-white/25 px-4 py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/95 shadow-sm backdrop-blur-sm"
        >
          <span className="relative z-[1] inline-flex items-center justify-center gap-2">
            {t("hero.pill")}
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ecf7e]" aria-hidden />
          </span>
        </motion.span>
        <motion.p
          variants={fadeUp}
          className="max-w-md text-sm font-medium tracking-[0.08em] text-white/90 md:text-[0.95rem]"
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>

      <motion.h1
        className={`${headlineClass} cursor-default`}
        initial="hidden"
        animate="visible"
        variants={headlineContainer}
        transition={{ delay: headlineEnterDelay }}
        whileHover="hover"
      >
        <motion.span className="block text-balance" variants={line1Variants}>
          {t("hero.headline")}
        </motion.span>
        <motion.span className="block font-normal italic" variants={line2Variants}>
          <HeroFlipText words={flipWords} />
        </motion.span>
      </motion.h1>

      <motion.p
        className="mt-10 max-w-2xl text-lg leading-relaxed text-white/88 md:max-w-3xl md:text-xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: descriptionEnterDelay }}
      >
        {t("hero.description")}
      </motion.p>
    </motion.div>
  );
}
