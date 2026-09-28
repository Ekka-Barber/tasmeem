# Thai, Lao, Khmer, Myanmar

- **No word spaces.** Words run together, and spaces mark phrases or sentences. Line breaking needs the browser's dictionary, which only works with the correct `lang` (`th`, `lo`, `km`, `my`).
  - Never `word-break: break-all` or `overflow-wrap: anywhere` on body text (SC-14): they split syllable clusters.
  - For controlled strings (a short label), a zero-width space (U+200B) can mark allowed breaks.
- **Stacked marks.** Vowels and tone marks sit above and below the base consonant, sometimes two deep.
  - Body line height: 1.7 to 1.9 for Thai, Lao and Khmer; 1.9 or more for Myanmar.
  - Never clip them (SC-15). Test with the tallest syllables.
- **No tracking, no italics, no case.**
- **Type (open):**
  - Thai: Noto Sans Thai / Noto Serif Thai (looped), Noto Sans Thai Looped, IBM Plex Sans Thai, Sarabun, Prompt, Kanit, Anuphan, Bai Jamjuree.
  - Khmer: Noto Sans Khmer, Kantumruy Pro.
  - Myanmar: Noto Sans Myanmar, Padauk.
  - Loopless and looped Thai faces carry different registers: loopless (modern headlines, UI), looped (formal body text, government). Choose deliberately.
- **Size:** Thai at the same `font-size` as Latin often looks smaller. Balance with `size-adjust` or a size step.
- **Myanmar:** use Unicode-encoded text and fonts (not Zawgyi). Check that user input is Unicode. Zawgyi-encoded input still circulates in some regions and needs detection and conversion.
- **Calendar:** Thailand uses the Buddhist era (`calendar: 'buddhist'`, year + 543) in many contexts. Pin it or show both.
- **Numbers:** Thai digits (๐–๙) exist but Western digits are standard in interfaces.
