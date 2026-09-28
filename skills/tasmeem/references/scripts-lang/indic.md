# Indic scripts

This guide covers Devanagari (Hindi, Marathi, Nepali, Sanskrit), Bengali, Gurmukhi (Punjabi), Gujarati, Odia, Tamil, Telugu, Kannada and Malayalam.

- **Shaping.** Indic scripts form conjuncts and reorder vowel signs. That needs a font with the script's OpenType shaping and correct `lang` (`hi`, `mr`, `bn`, `pa`, `gu`, `ta`, `te`, `kn`, `ml`). A font that "has the glyphs" but lacks the shaping produces broken syllables.
- **No tracking** (SC-01). In Devanagari, Bengali and Gurmukhi, letter-spacing breaks the headline bar (shirorekha) into dashes. The other scripts do not join the same way, but tracking still damages the syllables.
- **No italics, no case transforms** (SC-02, SC-08).
- **Line height:** 1.6 to 1.8 for body text. Above-base and below-base vowel signs need room, and Malayalam and Tamil stack tall.
- **Size:** Indic faces often need a larger `font-size` than Latin (about 1.1 to 1.2×) to reach the same readable size. Balance the pair with `size-adjust`.
- **Type (open):**
  - Noto Sans and Serif families for each script;
  - Mukta, Hind, Poppins, Tiro Devanagari (serif), Baloo (display, many scripts), Anek (variable, many scripts);
  - Hind Siliguri or Noto Sans Bengali for Bengali;
  - Mukta Mahee for Gurmukhi;
  - Catamaran or Noto Sans Tamil for Tamil.
- **Numbers:** most Indic interfaces use Western digits. Native digits (०१२३ for Devanagari) exist; pin `numberingSystem` if they are used (`deva`, `beng`…). Lakh and crore grouping: `Intl.NumberFormat('hi-IN')` formats 1,00,000 correctly.
- **Line breaking:** at spaces. `word-break: break-all` splits syllables. Hyphenation support is limited, so avoid justification.
- **Copy:** Hindi interface copy commonly mixes in English terms (Hinglish) for technology words. Decide a register and apply it consistently. Avoid Sanskritised officialese for consumer products unless the brand calls for it.
- **Reflexes to avoid:** mandalas, paisley and saffron-green-white stripes on products that are not about them.
