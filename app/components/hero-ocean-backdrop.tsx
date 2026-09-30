"use client";

import Image from "next/image";
import { useId, useRef, type CSSProperties, type ReactNode, type Ref } from "react";
import { useWhaleMotion } from "./hero-whale-motion";

type GlassLayerProps = {
  name: "whale" | "iceberg";
  sizes: string;
};

/**
 * Each glass object ships as two plates extracted from the same artwork and
 * composited with matching blend modes, so the object stays translucent over
 * whatever gradient sits behind it.
 */
function GlassLayer({ name, sizes }: GlassLayerProps) {
  return (
    <div className={`hero-ocean__${name}`}>
      <Image
        src={`/images/hero/${name}-screen.jpg`}
        alt=""
        fill
        loading="eager"
        sizes={sizes}
        className="hero-ocean__plate hero-ocean__plate--screen"
      />
      <Image
        src={`/images/hero/${name}-multiply.jpg`}
        alt=""
        fill
        loading="eager"
        sizes={sizes}
        className="hero-ocean__plate hero-ocean__plate--multiply"
      />
    </div>
  );
}

const WHALE_SIZES = "(max-width: 768px) 90vw, 60vw";

/** Body, tail stock and flukes: feathered masks that sum back to the full artwork. */
const SEGMENTS = ["front", "mid", "fluke"] as const;

type WhalePlateProps = {
  plateRef: Ref<HTMLDivElement>;
  variant: "screen" | "multiply" | "halo";
};

function WhalePlate({ plateRef, variant }: WhalePlateProps) {
  const source = variant === "multiply" ? "multiply" : "screen";
  const blend = variant === "halo" ? "hero-ocean__whale-halo" : `hero-ocean__plate--${variant}`;
  const segments = variant === "halo" ? (["front"] as const) : SEGMENTS;
  return (
    <div ref={plateRef} className={`hero-ocean__whale-plate ${blend}`}>
      {segments.map((segment) => (
        <div
          key={segment}
          data-seg={segment}
          className={variant === "halo" ? "hero-ocean__seg" : `hero-ocean__seg hero-ocean__seg--${segment}`}
        >
          <Image
            src={`/images/hero/whale-${source}.jpg`}
            alt=""
            fill
            loading="eager"
            sizes={WHALE_SIZES}
            className="hero-ocean__plate"
          />
        </div>
      ))}
    </div>
  );
}

/*
 * Waterline profile: three commensurate harmonics, so one tile loops
 * seamlessly while the crest never reads as a plain sine.
 */
const WAVE_H = 16;
const WAVE_SPAN = 4800;

function wavePath(tile: number, harmonics: [number, number, number][]) {
  const points: string[] = [];
  for (let x = 0; x <= WAVE_SPAN; x += 12) {
    const y = harmonics.reduce(
      (sum, [amp, div, phase]) => sum + amp * Math.sin((2 * Math.PI * x * div) / tile + phase),
      WAVE_H / 2,
    );
    points.push(`${x} ${y.toFixed(2)}`);
  }
  return `M${points.join("L")}`;
}

const CREST = wavePath(1200, [
  [1.9, 1, 0],
  [1.1, 3, 1.3],
  [0.6, 5, 2.1],
]);
const CREST_FILL = `${CREST}V${WAVE_H}H0Z`;
const CROSS_CREST = wavePath(800, [
  [0.9, 1, 0.6],
  [0.5, 4, 2.4],
  [0.3, 2, 4],
]);

/*
 * Sky motes drifting left → right. Seeded so server and client render the
 * same markup; each starts at its own spot (negative delay matched to its
 * resting x), so nothing jumps on load and reduced motion leaves them scattered.
 */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MOTES = (() => {
  const random = seeded(20260930);
  const between = (min: number, max: number) => min + random() * (max - min);
  return Array.from({ length: 36 }, (_, i) => {
    const bokeh = i % 5 === 0;
    const x = between(0, 100);
    const drift = between(55, 110);
    const bob = between(7, 13);
    const twinkle = between(5, 10);
    return {
      left: `${x.toFixed(1)}%`,
      top: `${between(6, 92).toFixed(1)}%`,
      width: `${(bokeh ? between(7, 11) : between(2.5, 4.5)).toFixed(1)}px`,
      "--x": x.toFixed(1),
      "--a": (bokeh ? between(0.35, 0.5) : between(0.65, 1)).toFixed(2),
      "--bob": `${(between(3, 9) * (random() < 0.5 ? -1 : 1)).toFixed(1)}px`,
      animationDuration: `${drift.toFixed(1)}s, ${bob.toFixed(1)}s, ${twinkle.toFixed(1)}s`,
      animationDelay: `${(-drift * ((x + 4) / 108)).toFixed(1)}s, ${(-random() * bob).toFixed(1)}s, ${(-random() * twinkle).toFixed(1)}s`,
    } as CSSProperties;
  });
})();

function WaveSvg({ className, children }: { className: string; children: ReactNode }) {
  return (
    <svg
      className={`hero-ocean__wave-track ${className}`}
      width={WAVE_SPAN}
      height={WAVE_H}
      viewBox={`0 0 ${WAVE_SPAN} ${WAVE_H}`}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function HeroOceanBackdrop() {
  const glowId = useId();
  const layer = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const multiply = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const impact = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  useWhaleMotion({ layer, screen, multiply, halo, impact, surface });

  return (
    <div className="hero-ocean" aria-hidden>
      <div className="hero-ocean__sky" />
      <div className="hero-ocean__sun" />
      <div className="hero-ocean__motes">
        {MOTES.map((style, i) => (
          <span key={i} className="hero-ocean__mote" style={style} />
        ))}
      </div>
      <div className="hero-ocean__water">
        <div className="hero-ocean__sun-glint" />
        <div className="hero-ocean__rays" />
        <div className="hero-ocean__particles" />
      </div>
      <div className="hero-ocean__swell">
        <WaveSvg className="hero-ocean__wave-track--crest">
          <path d={CREST_FILL} className="hero-ocean__swell-fill" />
        </WaveSvg>
      </div>
      <div ref={layer} className="hero-ocean__whale">
        <WhalePlate plateRef={screen} variant="screen" />
        <WhalePlate plateRef={multiply} variant="multiply" />
        <WhalePlate plateRef={halo} variant="halo" />
      </div>
      <GlassLayer name="iceberg" sizes="(max-width: 768px) 45vw, 30vw" />
      <div ref={surface} className="hero-ocean__surface">
        <WaveSvg className="hero-ocean__wave-track--crest">
          <defs>
            <filter id={glowId} x="0" y="-100%" width="100%" height="300%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>
          <path d={CREST} className="hero-ocean__crest-glow" filter={`url(#${glowId})`} />
          <path d={CREST} className="hero-ocean__crest" />
        </WaveSvg>
        <WaveSvg className="hero-ocean__wave-track--cross">
          <path d={CROSS_CREST} className="hero-ocean__crest hero-ocean__crest--cross" />
        </WaveSvg>
      </div>
      <div className="hero-ocean__waves">
        <div className="hero-ocean__wave hero-ocean__wave--back" />
        <div className="hero-ocean__wave hero-ocean__wave--front" />
      </div>
      <div ref={impact} className="hero-ocean__impact">
        <span className="hero-ocean__ripple" />
        {Array.from({ length: 3 }, (_, i) => (
          <span key={`ring${i}`} className="hero-ocean__ring" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <span key={`drop${i}`} className="hero-ocean__drop" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <span key={`bubble${i}`} className="hero-ocean__trail" />
        ))}
      </div>
      <div className="hero-ocean__mist" />
    </div>
  );
}
