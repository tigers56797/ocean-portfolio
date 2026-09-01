import Link from "next/link";
import { ProjectNav } from "@/app/components/project-nav";
import { createTranslator } from "@/lib/i18n/messages";
import { getLocale } from "@/lib/i18n/locale";
import { container, sectionX } from "@/lib/site-layout";

export default async function ProjectNotFound() {
  const locale = await getLocale();
  const t = createTranslator(locale);

  return (
    <div className="relative flex min-h-full flex-col bg-[#fffdf8]">
      <ProjectNav />
      <main className={`flex flex-1 flex-col items-center justify-center pt-28 pb-20 text-center ${sectionX}`}>
        <div className={container}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
            {t("projects.allEyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-[#2a2622] md:text-4xl">
            {t("projects.notFoundTitle")}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#6f6760]">
            {t("projects.notFoundDescription")}
          </p>
          <Link
            href="/#work"
            className="mt-10 inline-flex text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#8b7355] transition-colors hover:text-[#2a2622]"
          >
            {t("nav.backToSelected")}
          </Link>
        </div>
      </main>
    </div>
  );
}
