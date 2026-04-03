"use client";

import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";

const IMAGE_INTERVAL_MS = 3000;
const COPY_INTERVAL_MS = 10_000;

/** Reserved height for hero EN/ML copy — sized for Malayalam so toggling does not shift layout */
const heroCopyMinHeights =
  "min-h-[16rem] sm:min-h-[17rem] md:min-h-[19rem] lg:min-h-[20rem]";

const heroCopySlides = [
  {
    headline: site.heroHeadline,
    subline: site.heroSubline,
    dotLabel: "English",
  },
  {
    headline: site.heroHeadlineMl,
    subline: site.heroSublineMl,
    dotLabel: "Malayalam",
  },
] as const;

function DesktopPhotoReel({
  index,
  slides,
}: {
  index: number;
  slides: readonly string[];
}) {
  const n = slides.length;
  const prevSrc = slides[(index - 1 + n) % n]!;
  const currSrc = slides[index]!;
  const nextSrc = slides[(index + 1) % n]!;

  return (
    <div
      className="flex h-full w-full items-stretch"
      aria-roledescription="carousel"
    >
      {/* Previous */}
      <div className="relative h-full w-1/4 min-w-0 overflow-hidden">
        <Image
          src={prevSrc}
          alt=""
          fill
          quality={90}
          sizes="25vw"
          className="object-cover object-right-top"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-neutral-100/35 to-neutral-100"
          aria-hidden
        />
      </div>

      {/* Current — outer takes w-1/2 for row spacing; inner frame is same width as sides */}
      <div className="z-[1] flex h-full w-1/2 min-w-0 shrink-0 items-stretch justify-center">
        <div className="relative h-full w-1/2 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
          <Image
            src={currSrc}
            alt=""
            fill
            priority={index === 0}
            quality={90}
            sizes="25vw"
            className="object-cover object-top"
            draggable={false}
          />
        </div>
      </div>

      {/* Next */}
      <div className="relative h-full w-1/4 min-w-0 overflow-hidden">
        <Image
          src={nextSrc}
          alt=""
          fill
          quality={90}
          sizes="25vw"
          className="object-cover object-left-top"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-neutral-100/35 to-neutral-100"
          aria-hidden
        />
      </div>
    </div>
  );
}

const edgeArrowBtnClass =
  "pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-neutral-900/35 text-white shadow-md backdrop-blur-md transition hover:bg-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-40";

export function HomeHero({ heroImages }: { heroImages: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [copyIndex, setCopyIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const nSlides = heroImages.length;
  const multi = nSlides > 1;
  const nCopySlides = heroCopySlides.length;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % nSlides);
  }, [nSlides]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + nSlides) % nSlides);
  }, [nSlides]);

  const togglePaused = () => setPaused((p) => !p);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !multi) return;
    const id = window.setInterval(goNext, IMAGE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goNext, reduceMotion, paused, multi]);

  useEffect(() => {
    if (reduceMotion || nCopySlides <= 1) return;
    const id = window.setInterval(() => {
      setCopyIndex((i) => (i + 1) % nCopySlides);
    }, COPY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, nCopySlides]);

  const onCarouselKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!multi) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <>
      <div className="hero-feather-edge w-full bg-neutral-100">
        <div
          className="relative mx-auto h-80 max-w-[100vw] sm:h-[22rem] md:h-96 lg:h-[26rem]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured photos"
          tabIndex={0}
          onKeyDown={onCarouselKeyDown}
          onClick={() => {
            if (!multi) return;
            togglePaused();
          }}
        >
          {/* Mobile: single full-width strip */}
          <div className="relative h-full w-full overflow-hidden md:hidden">
            {heroImages.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none ${
                  i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-top"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Desktop: reel — prev | current | next */}
          <div className="relative hidden h-full w-full overflow-hidden md:block">
            <DesktopPhotoReel index={index} slides={heroImages} />
          </div>

          {multi && (
            <>
              {/* Edge arrows — don’t cover photo center */}
              <div
                className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center md:left-3"
                aria-hidden={false}
              >
                <button
                  type="button"
                  className={edgeArrowBtnClass}
                  aria-label="Previous slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                >
                  <ChevronLeft className="size-6" strokeWidth={2.25} aria-hidden />
                </button>
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 right-2 z-20 flex items-center md:right-3"
                aria-hidden={false}
              >
                <button
                  type="button"
                  className={edgeArrowBtnClass}
                  aria-label="Next slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                >
                  <ChevronRight className="size-6" strokeWidth={2.25} aria-hidden />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <section
        className="border-b border-black/[0.06] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:py-14"
        aria-labelledby="hero-copy-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`relative mx-auto max-w-2xl ${heroCopyMinHeights}`}
            role="tabpanel"
            id="hero-copy-panel"
            aria-live={reduceMotion ? "off" : "polite"}
          >
            {heroCopySlides.map((slide, i) => (
              <div
                key={slide.dotLabel}
                className={`transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                  i === copyIndex
                    ? `relative z-[1] flex ${heroCopyMinHeights} flex-col opacity-100`
                    : "pointer-events-none absolute inset-0 z-0 flex min-h-full flex-col opacity-0"
                }`}
                aria-hidden={i !== copyIndex}
              >
                <h2
                  id={copyIndex === i ? "hero-copy-heading" : undefined}
                  className="font-heading text-2xl font-semibold leading-tight text-neutral-900 sm:text-3xl md:text-4xl"
                >
                  {slide.headline}
                </h2>
                <p className="mx-auto mt-3 max-w-xl flex-1 text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-base md:text-lg">
                  {slide.subline}
                </p>
              </div>
            ))}
          </div>

          {nCopySlides > 1 && (
            <div
              className="mt-6 flex justify-center gap-2.5"
              role="tablist"
              aria-label="Hero text language"
            >
              {heroCopySlides.map((slide, i) => (
                <button
                  key={slide.dotLabel}
                  type="button"
                  role="tab"
                  id={`hero-copy-tab-${i}`}
                  aria-selected={copyIndex === i}
                  aria-controls="hero-copy-panel"
                  tabIndex={copyIndex === i ? 0 : -1}
                  aria-label={`Show ${slide.dotLabel} text`}
                  onClick={() => setCopyIndex(i)}
                  className={`size-2.5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${
                    copyIndex === i
                      ? "scale-110 bg-brand-red"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          )}

          <Link
            href="/courses"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#f5b800] px-10 py-3 text-base font-semibold text-neutral-900 shadow-sm transition hover:bg-[#ffd54f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            Explore courses
          </Link>
        </div>
      </section>
    </>
  );
}
