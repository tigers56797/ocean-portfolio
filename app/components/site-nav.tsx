"use client";

import Image from "next/image";
import { navShell, sectionX } from "@/lib/site-layout";
import { useLocale, useTranslations } from "@/lib/i18n/locale-provider";
import { LanguageToggle } from "./language-toggle";

const CV_PDF = {
  en: "/English_OceanOu_CV.pdf",
  zh: "/English_OceanOu_CV.pdf",
} as const;

const navLinks = [
  { href: "#about", key: "nav.about" },
  { href: "#experience", key: "nav.experience" },
  { href: "#work", key: "nav.work" },
  { href: "mailto:asd46639@gmail.com", key: "nav.contact" },
] as const;

export function SiteNav() {
  const t = useTranslations();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex justify-center pt-3 md:pt-4 ${sectionX}`}>
      <nav
        className={`flex ${navShell} items-center justify-between gap-2.5 rounded-full border border-white/55 bg-white/88 px-3.5 py-1.5 shadow-[0_12px_40px_-24px_rgba(15,60,100,0.22)] backdrop-blur-md sm:gap-3 sm:px-4 sm:py-2 md:px-6`}
        aria-label="Primary"
      >
        <a href="#top" className="flex min-w-0 items-center gap-[14px]">
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#e8f0f8] ring-1 ring-[#1e3a50]/10 shadow-sm sm:h-8 sm:w-8">
            <Image
              src="/images/about-avatar.jpg"
              alt=""
              width={32}
              height={32}
              className="object-cover"
              priority
            />
          </span>
          <span className="shrink-0 font-polyamine text-[18px] font-semibold leading-none tracking-[-0.03em] text-[#24364a]">
            Ocean Ou
          </span>
        </a>

        <NavLinks t={t} />
      </nav>
    </header>
  );
}

function NavLinks({ t }: { t: ReturnType<typeof useTranslations> }) {
  const locale = useLocale();

  return (
    <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 md:gap-6">
      <ul className="flex min-w-0 items-center justify-end gap-3 overflow-x-auto text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#5c6570] [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:text-[0.68rem] md:gap-8 md:text-[0.72rem] md:tracking-[0.22em] [&::-webkit-scrollbar]:hidden">
        {navLinks.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="transition-colors hover:text-[#1a2f42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4298d4]"
            >
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>
      <LanguageToggle />
      <a
        href={CV_PDF[locale]}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("nav.viewCvAria")}
        className="shrink-0 rounded-full bg-[#0f0f0f] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition-[background-color,transform] hover:bg-[#1a1a1a] active:scale-[0.98] sm:px-3.5 sm:py-1.5 sm:text-[0.62rem] sm:tracking-[0.18em]"
      >
        {t("nav.viewCv")}
      </a>
    </div>
  );
}
