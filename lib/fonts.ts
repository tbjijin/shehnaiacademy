import { Cormorant_Garamond, Montserrat, Open_Sans } from "next/font/google";

/** Navbar / brand wordmark only — previous serif heading style */
export const fontSchoolName = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-school-name",
  weight: ["400", "600", "700"],
});

export const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700"],
});

export const fontBody = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
