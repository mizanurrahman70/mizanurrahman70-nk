import { Button } from "@/components/ui/Button";
import type { PricingPlanCardProps } from "./PricingPlanCard.types";
import { cardClasses, formatPrice } from "./PricingPlanCard.utils";

export function PricingPlanCard({ plan, currency }: PricingPlanCardProps) {
  const { name, price, cadence, summary, features, cta, recommended } = plan;

  return (
    <article className={cardClasses(recommended)}>
      {recommended ? (
        <p className="mb-4 self-start rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          Recommended
        </p>
      ) : null}
      <h3 className="text-xl">{name}</h3>
      <p className="mt-2 text-foreground-muted">{summary}</p>
      <p className="mt-6 font-heading text-2xl">
        {formatPrice(price, currency)}
        <span className="ml-2 font-body text-sm text-foreground-muted">{cadence}</span>
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 size-4 shrink-0 text-primary">
              <path d="M5 12l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button href={cta.href} variant={recommended ? "primary" : "secondary"} className="mt-8 w-full">
        {cta.label}
      </Button>
    </article>
  );
}
