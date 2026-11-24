---
version: alpha
name: ‹product name›
description: ‹one line: what this product is and for whom›
colors:
  ground: "oklch(0.97 0.008 32)"
  ink: "oklch(0.22 0.02 32)"
  muted: "oklch(0.48 0.02 32)"
  line: "oklch(0.88 0.01 32)"
  accent: "oklch(0.62 0.17 32)"
  on-accent: "oklch(0.98 0.01 32)"
typography:
  display-ar:
    fontFamily: ‹Arabic display face›
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0em
  body-ar:
    fontFamily: ‹Arabic body face›
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0em
  display-en:
    fontFamily: ‹Latin display face›
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
  body-en:
    fontFamily: ‹Latin body face›
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
motion:
  press:
    duration: 140ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
  menu:
    duration: 220ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sm}"
    padding: 12px
---

<!--
The front matter follows the open DESIGN.md format (github.com/google-labs-code/design.md), so other tools can read
the tokens: validate it with `npx @google/design.md lint DESIGN.md`. The sections below keep that format's order.
tasmeem reads the whole file, including "Brand exceptions" under Do's and Don'ts.
Keep it short. Write it at the end of a build, from what was actually built.
-->

## Overview

- **Design read:** Reading this as ‹surface› (‹persuade | operate | read | experience›) for ‹audience›, in ‹language/script›, with a ‹register› voice, leaning toward ‹direction›.
- **Scene:** ‹who, where, light, mood›
- **Subject world:** ‹eight or more concrete nouns›
- **Dials:** variance ‹n› · motion ‹n› · density ‹n›
- **Signature:** ‹the one element this product is remembered by›
- **Not this:** ‹anti-references and the lanes this deliberately avoids›
- **Directions already used** for this owner (so the next project does not repeat them): ‹list›

## Colors

Strategy: ‹restrained | committed | full palette | drenched›. One sentence per token on its role and why.

| Token | Role | Measured pairs |
|---|---|---|
| `ground` | page ground | ink on ground ‹ratio› |
| `muted` | secondary text | ‹ratio› on ground |
| `accent` | the one accent | on-accent on accent ‹ratio› |

Tones (coloured surfaces): ‹name → bg, fg, muted, focus, line›

## Typography

One face per role and script, and why it fits the subject. Loading: ‹subsets, preloads, fallback metrics›.

### Arabic and Persian

- Faces and their Latin partners, with the measured size balance (`size-adjust` ‹n›%).
- Line height floors: body ≥ 1.6, display ≥ 1.25. Tracking 0, no italics, no case, ligatures on.
- Digit policy: ‹Western | Arabic-Indic | Persian›, used for prices, dates, examples and validation alike.
- Calendar: ‹gregory | islamic-umalqura | persian›; week start from `Intl.Locale.getWeekInfo()`.
- Punctuation «، ؛ ؟»; quotes «»; currency through `Intl` (riyal sign: ‹yes, font X | no›).

### English

Case, tracking limits, measure, figures.

## Layout

Spacing scale, gutter, measure, breakpoints (and the middle state), z-index scale.

## Elevation & Depth

One elevation system: borders for structure, shadows only for things that float.

## Shapes

Radius scale; concentric rule (inner = outer − gap).

## Motion & Micro-interaction

Tokens, the signature motion, and the reduced-motion behaviour (travel removed, fades kept).

## Voice & Content Strategy

Register, address form, verbs for actions (one convention), words used and never used; plural and number policy.

## Components

For each: purpose, variants, the eight states, tokens used.

## Do's and Don'ts

### Brand exceptions

Decisions that deliberately match a tell in tasmeem's catalog. tasmeem reports them as exceptions, not findings. They never cover accessibility, honesty, dead controls or script correctness.

- CO-03: ‹why the ground is this colour›
