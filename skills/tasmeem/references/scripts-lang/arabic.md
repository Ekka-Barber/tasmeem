# Arabic (ar), the first-class script

Read this whenever a page contains Arabic, whatever the page's main language. Persian shares the script and adds its own rules (see [persian.md](persian.md)). Bidirectional mechanics are covered in [bidi.md](bidi.md), numbers and dates in [numerals-dates.md](numerals-dates.md).

## 1. Declare the language and direction

```html
<html lang="ar" dir="rtl">
```

- `lang` is not decoration. It selects the font fallback, the screen-reader voice, the quote style, hyphenation, and the `:lang(ar)` rules below. Mark every passage in another language: `<span lang="en" dir="ltr">`.
- Scope every script rule with `:lang(ar)` (and `fa`, `ur`), so that the Latin rules in the same stylesheet do not leak into Arabic, and the reverse.

## 2. Choose the typeface first

Arabic type comes in styles with different jobs. Pick the style for the role, then the family.

| Style | Job | Never use it for |
|---|---|---|
| **Naskh** | reading: body, long text, forms | nothing; it is the safe base |
| **Kufi, text cut** (Noto Kufi Arabic, IBM Plex Sans Arabic) | interface and body text at 16 px and up | nothing at sizes it was drawn for |
| **Kufi, display cut** (Kufam, Reem Kufi, Rakkas…) | display, short labels at large sizes, signage | anything under 24 px (TY-24) |
| **Ruqaa** | informal display, handwritten warmth | body, UI |
| **Thuluth / Diwani** | ceremonial display, one word | anything that must be read quickly |
| **Nastaliq** | Persian poetry and literary display | Arabic-language UI, body text |

**Families that work (open licences, on Google Fonts, all including Latin):**

| Role | Family | Notes |
|---|---|---|
| UI sans | IBM Plex Sans Arabic | pairs with IBM Plex Sans and Serif; 7 weights |
| UI sans | Noto Sans Arabic / Noto Kufi Arabic | the widest coverage; pairs with Noto Sans |
| UI sans, bilingual | Readex Pro, Alexandria, Rubik | Arabic and Latin designed together |
| UI sans | Tajawal, Cairo, Almarai, Mada, Changa | popular in the Gulf; check the weights you need |
| Persian-first sans | Vazirmatn | also strong for Arabic UI |
| Reading Naskh | Noto Naskh Arabic, Scheherazade New, Markazi Text | Scheherazade places marks best; Markazi reads like a book face |
| Classical Naskh | Amiri | book and literary feel, marks included |
| Display | Reem Kufi, El Messiri, Lemonada, Qahiri, Kufam, Aref Ruqaa | display only |

**Government design systems** set their own faces. Follow them when building for that entity, and scope their Latin tracking to `:lang(en)` (DGA's display tokens carry −2% tracking, Dubai's −1% to +2%, which is SC-01 on Arabic):

| System | Arabic | Latin | Notes |
|---|---|---|---|
| Saudi DGA (design.dga.gov.sa, v4) | IBM Plex Sans Arabic | IBM Plex Sans | type scale in px (size/line): display 72/90, 60/72, 48/60, 36/44, 30/38, 24/32; text 20/30, 18/28, 16/24, 14/20, 12/18. The Saudi Font only for national occasions, only in main headings, never body text |
| UAE federal (designsystem.gov.ae) | Noto Kufi Arabic (body), Alexandria (headings) | Roboto, Inter | 16 px base and minimum, ratio 1.2, body line height ≥ 1.5, measure 60–100 characters, never justified, at most 3 weights per pattern |
| Dubai (designsystem.dubai.ae) | Dubai font | Dubai font | body 18/28 above 1440 px, 16/24 on desktop and tablet, 14/20 on phones, never under 14 px |

Only a government entity's own site shows its stamp, banner or a «مسجّل لدى هيئة الحكومة الرقمية» line. Anywhere else it is impersonation (CP-07, `core/honesty.md`).

**Commercial and regional families** (29LT, TypeTogether's Greta Arabic, Thmanyah's families, the Dubai font…): use them only with a licence that covers web embedding, and check the weights and the Latin partner.

