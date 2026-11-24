---
name: tasmeem
description: "Arabic-first design skill that builds, audits, critiques and polishes interfaces that do not look AI-generated, in Arabic, Persian and English. Use it whenever the work touches how an interface looks, reads or behaves: designing or redesigning a page, site, app screen, dashboard or component; reviewing UI for AI slop, accessibility, UX or polish; hardening states, errors and edge cases; adapting a layout for phones; setting type, colour, layout or motion; building RTL Arabic or Persian interfaces, or bilingual pages with English; creating a brand identity, palette or DESIGN.md; or generating real image assets (photos, textures, cutouts, icons) with Higgsfield or /rasm instead of gradients and placeholders. Use it even when the user only says 'make it look better', 'check this page' or «صمم» / «راجع الواجهة». Verbs: build, audit, critique, polish, bolder, quieter, distill, harden, adapt, redesign, study, brand, assets, motion, copy, document."
license: MIT
metadata:
  version: "0.2.0"
  author: "Ekka Barber"
  homepage: "https://github.com/Ekka-Barber/tasmeem"
---

# tasmeem «تصميم»

Design that reads as made, not generated: in Arabic first, then Persian and English. tasmeem decides a direction before it draws, sets type for the script actually on the page, uses the platform before a library, authors real image assets instead of faking them with chrome, and proves the result with measurements and a fresh pair of eyes before delivery.

## Setup (once per session)

```sh
node <this-skill-dir>/scripts/tasmeem.mjs context --target <project-dir>
```

It prints the project's `PRODUCT.md` and `DESIGN.md` (if they exist), the scripts and languages found in the source, the available tools (Playwright for render checks, the Higgsfield CLI and its credits, /rasm), and which checks can run. Do not re-run it in the same session.

## Non-negotiables

