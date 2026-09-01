"use client";

import Link from "next/link";
import type { ProjectCta } from "@/data/projects";
import { useTranslations } from "@/lib/i18n/locale-provider";
import { SectionReveal } from "./section-reveal";

type ProjectCtaSectionProps = {
  ctas: ProjectCta[];
};

export function ProjectCtaSection({ ctas }: ProjectCtaSectionProps) {
  if (ctas.length === 0) return null;

  return (
    <SectionReveal className="mt-16 flex flex-wrap items-center justify-center gap-3 md:mt-20 md:gap-4">
      {ctas.map((cta) => (
        <a
          key={cta.href}
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[#ddd4c8] bg-[#fffdf8] px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#2a2622] shadow-sm transition-[background-color,border-color,transform] hover:border-[#8b7355] hover:bg-[#faf6f0] active:scale-[0.98] md:px-10"
        >
          {cta.label}
        </a>
      ))}
    </SectionReveal>
  );
}

export function ProjectBackSection() {
  const t = useTranslations();

  return (
    <SectionReveal
      className="mt-16 flex justify-center border-t border-[#e8dfd4]/90 pt-12 md:mt-20"
      variant="fade"
    >
      <Link
        href="/#work"
        className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#8b7355] transition-colors hover:text-[#2a2622]"
      >
        {t("nav.backToSelected")}
      </Link>
    </SectionReveal>
  );
}