**Rules.**
- **Semi-transparent Arabic shows its joins.** Where the strokes of joined letters overlap, alpha text draws the overlap darker. Use opaque colour tokens for Arabic text, or apply `opacity` to the whole element rather than an alpha colour to the glyphs (CO-17).
- **Arabic appears smaller.** At the same `font-size`, many Arabic faces look 10 to 20% smaller than their Latin partner. Measure, then fix with `size-adjust` in the Arabic `@font-face`, or with a `:lang(ar)` size step. Never guess.
- **Weights under 400 break down** at interface sizes, because the thin strokes disappear. Keep 400 to 700 for UI and body text.
- **Display faces stay large.** Geometric Kufi display faces simplify or drop dots at small sizes: in Kufam, a final ن at 16px reads as ر. Use display faces at 24px and up, and set labels, buttons, navigation and prices in the UI or body face (TY-24).
- **Load the Arabic subset.** Use `unicode-range: U+0600-06FF, U+0750-077F, U+0870-089F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFC` (U+200C is the ZWNJ Persian needs; U+FEFF is the byte-order mark, not a letter), and preload only the body weight.
- **Balance a bilingual family without spans.** Two `@font-face` rules under one family name, split by `unicode-range`, each with its own `size-adjust`, scale the Arabic and the Latin runs separately inside one string. `font-size-adjust` cannot do this, because it has no metric for Arabic.
  ```css
  @font-face { font-family: Body; src: url(/f/ar.woff2) format("woff2"); unicode-range: U+0600-06FF, U+0750-077F, U+0870-089F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFC; size-adjust: 108%; }
  @font-face { font-family: Body; src: url(/f/latin.woff2) format("woff2"); unicode-range: U+0000-00FF, U+2013-2014, U+2018-201D; }
  ```
- **Variable or static.** On Google Fonts (November 2026): Noto Sans Arabic (wght 100–900, wdth 62.5–100), Readex Pro (wght 160–700), Vazirmatn, Alexandria and Noto Kufi Arabic (wght 100–900), Cairo (wght 200–1000), Rubik (300–900) are variable; IBM Plex Sans Arabic (100–700), Tajawal and Almarai are static, and Tajawal has no 600, Almarai only 300, 400, 700 and 800. Check the weights before writing the scale.
- **Check real coverage** of what you set: Arabic-Indic digits, «٪», «ﷺ» (U+FDFA), and the Saudi riyal sign (U+20C1, Unicode 17.0, 2025). Most Arabic UI families do not have the riyal glyph yet (see `numerals-dates.md` § Currency for the pattern that adds it).

## 3. Size, line height and measure

| Role | Size | Line height |
|---|---|---|
| Body (reading) | 17 to 20px | 1.7 to 1.9 |
| Body (UI) | 16 to 17px minimum | 1.6 |
| Headings | scale ratio ≥ 1.25 | 1.25 to 1.4 |
| Single-line controls | ≥ 16px | ≥ 1.5, or padding-driven height |
| Anything Arabic | ≥ 14px computed | `size-adjust` does not raise the computed size, so it does not count (TY-13) |

- Measure: 50 to 70 characters per line for reading.
- Marks and descenders need space. Never clamp Arabic lines with `line-height: 1` or fixed control heights (SC-15).
- `text-wrap: balance` works for Arabic headings (in every engine); `text-wrap: pretty` for paragraphs (not in Firefox; harmless there).
- **Tailwind leading.** `leading-none` (1) clips Arabic everywhere; `leading-tight` (1.25) is the display floor and too tight for body text; `leading-snug` (1.375) is too tight for body. Use `leading-relaxed` (1.625) or more on Arabic body text, and remember that `text-sm` and `text-base` carry their own line height of about 1.43 and 1.5 (SC-03).
- **Trimming the text box** (`text-box: trim-both cap alphabetic`) uses Latin metrics. On Arabic it can cut the marks above and the tails below: scope it to `:lang(en)`, or use the `text` edge (SC-15).
- **Justification.** No browser stretches Arabic with kashida (`text-justify` has no kashida value), and no browser hyphenates Arabic. Justified Arabic therefore only widens the spaces: keep UI text at `start`.

## 4. Never do this to Arabic

| Never | Because | Instead |
|---|---|---|
| `letter-spacing` of any value | it tears the joins (SC-01) | weight, size, colour |
| `font-style: italic` | Arabic has no italic; the browser slants it (SC-02) | weight or colour |
| `text-transform` | the script has no case (SC-08) | nothing |
| faux bold | the strokes smear | load real weights; `font-synthesis: none` |
| `font-variant-ligatures: none`, `"liga" 0`, `"calt" 0` | the letters stop joining (SC-20) | leave ligatures on |
| `::first-letter`, drop caps, a tag in the middle of a word | the letter is torn from its word (SC-21) | style whole words |
| tatweel stretching (ـــ) | it breaks search and screen readers (SC-16) | the font's justification alternates, or nothing |
| `text-align: justify` on UI text | rivers of space without kashida support | `start` |
| generated images containing Arabic text | image models break letters (IG-08) | text in HTML or SVG |

