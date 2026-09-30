import { useEffect, type RefObject } from "react";

export type WhaleState =
  | "idle"
  | "approach"
  | "fade"
  | "hidden"
  | "reappear"
  | "breachApproach"
  | "breach"
  | "return";

const IDLE_OPACITY = 0.86;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const EASE_SLOW = "cubic-bezier(0.45, 0, 0.2, 1)";
const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

/*
 * Whale plate geometry in plate units (see .hero-ocean__whale in globals.css):
 * the water surface sits 19.6% down the plate, the head crown 89% across, and
 * the plates rotate/scale around the head (transform-origin: 90% 22%).
 * PROFILE traces the whale's top edge: [distance behind the head crown,
 * depth below the surface], both as fractions of the plate width.
 */
const SURFACE_Y = 0.196;
const HEAD_X = 0.89;
const ORIGIN = { x: 0.9, y: 0.22 };
const PROFILE: [number, number][] = [
  [-0.021, -0.003],
  [0, -0.003],
  [0.09, 0.003],
  [0.217, 0.036],
  [0.395, 0.088],
  [0.477, 0.077],
  [0.514, 0.042],
  [0.619, 0.021],
  [0.756, 0.024],
  [0.836, 0.079],
];

/*
 * Tail joints, in % of the plate, relative to the segments' transform-origin
 * (88% 26%): the tail stock hinges behind the dorsal fin (45%, 46%), the
 * flukes at the peduncle (28%, 34%). Must match the segment masks in CSS.
 */
const STOCK_JOINT = "translate(-43%, 20%)";
const STOCK_TO_FLUKE = "translate(-17%, -12%)";
const FLUKE_BACK = "translate(60%, -8%)";
const STOCK_BACK = "translate(43%, -20%)";

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function motionScale() {
  if (window.matchMedia("(max-width: 767px)").matches) return 0.5;
  if (window.matchMedia("(max-width: 1023px)").matches) return 0.78;
  return 1;
}

type Segment = "front" | "mid" | "fluke";

/**
 * One fluke-beat cycle. The stroke travels head → tail: the stock swings
 * first and the flukes follow a beat later, the downstroke is quicker than
 * the recovery, and the body heaves against the flukes.
 */
function strokeFrames(segment: Segment, k: number, stock: number, fluke: number, heave: number): Keyframe[] {
  const frames: Keyframe[] = [];
  const lag = 1.15;
  for (let i = 0; i <= 24; i++) {
    const p = (i / 24) * TAU;
    const phase = p + 0.28 * Math.sin(p);
    const a1 = stock * Math.sin(phase);
    const a2 = fluke * Math.sin(phase - lag);
    const lift = `translate(0px, ${(heave * k * Math.sin(phase - lag)).toFixed(2)}px)`;
    const transform =
      segment === "front"
        ? lift
        : segment === "mid"
          ? `${lift} ${STOCK_JOINT} rotate(${a1.toFixed(2)}deg) ${STOCK_BACK}`
          : `${lift} ${STOCK_JOINT} rotate(${a1.toFixed(2)}deg) ${STOCK_TO_FLUKE} rotate(${a2.toFixed(2)}deg) ${FLUKE_BACK}`;
    frames.push({ offset: i / 24, transform });
  }
  return frames;
}

/** A plate pose. Vertical offset is `-lift * rise + dy`, where `rise` is solved later. */
type Pose = { tx: number; lift: number; dy: number; r: number; s: number; guard: boolean };

type Line = { left: number; right: number; bottom: number };

type Scene = {
  box: DOMRect;
  sceneLeft: number;
  lines: Line[];
  /** Headroom kept free of copy on top of the idle swim's own vertical range. */
  margin: number;
  /** How far right the head may travel before it runs into the iceberg. */
  maxShift: number;
};

type CueKind = "emerge" | "reenter" | "wake";
type Cue = { at: number; x: number; kind: CueKind; room: number };

