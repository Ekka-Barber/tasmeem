# The platform in late 2026: what to reach for, and how to fall back

Generated code reaches for a JavaScript library where the browser already has the feature, or for a new feature with no fallback. Both read as unconsidered. Use this table to pick the native tool, and write the fallback in the same commit.

Support was read from MDN's compatibility data and webstatus.dev in November 2026. It moves every month: when a feature is marked *limited* and the design depends on it, check MDN before shipping.

- **Widely:** in every major engine for 30 months or more. Use it plainly.
- **Newly:** in every current engine. Use it, with the fallback line when the page must work on older phones.
- **Limited:** missing from at least one engine. Enhancement only: the page must be complete without it.

## The rule for every row

Write the working baseline first, then the enhancement inside `@supports` (or after the baseline declaration, so an engine that does not know it keeps the first value). Never put content, navigation or a form behind a *limited* feature.

```css
.tip { position: absolute; inset-block-start: 100%; inset-inline-start: 0; }   /* baseline */
@supports (anchor-name: --a) {
  .trigger { anchor-name: --tip; }
  .tip { position-anchor: --tip; inset: auto; top: anchor(bottom); inset-inline-start: anchor(start); position-try-fallbacks: flip-block; }
}
```

## Layers, menus and dialogs

| Reach for | Instead of | Status | Fallback |
|---|---|---|---|
| `<dialog>` + `showModal()` | a div modal with a hand-made focus trap | widely | none needed |
| `popover` attribute | a positioned div with click-outside code | newly | none needed |
| `commandfor` / `command` on a button | an `onclick` that opens the dialog or popover | newly | `popovertarget`, or one small handler |
| anchor positioning (`anchor-name`, `position-anchor`, `position-try-fallbacks`) | a positioning library | newly in its core; the newest values are limited | absolute inside a relative wrapper |
| `popover="hint"`, `interestfor` (hover cards) | tooltip libraries | limited | an `auto` popover opened on focus and hover |
| `appearance: base-select` | a custom select rebuilt from divs | limited | the native select renders, which is fine |
| `reading-flow` | none: keep the DOM order equal to the visual order | limited | DOM order is the fallback, so write it correctly first |

## Entering, leaving and resizing

| Reach for | Instead of | Status | Fallback |
|---|---|---|---|
| `@starting-style` + `transition-behavior: allow-discrete` | mounting with opacity 0 and a timeout | newly | the element appears without the transition |
| `interpolate-size: allow-keywords` / `calc-size()` | measuring height in JavaScript | limited (Chromium) | `grid-template-rows: 0fr → 1fr` with a `min-height: 0` child |
| `<details>` + `::details-content` | an accordion component | newly | it opens without the transition |
| View Transitions, same document (`document.startViewTransition`, `view-transition-name`, `view-transition-class`) | a layout-animation library for state changes | newly | feature-test, then swap instantly |
| `@view-transition { navigation: auto }` | a client-side router added only for page transitions | limited | ignored safely: plain navigation |
| scroll-driven animations (`animation-timeline: view()` / `scroll()`) | scroll listeners, a scroll library | newly (since October 2026) | the static end state under `@supports not (animation-timeline: view())` |
| scroll-state container queries (stuck, snapped) | scroll listeners for a "stuck" header style | limited (Chromium) | `IntersectionObserver` with a sentinel, or no change |
| `linear()` easing | a spring library for one press or sheet | widely | declare a `cubic-bezier()` first |
| `sibling-index()` / `sibling-count()` | `--i` set inline on every child for stagger | newly | the inline `--i` |
| `@property` | JavaScript tweening of a custom property (a gradient angle, a number) | newly | the value changes without the tween |

```css
.sheet { opacity: 1; translate: 0 0; transition: opacity .28s, translate .28s, display .28s allow-discrete, overlay .28s allow-discrete; }
.sheet:not(:popover-open) { opacity: 0; translate: 0 12px; }
@starting-style { .sheet:popover-open { opacity: 0; translate: 0 12px; } }
```

Every row here still sits inside the reduced-motion rules of `motion/principles.md`.

## Colour

