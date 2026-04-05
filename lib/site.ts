export const site = {
  name: "Shehnai School of Music and Arts",
  shortName: "Shehnai",
  description:
    "Professional training in music, dance, and arts for all age groups.",
  /** SMA-style hero line under the photo strip */
  heroHeadline: "Learn music anytime, anywhere, for all ages.",
  heroHeadlineMl: "സംഗീതം പഠിക്കാം... ഏതു പ്രായത്തിലും, എവിടെയിരുന്നും, എപ്പോഴും!",
  heroSubline:
    "Live and online classes led by experienced teachers. Practice systematically at our academy or from home at your convenience. We also provide special vacation classes for children.",
  heroSublineMl:
    "അനുഭവസമ്പന്നരായ അധ്യാപകർ നയിക്കുന്ന ലൈവ് & ഓൺലൈൻ ക്ലാസുകൾ. അക്കാദമിയിലോ വീട്ടിലിരുന്നോ ഇനി നിങ്ങളുടെ സൗകര്യത്തിനനുസരിച്ച് പരിശീലിക്കാം. കൂടാതെ, കുട്ടികൾക്കായി പ്രത്യേക അവധിക്കാല ക്ലാസുകളും (Vacation Classes) ഒരുക്കുന്നു.",
  location: "Kanjani, Anthikad",
  modeLabel:
    "Carnatic & film songs online & in person · Other programmes on campus",
  phone: "+91 9387066900",
  /** Country + number, no + (e.g. 91 + 10 digits for India) */
  phoneDigits: "919387066900",
  email: "shehnaianthikad@gmail.com",
  /** Public site (display host without scheme) */
  websiteDisplay: "www.shehnaiacademy.com",
  websiteUrl: "https://www.shehnaiacademy.com",
  whatsappDisplay: "+91 9387066900",
  /** wa.me/{digits} */
  whatsappDigits: "919387066900",
  established: 2002,
} as const;

export const siteUrls = {
  tel: `tel:${site.phoneDigits}`,
  mailto: `mailto:${site.email}`,
  whatsapp: `https://wa.me/${site.whatsappDigits}`,
  website: site.websiteUrl,
} as const;
