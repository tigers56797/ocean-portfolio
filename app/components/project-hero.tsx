"use client";

import type { Project } from "@/data/projects";
import { projectHero } from "@/lib/site-layout";
import { ProjectImage } from "./project-image";
import { SectionReveal } from "./section-reveal";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
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
