"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";

export type SegmentedOption = {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
};

type SegmentedControlProps = {
  options: SegmentedOption[];
  value: string;
  onChange: (id: string) => void;
  layoutId?: string;
  ariaLabel?: string;
  className?: string;
};

export function SegmentedControl({
  options,
  value,
  onChange,
  layoutId = "segmented-tab",
  ariaLabel,
  className = "",
}: SegmentedControlProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`inline-flex max-w-full flex-wrap items-center justify-center rounded-full border border-[#e8e8e8] bg-white p-1 shadow-[0_1px_4px_rgba(42,38,34,0.06)] ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = option.id === value;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors sm:px-5 sm:py-3 ${
              isActive ? "text-white" : "text-[#5c5c5c] hover:text-[#2a2622]"
            }`}
          >
            {isActive ? (
              reduced ? (
                <span className="absolute inset-0 rounded-full bg-[#1a1a1a]" aria-hidden />
              ) : (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full bg-[#1a1a1a]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden
                />
              )
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
              {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
