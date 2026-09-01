"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const headlineClass =
  "about-quote-headline mt-6 mb-10 font-serif text-[2rem] font-medium leading-[1.5] tracking-tight text-[#2a2622] md:mt-8 md:mb-12 md:text-5xl md:leading-[1.4]";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
} as const;

const lineVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease },
  },
} as const;

type AboutQuoteProps = {
  line1: string;
  line2: string;
};

export function AboutQuote({ line1, line2 }: AboutQuoteProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h3 className={headlineClass}>
        <span className="relative z-[1] block">{line1}</span>
        <span className="relative z-[1] mt-1 block md:mt-2">
          <span className="about-quote-highlight">{line2}</span>
        </span>
      </h3>
    );
  }

  return (
    <motion.h3
      className={headlineClass}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={container}
    >
      <span className="about-quote-aurora" aria-hidden />
      <motion.span className="about-quote-line relative z-[1] block" variants={lineVariants}>
        {line1}
      </motion.span>
      <motion.span className="relative z-[1] mt-1 block md:mt-2" variants={lineVariants}>
        <span className="about-quote-highlight about-quote-highlight--shine">{line2}</span>
      </motion.span>
    </motion.h3>
  );
}
