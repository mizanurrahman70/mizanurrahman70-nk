---
name: nextjs-standard
description: Next.js coding standards for this project. Use for ANY code change - creating or editing pages, components, hooks, utils, data fetching, forms, metadata, or project structure. Enforces App Router, TypeScript strict, file size limits and folder rules.
---

# Next.js standard

## 1. Stack

- Next.js App Router in `src/app`. TypeScript `strict: true`.
- Tailwind CSS with the nk preset (`tailwind.config.mjs`) and tokens only.
- If `AGENTS.md` or `node_modules/next/dist/docs/` exists, check it for the installed Next.js version's APIs before using one you are unsure about.

## 2. Folder layout

```
src/
  app/                  routes, layout.tsx, page.tsx, globals.css, brand.css
  components/
    ui/                 primitives: Button, Section, ...
    sections/           page sections: Navbar, Hero, Pricing, Footer, ...
  lib/                  helpers used by 2+ components (cn, fonts, site config)
  hooks/                hooks used by 2+ components
  types/                types used by 2+ components
```

## 3. Component folders (strict)

Every component lives in its own folder, named exactly like the component:

```
Button/
  Button.tsx            the component
  Button.types.ts       props and local types
  Button.utils.ts       helpers only Button uses
  Button.data.ts        static content (if needed)
  useButton.ts          hook only Button uses (if needed)
  index.ts              public export
```

- Import components through the folder: `import { Button } from "@/components/ui/Button"`.
- `index.ts` only re-exports: `export { Button } from "./Button";` plus public types.
- Used by ONE component: keep it in that component's folder.
- Used by TWO or more: move it to `src/lib`, `src/hooks` or `src/types` and update imports.
- Sub-components that only one parent uses get their own folder inside the parent folder.

## 4. File size (strict)

- **Max 350 lines per file**, enforced by ESLint. Split before you reach it, not after.
- Max 80 lines per function. A long component means you should extract a sub-component.
- How to split: static content into `.data.ts`, types into `.types.ts`, logic into `.utils.ts`
  or `useX.ts`, and repeated JSX into a child component.

## 5. Server and client components

- Server Components by default. No directive needed.
- Add `"use client"` only when the component needs state, effects, event handlers or browser APIs.
- Keep client components small and low in the tree. Pass server data down as props.
- Never put `"use client"` on a page or layout.

## 6. Data

- Fetch data on the server, in Server Components or server functions. Never `useEffect` + `fetch` for initial data.
- Keep fetchers in `src/lib/<name>.ts` with typed return values.
- Secrets live in env vars without the `NEXT_PUBLIC_` prefix and are only read on the server.
- Static content for a section lives in that section's `.data.ts`.

## 7. Forms

- Validate every form with **Zod**, on the server, always. Client validation is optional extra.
- Prefer Server Actions for submissions. Define the schema once and infer types with `z.infer`.
- Return typed field errors and show them next to each field.
- Schema used by one form: `<Form>.schema.ts` in that folder. Shared schema: `src/lib`.

## 8. Next.js built-ins

- Images: `next/image` with `width`/`height` or `fill` + `sizes`, and meaningful `alt`. Never a raw `<img>`.
- Fonts: `next/font` only, configured in `src/lib/fonts.ts`. No `<link>` to font CDNs.
- Links: `next/link` for internal routes.
- SEO: Metadata API. Export `metadata` or `generateMetadata` from every `page.tsx`/`layout.tsx`.
  Include title, description, and `openGraph`. Site-wide defaults live in `src/lib/site.ts`.

## 9. Pages stay thin

`page.tsx` only composes sections. No logic, no data shaping, no raw markup.

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <Pricing />
    </>
  );
}
```

If a page needs data, fetch it in the section that uses it, or in a `src/lib` function the section calls.

## 10. Naming

| Thing | Convention | Example |
|---|---|---|
| Component + folder | PascalCase | `Pricing/Pricing.tsx` |
| Component-scoped files | `Component.role.ts` | `Pricing.data.ts`, `Pricing.utils.ts` |
| Hooks | camelCase with `use` | `useNavbar.ts` |
| Plain files in lib/hooks/types | kebab-case | `src/lib/format-date.ts` |
| Types and interfaces | PascalCase | `PricingPlan` |
| Variables and functions | camelCase, descriptive | `formatPrice`, `isOpen` |
| Constants | UPPER_SNAKE for true constants | `MAX_PLANS` |

## 11. Styling

- Tailwind utilities with design tokens only. No inline `style`, no CSS modules, no raw hex.
- Merge classes with `cn()` from `@/lib/cn`.
- Variants go in a lookup map in `Component.utils.ts`, not in nested ternaries.

## 12. Code style

- Clear names over comments. Almost no comments.
- A comment is allowed only as one line explaining a non-obvious "why".
- No commented-out code. No TODO, FIXME or HACK comments.
- Small functions with one job. Use early returns instead of nested `if`s.
- Extract repeated JSX into a component and repeated logic into a util.
- Type everything that crosses a boundary (props, function params, return values). No `any`.
- Named exports for components. Default exports only where Next.js requires them (page, layout).

## 13. Finish every task

1. `npm run lint` and fix every error and warning you introduced.
2. `npm run typecheck`.
3. Check that no file is over 350 lines and no folder rule is broken.