Put this reset in every multilingual stylesheet. **Mind the cascade:** `:lang(ar)` and `.eyebrow` have the same specificity, so a `.eyebrow { letter-spacing: .1em }` written after the reset wins and tracks the Arabic anyway. Put the reset last, raise it (`:lang(ar) .eyebrow`, or `:is(:lang(ar), :lang(fa)) *` in a final layer), or pair every `tracking-*` utility with `rtl:tracking-normal`. Check tracking in Safari too: WebKit and Chromium do not treat letter-spacing on Arabic the same way, so a Chromium screenshot can hide SC-01 (reported by rtl-skill; confirm on a real iPhone).

```css
:is(:lang(ar), :lang(fa)) {
  letter-spacing: 0;
  font-style: normal;
  text-transform: none;
  font-synthesis: none;
}
```

## 5. Emphasis and decoration

- Emphasis comes from weight, colour and size. For underlines, use `text-underline-offset: 0.35em` so the line clears the descenders. Check `text-decoration-skip-ink: auto` by eye: on some faces it cuts the underline at every dot below the line, and `none` with a larger offset reads better.
- **Tashkeel (diacritics)** only where a reader could misread a word, and on names; never scattered for ornament. Check that the font positions the marks and that the line height leaves them room.
- **Numbers inside headings** follow the product's digit policy (see numerals-dates.md).

## 6. Punctuation and typesetting

