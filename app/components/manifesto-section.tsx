"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { sectionX } from "@/lib/site-layout";
import { useTranslations } from "@/lib/i18n/locale-provider";
import { ManifestoRainRipples } from "./manifesto-rain-ripples";
import { SectionReveal } from "./section-reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const VIEWPORT_AMOUNT = 0.4;
const REVEAL_DELAY_MS = 3000;
const BG_DELAY_MS = 1000;
const FADE_DURATION = 0.82;
const ERASER_DURATION = 3.4;

const CHINESE = "複雜性";
const FRENCH = "Systèmes peu clairs";

const eraserClipHidden = "inset(0 100% 100% 0 round 1px)";
const eraserClipFull = "inset(0 0 0 0 round 1px)";

const eraserClipSteps = [
  eraserClipHidden,
  "inset(0 68% 72% 0 round 1px)",
  "inset(0 42% 48% 0 round 1px)",
  "inset(0 14% 18% 0 round 1px)",
  eraserClipFull,
] as const;

function flickerStyle(index: number, base = 9.5) {
  const duration = base + (index % 5) * 2.2;
  const delay = -(index * 2.1 + (index % 3) * 1.2);
  return {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  } as const;
}


function EmphasisLine({
  shimmer = false,
  prefix,
  core,
}: {
  shimmer?: boolean;
  prefix: string;
  core: string;
}) {
  return (
    <span className={`manifesto-emphasis-gradient${shimmer ? " is-shimmering" : ""}`}>
      <span className="manifesto-emphasis-prefix">{prefix}</span>
      <span className="manifesto-emphasis-core">{core}</span>
      {shimmer ? <span className="manifesto-emphasis-shimmer-beam" aria-hidden /> : null}
    </span>
  );
}

function ManifestoSignature({ show }: { show: boolean }) {
  const reduced = useReducedMotion();

  const inner = (
    <span className={`manifesto-signature__inner${show && !reduced ? " is-active" : ""}`}>
      <svg
        className="manifesto-signature__cursor"
        viewBox="0 0 24 24"
        aria-hidden
        fill="currentColor"
      >
        <path d="M6 2.5v16.8c0 .42.5.63.8.33l4.5-4.5a.5.5 0 0 1 .35-.14h6.4c.38 0 .57-.46.3-.72L6.5 2.2a.5.5 0 0 0-.5.3Z" />
      </svg>
      <span className="manifesto-signature__name">oceanou</span>
    </span>
  );

  if (reduced) {
    return show ? <div className="manifesto-signature">{inner}</div> : null;
  }

  return (
    <motion.div
      className="manifesto-signature"
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.82, ease, delay: show ? 0.4 : 0 }}
    >
      {inner}
    </motion.div>
  );
}

