"use client";

import Image from "next/image";
import { useMemo } from "react";

type ImageMarqueeProps = {
  images: readonly string[];
  durationSec?: number;
  reverse?: boolean;
};

export function ImageMarquee({
  images,
  durationSec = 42,
  reverse = false,
}: ImageMarqueeProps) {
  const loop = useMemo(() => [...images, ...images], [images]);

  return (
    <div className="overflow-hidden bg-neutral-900/5 py-5 sm:py-6">
      <div
        className="marquee-track flex w-max gap-3 sm:gap-4"
        style={{
          animation: `${reverse ? "marquee-scroll-reverse" : "marquee-scroll"} ${durationSec}s linear infinite`,
        }}
      >
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-28 w-44 shrink-0 overflow-hidden sm:h-32 sm:w-52 md:h-36 md:w-60"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 176px, 240px"
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
