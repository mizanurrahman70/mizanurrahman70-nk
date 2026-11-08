import type { LinkItem } from "@/types/content";

export type FooterContent = {
  brand: string;
  tagline: string;
  email: string;
  links: LinkItem[];
  legal: string;
};

export type FooterProps = {
  content?: FooterContent;
};
