import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { heroContent } from "./Hero.data";
import type { HeroProps } from "./Hero.types";

const HERO_TITLE_ID = "hero-title";

export function Hero({ content = heroContent }: HeroProps) {
  const { eyebrow, title, lead, primaryCta, secondaryCta, facts } = content;

  return (
    <Section id="overview" labelledBy={HERO_TITLE_ID}>
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
      <h1 id={HERO_TITLE_ID} className="mt-4 max-w-wide text-3xl md:text-4xl">
        {title}
      </h1>
      <p className="mt-6 max-w-prose text-lg text-foreground-muted">{lead}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button href={primaryCta.href} variant="primary" size="lg">
          {primaryCta.label}
        </Button>
        {secondaryCta ? (
          <Button href={secondaryCta.href} variant="ghost" size="lg">
            {secondaryCta.label}
          </Button>
        ) : null}
      </div>
      <dl className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-sm text-foreground-muted">{fact.label}</dt>
            <dd className="mt-1 font-heading text-xl">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
