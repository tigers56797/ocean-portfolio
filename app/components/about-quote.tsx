"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const headlineClass =
  "about-quote-headline mt-6 mb-10 font-serif text-[2rem] font-medium leading-[1.5] tracking-tight text-[#2a2622] md:mt-8 md:mb-12 md:text-5xl md:leading-[1.4]";

// 逐字打字動畫，每個字符帶小跳動
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

type TypedLineProps = {
  text: string;
  startIndex: number; // 全域字符 index 偏移，讓第二行接續第一行的 delay
  className?: string;
  wrapperClassName?: string;
  isHighlight?: boolean;
};

function TypedLine({ text, startIndex, className, wrapperClassName, isHighlight }: TypedLineProps) {
  return (
    <motion.span
      className={wrapperClassName}
      whileHover={{ y: -5, transition: { duration: 0.3, ease } }}
    >
      {text.split("").map((char, i) => {
        const inner = (
          <motion.span
            key={i}
            custom={startIndex + i}
            variants={charVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        );
        return inner;
      })}
    </motion.span>
  );
}

type AboutQuoteProps = {
  line1: string;
  line2: string;
};

export function AboutQuote({ line1, line2 }: AboutQuoteProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });

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
      ref={ref}
      className={headlineClass}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <span className="about-quote-aurora" aria-hidden />

      {/* 第一行：逐字打出 */}
      <TypedLine
        text={line1}
        startIndex={0}
        wrapperClassName="about-quote-line relative z-[1] block"
      />

      {/* 第二行：接續第一行的 delay，highlight 底色 */}
      <motion.span
        className="relative z-[1] mt-1 block md:mt-2"
        whileHover={{ y: -5, transition: { duration: 0.3, ease } }}
      >
        <span className="about-quote-highlight about-quote-highlight--shine">
          {line2.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={line1.length + i}
              variants={charVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.span>
    </motion.h3>
  );
}
