"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const headlineClass =
  "about-quote-headline mt-6 mb-10 max-w-full font-serif font-medium leading-[1.35] tracking-tight text-[#2a2622] md:mt-8 md:mb-12 md:leading-[1.3]";

const lineClass = "relative z-[1] block w-max max-w-none whitespace-nowrap";

const charVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.045,
      duration: 0.35,
      ease,
    },
  }),
};

type AboutQuoteProps = {
  line1: string;
  line2: string;
};

export function AboutQuote({ line1, line2 }: AboutQuoteProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [shineReady, setShineReady] = useState(false);
  const [fontSize, setFontSize] = useState<string>("clamp(1.55rem, 3.8vw, 2.65rem)");

  // Force exactly two lines (one row each). Shrink font if the column is too narrow.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const available = parent.clientWidth;
      if (available <= 0) return;

      const base = Math.min(42.4, Math.max(24.8, window.innerWidth * 0.038)); // ~clamp mid
      el.style.fontSize = `${base}px`;

      const lines = el.querySelectorAll<HTMLElement>("[data-about-quote-line]");
      let widest = 0;
      lines.forEach((line) => {
        widest = Math.max(widest, line.scrollWidth);
      });
      if (widest <= 0) return;

      const next = Math.min(base, (base * available) / widest);
      const clamped = Math.max(22, next); // floor so it stays readable
      setFontSize(`${clamped}px`);
      el.style.fontSize = `${clamped}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [line1, line2]);

  useEffect(() => {
    if (!inView || reduced) return;
    const totalMs = (line1.length + line2.length) * 45 + 400;
    const id = window.setTimeout(() => setShineReady(true), totalMs);
    return () => window.clearTimeout(id);
  }, [inView, reduced, line1.length, line2.length]);

  if (reduced) {
    return (
      <h3 ref={ref} className={headlineClass} style={{ fontSize }}>
        <span className={lineClass} data-about-quote-line>
          {line1}
        </span>
        <span className={`${lineClass} mt-1 md:mt-2`} data-about-quote-line>
          <span className="about-quote-highlight">{line2}</span>
        </span>
      </h3>
    );
  }

  return (
    <motion.h3
      ref={ref}
      className={headlineClass}
      style={{ fontSize }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <span className="about-quote-aurora" aria-hidden />

      <motion.span
        className={`about-quote-line ${lineClass}`}
        data-about-quote-line
        whileHover={{ y: -5, transition: { duration: 0.3, ease } }}
      >
        {line1.split("").map((char, i) => (
          <motion.span
            key={`l1-${i}`}
            custom={i}
            variants={charVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>

      <motion.span
        className={`${lineClass} mt-1 md:mt-2${shineReady ? " about-quote-highlight--shine" : ""}`}
        data-about-quote-line
        whileHover={{ y: -5, transition: { duration: 0.3, ease } }}
      >
        {line2.split("").map((char, i) => (
          <motion.span
            key={`l2-${i}`}
            custom={line1.length + i}
            variants={charVariants}
            className="about-quote-highlight about-quote-highlight--char"
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </motion.h3>
  );
}
