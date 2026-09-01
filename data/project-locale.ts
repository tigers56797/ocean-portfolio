import type { Project, ProjectCta } from "./projects";
import type { Locale } from "@/lib/i18n/types";

type ProjectLocaleFields = Pick<Project, "meta" | "title" | "description" | "tag"> & {
  ctaLabel?: string;
  exploreLabel?: string;
  ctas?: ProjectCta[];
};

const zhProjects: Record<string, ProjectLocaleFields> = {
  kodo: {
    meta: "營運系統 · 進行中",
    title: "Kodo 動",
    description:
      "為高壓工程環境設計的行動導向異常處理系統，協助團隊快速決策與回應。",
    tag: "已上線",
    ctaLabel: "原型",
    exploreLabel: "探索 Kodo",
  },
  Tripow: {
    meta: "旅遊平台 · 社交探索",
    title: "Tripow",
    description: "社交旅遊平台，用於行程規劃、景點探索，以及記錄世界各地的共享旅行體驗。",
    tag: "探索中",
    ctaLabel: "原型",
  },
  Together: {
    meta: "關係 App · 情侶與回憶",
    title: "Together 共伴",
    description: "為情侶打造的生活 App，記錄回憶、追蹤重要時刻，並透過共享日常強化連結。",
    tag: "探索中",
    ctas: [
      { label: "原型", href: "https://www.figma.com/proto/J86AaalT7zYvGdMB8ggTc2/Togethr-%E5%85%B1%E4%BC%B4?page-id=5%3A38&node-id=313-1914&p=f&viewport=2273%2C713%2C0.12&t=Tu9qJPmBzNoRksO0-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=344%3A1245" },
      { label: "切版用", href: "https://tigers56797.github.io/togethermain" },
    ],
  },
  "project-placeholder": {
    meta: "電商",
    title: "Lolly 電商",
    description: "準備中…",
    tag: "探索中",
  },
  "client-digital": {
    meta: "投資與金融",
    title: "Good Stock",
    description: "準備中…",
    tag: "探索中",
  },
};

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;

  const overlay = zhProjects[project.slug];
  if (!overlay) return project;

  return {
    ...project,
    ...overlay,
    ctas: overlay.ctas ?? project.ctas,
    ctaLabel: overlay.ctaLabel ?? project.ctaLabel,
  };
}
