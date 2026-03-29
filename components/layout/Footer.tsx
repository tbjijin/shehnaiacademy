import { site, siteUrls } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ logoSrc }: { logoSrc: string }) {
  return (
    <footer
      className="border-t border-[color-mix(in_oklab,var(--brand-gold)_28%,transparent)] bg-[color-mix(in_oklab,white_82%,var(--brand-cream))]"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={logoSrc}
                alt={`${site.name} logo`}
                width={270}
                height={96}
                className="h-[5.25rem] w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-red">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-[40px] items-center text-sm text-foreground/90 hover:text-brand-red"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-red">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>{site.location}</li>
              <li>
                <a className="hover:text-brand-red" href={siteUrls.tel}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brand-red"
                  href={siteUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a className="hover:text-brand-red" href={siteUrls.mailto}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-[color-mix(in_oklab,var(--brand-gold)_22%,transparent)] pt-8 text-center text-xs text-muted sm:text-sm">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
