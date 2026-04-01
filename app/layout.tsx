import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublicImageBuckets } from "@/lib/public-images";
import { FALLBACK_LOGO_SRC } from "@/lib/site-assets";
import { site } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { fontBody, fontHeading, fontSchoolName } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.shortName}` },
  description: site.description,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: site.shortName,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf7f2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logoSrc: logoFromDisk } = getPublicImageBuckets();
  const resolvedLogo = logoFromDisk ?? FALLBACK_LOGO_SRC;

  return (
    <html
      lang="en"
      className={`${fontSchoolName.variable} ${fontHeading.variable} ${fontBody.variable} h-full scroll-smooth`}
    >
      <body className="font-body flex min-h-full flex-col overflow-x-hidden bg-background text-foreground antialiased">
        <Navbar logoSrc={resolvedLogo} />
        <main className="flex-1">{children}</main>
        <Footer logoSrc={resolvedLogo} />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
