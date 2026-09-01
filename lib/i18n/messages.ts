import type { Locale } from "./types";

const en = {
  nav: {
    work: "Work",
    about: "About",
    experience: "Experience",
    contact: "Contact",
    viewCv: "View CV",
    viewCvAria: "View CV — opens PDF in a new tab",
    backToWork: "← Back to work",
    backToSelected: "← Back to selected work",
    switchToEn: "Switch to English",
    switchToZh: "Switch to Chinese",
  },
  hero: {
    pill: "DESIGN SHAPES MY THINKING. EXPERIENCE GIVES IT MEANING.",
    subtitle: "Product Designer · Enterprise UX · System Thinking",
    headline: "Turning complexity",
    into: "into",
    flipWords: ["clarity.", "momentum.", "structure."],
    description:
      "I'm focused on enterprise systems, AI-assisted workflows, and high-density operational experiences.",
    scroll: "Scroll",
    scrollAria: "Scroll to selected projects",
  },
  work: {
    eyebrow: "Selected Project",
    title: "Designing operational clarity",
    description:
      "Selected projects focused on operational systems, AI-assisted workflows, and enterprise experiences designed for clarity under complexity.",
    more: "More",
  },
  about: {
    eyebrow: "About",
    quoteLine1: "Design shapes my thinking.",
    quoteLine2: "Experience gives it meaning.",
    bodyParagraphs: [
      [
        { text: "I design products by connecting " },
        { text: "user needs, business goals, and technology", highlight: true },
        { text: "." },
      ],
      [
        { text: "With a background in " },
        { text: "UI/UX and product design", highlight: true },
        {
          text: ", I approach design beyond interfaces — thinking about how products work, how people use them, and how they create value for the business.",
        },
      ],
      [
        { text: "My experience spans " },
        { text: "startup products and enterprise systems", highlight: true },
        { text: ", where I work across " },
        { text: "product strategy, UX, UI, and front-end development", highlight: true },
        { text: " to turn complex problems into practical, meaningful experiences." },
      ],
    ],
    systemsThinking: "systems thinking",
    tactileFeedback: "tactile feedback",
    signature: "Ocean Ou,",
    role: "UI/UX Designer · Product Designer",
  },
  experience: {
    eyebrow: "Experience",
    title: "Roles & impact",
    description:
      "A vertical thread through product and UI work — from dense enterprise surfaces to brand-forward digital experiences.",
    items: [
      {
        title: "UI/UX Designer",
        company: "Wistron ITS @ TSMC",
        period: "2025 - Present",
        description:
          "Designing semiconductor internal systems, operational workflows, and high-density enterprise interfaces with cross-functional collaboration.",
      },
      {
        title: "Product Designer",
        company: "Aimendofor",
        period: "2023 - 2025",
        description:
          "Led product restructuring, information architecture redesign, and collaborated closely with engineering and product planning.",
      },
      {
        title: "UI/UX Designer",
        company: "Sampras.hk",
        period: "2023",
        description:
          "Worked on client website projects, visual interfaces, and branding-oriented digital experiences.",
      },
    ],
  },
  value: {
    eyebrow: "Value",
    title: "Strengths at the intersection",
    description:
      "Where human context, design craft, and product execution overlap — the work stays calm, clear, and buildable.",
    hint: "Move into the center overlap to reveal the intersection",
    clarity: "CLARITY",
    coreTitle: "Product-minded designer",
    coreBody: "bridging systems,\nexperience, and execution.",
    intersectionAria: "Intersection of human, design, and product",
    groupAria: "Human, design, and product intersection",
    items: [
      {
        id: "design-engineering" as const,
        shortLabel: "DESIGN",
        title: "Design × Engineering",
        points: [
          "UI/UX with frontend understanding",
          "Systems thinking across teams",
          "Bridging design and development",
        ],
      },
      {
        id: "human-centered" as const,
        shortLabel: "HUMAN",
        title: "Human-Centered Thinking",
        points: [
          "User experience grounded in real workflows",
          "Operational clarity under complexity",
          "Cross-functional collaboration",
        ],
      },
      {
        id: "execution" as const,
        shortLabel: "PRODUCT",
        title: "Execution & Product Insight",
        points: [
          "Product thinking from problem to ship",
          "Workflow optimization that scales",
          "Turning complexity into clear experiences",
        ],
      },
    ],
  },
  manifesto: {
    lead: "COMPLEXITY ISN'T THE PROBLEM.",
    emphasisPrefix: "UNCLEAR ",
    emphasisCore: "SYSTEMS ARE.",
  },
  contact: {
    eyebrow: "Contact",
    description:
      "For new product work, audits, or a conversation about how your team talks to users — reach out with a line about what you are building.",
    location: "Based on Taiwan · Available remotely",
    copyright: "OceanOu Built with care.",
  },
  projects: {
    allEyebrow: "All Projects",
    allTitle: "Designing operational clarity",
    allDescription:
      "The full set of product and interface work—operational systems, consumer apps, enterprise experiences, and client-facing digital products.",
    viewProject: "View Project",
    visitProject: "Visit project",
    notFoundTitle: "Project not found",
    notFoundDescription: "This project may have moved or is no longer available.",
  },
  common: {
    backToTop: "Back to top",
    expand: "Expand",
    collapse: "Collapse",
  },
  meta: {
    title: "OU — Product Design",
    description:
      "Editorial portfolio — product design at the intersection of clarity, systems, and calm interfaces.",
    allProjectsTitle: "All Projects — Ocean Ou",
    allProjectsDescription:
      "Product design work across operational systems, travel, lifestyle apps, enterprise interfaces, and client digital experiences.",
  },
} as const;

