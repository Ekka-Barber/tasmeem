# Contributing

Thank you for helping. The most useful contributions are new tells with evidence, better phrase lists for Arabic and Persian, and fixes to facts that have changed.

## Adding a tell

1. **Check it is not already there.** Search `skills/tasmeem/references/tells/` for the pattern and its synonyms.
2. **Write the entry** in the category file, in the existing format:
   ```
   ### CM-25 · Short name · P1 · scan render
   What it looks like, in one or two sentences.
   **Why:** why it reads as generated.
   **Fix:** the concrete move.
   **Allowed:** when it is not a tell.
   **Sources:** the source keys (see tells/README.md).
   ```
   A tell flagged by one source only is never P0, unless it is an accessibility or honesty failure.
3. **If it can be detected,** add the rule to `skills/tasmeem/scripts/lib/scan.mjs` (or a phrase to `scripts/data/copy-tells.json`), and add a test in `tests/` with **one input that triggers it and one that does not**. False positives cost more trust than missed tells.
4. Run `npm test`. The clean fixture must stay clean.

## Facts about scripts and browsers

Claims about Unicode, CLDR, `Intl` output or browser support need a primary source (Unicode, CLDR, MDN browser-compat-data, W3C) or a reproducible command. Write the date you checked it: support tables age.

## Style

- Plain words, short sentences, one idea per sentence. The copy tells apply to this repository too.
- Rules are written in tasmeem's own words. Credit the source in the **Sources** line and in `CREDITS.md`; do not paste text from other projects.
- No new runtime dependencies in `scripts/`. Playwright stays optional.
