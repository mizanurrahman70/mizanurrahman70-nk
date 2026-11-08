import type { PricingContent } from "./Pricing.types";

export const pricingContent: PricingContent = {
  eyebrow: "Packages",
  title: "[Pick the scope that fits this quarter]",
  intro: "[One sentence on how the packages differ and what every package includes.]",
  currency: "USD",
  plans: [
    {
      name: "[Essential]",
      price: 4800,
      cadence: "one-time",
      summary: "[Who this is for, in one line.]",
      features: ["[5-page marketing site]", "[Copy editing]", "[2 revision rounds]"],
      cta: { label: "[Choose Essential]", href: "#contact" },
    },
    {
      name: "[Growth]",
      price: 8500,
      cadence: "one-time",
      summary: "[Who this is for, in one line.]",
      features: ["[Everything in Essential]", "[Case study pages]", "[CMS setup]", "[Analytics + SEO setup]"],
      cta: { label: "[Approve Growth]", href: "#contact" },
      recommended: true,
    },
    {
      name: "[Partner]",
      price: 14000,
      cadence: "one-time",
      summary: "[Who this is for, in one line.]",
      features: ["[Everything in Growth]", "[Brand refresh]", "[3 months of support]"],
      cta: { label: "[Choose Partner]", href: "#contact" },
    },
  ],
  note: "[Prices exclude tax. 50% on approval, 50% at launch. Valid for 30 days.]",
};