type Plan = {
  kind: "fade" | "breach";
  plate: Keyframe[];
  halo: Keyframe[];
  duration: number;
  phases: { at: number; state: WhaleState }[];
  cues: Cue[];
};

function textLines(layer: HTMLElement): Line[] {
  const section = layer.closest("section");
  if (!section) return [];
  const range = document.createRange();
  const lines: Line[] = [];
  section.querySelectorAll("h1, h1 + p").forEach((node) => {
    range.selectNodeContents(node);
    for (const r of Array.from(range.getClientRects())) {
      if (r.width > 1 && r.height > 1) lines.push({ left: r.left, right: r.right, bottom: r.bottom });
    }
  });
  return lines;
}

function measureScene(layer: HTMLElement, scene: HTMLElement, k: number): Scene {
  const box = layer.getBoundingClientRect();
  const ice = scene.querySelector(".hero-ocean__iceberg")?.getBoundingClientRect();
  return {
    box,
    sceneLeft: scene.getBoundingClientRect().left,
    lines: textLines(layer),
    margin: 4 + 12 * k,
    maxShift: ice ? ice.left + ice.width * 0.12 - (box.left + box.width * HEAD_X) : Infinity,
  };
}

function silhouette(w: number, h: number) {
  const point = (d: number, depth: number) => ({ x: (HEAD_X - d) * w, y: SURFACE_Y * h + depth * w });
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const [d0, y0] = PROFILE[i];
    const [d1, y1] = PROFILE[i + 1];
    for (const t of [0, 0.2, 0.4, 0.6, 0.8]) points.push(point(d0 + (d1 - d0) * t, y0 + (y1 - y0) * t));
  }
  points.push(point(...PROFILE[PROFILE.length - 1]));
  return points;
}

function project(box: DOMRect, p: Pose, x: number, y: number) {
  const ox = ORIGIN.x * box.width;
  const oy = ORIGIN.y * box.height;
  const cos = Math.cos(p.r * DEG);
  const sin = Math.sin(p.r * DEG);
  const dx = x - ox;
  const dy = y - oy;
  return {
    x: box.left + ox + p.s * (dx * cos - dy * sin) + p.tx,
    y: box.top + oy + p.s * (dx * sin + dy * cos) + p.dy,
  };
}

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const mix = (u: number, v: number) => u + (v - u) * t;
  return {
    tx: mix(a.tx, b.tx),
    lift: mix(a.lift, b.lift),
    dy: mix(a.dy, b.dy),
    r: mix(a.r, b.r),
    s: mix(a.s, b.s),
    guard: a.guard && b.guard,
  };
}

/** Extra headroom for the tail beat, which swings the flukes most (see strokeFrames). */
const strokeReach = (x: number, w: number) => Math.max(0, 0.45 - x / w) * 0.12 * w;

/**
 * Largest rise that keeps the whale's top edge — flukes included, with room
 * for the tail beat — below every line of hero copy for all guarded poses
 * along the path (and the straight segments between them). Returns 0 when a
 * pose that does not depend on the rise already reaches the copy.
 */
function safeRise(scene: Scene, poses: Pose[]) {
  if (!scene.lines.length) return Infinity;
  const { box, lines, margin } = scene;
  const outline = silhouette(box.width, box.height);
  const samples: Pose[] = [];
  poses.forEach((p, i) => {
    samples.push(p);
    const next = poses[i + 1];
    if (next) for (const t of [0.25, 0.5, 0.75]) samples.push(lerpPose(p, next, t));
  });

  let limit = Infinity;
  for (const p of samples) {
    if (!p.guard) continue;
    for (const pt of outline) {
      const { x, y } = project(box, p, pt.x, pt.y);
      const top = y - strokeReach(pt.x, box.width);
      for (const line of lines) {
        if (x < line.left - 12 || x > line.right + 12) continue;
        const room = top - line.bottom - margin;
        if (p.lift > 0) limit = Math.min(limit, room / p.lift);
        else if (room < 0) return 0;
      }
    }
  }
  return Math.max(0, limit);
}

