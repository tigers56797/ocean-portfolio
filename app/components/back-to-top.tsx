"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "@/lib/i18n/locale-provider";

const easeOut = [0.16, 1, 0.3, 1] as const;

type BackToTopProps = {
  /** contact = show near homepage footer; scroll = show after scrolling down */
  mode?: "contact" | "scroll";
  showAfterScroll?: number;
};

export function BackToTop({ mode = "contact", showAfterScroll = 480 }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const t = useTranslations();

  useEffect(() => {
    if (mode === "scroll") {
      const onScroll = () => {
        setVisible(window.scrollY > showAfterScroll);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const footer = document.getElementById("contact");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [mode, showAfterScroll]);

  const scrollToTop = () => {
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.38, ease: easeOut }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#ebe3d7]/95 bg-[#fffdf8]/92 text-[#2d4f66] shadow-[0_12px_40px_-20px_rgba(42,38,34,0.35)] backdrop-blur-md transition-[background-color,color,box-shadow] hover:border-[#ddd4c8] hover:bg-white hover:text-[#1e3a50] hover:shadow-[0_16px_48px_-18px_rgba(42,38,34,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b7355] sm:bottom-8 sm:right-8"
          aria-label={t("common.backToTop")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M6 15l6-6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
