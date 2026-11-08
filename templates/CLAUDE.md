<!-- BEGIN:nk-rules -->
# Project rules (nk)

Client proposal website: Next.js App Router, TypeScript strict, Tailwind with design tokens.

## For every task
1. Read and follow both skills before you write code:
   - `.claude/skills/design-system/SKILL.md`
   - `.claude/skills/nextjs-standard/SKILL.md`
2. Ask for brand details before designing: brand colors, logo, audience and tone.
   If any are missing, stop and ask. Never invent a brand.
3. Reuse the starter components in `src/components` before creating new ones.
4. Never create a file over 350 lines. Split it before it gets there.
5. Before finishing, run `npm run lint` and fix all errors. Then run `npm run typecheck`.

## Never
- Raw hex colors, inline styles, or magic numbers. Use tokens only.
- Purple/blue gradient heroes, emoji icons, glassmorphism, glow blobs, or a page of identical cards.
- Filler copy like "Unlock the power of..." or "Elevate your business".
- Commented-out code, TODO comments, or long comments.

Next.js version notes, if present: @AGENTS.md
<!-- END:nk-rules -->
