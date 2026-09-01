import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import { createTranslator, messages } from "@/lib/i18n/messages";
import { getLocale } from "@/lib/i18n/locale";
import { cardGrid, container, heroInner, sectionX } from "@/lib/site-layout";
import { AboutQuote } from "./components/about-quote";
import { BackToTop } from "./components/back-to-top";
import { ExperienceSection } from "./components/experience-section";
import { ManifestoSection } from "./components/manifesto-section";
import { ValueSection } from "./components/value-section";
import { FocusPillarCards } from "./components/focus-pillar-cards";
import { FlyingBirds } from "./components/flying-birds";
import { HeroBubbles } from "./components/hero-bubbles";
import { HeroContent } from "./components/hero-content";
import { HeroScrollCue } from "./components/hero-scroll-cue";
import { PhotoStack } from "./components/photo-stack";
import { ProjectCard } from "./components/project-card";
import { SectionReveal } from "./components/section-reveal";
import { StaggerItem, StaggerReveal } from "./components/stagger-reveal";
import { SiteNav } from "./components/site-nav";

const photos = [
  "/images/about-1.jpg",
  "/images/about-2.jpg",
  "/images/about-3.jpg",
  "/images/about-4.jpg",
  "/images/about-5.jpg",
  "/images/about-6.jpg",
];

export default async function Home() {
  const locale = await getLocale();
  const t = createTranslator(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const aboutParagraphs = messages[locale].about.bodyParagraphs;

  return (
    <div id="top" className="relative flex min-h-full flex-col overflow-x-clip bg-[#fffdf8]">
      <SiteNav />

      <main className="relative z-10 flex flex-1 flex-col overflow-x-clip">
        <section className={`relative hero-sky flex min-h-[92vh] flex-col justify-center overflow-x-clip pb-28 pt-36 md:pb-32 ${sectionX}`}>
          <HeroBubbles />
          <FlyingBirds />
          <HeroContent className={`relative flex flex-col items-center text-center ${heroInner}`} />
          <HeroScrollCue />
        </section>

        <section id="about" className={`scroll-mt-28 overflow-x-clip bg-[#fffdf8] py-28 ${sectionX}`}>
          <SectionReveal className={`grid ${container} gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20 lg:items-start`}>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
                {t("about.eyebrow")}
              </p>
              <AboutQuote line1={t("about.quoteLine1")} line2={t("about.quoteLine2")} />
              <PhotoStack photos={photos} />
            </div>
            <div className="space-y-8 rounded-[2rem] border border-[#ebe3d7] bg-[#fffdf8]/70 p-10 shadow-[0_24px_80px_-48px_rgba(42,38,34,0.35)] backdrop-blur-sm md:p-12">
              <div className="space-y-6 text-lg leading-[1.75] text-[#4a433c]">
                {aboutParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>
                    {paragraph.map((part, partIndex) =>
                      "highlight" in part && part.highlight ? (
                        <span key={partIndex} className="about-quote-highlight">
                          {part.text}
                        </span>
                      ) : (
                        <span key={partIndex}>{part.text}</span>
                      ),
                    )}
                  </p>
                ))}
              </div>

              <p className="font-serif text-xl italic text-[#3d3835]">
                {t("about.signature")}
                <br />
                <span className="not-italic font-semibold tracking-tight">{t("about.role")}</span>
              </p>
            </div>
          </SectionReveal>
        </section>

        <ExperienceSection />

        <ValueSection />

        <ManifestoSection />

        <section
          id="work"
          className={`scroll-mt-28 border-t border-[#e8dfd4]/80 bg-[#fffdf8] py-28 ${sectionX}`}
        >
          <div className={container}>
            <SectionReveal>
              <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
                    {t("work.eyebrow")}
                  </p>
                  <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#2a2622] md:text-5xl">
                    {t("work.title")}
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-[#6f6760] md:max-w-lg lg:max-w-xl">
                  {t("work.description")}
                </p>
              </div>
            </SectionReveal>

            <StaggerReveal className={cardGrid} stagger={0.12} delayChildren={0.04}>
              {featuredProjects.map((project, index) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard project={project} priority={index === 0} />
                </StaggerItem>
              ))}
            </StaggerReveal>

            <SectionReveal className="mt-12 flex justify-center md:mt-14">
              <Link
                href="/projects"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[#ddd4c8] bg-transparent px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#2a2622] transition-[background-color,border-color,transform] hover:border-[#8b7355] hover:bg-[#faf6f0] active:scale-[0.98] md:px-10 md:text-[0.7rem] md:tracking-[0.22em]"
              >
                {t("work.more")}
              </Link>
            </SectionReveal>

            <SectionReveal className="mt-16">
              <FocusPillarCards />
            </SectionReveal>
          </div>
        </section>

        <footer id="contact" className={`scroll-mt-28 mt-auto border-t border-[#e8dfd4]/90 bg-[#fffdf8] py-20 ${sectionX}`}>
          <SectionReveal>
            <div className={`flex ${container} flex-col gap-10 md:flex-row md:items-end md:justify-between`}>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
                  {t("contact.eyebrow")}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6f6760]">
                  {t("contact.description")}
                </p>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <a
                  href="mailto:asd46639@gmail.com"
                  className="font-serif text-2xl text-[#2a2622] underline decoration-[#ddd4c8] decoration-2 underline-offset-8 transition-colors hover:decoration-[#8b7355]"
                >
                  asd46639@gmail.com
                </a>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#a89888]">
                  {t("contact.location")}
                </p>
              </div>
            </div>
            <div className={`${container} mt-16 border-t border-[#efe8df]/90 pt-8 text-[0.65rem] tracking-[0.18em] text-[#b0a499]`}>
              © {new Date().getFullYear()} {t("contact.copyright")}
            </div>
          </SectionReveal>
        </footer>
      </main>

      <BackToTop />
    </div>
  );
}