| Reach for | Instead of | Status | Fallback |
|---|---|---|---|
| `oklch()`, `color-mix(in oklch, …)` | hex ramps picked by eye | widely | none needed |
| `light-dark()` with `color-scheme` | duplicating every token under a class | widely | none needed |
| relative colour (`oklch(from var(--accent) calc(l - .08) c h)`) | a hover and a pressed shade stored by hand | newly | the precomputed token declared first |
| `contrast-color()` | guessing black or white text on a dynamic colour | newly | a static colour declared first. It promises a readable pick, not a brand one: still measure. |
| `color(display-p3 …)` | none: sRGB is the default | widely | sRGB first, the P3 value inside `@media (color-gamut: p3)` |
| `prefers-contrast`, `forced-colors` | ignoring high-contrast users | widely | none: these are the fallback for others |
| `prefers-reduced-transparency` | shipping glass to everyone | limited (Chromium) | make the solid surface the default and the glass the enhancement |

## Type and text

| Reach for | Instead of | Status | Fallback |
|---|---|---|---|
| `text-wrap: balance` on headings | `<br>` placed by hand | widely | none needed |
| `text-wrap: pretty` on paragraphs | non-breaking spaces against orphans | limited (no Firefox) | harmless when ignored |
| `text-box-trim` + `text-box-edge` | magic negative margins to align a cap height with an icon or an image edge | in all engines but recent | the untrimmed box; add the padding fix under `@supports not (text-box-trim: trim-both)` |
| `field-sizing: content` | a script that grows the textarea | newly | `rows` and a `min-height` |
| `font-size-adjust` | a fallback face that reflows the page when the web font lands | newly | `size-adjust` in the fallback `@font-face` |
| `:dir(rtl)` | `[dir="rtl"]` selectors that miss inherited direction | newly | `[dir="rtl"]` |

Arabic and Persian change several of these: read `scripts-lang/arabic.md` before trimming, balancing or justifying.

## Structure and scoping

| Reach for | Instead of | Status | Fallback |
|---|---|---|---|
| container queries (`@container`, `cqi`) | viewport breakpoints inside a reusable component | widely | none needed |
| `:has()` | a state class toggled by script | widely | none needed |
| CSS nesting, `@layer` | specificity fights, `!important` | widely | none needed |
| `@scope` | long prefixed class names | newly | class prefixing |
| subgrid | repeating a column template in every card | widely | none needed |
| `corner-shape: squircle` | an SVG mask for a smoother corner | limited | the `border-radius` stays |
| `::scroll-button`, `::scroll-marker` | a carousel library | limited (Chromium) | a scroll-snap list with real `<button>`s |
| `display: grid-lanes` (masonry) | a masonry script | limited | CSS columns, or a plain grid |
| `if()`, `@function` | none yet | limited | custom properties and `@media` |

## Loading

| Reach for | Instead of | Status | Fallback |
|---|---|---|---|
| `fetchpriority="high"` on the LCP image | preloading everything | newly | ignored safely |
| Speculation Rules (`<script type="speculationrules">`) | a prefetch-on-hover script | limited | ignored safely |
| `content-visibility: auto` + `contain-intrinsic-size` | virtualising a long static page | newly | renders everything |

## Accessibility facts to hold

- **WCAG 2.2 AA is the gate.** Target size minimum is 24×24 CSS px (2.5.8); tasmeem builds to 44×44 because thumbs are not pointers. Focus must not be fully hidden by sticky layers (2.4.11): give scroll containers `scroll-padding` equal to the sticky header.
- **APCA is advisory.** It is not part of WCAG 2.x, and WCAG 3 is still a draft. Report WCAG 2 ratios as the verdict; an APCA reading may explain why a passing pair still looks weak.
- **INP is a Core Web Vital.** Good is 200 ms or less. The usual causes in generated code are a hydrated page where an island would do, and handlers that read layout.

## What this replaces in a dependency list

Before adding a package for motion, positioning, modals, tooltips, accordions, carousels, auto-growing fields or theme switching, check the tables above. A dependency is justified when the *limited* fallback is not good enough for this product, and the reason is written down. An effect library imported for one entrance is a tell (CM-10, MO-18).
