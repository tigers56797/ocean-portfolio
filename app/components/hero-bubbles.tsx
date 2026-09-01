"use client";

type HeroBubblesProps = {
  className?: string;
};

export function HeroBubbles({ className }: HeroBubblesProps) {
  return (
    <div
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        "z-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="hero-bubble hero-bubble-1" />
      <span className="hero-bubble hero-bubble-2" />
    </div>
  );
}

