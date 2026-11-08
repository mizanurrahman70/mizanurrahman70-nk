const SOURCE_FILES = ["**/*.{js,jsx,mjs,cjs,ts,tsx}"];
const HEX_COLOR = "/(^|[\\s\\[(:,])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/";
const HEX_MESSAGE = "No raw hex colors. Use a design token (bg-primary, text-foreground, ...).";

module.exports = [
  {
    files: SOURCE_FILES,
    rules: {
      "max-lines": ["error", { max: 350, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 80, skipBlankLines: true, skipComments: true }],
      "no-warning-comments": ["warn", { terms: ["todo", "fixme", "hack", "xxx"], location: "anywhere" }],
    },
  },
  {
    files: ["src/**/*.{jsx,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message: "No inline styles. Use Tailwind classes backed by design tokens.",
        },
        { selector: `Literal[value=${HEX_COLOR}]`, message: HEX_MESSAGE },
        { selector: `TemplateElement[value.raw=${HEX_COLOR}]`, message: HEX_MESSAGE },
      ],
    },
  },
];
