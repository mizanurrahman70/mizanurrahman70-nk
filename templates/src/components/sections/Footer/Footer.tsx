import Link from "next/link";
import { footerContent } from "./Footer.data";
import type { FooterProps } from "./Footer.types";

const LINK_CLASSES = "inline-flex min-h-touch items-center underline underline-offset-4 hover:no-underline";

export function Footer({ content = footerContent }: FooterProps) {
  const { brand, tagline, email, links, legal } = content;

  return (
    <footer id="contact" className="bg-inverse px-4 py-16 text-inverse-foreground md:px-8">
      <div className="mx-auto grid max-w-content gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="font-heading text-xl">{brand}</p>
          <p className="mt-4 max-w-prose">{tagline}</p>
          <a href={`mailto:${email}`} className={`${LINK_CLASSES} mt-4 text-lg`}>
            {email}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASSES}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-content border-t border-inverse-foreground/20 pt-8 text-sm">{legal}</p>
    </footer>
  );
}
