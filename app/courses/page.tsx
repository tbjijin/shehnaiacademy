import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { courses } from "@/lib/data/courses";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses",
  description: `Programs at ${site.name} — music, dance, and arts for all ages.`,
};

const courseBandStyles = [
  { wrap: "from-brand-red/[0.07] via-white to-white", bar: "bg-brand-red", title: "text-brand-red" },
  { wrap: "from-[#c45c26]/[0.08] via-[#fffbf5] to-[#fffbf5]", bar: "bg-[#c45c26]", title: "text-[#a84d20]" },
  { wrap: "from-brand-gold/[0.12] via-white to-white", bar: "bg-brand-gold", title: "text-[#8a6b1b]" },
  { wrap: "from-brand-red-dark/[0.06] via-[#faf8ff] to-[#faf8ff]", bar: "bg-brand-red-dark", title: "text-brand-red-dark" },
] as const;

export default function CoursesPage() {
  return (
    <>
      <section className="border-b border-[color-mix(in_oklab,var(--brand-gold)_25%,transparent)] bg-gradient-to-br from-brand-red/92 via-brand-orange/85 to-brand-gold/75 py-14 text-white sm:py-20">
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl">
            Courses
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
            Structured programs in {site.location}. {site.modeLabel}.
          </p>
        </div>
      </section>

      {courses.map((c, i) => {
        const s = courseBandStyles[i % courseBandStyles.length]!;
        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`scroll-mt-28 border-b border-black/[0.06] bg-gradient-to-r ${s.wrap} ${
              i > 0
                ? "border-t-2 border-t-[color-mix(in_oklab,var(--brand-gold)_45%,transparent)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]"
                : ""
            }`}
          >
            <SectionWrapper className="!py-12 sm:!py-14">
              <div className={`h-1 w-14 rounded-full ${s.bar}`} aria-hidden />
              <h2
                className={`mt-5 font-heading text-2xl font-semibold sm:text-3xl ${s.title}`}
              >
                {c.title} / {c.titleMl}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
                {c.description}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700/90 sm:text-base">
                {c.descriptionMl}
              </p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
                <div>
                  <dt className="font-medium text-neutral-800">Duration</dt>
                  <dd>{c.duration}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-800">Mode</dt>
                  <dd>{c.mode}</dd>
                </div>
              </dl>
              <Link
                href="/about#faculty"
                className="mt-6 inline-flex text-sm font-semibold text-brand-red underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
              >
                Our teachers
              </Link>
            </SectionWrapper>
          </section>
        );
      })}
    </>
  );
}