function headPoint(scene: Scene, p: Pose, rise: number) {
  const { box } = scene;
  return project(box, { ...p, dy: p.dy - p.lift * rise }, HEAD_X * box.width, SURFACE_Y * box.height);
}

/** Free space above the water line at viewport x, for splash droplets. */
function splashRoom(scene: Scene, x: number, k: number) {
  const water = scene.box.top + SURFACE_Y * scene.box.height;
  let room = 26 * k;
  for (const line of scene.lines) {
    if (x < line.left - 40 || x > line.right + 40) continue;
    room = Math.min(room, water - line.bottom - 8);
  }
  return Math.max(0, room);
}

function makeCue(scene: Scene, k: number, at: number, kind: CueKind, p: Pose, rise: number): Cue {
  const head = headPoint(scene, p, rise);
  return { at, kind, x: head.x - scene.sceneLeft, room: splashRoom(scene, head.x, k) };
}

const transform = (p: Pose, rise: number) =>
  `translate3d(${p.tx.toFixed(1)}px, ${(p.dy - p.lift * rise).toFixed(1)}px, 0) rotate(${p.r.toFixed(2)}deg) scale(${p.s})`;

const look = (blur: number, brightness: number) => `blur(${blur}px) brightness(${brightness})`;

type Step = { pose: Pose; ms: number; opacity: number; blur: number; bright: number; halo: number; easing: string };

function toKeyframes(steps: Step[], rise: number) {
  const total = steps.reduce((sum, s) => sum + s.ms, 0);
  let elapsed = 0;
  const plate: Keyframe[] = [];
  const halo: Keyframe[] = [];
  const times: number[] = [];
  for (const [i, s] of steps.entries()) {
    elapsed += s.ms;
    times.push(elapsed);
    const offset = i === steps.length - 1 ? 1 : Math.min(1, elapsed / total);
    plate.push({ offset, transform: transform(s.pose, rise), opacity: s.opacity, filter: look(s.blur, s.bright), easing: s.easing });
    halo.push({ offset, transform: transform(s.pose, rise), opacity: s.halo, easing: s.easing });
  }
  return { plate, halo, duration: total, times };
}

const REST: Pose = { tx: 0, lift: 0, dy: 0, r: 0, s: 1, guard: false };

function startStep(easing: string): Step {
  return { pose: REST, ms: 0, opacity: IDLE_OPACITY, blur: 0, bright: 1, halo: 0, easing };
}

/** Surface → glow → dissolve into light → hidden → reappear from below. */
function buildFade(k: number, scene: Scene): Plan {
  const tilt = rand(-2, -0.8);
  const near: Pose = { tx: rand(12, 20) * k, lift: 0.75, dy: 0, r: tilt, s: 1.025, guard: true };
  const crest: Pose = { tx: near.tx + rand(4, 7) * k, lift: 1, dy: 0, r: tilt * 1.2, s: 1.035, guard: true };
  const gone: Pose = { tx: crest.tx + rand(4, 8) * k, lift: 1, dy: -rand(10, 14) * k, r: tilt, s: 1.04, guard: true };
  const below: Pose = { tx: -rand(2, 6) * k, lift: 0, dy: rand(10, 18) * k, r: 0, s: 1, guard: false };
  const rise = Math.max(0, Math.min(rand(30, 42) * k, safeRise(scene, [near, crest, gone])));

  const approach = rand(2200, 2800);
  const glow = rand(500, 800);
  const fade = rand(1100, 1400);
  const hidden = rand(1500, 2600);
  const reappear = rand(1500, 1900);

  const steps: Step[] = [
    startStep(EASE_SLOW),
    { pose: near, ms: approach, opacity: 0.95, blur: 0, bright: 1.06, halo: 0.25, easing: EASE },
    { pose: crest, ms: glow, opacity: 1, blur: 0, bright: 1.12, halo: 0.55, easing: EASE },
    { pose: gone, ms: fade, opacity: 0, blur: 3, bright: 1.08, halo: 0, easing: "linear" },
    // Repositions only while fully transparent, so the whale never visibly jumps.
    { pose: gone, ms: hidden * 0.5, opacity: 0, blur: 3, bright: 1, halo: 0, easing: "step-end" },
    { pose: below, ms: hidden * 0.5, opacity: 0, blur: 2, bright: 1, halo: 0, easing: EASE_SLOW },
    { pose: REST, ms: reappear, opacity: IDLE_OPACITY, blur: 0, bright: 1, halo: 0, easing: EASE },
  ];

  const { times, ...frames } = toKeyframes(steps, rise);
  return {
    kind: "fade",
    ...frames,
    phases: [
      { at: 0, state: "approach" },
      { at: times[2], state: "fade" },
      { at: times[3], state: "hidden" },
      { at: times[5], state: "reappear" },
    ],
    cues: [],
  };
}

