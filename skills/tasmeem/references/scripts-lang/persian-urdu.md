# Persian (fa), Urdu (ur) and other Arabic-script languages

Everything in [arabic.md](arabic.md) applies (direction, no tracking, no italics, bidi, images). These are the differences.

## Persian

- **Letters.** Use Persian ی (U+06CC) and ک (U+06A9), never Arabic ي (U+064A) and ك (U+0643). Mixed forms break search and look wrong. Normalise all input and content.
- **ZWNJ (نیم‌فاصله, U+200C)** joins prefixes and suffixes without connecting the letters: «می‌شود»، «کتاب‌ها». A normal space or no space at all is a spelling error. Check that copy pipelines and CMS editors keep U+200C.
- **Digits:** Extended Arabic-Indic ۰۱۲۳۴۵۶۷۸۹ (U+06F0–06F9); the shapes of ۴ ۵ ۶ differ from the Arabic forms. Use `numberingSystem: 'arabext'`.
- **Calendar:** Solar Hijri (`calendar: 'persian'`). The week starts on Saturday and the weekend is Friday.
- **Type:** Vazirmatn, Noto Naskh Arabic (Persian forms), Sahel and Shabnam (open licences), and commercial Iranian foundries. Check that «پ چ ژ گ» and the Persian digits exist in the font.
- **Punctuation:** «،» «؛» «؟» and guillemets «».

## Urdu

- **Nastaliq** is the expected reading style (Noto Nastaliq Urdu, Gulzar). It is tall and slanted along the baseline:
  - body line height is at least 2.2 (SC-03);
  - it needs generous block padding;
  - it may need larger sizes (18 to 20px for body text).
- A Naskh face is acceptable for dense UI where Nastaliq will not fit. Say so in the direction.
- **Letters:** Urdu uses ے ہ ھ ٹ ڈ ڑ ں. Verify coverage.
- **Digits:** Urdu commonly uses Western or Extended Arabic-Indic digits; decide and pin.

## Pashto, Kurdish (Sorani), Sindhi, Uyghur

- Extended letters (ښ ږ ځ څ for Pashto; ێ ۆ ڵ ڕ for Sorani; many for Sindhi). Choose Noto or SIL families with verified coverage (Scheherazade New, Harmattan, Lateef for Sindhi).
- Set `lang` precisely (`ps`, `ckb`, `sd`, `ug`) so that fonts and shaping select the right forms.
