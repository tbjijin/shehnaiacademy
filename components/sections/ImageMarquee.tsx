"use client";

import Image from "next/image";
import { useMemo } from "react";

const slideSizes = {
  default:
    "relative h-28 w-44 shrink-0 overflow-hidden sm:h-32 sm:w-52 md:h-36 md:w-60",
  /** ~1.5× default — use for bottom achievements strip */
  large:
    "relative h-[10.5rem] w-[16.5rem] shrink-0 overflow-hidden sm:h-48 sm:w-[19.5rem] md:h-[13.5rem] md:w-[22.5rem]",
} as const;

const imageSizes = {
  default: "(max-width: 768px) 176px, 240px",
  large: "(max-width: 768px) 264px, 360px",
} as const;

type ImageMarqueeProps = {
  images: readonly string[];
  durationSec?: number;
  reverse?: boolean;
  /** `large` is ~50% taller/wider slides + a bit more vertical padding */
  size?: keyof typeof slideSizes;
};

export function ImageMarquee({
  images,
  durationSec = 42,
  reverse = false,
  size = "default",
}: ImageMarqueeProps) {
  const loop = useMemo(() => [...images, ...images], [images]);
  const slideClass = slideSizes[size];
  const paddingClass =
    size === "large" ? "py-7 sm:py-9 md:py-10" : "py-5 sm:py-6";
  const gapClass = size === "large" ? "gap-4 sm:gap-5 md:gap-6" : "gap-3 sm:gap-4";

  return (
    <div className={`overflow-hidden bg-neutral-900/5 ${paddingClass}`}>
      <div
        className={`marquee-track flex w-max ${gapClass}`}
        style={{
          animation: `${reverse ? "marquee-scroll-reverse" : "marquee-scroll"} ${durationSec}s linear infinite`,
        }}
      >
        {loop.map((src, i) => (
          <div key={`${src}-${i}`} className={slideClass}>
            <Image
              src={src}
              alt=""
              fill
              sizes={imageSizes[size]}
              quality={88}
              className="object-cover object-center"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
