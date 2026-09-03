"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useInView } from "framer-motion";

// 柔和暖色調，符合網站米色/棕色系
const COLORS = [
  "rgba(180,140,90,",   // 金棕
  "rgba(210,160,100,",  // 淡金
  "rgba(155,110,75,",   // 深棕
  "rgba(230,190,130,",  // 淡杏
  "rgba(200,120,80,",   // 磚紅
  "rgba(170,155,130,",  // 灰棕
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  color: string;
  decay: number;
  gravity: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface Burst {
  particles: Particle[];
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createBurst(x: number, y: number): Burst {
  const count = Math.floor(randomBetween(18, 30));
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + randomBetween(-0.15, 0.15);
    const speed = randomBetween(0.8, 2.8);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: randomBetween(0.7, 1),
      radius: randomBetween(1.2, 2.4),
      color,
      decay: randomBetween(0.012, 0.022),
      gravity: randomBetween(0.018, 0.032),
      trail: [],
    });
  }
  return { particles };
}

export function AboutFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.1 });
  const inViewRef = useRef(false);
  const rafRef = useRef<number>(0);
  const burstsRef = useRef<Burst[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 解析度 resize
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // 隨機煙火位置（分散在整個 section，偏向上半部）
    function spawnBurst() {
      if (!inViewRef.current) {
        timerRef.current = setTimeout(spawnBurst, 1200);
        return;
      }
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const x = randomBetween(rect.width * 0.08, rect.width * 0.92);
      const y = randomBetween(rect.height * 0.05, rect.height * 0.75);
      burstsRef.current.push(createBurst(x, y));
      // 下一顆煙火：1.5~3.5s 後隨機觸發
      const delay = randomBetween(1500, 3500);
      timerRef.current = setTimeout(spawnBurst, delay);
    }

    // 稍微延遲後開始，讓頁面先進場
    timerRef.current = setTimeout(spawnBurst, 800);

    // 動畫 loop
    function loop() {
      const w = canvas!.width / devicePixelRatio;
      const h = canvas!.height / devicePixelRatio;
      ctx!.clearRect(0, 0, w, h);

      burstsRef.current = burstsRef.current.filter((burst) => {
        burst.particles = burst.particles.filter((p) => {
          // 拖尾
          p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
          if (p.trail.length > 6) p.trail.shift();

          // 畫拖尾
          for (let i = 0; i < p.trail.length - 1; i++) {
            const t = p.trail[i];
            ctx!.beginPath();
            ctx!.arc(t.x, t.y, p.radius * 0.5, 0, Math.PI * 2);
            ctx!.fillStyle = p.color + (t.alpha * 0.25).toFixed(3) + ")";
            ctx!.fill();
          }

          // 畫粒子本體
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fillStyle = p.color + p.alpha.toFixed(3) + ")";
          ctx!.fill();

          // 更新物理
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.985;
          p.alpha -= p.decay;

          return p.alpha > 0;
        });
        return burst.particles.length > 0;
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      ro.disconnect();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
