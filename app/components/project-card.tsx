"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useTranslations } from "@/lib/i18n/locale-provider";

const easeOut = [0.16, 1, 0.3, 1] as const;
const hoverTransition = { duration: 0.48, ease: easeOut } as const;

const thumbnailShell =
  "relative mb-8 h-[18rem] w-full overflow-hidden rounded-[2rem] shadow-[0_28px_80px_-40px_rgba(42,38,34,0.38)] ring-1 ring-[#ebe3d7]/90 sm:h-[19rem] md:h-[21rem] lg:h-[22rem]";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const reduced = useReducedMotion();
  const imageSrc = project.cardImage ?? project.heroImage;

  if (reduced) {
    return <ProjectCardStatic project={project} imageSrc={imageSrc} priority={priority} />;
  }

  return (
    <motion.div
      className="h-full"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{ rest: {}, hover: {} }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full cursor-pointer flex-col border-t border-transparent pt-2 outline-none"
      >
        <CardThumbnail project={project} imageSrc={imageSrc} priority={priority} />

        <motion.div
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] tracking-[0.06em] text-[#8a827a]"
          variants={{
            rest: { opacity: 0.92, y: 0 },
            hover: { opacity: 1, y: -2, transition: hoverTransition },
          }}
        >
          <span>{project.meta}</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${project.tagStyle}`}
          >
            {project.tag}
          </span>
        </motion.div>

        <motion.h3
          className="mt-4 font-serif text-2xl font-semibold tracking-tight text-[#2a2622] md:text-[1.65rem]"
          variants={{
            rest: { y: 0 },
            hover: { y: -3, transition: hoverTransition },
          }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="mt-3 text-sm leading-relaxed text-[#6f6760]"
          variants={{
            rest: { opacity: 0.9 },
            hover: { opacity: 1, transition: hoverTransition },
          }}
        >
          {project.description}
        </motion.p>
      </Link>
    </motion.div>
  );
}

function ProjectCardStatic({
  project,
  imageSrc,
  priority = false,
}: {
  project: Project;
  imageSrc?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex cursor-pointer flex-col border-t border-transparent pt-2 transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <CardThumbnail project={project} imageSrc={imageSrc} staticHover priority={priority} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] tracking-[0.06em] text-[#8a827a]">
        <span>{project.meta}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${project.tagStyle}`}
        >
          {project.tag}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-[#2a2622] md:text-[1.65rem]">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6f6760]">{project.description}</p>
    </Link>
  );
}

function CardThumbnail({
  project,
  imageSrc,
  staticHover = false,
  priority = false,
}: {
  project: Project;
  imageSrc?: string;
  staticHover?: boolean;
  priority?: boolean;
}) {
  const frameClass = imageSrc ? "bg-[#f7f2ea]" : `bg-gradient-to-br ${project.frame}`;

  if (staticHover) {
    return (
      <div className={`group/thumb ${thumbnailShell} ${frameClass}`}>
        <ThumbnailMedia project={project} imageSrc={imageSrc} priority={priority} />
        <ViewProjectOverlay staticHover />
      </div>
    );
  }

  return (
    <motion.div
      className={`${thumbnailShell} ${frameClass}`}
      variants={{
        rest: { y: 0 },
        hover: { y: -6, transition: hoverTransition },
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] shadow-[0_36px_96px_-32px_rgba(42,38,34,0.5)]"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: hoverTransition },
        }}
      />

      <motion.div
        className="absolute inset-0 z-0"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 0.97, transition: hoverTransition },
        }}
        style={{ transformOrigin: "center center" }}
      >
        <ThumbnailMedia project={project} imageSrc={imageSrc} priority={priority} />
      </motion.div>

      <ViewProjectOverlay />
    </motion.div>
  );
}

function ThumbnailMedia({
  project,
  imageSrc,
  priority = false,
}: {
  project: Project;
  imageSrc?: string;
  priority?: boolean;
}) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={project.heroAlt ?? project.title}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 420px"
      />
    );
  }

  return (
    <>
      <div className="absolute inset-6 rounded-3xl bg-[#fffdf8]/55 shadow-inner backdrop-blur-[2px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[62%] w-[46%] rounded-[2rem] bg-[#2a2622]/[0.04] shadow-[0_24px_60px_-30px_rgba(42,38,34,0.55)] ring-1 ring-[#cfc6bb]/80" />
      </div>
    </>
  );
}

function ViewProjectOverlay({ staticHover = false }: { staticHover?: boolean }) {
  const t = useTranslations();

  if (staticHover) {
    return (
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-[2rem] bg-[#2a2622]/0 transition-colors duration-300 group-hover/thumb:bg-[#2a2622]/[0.06]">
        <span className="translate-y-2 rounded-full bg-[#fffdf8]/95 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#2a2622] opacity-0 shadow-[0_8px_32px_-12px_rgba(42,38,34,0.35)] ring-1 ring-[#ebe3d7]/80 backdrop-blur-sm transition-all duration-300 group-hover/thumb:translate-y-0 group-hover/thumb:opacity-100">
          {t("projects.viewProject")}
        </span>
      </div>
    );
  }

  return (
    <motion.div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-[2rem]">
      <motion.div
        className="absolute inset-0 rounded-[2rem] bg-[#2a2622]/[0.06]"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: hoverTransition },
        }}
      />
      <motion.span
        className="rounded-full bg-[#fffdf8]/95 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#2a2622] shadow-[0_8px_32px_-12px_rgba(42,38,34,0.35)] ring-1 ring-[#ebe3d7]/80 backdrop-blur-sm"
        variants={{
          rest: { opacity: 0, y: 8 },
          hover: { opacity: 1, y: 0, transition: hoverTransition },
        }}
      >
        {t("projects.viewProject")}
      </motion.span>
    </motion.div>
  );
}
