import type { SectionTone } from "./Section.types";

type ToneClasses = {
  surface: string;
  eyebrow: string;
  intro: string;
};

const TONES: Record<SectionTone, ToneClasses> = {
  default: {
    surface: "bg-background text-foreground",
    eyebrow: "text-accent",
    intro: "text-foreground-muted",
  },
  muted: {
    surface: "bg-muted text-foreground",
    eyebrow: "text-accent",
    intro: "text-foreground-muted",
  },
  inverse: {
    surface: "bg-inverse text-inverse-foreground",
    eyebrow: "text-inverse-foreground",
    intro: "text-inverse-foreground",
  },
};

export function toneClasses(tone: SectionTone): ToneClasses {
  return TONES[tone];
}

export function headingIdFor(id?: string, title?: string): string | undefined {
  if (!id || !title) return undefined;
  return `${id}-title`;
}
