# @mizanurrahman_70/nk

**Stop repeating the same prompt.** `nk` sets up a Next.js project so that Claude Code follows your design rules and coding standards from the first message.

Run one command in a new project. You get a `CLAUDE.md`, two Claude Code skills, design tokens, ESLint guardrails and a set of starter components. From then on, every page Claude builds uses your spacing grid, your type scale, your brand colors and your folder structure. It also avoids the generic "AI look".

Built for designers and developers who ship client proposal websites with Next.js every week.

```bash
npm install -D @mizanurrahman_70/nk
npx nk init
```

---

## Why

Every new project starts the same way: you paste a long prompt about spacing, fonts, accessibility, folder rules and "please, no purple gradients". Then you paste it again in the next session, and again in the next project.

`nk` writes those rules into the project once, as files Claude Code reads automatically. ESLint then checks that the rules are followed.

| Without nk | With nk |
|---|---|
| Re-explain your design rules every session | Rules live in `CLAUDE.md` and two skills, loaded automatically |
| Random hex colors and `p-[13px]` everywhere | Tokens only. ESLint blocks raw hex and inline styles |
| Purple gradient hero, emoji icons, three identical cards | An explicit "avoid the AI look" rulebook |
| 900-line `page.tsx` | Max 350 lines per file, thin pages, one folder per component |
| Claude guesses your brand | Claude asks for colors, logo, audience and tone first |

---

## What you get

### 1. Claude Code rules
- **`CLAUDE.md`**: short, strict root rules. Claude reads both skills, asks for brand details before designing, never creates a file over 350 lines, and runs `npm run lint` before it finishes.
- **`.claude/skills/design-system`**:
  - an 8px spacing grid, a maximum of 2 font families, and a 12/14/16/20/24/32/48/64 type scale
  - WCAG AA contrast (4.5:1), visible focus states and 44px touch targets
  - one primary CTA per section, and mobile-first layouts
  - a detailed list of generic "AI look" patterns to avoid
- **`.claude/skills/nextjs-standard`**:
  - App Router, strict TypeScript and Server Components by default
  - `next/image`, `next/font`, the Metadata API, and Zod for forms
  - thin `page.tsx` files and strict component-folder rules

### 2. Guardrails that are enforced
ESLint rules that fail the build instead of relying on good intentions:

| Rule | Limit |
|---|---|
| `max-lines` | 350 per file (error, blank lines and comments not counted) |
| `max-lines-per-function` | 80 (warning) |
| `no-warning-comments` | Flags TODO, FIXME, HACK |
| No inline styles | `style={{...}}` is an error |
| No raw hex colors | `bg-[#ff00aa]` or `fill="#fff"` is an error |

### 3. Design tokens
`tokens.json` plus a Tailwind preset: semantic colors, two font families, a type scale, an 8px spacing scale, radius, content widths and shadows. Each color maps to a `--brand-*` CSS variable, so setting a client's brand means editing **one file**.

### 4. Starter components
TypeScript + Tailwind, accessible, built only from tokens:

| Component | What it does |
|---|---|
| `Button` | Primary, secondary, ghost and inverse variants. Renders a link or a button. 44px minimum height. |
| `Section` | Page section wrapper: spacing, max width, eyebrow, title, intro, and three tones |
| `Navbar` | Sticky header, skip link, accessible mobile menu (closes on Escape) |
| `Hero` | Typographic hero with one primary CTA and a key-facts row |
| `Pricing` | Packages with a highlighted recommended plan, without the three-identical-cards look |
| `Footer` | Contact, links and legal line |

Every component follows the same folder structure:

```
Button/
  Button.tsx          component
  Button.types.ts     props
  Button.utils.ts     helpers only Button uses
  Button.data.ts      static content (if needed)
  useButton.ts        hook only Button uses (if needed)
  index.ts            public export
```

---

## Installation guide

### Requirements

