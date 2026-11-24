# Typography craft

Script-specific rules are in `scripts-lang/`. This file covers the system.

## Roles, not sizes

Define type as roles with tokens, then use the roles everywhere:

```css
:root {
  --font-display: "Display Face", var(--font-fallback-display);
  --font-body:    "Body Face", var(--font-fallback-body);
  --font-utility: "Utility Face", ui-monospace, monospace;

  --size-body: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --size-lead: clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);
  --size-h3:   clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem);
  --size-h2:   clamp(1.625rem, 1.3rem + 1.4vw, 2.5rem);
  --size-h1:   clamp(2.25rem, 1.6rem + 3vw, 4.5rem);   /* cap display at about 6rem */

  --leading-body: 1.55;
  --leading-tight: 1.15;   /* Latin display; Arabic and Persian override it to 1.25 or more (scripts-lang/README.md) */
  --measure: 68ch;
}
.t-body  { font: 400 var(--size-body)/var(--leading-body) var(--font-body); }
.t-title { font: 500 var(--size-h1)/var(--leading-tight) var(--font-display); text-wrap: balance; }
```

- **Scale.** A ratio of 1.2 to 1.25 for product UI and 1.25 to 1.414 for brand pages. The top steps may jump further.
- **Weights.** Give each role a weight. Regular body, medium labels, one heavy display at most. Load only the weights you use.
- **Fluid sizes on brand pages, fixed steps in product UI.** On landing and editorial pages, clamp each role between a mobile minimum and a desktop maximum and test the extremes (TY-08, TY-22). In dense product UI (dashboards, tools, settings), use a fixed `rem` scale at a ratio of 1.125 to 1.2: a table header that changes size with the window reads as a bug.
- **Light on dark.** Light text on a dark ground looks heavier and tighter. Add 0.05 to 0.1 of line height, drop one weight step, and keep Latin body tracking a touch open (Arabic stays at 0).
- **Paragraph rhythm.** Space between paragraphs, or a first-line indent, never both. Leading grows with the measure: a long line needs more air than a short one.
- **Script scoping.** Override the line height, tracking and size step per `:lang()` (see `scripts-lang/README.md`).

## Pairing

- Pair on a contrast axis: serif with sans, geometric with humanist, or one family in several weights and widths.
- Never pair two similar-but-different faces (two geometric sans), because the difference reads as a mistake.
- For multilingual products, choose per script, then check that the families match in x-height, colour (stroke weight) and mood side by side.

## Choosing faces

1. From the subject's world: signage, print, engraving, handwriting, the tools of the trade.
2. From the script's tradition: Naskh for Arabic and Persian reading, Kufi for Arabic display, Nastaliq for Persian poetry…
3. Check the licence (web embedding), the coverage (every language and digit in use), the weights, and the rendering at 14px on a low-DPI screen.

**Serif is not a default for "premium" or "editorial".** Use it when the subject calls for it: publishing, heritage, a literary voice. **Inter is not a default for "clean".** See TY-01 and TY-02.

## Details

- `text-wrap: balance` on headings; `text-wrap: pretty` on paragraphs.
- `font-variant-numeric: tabular-nums` for prices, tables and counters. `lining-nums` in UI, `oldstyle-nums` only in literary text.
- `font-kerning: normal`. Enable `liga` and `calt` for scripts that need them (Arabic always does, and the browser does it by default; never disable ligatures on Arabic).
- `-webkit-font-smoothing: antialiased` at the root on macOS is fine; check thin Arabic strokes at small sizes.
- Links: underline with `text-underline-offset: 0.2em` (0.35em for Arabic) and `text-decoration-thickness: from-font` or 1px.
- The language's own punctuation and no-break spaces (see `scripts-lang/punctuation.md`).

## Loading

- `@font-face` with `font-display: swap` (body) or `optional` (display, when layout shift must be zero).
- Fallback metrics: a local fallback face with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override`, so the swap does not shift the layout. `size-adjust` works in every engine; the three overrides are not in stable Safari yet (November 2026), so expect a small shift there.
- Subset by `unicode-range` per script. Preload only the body weight of the primary script.
- Self-host. Never link third-party font CSS in production unless its privacy and latency are accepted.
