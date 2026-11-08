import type { LinkItem } from "@/types/content";

export type NavbarLinksProps = {
  links: LinkItem[];
  className?: string;
  onNavigate?: () => void;
};
