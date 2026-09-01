import type { CSSProperties } from "react";

const RIPPLES = [
  { left: "18%", top: "22%", delay: 0, duration: 4.8 },
  { left: "74%", top: "18%", delay: -1.8, duration: 5.2 },
  { left: "42%", top: "68%", delay: -3.2, duration: 4.5 },
  { left: "12%", top: "52%", delay: -2.4, duration: 5.5 },
  { left: "62%", top: "38%", delay: -4.1, duration: 5 },
] as const;

export function ManifestoRainRipples() {
  return (
    <div className="manifesto-rain-ripples" aria-hidden>
      {RIPPLES.map((ripple, index) => (
        <span
          key={index}
          className="manifesto-rain-ripple"
          style={
            {
              left: ripple.left,
              top: ripple.top,
              "--ripple-delay": `${ripple.delay}s`,
              "--ripple-duration": `${ripple.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
