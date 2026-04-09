import { ContactInfo } from "@/components/sections/ContactInfo";
import { HomeHero } from "@/components/sections/HomeHero";
import { ImageMarquee } from "@/components/sections/ImageMarquee";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { courses } from "@/lib/data/courses";
import { whyUsItems } from "@/lib/data/why-us";
import { getPublicImageBuckets, orderHeroImageUrls } from "@/lib/public-images";
import {
  fallbackAchievementsMarquee,
  fallbackHeroSlides,
  fallbackNewsMarquee,
} from "@/lib/site-assets";
import { site } from "@/lib/site";
import Link from "next/link";

const courseCardStyles = [
  {
    border: "border-t-brand-red",
    bg: "bg-[color-mix(in_oklab,var(--brand-red)_11%,white)]",
  },
  {
    border: "border-t-[#c45c26]",
    bg: "bg-[color-mix(in_oklab,#c45c26_11%,white)]",
  },
  {
    border: "border-t-brand-gold",
    bg: "bg-[color-mix(in_oklab,var(--brand-gold)_13%,white)]",
  },
  {
    border: "border-t-brand-red-dark",
    bg: "bg-[color-mix(in_oklab,var(--brand-red-dark)_10%,white)]",
  },
] as const;

export default async function HomePage() {
  const buckets = getPublicImageBuckets();
  const orderedHeroImages = orderHeroImageUrls(
    buckets.hero.length > 0 ? buckets.hero : [...fallbackHeroSlides],
  );
  const heroImages = buckets.logoSrc
    ? [buckets.logoSrc, ...orderedHeroImages.filter((src) => src !== buckets.logoSrc)]
    : orderedHeroImages;
  const newsMarquee =
    buckets.news.length > 0 ? buckets.news : [...fallbackNewsMarquee];
  const achievementsMarquee =
    buckets.achievements.length > 0
      ? buckets.achievements
      : [...fallbackAchievementsMarquee];

  return (
    <>
      <h1 className="sr-only">{site.name}</h1>

      <HomeHero heroImages={heroImages} />

      <section className="border-y border-black/[0.05] bg-white" aria-label="Upcoming events">
        <h2 className="sr-only">Upcoming events</h2>
        <ImageMarquee images={newsMarquee} durationSec={38} size="large" />
      </section>

      <div id="courses" className="scroll-mt-28">
        <SectionWrapper
          className="border-b border-black/[0.06] bg-[color-mix(in_oklab,white_88%,var(--brand-cream))]"
          innerClassName="!max-w-7xl xl:!max-w-[88rem]"
        >
          <h2 className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            Courses
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted sm:text-base">
            Tap a course for full details, duration, and mode — {site.modeLabel}.
          </p>
          <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-y-6 lg:gap-x-8">
            {courses.map((c, i) => {
              const card = courseCardStyles[i % courseCardStyles.length]!;
              return (
                <li key={c.slug}>
                  <article
                    className={`flex h-full flex-col overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--brand-gold)_28%,transparent)] shadow-sm transition hover:shadow-md ${card.bg} ${card.border} border-t-4`}
                  >
                    <Link
                      href={`/courses#${c.slug}`}
                      className="flex flex-1 flex-col p-5 pb-4 text-left outline-none transition-colors hover:bg-black/[0.02] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red sm:p-6 sm:pb-5"
                    >
                      <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-neutral-600">{c.titleMl}</p>
                    </Link>
                    <div className="mt-auto flex flex-row flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/[0.04] px-5 py-4 sm:px-6 sm:py-5">
                      <Link
                        href={`/courses#${c.slug}`}
                        className="inline-flex text-sm font-semibold text-brand-red underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
                      >
                        Course details
                      </Link>
                      <Link
                        href="/about#faculty"
                        className="inline-flex text-sm font-semibold text-brand-red underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
                      >
                        Our teachers
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </SectionWrapper>
      </div>

      <SectionWrapper>
        <h2 className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          Why choose us
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsItems.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-gold)_25%,transparent)] bg-white p-5 sm:p-6 shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-gold-light/50 text-brand-red">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground sm:text-xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <section className="border-y border-black/[0.05] bg-neutral-50" aria-label="Achievements and moments">
        <h2 className="sr-only">Achievements and moments</h2>
        <ImageMarquee
          images={achievementsMarquee}
          durationSec={48}
          reverse
          size="large"
          achievementCaptions
        />
      </section>

      <ContactInfo showMapPlaceholder={false} />
    </>
  );
}