"use client";

import { animate, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";

export type ExperienceStackItem = {
  title: string;
  company: string;
  period: string;
  description: string;
};

const SWIPE_THRESHOLD_PX = 72;
const VELOCITY_THRESHOLD = 420;
const EXIT_DISTANCE = 280;

/** Center card — full focus. */
const SLOT_FRONT = { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 } as const;

/**
 * Partial-reveal slots: ~18–20% of sibling width peeks past center card.
 * order[1] = next (reading right), order[2] = previous (left). Light scale + low rotation only (2D).
 */
const SLOT_RIGHT = { x: 76, y: 14, scale: 0.93, rotate: 0.65, opacity: 0.86, zIndex: 16 } as const;
const SLOT_LEFT = { x: -76, y: 14, scale: 0.93, rotate: -0.65, opacity: 0.86, zIndex: 16 } as const;

const SLOTS = [SLOT_FRONT, SLOT_RIGHT, SLOT_LEFT] as const;

function slotForDepth(depth: 0 | 1 | 2) {
  return SLOTS[depth];
}

function itemKey(item: ExperienceStackItem) {
  return `${item.company}-${item.period}`;
}

const springCalm = { type: "spring" as const, stiffness: 360, damping: 40, mass: 0.9 };
const springReturn = { type: "spring" as const, stiffness: 500, damping: 38, mass: 0.8 };
const springExit = { type: "spring" as const, stiffness: 400, damping: 42, mass: 0.88 };

function SwipeChevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M10 4 6 8l4 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SwipeCardHint({ visible }: { visible: boolean }) {
  const reduced = useReducedMotion();

  if (!visible) return null;

  const chevronClass = "h-3 w-3 shrink-0 text-[#c4b8aa]";

  return (
    <motion.p
      className="mb-5 flex items-center justify-center gap-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#a89888] md:mb-6"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      {reduced ? (
        <SwipeChevron className={chevronClass} />
      ) : (
        <motion.span
          className="inline-flex"
          animate={{ x: [-2, 0, -2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <SwipeChevron className={chevronClass} />
        </motion.span>
      )}
      <span>Swipe card</span>
      {reduced ? (
        <SwipeChevron className={`${chevronClass} rotate-180`} />
      ) : (
        <motion.span
          className="inline-flex rotate-180"
          animate={{ x: [2, 0, 2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <SwipeChevron className={chevronClass} />
        </motion.span>
      )}
    </motion.p>
  );
}

type ExperienceStackProps = {
  items: readonly ExperienceStackItem[];
};

export function ExperienceStack({ items }: ExperienceStackProps) {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const markInteracted = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const n = items.length;
  const frontIndex = order[0]!;

  const rotateForward = useCallback(() => {
    setOrder((o) => [o[1]!, o[2]!, o[0]!]);
  }, []);

  const rotateBackward = useCallback(() => {
    setOrder((o) => [o[2]!, o[0]!, o[1]!]);
  }, []);

  const bringToFront = useCallback(
    (expIndex: number) => {
      if (animatingRef.current || isAnimating) return;
      const depth = order.indexOf(expIndex);
      if (depth <= 0) return;
      markInteracted();
      if (depth === 1) {
        rotateForward();
      } else {
        rotateBackward();
      }
    },
    [isAnimating, markInteracted, order, rotateBackward, rotateForward],
  );

  const animatingRef = useRef(false);

  const handleDragEnd = useCallback(
    async (expIndex: number, info: PanInfo) => {
      if (animatingRef.current || expIndex !== frontIndex) return;
      if (reduced) return;

      const dirRaw = info.velocity.x !== 0 ? Math.sign(info.velocity.x) : Math.sign(info.offset.x);
      const shouldAdvance =
        dirRaw !== 0 &&
        (Math.abs(info.offset.x) > SWIPE_THRESHOLD_PX || Math.abs(info.velocity.x) > VELOCITY_THRESHOLD);

      const key = itemKey(items[expIndex]!);
      const el = refs.current[key];
      if (!el) return;

      const front = slotForDepth(0);

      if (!shouldAdvance) {
        await animate(
          el,
          { x: front.x, y: front.y, scale: front.scale, rotate: front.rotate, opacity: front.opacity },
          reduced ? { duration: 0.15 } : springReturn,
        );
        return;
      }

      markInteracted();
      const dir = dirRaw as 1 | -1;
      animatingRef.current = true;
      setIsAnimating(true);
      try {
        await animate(
          el,
          { x: dir * EXIT_DISTANCE, opacity: 0.78 },
          reduced ? { duration: 0.18 } : springExit,
        );
        if (dir > 0) {
          rotateForward();
        } else {
          rotateBackward();
        }
      } finally {
        animatingRef.current = false;
        setIsAnimating(false);
      }
    },
    [frontIndex, items, markInteracted, reduced, rotateForward, rotateBackward],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        markInteracted();
        rotateForward();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        markInteracted();
        rotateBackward();
      }
    },
    [markInteracted, rotateBackward, rotateForward],
  );

  const transition = useMemo(() => (reduced ? { duration: 0.2 } : springCalm), [reduced]);

  if (n !== 3) {
    return null;
  }

  const activeLabel = String(frontIndex + 1).padStart(2, "0");
  const totalLabel = String(n).padStart(2, "0");

  return (
    <div
      className="relative mx-auto mt-12 w-full max-w-3xl md:mt-16 lg:max-w-4xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Experience highlights"
      aria-keyshortcuts="ArrowRight ArrowLeft"
    >
      <p className="sr-only">
        Swipe the front card sideways, click a side card to bring it forward, or focus this carousel and use
        the left and right arrow keys.
      </p>

      <SwipeCardHint visible={!hasInteracted} />

      <div
        className="relative mx-auto h-[min(70vh,520px)] w-full max-w-[min(100%,920px)] rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf8f4] md:h-[500px]"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, expIndex) => {
          const depthRaw = order.indexOf(expIndex);
          if (depthRaw < 0 || depthRaw > 2) return null;
          const depth = depthRaw as 0 | 1 | 2;
          const vis = slotForDepth(depth);
          const isFront = depth === 0;
          const key = itemKey(item);

          return (
            <motion.div
              key={key}
              ref={(node) => {
                refs.current[key] = node;
              }}
              className={`absolute left-1/2 top-6 w-[min(100%,360px)] max-w-[92vw] -translate-x-1/2 sm:top-8 sm:w-[min(100%,380px)] md:top-10 md:w-[min(100%,400px)] ${
                isFront ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
              }`}
              initial={false}
              animate={{
                x: vis.x,
                y: vis.y,
                scale: vis.scale,
                rotate: vis.rotate,
                opacity: vis.opacity,
                zIndex: vis.zIndex,
              }}
              transition={transition}
              style={{ transformOrigin: "50% 50%" }}
              drag={isFront && !reduced && !isAnimating ? "x" : false}
              dragConstraints={{ left: -220, right: 220 }}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                void handleDragEnd(expIndex, info);
              }}
              role={isFront ? undefined : "button"}
              tabIndex={isFront ? undefined : 0}
              aria-label={
                isFront ? undefined : `Show ${item.title} at ${item.company} as the active card`
              }
              onClick={isFront ? undefined : () => bringToFront(expIndex)}
              onKeyDown={
                isFront
                  ? undefined
                  : (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        bringToFront(expIndex);
                      }
                    }
              }
            >
              <article
                className={`relative select-none rounded-2xl border border-[#ebe3d7] bg-[#fffdf8]/95 shadow-[0_18px_52px_-34px_rgba(42,38,34,0.16)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ${
                  isFront ? "p-6 md:p-8" : "p-5 md:p-6 hover:border-[#d4c8b8] hover:shadow-[0_20px_56px_-32px_rgba(42,38,34,0.2)]"
                }`}
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#a89888]">
                  {String(expIndex + 1).padStart(2, "0")}
                </p>
                <h3
                  className={`mt-3 font-sans font-semibold tracking-tight text-[#2a2622] ${
                    isFront ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#5a6d5a]">{item.company}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8a827a]">{item.period}</p>
                {isFront ? (
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6f6760] md:text-[0.95rem]">
                    {item.description}
                  </p>
                ) : (
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#6f6760] md:text-[0.9rem]">
                    {item.description}
                  </p>
                )}
              </article>
            </motion.div>
          );
        })}
      </div>

      <p
        className="mt-10 text-center font-mono text-[0.8rem] tabular-nums tracking-[0.28em] text-[#8a827a] md:text-sm md:tracking-[0.32em]"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Experience ${activeLabel} of ${totalLabel}`}
      >
        <span className="font-medium text-[#2a2622]">{activeLabel}</span>
        <span className="mx-2 font-normal text-[#c4b8aa]">/</span>
        <span className="text-[#6f6760]">{totalLabel}</span>
      </p>

      {reduced ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              markInteracted();
              rotateBackward();
            }}
            className="rounded-full border border-[#ddd4c8] bg-[#fffdf8] px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#4a433c] transition-colors hover:border-[#b8a99a] hover:bg-[#fffdf8]"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => {
              markInteracted();
              rotateForward();
            }}
            className="rounded-full bg-[#0f0f0f] px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a1a1a]"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
