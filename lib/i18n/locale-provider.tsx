"use client";

import { createContext, useContext, type ReactNode } from "react";
import { createTranslator } from "./messages";
import type { Locale } from "./types";

type LocaleContextValue = {
  locale: Locale;
  t: ReturnType<typeof createTranslator>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  locale: Locale;
  children: ReactNode;
};

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, t: createTranslator(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context.locale;
}

export function useTranslations() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useTranslations must be used within LocaleProvider");
  }
  return context.t;
}
