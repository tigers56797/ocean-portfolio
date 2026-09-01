"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectImageProps = {
  src: string;
  alt: string;
  frame?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** cover = hero crop; contain = full image at natural aspect */
  fit?: "cover" | "contain";
  /** GPU-friendly CSS scale on hover */
  zoomOnHover?: boolean;
};

const imageZoomClass =
  "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]";

export function ProjectImage({
  src,
  alt,
  frame = "from-[#f3f0eb] via-[#eae4dc] to-[#ddd5cb]",
  className = "",
  sizes = "(max-width: 768px) 100vw, 680px",
  priority = false,
  fit = "cover",
  zoomOnHover = false,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br ring-1 ring-[#ebe3d7]/90 ${frame} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-8 rounded-xl bg-[#fffdf8]/50 shadow-inner" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[55%] w-[42%] rounded-2xl bg-[#2a2622]/[0.04] ring-1 ring-[#cfc6bb]/70" />
        </div>
      </div>
    );
  }

  if (fit === "contain") {
    return (
      <div
        className={`${zoomOnHover ? "group" : ""} overflow-hidden rounded-2xl bg-[#f7f3ed] ring-1 ring-[#ebe3d7]/90 ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={1050}
          className={`h-auto w-full object-contain ${zoomOnHover ? imageZoomClass : ""}`}
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${zoomOnHover ? "group" : ""} relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-[#ebe3d7]/90 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${zoomOnHover ? imageZoomClass : ""}`}
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
