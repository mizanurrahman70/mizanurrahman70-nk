const MENU_ICON_PATHS = {
  open: "M6 6l12 12M18 6L6 18",
  closed: "M4 7h16M4 12h16M4 17h16",
} as const;

export function menuIconPath(isOpen: boolean): string {
  return isOpen ? MENU_ICON_PATHS.open : MENU_ICON_PATHS.closed;
}

export function menuButtonLabel(isOpen: boolean): string {
  return isOpen ? "Close menu" : "Open menu";
}
