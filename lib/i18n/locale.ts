import { cookies } from "next/headers";
import { defaultLocale, LOCALE_COOKIE, type Locale } from "./types";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "zh";
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}
