import { ContactInfo } from "@/components/sections/ContactInfo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.location}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-black/[0.06] bg-gradient-to-r from-brand-red/90 to-brand-orange/85 py-10 text-white sm:py-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl">
            Contact
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base">
            Call, WhatsApp, or email us — we’ll respond as soon as we can.
          </p>
        </div>
      </section>

      <ContactInfo showMapPlaceholder id="details" />
    </>
  );
}
