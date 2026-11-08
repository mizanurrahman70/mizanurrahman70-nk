const tokens = require("./tokens.json");

const toBrandVar = (name, fallback) => `var(--brand-${name}, ${fallback})`;

const colors = Object.fromEntries(
  Object.entries(tokens.color).map(([name, value]) => [name, toBrandVar(name, value)])
);

module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...colors,
    },
    fontFamily: tokens.font,
    fontSize: tokens.fontSize,
    spacing: tokens.spacing,
    borderRadius: tokens.radius,
    boxShadow: { none: "none", ...tokens.shadow },
    extend: {
      maxWidth: tokens.container,
      ringColor: { DEFAULT: colors.ring },
    },
  },
};
