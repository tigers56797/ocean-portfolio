import type { Metadata } from "next";
import { createTranslator } from "@/lib/i18n/messages";
import { getLocale } from "@/lib/i18n/locale";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = createTranslator(locale);

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
