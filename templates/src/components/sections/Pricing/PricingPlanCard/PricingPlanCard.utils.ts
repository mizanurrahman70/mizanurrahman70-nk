const CARD_BASE = "flex h-full flex-col rounded-lg bg-surface p-6 md:p-8";

export function cardClasses(recommended = false): string {
  if (recommended) return `${CARD_BASE} border-2 border-primary shadow-md`;
  return `${CARD_BASE} border border-border`;
}

export function formatPrice(amount: number, currency: string, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
