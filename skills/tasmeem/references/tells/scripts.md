# Writing-system tells (`SC-`)

Generated interfaces are built for Latin text and then filled with other scripts. These tells catch what breaks when that happens. Each script's full guide is in `references/scripts-lang/`. Scope every rule with `:lang()` or the detected script: never apply a Latin rule to Arabic, or an Arabic rule to Latin.

**Script families used below.**
- **Joined:** Arabic, Persian, Urdu, Syriac, N'Ko, Mongolian.
- **Bar-hanging:** Devanagari, Bengali, Gurmukhi.
- **Stacked:** Thai, Lao, Khmer, Myanmar, Tibetan.
- **CJK:** Chinese, Japanese, Korean.
- **RTL:** Arabic, Hebrew, Persian, Urdu, Syriac, N'Ko, Thaana.

### SC-01 · Tracking on joined or bar-hanging scripts · P0 · render scan
Any non-zero `letter-spacing` on Arabic-family or Indic text, including through inherited rules such as a global `h1 { letter-spacing: -0.02em }` or an uppercase-label style reused on an Arabic label.
**Why:** it tears the joins between Arabic letters and breaks the headline bar of Devanagari. Readers see a broken word, not a style.
**Fix:** `:lang(ar), :lang(fa), :lang(ur), :lang(hi) { letter-spacing: 0 }` at the root of the type system, and no tracking tokens on those roles.
**Sources:** AF T

### SC-02 · Italic where none exists · P1 · render scan
`font-style: italic` or `oblique` on Arabic, Hebrew, CJK, Indic or Thai text. The browser slants the glyphs artificially.
**Fix:** emphasise with weight, colour or size.
**Sources:** AF HM T

### SC-03 · Line height below the script's floor · P0 · render
Body `line-height` below the script's need, so that marks collide or are clipped:

| Script | Body minimum | Display minimum |
|---|---|---|
| Arabic (Naskh) | 1.6 | 1.25 |
| Nastaliq (Urdu) | 2.2 | 1.6 |
| Hebrew | 1.5 | 1.15 |
| Devanagari / Bengali | 1.6 | 1.3 |
| Thai / Lao / Khmer | 1.7 | 1.35 |
| Myanmar / Tibetan | 1.9 | 1.5 |
| CJK | 1.7 | 1.3 |

**Fix:** set line height per `:lang()`, not one global value.
**Sources:** AF T

### SC-04 · Fallback fonts and missing glyphs · P0/P1 · render
Glyphs drawn by a system fallback because the chosen family lacks the script (P1), or tofu boxes, □, for characters no font covers (P0). This is common for Arabic-Indic digits, Persian letters (پ چ ژ گ), Urdu marks and CJK extensions.
**Detect:** in the render check, Chrome DevTools `CSS.getPlatformFontsForNode` names the fonts actually used for each text node.
**Fix:** a family that covers the script, with the right `unicode-range` subsets loaded and a tested fallback stack.
**Sources:** AF T

### SC-05 · Missing direction, or physical CSS in RTL · P1 · scan built
An RTL page without `dir="rtl"` on `<html>`, or CSS that pins sides physically: `margin-left`, `padding-right`, `left:`, `text-align: left`, `float: right`, `border-left`, `translateX()` for "forward" movement.
**Fix:** logical properties throughout (`margin-inline-start`, `inset-inline-end`, `text-align: start`, `border-inline-start`). For transforms, pair the values with `:dir(rtl)` or a direction variable.
**Allowed:** physical sides that are truly physical: a map pin, a scrollbar gutter, a crop focus point.
**Sources:** AF T

### SC-06 · Direction-blind icons · P1 · scan render
In RTL, arrows, chevrons, back and forward, send, reply, undo and redo, and list indentation left unmirrored; or icons mirrored that must not be: clocks, media play, checkmarks, logos, anything containing letters or digits.
**Fix:** mirror by meaning with `:dir(rtl) .icon-directional { transform: scaleX(-1) }`. In Arabic, "next" points left (`←`).
**Sources:** AF T

### SC-07 · Mixed digit systems · P1 · render
Arabic-Indic digits (٠١٢٣) and Western digits (0123) mixed in one view: prices in one, dates in another, validation messages in a third.
**Fix:** one numbering policy per product, applied through one formatter (`Intl.NumberFormat(locale, { numberingSystem })`). Normalise both Arabic-Indic ranges (U+0660–0669 and U+06F0–06F9) on input.
**Sources:** AF T

