import Image from "next/image";
import Link from "next/link";

export type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  href?: string;
  duration?: string;
  mode?: string;
};

export function CourseCard({
  title,
  description,
  image,
  href,
  duration,
  mode,
}: CourseCardProps) {
  const card = (
    <article className="group overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--brand-gold)_35%,transparent)] bg-white shadow-[0_8px_30px_-12px_rgba(44,24,16,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(44,24,16,0.22)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-2 h-0.5 w-10 rounded-full bg-brand-gold" aria-hidden />
        <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
        {(duration || mode) && (
          <dl className="mt-4 flex flex-col gap-1 text-xs text-muted sm:text-sm">
            {duration ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-foreground">Duration</dt>
                <dd>{duration}</dd>
              </div>
            ) : null}
            {mode ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-foreground">Mode</dt>
                <dd>{mode}</dd>
              </div>
            ) : null}
          </dl>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2">
        {card}
      </Link>
    );
  }

  return card;
}
