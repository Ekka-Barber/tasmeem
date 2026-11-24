# Credits

tasmeem stands on the work of many people who wrote down what good interfaces are made of. Every rule in tasmeem is written in its own words. Where an idea came from a source, the tell's **Sources** line names it. The sources, and what tasmeem learned from each:

| Key | Source | Licence | What tasmeem learned |
|---|---|---|---|
| IM | [impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus | Apache-2.0 | the detector-first approach; the scene sentence; colour strategies; the two orders of reflex; the comp-led build with generated plates (the Neo Mirai case); design-system drift checks |
| HM | [Hallmark](https://github.com/Nutlope/hallmark) by Together AI | MIT | structural variety, the silhouette of the template, honest copy, redrawn chrome, token discipline, the mobile non-negotiables |
| GS | [Gesso anti-slop](https://github.com/Gesso-Build/skills) | MIT | deterministic detectors with thresholds; generated layout bugs; fake data visuals; the reveal specificity trap |
| AD | [avoid-ai-design](https://github.com/funboy322/avoid-ai-design) | MIT | first- and second-order defaults; the zero-dependency scanner idea; the silhouette test |
| AS | [antislop](https://github.com/miqdadbadjuber/anti-slop) | MIT | the filter-not-beautifier principle; the delivery gate; no fabricated claims; every theme must work |
| TS | [taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | the design read; the three dials; the premium-palette monoculture |
| FD | [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) by Anthropic | Apache-2.0 | grounding the design in the subject; one signature element; the three AI-look clusters; writing as design material |
| EK | [Emil Kowalski's skills](https://github.com/emilkowalski/skills) | MIT | the animation decision framework, timing budgets, strong ease-out curves, origin-aware and interruptible motion |
| MF | [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) by Jakub Krehel | MIT | concentric radii, optical alignment, image outlines, tabular numbers, icon stroke matching |
| WG | [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) by Vercel | (no licence file; ideas only, not text) | the engineering checklist: focus, forms, touch, i18n, hydration, content handling |
| UI | [ui-skills](https://github.com/ibelick/ui-skills) by ibelick | MIT | accessibility and motion-performance fixing passes |
| AF | [designing-arabic-frontends](https://github.com/ahmed-badawood/designing-arabic-frontends) by Ahmed Badawood | MIT | Arabic font declaration, line-height clipping, digit policy, per-element logical properties, bidi islands |
| VS | [visant-skills](https://github.com/pedrojaques99/visant-skills-public) by Pedro Jaques | see repository | detectors tested both ways against fixtures; refusing to report a zero that was not read; the opacity ladder |
| | [DESIGN.md](https://github.com/google-labs-code/design.md) by Google Labs | Apache-2.0 | the open token format for `DESIGN.md`, and its linter |
| | [W3C Arabic and Persian Layout Requirements](https://www.w3.org/TR/alreq/) | W3C | letters styled one by one, bidi classes of digits, line breaking |
| | [antialgorithm](https://github.com/mankidev/antialgorithm) | see repository | naming the first, most average pick before moving away from it; remembering past directions |
| | [awesome-design-md-jp](https://github.com/kzhrknt/awesome-design-md-jp) | see repository | script-specific sections inside `DESIGN.md` |
| DK | [dualkit](https://github.com/dualkit/dualkit) | see repository | the 14 px computed floor for Arabic, the reset that loses the cascade, Latin labels whose colon jumps sides, flags in language switchers |
| RT | [rtl-skill](https://github.com/Ifazawezk/rtl-skill) and [rtl-skill](https://github.com/mhamedmohammed92-arch/rtl-skill) | see repositories | double reversal, off-canvas drawers in RTL, centring as a false positive, `font: inherit` on controls, direction before the first paint, `dir="auto"` and the first strong letter, isolates over marks |
| AC | [arabic-copywriting](https://github.com/Al-mudather/arabic-copywriting), [arabic-ui](https://github.com/JKc66/arabic-ui), [Sibawayh](https://github.com/anasAsh/Sibawayh), [arabic-humanizer](https://github.com/karem505/arabic-humanizer) | see repositories | Arabic machine-copy phrases and calques, orthography slips, judging phrase density rather than single words |
| | [arabic-claude-skills](https://github.com/hosam382/arabic-claude-skills), [arabic-rtl-skill](https://github.com/halimabobaker/arabic-rtl-skill) | see repositories | Umm al-Qura edge cases, the middle dot that reads as zero, Maghreb formats, native RTL stacks |
| DGA | [Saudi DGA unified design system](https://design.dga.gov.sa) | public guidance | the government type scale, Saudi Font usage, charts and date-picker accessibility |
| UAE-C, UAE-T | [UAE Design System](https://designsystem.gov.ae) and [Dubai Design System](https://designsystem.dubai.ae) | public guidance | Arabic content rules (gender, ranges, currency, time, loanwords), type scales and line heights |
| MS | Microsoft Arabic (Saudi Arabia) localization style guide | public guidance | error and request openers, verbal nouns in tooltips, numbers one and two as words |
| | Apple HIG (right to left), Material Design (bidirectionality), USWDS (language selection), Google Search Central (localized versions) | public guidance | icons that never mirror, reversed scales, the language switch, hreflang |
| UX-AR | [Content style guide in Arabic](https://github.com/UX-Writing/Content-Style-Guide-in-Arabic) | see repository | no directions by side in copy |
| | [web-quality-skills](https://github.com/addyosmani/web-quality-skills) by Addy Osmani | MIT | performance and Core Web Vitals framing |
| | [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT | the Google Fonts script-coverage data that guided the per-script font lists |
| | [/rasm](https://github.com/Ekka-Barber/higgsfield-prompt-master) | MIT | Arabic-first image prompting; model routing; generated-Arabic failure modes |
| | [Higgsfield CLI](https://github.com/higgsfield-ai/cli) and [skills](https://github.com/higgsfield-ai/skills) | MIT | the generation back end |
| | [Signs of AI design](https://github.com/febbhav/signs-of-ai-design) | see repository | a field guide consulted for cross-checking |

tasmeem's own additions are marked `T`:
- the writing-system tells (`SC-`);
- the Arabic, Persian and English guides;
- the Arabic copy tells;
- the render checks for script typography and fonts actually used;
- the Higgsfield bridge with its cost gate;
- the "paint the material, code the meaning" rule for generated assets;
- the direction-aware JavaScript, digit-safe input and riyal-sign checks;
- the `kept` redesign check and the template-stack score in its current form.

In 0.2.0, the newer releases of impeccable (4.x), antislop (3.x), avoid-ai-design (0.5), Hallmark, taste-skill (2.5) and Anthropic's frontend-design were read again for what they added since September 2026.
