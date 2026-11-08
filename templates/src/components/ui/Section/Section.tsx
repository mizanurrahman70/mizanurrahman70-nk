import { cn } from "@/lib/cn";
import type { SectionProps } from "./Section.types";
import { headingIdFor, toneClasses } from "./Section.utils";

export function Section({
  id,
  tone = "default",
  eyebrow,
  title,
  intro,
  labelledBy,
  className,
  children,
}: SectionProps) {
  const styles = toneClasses(tone);
  const headingId = headingIdFor(id, title);

  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? headingId}
      className={cn("px-4 py-16 md:px-8 md:py-24", styles.surface, className)}
    >
      <div className="mx-auto max-w-content">
        {title ? (
          <header className="mb-12 max-w-prose">
            {eyebrow ? (
              <p className={cn("mb-4 text-sm font-semibold uppercase tracking-wide", styles.eyebrow)}>
                {eyebrow}
              </p>
            ) : null}
            <h2 id={headingId} className="text-2xl md:text-3xl">
              {title}
            </h2>
            {intro ? <p className={cn("mt-4 text-lg", styles.intro)}>{intro}</p> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
