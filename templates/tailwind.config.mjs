import nk from "@mizanurrahman_70/nk/tailwind-preset.js";

/** @type {import("tailwindcss").Config} */
const config = {
  presets: [nk],
  content: ["./src/**/*.{ts,tsx,mdx}"],
};

export default config;
