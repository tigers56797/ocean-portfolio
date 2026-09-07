"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export type AboutInsight = {
  label: string;
  metric: string;
  metricNote: string;
  quote: string;
  /** Mini bar heights 0–1 for chart feel */
  bars: readonly number[];
  /** Accent for bars / metric */
  tone: "sand" | "sage";
};

type AboutInsightCardsProps = {
  items: readonly AboutInsight[];
};

const toneClass = {
  sand: {
    bar: "bg-[#c4a574]",
    metric: "text-[#8b7355]",
    chip: "border-[#e4d8c8] bg-[#faf6f0] text-[#8b7355]",
  },
  sage: {
    bar: "bg-[#6d8f78]",
    metric: "text-[#4d6b56]",
    chip: "border-[#d5e0d7] bg-[#f3f7f4] text-[#4d6b56]",
  },
} as const;

function MiniBars({
  bars,
  tone,
  active,
  reduced,
}: {
  bars: readonly number[];
  tone: "sand" | "sage";
  active: boolean;
  reduced: boolean | null;
}) {
  const colors = toneClass[tone];
  return (
    <div className="flex h-12 items-end gap-[3.5px]" aria-hidden>
      {bars.map((value, i) => {
        const base = Math.max(6, value * 44);
        return (
          <motion.span
            key={i}
            className={`inline-block w-[6px] origin-bottom rounded-sm ${colors.bar}`}
            initial={{ height: 4, opacity: 0.25, scaleY: 0.2 }}
            animate={
              active
                ? reduced
                  ? { height: base, opacity: 0.85, scaleY: 1 }
                  : {
                      height: [base * 0.92, base * 1.08, base * 0.96, base],
                      opacity: [0.55, 0.95, 0.7, 0.88],
                      scaleY: 1,
                    }
                : { height: 4, opacity: 0.25, scaleY: 0.2 }
            }
            transition={
              active && !reduced
                ? {
                    height: {
                      delay: 0.2 + i * 0.06,
                      duration: 2.4 + i * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    opacity: {
                      delay: 0.2 + i * 0.06,
                      duration: 2.4 + i * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scaleY: { delay: 0.12 + i * 0.05, duration: 0.45, ease },
                  }
                : { delay: 0.12 + i * 0.05, duration: 0.45, ease }
            }
          />
        );
      })}
    </div>
  );
}

function Sparkline({
  bars,
  tone,
  active,
  reduced,
}: {
  bars: readonly number[];
  tone: "sand" | "sage";
  active: boolean;
  reduced: boolean | null;
}) {
  const stroke = tone === "sand" ? "#c4a574" : "#6d8f78";
  const fill = tone === "sand" ? "rgba(196,165,116,0.18)" : "rgba(109,143,120,0.18)";
  const w = 104;
  const h = 42;
  const coords = bars.map((v, i) => {
    const x = (i / Math.max(bars.length - 1, 1)) * w;
    const y = h - v * (h - 6) - 3;
    return { x, y };
  });
  const line = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  const last = coords[coords.length - 1] ?? { x: 0, y: h / 2 };

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible" aria-hidden>
      <motion.polygon
        points={area}
        fill={fill}
        initial={{ opacity: 0 }}
        animate={
          active
            ? reduced
              ? { opacity: 1 }
              : { opacity: [0.45, 0.85, 0.55, 0.75] }
            : { opacity: 0 }
        }
        transition={
          active && !reduced
            ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6, ease }
        }
      />
      <motion.polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 1.05, ease }}
      />
      {!reduced && active ? (
        <>
          <motion.circle
            r="3.2"
            fill={stroke}
            initial={{ cx: coords[0]?.x ?? 0, cy: coords[0]?.y ?? h / 2, opacity: 0 }}
            animate={{
              cx: coords.map((p) => p.x),
              cy: coords.map((p) => p.y),
              opacity: [0, 1, 1, 0.85],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.35,
            }}
          />
          <motion.circle
            cx={last.x}
            cy={last.y}
            r="5"
            fill="transparent"
            stroke={stroke}
            strokeWidth="1.2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.15, 0.55, 0.15], scale: [0.7, 1.35, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}
    </svg>
  );
}

function AnimatedMetric({
  value,
  active,
  reduced,
  className,
}: {
  value: string;
  active: boolean;
  reduced: boolean | null;
  className: string;
}) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? Number(match[1]) : NaN;
  const suffix = match?.[2] ?? "";
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!active || reduced || Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const frames = 36;
    const id = window.setInterval(() => {
      frame += 1;
      const t = Math.min(1, frame / frames);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = numeric * eased;
      const text =
        Number.isInteger(numeric) || value.includes("%")
          ? `${Math.round(current)}${suffix}`
          : `${current.toFixed(1)}${suffix}`;
      setDisplay(text);
      if (frame >= frames) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [active, reduced, numeric, suffix, value]);

  return <p className={className}>{display}</p>;
}

export function AboutInsightCards({ items }: AboutInsightCardsProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const active = Boolean(inView || reduced);

  if (items.length === 0) return null;

  return (
    <div ref={ref} className="mt-5 grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => {
        const colors = toneClass[item.tone];
        const Chart = index % 2 === 0 ? MiniBars : Sparkline;

        return (
          <motion.article
            key={item.label}
            className="relative overflow-hidden rounded-2xl border border-[#ebe3d7] bg-[#fffdf8]/80 p-5 shadow-[0_16px_48px_-40px_rgba(42,38,34,0.28)] backdrop-blur-sm md:p-6"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: reduced ? 0 : 0.12 + index * 0.1, duration: 0.65, ease }}
            whileHover={
              reduced
                ? undefined
                : {
                    y: -3,
                    boxShadow: "0 22px 56px -36px rgba(42,38,34,0.35)",
                    transition: { duration: 0.3, ease },
                  }
            }
          >
            <div className="flex items-start justify-between gap-3">
              <motion.span
                className={`inline-flex rounded-full border px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-[0.1em] md:px-4 md:py-2 md:text-[0.85rem] ${colors.chip}`}
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                transition={{ delay: reduced ? 0 : 0.18 + index * 0.08, duration: 0.45, ease }}
              >
                {item.label}
              </motion.span>
              <Chart bars={item.bars} tone={item.tone} active={active} reduced={reduced} />
            </div>

            <AnimatedMetric
              value={item.metric}
              active={active}
              reduced={reduced}
              className={`mt-4 font-serif text-3xl font-medium tracking-tight ${colors.metric}`}
            />
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#a89888]">
              {item.metricNote}
            </p>

            <p className="mt-4 text-[0.92rem] leading-relaxed text-[#5c564f]">
              <span className="mr-1 font-serif text-lg leading-none text-[#c4b8aa]" aria-hidden>
                “
              </span>
              {item.quote}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
