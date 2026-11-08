---
name: design-system
description: Design rules for this client proposal site. Use for ANY visual or UI work - pages, sections, components, layout, colors, typography, spacing, copy, or styling. Enforces tokens, accessibility, and a non-generic look.
---

# Design system

The goal is a site that looks designed for this specific client, not generated.
Strong typography, generous whitespace, the brand's own colors, and real content.

## 1. Intake: ask before designing

Before any visual work, ask for these and wait for the answers:

1. **Brand colors**: primary, plus any secondary or accent (hex values or a brand guide).
2. **Logo**: file (SVG preferred) or "text logo for now".
3. **Audience**: who reads this proposal and what they care about.
4. **Tone**: for example confident, warm, technical, premium, playful.

Also useful: real copy, prices, photos, and competitor or reference sites.
If an answer is missing, ask. Do not fill the gap with a guess.

Once you have them:
- Put brand colors in `src/app/brand.css` as `--brand-*` variables. Check contrast first (section 4).
- Put brand fonts in `src/lib/fonts.ts` (max two families).
- Replace every `[bracketed]` placeholder in `*.data.ts` files with real content.

## 2. Tokens only

Every color, size, space, radius and shadow comes from a token.
Tokens are defined in `tokens.json` from `@mizanurrahman_70/nk` and loaded through the Tailwind preset.
Brand values override them in `src/app/brand.css`.

| Group | Utilities |
|---|---|
| Color | `background` `surface` `muted` `foreground` `foreground-muted` `border` `primary` `primary-foreground` `accent` `accent-foreground` `inverse` `inverse-foreground` `ring` `success` `danger` |
| Font | `font-heading` `font-body` |
| Type | `text-xs` 12, `text-sm` 14, `text-base` 16, `text-lg` 20, `text-xl` 24, `text-2xl` 32, `text-3xl` 48, `text-4xl` 64 |
| Space | `1` 4px (hairline gaps only), `2` 8, `4` 16, `6` 24, `8` 32, `10` 40, `12` 48, `16` 64, `20` 80, `24` 96, `32` 128, `touch` 44 |
| Radius | `rounded-none` `rounded-sm` 4, `rounded-md` 8, `rounded-lg` 16, `rounded-full` |
| Width | `max-w-prose` 640, `max-w-wide` 896, `max-w-content` 1152 |
| Shadow | `shadow-sm` `shadow-md` |

Forbidden:
- Raw hex, rgb or hsl in components (`text-[#333]`, `fill="#fff"`).
- Arbitrary values (`p-[13px]`, `mt-[7px]`, `text-[17px]`).
- Inline `style={{...}}`.
- Default Tailwind palette names (`bg-blue-500`, `text-gray-600`).

If a token is truly missing, add it to the brand layer and explain why. Never inline it.

## 3. Layout and spacing: 8px grid

- All spacing is a multiple of 8px. Use the `1` (4px) step only for icon or text nudges.
- Section vertical padding: `py-16` mobile, `md:py-24` desktop. The `Section` component does this.
- Content width: `max-w-content` for layouts, `max-w-prose` for running text.
- Gutters: `px-4` mobile, `md:px-8` desktop.
- Group related items tightly and separate groups widely. Whitespace shows structure.

## 4. Color and contrast (WCAG AA)

- Body text contrast at least **4.5:1**. Large text (24px+, or 19px+ bold) and UI borders at least **3:1**.
- Check every brand color pairing before using it. If the brand primary fails on white,
  use it for surfaces with `primary-foreground` text, or darken it for text use.
- Use color with intent: one dominant neutral, one brand color, at most one accent.
- Never use color alone to carry meaning. Pair it with text or an icon.

## 5. Typography

- Maximum **two font families**: `font-heading` and `font-body`. Load them only with `next/font`.
- Use only the type scale: 12 / 14 / 16 / 20 / 24 / 32 / 48 / 64.
- One `h1` per page. Headings go in order (h1 > h2 > h3) and never skip a level for styling.
- Body text: `text-base` or `text-lg`, line length 45-75 characters (`max-w-prose`).
- Build hierarchy with size, weight and space before you reach for color.
- Mobile hero headline: `text-2xl` or `text-3xl`. Desktop: `md:text-4xl`.

