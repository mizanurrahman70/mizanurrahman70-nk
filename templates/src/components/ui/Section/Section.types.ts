import type { ReactNode } from "react";

export type SectionTone = "default" | "muted" | "inverse";

export type SectionProps = {
  id?: string;
  tone?: SectionTone;
  eyebrow?: string;
  title?: string;
  intro?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};
