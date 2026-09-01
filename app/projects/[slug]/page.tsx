import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToTop } from "@/app/components/back-to-top";
import { ProjectBackSection, ProjectCtaSection } from "@/app/components/project-page-sections";
import { ProjectContent } from "@/app/components/project-content";
import { ProjectGallerySwitcher } from "@/app/components/project-gallery-switcher";
import { ProjectHero } from "@/app/components/project-hero";
import { ProjectNav } from "@/app/components/project-nav";
import { getAllProjectSlugs, getProjectBySlug, getProjectCtas } from "@/data/projects";
import { getLocale } from "@/lib/i18n/locale";
import { container, sectionX } from "@/lib/site-layout";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return { title: "Project — Ocean Ou" };
  }

  return {
    title: `${project.title} — Ocean Ou`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  const ctas = getProjectCtas(project, locale);

  return (
    <div id="top" className="relative flex min-h-full flex-col bg-[#fffdf8]">
      <ProjectNav />

      <main className="relative z-10 flex flex-1 flex-col pt-28 md:pt-32">
        <div className={`${sectionX} pb-28 md:pb-32`}>
          <div className={container}>
            <ProjectHero project={project} />

            {project.galleryViews && project.galleryViews.length > 0 ? (
              <div className="mt-16 md:mt-20">
                <ProjectGallerySwitcher
                  views={project.galleryViews}
                  frame={project.frame}
                  exploreUrl={project.exploreUrl}
                  exploreLabel={project.exploreLabel}
                />
              </div>
            ) : project.content.length > 0 ? (
              <div className="mt-16 md:mt-20">
                <ProjectContent blocks={project.content} frame={project.frame} />
              </div>
            ) : null}

            <ProjectCtaSection ctas={ctas} />
            <ProjectBackSection />
          </div>
        </div>
      </main>

      <BackToTop mode="scroll" />
    </div>
  );
}
