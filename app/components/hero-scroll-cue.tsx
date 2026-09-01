"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/locale-provider";

function scrollToWork(reduced: boolean) {
  const target = document.getElementById("work");
  if (!target) return;
  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}

export function HeroScrollCue() {
  const reduced = useReducedMotion();
  const t = useTranslations();

  const icon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_1px_4px_rgba(20,55,85,0.12)]"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <motion.div className="absolute inset-x-0 bottom-6 z-30 flex justify-center md:bottom-8">
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollToWork(!!reduced);
        }}
        className="flex flex-col items-center gap-1 rounded-sm text-[#2d4f66]/85 outline-none transition-colors hover:text-[#1e3a50] focus-visible:text-[#1e3a50] focus-visible:ring-2 focus-visible:ring-[#2d4f66]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-label={t("hero.scrollAria")}
      >
        {reduced ? (
          <span className="inline-flex">{icon}</span>
        ) : (
          <motion.span
            className="inline-flex"
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2.75,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {icon}
          </motion.span>
        )}
        <span className="text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#4a6578]/75">{t("hero.scroll")}</span>
      </a>
    </motion.div>
  );
}
