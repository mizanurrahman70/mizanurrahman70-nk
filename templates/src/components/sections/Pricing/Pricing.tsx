import { Section } from "@/components/ui/Section";
import { pricingContent } from "./Pricing.data";
import type { PricingProps } from "./Pricing.types";
import { PricingPlanCard } from "./PricingPlanCard";

export function Pricing({ content = pricingContent }: PricingProps) {
  const { eyebrow, title, intro, currency, plans, note } = content;

  return (
    <Section id="pricing" tone="muted" eyebrow={eyebrow} title={title} intro={intro}>
      <ul className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {plans.map((plan) => (
          <li key={plan.name}>
            <PricingPlanCard plan={plan} currency={currency} />
          </li>
        ))}
      </ul>
      {note ? <p className="mt-8 max-w-prose text-sm text-foreground-muted">{note}</p> : null}
    </Section>
  );
}
