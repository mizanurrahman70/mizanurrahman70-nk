import type { HeroContent } from "./Hero.types";

export const heroContent: HeroContent = {
  eyebrow: "[Proposal for Client name] · [Month Year]",
  title: "[The one outcome this project delivers for the client]",
  lead: "[Two sentences. What is not working today, and what changes for their customers after launch.]",
  primaryCta: { label: "[See packages]", href: "#pricing" },
  secondaryCta: { label: "[Ask a question]", href: "#contact" },
  facts: [
    { label: "Timeline", value: "[6 weeks]" },
    { label: "Investment", value: "[From $4,800]" },
    { label: "Launch", value: "[Month Year]" },
  ],
};
