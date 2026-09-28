# Punctuation and spacing by language

| Language | Quotes | Nested | Question / comma | Spacing rules |
|---|---|---|---|---|
| Arabic, Persian, Urdu | «…» | "…" | ؟ ، ؛ | no space before marks; space after «،» |
| Hebrew | "…" (or ״…״ in formal typesetting) | '…' | ? , | Latin marks; RTL placement |
| English (US) | "…" | '…' | ? , | none before marks |
| English (UK) | '…' | "…" | ? , | none before marks |
| French | « … » | "…" | ? ! : ; | narrow no-break space (U+202F) before ? ! : ; and inside « » |
| German | „…“ | ‚…‘ | ? , | none before marks |
| Spanish | «…» or "…" | "…" | ¿…? ¡…! | the opening marks are mandatory |
| Italian, Portuguese | «…» or "…" | "…" | ? , | |
| Russian, Ukrainian | «…» | „…“ | ? , | |
| Chinese (Simplified) | "…" (full width) | '…' | ？，。 | full-width marks; no spaces around them |
| Chinese (Traditional), Japanese | 「…」 | 『…』 | ？、。 | full-width marks; Japanese uses 、 and 。 |
| Korean | "…" | '…' | ? , | spaces between words, like Latin |

## Shared rules

- **Ellipsis** «…» (U+2026), not three dots.
- **Dashes:**
  - an en dash (–) for ranges, with no spaces in English;
  - an em dash (—) only where the language uses it, and never sprinkled through interface copy (CP-05);
  - Arabic rarely uses the em dash.
- **No-break spaces** between a number and its unit (`10 MB`, «٥ كم»), inside French guillemets, and before a closing mark that follows a space.
- **Apostrophes** are curly (’) in running text.
- **Loading states** end with «…»: "Saving…", «جارٍ الحفظ…».
- **Encode punctuation as characters, not entities in logic**, and let the font render it. Check that the chosen font includes «» ؟ ، ؛ and the full-width CJK marks.
