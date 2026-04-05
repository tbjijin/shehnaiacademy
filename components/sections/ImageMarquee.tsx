"use client";

import { parseAchievementCaptionFromUrl } from "@/lib/achievement-caption";
import Image from "next/image";
import { useMemo } from "react";

const slideSizes = {
  default:
    "relative h-28 w-44 shrink-0 overflow-hidden sm:h-32 sm:w-52 md:h-36 md:w-60",
  /** ~1.5× default — use for bottom achievements strip */
  large:
    "relative h-[10.5rem] w-[16.5rem] shrink-0 overflow-hidden sm:h-48 sm:w-[19.5rem] md:h-[13.5rem] md:w-[22.5rem]",
} as const;

/** Column width matches image width; image stacks on top */
const captionSlideOuter = {
  default: "flex w-44 shrink-0 flex-col sm:w-52 md:w-60",
  large:
    "flex w-[16.5rem] shrink-0 flex-col sm:w-[19.5rem] md:w-[22.5rem]",
} as const;

const captionSlideImage = {
  default:
    "relative h-28 w-full shrink-0 overflow-hidden sm:h-32 md:h-36",
  large:
    "relative h-[10.5rem] w-full shrink-0 overflow-hidden sm:h-48 md:h-[13.5rem]",
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
  /**
   * When true, parse `Name+Achievement+Event+Year` from basename (`+` delimiters, `_` → space).
   * No `+` in filename → image only. Only intended for the achievements strip.
   */
  achievementCaptions?: boolean;
};

export function ImageMarquee({
  images,
  durationSec = 42,
  reverse = false,
  size = "default",
  achievementCaptions = false,
}: ImageMarqueeProps) {
  const loop = useMemo(() => [...images, ...images], [images]);
  const slideClass = slideSizes[size];
  const paddingClass =
    size === "large" ? "py-7 sm:py-9 md:py-10" : "py-5 sm:py-6";
  const gapClass =
    size === "large" ? "gap-4 sm:gap-5 md:gap-6" : "gap-3 sm:gap-4";

  const outerClass = captionSlideOuter[size];
  const imageBoxClass = captionSlideImage[size];

  return (
    <div className={`overflow-hidden bg-neutral-900/5 ${paddingClass}`}>
      <div
        className={`marquee-track flex w-max ${gapClass} items-start`}
        style={{
          animation: `${reverse ? "marquee-scroll-reverse" : "marquee-scroll"} ${durationSec}s linear infinite`,
        }}
      >
        {loop.map((src, i) => {
          const caption = achievementCaptions
            ? parseAchievementCaptionFromUrl(src)
            : null;
          const alt =
            caption != null
              ? [caption.line1, caption.line2].filter(Boolean).join(" · ")
              : "";

          if (achievementCaptions) {
            return (
              <div key={`${src}-${i}`} className={outerClass}>
                <div className={`${imageBoxClass} bg-neutral-200/40`}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={imageSizes[size]}
                    quality={88}
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>
                {caption != null ? (
                  <div className="max-w-full px-0.5 pt-2 text-center text-[0.65rem] uppercase leading-snug tracking-wide text-neutral-700 sm:text-[0.7rem] md:text-xs">
                    <p className="font-medium text-neutral-800">{caption.line1}</p>
                    {caption.line2 ? (
                      <p className="mt-0.5 text-neutral-600">{caption.line2}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          }

          return (
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
          );
        })}
      </div>
    </div>
  );
}
