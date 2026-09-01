"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ProjectGalleryView } from "@/data/projects";
import { ProjectContent } from "./project-content";
import { SectionReveal } from "./section-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const exploreButtonClass =
  "explore-kodo-button group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/55 bg-white/30 px-5 py-2.5 text-sm font-medium text-[#2a2622] shadow-[0_8px_28px_-14px_rgba(15,60,100,0.2)] backdrop-blur-md transition-[background-color,border-color,transform,box-shadow] hover:border-white/70 hover:bg-white/45 hover:shadow-[0_12px_32px_-12px_rgba(15,60,100,0.28)] active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3";

function ExploreArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M3.5 8h8.2M8.8 4.8 12.2 8l-3.4 3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExploreLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${exploreButtonClass} ${className ?? ""}`}
    >
      <span className="relative z-[1]">{label}</span>
      <ExploreArrow className="relative z-[1] h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </a>
  );
}

type ProjectGallerySwitcherProps = {
  views: ProjectGalleryView[];
  frame?: string;
  exploreUrl?: string;
  exploreLabel?: string;
};

export function ProjectGallerySwitcher({
  views,
  frame,
  exploreUrl,
  exploreLabel,
}: ProjectGallerySwitcherProps) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(views[0]?.id ?? "");
  const activeView = views.find((view) => view.id === activeId) ?? views[0];

  if (!activeView) return null;

  return (
    <div>
      <SectionReveal
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-12"
        variant="fade"
      >
        <div
          className="inline-flex w-fit items-center rounded-full border border-[#e8e8e8] bg-white p-1 shadow-[0_1px_4px_rgba(42,38,34,0.06)]"
          role="tablist"
          aria-label="Project gallery views"
        >
          {views.map((view) => {
            const isActive = view.id === activeId;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(view.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:px-6 sm:py-3 ${
                  isActive ? "text-white" : "text-[#5c5c5c] hover:text-[#2a2622]"
                }`}
              >
                {isActive ? (
                  reduced ? (
                    <span className="absolute inset-0 rounded-full bg-[#1a1a1a]" aria-hidden />
                  ) : (
                    <motion.span
                      layoutId="project-gallery-tab"
                      className="absolute inset-0 rounded-full bg-[#1a1a1a]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      aria-hidden
                    />
                  )
                ) : null}
                <span className="relative z-10">{view.label}</span>
              </button>
            );
          })}
        </div>

        {exploreUrl && exploreLabel ? (
          <ExploreLink
            href={exploreUrl}
            label={exploreLabel}
            className="self-start sm:self-auto"
          />
        ) : null}
      </SectionReveal>

      {reduced ? (
        <ProjectContent blocks={activeView.blocks} frame={frame} />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeView.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <ProjectContent blocks={activeView.blocks} frame={frame} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
