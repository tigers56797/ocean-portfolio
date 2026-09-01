import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectContent } from "@/app/components/project-content";
import { ProjectHero } from "@/app/components/project-hero";
import { ProjectNav } from "@/app/components/project-nav";
import { SectionReveal } from "@/app/components/section-reveal";
import { getAllProjectSlugs, getProjectBySlug, getProjectCtas } from "@/data/projects";
import { prose, sectionX } from "@/lib/site-layout";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Ocean Ou`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const ctas = getProjectCtas(project);

  return (
    <div className="relative flex min-h-full flex-col bg-[#fffdf8]">
      <ProjectNav />

      <main className="relative z-10 flex flex-1 flex-col pt-28 md:pt-32">
        <section className={sectionX}>
          <ProjectHero project={project} />
        </section>

        <section className={`border-t border-[#e8dfd4]/80 py-20 md:py-28 ${sectionX}`}>
          <ProjectContent blocks={project.content} frame={project.frame} />
          {ctas.length > 0 ? (
            <SectionReveal className={`${prose} mt-16 border-t border-[#e8dfd4]/80 pt-14 md:mt-20 md:pt-16`}>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                {ctas.map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[#0f0f0f] px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition-[background-color,transform] hover:bg-[#1a1a1a] active:scale-[0.98] md:px-10 md:text-[0.7rem] md:tracking-[0.22em]"
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </SectionReveal>
          ) : null}
        </section>
      </main>
    </div>
  );
}
