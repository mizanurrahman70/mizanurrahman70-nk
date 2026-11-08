"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { navbarContent } from "./Navbar.data";
import type { NavbarProps } from "./Navbar.types";
import { menuButtonLabel, menuIconPath } from "./Navbar.utils";
import { NavbarLinks } from "./NavbarLinks";
import { useNavbar } from "./useNavbar";

const MOBILE_MENU_ID = "mobile-menu";

export function Navbar({ content = navbarContent }: NavbarProps) {
  const { isOpen, toggle, close } = useNavbar();
  const { brand, links, cta } = content;

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-2 md:px-8">
        <Link href="/" onClick={close} className="flex min-h-touch items-center font-heading text-lg font-semibold">
          {brand}
        </Link>
        <NavbarLinks links={links} className="hidden items-center gap-6 md:flex" />
        <Button href={cta.href} variant="primary" className="hidden md:inline-flex">
          {cta.label}
        </Button>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label={menuButtonLabel(isOpen)}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-md md:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
            <path d={menuIconPath(isOpen)} strokeLinecap="round" />
          </svg>
        </button>
      </nav>
      {isOpen ? (
        <div id={MOBILE_MENU_ID} className="border-t border-border px-4 pb-6 md:hidden">
          <NavbarLinks links={links} onNavigate={close} className="flex flex-col py-2" />
          <Button href={cta.href} variant="primary" onClick={close} className="w-full">
            {cta.label}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
