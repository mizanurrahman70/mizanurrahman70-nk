import Link from "next/link";
import type { NavbarLinksProps } from "./NavbarLinks.types";

export function NavbarLinks({ links, className, onNavigate }: NavbarLinksProps) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className="flex min-h-touch items-center text-base text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
