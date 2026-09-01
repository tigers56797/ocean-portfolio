"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState, type MouseEvent } from "react";
import { container, sectionX } from "@/lib/site-layout";
import { messages } from "@/lib/i18n/messages";
import { useLocale, useTranslations } from "@/lib/i18n/locale-provider";
import { SectionReveal } from "./section-reveal";

const easeOut = [0.16, 1, 0.3, 1] as const;

type ValueId = "design-engineering" | "human-centered" | "execution";
type Placement = "top" | "left" | "right";

type ValueItem = {
  id: ValueId;
  title: string;
  shortLabel: string;
  points: readonly string[];
  placement: Placement;
  blobClass: string;
};

const placementMeta: Record<ValueId, { placement: Placement; blobClass: string }> = {
  "design-engineering": { placement: "top", blobClass: "value-blob--design" },
  "human-centered": { placement: "left", blobClass: "value-blob--human" },
  execution: { placement: "right", blobClass: "value-blob--product" },
};

const placementClass: Record<Placement, string> = {
  top: "lg:col-start-2 lg:col-span-4 lg:row-start-1 lg:self-end lg:max-w-sm lg:pr-4 xl:col-start-3",
  left: "lg:col-start-1 lg:col-span-4 lg:row-start-2 lg:mt-6 lg:max-w-xs xl:col-start-1 xl:mt-10",
  right:
    "lg:col-start-9 lg:col-span-4 lg:row-start-2 lg:mt-14 lg:max-w-sm lg:pl-2 xl:col-start-9 xl:mt-20",
};

const themeLine: Record<ValueId, string> = {
  "design-engineering": "#c4a574",
  "human-centered": "#c99288",
  execution: "#a89888",
};

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 0 9.2 5.4 14.6 6.6 9.2 7.8 8 13.2 6.8 7.8 1.4 6.6 6.8 5.4 8 0Z" />
    </svg>
  );
}

type ValueCardProps = {
  item: ValueItem;
  className?: string;
  delay?: number;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: (id: ValueId) => void;
  onDeactivate: () => void;
};

