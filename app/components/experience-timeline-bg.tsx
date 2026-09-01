const YEARS = [
  { year: "2023", className: "experience-year--2023" },
  { year: "2024", className: "experience-year--2024" },
  { year: "2025", className: "experience-year--2025" },
  { year: "2026", className: "experience-year--2026" },
] as const;

export function ExperienceTimelineBg() {
  return (
    <div className="experience-timeline-bg" aria-hidden>
      <span className="experience-timeline-line" />
      {YEARS.map(({ year, className }) => (
        <span key={year} className={`experience-year ${className}`}>
          {year}
        </span>
      ))}
    </div>
  );
}
