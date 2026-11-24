# Changelog

## 0.2.0 · 2026-11-24

A study of what impeccable, antislop, designing-arabic-frontends and about twenty newer design repositories shipped since September, plus the web platform as of November 2026. The catalog grows from 169 to 198 tells, and the scanner checks 126 of them (up from 100).

### New
- **critique mode:** ten heuristics scored 0–4, a cognitive-load checklist, five personas, and a disposition (ship, fix, rebuild, recapture). Polish reads the latest critique as its backlog.
- **harden, adapt, bolder, quieter, distill** modes.
- **The gate in three tiers** (Floor, Reflex, Finish), a click-through of every control, and a fresh-eyes review by an agent that did not see the build.
- **`kept <before> <after>`:** redesign safety. Links, form fields, headings and images the new version dropped.
- **`scan --hook`:** a Claude Code PostToolUse hook that returns P0 findings to the agent after each edit.
- **`scan --github`:** findings as pull-request annotations.
- **`craft/platform.md`:** native features of late 2026 with their support status and fallbacks.
- **Surface types** in the direction step (persuade, operate, read, experience), and an anti-convergence step that names the rut before leaving it.
- **Templates:** `DESIGN.md` now uses the open [DESIGN.md](https://github.com/google-labs-code/design.md) token front matter, with sections for Arabic and Persian; a new `PRODUCT.md` template with the five intake questions.
- **29 new tells**, among them dead controls (CM-21), the hard offset shadow (CM-22), the default dashboard shell (CM-23), the template stack (SY-10), the opacity ladder (CO-17), inputs under 16 px (QA-19), unsafe bottom bars (QA-18), mouse-only gestures (QA-17), reduced motion as a kill switch (MO-19), inflated significance and chatbot residue in three languages (CP-17, CP-18), ligatures switched off (SC-20), direction-blind JavaScript and Radix without a `DirectionProvider` (SC-22), and digits the code cannot read (SC-23).
- Arabic guidance on the riyal sign (U+20C1) and how to render it, three-decimal currencies, `Intl.ListFormat`, `RelativeTimeFormat`, `Segmenter`, `Collator`, `formatRange`, per-script `size-adjust`, variable Arabic families and their axes, Tailwind v4 and shadcn RTL.

### Fixed
- The week does not start on Saturday in Saudi Arabia: CLDR gives Sunday for `ar-SA`, Saturday for Egypt and Kuwait, Monday for the UAE.
- Arabic plural categories follow n mod 100 (103 is `few`, 111 is `many`, 101 is `other`).
- The Arabic `unicode-range` now includes U+0870–089F and ZWNJ, and no longer includes the byte-order mark.
- SC-03 fired below 1.5 while the documented floor is 1.6.
- Tailwind v4 `space-x-*` is logical; only v3 projects get the physical-property warning.
- Reduced motion no longer zeroes every duration: travel stops, fades stay.
- `scan` exits 2 when it found nothing readable, instead of reporting a clean zero.
- CP-05 (em dashes) is advisory below eight dashes in a file.

## 0.1.0 · 2026-09-28

First release: 169 tells in ten categories, the zero-dependency scanner, the render check, the Higgsfield bridge with its cost gate, and the Arabic, Persian and English guides.
