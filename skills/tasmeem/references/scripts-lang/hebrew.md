# Hebrew (he)

- **Direction:** RTL. Everything in [bidi.md](bidi.md) applies, including mirroring and LTR islands.
- **No italics** (SC-02). Hebrew has no case, so no text transforms.
- **Tracking:** Hebrew letters do not join, so light tracking on short display labels is acceptable. Keep body text at 0.
- **Line height:** 1.5 for body text; more (1.8 or higher) when niqqud (vowel points) or cantillation marks are present.
- **Type:**
  - Open families: Noto Sans Hebrew, Noto Serif Hebrew, Rubik, Assistant, Heebo, Frank Ruhl Libre (serif), Secular One (display), IBM Plex Sans Hebrew.
  - Hebrew letters sit on a shorter x-height than most Latin faces. Balance the Latin partner with `size-adjust`.
- **Niqqud:** only in texts that need it (children's, liturgical, poetry, ambiguous words). Choose a font that positions it properly.
- **Punctuation:** Latin marks, placed in RTL. The geresh (׳) and gershayim (״) mark abbreviations and numerals in formal typesetting.
- **Numbers:** Western digits; Hebrew numerals (letters) only in liturgical or traditional contexts. The week starts on Sunday; the weekend is Friday–Saturday. `calendar: 'hebrew'` where the Hebrew date matters.
- **Plural and gender:** Hebrew verbs and adjectives agree in gender. Decide an address strategy (masculine generic, slash forms, or neutral infinitive constructions) and apply it consistently.
- **Reflex to avoid:** blue-and-white flag stripes and Star of David ornaments on products that are not about national identity.
