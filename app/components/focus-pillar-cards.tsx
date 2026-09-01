"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cardGrid } from "@/lib/site-layout";
import { useLocale, useTranslations } from "@/lib/i18n/locale-provider";

const ease = [0.16, 1, 0.3, 1] as const;

function IconEnterprise({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="15" y="15" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="30" y="15" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="15" y="30" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="30" y="30" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconProductThinking({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <circle cx="28" cy="28" r="15" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="28" cy="28" r="7" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="28" cy="28" r="2" fill="currentColor" />
      <path d="M28 11v6M28 39v6M11 28h6M39 28h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconCollaboration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <circle cx="16" cy="36" r="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="40" cy="36" r="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="28" cy="16" r="5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20.5 32.5 25.5 22M31.5 22l5 10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const pillars = [
  {
    id: "philosophy",
    titleZh: "設計理念",
    titleEn: "Design Philosophy",
    sectionTitle: "系統化思維",
    sectionBody: "在高密度企業環境中，將複雜流程轉化為清晰、可操作的介面體驗。",
    tags: ["Enterprise UX", "Operational Systems", "Workflow Design", "Clarity"],
    cardClass: "bg-[#1a2238]",
    accentClass: "text-[#8fa3cf]",
    tagClass: "border-white/15 bg-white/[0.08] text-white/80",
    icon: IconEnterprise,
  },
  {
    id: "product",
    titleZh: "產品思維",
    titleEn: "Product Thinking",
    sectionTitle: "結構化判斷",
    sectionBody: "平衡使用者需求、商業目標與技術限制，建立可落地的產品決策框架。",
    tags: ["Product Strategy", "System Design", "User Needs", "Constraints"],
    cardClass: "bg-[#8f4a28]",
    accentClass: "text-[#f0c4a8]",
    tagClass: "border-white/15 bg-white/[0.08] text-white/80",
    icon: IconProductThinking,
  },
  {
    id: "collaboration",
    titleZh: "跨域協作",
    titleEn: "Cross-functional Collaboration",
    sectionTitle: "對齊與推進",
    sectionBody: "與工程、利害關係人與營運團隊緊密合作，讓產品方向與執行保持一致。",
    tags: ["Stakeholder Alignment", "Engineering", "Operations", "Delivery"],
    cardClass: "bg-[#171717]",
    accentClass: "text-[#a3a3a3]",
    tagClass: "border-white/12 bg-white/[0.06] text-white/75",
    icon: IconCollaboration,
  },
] as const;

type Pillar = (typeof pillars)[number];

function CornerToggle({
  expanded,
  onToggle,
  label,
  reduced,
}: {
  expanded: boolean;
  onToggle: () => void;
  label: string;
  reduced: boolean | null;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white/90 transition-[background-color,border-color,color] hover:border-white/35 hover:bg-white/[0.14] hover:text-white active:scale-[0.96] md:right-5 md:top-5"
      aria-expanded={expanded}
      aria-label={label}
    >
      <motion.span
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.32, ease }}
        className="inline-flex"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </button>
  );
}

function PillarCardIcon({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
      <Icon className="h-8 w-8 text-white/90" />
    </div>
  );
}

function PillarCardHeader({ pillar }: { pillar: Pillar }) {
  const locale = useLocale();
  const primary = locale === "zh" ? pillar.titleZh : pillar.titleEn;
  const secondary = locale === "zh" ? pillar.titleEn : pillar.titleZh;

  return (
    <div className="mt-8">
      <h3 className="font-serif text-[1.65rem] font-semibold leading-tight tracking-tight md:text-[1.85rem]">
        {primary}
      </h3>
      <p className={`mt-2 text-sm font-medium ${pillar.accentClass}`}>{secondary}</p>
    </div>
  );
}

function PillarExtraContent({ pillar, reduced }: { pillar: Pillar; reduced: boolean | null }) {
  if (reduced) {
    return (
      <div className="pt-8">
        <p className="text-base font-semibold text-white">{pillar.sectionTitle}</p>
        <p className="mt-3 text-sm leading-[1.85] text-white/78">{pillar.sectionBody}</p>
        <div className="my-6 border-t border-dashed border-white/20" aria-hidden />
        <div className="flex flex-wrap gap-2">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1 text-[0.68rem] font-medium tracking-wide ${pillar.tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.38, ease }}
      className="overflow-hidden"
    >
      <div className="pt-8">
        <p className="text-base font-semibold text-white">{pillar.sectionTitle}</p>
        <p className="mt-3 text-sm leading-[1.85] text-white/78">{pillar.sectionBody}</p>
        <div className="my-6 border-t border-dashed border-white/20" aria-hidden />
        <div className="flex flex-wrap gap-2">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1 text-[0.68rem] font-medium tracking-wide ${pillar.tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PillarCard({
  pillar,
  expanded,
  onToggle,
  reduced,
}: {
  pillar: Pillar;
  expanded: boolean;
  onToggle: () => void;
  reduced: boolean | null;
}) {
  const t = useTranslations();
  const toggleLabel = expanded
    ? `${t("common.collapse")} ${pillar.titleEn}`
    : `${t("common.expand")} ${pillar.titleEn}`;

  return (
    <div
      className={`relative flex w-full flex-col self-start rounded-[1.75rem] p-6 text-white md:p-7 ${pillar.cardClass}`}
    >
      <CornerToggle
        expanded={expanded}
        onToggle={onToggle}
        label={toggleLabel}
        reduced={reduced}
      />

      <PillarCardIcon pillar={pillar} />
      <PillarCardHeader pillar={pillar} />

      <AnimatePresence initial={false}>
        {expanded ? <PillarExtraContent key="extra" pillar={pillar} reduced={reduced} /> : null}
      </AnimatePresence>
    </div>
  );
}

export function FocusPillarCards() {
  const reduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const togglePillar = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="mt-28 border-t border-[#e8dfd4]/90 pt-20">
      <div className={`${cardGrid} items-start`}>
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.id}
            pillar={pillar}
            expanded={expandedId === pillar.id}
            onToggle={() => togglePillar(pillar.id)}
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  );
}
