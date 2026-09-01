"use client";

import Image from "next/image";
import Link from "next/link";
import { navShell, sectionX } from "@/lib/site-layout";
import { useTranslations } from "@/lib/i18n/locale-provider";
import { LanguageToggle } from "./language-toggle";

export function ProjectNav() {
  const t = useTranslations();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex justify-center pt-3 md:pt-4 ${sectionX}`}>
      <nav
        className={`flex ${navShell} items-center justify-between gap-3 rounded-full border border-[#ebe3d7]/90 bg-[#fffdf8]/92 px-4 py-1.5 shadow-[0_12px_40px_-24px_rgba(42,38,34,0.18)] backdrop-blur-md md:px-6 md:py-2`}
        aria-label="Project"
      >
        <Link href="/#work" className="flex min-w-0 items-center gap-[14px]">
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
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <Link
            href="/#work"
            className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#6f6760] transition-colors hover:text-[#2a2622]"
          >
            {t("nav.backToWork")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
