import type { LinkItem } from "@/types/content";

export type HeroFact = {
  label: string;
  value: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: LinkItem;
  secondaryCta?: LinkItem;
  facts: HeroFact[];
};

export type HeroProps = {
  content?: HeroContent;
};