const zh = {
  nav: {
    work: "作品",
    about: "關於",
    experience: "經歷",
    contact: "聯絡",
    viewCv: "履歷",
    viewCvAria: "查看履歷 — 在新分頁開啟 PDF",
    backToWork: "← 返回作品",
    backToSelected: "← 返回精選作品",
    switchToEn: "切換至英文",
    switchToZh: "切換至中文",
  },
  hero: {
    pill: "設計形塑思考，經驗賦予意義。",
    subtitle: "產品設計師 · 企業 UX · 系統思維",
    headline: "將複雜",
    into: "轉化為",
    flipWords: ["清晰。", "動能。", "結構。"],
    description: "專注於企業系統、AI 輔助工作流，以及高密度營運體驗的設計。",
    scroll: "捲動",
    scrollAria: "捲動至精選作品",
  },
  work: {
    eyebrow: "精選作品",
    title: "精選專案集",
    description:
      "精選聚焦於營運系統、AI 輔助工作流與企業體驗的專案，在複雜環境中追求清晰可操作的介面。",
    more: "更多",
  },
  about: {
    eyebrow: "關於",
    quoteLine1: "「設計形塑我的思考，",
    quoteLine2: "經驗賦予它意義。」",
    bodyParagraphs: [
      [
        { text: "我從" },
        { text: "使用者需求、商業目標與技術", highlight: true },
        { text: "之間的交集思考產品設計。" },
      ],
      [
        { text: "我具備 " },
        { text: "UI/UX 與產品設計", highlight: true },
        {
          text: "背景，不只關注介面本身，也思考產品如何運作、使用者如何使用，以及如何為產品與商業創造價值。",
        },
      ],
      [
        { text: "我的經驗涵蓋 " },
        { text: "新創產品與企業級系統", highlight: true },
        { text: "，能從 " },
        { text: "產品策略、UX、UI 到前端開發", highlight: true },
        { text: "參與完整流程，將複雜問題轉化為實際且有意義的產品體驗。" },
      ],
    ],
    systemsThinking: "系統思維",
    tactileFeedback: "具體回饋",
    signature: "Ocean Ou，",
    role: "UI/UX 設計師 · 產品設計師",
  },
  experience: {
    eyebrow: "經歷",
    title: "角色與影響",
    description: "從高密度企業介面到品牌導向數位體驗——產品與 UI 工作的垂直脈絡。",
    items: [
      {
        title: "UI/UX 設計師",
        company: "Wistron ITS @ TSMC",
        period: "2025 - 至今",
        description: "設計半導體內部系統、營運工作流與高密度企業介面，並與跨職能團隊協作。",
      },
      {
        title: "產品設計師",
        company: "Aimendofor",
        period: "2023 - 2025",
        description: "主導產品重構、資訊架構重新設計，並與工程與產品規劃團隊緊密合作。",
      },
      {
        title: "UI/UX 設計師",
        company: "Sampras.hk",
        period: "2023",
        description: "參與客戶網站專案、視覺介面與品牌導向的數位體驗設計。",
      },
    ],
  },
  value: {
    eyebrow: "價值",
    title: "交會處的優勢",
    description: "當人文脈絡、設計工藝與產品執行交疊——作品保持冷靜、清晰且可落地。",
    hint: "移入中心交會區以揭示核心",
    clarity: "清晰",
    coreTitle: "具產品思維的設計師",
    coreBody: "連結系統、\n體驗與執行。",
    intersectionAria: "人文、設計與產品的交會",
    groupAria: "人文、設計與產品的交會",
    items: [
      {
        id: "design-engineering" as const,
        shortLabel: "設計",
        title: "設計 × 工程",
        points: ["具前端理解的 UI/UX", "跨團隊的系統思維", "連結設計與開發"],
      },
      {
        id: "human-centered" as const,
        shortLabel: "人文",
        title: "以人為本的思考",
        points: ["扎根真實工作流的使用者體驗", "複雜環境下的營運清晰度", "跨職能協作"],
      },
      {
        id: "execution" as const,
        shortLabel: "產品",
        title: "執行與產品洞察",
        points: ["從問題到上線的產品思維", "可擴展的工作流優化", "將複雜轉化為清晰體驗"],
      },
    ],
  },
  manifesto: {
    lead: "複雜性不是問題。",
    emphasisPrefix: "不清楚的",
    emphasisCore: "系統才是。",
  },
  contact: {
    eyebrow: "聯絡",
    description: "若有新產品合作、設計稽核，或想聊聊團隊如何與使用者溝通——歡迎來信說明你正在打造什麼。",
    location: "台灣 · 可遠端合作",
    copyright: "OceanOu 用心打造。",
  },
  projects: {
    allEyebrow: "全部作品",
    allTitle: "設計營運清晰度",
    allDescription:
      "完整的產品與介面作品——營運系統、消費者 App、企業體驗與客戶端數位產品。",
    viewProject: "查看專案",
    visitProject: "前往專案",
    notFoundTitle: "找不到專案",
    notFoundDescription: "此專案可能已移動或不再提供。",
  },
  common: {
    backToTop: "回到頂部",
    expand: "展開",
    collapse: "收合",
  },
  meta: {
    title: "OU — 產品設計",
    description: "編輯式作品集——在清晰、系統與寧靜介面的交會處進行產品設計。",
    allProjectsTitle: "全部作品 — Ocean Ou",
    allProjectsDescription:
      "涵蓋營運系統、旅遊、生活 App、企業介面與客戶端數位體驗的產品設計作品。",
  },
} as const;

export const messages = { en, zh } as const;
export type Messages = typeof en;

function getMessageValue(dict: unknown, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function createTranslator(locale: Locale) {
  const dict = messages[locale];
  return function t(key: string): string {
    return getMessageValue(dict, key) ?? getMessageValue(messages.en, key) ?? key;
  };
}
