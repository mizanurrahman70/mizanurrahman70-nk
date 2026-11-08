import type { NavbarContent } from "./Navbar.types";

export const navbarContent: NavbarContent = {
  brand: "[Client name]",
  links: [
    { label: "Overview", href: "#overview" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "[Approve proposal]", href: "#pricing" },
};
