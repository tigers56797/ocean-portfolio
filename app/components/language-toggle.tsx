"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/types";
import { useLocale, useTranslations } from "@/lib/i18n/locale-provider";

const toggleClass =
  "inline-flex shrink-0 items-center rounded-full border border-white/55 bg-white/30 p-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#5c6570] shadow-[0_8px_28px_-14px_rgba(15,60,100,0.2)] backdrop-blur-md sm:text-[0.6rem] sm:tracking-[0.16em]";

const segmentClass =
  "rounded-full px-2 py-1 transition-[background-color,color,box-shadow] sm:px-2.5 sm:py-1";

const segmentActiveClass =
  "bg-white/65 text-[#1a2f42] shadow-sm ring-1 ring-white/60 backdrop-blur-sm";

const segmentInactiveClass = "hover:bg-white/25 hover:text-[#1a2f42]";

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      className={toggleClass}
      role="group"
      aria-label={locale === "en" ? t("nav.switchToZh") : t("nav.switchToEn")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`${segmentClass} ${locale === "en" ? segmentActiveClass : segmentInactiveClass}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`${segmentClass} ${locale === "zh" ? segmentActiveClass : segmentInactiveClass}`}
        aria-pressed={locale === "zh"}
      >
        中
      </button>
    </div>
  );
}