export function ManifestoSection() {
  const reduced = useReducedMotion();
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const hasWipedOnce = useRef(false);
  const isInView = useInView(sectionRef, { amount: VIEWPORT_AMOUNT, once: false });
  const [reveal, setReveal] = useState(false);
  const [bgReveal, setBgReveal] = useState(false);
  const [wipeFinished, setWipeFinished] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setBgReveal(false);
      return;
    }

    if (reduced) {
      setReveal(true);
      setBgReveal(true);
      setWipeFinished(true);
      return;
    }

    const bgId = window.setTimeout(() => setBgReveal(true), BG_DELAY_MS);

    if (hasWipedOnce.current) {
      setReveal(true);
      setWipeFinished(true);
    } else {
      const revealId = window.setTimeout(() => {
        setReveal(true);
        hasWipedOnce.current = true;
      }, REVEAL_DELAY_MS);
      return () => {
        window.clearTimeout(revealId);
        window.clearTimeout(bgId);
      };
    }

    return () => window.clearTimeout(bgId);
  }, [isInView, reduced]);

  const bgVisible = isInView && (reduced || bgReveal);

  const chineseChars = useMemo(() => CHINESE.split(""), []);
  const frenchUnits = useMemo(() => FRENCH.split(/(\s+)/).filter(Boolean), []);

  const emphasisClip = !reveal
    ? eraserClipHidden
    : wipeFinished
      ? eraserClipFull
      : [...eraserClipSteps];

  const emphasisTransition = wipeFinished
    ? { duration: 0 }
    : {
        duration: ERASER_DURATION,
        ease,
        times: [0, 0.32, 0.55, 0.78, 1] as const,
        delay: 0.12,
      };

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className={`manifesto-section scroll-mt-28 border-t border-[#e8dfd4]/90 bg-[#fffdf8] py-28 md:py-36 lg:py-44 ${sectionX}`}
      aria-label="Design manifesto"
    >
      <div className="manifesto-grain" aria-hidden />

      <div className="manifesto-sunlight" aria-hidden>
        <span className="manifesto-sunlight__ray manifesto-sunlight__ray--left" />
        <span className="manifesto-sunlight__ray manifesto-sunlight__ray--right" />
      </div>

      <ManifestoRainRipples />

      <motion.p
        className="manifesto-bg manifesto-bg--cn"
        aria-hidden
        initial={false}
        animate={{ opacity: bgVisible ? 1 : 0 }}
        transition={{ duration: FADE_DURATION, ease }}
      >
        {chineseChars.map((char, index) => (
          <span
            key={`cn-${char}-${index}`}
            className="manifesto-bg-unit"
            style={flickerStyle(index, 10)}
          >
            {char}
          </span>
        ))}
      </motion.p>

      <motion.p
        className="manifesto-bg manifesto-bg--fr"
        aria-hidden
        initial={false}
        animate={{ opacity: bgVisible ? 1 : 0 }}
        transition={{ duration: FADE_DURATION, ease }}
      >
        {frenchUnits.map((unit, index) => (
          <span
            key={`fr-${unit}-${index}`}
            className={`manifesto-bg-unit ${unit.trim() === "" ? "manifesto-bg-space" : ""}`}
            style={flickerStyle(index + 4, 11.5)}
          >
            {unit}
          </span>
        ))}
      </motion.p>

      <SectionReveal className="manifesto-inner">
        <div className="manifesto-statement">

          {reduced ? (
            <div className="manifesto-copy manifesto-copy--static">
              <p className="manifesto-line manifesto-line--lead">
                {t("manifesto.lead")}
              </p>
              <div className="manifesto-emphasis-group">
                <p className="manifesto-line manifesto-line--emphasis">
                  <EmphasisLine
                    shimmer
                    prefix={t("manifesto.emphasisPrefix")}
                    core={t("manifesto.emphasisCore")}
                  />
                </p>
                <div className="manifesto-signature-row">
                  <ManifestoSignature show />
                </div>
              </div>
            </div>
          ) : (
            <div className="manifesto-copy">
              <motion.p
                className="manifesto-line manifesto-line--lead"
                initial={false}
                animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: wipeFinished ? 0 : 0.88, ease }}
              >
                {t("manifesto.lead")}
              </motion.p>

              <div className="manifesto-emphasis-group">
                <div
                  className={`manifesto-eraser-wrap${wipeFinished ? " manifesto-eraser-wrap--done" : ""}`}
                >
                  <motion.p
                    className="manifesto-line manifesto-line--emphasis manifesto-eraser-text"
                    initial={false}
                    animate={{ clipPath: emphasisClip }}
                    transition={emphasisTransition}
                    onAnimationComplete={() => {
                      if (reveal && !wipeFinished) setWipeFinished(true);
                    }}
                  >
                    <EmphasisLine
                      shimmer={wipeFinished}
                      prefix={t("manifesto.emphasisPrefix")}
                      core={t("manifesto.emphasisCore")}
                    />
                  </motion.p>
                </div>

                <div className="manifesto-signature-row">
                  <ManifestoSignature show={wipeFinished} />
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
