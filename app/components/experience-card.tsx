"use client";

import { motion, useReducedMotion } from "framer-motion";

export type ExperienceCardProps = {
  title: string;
  company: string;
  period: string;
  description: string;
  index: number;
};

export function ExperienceCard({
  title,
  company,
  period,
  description,
  index,
}: ExperienceCardProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex gap-6 md:gap-8">
      <div className="flex w-5 shrink-0 justify-center pt-1 md:w-6 md:pt-1.5" aria-hidden>
        <motion.div
          className="h-3 w-3 rounded-full border border-[#b8a99a]/55 bg-[#fffdf8] shadow-[0_0_0_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(42,38,34,0.08)] md:h-3.5 md:w-3.5"
          initial={false}
          whileHover={
            reduced
              ? undefined
              : { scale: 1.1, boxShadow: "0 0 0 1px rgba(255,255,255,0.95), 0 4px 14px rgba(42,38,34,0.12)" }
          }
        />
      </div>

      <motion.article
        className="group relative flex-1 rounded-2xl border border-[#ebe3d7] bg-[#fffdf8]/90 p-6 shadow-[0_12px_40px_-28px_rgba(42,38,34,0.08)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-[#c4b8aa]/80 hover:shadow-[0_20px_56px_-32px_rgba(42,38,34,0.12)] md:p-8"
        initial={false}
        whileHover={
          reduced
            ? undefined
            : { y: -3, transition: { type: "spring", stiffness: 420, damping: 28 } }
        }
      >
        <div className="relative">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#a89888]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-sans text-xl font-semibold tracking-tight text-[#2a2622] md:text-2xl">
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#5a6d5a]">{company}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8a827a]">{period}</p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6f6760] md:text-[0.95rem]">
            {description}
          </p>
        </div>
      </motion.article>
    </div>
  );
}
