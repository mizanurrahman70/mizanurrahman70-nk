import type { LinkItem } from "@/types/content";

export type PricingPlan = {
  name: string;
  price: number;
  cadence: string;
  summary: string;
  features: string[];
  cta: LinkItem;
  recommended?: boolean;
};

export type PricingContent = {
  eyebrow: string;
  title: string;
  intro: string;
  currency: string;
  plans: PricingPlan[];
  note?: string;
};

export type PricingProps = {
  content?: PricingContent;
};
