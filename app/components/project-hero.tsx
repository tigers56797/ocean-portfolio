"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { projectHero } from "@/lib/site-layout";
import { ProjectImage } from "./project-image";
import { SectionReveal } from "./section-reveal";

type ProjectHeroProps = {
  project: Project;
};

function ProductMark({
  className = "",
  tone = "kodo",
}: {
  className?: string;
  tone?: "kodo" | "moss";
}) {
  const bg = tone === "moss" ? "bg-[#6b5b95]" : "bg-[#1f4d3a]";
  return (
    <span
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${bg} text-white ${className}`}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1.2l1.05 3.55L11.7 5.8 8.05 7.95 7 11.7 5.95 7.95 2.3 5.8l3.65-1.05L7 1.2z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function ProductHero({ project }: ProjectHeroProps) {
  const primary =
    project.heroPrimaryCta ??
    (project.exploreUrl
      ? { label: project.exploreLabel ?? "Explore", href: project.exploreUrl }
      : null);
  const secondary = project.heroSecondaryCta;
  const headline = project.heroHeadline ?? project.title;
  const isKodo = project.slug === "kodo";
  const isMoss = project.slug === "moss";
  const showMascots = isKodo && (primary || secondary);
  const heroVisuals = project.heroVisuals?.filter(Boolean) ?? [];
  const hasRightVisual = Boolean(project.heroVisual) || heroVisuals.length > 0;

  const shellTone = isMoss
    ? "from-[#f7f5fb] via-[#fffdf8] to-[#efeaf8]"
    : "from-[#f7faf7] via-[#fffdf8] to-[#eef5ef]";
  const glowTone = isMoss
    ? "bg-[radial-gradient(circle,rgba(120,100,170,0.2)_0%,rgba(120,100,170,0)_68%)]"
    : "bg-[radial-gradient(circle,rgba(90,150,120,0.22)_0%,rgba(90,150,120,0)_68%)]";
  const badgeTone = isMoss
    ? "bg-[#eee8f8] text-[#5a4a7a]"
    : "bg-[#e5f2e8] text-[#2f6b4a]";
  const pillBorder = isMoss ? "border-[#ddd4e8]" : "border-[#d7e4da]";
  const primaryBtn = isMoss
    ? "bg-[#6b5b95] shadow-[0_12px_28px_-14px_rgba(107,91,149,0.7)] hover:bg-[#574a7a]"
    : "bg-[#1f4d3a] shadow-[0_12px_28px_-14px_rgba(31,77,58,0.7)] hover:bg-[#16382b]";

  return (
    <section className="pb-10 md:pb-14">
      <SectionReveal>
        <div
          className={`relative overflow-visible rounded-[1.75rem] bg-gradient-to-br ${shellTone} px-6 py-10 sm:px-8 md:rounded-[2rem] md:px-10 md:py-12 lg:px-12 lg:py-14`}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-16 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full ${glowTone} blur-2xl`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,253,248,0.9)_0%,rgba(255,253,248,0)_70%)]"
          />

          <div
            className={`relative grid items-center gap-10 lg:gap-6 xl:gap-8 ${
              hasRightVisual
                ? "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
                : "lg:grid-cols-1"
            }`}
          >
            <div className="relative min-w-0 max-w-xl">
              <div className="relative z-[1]">
                <div
                  className={`inline-flex flex-wrap items-center gap-2.5 rounded-full border ${pillBorder} bg-white/75 px-2.5 py-1.5 shadow-sm backdrop-blur-sm`}
                >
                  <ProductMark tone={isMoss ? "moss" : "kodo"} />
                  <span className="text-[0.92rem] font-semibold tracking-tight text-[#1a2a22]">
                    {project.title.replace(/\s*動$/, "") || project.title}
                  </span>
                  {project.heroBadge ? (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-medium tracking-wide ${badgeTone}`}
                    >
                      {project.heroBadge}
                    </span>
                  ) : null}
                </div>

                <h1 className="product-hero-headline mt-6 w-fit max-w-full text-[clamp(2.35rem,5.2vw,3.6rem)] font-semibold leading-[1.12] tracking-tight">
                  {headline.split("\n").map((line, index, lines) => {
                    const isEmphasis = index === lines.length - 1 && lines.length > 1;
                    const text = (
                      <span
                        className={`product-hero-shimmer-text${isEmphasis ? " product-hero-shimmer-text--green" : ""}`}
                      >
                        {line}
                      </span>
                    );
                    return (
                      <span
                        key={`${line}-${index}`}
                        className={`block w-fit max-w-full ${index > 0 ? "mt-1" : ""}`}
                      >
                        {isEmphasis ? (
                          <span className="product-hero-highlight">{text}</span>
                        ) : (
                          text
                        )}
                      </span>
                    );
                  })}
                </h1>

                <p className="mt-5 max-w-md text-[0.98rem] leading-[1.75] text-[#5c6a62] md:text-[1.05rem] md:leading-[1.75]">
                  {project.description}
                </p>

                {(primary || secondary) && (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {primary ? (
                      <a
                        href={primary.href}
                        target={primary.href.startsWith("#") ? undefined : "_blank"}
                        rel={primary.href.startsWith("#") ? undefined : "noopener noreferrer"}
                        className={`inline-flex min-h-[2.85rem] items-center justify-center rounded-full px-5 text-[0.82rem] font-semibold text-white transition-[background-color,transform] active:scale-[0.98] ${primaryBtn}`}
                      >
                        {primary.label}
                      </a>
                    ) : null}
                    {secondary ? (
                      <a
                        href={secondary.href}
                        target={secondary.href.startsWith("#") ? undefined : "_blank"}
                        rel={secondary.href.startsWith("#") ? undefined : "noopener noreferrer"}
                        className="inline-flex min-h-[2.85rem] items-center justify-center rounded-full border border-[#d5ddd7] bg-white/90 px-5 text-[0.82rem] font-semibold text-[#1a2a22] transition-[background-color,border-color,transform] hover:border-[#9bb5a4] hover:bg-[#f7faf7] active:scale-[0.98]"
                      >
                        {secondary.label}
                      </a>
                    ) : null}

                    {showMascots ? (
                      <div aria-hidden className="product-hero-mascot ml-1 flex items-end gap-0.5">
                        <div className="product-hero-mascot--flower w-[2.85rem] md:w-[3.1rem]">
                          <Image
                            src="/images/kodo/新吉祥物5-白花.png"
                            alt=""
                            width={253}
                            height={322}
                            className="h-auto w-full object-contain drop-shadow-[0_8px_14px_-10px_rgba(40,70,50,0.35)]"
                          />
                        </div>
                        <div className="product-hero-mascot--branch mb-0.5 w-[3.05rem] md:w-[3.3rem]">
                          <Image
                            src="/images/kodo/新吉祥物6-樹枝.png"
                            alt=""
                            width={279}
                            height={303}
                            className="h-auto w-full object-contain drop-shadow-[0_8px_14px_-10px_rgba(40,70,50,0.35)]"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {project.heroSupportNote ? (
                  <p className="mt-6 text-[0.72rem] leading-relaxed tracking-wide text-[#8a958e]">
                    {project.heroSupportNote}
                  </p>
                ) : null}
              </div>
            </div>

            {heroVisuals.length > 0 ? (
              <div className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-[24rem] lg:max-w-[27rem]">
                <div className="product-hero-moss-stage relative mx-auto aspect-[5/4] w-full">
                  {heroVisuals.slice(0, 2).map((src, index) => {
                    const isFront = index === 1;
                    return (
                      <div
                        key={src}
                        className={
                          isFront
                            ? "product-hero-moss-phone product-hero-moss-phone--front absolute left-[50%] top-[4%] z-[2] w-[38%]"
                            : "product-hero-moss-phone product-hero-moss-phone--back absolute left-[8%] top-[10%] z-[1] w-[38%]"
                        }
                      >
                        <Image
                          src={src}
                          alt={
                            project.heroAlt
                              ? `${project.heroAlt} ${index + 1}`
                              : `${project.title} preview ${index + 1}`
                          }
                          width={846}
                          height={1868}
                          priority={index === 0}
                          className="h-auto w-full object-contain drop-shadow-[0_18px_32px_-14px_rgba(70,50,110,0.42)]"
                          sizes="(max-width: 1024px) 32vw, 170px"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : project.heroVisual ? (
              <div className="relative min-w-0">
                <div className="product-hero-float relative mx-auto w-full max-w-none origin-center scale-[1.04] lg:scale-[1.06]">
                  <Image
                    src={project.heroVisual}
                    alt={project.heroAlt ?? `${project.title} — product preview`}
                    width={1600}
                    height={1200}
                    priority
                    className="h-auto w-full object-contain drop-shadow-[0_28px_48px_-24px_rgba(30,60,45,0.35)]"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function DefaultHero({ project }: ProjectHeroProps) {
  return (
    <section className="pb-16 md:pb-20">
      <SectionReveal>
        <div className="mx-auto w-full max-w-4xl 2xl:max-w-5xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
            {project.meta}
          </p>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-[#2a2622]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6f6760] md:text-xl md:leading-relaxed">
            {project.description}
          </p>
        </div>
      </SectionReveal>

      {project.heroImage ? (
        <SectionReveal className={`${projectHero} mt-14 md:mt-16`} delay={0.06} variant="fade">
          <ProjectImage
            src={project.heroImage}
            alt={project.heroAlt ?? project.title}
            frame={project.frame}
            zoomOnHover
            className="!aspect-[16/9] rounded-[1.75rem] md:rounded-[2rem]"
            priority
          />
        </SectionReveal>
      ) : null}
    </section>
  );
}

export function ProjectHero({ project }: ProjectHeroProps) {
  if (project.heroLayout === "product") {
    return <ProductHero project={project} />;
  }
  return <DefaultHero project={project} />;
}
