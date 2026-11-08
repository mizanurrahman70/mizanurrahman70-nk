import { cn } from "@/lib/cn";
import type { ButtonAsLinkProps, ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

const BASE =
  "inline-flex min-h-touch items-center justify-center gap-2 rounded-md font-body font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-foreground bg-transparent text-foreground hover:bg-muted",
  ghost: "text-foreground underline-offset-4 hover:underline",
  inverse: "bg-inverse-foreground text-inverse hover:bg-inverse-foreground/90",
};

const SIZES: Record<ButtonSize, string> = {
  md: "px-6 text-base",
  lg: "min-h-12 px-8 text-lg",
};

type ButtonClassOptions = {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
};

export function buttonClasses({ variant, size, className }: ButtonClassOptions): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return typeof props.href === "string";
}
