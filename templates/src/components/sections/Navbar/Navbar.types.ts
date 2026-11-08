import type { LinkItem } from "@/types/content";

export type NavbarContent = {
  brand: string;
  links: LinkItem[];
  cta: LinkItem;
};

export type NavbarProps = {
  content?: NavbarContent;
};
