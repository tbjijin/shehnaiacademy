import type { Teacher } from "@/lib/data/teachers";
import Image from "next/image";

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0];
  const b = parts[1]?.[0] ?? parts[0]?.[1];
  return [a, b].filter(Boolean).join("").toUpperCase() || "?";
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--brand-gold)_28%,transparent)] bg-white shadow-sm">
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-brand-red/88 via-brand-orange/75 to-brand-gold/70 sm:aspect-[4/3]">
        {teacher.image ? (
          <Image
            src={teacher.image}
            alt={teacher.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            aria-hidden
          >
            <span className="font-heading text-4xl font-semibold tracking-wide text-white drop-shadow-sm sm:text-5xl">
              {initials(teacher.name)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
          {teacher.name}
        </h3>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand-red sm:text-sm">
          {teacher.role}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{teacher.bio}</p>
      </div>
    </article>
  );
}
