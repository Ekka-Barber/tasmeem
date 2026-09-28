<div align="center">

# tasmeem · تصميم

**Design that reads as made, not generated. Arabic first, then Persian and English.**

An agent skill for Claude Code, Codex, Cursor and any agent that reads `SKILL.md`. It builds, audits and polishes interfaces, measures its own work before handing it over, and authors real image assets instead of faking them with gradients.

[![License: MIT](https://img.shields.io/badge/license-MIT-2f5d50)](LICENSE)
![Node 18+](https://img.shields.io/badge/node-%E2%89%A518-2f5d50)
![Dependencies: 0](https://img.shields.io/badge/dependencies-0-2f5d50)
![Tells: 169](https://img.shields.io/badge/tells-169-b0643a)
![Languages](https://img.shields.io/badge/languages-Arabic%20%C2%B7%20Persian%20%C2%B7%20English-b0643a)

[العربية](README.ar.md) · [Install](#install) · [Use it](#use-it) · [The scanner](#the-scanner) · [Before / after](#before-and-after) · [Languages](#arabic-persian-english) · [Real assets](#real-assets-with-higgsfield) · [Credits](CREDITS.md)

</div>

---

## Why

Ask an AI model for a landing page and you get the same page every time:
- a purple-to-blue gradient;
- a centred headline with one word in a different colour;
- a pill badge, then three identical icon cards;
- a fade-up on everything.

Ask for "something tasteful" and you get the second default: cream, a serif and terracotta.

Ask for it in Arabic and it gets worse:
- letter-spacing tears the joined letters apart;
- the browser fakes italics on a script that has none;
- line heights clip the marks;
- arrows point the wrong way;
- the fonts fall back to whatever the system has.

**tasmeem fixes this at the source.** It decides a direction before it draws. It sets type for the script actually on the page. It fills image slots with authored assets. And it runs a measurable gate before anything ships.

## What it does

| | |
|---|---|
| **Direction before pixels** | A design read, a scene sentence, the subject's own world, three dials, a colour strategy, one signature element, then a two-level check for reflex choices before any code is written. |
| **169 tells, one rulebook** | The machine-made patterns that twelve independent design skills and guides agree on, merged, deduplicated and rewritten, with conflicts resolved once. Each tell has a severity, a fix and the conditions under which it is allowed. |
| **Evidence, not vibes** | A zero-dependency scanner reports 96 of those tells with file and line. An optional real-browser check reads computed styles: contrast on the actual background, the fonts actually drawn, overflow, held animations. |
| **Arabic first** | Arabic type, direction, digits, plurals, calendars, bidi, forms, voice and copy tells; Persian (ی and ک, ZWNJ, Persian digits, the Solar Hijri calendar); English, and pairing it with Arabic-script faces. |
| **Real assets** | With Higgsfield, tasmeem builds the way a studio does: mockup → region map → generated plates → code that matches the mockup. It paints the material and codes the meaning. There is a cost gate on every generation, and a provenance file for every image. |
| **Motion as a system** | Tokens, strong ease-out curves, interruptible transitions, scroll-driven animation, View Transitions, reveals that never hide content, reduced motion as a design. Produced video through Higgsfield or Remotion. |
| **Brand wins over taste** | A brand's documented choices override the taste rules and are reported as exceptions. Nothing overrides contrast, focus, `lang` and `dir`, honesty, or script correctness. |

## Before and after

The same brief was run twice in fresh headless Claude Code sessions: a single-page site for a small Riyadh roastery, with every fact supplied in the brief. One run had no skills at all; the other had tasmeem. Nothing was touched up afterwards.

<table>
<tr><th>Without skills</th><th>With tasmeem</th></tr>
<tr>
<td><img src="docs/before-after/ar-roastery-before-desktop.png" alt="Without skills: cream ground, a red accented headline word, a pill badge and a hand-drawn SVG coffee bag"></td>
<td><img src="docs/before-after/ar-roastery-after-desktop.png" alt="With tasmeem: green-coffee ground, a generated photograph of a roaster's cooling tray, a Kufi display name and an asymmetric split"></td>
</tr>
</table>

| | Without skills | With tasmeem |
|---|---|---|
| Direction | cream ground, one headline phrase in red, a pill badge, three identical cards | green-coffee ground with roast-brown ink (the two states of the bean), an asymmetric split, prices set as a menu |
| Images | a hand-drawn SVG bag | two comp mockups, then a generated photograph of a cooling tray and a transparent green-bean cutout, each with its provenance file |
| Facts | as supplied | as supplied; the missing ones (a price per kilo) listed, not invented |
| Measured by tasmeem (P0 · P1 · P2) | 2 · 9 · 1 | 0 · 8 · 0 |
| Time, credits | 7 min | 18 min, 6.5 Higgsfield credits |

The eight P1 findings in the tasmeem run are one real defect. It set the display face Kufam at label size, where the dot of a final ن disappears, so «العنوان» reads «العنوار». The eval exposed a gap in the rulebook, and TY-24 now catches it.

The runs are reproducible with [`evals/run.mjs`](evals/run.mjs), and the results table is in [evals/results.md](evals/results.md).

<p align="center"><img src="docs/before-after/ar-roastery-after-mobile.png" width="300" alt="With tasmeem, on a phone"></p>


## Install

**Claude Code (plugin):**
```text
/plugin marketplace add Ekka-Barber/tasmeem
/plugin install tasmeem@tasmeem
```

**Any agent (skills CLI):**
```bash
npx skills add Ekka-Barber/tasmeem
```

**Manual:** copy `skills/tasmeem` into `~/.claude/skills/` (or your agent's skills folder).

**Optional extras:**
```bash
npm i -D playwright && npx playwright install chromium   # real-browser checks
npm i -g @higgsfield/cli && higgsfield auth login        # image assets (uses your Higgsfield credits)
```

## Use it

Talk to your agent normally. tasmeem routes the request.

```text
Design the landing page for a Riyadh specialty roastery, in Arabic.
tasmeem audit src/app
Polish the checkout page.
Make the menu open and close with better motion.
Create a brand identity for a Jeddah bookbinding studio.
Generate the hero image and a paper texture for the home page.
صمّم صفحة حجز لصالون حلاقة في الرياض
راجع واجهة التطبيق وقل لي ما الذي يبدو مصنوعاً بالذكاء الاصطناعي
```

| Mode | What happens |
|---|---|
| **build** | direction → optional comp and assets → code → gate |
| **audit** | measure (scan, built, render) → judge → one numbered report; nothing is edited until you pick |
| **polish** | fix the measured P0 and P1 findings plus the details, inside your existing system |
| **redesign** | keep the content, routes and brand; change the structure and silhouette |
| **study** | extract the DNA of a design you admire (structure, type, colour, rhythm), never its pixels |
| **brand** | positioning, palette, type per script, marks, materials, imagery, motion, voice → `DESIGN.md` |
| **assets** | comp, region map, plates through Higgsfield or /rasm, provenance |
| **motion** | measure, then design the tokens and one orchestrated moment per view |
| **copy** | interface words in every language present, without touching the owner's own text |
| **document** | write `DESIGN.md` from existing code |

## The scanner

`skills/tasmeem/scripts/tasmeem.mjs` runs on Node 18+ with no dependencies:

```bash
node skills/tasmeem/scripts/tasmeem.mjs scan src/                 # source: CSS, JSX/TSX, HTML, Vue, Svelte, Astro
node skills/tasmeem/scripts/tasmeem.mjs built out/                # built HTML with local stylesheets inlined
node skills/tasmeem/scripts/tasmeem.mjs render http://localhost:3000 --motion   # real browser (Playwright)
node skills/tasmeem/scripts/tasmeem.mjs report .tasmeem/*.json --design DESIGN.md --out audit.md
```

Real output on the Arabic fixture in `tests/fixtures/`:

```text
tests/fixtures/arabic-slop.html
  P0  SC-01  L11    letter-spacing 0.05em set on Arabic  · :lang(ar) p
  P0  SC-03  L11    Arabic line-height 1.3 (floor 1.6 for body)  · :lang(ar) p
  P1  CP-03  L16    "ليست مجرد"  · قهوتنا ليست مجرد مشروب، بل أسلوب حياة
  P1  CP-10  L18    right-pointing arrow in Arabic text (forward is ←)
  P1  CP-15  L18    "قم بالنقر"  · … قم بالنقر هنا
  P1  SC-05  L2     RTL language without dir="rtl" on <html>
  P1  SC-07  L19    Western and Arabic-Indic digits in one string
  P2  SC-16  L20    tatweel used for stretching  · عـــرض خـــاص
```

And in a real browser, the same page (`render`):

```text
  P0  SC-01  @390   letter-spacing on arabic text ×6
  P1  SC-02  @390   italic on arabic text
  P1  SC-04  @390   arabic text drawn by fallback "Segoe UI" (declared: tajawal)
```

A brand's own choices are recorded in `DESIGN.md` under **Brand exceptions** (`CO-03: the sand ground is the brand colour`), or inline with `/* tasmeem-allow CO-03 reason */`. The report lists them separately and never lets them excuse an accessibility or script failure.

| Category | Tells | Examples |
|---|---|---|
| Colour `CO` | 16 | purple-to-blue gradient, unchosen indigo, cream by default, gradient text, glow, halos |
| Type `TY` | 24 | Inter for everything, the tasteful-font cluster, italic display, the accented headline word, eyebrows, display faces at text size |
| Layout `LA` | 23 | the centred hero, three icon cards, the stat strip, 01/02/03 scaffolding, overflow |
| Components `CM` | 20 | kit defaults, glass by reflex, side stripes, icon chips, redrawn browser chrome, missing states |
| Motion `MO` | 18 | one fade-up for everything, bounce, `transition: all`, animated layout, hidden-until-animated content |
| Copy `CP` | 16 | buzzwords in English, Arabic and Persian, "not X but Y", invented metrics, placeholders, translation-shaped Arabic |
| Imagery `IG` | 12 | stock people, the generated-illustration look, placeholder images, garbled text in generated images |
| System `SY` | 7 | design-system drift, default-attractor sameness, mixed icon families |
| Quality `QA` | 16 | contrast, focus, headings, `lang`, targets, zoom, forms, errors |
| Scripts `SC` | 17 | tracked Arabic, fake italics, script line-height floors, fallback glyphs, physical CSS in RTL, bidi |

## Arabic, Persian, English

| Language | What tasmeem knows |
|---|---|
| **Arabic** | Naskh, Kufi, Ruqaa and display roles; families and their Latin partners; size balancing; line heights; never tracking, italics or case; display faces kept large; punctuation «، ؛ ؟»; the digits policy; six plural forms; Hijri and Gregorian; the Saudi national address; bidi islands; the "Arabic costume" reflex |
| **Persian** | ی and ک (never ي and ك), ZWNJ in compounds, Extended Arabic-Indic digits and separators, the Solar Hijri calendar, Nastaliq kept to display and poetry, Persian machine-copy tells |
| **English** | coverage, case and hyphenation with `lang`, tracking limits, measure, curly punctuation, sentence case, and matching the Latin partner to an Arabic or Persian face |

## Real assets with Higgsfield

The fastest way to look generated is to leave image slots to gradients and glass. tasmeem's asset mode works like this:
- **Comp:** it generates a full-page mockup, which carries the composition, never the copy.
- **Region map:** it marks each region as painted or coded.
- **Plates:** it generates each painted region as its own asset: photographs, textures, transparent cutouts, and vector icon sets in your palette.
- **Build:** it builds code that matches the mockup. Every word, control and state stays live HTML.

```bash
npm i -g @higgsfield/cli      # the official CLI; no API key
higgsfield auth login         # browser sign-in; uses your plan's credits
node skills/tasmeem/scripts/tasmeem.mjs higgs doctor
node skills/tasmeem/scripts/tasmeem.mjs higgs cost --model gpt_image_2_5 --prompt-file hero.txt --aspect 16:9 --resolution 2k --quality high
node skills/tasmeem/scripts/tasmeem.mjs higgs gen  --model gpt_image_2_5 --prompt-file hero.txt --aspect 16:9 --resolution 2k \
     --quality high --ref .tasmeem/crops/hero.png --out public/plates/hero.png --budget 10
```

- **The cost gate:** `gen` refuses to spend without `--budget` or `--yes`, and refuses when the estimate exceeds the budget.
- **Provenance:** every result gets a `.json` sidecar with the model, parameters, prompt, references and job id.
- **Text in images:** it is never trusted. Generated Arabic lettering breaks, so text is set in code.
- **Without Higgsfield:** tasmeem runs code-led and writes art-direction briefs for your own media.
- **Companions:** [/rasm](https://github.com/Ekka-Barber/higgsfield-prompt-master) for Arabic-first prompts, and Higgsfield's [official skills](https://github.com/higgsfield-ai/skills) for generation.

## How it is built

```
skills/tasmeem/
├─ SKILL.md                 router: setup, non-negotiables, route table, the tells to keep in mind (138 lines)
├─ references/
│  ├─ core/                 direction · honesty · the delivery gate
│  ├─ tells/                169 tells in 10 categories, each with severity, fix, allowed-when, sources
│  ├─ scripts-lang/         Arabic, Persian, English, bidi, numerals and dates, punctuation
│  ├─ craft/                typography · colour and tones · layout · components and 8 states · forms · a11y and performance
│  ├─ motion/               principles · techniques · produced video
│  ├─ brand/                identity
│  ├─ assets/               pipeline · Higgsfield · /rasm · prompts · provenance
│  └─ modes/                build · audit · the other modes
├─ scripts/tasmeem.mjs      scan · built · render · contrast · tokens · palette · report · higgs · context
└─ templates/               DESIGN.md template
```

The agent reads `SKILL.md` (a few hundred tokens), then only the references the task needs.

## Tests

```bash
npm test      # node:test: 15 tests over fixtures (AI slop, Arabic slop, Persian copy, Tailwind and framer, a clean Arabic page)
```

## Credits

tasmeem learned from [impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark), [Gesso anti-slop](https://github.com/Gesso-Build/skills), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design), [antislop](https://github.com/miqdadbadjuber/anti-slop), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Anthropic's frontend-design](https://github.com/anthropics/skills), [Emil Kowalski](https://github.com/emilkowalski/skills), [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better), [Vercel's Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines), [ui-skills](https://github.com/ibelick/ui-skills), [designing-arabic-frontends](https://github.com/ahmed-badawood/designing-arabic-frontends) and more. Every rule is restated in tasmeem's own words; see [CREDITS.md](CREDITS.md) and [NOTICE](NOTICE).

MIT © 2026 Majed (Ekka Barber)
