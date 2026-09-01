export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type ProjectCta = {
  label: string;
  href: string;
};

export type ProjectGalleryView = {
  id: string;
  label: string;
  blocks: ContentBlock[];
};

export type Project = {
  slug: string;
  meta: string;
  title: string;
  description: string;
  tag: string;
  tagStyle: string;
  frame: string;
  /** Shown on the homepage Selected Project section. */
  featured?: boolean;
  /** Homepage card thumbnail; falls back to heroImage */
  cardImage?: string;
  heroImage?: string;
  heroAlt?: string;
  /** External links at the bottom of the project page (open in a new tab). */
  ctas?: ProjectCta[];
  /** @deprecated Prefer `ctas`. */
  ctaUrl?: string;
  /** @deprecated Prefer `ctas`. */
  ctaLabel?: string;
  /** Tabbed gallery sections (e.g. UX / UI) with fade transitions. */
  galleryViews?: ProjectGalleryView[];
  content: ContentBlock[];
};

import { localizeProject } from "./project-locale";
import type { Locale } from "@/lib/i18n/types";
import { createTranslator } from "@/lib/i18n/messages";

export function getProjectCtas(project: Project, locale: Locale = "en"): ProjectCta[] {
  const t = createTranslator(locale);
  if (project.ctas?.length) return project.ctas;
  if (project.ctaUrl) {
    return [{ label: project.ctaLabel ?? t("projects.visitProject"), href: project.ctaUrl }];
  }
  return [];
}

