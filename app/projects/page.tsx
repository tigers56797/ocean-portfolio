import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";
import { createTranslator } from "@/lib/i18n/messages";
import { getLocale } from "@/lib/i18n/locale";
import { ProjectCard } from "@/app/components/project-card";
import { SectionReveal } from "@/app/components/section-reveal";
import { SiteNav } from "@/app/components/site-nav";
import { StaggerItem, StaggerReveal } from "@/app/components/stagger-reveal";
import { cardGrid, container, sectionX } from "@/lib/site-layout";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = createTranslator(locale);

  return {
    title: t("meta.allProjectsTitle"),
    description: t("meta.allProjectsDescription"),
  };
}

export default async function AllProjectsPage() {
  const locale = await getLocale();
  const t = createTranslator(locale);
  const allProjects = getAllProjects(locale);

  return (
    <div id="top" className="relative flex min-h-full flex-col bg-[#fffdf8]">
      <SiteNav />

      <main className="relative z-10 flex flex-1 flex-col pt-28 md:pt-32">
        <section className={`border-b border-[#e8dfd4]/80 py-20 md:py-28 ${sectionX}`}>
          <div className={container}>
            <SectionReveal>
              <Link
                href="/#work"
                className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#8b7355] transition-colors hover:text-[#2a2622]"
              >
                {t("nav.backToSelected")}
              </Link>
              <p className="mt-10 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
                {t("projects.allEyebrow")}
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium tracking-tight text-[#2a2622] md:text-5xl">
                {t("projects.allTitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#6f6760] md:text-base">
                {t("projects.allDescription")}
              </p>
            </SectionReveal>

            <StaggerReveal className={`${cardGrid} mt-16 md:mt-20`} stagger={0.1} delayChildren={0.04}>
              {allProjects.map((project) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
