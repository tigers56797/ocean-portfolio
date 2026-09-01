"use client";

import { container, sectionX } from "@/lib/site-layout";
import { messages } from "@/lib/i18n/messages";
import { useLocale, useTranslations } from "@/lib/i18n/locale-provider";
import { ExperienceTimelineBg } from "./experience-timeline-bg";
import { ExperienceStack } from "./experience-stack";
import { SectionReveal } from "./section-reveal";

export function ExperienceSection() {
  const t = useTranslations();
  const locale = useLocale();
  const experiences = messages[locale].experience.items;

  return (
    <section
      id="experience"
      className={`experience-section scroll-mt-28 border-t border-[#e8dfd4]/90 bg-[#faf8f4] py-24 md:py-28 ${sectionX}`}
      aria-labelledby="experience-heading"
    >
      <ExperienceTimelineBg />

      <SectionReveal className={`${container} relative z-[1]`}>
        <div className="max-w-2xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
            {t("experience.eyebrow")}
          </p>
          <h2
            id="experience-heading"
            className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#2a2622] md:text-4xl"
          >
            {t("experience.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#6f6760] md:text-base">
            {t("experience.description")}
          </p>
        </div>

        {experiences.length === 3 ? <ExperienceStack items={experiences} /> : null}
      </SectionReveal>
    </section>
  );
}
