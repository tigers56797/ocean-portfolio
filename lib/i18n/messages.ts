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
    flipWords: ["clarity.", "value.", "consensus."],
    flipLines: [
      { lead: "Turning complexity", into: "into", word: "clarity." },
      { lead: "Turning needs", into: "into", word: "value." },
      { lead: "Turning different viewpoints", into: "into", word: "consensus." },
    ],
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
        { text: "I design products at the intersection of " },
        { text: "user needs, business goals, and technology", highlight: true },
        { text: "." },
      ],
      [
        { text: "With a background in " },
        { text: "UI/UX and product design", highlight: true },
        {
          text: ", I look beyond the interface — how products work, how people use them, how decisions follow ",
        },
        { text: "real data analysis", highlight: true },
        { text: ", and how they create value for the product and the business." },
      ],
      [
        { text: "My experience spans " },
        { text: "startup products and enterprise systems", highlight: true },
        { text: ". I work across " },
        { text: "product strategy, UX, UI, and front-end development", highlight: true },
        { text: ", with additional experience in " },
        { text: "PM work, MVP development, stakeholder communication, and engineering collaboration", highlight: true },
        {
          text: ". In different product contexts and complex requirements, I make trade-offs among user needs, business goals, and technical constraints. I believe design is more than how an interface looks. I think about how the product works, and how ",
        },
        { text: "data analysis", highlight: true },
        {
          text: " reveals what is actually happening — so design answers real problems rather than staying at the visual layer. ",
        },
        { text: "Truly turning complex problems into practical, meaningful product experiences.", highlight: true },
      ],
    ],
    systemsThinking: "systems thinking",
    tactileFeedback: "tactile feedback",
    signature: "Ocean Ou,",
    role: "UI / UX Product Designer",
    insights: [
      {
        label: "Clear communication × real data",
        metric: "2.4×",
        metricNote: "Faster alignment cycles",
        quote:
          "Turn complexity into shared language backed by real data analysis — so product, design, and engineering move in sync.",
        bars: [0.35, 0.48, 0.42, 0.58, 0.62, 0.7, 0.78, 0.92],
        tone: "sand" as const,
      },
      {
        label: "Business × experience",
        metric: "98%",
        metricNote: "Goal–experience fit",
        quote:
          "Keep business goals and precise experience design in one loop — clarity that ships.",
        bars: [0.4, 0.55, 0.5, 0.68, 0.72, 0.8, 0.86, 0.95],
        tone: "sage" as const,
      },
    ],
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
        tag: "Semiconductor",
        description:
          "On-site at TSMC, designing semiconductor internal systems and operational workflow platforms — high information density, complex workflows, and enterprise use cases spanning information architecture, user flows, and UI/UX.",
        points: [
          "UI/UX for semiconductor internal systems and process platforms",
          "Mapped complex business flows and information architecture into clear operational interfaces",
          "Focused on operational UX, efficiency, and exception-handling scenarios",
          "Collaborated with product, engineering, and cross-functional teams to align needs and ship design",
          "Balanced cross-department requirements, process constraints, and user experience in a large enterprise",
        ],
      },
      {
        title: "Product Designer",
        company: "Aimandofor",
        period: "2023 - 2025",
        tag: "Startup",
        description:
          "Led product planning and multi-system product design — from requirements and feature planning to interface design and engineering collaboration — building product systems across admin, ride-hailing, ordering, delivery, payments, and project-based services.",
        points: [
          "Acted as PM: requirements, feature planning, product flows, and project delivery",
          "Information architecture and UI/UX for the admin backend",
          "Product flows and interface design for ride-hailing, ordering, and delivery",
          "Payment flows across roles and transaction scenarios",
          "Project-based system design: requests, case flow, and user paths",
          "Partnered with engineering to turn product needs into shippable features and interfaces",
          "Integrated user needs, business goals, and technical constraints to ship across product contexts",
        ],
      },
      {
        title: "UI/UX Designer",
        company: "Sampras.hk",
        period: "2023",
        tag: "Enterprise clients",
        description:
          "Worked on client websites and digital product projects, covering visual direction through interface design — turning brand needs into consistent, recognizable digital experiences.",
        points: [
          "UI/UX for client website projects",
          "Built visual direction and interface style from brand positioning",
          "Page architecture, wireframes, and UI design",
          "Extended brand visual language across websites and digital experiences",
          "Aligned with teams on requirements and pushed design through to execution",
        ],
      },
    ],
  },
  value: {
    eyebrow: "Value",
    title: "My strengths",
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
        shortLabel: "BUSINESS",
        title: "Execution & Business Insight",
        points: [
          "Data-led decisions from problem to ship",
          "Business-oriented workflow optimization",
          "Turning complex data into clear product action",
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
    flipWords: ["清晰。", "價值。", "共識。"],
    flipLines: [
      { lead: "將複雜", into: "轉化為", word: "清晰。" },
      { lead: "將需求", into: "轉化為", word: "價值。" },
      { lead: "讓不同觀點", into: "形成", word: "共識。" },
    ],
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
          text: "背景，不只關注介面本身，也思考產品如何運作、使用者如何使用，如何",
        },
        { text: "根據實際數據分析判斷", highlight: true },
        { text: "，以及如何為產品與商業創造價值。" },
      ],
      [
        { text: "我的經驗涵蓋" },
        { text: "新創產品與企業級系統", highlight: true },
        { text: "，能從" },
        { text: "產品策略、UX、UI 到前端開發", highlight: true },
        { text: "參與完整流程，也具備 " },
        { text: "PM、MVP 開發、利害關係人溝通與開發團隊協作", highlight: true },
        {
          text: "經驗。面對不同產品情境與複雜需求時，在使用者需求、商業目標與技術限制之間進行思考與取捨。我重視設計不只是介面呈現，也會思考產品如何運作，以及如何透過",
        },
        { text: "數據分析", highlight: true },
        { text: "理解實際情況，讓設計能回應真實問題，而非停留在視覺層面。" },
        { text: "真正將複雜問題轉化為實際且有意義的產品體驗。", highlight: true },
      ],
    ],
    systemsThinking: "系統思維",
    tactileFeedback: "具體回饋",
    signature: "Ocean Ou，",
    role: "UI / UX 產品設計師",
    insights: [
      {
        label: "高效溝通 × 實際數據",
        metric: "2.4×",
        metricNote: "對齊節奏更快",
        quote: "把複雜問題轉成共同語言，並以實際數據分析佐證，讓產品、設計與工程能同頻推進。",
        bars: [0.35, 0.48, 0.42, 0.58, 0.62, 0.7, 0.78, 0.92],
        tone: "sand" as const,
      },
      {
        label: "商業目標 × 精準體驗",
        metric: "98%",
        metricNote: "目標與體驗貼合",
        quote: "把商業目標與精準體驗整合在同一迴路，做出清晰且可落地的設計決策。",
        bars: [0.4, 0.55, 0.5, 0.68, 0.72, 0.8, 0.86, 0.95],
        tone: "sage" as const,
      },
    ],
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
        tag: "半導體",
        description:
          "駐點台積電參與半導體相關內部系統與營運流程平台設計，面對高資訊密度、複雜 Workflow 與企業級使用情境，負責資訊架構、使用者流程與 UI/UX 設計。",
        points: [
          "參與半導體企業內部系統與流程平台的 UI/UX 設計",
          "梳理複雜業務流程與資訊架構，將大量資訊轉化為清晰的操作介面",
          "關注 operational UX、操作效率與異常處理情境",
          "與產品、工程及不同職能團隊協作，整合需求並推進設計落地",
          "在大型企業環境中處理跨部門需求、流程限制與使用者體驗之間的取捨",
        ],
      },
      {
        title: "產品設計師",
        company: "Aimandofor",
        period: "2023 - 2025",
        tag: "新創",
        description:
          "負責產品規劃與多系統產品設計，從需求分析、功能規劃到介面設計與開發協作，參與建立涵蓋後台管理、叫車、點餐、外送、金流與接案等不同業務場景的產品系統。",
        points: [
          "擔任 PM 角色，負責需求整理、功能規劃、產品流程與專案推進",
          "負責後台管理系統的資訊架構與 UI/UX 設計",
          "參與叫車、點餐與外送系統的產品流程與介面設計",
          "規劃金流相關流程，處理不同角色與交易情境下的操作體驗",
          "參與接案系統設計，梳理需求、案件流程與使用者操作路徑",
          "與工程團隊協作，將產品需求轉換為可執行的功能與介面",
          "在不同產品情境中整合使用者需求、商業需求與技術限制，推進產品落地",
        ],
      },
      {
        title: "UI/UX 設計師",
        company: "Sampras.hk",
        period: "2023",
        tag: "外商接案企業",
        description:
          "參與客戶網站與數位產品專案，負責從視覺方向到介面設計的完整執行，將品牌需求轉化為一致且具辨識度的數位體驗。",
        points: [
          "負責客戶網站專案的 UI/UX 設計",
          "依據品牌定位建立視覺方向與介面風格",
          "進行頁面架構、Wireframe 與 UI 設計",
          "將品牌視覺語言延伸至網站與數位體驗",
          "與相關團隊溝通需求並推進設計執行",
        ],
      },
    ],
  },
  value: {
    eyebrow: "價值",
    title: "我的優勢",
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
        shortLabel: "商業",
        title: "執行與商業洞察",
        points: ["以數據判斷從問題到上線", "商業導向的工作流優化", "把複雜數據轉成清晰產品行動"],
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