/**
 * A breach: gather speed below the surface, burst up nose-first at a steep
 * angle (head and back clear the water, tail stays under), hang, arc over and
 * knife back in, then dive away and resurface at the resting spot. The head
 * travels forward during the leap so it rises where the copy leaves room.
 * Returns null when the copy leaves too little headroom for a breach to read.
 */
function breachPath(k: number, reach: number, tilt: number, dip: number) {
  return {
    windup: { tx: reach * 0.15, lift: 0, dy: 10 * k, r: 2 * dip, s: 1, guard: true },
    surge: { tx: reach * 0.5, lift: 0.5, dy: 0, r: tilt * 0.8, s: 1.01, guard: true },
    peak: { tx: reach * 0.72, lift: 1, dy: 0, r: tilt, s: 1.015, guard: true },
    hang: { tx: reach * 0.84, lift: 0.93, dy: 0, r: tilt * 0.35, s: 1.015, guard: true },
    fall: { tx: reach * 0.93, lift: 0.25, dy: 0, r: 5 * dip, s: 1.01, guard: true },
    submerge: { tx: reach * 0.98, lift: 0, dy: 22 * k, r: 6.5 * dip, s: 1, guard: true },
    dive: { tx: reach + 24 * k, lift: 0, dy: 50 * k, r: 8 * dip, s: 0.98, guard: true },
  } satisfies Record<string, Pose>;
}

