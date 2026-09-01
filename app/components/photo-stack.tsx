"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";

const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

/** 3-card stack: middle index has highest z-index */
const STACK = [
  { x: -52, y: 14, rotate: -14, zIndex: 10, opacity: 1, scale: 1 },
  { x: 0, y: 0, rotate: -3, zIndex: 30, opacity: 1, scale: 1 },
  { x: 56, y: 16, rotate: 12, zIndex: 20, opacity: 1, scale: 1 },
  { x: 6, y: 22, rotate: 4, zIndex: 4, opacity: 0, scale: 0.9 },
  { x: -6, y: 26, rotate: -2, zIndex: 3, opacity: 0, scale: 0.88 },
  { x: 0, y: 30, rotate: 1, zIndex: 2, opacity: 0, scale: 0.86 },
];

/** Fan out: slight overlap + varied rotation; center pair elevated */
const EXPANDED = [
  { x: -232, y: 8, rotate: -5.5, zIndex: 12 },
  { x: -138, y: -6, rotate: 3.2, zIndex: 18 },
  { x: -46, y: 6, rotate: -3.8, zIndex: 35 },
  { x: 48, y: -5, rotate: 4.1, zIndex: 32 },
  { x: 142, y: 7, rotate: -2.6, zIndex: 16 },
  { x: 236, y: -6, rotate: 5.2, zIndex: 14 },
];

export type PhotoStackProps = {
  photos: string[];
};

export function PhotoStack({ photos }: PhotoStackProps) {
  const list = photos.slice(0, 6);
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const setIn = useCallback(() => setExpanded(true), []);
  const setOut = useCallback(() => setExpanded(false), []);

  const transitionFor = (index: number, entering: boolean) => {
    if (reduced) {
      return { duration: 0.2, delay: 0 };
    }
    const stagger = 0.042;
    const delay = entering ? index * stagger : (5 - index) * (stagger * 0.65);
    return { ...SPRING, delay };
  };

  return (
    <>
      {/* Mobile: horizontal scroll, no hover interaction */}
      <div className="mt-10 min-w-0 overflow-x-clip md:hidden">
        <div className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 [scrollbar-width:thin]">
          {list.map((src, i) => (
            <div
              key={`${src}-m-${i}`}
              className="relative aspect-[3/4] w-[42vw] max-w-[200px] flex-shrink-0 snap-start overflow-hidden rounded-[24px] shadow-[0_16px_40px_-20px_rgba(42,38,34,0.35)] ring-1 ring-black/[0.06]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: stack → expand on hover */}
      <div
        className="relative mt-12 hidden min-h-[300px] w-full max-w-[min(100%,580px)] overflow-visible md:block"
        onMouseEnter={setIn}
        onMouseLeave={setOut}
      >
        <div className="relative flex h-[300px] items-center justify-start pl-4">
          {list.map((src, index) => {
            const s = STACK[index]!;
            const e = EXPANDED[index]!;
            const x = expanded ? e.x : s.x;
            const y = expanded ? e.y : s.y;
            const rotate = expanded ? e.rotate : s.rotate;
            const zIndex = expanded ? e.zIndex : s.zIndex;
            const opacity = expanded ? 1 : s.opacity;
            const scale = expanded ? 1.02 : s.scale;

            return (
              <motion.div
                key={`${src}-d-${index}`}
                className={`absolute left-1/2 top-1/2 h-[168px] w-[126px] -translate-x-1/2 -translate-y-1/2 will-change-transform ${
                  !expanded && index >= 3 ? "pointer-events-none" : ""
                }`}
                initial={false}
                animate={{
                  x,
                  y,
                  rotate,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={transitionFor(index, expanded)}
                style={{ zIndex }}
                whileHover={expanded ? { scale: 1.06 } : undefined}
              >
                <div
                  className={`relative h-full w-full overflow-hidden rounded-[24px] shadow-[0_22px_48px_-28px_rgba(42,38,34,0.45)] ring-1 ring-black/[0.07] ${
                    opacity < 0.5 ? "pointer-events-none" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
