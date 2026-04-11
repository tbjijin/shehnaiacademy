"use client";

import { parseAchievementCaptionFromUrl } from "@/lib/achievement-caption";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

/** Hide scrollbar but keep touch / trackpad / drag scroll */
const scrollHideClass =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

const USER_PAUSE_MS = 2800;

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const userPauseUntilRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dragRef = useRef<{ pointerId: number; startX: number; startScroll: number } | null>(
    null,
  );

  const scheduleUserPause = useCallback(() => {
    userPauseUntilRef.current = performance.now() + USER_PAUSE_MS;
  }, []);

  const setScrollLeftProgrammatic = useCallback((left: number) => {
    const el = scrollRef.current;
    if (!el) return;
    programmaticScrollRef.current = true;
    el.scrollLeft = left;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });
    });
  }, []);

  const normalizeScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 1) return;
    let sl = el.scrollLeft;
    let changed = false;
    while (sl >= half) {
      sl -= half;
      changed = true;
    }
    while (sl < 0) {
      sl += half;
      changed = true;
    }
    if (changed) setScrollLeftProgrammatic(sl);
  }, [setScrollLeftProgrammatic]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => normalizeScroll());
    ro.observe(el);
    normalizeScroll();
    return () => ro.disconnect();
  }, [normalizeScroll, loop.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || loop.length === 0 || reduceMotion) return;

    let raf = 0;
    const tick = (now: number) => {
      const c = scrollRef.current;
      if (!c) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const half = c.scrollWidth / 2;
      if (half <= 1) {
        lastTickRef.current = now;
        raf = requestAnimationFrame(tick);
        return;
      }

      const pausedByUser = performance.now() < userPauseUntilRef.current;
      const dragging = dragRef.current != null;

      if (!pausedByUser && !dragging && !reduceMotion) {
        const last = lastTickRef.current ?? now;
        const dt = Math.min(now - last, 64);
        lastTickRef.current = now;
        const pxPerMs = half / (durationSec * 1000);
        let sl = c.scrollLeft;
        if (reverse) sl -= pxPerMs * dt;
        else sl += pxPerMs * dt;
        while (sl >= half) sl -= half;
        while (sl < 0) sl += half;
        setScrollLeftProgrammatic(sl);
      } else {
        lastTickRef.current = now;
      }
      raf = requestAnimationFrame(tick);
    };

    lastTickRef.current = null;
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationSec, reverse, reduceMotion, loop.length, setScrollLeftProgrammatic]);

  const onScroll = useCallback(() => {
    if (programmaticScrollRef.current) return;
    scheduleUserPause();
    normalizeScroll();
  }, [normalizeScroll, scheduleUserPause]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const el = scrollRef.current;
      if (!el) return;
      el.scrollLeft += e.deltaX;
      scheduleUserPause();
      normalizeScroll();
    },
    [normalizeScroll, scheduleUserPause],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    scheduleUserPause();
  }, [scheduleUserPause]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current;
      const el = scrollRef.current;
      if (!d || !el || e.pointerId !== d.pointerId) return;
      el.scrollLeft = d.startScroll - (e.clientX - d.startX);
      normalizeScroll();
    },
    [normalizeScroll],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current;
      const el = scrollRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      dragRef.current = null;
      try {
        el?.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      scheduleUserPause();
    },
    [scheduleUserPause],
  );

  const renderSlide = (src: string, i: number) => {
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
  };

  if (loop.length === 0) {
    return (
      <div className={`overflow-hidden bg-neutral-900/5 ${paddingClass}`} aria-hidden />
    );
  }

  return (
    <div className={`bg-neutral-900/5 ${paddingClass}`}>
      <div
        ref={scrollRef}
        role="region"
        aria-label={achievementCaptions ? "Achievements gallery" : "Events gallery"}
        tabIndex={0}
        className={`${scrollHideClass} cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden active:cursor-grabbing`}
        onScroll={onScroll}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={`flex w-max ${gapClass} items-start`}>
          {loop.map((src, i) => renderSlide(src, i))}
        </div>
      </div>
    </div>
  );
}