function ValueCard({
  item,
  className,
  delay = 0,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: ValueCardProps) {
  const reduced = useReducedMotion();
  const line = themeLine[item.id];

  const body = (
    <article
      className={`group relative rounded-2xl px-1 py-2 transition-[opacity,box-shadow,background-color] duration-300 ease-out lg:px-3 lg:py-3 ${
        isActive
          ? "bg-[#faf6f0]/90 shadow-[0_20px_50px_-36px_rgba(42,38,34,0.22)]"
          : "lg:hover:bg-[#faf6f0]/50"
      } ${isDimmed ? "opacity-45 lg:opacity-40" : "opacity-100"}`}
      onMouseEnter={() => onActivate(item.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(item.id)}
      onBlur={onDeactivate}
    >
      <motion.div
        className="mb-3 h-0.5 w-8 rounded-full transition-[width,opacity] duration-400 ease-out"
        style={{ backgroundColor: line }}
        animate={{ width: isActive ? 48 : 32, opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.35, ease: easeOut as [number, number, number, number] }}
        aria-hidden
      />
      <div className="mb-3 flex items-center gap-2">
        <SparkIcon
          className={`h-3 w-3 shrink-0 transition-colors duration-300 ${isActive ? "text-[#c4a574]" : "text-[#c4a574]/70"}`}
        />
        <h3 className="font-sans text-base font-semibold tracking-tight text-[#2a2622] md:text-[1.05rem]">
          {item.title}
        </h3>
      </div>
      <ul className="space-y-2 text-sm leading-relaxed text-[#6f6760]">
        {item.points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-[#d4c8b8]" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );

  if (reduced) {
    return <div className={className}>{body}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.75, ease: easeOut, delay }}
      animate={{ y: isActive ? -4 : 0 }}
    >
      {body}
    </motion.div>
  );
}

type EditorialCompositionProps = {
  activeId: ValueId | null;
  onActivate: (id: ValueId) => void;
  onDeactivate: () => void;
  className?: string;
  values: readonly ValueItem[];
};

function isLeavingContainer(current: Node, related: EventTarget | null) {
  if (!related || !(related instanceof Node)) {
    return true;
  }
  return !current.contains(related);
}

function EditorialComposition({
  activeId,
  onActivate,
  onDeactivate,
  className,
  values,
}: EditorialCompositionProps) {
  const reduced = useReducedMotion();
  const t = useTranslations();
  const [isCenterActive, setCenterActive] = useState(false);
  const isHovered = activeId !== null;
  const showCoreCopy = reduced || isCenterActive;

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (isLeavingContainer(e.currentTarget, e.relatedTarget)) {
      onDeactivate();
      setCenterActive(false);
    }
  };

  const handleCenterEnter = () => {
    setCenterActive(true);
    onDeactivate();
  };

  const handleCenterLeave = (e: MouseEvent<HTMLButtonElement>) => {
    if (isLeavingContainer(e.currentTarget, e.relatedTarget)) {
      setCenterActive(false);
    }
  };

  return (
    <div
      className={`value-stage ${className ?? ""}`}
      role="group"
      aria-label={t("value.groupAria")}
      onMouseLeave={handleLeave}
    >
      <p className="value-clarity-word" aria-hidden>
        {t("value.clarity")}
      </p>

      <div className="value-composition">
        <div className={`value-core-copy-slot ${showCoreCopy ? "is-open" : ""}`}>
          <div className={`value-core-copy ${showCoreCopy ? "is-visible" : ""}`}>
            <p className="value-core-title">{t("value.coreTitle")}</p>
            <p className="value-core-body whitespace-pre-line">{t("value.coreBody")}</p>
            <div className="value-core-line" aria-hidden />
          </div>
        </div>

      <div className="value-network" aria-hidden>
        <span className="value-orbit value-orbit--1" />
        <span className="value-orbit value-orbit--2" />
        <span className="value-orbit value-orbit--3" />
        <span className="value-orbit value-orbit--4" />
        <span className="value-orbit value-orbit--5" />
        <span className="value-orbit value-orbit--6" />
        <span className="value-arc value-arc--1" />
        <span className="value-arc value-arc--2" />
        <span className="value-arc value-arc--3" />
        <span className="value-link value-link--1" />
        <span className="value-link value-link--2" />
        <span className="value-link value-link--3" />
        <span className="value-link value-link--4" />
        <div className="value-node-orbit">
          <span className="value-node value-node--1" />
          <span className="value-node value-node--2" />
          <span className="value-node value-node--3" />
          <span className="value-node value-node--4" />
          <span className="value-node value-node--5" />
          <span className="value-node value-node--6" />
          <span className="value-node value-node--7" />
          <span className="value-node value-node--8" />
          <span className="value-node value-node--9" />
          <span className="value-node value-node--10" />
          <span className="value-node value-node--11" />
          <span className="value-node value-node--12" />
          <span className="value-node value-node--13" />
          <span className="value-node value-node--14" />
          <span className="value-node value-node--15" />
          <span className="value-node value-node--16" />
          <span className="value-node value-node--17" />
        </div>
      </div>

      <div className="value-blobs">
        {values.map((item) => {
          const isActive = activeId === item.id;
          const isDimmed = isHovered && !isActive;

          return (
            <button
              key={item.id}
              type="button"
              className={`value-blob ${item.blobClass} ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
              onMouseEnter={() => onActivate(item.id)}
              onFocus={() => onActivate(item.id)}
              aria-pressed={isActive}
              aria-label={item.title}
            >
              {item.shortLabel}
            </button>
          );
        })}

        <div
          className={`value-intersection ${showCoreCopy ? "is-lit" : ""}`}
          aria-hidden
        >
          <span className="value-intersection-bloom" />
          <span className="value-intersection-spark" />
        </div>

        <button
          type="button"
          className="value-core-hit"
          onMouseEnter={handleCenterEnter}
          onMouseLeave={handleCenterLeave}
          onFocus={handleCenterEnter}
          onBlur={() => setCenterActive(false)}
          aria-label={t("value.intersectionAria")}
        />
      </div>
      </div>
    </div>
  );
}

function ValueLayout({ values }: { values: readonly ValueItem[] }) {
  const [activeId, setActiveId] = useState<ValueId | null>(null);
  const activate = useCallback((id: ValueId) => setActiveId(id), []);
  const deactivate = useCallback(() => setActiveId(null), []);

  return (
    <>
      <div className="flex flex-col gap-10 lg:hidden">
        <EditorialComposition
          activeId={activeId}
          onActivate={activate}
          onDeactivate={deactivate}
          values={values}
        />
        {values.map((item, index) => (
          <ValueCard
            key={item.id}
            item={item}
            delay={0.08 + index * 0.08}
            isActive={activeId === item.id}
            isDimmed={activeId !== null && activeId !== item.id}
            onActivate={activate}
            onDeactivate={deactivate}
          />
        ))}
      </div>

      <div className="relative hidden min-h-[32rem] pb-6 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:gap-x-6 lg:pb-10 xl:min-h-[38rem] xl:pb-12">
        <div className="relative z-20 flex justify-center py-4 lg:col-start-4 lg:col-span-6 lg:row-start-1 lg:row-span-3 lg:items-start lg:justify-center lg:pt-2 lg:pb-8 xl:pt-6">
          <EditorialComposition
            activeId={activeId}
            onActivate={activate}
            onDeactivate={deactivate}
            values={values}
          />
        </div>

        {values.map((item, index) => (
          <ValueCard
            key={item.id}
            item={item}
            className={`relative z-20 ${placementClass[item.placement]}`}
            delay={0.04 + index * 0.1}
            isActive={activeId === item.id}
            isDimmed={activeId !== null && activeId !== item.id}
            onActivate={activate}
            onDeactivate={deactivate}
          />
        ))}
      </div>
    </>
  );
}

export function ValueSection() {
  const t = useTranslations();
  const locale = useLocale();
  const values = useMemo<readonly ValueItem[]>(
    () =>
      messages[locale].value.items.map((item) => ({
        ...item,
        ...placementMeta[item.id],
      })),
    [locale],
  );

  return (
    <section
      id="value"
      className={`scroll-mt-28 border-t border-[#e8dfd4]/90 bg-[#fffdf8] py-24 md:py-32 ${sectionX}`}
      aria-labelledby="value-heading"
    >
      <SectionReveal className={container}>
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
            <SparkIcon className="h-2.5 w-2.5 text-[#c4a574]" />
            {t("value.eyebrow")}
          </p>
          <h2
            id="value-heading"
            className="font-serif text-3xl font-medium tracking-tight text-[#2a2622] md:text-4xl"
          >
            {t("value.title")}
          </h2>
          <p className="text-sm leading-relaxed text-[#6f6760] md:text-base">
            {t("value.description")}
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#a89888]">
            {t("value.hint")}
          </p>
        </div>

        <div className="mt-14 md:mt-20 lg:mt-24">
          <ValueLayout values={values} />
        </div>
      </SectionReveal>
    </section>
  );
}
