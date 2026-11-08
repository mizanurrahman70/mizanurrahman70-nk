import { Fraunces, Public_Sans } from "next/font/google";

export const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--brand-font-heading",
  display: "swap",
});

export const bodyFont = Public_Sans({
  subsets: ["latin"],
  variable: "--brand-font-body",
  display: "swap",
});
