function BirdIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4 14c6-8 18-12 28-8 3 1 6 1 9-1 2 3 5 5 8 6-6 2-12 2-18 0-5 3-10 5-16 5l-4 2c-3-2-5-3-7-4z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

type FlyingBirdsProps = {
  /** e.g. sky hero: text-white/35 */
  className?: string;
};

export function FlyingBirds({ className = "text-white/35" }: FlyingBirdsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="bird-drift-1 absolute left-0 top-[18%]">
        <BirdIcon className="h-3 w-7 md:h-4 md:w-10" />
      </div>
      <div className="bird-drift-2 absolute left-0 top-[32%] scale-90">
        <BirdIcon className="h-2.5 w-6 md:h-3.5 md:w-9" />
      </div>
      <div className="bird-drift-3 absolute left-0 top-[48%] scale-75">
        <BirdIcon className="h-2 w-5 md:h-3 md:w-8" />
      </div>
      <div className="bird-drift-4 absolute left-0 top-[62%]">
        <BirdIcon className="h-3 w-7 md:h-4 md:w-10" />
      </div>
      <div className="bird-drift-5 absolute left-0 top-[76%] scale-80">
        <BirdIcon className="h-2.5 w-6 md:h-3.5 md:w-9" />
      </div>
    </div>
  );
}
