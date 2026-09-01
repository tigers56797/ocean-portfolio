"use client";

import type { ContentBlock } from "@/data/projects";
import { projectGallery, prose } from "@/lib/site-layout";
import { ProjectImage } from "./project-image";
import { SectionReveal } from "./section-reveal";

const galleryImageClass = "rounded-[1.25rem] md:rounded-[1.5rem]";
const galleryImageSizes = "(max-width: 768px) 100vw, (max-width: 1536px) 1280px, 1408px";

type ProjectContentProps = {
  blocks: ContentBlock[];
  frame?: string;
};

function ProjectImageBlock({
  block,
  frame,
  index,
}: {
  block: Extract<ContentBlock, { type: "image" }>;
  frame?: string;
  index: number;
}) {
  return (
    <SectionReveal className={projectGallery} variant="fade" delay={index * 0.04}>
      <figure className="flex flex-col gap-4">
        <ProjectImage
          src={block.src}
          alt={block.alt}
          frame={frame}
          fit="contain"
          zoomOnHover
          className={galleryImageClass}
          sizes={galleryImageSizes}
        />
        {block.caption ? (
          <figcaption className="text-center text-sm leading-relaxed text-[#8a827a]">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    </SectionReveal>
  );
}

export function ProjectContent({ blocks, frame }: ProjectContentProps) {
  return (
    <article className="flex flex-col gap-10 md:gap-12">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "heading":
            return (
              <SectionReveal key={key} className={prose} delay={index * 0.04}>
                <h2 className="font-serif text-2xl font-medium tracking-tight text-[#2a2622] md:text-[1.75rem]">
                  {block.text}
                </h2>
              </SectionReveal>
            );
          case "text":
            return (
              <SectionReveal key={key} className={prose} delay={index * 0.04}>
                <p className="text-[1.05rem] leading-[1.85] text-[#4a433c] md:text-lg md:leading-[1.9]">
                  {block.text}
                </p>
              </SectionReveal>
            );
          case "image":
            return (
              <ProjectImageBlock key={key} block={block} frame={frame} index={index} />
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