1. **The owner's words are sacred.** Content they supplied is typeset, never rewritten. Copy rules apply to text you write.
2. **Honesty.** No invented metrics, testimonials, logos, prices or capabilities, and no control that does nothing. A missing fact becomes a labelled gap and goes on a list for the user (`references/core/honesty.md`).
3. **The language decides the type.** Detect the languages on the page (Arabic, Persian, English). Load its guide from `references/scripts-lang/`. Never letter-space, italicise, case-transform or un-ligature Arabic, and never apply an English rule to Arabic or Persian (`SC-01`…`SC-24`).
4. **Paint the material, code the meaning.** Images, textures and objects are authored assets (generated with provenance, or the owner's own). Every word, control and state is live code. Never ship gradients, glass, drawn SVG or icon tiles where an image belongs, and never trust text rendered inside a generated image.
5. **The brand wins over taste, never over access.** Documented brand choices override the taste tells, and are reported as brand exceptions. Nothing overrides contrast, focus, `lang`/`dir`, honesty or script correctness.
6. **Evidence before delivery.** Every delivery ends with the gate (`references/core/gate.md`): measure, look, click through, get fresh eyes, fix once, measure once more, report.

## Route the request

| The user asks to… | Mode | Read |
|---|---|---|
| design, build or create a page, site, screen, feature or component | build | `references/modes/build.md` |
| audit, check, "does this look AI", find the defects | audit | `references/modes/audit.md` |
| critique, "what do you think", "is this good", review the UX | critique | `references/modes/critique.md` |
| polish, finish, tighten, "make it feel better" | polish | `references/modes/other-modes.md` |
| "make it bolder", "too loud", "too busy", simplify | bolder · quieter · distill | `references/modes/other-modes.md` |
| harden, edge cases, empty and error states, "make it production-ready" | harden | `references/modes/other-modes.md` |
| make it work on phones, tablets, touch, print | adapt | `references/modes/other-modes.md` |
| redesign, restyle, "make it look different" | redesign | `references/modes/other-modes.md` |
| study, "like this site", a URL or screenshot to learn from | study | `references/modes/other-modes.md` |
| create a brand, identity, palette, logo direction | brand | `references/brand/identity.md` |
| generate images, textures, icons, a mockup, a hero visual | assets | `references/assets/pipeline.md` |
| animate, transitions, motion, micro-interactions | motion | `references/modes/other-modes.md` + `references/motion/` |
| write or fix interface copy, errors, labels, microcopy | copy | `references/modes/other-modes.md` + `references/tells/copy.md` |
| write a DESIGN.md or PRODUCT.md | document | `references/modes/other-modes.md` + `templates/` |

An explicit verb ("tasmeem audit src/app") wins. When the wording maps to two modes, ask one question. Otherwise, route and state the route in one line.

## Load only what the work touches

- **Before any new surface:** `references/core/direction.md` (it names the surface type: persuade, operate, read or experience).
- **For each language present:** `references/scripts-lang/arabic.md` (always, whenever Arabic or Persian appears), `persian.md`, `english.md`. Mixed directions: `bidi.md`. Numbers, dates, plurals, currency: `numerals-dates.md`.
- **Type, colour, layout, components, forms, the floor:** `references/craft/*.md`. **Before new CSS or a new dependency:** `references/craft/platform.md` (the native feature, its support, its fallback).
- **Motion:** `references/motion/principles.md`, then `techniques.md`; `video.md` for produced motion (Higgsfield, Remotion).
- **Assets:** `references/assets/pipeline.md`, `higgsfield.md` (setup and the cost gate), `prompts.md`, `rasm.md`, `provenance.md`.
- **Judging:** `references/tells/README.md`, then the category files for what you are reviewing.

## The tells to keep in mind at all times

Machine-made interfaces repeat the same moves. Avoid them unless the brand documents them. Full catalog of 198 tells, with fixes and exceptions: `references/tells/`.

- **Colour:** the purple-to-blue gradient (CO-01); the unchosen indigo (CO-02); cream by default (CO-03); near-black with a neon accent (CO-04); gradient text (CO-05); glows, halos and blobs (CO-06, CO-07); grey text on colour (CO-10); the opacity ladder (CO-17).
- **Type:** Inter or the system stack for everything (TY-01); the tasteful-font cluster (TY-02); italic serif display (TY-03); one accented word in the headline (TY-04); an eyebrow above every heading (TY-05); a pill badge above the H1 (TY-06); display faces at text size (TY-24).
- **Layout:** the centred hero template (LA-01); three identical icon cards (LA-02); the stat strip (LA-03); 01/02/03 scaffolding (LA-04); the stock section order (LA-05); cards in cards (LA-10); horizontal overflow (LA-14); a layout with only two states (LA-24).
- **Components:** kit defaults untouched (CM-01); rounded and shadowed everything (CM-02); glass by reflex (CM-03); the side-stripe card (CM-04); the icon chip (CM-05); missing states (CM-07); redrawn browser or phone chrome (CM-13); **dead controls (CM-21)**; the hard offset shadow (CM-22); the default dashboard shell (CM-23).
- **Motion:** one fade-up for everything (MO-01); bounce easing (MO-02); `transition: all` (MO-03); animated layout (MO-04); no reduced-motion path (MO-05); content hidden until an animation runs (MO-06); reduced motion as a kill switch (MO-19).
- **Copy:** vague aspiration (CP-01); buzzwords in English, Arabic or Persian (CP-02); "not X, but Y" / «ليس مجرد… بل» (CP-03); dash sprinkle (CP-05); invented facts (CP-07); placeholders (CP-08); translation-shaped Arabic (CP-15); inflated significance (CP-17); chatbot residue (CP-18).
- **Scripts:** tracked Arabic (SC-01); fake italics (SC-02); line height below the script's floor (SC-03); fallback glyphs (SC-04); physical CSS in RTL (SC-05); unmirrored arrows (SC-06); mixed digits (SC-07); bidi scramble (SC-10); ligatures switched off (SC-20); direction-blind JavaScript (SC-22); digits the code cannot read (SC-23).
- **Sameness:** a page that could belong to any product (SY-03); a famous product's skin (SY-09); the template stack, six or more tells in one file (SY-10). Shrink it to a grey silhouette: if it is the template, change the structure, not the colours.

## Tools

`scripts/tasmeem.mjs` runs on Node 18+ with zero dependencies (Playwright is optional, for `render`):

| Command | What it does |
|---|---|
| `context --target <dir>` | project context, the scripts present, the tools available |
| `scan <paths> [--github]` | source tells (CSS, JSX/TSX, HTML, Vue, Svelte, Astro), with catalog IDs; `--github` prints PR annotations |
| `scan --hook` | Claude Code PostToolUse hook: scans the edited file, returns P0s to the agent (`core/gate.md`) |
| `built <dir>` | built HTML with its local stylesheets inlined |
| `render <url> [--widths …] [--motion]` | computed-style checks in a real browser: script rules, contrast, overflow, fonts used, held reveals, console errors, screenshots |
| `kept <before> <after>` | redesign safety: links, form fields, headings and images the new version dropped |
| `contrast <fg> <bg>` | WCAG ratio and verdicts |
| `tokens <css…>` | custom properties, raw values, fonts; drift against the tokens |
| `palette <image>` | dominant colours of a PNG, in OKLCH |
| `report <json…> [--design DESIGN.md]` | merge results into one numbered report, applying brand exceptions |
| `higgs doctor · cost · gen` | the Higgsfield bridge with the cost gate and provenance sidecars |

Exit codes: 0 clean, 1 Floor findings, 2 a usage error **or nothing readable to check** (a zero that was not read is never reported as a pass).

## Working alongside other skills

If other design skills are installed (impeccable, Hallmark, taste, frontend-design…), do not run two design skills over the same task: their rules conflict, and tasmeem's catalog already merges them with the conflicts resolved. For produced video, Remotion's skills are welcome. For image prompts, /rasm and the official Higgsfield skills are welcome.
