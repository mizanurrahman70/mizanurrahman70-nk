# @mizanurrahman70/nk

One command that makes Claude Code follow your design rules and Next.js standards in every new client proposal site.

`nk init` adds:

- **`CLAUDE.md`**: short, strict root rules that Claude Code loads in every session.
- **Two Claude Code skills**: `design-system` (tokens, WCAG AA, 8px grid, no generic "AI look") and `nextjs-standard` (App Router, server-first, folder and file-size rules).
- **ESLint limits**: max 350 lines per file, max 80 lines per function, no TODO comments, no inline styles, no raw hex colors.
- **Design tokens + Tailwind preset**: colors, two font families, a 12–64 type scale, an 8px spacing grid, radius and widths.
- **Starter components** (TypeScript + Tailwind): `Button`, `Section`, `Navbar`, `Hero`, `Pricing`, `Footer`.

## Requirements

- Node.js 18+
- A Next.js 16+ project (App Router, TypeScript, Tailwind CSS v4, ESLint flat config), using the `src/` directory

## Install and use

```bash
npx create-next-app@latest my-proposal --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-proposal

npm install -D @mizanurrahman70/nk
npx nk init --force   # fresh project: replace the create-next-app boilerplate
npm install
npm run lint
```

In an existing project, run `npx nk init` without `--force`. Nothing you already have gets overwritten.

Then open Claude Code in the project. Before designing anything, it asks for your brand colors, logo, audience and tone.

## What `nk init` does

| Step | Behaviour |
|---|---|
| Copy templates | Copies every file from `templates/`. Existing files are **skipped** unless you pass `--force`. |
| `CLAUDE.md` | If you already have one, the nk rules are **appended** as a marked block. Your content is kept. |
| `package.json` | Adds the `lint`, `lint:fix` and `typecheck` scripts, plus the `eslint`, `eslint-config-next` and `@mizanurrahman70/nk` dev dependencies. Existing entries are kept unless you pass `--force`. |
| `eslint.config.*` | If yours was skipped, it is wrapped so the nk rules apply on top of it. |
| `globals.css` | If yours was skipped, the CLI adds `@import "./brand.css"` and `@config "../../tailwind.config.mjs"`. |

It prints every file it created, overwrote, merged or skipped.

```
npx nk init           Copy files, skip existing ones
npx nk init --force   Overwrite existing files and package.json entries
npx nk --help
```

## Files added to your project

```
CLAUDE.md
.claude/skills/design-system/SKILL.md
.claude/skills/nextjs-standard/SKILL.md
eslint.config.mjs
tailwind.config.mjs
src/
  app/          layout.tsx, page.tsx, globals.css, brand.css
  components/
    ui/         Button/, Section/
    sections/   Navbar/, Hero/, Pricing/, Footer/
  lib/          cn.ts, fonts.ts, site.ts
  hooks/
  types/        content.ts
```

## Customising per client

- **Brand colors**: edit the `--brand-*` variables in `src/app/brand.css`. This is the only place raw color values belong.
- **Fonts**: edit `src/lib/fonts.ts` (max two families).
- **Content**: replace the `[bracketed]` placeholders in the `*.data.ts` files and in `src/lib/site.ts`.

Default token values live in `tokens.json`. The Tailwind preset (`tailwind-preset.js`) maps every token to a `var(--brand-*)` variable, so the brand layer can override it.

## Using the pieces directly

```js
// tailwind.config.mjs
import nk from "@mizanurrahman70/nk/tailwind-preset.js";
export default { presets: [nk], content: ["./src/**/*.{ts,tsx,mdx}"] };
```

```js
// eslint.config.mjs
import nk from "@mizanurrahman70/nk/eslint-config.js";
export default [...yourConfig, ...nk];
```

## License

MIT
