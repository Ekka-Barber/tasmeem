# Bidirectional text

Most RTL bugs are bidi bugs: text in the right language, placed in the wrong order.

## The model in one paragraph

Every paragraph has a base direction (from `dir`). Strong characters (letters) have their own direction; neutral characters (spaces, punctuation, digits in some contexts) take the direction of their neighbours. When a neutral sits between an Arabic run and a Latin run, the base direction decides where it goes. That is why "(Beta)" loses a parenthesis to the other side and why a phone number's `+` jumps to the end.

## Isolation, the fix for almost everything

| Case | Markup |
|---|---|
| A known-LTR token inside RTL text (a product name, email, URL, code) | `<span dir="ltr">iPhone 17 Pro</span>` (the `dir` attribute isolates) |
| User content of unknown direction | `<bdi>{name}</bdi>`, or `dir="auto"` on the element |
| An inline span that must keep its own direction | `unicode-bidi: isolate` (implied by `dir` on the element) |
| A plain string with no markup possible (a `<title>`, an `aria-label`, a `placeholder`, an `<option>`, a toast, a push notification) | U+2068 FSI (or U+2066 LRI) … U+2069 PDI around the token. Prefer isolates to bare LRM/RLM marks: marks leak into copied text and fix only one neutral at a time |

- Put `dir="ltr"` on **inline** elements for short runs. On a block it also flips the alignment, which is right for a whole English paragraph of three lines or more (it should align to its own language) and wrong for a one-line label inside an Arabic layout. All items of one list share one alignment.
- `Intl` output for Arabic locales already includes the marks it needs. Never wrap a formatted Arabic amount or date in `dir="ltr"` or `<bdi dir="ltr">`: the wrapper fights the formatter.
- **Latin-only labels inside RTL** lose their punctuation to the wrong side: `Gregorian:` renders as `:Gregorian`, and `1,234.50 (AED)` as `(AED) 1,234.50`. Wrap the label with its colon, or the amount with its unit, in `<bdi>`.
- **`dir="auto"` looks only at the first strong letter.** An Arabic message that starts with "WhatsApp" or "npm" is laid out LTR. For chat, comments and AI output, use `unicode-bidi: plaintext` on the paragraph (each paragraph finds its own direction), or decide from the majority of letters, or set `dir` from the known language.

## Inputs

- Email, URL, phone, code, IBAN and password inputs: `dir="ltr"`. Keep the placeholder direction consistent with the value.
- Free-text inputs: `dir="auto"`, so the field follows what the user types.
- An icon, button or prefix overlaid on an input must share the input's direction context, or be positioned with physical properties together with a comment explaining why. Logical properties resolve per element: an LTR input with `padding-inline-end` and an RTL-inherited toggle at `inset-inline-end` end up on opposite sides.

## Layout mirroring

**Mirror:**
- the reading flow, alignment and the navigation order;
- directional icons;
- progress and sliders;
- carousels and their controls;
- the breadcrumb separators;
- the drawer side;
- the position of "next" and "previous";
- asymmetric decorations that point "forward".

**Do not mirror:**
- photographs, logos and brand marks;
- media controls: play, pause, skip and the playback progress bar always run left to right;
- circular-time icons (clock, refresh, history), the search magnifier, the slash in "off" icons, keyboards, checkmarks, and a pen, which keeps its angle;
- icons containing letters or digits;
- keyboard shortcut glyphs;
- maps.

**Reverse in RTL:** numbered scales and steppers (a 1–5 rating, an NPS 0–10 row, pagination dots, a lowest-to-highest scale) start at the right. The digits inside each number never reverse.

## Numbers inside RTL

- Digits are weak LTR runs: "٢٠٢٦/٠٩/٢٨" and "2026/09/28" both need care around slashes and dashes. Prefer `Intl.DateTimeFormat` output to hand-built strings.
- Ranges and units: «من ٣ إلى ٥ أيام», «250 كم». Keep a no-break space between a number and its unit.
- Phone numbers inside Arabic sentences: wrap them in `<span dir="ltr">`, or begin them with an LRM.

## Testing

- Test the whole UI with `dir="rtl"` on `<html>` and real Arabic strings (not reversed English).
- Include mixed strings: a brand name at the start and at the end of a sentence, a parenthesised Latin word, a phone number, a price with a currency, an email in an error message.
- Check the caret and selection behaviour in the inputs.
