import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { bodyFont, headingFont } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(headingFont.variable, bodyFont.variable)}>
      <body>{children}</body>
    </html>
  );
}
