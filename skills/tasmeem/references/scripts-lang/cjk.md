# Chinese, Japanese, Korean

## Shared

- **Set `lang` precisely:** `zh-Hans`, `zh-Hant`, `ja`, `ko`. The same code points render with different glyph shapes per locale (Han unification), and the font fallback depends on `lang`. Japanese text tagged `zh` shows Chinese glyph forms: a defect native readers see at once.
- **Fonts are large.** Use variable fonts or subsets (`unicode-range` slices such as Google Fonts' CJK slicing), preload nothing heavy, and rely on well-chosen system fallbacks:
  - Japanese: `"Hiragino Sans", "Yu Gothic UI", "Noto Sans JP"`;
  - Chinese (Simplified): `"PingFang SC", "Microsoft YaHei", "Noto Sans SC"`;
  - Korean: `"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR"`.
- **Open families:** Noto Sans / Serif CJK (SC, TC, JP, KR), Source Han; for Korean, Pretendard and Nanum; for Japanese, M PLUS, Zen Kaku Gothic, BIZ UDGothic and Shippori Mincho (display). Test at small sizes.
- **No italic, no faux bold.** Use weights that exist; emphasis marks (`text-emphasis`) where the language uses them.
- **Line height:** 1.7 to 1.8 for body text; 1.3 or more for headings. Measure: 30 to 40 characters per line for reading.
- **Tracking:** 0 for body text. A slight positive tracking (0.02 to 0.05em) can suit short Japanese headings. No negative tracking.
- **Mixing with Latin:**
  - `text-autospace: normal` (where supported) or a manual thin space between CJK and Latin or digits;
  - a Latin partner whose weight matches the CJK face's colour;
  - Latin words set in the Latin face, not in the CJK font's Latin glyphs, unless those were designed together.
- **Punctuation:** full-width marks; `text-spacing-trim` to avoid doubled spacing where brackets meet; opening brackets never at a line end.

## Japanese

- `line-break: strict` prevents lines starting with small kana (ゃ ゅ ょ っ), the prolonged sound mark (ー) or closing brackets (kinsoku shori).
- `word-break: normal`. Never `break-all` on running text. Japanese breaks between characters, with kinsoku applied.
- Vertical writing (`writing-mode: vertical-rl`) is a real design option for editorial and brand moments. Use `text-orientation: mixed`; Latin and digits need `text-combine-upright` for short runs.
- Ruby (`<ruby>`) for readings on names and rare kanji.

## Chinese

- Simplified and Traditional are different audiences: never mix them.
- Justification with `text-align: justify` is standard in Chinese long-form text and acceptable there.
- Punctuation position differs between Simplified (bottom-left) and Traditional (centred); the `lang` tag selects the right glyphs.

## Korean

- Korean uses spaces between words. Use `word-break: keep-all`, so that lines break at spaces and not inside words.
- Hangul looks heavier than Latin at the same weight: step the Hangul weight down, or the Latin weight up.

## Reflexes to avoid

- **Japan:** torii gates, cherry blossom, red suns and brush-stroke "zen" motifs on products that are not about them.
- **China:** red and gold dragons, lanterns.
- **Korea:** generic "K-pop" neon.