- Use Arabic punctuation: «،» comma, «؛» semicolon, «؟» question mark, «» quotes. The full stop is shared.
- No space before punctuation. When a closing mark must follow a space (for example after a Latin token), make that space a no-break space (U+00A0), so the mark never starts a line.
- Add a space after «،» and «؛» when source text glues them to the next word.
- In RTL, the browser mirrors parentheses and brackets automatically. Never type them reversed.
- Percent: let `Intl.NumberFormat(locale, { style: 'percent' })` choose the sign. `ar-SA` with Western digits gives «50٪»; other locales give `%` with bidi marks. Do not hard-code either.
- **Sacred text** (Qur'an, hadith, the shahada): never generate, paraphrase or restyle it. Use verified sources and a Qur'anic font (such as Amiri Quran), and keep it out of image generation entirely.

## 7. Direction and layout

- Use logical properties everywhere (`margin-inline-start`, `padding-inline`, `inset-inline-end`, `border-inline-start`, `text-align: start`). Flexbox and grid follow `dir` automatically.
- **Directional things follow the reading direction:**
  - progress bars and sliders fill from the right;
  - carousels start at the right and "next" moves left;
  - breadcrumbs run right to left;
  - drawers for navigation open from the right.
- **Transforms do not mirror.** `translateX(8px)` moves right in both directions. For a "forward" nudge:
  ```css
  .forward:hover { translate: calc(var(--dir, 1) * -4px) 0; }
  :dir(ltr) { --dir: -1; }
  ```
  (Or write the RTL value explicitly under `:dir(rtl)`.)
- **Mirror icons by meaning** (SC-06):
  - mirror arrows, chevrons, back and forward, send, reply, undo and redo, and indent;
  - never mirror clocks, play, checkmarks, logos, or icons containing letters or digits.
- **Tables:** in RTL, text columns align start (right). Numeric columns may align end for comparison; decide once.
- **Charts:** decide whether time runs right to left (natural for Arabic readers) or left to right (convention in finance), then document it. Never reverse an axis without reversing its data. In Recharts: keep the chart in a `dir="ltr"` wrapper, then set `reversed` on the X axis and `orientation="right"` on the Y axis for right-to-left time, pass the Arabic `fontFamily` to the ticks explicitly, and wrap mixed tick labels in an isolate (U+2068 … U+2069) rather than a bare RLM.
- **The DOM order is the reading order** (SC-26). Never add `row-reverse`, `order` or `rtl:flex-row-reverse` "for RTL": `dir` already reversed the row. When you build from an RTL design file or screenshot, write the elements in reading order (right to left), not in the file's x-order.
- **Off-canvas panels:** a drawer parked at `translateX(-100%)` or `left: -320px` sits inside the scroll area in RTL and adds horizontal scroll; `visibility` and `opacity` do not help. Hide it with `display: none` when closed, or park it with `inset-inline-start` and mirror the transform under `:dir(rtl)`. Use `overflow-x: clip` (not `hidden`) on the page, so sticky headers keep working.
- **Centring is direction-neutral:** `left: 50%; translate: -50%` (or `left-1/2 -translate-x-1/2`) centres in both directions. Do not "fix" it to `inset-inline-start`, which breaks it.
- **Form controls do not inherit fonts.** Without `button, input, select, textarea { font: inherit }`, Arabic inside them falls back to a system face (Tailwind's preflight already does this).
- **Direction before the first paint.** `lang` and `dir` belong in the server HTML. Setting them in `useEffect` or `onMounted` flashes the page in the wrong direction, and `rtl:` variants miss the first render (SC-24).
- **Chart libraries:** Chart.js: `scales.x.reverse: true`, `scales.y.position: 'right'`, `rtl: true` on the legend and tooltip. ECharts: `xAxis.inverse: true`, `yAxis.position: 'right'`. In SVG, set `direction` on each `<text>`, not on the root. Carousels: Embla `direction: 'rtl'`; Swiper needs a remount (a `key`) when the language changes.
- **Native apps:** Flutter `EdgeInsetsDirectional` and `matchTextDirection: true` on directional images, with Material's `letterSpacing` set to 0 for Arabic; React Native `I18nManager.forceRTL` needs a reload; Android: the `RtlHardcoded` lint and `android:autoMirrored`; SwiftUI: `chevron.backward`, not `chevron.left`.
- **Script follows direction too** (SC-22). Logical CSS does not reach JavaScript: `scrollLeft`, `ArrowLeft`/`ArrowRight` handlers, swipe deltas and `side="left"` props must branch on the direction. Radix and shadcn read direction from `DirectionProvider`, not from the DOM: wrap the app in it (shadcn: `npx shadcn init --rtl`, or `"rtl": true` in `components.json`). shadcn flips icons with `rtl:rotate-180`, which turns asymmetric icons upside down; use `rtl:-scale-x-100`.
- **Tailwind v4** writes logical CSS for `ms-*`, `me-*`, `ps-*`, `pe-*`, `inset-s-*`, `inset-e-*` (`start-*` and `end-*` still work but are deprecated since 4.2), `text-start`, `border-s-*`, `rounded-s-*`, and for `space-x-*`. Physical utilities (`ml-*`, `pl-*`, `left-*`, `text-left`, `bg-left`, `origin-left`, `bg-linear-to-r`) need an `rtl:` pair or the logical form. In Tailwind v3, `space-x-*` is physical and needs `rtl:space-x-reverse`.
- **Logical CSS that is safe now:** `float` and `clear: inline-start`, `inset-inline`, `border-start-start-radius`, `margin-inline`, `scroll-padding-inline`, `resize: inline`. **Not safe yet:** logical `background-position` (`x-start`), logical `caption-side`. Transforms, gradients (`to right`), masks and shadows have no logical form: write the RTL value under `:dir(rtl)`.

## 8. Forms

- Labels sit at the start (the right) and errors under the field, in Arabic.
- **LTR islands:** email, URL, phone, code and password inputs get `dir="ltr"`. Keep each input's icon or toggle inside the same direction context; otherwise logical properties resolve to opposite sides.
- Accept Arabic-Indic digits in every numeric input, and normalise both ranges (U+0660–0669 and U+06F0–06F9) before validation.
- Names: one "full name" field, unless the service truly needs parts. Addresses follow the country: in Saudi Arabia, the national address (building number, street, district, city, postal code, additional number) replaces "state/ZIP".
- Phone: accept `05xxxxxxxx`, `+9665…` and `009665…`. Test both pasting and typing character by character.

## 9. Voice and copy

- **Register.**
  - Choose Modern Standard Arabic, or a named dialect, per product, and write it down in `PRODUCT.md`.
  - Never mix registers in one sentence.
  - Gulf products often use light MSA with local warmth; keep the interface verbs in MSA.
- **Verbs.**
  - Direct imperatives: «احفظ»، «أرسل»، «احجز».
  - Or the masdar convention: «حفظ»، «إرسال».
  - Pick one convention for buttons and keep it everywhere.
- **Gender.**
  - Decide the address strategy once. Either the conventional masculine generic, or neutral constructions («تسجيل الدخول», «أهلاً»); only use both forms where the product serves a known audience.
  - Keep agreement consistent: «كلمة المرور مطلوبة» / «رقم الهاتف مطلوب».
- **Number and noun agreement.** Arabic has six plural categories: `zero`, `one`, `two`, `few`, `many` and `other`. `few` and `many` follow the last two digits (n mod 100): 3–10, 103–110 and 1,003 are `few`; 11–99 and 111–199 are `many`; 100, 101 and 102 are `other`. Use `Intl.PluralRules('ar')` and write every form; never `count === 1 ? … : …` (QA-10):
  - «ملف واحد»
  - «ملفان»
  - «3 ملفات»
  - «11 ملفاً»
  - «100 ملف»
- **Calques to avoid** (CP-15):
  - «قم بـ» plus a masdar;
  - «يتم» plus a masdar;
  - «يلعب دوراً»;
  - «في نهاية اليوم»;
  - «على نفس الصفحة»;
  - «هل أنت مستعد لـ…؟».
- **Machine-copy tells** (CP-02, CP-03):
  - «في عالمٍ يتسارع…»;
  - «ليس مجرد… بل…»;
  - «حلول مبتكرة»;
  - «تجربة استثنائية»;
  - «نقلة نوعية»;
  - «بكل سهولة ويسر»;
  - «رحلة» for anything that is not a journey;
  - stacked «بالإضافة إلى ذلك / علاوة على ذلك»;
  - emoji bullets.
- **Error and request openers:** errors start with what failed («تعذّر حفظ…», «فشل الإرسال…», «…غير متوفر حالياً»); requests start with «يرجى…». Tooltips use the masdar («عرض التفاصيل»), which avoids gender agreement.
- **Loanwords:** Arabic first, then the abbreviation in brackets: «واجهة برمجة التطبيقات (API)». Never «الـAPI», «الإيميل» or Arabizi; write «البريد الإلكتروني». Names of Arab people and places in Arabic letters.
- **No slash-doubled gender** («أدخل/ي», CP-20).
- **No religious phrases** («إن شاء الله», «بإذن الله») in errors, deadlines or procedural messages: they promise nothing and read as a dodge.
- **For screen readers:** Arabic without vowels can have several readings; add the تشكيل on a word a voice would misread (a name, a homograph). Spell out «&», «+» and «~». All-capital Latin strings are read letter by letter. Prefer «اختر» or «حدد» to «انقر»: not everyone clicks.
- **Spelling:** check hamza (إنشاء not انشاء), taa marbuta and alif maqsura. A spelling error in a heading reads as carelessness, not as a machine, but it is fixed the same way.

## 10. The "Arabic" category reflex

When the brief says "Arabic brand" or "Saudi product", generated design reaches for:
- lanterns, domes and crescents;
- eight-point stars, arabesque tiling, geometric lattices;
- gold on navy, the "Ramadan" look;
- dunes and camels.

This is the Arabic version of cream-and-serif. It is a costume, not an identity.

- Build from the subject's real world instead: the product, its city, its materials, its people, its trade. A roastery in Riyadh has beans, roast colours, packaging, a neighbourhood. A law firm has paper, seals, a street.
- Traditional pattern is **allowed** when it is the subject (a craft brand, a heritage institution) and is drawn with care from a real source, not taken from a stock pattern pack.
- The same reflex exists for every culture (Persian design has its own, see persian.md). The same fix applies.

## 11. Images and calligraphy

- Never let an image model write Arabic: it breaks joins, drops dots and invents letters. Generate text-free images and set the words in code.
- **Logos and calligraphic marks are vector** (SVG), drawn or licensed, never generated or upscaled.
- **If a product mockup must show Arabic** (packaging, a book cover), generate the object without text and composite the vector text; or compare every text crop letter by letter against the source string. Treat «ص», «ض», «ء» and dotted letters as high-risk.
- Upscalers alter glyphs: never upscale an image that contains Arabic text.

## 12. Checklist

- [ ] `<html lang="ar" dir="rtl">`; every foreign passage has its own `lang` and `dir`.
- [ ] One Arabic family per role, loaded with its Arabic subset; the fallback stack tested; no tofu.
- [ ] Arabic size and weight balanced against the Latin partner (measured).
- [ ] Line height ≥ 1.6 for body text; nothing clipped in controls.
- [ ] No letter-spacing, italic, text-transform or faux bold on Arabic (the reset is in place).
- [ ] Logical properties only; the directional icons mirrored and the others not.
- [ ] One digit policy; inputs normalised; `Intl` with explicit `numberingSystem` and `calendar`.
- [ ] Arabic punctuation; LTR tokens isolated; no reversed brackets.
- [ ] Plurals through `Intl.PluralRules('ar')` with all six forms.
- [ ] Ligatures on; no drop caps or mid-word tags on Arabic.
- [ ] Number inputs accept «٠–٩» and «۰–۹»; no `type="number"` or `\d` on what users type.
- [ ] Script respects direction: scrollers, arrow keys, swipes, popover sides; `DirectionProvider` around Radix or shadcn.
- [ ] Copy free of calques and machine-copy tells; register consistent.
- [ ] No generated Arabic text in images; logos in vector.
