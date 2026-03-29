import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { site, siteUrls } from "@/lib/site";

/** Opens WhatsApp chat per https://wa.me/ — uses `site.whatsappDigits` (e.g. 919387066900). */
export function FloatingWhatsApp() {
  const text = encodeURIComponent(
    `Hello! I would like to know more about ${site.name}.`,
  );
  const href = `${siteUrls.whatsapp}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[100] flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.45)] transition hover:bg-[#20bd5a] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        right: "max(1.25rem, env(safe-area-inset-right))",
      }}
      aria-label={`Chat on WhatsApp — ${site.whatsappDisplay}`}
    >
      <WhatsAppGlyph className="size-7" />
    </a>
  );
}
