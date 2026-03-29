import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { site, siteUrls } from "@/lib/site";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

type ContactInfoProps = {
  showMapPlaceholder?: boolean;
  id?: string;
};

export function ContactInfo({
  showMapPlaceholder = false,
  id = "contact",
}: ContactInfoProps) {
  return (
    <SectionWrapper
      id={id}
      className="border-t border-[color-mix(in_oklab,var(--brand-gold)_22%,transparent)] bg-[color-mix(in_oklab,white_78%,var(--brand-cream))]"
    >
      <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        Visit &amp; contact
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
        {site.modeLabel} · {site.location}
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
              Address
            </p>
            <p className="mt-1 text-sm text-foreground sm:text-base">{site.location}</p>
          </div>
        </li>
        <li className="flex gap-3">
          <Phone className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
              Phone
            </p>
            <a
              href={siteUrls.tel}
              className="mt-1 block text-sm text-foreground underline-offset-4 hover:text-brand-red hover:underline sm:text-base"
            >
              {site.phone}
            </a>
          </div>
        </li>
        <li className="flex gap-3">
          <MessageCircle className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
              WhatsApp
            </p>
            <a
              href={siteUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-foreground underline-offset-4 hover:text-brand-red hover:underline sm:text-base"
            >
              {site.whatsappDisplay}
            </a>
          </div>
        </li>
        <li className="flex gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
              Email
            </p>
            <a
              href={siteUrls.mailto}
              className="mt-1 block break-all text-sm text-foreground underline-offset-4 hover:text-brand-red hover:underline sm:text-base"
            >
              {site.email}
            </a>
          </div>
        </li>
      </ul>

      {showMapPlaceholder ? (
        <div className="mt-10 flex aspect-[21/9] max-h-56 w-full items-center justify-center rounded-2xl border border-dashed border-black/15 bg-white/80 text-sm text-muted">
          Map — add an embed when you have a Google Maps link
        </div>
      ) : null}
    </SectionWrapper>
  );
}