## 6. Accessibility

- Visible focus on everything interactive: `focus-visible:ring-2 ring-ring ring-offset-2`.
  Never remove outlines without a replacement.
- Touch targets at least **44x44px** (`min-h-touch min-w-touch`).
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`, real `button` and `a` elements.
- Every image has meaningful `alt`. Decorative images use `alt=""`.
- Icons used alone need `aria-label`. Decorative SVGs get `aria-hidden="true"`.
- Forms: visible labels, errors in text linked with `aria-describedby`.
- Respect `prefers-reduced-motion`. Keep motion subtle and functional.

## 7. Hierarchy and CTAs

- Each section has one job and one clear headline.
- **One primary CTA per section** (`Button variant="primary"`). Other actions are `secondary` or `ghost`.
- Each page has one main conversion goal. Repeat that same CTA, not five different ones.
- Lead with the client's outcome, then the proof, then the details.

## 8. Mobile-first

- Write base classes for mobile, then add `sm:` `md:` `lg:` for larger screens.
- Test at 360px, 768px and 1280px widths. No horizontal scroll at any width.
- Stack on mobile and split into columns from `md:` up.

## 9. Avoid the generic "AI look"

Do NOT use:
- Purple/blue (or any rainbow) gradient hero backgrounds.
- Emoji as icons. Use simple inline SVG icons with `aria-hidden`, or none.
- A page built only from rows of 3 identical cards (icon + title + text).
- Glassmorphism, glows, blurred blobs, or floating gradient orbs, unless the brand truly calls for it.
- Filler copy: "Unlock the power of...", "Elevate your business", "Seamless", "Cutting-edge",
  "Revolutionize", "In today's fast-paced world", "Take it to the next level".
- Stock placeholder headlines with no information in them.
- Centering every block. Use left-aligned text for anything longer than two lines.

DO use:
- Real content: the client's name, numbers, deliverables, timeline and prices.
- Strong typography: big confident headings, clear contrast between heading and body.
- Varied section layouts: split text and image, numbered steps, a single quote, a comparison table, a timeline.
- The brand's own colors on solid surfaces, plus whitespace.
- Specific copy that says who it is for, what they get, and what happens next.

## 10. Reuse starter components

Always reuse what exists before building something new:

| Need | Use |
|---|---|
| Any button or button-styled link | `@/components/ui/Button` |
| Any page section (spacing, width, heading) | `@/components/ui/Section` |
| Top navigation | `@/components/sections/Navbar` |
| Hero | `@/components/sections/Hero` |
| Packages and pricing | `@/components/sections/Pricing` |
| Footer | `@/components/sections/Footer` |

- Extend a component with a new variant or prop instead of creating a near-duplicate.
- New sections go in `src/components/sections/<Name>/` and wrap their content in `Section`.
- New primitives go in `src/components/ui/<Name>/`.

## 11. Copy rules

- Write like a person talking to this client. Short sentences. Active voice.
- Headlines state an outcome or a fact. Avoid vague promises.
- CTA labels describe the action: "Approve proposal", "Book a 20-min call", not "Get started".
- Numbers beat adjectives: "Launch in 6 weeks" beats "Fast delivery".

## 12. Pre-delivery checklist

- [ ] Brand colors, logo, audience and tone were confirmed, not guessed.
- [ ] Only tokens used: no hex, no arbitrary values, no inline styles.
- [ ] Type scale and max two fonts respected. Heading order is correct.
- [ ] Contrast is at least 4.5:1 for text, with visible focus states and 44px targets.
- [ ] One primary CTA per section.
- [ ] Looks right at 360px, 768px and 1280px.
- [ ] None of the "AI look" patterns in section 9.
- [ ] No `[bracketed]` placeholders left.
- [ ] Starter components reused.
- [ ] `npm run lint` passes.