function buildBreach(k: number, scene: Scene): Plan | null {
  const tilt = rand(-13, -10) * (k < 0.7 ? 0.8 : 1);
  const reach = Math.max(50 * k, Math.min(rand(260, 330) * k, scene.maxShift - 24 * k));

  // Nose-down re-entry lifts the flukes; flatten it where they would reach the copy.
  const options = [1, 0.7, 0.45, 0.2, 0].map((dip) => {
    const path = breachPath(k, reach, tilt, dip);
    return { path, limit: safeRise(scene, Object.values(path)) };
  });
  const best = Math.max(...options.map((o) => o.limit));
  const { path, limit } = options.find((o) => o.limit >= best * 0.85)!;
  const { windup, surge, peak, hang, fall, submerge, dive } = path;
  const below: Pose = { tx: -rand(6, 12) * k, lift: 0, dy: rand(16, 22) * k, r: -1, s: 1, guard: false };

  const rise = Math.min(rand(40, 70) * k, limit * rand(0.92, 1));
  if (rise < 6 * k) return null;

  const steps: Step[] = [
    startStep("cubic-bezier(0.45, 0, 0.55, 1)"),
    { pose: windup, ms: rand(900, 1200), opacity: 0.92, blur: 0, bright: 1.03, halo: 0.08, easing: "cubic-bezier(0.4, 0.1, 0.6, 1)" },
    { pose: surge, ms: rand(700, 900), opacity: 0.98, blur: 0, bright: 1.08, halo: 0.35, easing: "cubic-bezier(0.2, 0.6, 0.35, 1)" },
    { pose: peak, ms: rand(450, 600), opacity: 1, blur: 0, bright: 1.14, halo: 0.6, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
    { pose: hang, ms: rand(350, 500), opacity: 1, blur: 0, bright: 1.12, halo: 0.5, easing: "cubic-bezier(0.55, 0, 0.85, 0.45)" },
    { pose: fall, ms: rand(550, 750), opacity: 0.96, blur: 0, bright: 1.05, halo: 0.2, easing: "cubic-bezier(0.2, 0.5, 0.4, 1)" },
    { pose: submerge, ms: rand(600, 800), opacity: 0.88, blur: 0, bright: 1, halo: 0, easing: EASE },
    { pose: dive, ms: rand(1300, 1700), opacity: 0, blur: 3, bright: 1, halo: 0, easing: "linear" },
    { pose: dive, ms: rand(600, 900), opacity: 0, blur: 3, bright: 1, halo: 0, easing: "step-end" },
    { pose: below, ms: rand(600, 900), opacity: 0, blur: 2, bright: 1, halo: 0, easing: EASE },
    { pose: REST, ms: rand(1800, 2200), opacity: IDLE_OPACITY, blur: 0, bright: 1, halo: 0, easing: EASE },
  ];

  const { times, ...frames } = toKeyframes(steps, rise);
  const [, tWindup, tSurge, , tHang, tFall, tSubmerge, tDive, , tBelow] = times;

  // Moments the head crosses the water line, on the straight path between poses.
  const out = (10 * k) / (10 * k + 0.5 * rise);
  const back = (0.25 * rise) / (0.25 * rise + 22 * k);
  const emergeAt = tWindup + out * (tSurge - tWindup);
  const reenterAt = tFall + back * (tSubmerge - tFall);

  return {
    kind: "breach",
    ...frames,
    phases: [
      { at: 0, state: "breachApproach" },
      { at: emergeAt, state: "breach" },
      { at: tHang, state: "return" },
      { at: tDive, state: "hidden" },
      { at: tBelow, state: "reappear" },
    ],
    cues: [
      makeCue(scene, k, emergeAt - 60, "emerge", lerpPose(windup, surge, out), rise),
      makeCue(scene, k, reenterAt - 40, "reenter", lerpPose(fall, submerge, back), rise),
      makeCue(scene, k, reenterAt + 450, "wake", submerge, rise),
    ],
  };
}

const BREACH_CHANCE = 0.3;
/** Guarantees a breach is seen roughly every 25–45 s once the cooldown allows. */
const BREACH_OVERDUE = 45000;
/** Tail-beat tempo per state: power strokes before a breach, easy cruising otherwise. */
const STROKE_RATE: Partial<Record<WhaleState, number>> = {
  approach: 1.3,
  breachApproach: 2.4,
  breach: 1.4,
  return: 1.15,
};

type ElementRef = RefObject<HTMLDivElement | null>;

export type WhaleMotionRefs = {
  layer: ElementRef;
  screen: ElementRef;
  multiply: ElementRef;
  halo: ElementRef;
  impact: ElementRef;
  surface: ElementRef;
};

/** Tail-beat swimming plus the fade / breach events and the water they disturb. */
export function useWhaleMotion({ layer: layerRef, screen, multiply, halo: haloRef, impact: impactRef, surface: surfaceRef }: WhaleMotionRefs) {
  useEffect(() => {
    const layer = layerRef.current;
    const plates = [screen.current, multiply.current];
    const halo = haloRef.current;
    const impact = impactRef.current;
    const surface = surfaceRef.current;
    const scene = layer?.closest<HTMLElement>(".hero-ocean");
    if (!layer || !scene || !halo || !impact || !surface || plates.some((p) => !p)) return;
    if (typeof layer.animate !== "function") return;

    layer.style.setProperty("--swim-drift", `${rand(12, 16).toFixed(2)}s`);
    layer.style.setProperty("--swim-pitch", `${rand(10, 13).toFixed(2)}s`);
    layer.style.setProperty("--swim-breath", `${rand(13, 16).toFixed(2)}s`);

    const segments = Array.from(layer.querySelectorAll<HTMLElement>("[data-seg]"));
    const ripple = impact.querySelector<HTMLElement>(".hero-ocean__ripple")!;
    const rings = Array.from(impact.querySelectorAll<HTMLElement>(".hero-ocean__ring"));
    const drops = Array.from(impact.querySelectorAll<HTMLElement>(".hero-ocean__drop"));
    const trail = Array.from(impact.querySelectorAll<HTMLElement>(".hero-ocean__trail"));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    let cancelled = false;
    let timer: number | undefined;
    let frame = 0;
    let tick: (() => void) | null = null;
    let running: Animation[] = [];
    let strokes: Animation[] = [];
    let lastBreach = performance.now() - BREACH_OVERDUE;
    let breachCooldown = rand(20000, 30000);

    const isPaused = () => document.hidden || !inView;

    const setState = (state: WhaleState) => {
      layer.dataset.whaleState = state;
      const rate = STROKE_RATE[state] ?? 1;
      strokes.forEach((a) => a.updatePlaybackRate(rate));
    };

    const startSwimming = () => {
      if (strokes.length || reduceMotion.matches) return;
      const k = motionScale();
      const period = rand(4600, 6200);
      const stock = rand(2.1, 2.8);
      const fluke = rand(5.5, 7.5);
      const heave = rand(1.8, 2.6);
      strokes = segments.map((seg) =>
        seg.animate(strokeFrames(seg.dataset.seg as Segment, k, stock, fluke, heave), {
          duration: period,
          iterations: Infinity,
        }),
      );
      if (isPaused()) strokes.forEach((a) => a.pause());
    };

    const stopSwimming = () => {
      strokes.forEach((a) => a.cancel());
      strokes = [];
    };

    const applyPause = () => {
      const paused = isPaused();
      scene.toggleAttribute("data-paused", paused);
      [...running, ...strokes].forEach((a) => (paused ? a.pause() : a.play()));
      window.cancelAnimationFrame(frame);
      if (!paused && tick) frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      applyPause();
    });
    observer.observe(scene);
    document.addEventListener("visibilitychange", applyPause);

    const schedule = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(nextEvent, delay);
    };

    const at = (x: number, y: number, extra = "") => `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) ${extra}`;

    const splash = (cue: Cue) => {
      const k = motionScale();
      const big = cue.kind === "reenter";
      const add = (el: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) =>
        running.push(el.animate(frames, { fill: "backwards", ...options }));

      if (cue.kind !== "wake") {
        const duration = rand(900, 1400);
        const peak = big ? 0.3 : 0.24;
        add(
          ripple,
          [
            { opacity: 0, transform: at(cue.x, 0, "scale(0.55, 0.7)") },
            { opacity: peak, transform: at(cue.x, 0, "scale(0.95, 1)"), offset: 0.3 },
            { opacity: 0, transform: at(cue.x, 0, "scale(1.5, 1.15)") },
          ],
          { duration, easing: "cubic-bezier(0.2, 0.6, 0.3, 1)" },
        );
        running.push(
          surface.animate([{ opacity: 0.85 }, { opacity: 1, offset: 0.3 }, { opacity: 0.85 }], { duration, easing: EASE }),
        );
      }

      const ringCount = big ? 3 : cue.kind === "wake" ? 2 : 1;
      rings.slice(0, ringCount).forEach((ring, i) => {
        const x = cue.x + rand(-6, 10) * k;
        add(
          ring,
          [
            { opacity: 0, transform: at(x, 0, "scale(0.2)") },
            { opacity: (cue.kind === "wake" ? 0.28 : 0.42) - i * 0.08, transform: at(x, 0, "scale(0.55)"), offset: 0.14 },
            { opacity: 0, transform: at(x, 0, `scale(${(1.5 + i * 0.35).toFixed(2)})`) },
          ],
          { duration: rand(1600, 2300) + i * 250, delay: i * rand(240, 320), easing: "cubic-bezier(0.15, 0.55, 0.35, 1)" },
        );
      });

      if (cue.kind !== "wake" && cue.room >= 6) {
        drops.slice(0, big ? drops.length : 4).forEach((drop) => {
          const dx = rand(-0.6, 1) * 30 * k * (big ? 1 : 0.6);
          const height = rand(0.45, 1) * cue.room;
          add(
            drop,
            [
              { opacity: 0, transform: at(cue.x, 0, "scale(0.6)") },
              { opacity: 0.95, transform: at(cue.x + dx * 0.2, -height * 0.35), offset: 0.14, easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" },
              { opacity: 0.9, transform: at(cue.x + dx * 0.55, -height), offset: 0.48, easing: "cubic-bezier(0.6, 0, 0.8, 0.45)" },
              { opacity: 0, transform: at(cue.x + dx, 3, "scale(0.7)") },
            ],
            { duration: rand(650, 950), delay: rand(0, 120) },
          );
        });
      }

      if (cue.kind === "wake") {
        trail.forEach((bubble, i) => {
          const x = cue.x + rand(-34, 30) * k;
          const from = rand(34, 64) * k;
          add(
            bubble,
            [
              { opacity: 0, transform: at(x, from, "scale(0.6)") },
              { opacity: 0.75, transform: at(x + rand(-4, 4) * k, from * 0.6), offset: 0.25 },
              { opacity: 0, transform: at(x + rand(-6, 6) * k, rand(4, 10) * k, "scale(1.1)") },
            ],
            { duration: rand(1800, 2800), delay: i * rand(90, 170), easing: "cubic-bezier(0.3, 0, 0.5, 1)" },
          );
        });
      }
    };

    const play = (plan: Plan) => {
      running = [
        ...plates.map((p) => p!.animate(plan.plate, { duration: plan.duration })),
        halo.animate(plan.halo, { duration: plan.duration }),
      ];
      const main = running[0];
      let phase = 0;
      let cue = 0;
      tick = () => {
        const t = Number(main.currentTime ?? 0);
        while (phase < plan.phases.length && t >= plan.phases[phase].at) setState(plan.phases[phase++].state);
        while (cue < plan.cues.length && t >= plan.cues[cue].at) splash(plan.cues[cue++]);
        if (main.playState === "running") frame = window.requestAnimationFrame(tick!);
      };
      frame = window.requestAnimationFrame(tick);

      main.finished
        .catch(() => undefined)
        .then(() => {
          window.cancelAnimationFrame(frame);
          tick = null;
          if (cancelled) return;
          setState("idle");
          running = running.filter((a) => a.playState !== "finished");
          if (plan.kind === "breach") {
            lastBreach = performance.now();
            breachCooldown = rand(20000, 30000);
          }
          schedule(rand(10000, 18000));
        });
    };

    function nextEvent() {
      if (cancelled) return;
      if (reduceMotion.matches || isPaused()) {
        schedule(rand(5000, 8000));
        return;
      }
      const k = motionScale();
      const measured = measureScene(layer!, scene!, k);
      const since = performance.now() - lastBreach;
      const wantsBreach = since > breachCooldown && (since > BREACH_OVERDUE || Math.random() < BREACH_CHANCE);
      play((wantsBreach && buildBreach(k, measured)) || buildFade(k, measured));
    }

    const onReduceChange = () => {
      if (reduceMotion.matches) {
        running.forEach((a) => a.cancel());
        stopSwimming();
      } else {
        startSwimming();
      }
    };
    reduceMotion.addEventListener("change", onReduceChange);
    setState("idle");
    startSwimming();
    schedule(rand(5000, 8000));

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      running.forEach((a) => a.cancel());
      stopSwimming();
      reduceMotion.removeEventListener("change", onReduceChange);
      document.removeEventListener("visibilitychange", applyPause);
      observer.disconnect();
      scene.removeAttribute("data-paused");
    };
  }, [layerRef, screen, multiply, haloRef, impactRef, surfaceRef]);
}