- **Node.js 18** or newer
- **Next.js 16+** with App Router, TypeScript, Tailwind CSS v4, ESLint, and the `src/` directory
- **Claude Code** ([claude.com/claude-code](https://claude.com/claude-code))

### Option A: new project (recommended)

**Step 1.** Create a Next.js app:

```bash
npx create-next-app@latest my-proposal --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-proposal
```

**Step 2.** Install nk:

```bash
npm install -D @mizanurrahman_70/nk
```

**Step 3.** Run init with `--force` to replace the create-next-app boilerplate (layout, page, styles, ESLint config) with the nk versions:

```bash
npx nk init --force
```

**Step 4.** Install the added dependencies and check that everything passes:

```bash
npm install
npm run lint
npm run dev
```

Open http://localhost:3000 to see the starter proposal page.

**Step 5.** Open Claude Code in the project folder and describe what you need, for example:

> Build a proposal site for a dental clinic redesign.

Claude asks for brand colors, logo, audience and tone, then builds the site with your rules.

### Option B: existing project

```bash
npm install -D @mizanurrahman_70/nk
npx nk init
npm install
npm run lint
```

Without `--force`, **nothing you already have is overwritten**:
- Existing files are skipped and listed in the output.
- An existing `CLAUDE.md` keeps its content; the nk rules are appended as a marked block.
- An existing `eslint.config.mjs` is wrapped so the nk rules apply on top of it.
- An existing `globals.css` gets two lines added: `@import "./brand.css"` and `@config "../../tailwind.config.mjs"`.

`npm run lint` will probably show errors in your existing code, such as files that use raw hex colors. That's expected: these are the places that don't follow the new rules yet.

---

## Commands

```bash
npx nk init            # copy everything, skip files that already exist
npx nk init --force    # overwrite existing files and package.json entries
npx nk --help          # show help
npx nk --version       # show version
```

Example output:

```
Files (43 created, 4 skipped)
  + created      CLAUDE.md
  + created      .claude/skills/design-system/SKILL.md
  - skipped      src/app/layout.tsx  (already exists)
  ...

package.json
  + scripts.lint:fix: eslint --fix
  + scripts.typecheck: tsc --noEmit
  + devDependencies.@mizanurrahman_70/nk: ^1.0.0

Project patches
  + patched  eslint.config.mjs  added nk lint rules
  + patched  src/app/globals.css  linked brand.css and the nk Tailwind preset
```

### Scripts added to `package.json`

| Script | Runs |
|---|---|
| `npm run lint` | `eslint` |
| `npm run lint:fix` | `eslint --fix` |
| `npm run typecheck` | `tsc --noEmit` |

---

## Customising for each client

| What | Where |
|---|---|
| Brand colors | `src/app/brand.css`: the `--brand-*` variables (the only file where hex values are allowed) |
| Fonts | `src/lib/fonts.ts`: max two families, loaded with `next/font` |
| Site name, SEO description, URL | `src/lib/site.ts` |
| Section content | `*.data.ts` files inside each section folder |

All starter content uses `[bracketed]` placeholders, so you can search for `[` to find anything that still needs real copy. Claude is instructed to replace all of them.

---

## Project structure after `nk init`

```
CLAUDE.md
.claude/skills/
  design-system/SKILL.md
  nextjs-standard/SKILL.md
eslint.config.mjs
tailwind.config.mjs
src/
  app/                  layout.tsx, page.tsx, globals.css, brand.css
  components/
    ui/                 Button/, Section/
    sections/           Navbar/, Hero/, Pricing/, Footer/
  lib/                  cn.ts, fonts.ts, site.ts
  hooks/                hooks used by 2+ components
  types/                content.ts
```

A helper used by **one** component stays in that component's folder. A helper used by **two or more** moves to `src/lib`, `src/hooks` or `src/types`.

---

## Using the pieces without the CLI

```js
// tailwind.config.mjs
import nk from "@mizanurrahman_70/nk/tailwind-preset.js";

export default {
  presets: [nk],
  content: ["./src/**/*.{ts,tsx,mdx}"],
};
```

```js
// eslint.config.mjs
import nk from "@mizanurrahman_70/nk/eslint-config.js";

export default [...yourConfig, ...nk];
```

---

## Troubleshooting

**`npx nk` runs a different package.**
Install nk in the project first (`npm install -D @mizanurrahman_70/nk`), or run it by its full name: `npx @mizanurrahman_70/nk init`.

**`Cannot find module '@mizanurrahman_70/nk/eslint-config.js'`**
Run `npm install`. `nk init` adds the package to `devDependencies`, but you still need to install it.

**Tailwind classes like `bg-primary` have no effect.**
Make sure your root stylesheet has these lines right after `@import "tailwindcss";`:

```css
@import "./brand.css";
@config "../../tailwind.config.mjs";
```

**My project uses `app/` instead of `src/app/`.**
nk uses the `src/` layout, and Next.js ignores `src/app` while a root `app/` folder exists. Move `app/` into `src/` and set the `@/*` path in `tsconfig.json` to `./src/*`.

**I want to update the rules in an existing project.**
Update the package, then run `npx nk init --force`. Be careful: this also overwrites any starter files you have edited. To refresh only the rules, delete `CLAUDE.md` and `.claude/skills/` first, then run `npx nk init` without `--force`.

---

## License

MIT © mizanurrahman_70
