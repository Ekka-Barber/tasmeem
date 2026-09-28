# Latin, Greek and Cyrillic

These are the scripts most design advice was written for. What is easy to miss:

- **Coverage.** "Supports Latin" often means Basic Latin only. Check:
  - Vietnamese, which stacks diacritics (ầ ẫ ặ): use the `vietnamese` subset and extra line height (≥ 1.6);
  - Latin Extended for Polish, Czech, Turkish, Romanian (ș ț with a comma, not a cedilla) and the Baltic languages;
  - Greek and Cyrillic in the same family if the product serves them.
- **Case and `lang`.** `text-transform: uppercase` depends on `lang`:
  - Turkish `i` → `İ`;
  - German `ß` → `SS`;
  - Greek drops accents in capitals, and the browser does this only with `lang="el"`;
  - Dutch `ij` → `IJ` in capitalisation.
- **Hyphenation:** `hyphens: auto` works per `lang` and needs the language set. Use it with justified text and in narrow columns, especially for German, Finnish and Dutch, whose long compounds overflow (TY-22).
- **Length:** German, Finnish and Russian run 20 to 35% longer than English. Test controls and navigation with them (SC-17, LA-22).
- **Punctuation:** per language (see punctuation.md). French spacing, Spanish opening marks, German low-high quotes.
- **Cyrillic:**
  - Bulgarian forms differ from Russian in some fonts (`lang="bg"` selects them with `locl`);
  - italic Cyrillic letterforms differ (a cursive т looks like m);
  - check the italic before using it.
- **Greek:** the tonos accents are dropped in all-caps text, and many web fonts get this wrong without `lang="el"`.
- **Tracking:** Latin caps labels can take +0.04 to +0.08em. Lower-case text never takes positive tracking beyond about +0.01em.
- **Reflexes to avoid:** the whole AI default set in `tells/` (Inter, purple, cream-and-serif). For each country, the stock clichés too: the Eiffel Tower, Union Jack bunting, Mexican papel picado.
