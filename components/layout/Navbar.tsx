"use client";

import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { fontSchoolName } from "@/lib/fonts";
import { site, siteUrls } from "@/lib/site";
import { BookOpen, House, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const desktopLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
];

const mobileLinks = [
  { href: "/", label: "Home", Icon: House },
  { href: "/about", label: "About", Icon: Info },
  { href: "/courses", label: "Courses", Icon: BookOpen },
] as const;

const contactHref = "/contact";

function BrandTitleBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p
        className={`${fontSchoolName.className} truncate text-xl font-bold leading-none text-transparent bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text sm:text-2xl md:text-3xl lg:text-[1.875rem] xl:text-[2.25rem]`}
        title={site.name}
      >
        {site.name}
      </p>
    </div>
  );
}

function ContactColumn() {
  return (
    <div className="flex shrink-0 flex-col items-end gap-1 border-l border-black/[0.08] pl-3 md:pl-4">
      <Link
        href={contactHref}
        className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#c45c26] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a84d20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 md:min-h-[40px] lg:px-5"
      >
        Contact
      </Link>
      <span className="inline-flex items-center gap-1.5">
        <a
          href={siteUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[#25D366] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          aria-label="WhatsApp"
        >
          <WhatsAppGlyph className="size-4" />
        </a>
        <a
          href={siteUrls.tel}
          className="text-xs font-medium tabular-nums text-neutral-700 underline-offset-2 hover:text-brand-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
        >
          {site.phone}
        </a>
      </span>
    </div>
  );
}

export function Navbar({ logoSrc }: { logoSrc: string }) {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/95 backdrop-blur-md"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
      }}
    >
      <div className="relative z-50 mx-auto max-w-[90rem] px-4 py-2.5 sm:px-6 lg:px-10">
        {/* Desktop */}
        <div className="hidden items-center justify-between gap-4 md:flex">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-4">
            <Link
              href="/"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Image
                src={logoSrc}
                alt=""
                width={280}
                height={102}
                className="h-12 w-auto md:h-14 lg:h-16"
                priority
              />
            </Link>
            <BrandTitleBlock className="max-w-[min(100%,28rem)] lg:max-w-md xl:max-w-lg" />
          </div>
          <div className="flex shrink-0 items-start gap-2 lg:gap-3">
            <nav
              className="flex items-center gap-0.5 lg:gap-1"
              aria-label="Desktop primary"
            >
              {desktopLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium transition lg:px-2.5 lg:text-[0.9375rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${
                      active
                        ? "text-brand-red"
                        : "text-neutral-800 hover:text-brand-red"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <ContactColumn />
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Image
                src={logoSrc}
                alt=""
                width={200}
                height={73}
                className="h-11 w-auto"
                priority
              />
            </Link>
            <BrandTitleBlock className="flex-1" />
          </div>
          <div className="flex items-start justify-between gap-2">
            <nav
              className="flex items-center gap-1"
              aria-label="Mobile primary"
            >
              {mobileLinks.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 ${
                      active
                        ? "bg-neutral-100 text-brand-red"
                        : "text-neutral-800 hover:bg-neutral-50 hover:text-brand-red"
                    }`}
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6 shrink-0" aria-hidden />
                  </Link>
                );
              })}
            </nav>
            <div className="flex shrink-0 flex-col items-end gap-1 border-l border-black/[0.08] pl-2">
              <Link
                href={contactHref}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#c45c26] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a84d20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              >
                Contact
              </Link>
              <span className="inline-flex items-center justify-end gap-1.5">
                <a
                  href={siteUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[#25D366] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                  aria-label="WhatsApp"
                >
                  <WhatsAppGlyph className="size-4" />
                </a>
                <a
                  href={siteUrls.tel}
                  className="max-w-[9.5rem] truncate text-right text-xs font-medium tabular-nums text-neutral-700 underline-offset-2 hover:text-brand-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
                >
                  {site.phone}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
