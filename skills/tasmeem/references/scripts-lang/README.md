# Writing systems

tasmeem sets type per script, not per page. Detect the scripts actually present (the scanner's `render` check lists them), then read the guides that apply.

| Guide | Scripts and languages |
|---|---|
| [arabic.md](arabic.md) | Arabic, the first-class script: type, layout, forms, voice, images |
| [persian-urdu.md](persian-urdu.md) | Persian (fa), Urdu (ur), Pashto, Kurdish (Sorani) |
| [hebrew.md](hebrew.md) | Hebrew (he), Yiddish |
| [cjk.md](cjk.md) | Chinese (zh-Hans, zh-Hant), Japanese (ja), Korean (ko) |
| [indic.md](indic.md) | Devanagari (hi, mr, ne), Bengali, Gurmukhi, Gujarati, Tamil, Telugu, Kannada, Malayalam |
| [southeast-asian.md](southeast-asian.md) | Thai, Lao, Khmer, Myanmar |
| [latin-greek-cyrillic.md](latin-greek-cyrillic.md) | Latin-script languages, Greek, Cyrillic, Vietnamese, Turkish |
| [bidi.md](bidi.md) | mixing directions: isolation, marks, inputs, icons |
| [numerals-dates.md](numerals-dates.md) | digits, plurals, calendars, currency, weeks, names, addresses |
| [punctuation.md](punctuation.md) | quotes, spacing and marks per language |

## Rules for every script

1. **`lang` on the root and on every foreign passage.** `dir` where the direction differs.
2. **Scope typography with `:lang()`.** One stylesheet, many scripts:
   ```css
   :root { --leading-body: 1.5; --track-label: 0.04em; }
   :lang(ar), :lang(fa), :lang(ur) { --leading-body: 1.7; --track-label: 0; }
   :lang(ja), :lang(zh), :lang(ko) { --leading-body: 1.75; --track-label: 0; }
   :lang(hi), :lang(bn), :lang(mr) { --leading-body: 1.7; --track-label: 0; }
   :lang(th), :lang(lo), :lang(km) { --leading-body: 1.8; --track-label: 0; }
   :lang(my) { --leading-body: 1.95; --track-label: 0; }
   ```
3. **A face per script, designed to pair.** Choose the script's face first, then a Latin partner with matching x-height and colour, or a superfamily that covers both.
4. **Load only the subsets you use** (`unicode-range`), preload the body weight, and verify coverage in the browser. A fallback font is a defect; tofu (□) is a failure.
5. **Test the longest and the tallest strings:** German for length, Arabic with tashkeel and Thai stacked marks for height, Burmese for both.
6. **Never trust an image model with text** in any non-Latin script, and be careful even with Latin. Set text in code.
7. **Avoid the cultural costume.** Every culture has a stock visual cliché that generated design reaches for (see arabic.md §10). Build from the subject's real world.