### SC-08 · Case rules on caseless scripts · P2 · scan
`text-transform: uppercase` or `capitalize` on labels that carry Arabic, Hebrew, CJK or Indic text, and small-caps styles on them. In Latin languages, `capitalize` without `lang` (Turkish dotted i, Dutch ij) is a related defect.
**Fix:** transforms only through `:lang()` rules for scripts with case.
**Sources:** T

### SC-09 · Foreign punctuation and letterforms · P2 · scan render
- **Arabic:** Latin `,` `?` `;` instead of «، ؟ ؛»; English quotes instead of «»; the space before closing punctuation missing a no-break; `%` placed without regard for locale.
- **Persian:** Arabic ي and ك where Persian ی and ک belong; a missing ZWNJ (U+200C) in compounds such as «می‌شود».
- **Others:** each language's quote style and spacing (French narrow no-break spaces, German „“, CJK full-width punctuation).
**Sources:** T

### SC-10 · Bidi scramble · P1 · render
LTR tokens inside RTL text (phone numbers, emails, URLs, code, product IDs, "iPhone 17 Pro") that are not isolated, so digits, parentheses and punctuation jump to the wrong side. A related defect: `dir="ltr"` put on a block element, which flips its alignment.
**Fix:** `<bdi>`, or `unicode-bidi: isolate` on inline spans with `dir="ltr"`; `dir="auto"` for user content; LTR inputs (email, phone, URL, code) marked `dir="ltr"` with the adornments inside the same direction context.
**Sources:** AF T

### SC-11 · Mismatched script partners · P2 · eye render
Latin words inside Arabic (or Arabic inside Latin) that look too big, too small, too light or too heavy, because the two families have different x-heights and colour.
**Fix:** a designed pair: families built together (IBM Plex Sans Arabic with IBM Plex Sans, Noto Naskh Arabic with Noto Serif), or `size-adjust` and weight mapping on the partner face.
**Sources:** T

### SC-12 · Synthesised weights · P2 · render
Bold or italic faked by the browser because the script's font ships a single weight.
**Fix:** `font-synthesis: none`, a family with real weights, or hierarchy made by size and colour instead.
**Sources:** T

### SC-13 · CJK set like Latin · P2 · scan render
- **Korean** breaking inside words; fix with `word-break: keep-all`.
- **Japanese** starting lines with small kana or closing brackets; fix with `line-break: strict`.
- `word-break: break-all` on body text.
- Negative tracking.
- No spacing between CJK and Latin; use `text-autospace`.
- Doubled punctuation width; use `text-spacing-trim`.
**Sources:** T

### SC-14 · Breaking unspaced scripts · P1 · render
Thai, Lao, Khmer and Myanmar have no spaces between words. `word-break: break-all` or `overflow-wrap: anywhere` on their body text splits syllable clusters.
**Fix:** leave line breaking to the browser's dictionary with `lang` set correctly. Use a zero-width space (U+200B) only in controlled strings.
**Sources:** T

### SC-15 · Clipped marks · P1 · render
Arabic diacritics, Indic vowel signs and Thai tone marks cut off by `overflow: hidden`, `line-clamp`, fixed-height buttons, or `line-height: 1` on single-line controls.
**Fix:** heights from padding plus line height; test with the tallest strings (tashkeel, stacked Thai marks).
**Sources:** AF T

### SC-16 · Decorative stretching · P2 · scan
Tatweel (ـ, U+0640) typed into words to stretch a heading, and justification forced on Arabic without kashida support.
**Why:** it breaks search, copy and paste, and screen readers.
**Fix:** stretch through the font (OpenType justification alternates), or not at all.
**Sources:** T

### SC-17 · English-length layout · P1 · render
Fixed widths, truncation and one-line labels sized for English. Labels run about 30% longer in German, and Arabic words can be much wider at the same character count.
**Fix:** test with the longest locale; let controls grow; prefer wrapping to truncation.
**Sources:** T

### SC-18 · Mirroring blindly · P2 · eye
Photographs, logos, brand marks and media timelines flipped for RTL; charts whose time axis was reversed without reversing the data.
**Fix:** mirror layout and direction-bearing icons only. Decide chart direction on purpose and document it.
**Sources:** AF T

### SC-19 · Locale assumptions · P2 · eye
- the calendar not pinned: some engines resolve `ar-SA` to Hijri, others to Gregorian;
- the week starting on Sunday where it starts on Saturday;
- a Saturday–Sunday weekend where it is Friday–Saturday;
- name and address forms that assume "first name, last name, state, ZIP";
- phone fields that reject local formats.
**Fix:** `Intl` with explicit `calendar` and `numberingSystem`; locale-appropriate form structure (see `scripts-lang/numerals-dates.md`).
**Sources:** AF T