export const projects: Project[] = [
  // Replace each `ctaUrl` (and optional `ctaLabel`) with your Figma, prototype, or live product link.
  {
    slug: "kodo",
    featured: true,
    meta: "Operational System · Ongoing",
    title: "Kodo",
    description:
      "An action-oriented anomaly handling system designed for high-pressure engineering environments, helping teams make decisions and respond quickly.",
    tag: "In production",
    cardImage: "/images/kodo/maincover2.png",
    tagStyle: "bg-[#e8f0e8] text-[#3d5c3d]",
    frame: "from-[#eef4fb] via-[#f5efe8] to-[#ebe3d7]",
    ctaUrl: "https://www.figma.com/proto/nCNYgTe4ToqNBNj1ieR09o/Kodo-%E5%8B%95?page-id=0%3A1&node-id=132-2015&p=f&viewport=3746%2C-6802%2C0.66&t=2LpxXALoJ6Rek1xc-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=132%3A2015&show-proto-sidebar=1",
    ctaLabel: "Prototype",
    galleryViews: [
      {
        id: "ux",
        label: "UX",
        blocks: [
          {
            type: "image",
            src: "/images/kodo/c6.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/c7.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/c8.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/c9.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/c10.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/c11.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          
        ],
      },
      {
        id: "ui",
        label: "UI",
        blocks: [
          {
            type: "image",
            src: "/images/kodo/FunctionalMap.png",
            alt: "Kodo 動 — UI screens",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/首頁.png",
            alt: "Kodo 動 — 首頁",
            caption: "首頁",
          },
          {
            type: "image",
            src: "/images/kodo/專案.png",
            alt: "Kodo 動 — 專案",
            caption: "專案",
          },
          {
            type: "image",
            src: "/images/kodo/專案詳細.png",
            alt: "Kodo 動 — 專案詳細",
            caption: "專案詳細",
          },
          {
            type: "image",
            src: "/images/kodo/專注.png",
            alt: "Kodo 動 — 專注",
            caption: "專注",
          },
          {
            type: "image",
            src: "/images/kodo/專注詳細.png",
            alt: "Kodo 動 — 專注詳細",
            caption: "專注詳細",
          },
          {
            type: "image",
            src: "/images/kodo/成長.png",
            alt: "Kodo 動 — 成長",
            caption: "成長",
          },
          {
            type: "image",
            src: "/images/kodo/UI Intro1.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/UI Intro2.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/UI Intro3.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/UI Intro4.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
          {
            type: "image",
            src: "/images/kodo/UI Intro5.png",
            alt: "Kodo 動 — UX overview",
            caption: "Kodo Projects",
          },
        ],
      },
    ],
    content: [],
  },
  {
    slug: "Tripow",
    featured: true,
    meta: "Travel Platform · Social discovery",
    title: "Tripow",
    description:
      "A social travel platform for trip planning, attraction discovery, and capturing shared travel experiences around the world.",
    tag: "EXPLORING",
    tagStyle: "bg-[#e8f0e8] text-[#3d5c3d]",
    cardImage: "/images/tripowcover.png",
    heroImage: "/images/tripow.png",
    heroAlt: "Tripow — travel planning and discovery",
    frame: "from-[#fbf6ef] via-[#f0e8dc] to-[#e5ddd3]",
    ctaUrl: "https://www.figma.com/proto/Rm8C1jdOUo8yEUKe2urcul/Tripow-Mandarin-version?page-id=390%3A15612&node-id=390-16129&p=f&viewport=493%2C78%2C0.04&t=0kVm024iGvj4dprE-1&scaling=contain&content-scaling=fixed&starting-point-node-id=390%3A16129&show-proto-sidebar=1",
    ctaLabel: "Prototype",
    content: [
      {
        type: "image",
        src: "/images/tripow1.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow2.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow3.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow4.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow5.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow6.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow7.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow8.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow9.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow10.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow11.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow12.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow13.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow14.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow15.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow16.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow17.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow18.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow19.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow20.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow21.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      {
        type: "image",
        src: "/images/tripow22.png",
        alt: "Checkout summary screen",
        caption: "tripow in your life",
      },
      
    ],
  },
  {
    slug: "Together",
    featured: true,
    meta: "Relationship App · Couples & memories",
    title: "Together",
    description:
      "A lifestyle app for couples to record memories, track meaningful moments, and strengthen connection through shared daily experiences.",
    tag: "Exploring",
    tagStyle: "bg-[#f5ebe0] text-[#8b5c2a]",
    cardImage: "/images/togethercover.png",
    heroImage: "/images/together.png",
    heroAlt: "Together — couples lifestyle and memories",
    frame: "from-[#f3f0eb] via-[#eae4dc] to-[#ddd5cb]",
    ctas: [
      {
        label: "Prototype",
        href: "https://www.figma.com/proto/J86AaalT7zYvGdMB8ggTc2/Togethr-%E5%85%B1%E4%BC%B4?page-id=5%3A38&node-id=313-1914&p=f&viewport=2273%2C713%2C0.12&t=Tu9qJPmBzNoRksO0-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=344%3A1245",
      },
      {
        label: "切版用",
        href: "https://tigers56797.github.io/togethermain",
      },
    ],
    content: [
      // {
      //   type: "heading",
      //   text: "Why signals, not charts",
      // },
      // {
      //   type: "text",
      //   text: "Operations teams do not need another wall of metrics. They need a narrative: what shifted, whether it is expected, and what action is available now.",
      // },
      // {
      //   type: "heading",
      //   text: "Information hierarchy",
      // },
      // {
      //   type: "text",
      //   text: "The layout reads top-to-bottom like an editorial page—headline signal, supporting context, then drill-down. Density stays high, but the eye always has a place to land first.",
      // },
      {
        type: "image",
        src: "/images/together1.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together2.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together3.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together4.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together5.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together6.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together7.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together8.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together9.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together10.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together11.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together12.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together13.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },
      {
        type: "image",
        src: "/images/together14.png",
        alt: "Signals dashboard overview",
        caption: "Primary signal, context strip, and action row.",
      },

      
    ],
  },
  {
    slug: "project-placeholder",
    meta: "E-commerce",
    title: "Lolly E-Commerce",
    description: "preparing..",
    tag: "Exploring",
    tagStyle: "bg-[#ebe6df] text-[#7a726a]",
    frame: "from-[#f3f0eb] via-[#eae4dc] to-[#ddd5cb]",
    heroImage: "/images/lollycover.png",
    heroAlt: "Lolly E-Commerce",
    content: [
      
      {
        type: "image",
        src: "/images/lolly1.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly3.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly4.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly5.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly6.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly7.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly8.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly9.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly10.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly11.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly12.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },
      {
        type: "image",
        src: "/images/lolly13.png",
        alt: "Lolly E-Commerce preview",
        caption: "Lolly E-Commerce",
      },

    ],
  },
  {
    slug: "client-digital",
    meta: "Investment & Financial",
    title: "Good Stock",
    description:
      "preparing..",
    tag: "EXPLORING",
    tagStyle: "bg-[#f5ebe0] text-[#8b5c2a]",
    frame: "from-[#fbf6ef] via-[#f0e8dc] to-[#e5ddd3]",
    cardImage: "/images/stockcover.png",
    heroImage: "/images/stock01.png",
    heroAlt: "Financial",
    content: [
      {
        type: "image",
        src: "/images/stock1.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock2.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock3.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock4.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock5.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock6.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock07.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock8.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
      {
        type: "image",
        src: "/images/stock9.png",
        alt: "Lolly E-Commerce preview",
        caption: "good stock",
      },
    ],
  },
];

export function getFeaturedProjects(locale: Locale = "en"): Project[] {
  return projects.filter((p) => p.featured).map((p) => localizeProject(p, locale));
}

export function getAllProjects(locale: Locale = "en"): Project[] {
  return projects.map((p) => localizeProject(p, locale));
}

export function getProjectBySlug(slug: string, locale: Locale = "en"): Project | undefined {
  const project = projects.find((p) => p.slug === slug);
  return project ? localizeProject(project, locale) : undefined;
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
