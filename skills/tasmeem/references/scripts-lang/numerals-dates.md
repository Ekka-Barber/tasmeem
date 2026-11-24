# Numbers, plurals, dates and local formats

## One formatter, one policy

Every number a user sees goes through `Intl`. Never concatenate digits, separators or currency symbols by hand.

```js
const locale = 'ar-SA-u-nu-latn-ca-gregory'   // or -nu-arab; the choices live in the tag
const num = new Intl.NumberFormat(locale)
const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'SAR' })
const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
const plural = new Intl.PluralRules('ar')
```

**Put `nu` and `ca` in the locale tag, not in the options.** In V8 (Chrome, Node) `formatRange` ignores the `numberingSystem` option: `new Intl.NumberFormat('ar-SA', { numberingSystem: 'latn' }).formatRange(10, 20)` prints «١٠–٢٠», while `new Intl.NumberFormat('ar-SA-u-nu-latn').formatRange(10, 20)` prints `10–20` (checked in Node 24, ICU 78, November 2026).

- **Pin `numberingSystem` and `calendar`.** Defaults differ by locale and by ICU version: some Arabic locales resolve Arabic-Indic digits, others Western, and some engines resolve a Hijri calendar for `ar-SA`. Pinning makes the output deterministic across browsers and the server.
- **Digit policy:**
  - Both digit systems are correct Arabic.
  - Western digits are now the common choice in Arab interfaces and finance; Arabic-Indic digits remain common in publishing and in parts of the Levant, Egypt and the Gulf, often side by side with Western ones. Neither is "more Arabic".
  - Choose one per product, and use it for prices, dates, validation messages and examples alike (SC-07).
- **Input:** accept both Arabic-Indic ranges, and normalise them before parsing. `/\d/` does not match «٣», `Number('٣')` is `NaN`, and `<input type="number">` is the wrong control for most of these fields; use a text input with `inputmode="numeric"` or `"decimal"` (SC-23):
  ```js
  const toLatinDigits = s => s
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x0660)
    .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 0x06f0)
    .replace(/\u066B/g, '.')          // Arabic decimal separator ٫
    .replace(/[\u066C\u060C,]/g, '')   // Arabic thousands separator ٬ and commas
  ```
  Check for an empty string before `Number()`: `Number('')` is 0, not an error. `pattern="[0-9]*"` rejects «٣» as surely as `\d` does.
- **A middle dot next to Arabic-Indic digits reads as zero:** «٣·٥» looks like «٣٠٥». Use «٫» for decimals and a word or a dash for separators.

## Plurals

`Intl.PluralRules` categories differ per language. Write a string for every category the language uses.

| Language | Categories |
|---|---|
| Arabic | zero, one, two, few, many, other: few and many by n mod 100 (3–10 few, 11–99 many, so 103 is few, 111 many, 101 other) |
| Persian | one, other (the noun stays singular after a number: «۳ کتاب») |
| English | one, other |

Arabic forms for "file": «لا ملفات» / «ملف واحد» / «ملفان» / «3 ملفات» / «11 ملفاً» / «100 ملف».

## Calendars and weeks

- Pin the calendar: `gregory`, `islamic-umalqura` (the Saudi civil Hijri) or `persian` (Solar Hijri, Iran and Afghanistan). Show both calendars where the audience expects it (Saudi government services often do).
- Month names depend on the locale, not only on the language. Arabic Gregorian months are «يناير، فبراير…» in the Gulf and Egypt, «كانون الثاني، شباط…» in the Levant and Iraq. `Intl` handles this when the locale includes the region.
- **Week start and weekend:**
  - It differs inside the Arab world. CLDR 48 (November 2026): **Sunday** for Saudi Arabia (`ar-SA`); **Saturday** for Egypt, Kuwait, Qatar, Bahrain, Oman, Jordan, Iraq, Algeria, and Iran; **Monday** for the UAE, Lebanon, Morocco and Tunisia.
  - Weekends are Friday–Saturday in Saudi Arabia and most of the Gulf, Saturday–Sunday in the UAE since 2022, and Friday in Iran.
  - Never hard-code it. Read `new Intl.Locale(tag).getWeekInfo?.() ?? new Intl.Locale(tag).weekInfo` (`firstDay` 7 is Sunday), with a table fallback for old engines.
- **Two calendars on one page:** mark them, «١٤ جمادى الآخرة ١٤٤٨ هـ» and «٢٤ نوفمبر ٢٠٢٦ م». `Intl` adds «هـ» to `islamic-umalqura` dates; add «م» yourself. Gregorian is the default for services and deadlines; Hijri for religious occasions, and wherever the audience expects both (Saudi government services often show both).
- **Time of day:** `dayPeriod: 'long'` gives «٩:٠٠ صباحًا»; the default gives the abbreviation «ص», which reads as a typo to many.
- **Pass a `timeZone`** (for Saudi Arabia, `Asia/Riyadh`) on every date the server renders: without it, the server and the browser can show different days, and hydration fails.
- **Hijri arithmetic:** never pass a Hijri string to `new Date()`, and never add "30 days" to a Hijri date: convert, compute in Gregorian, convert back. Mark Ramadan and Eid dates «متوقع» until announced. Month names differ between libraries («ربيع الآخر» or «ربيع الثاني»): keep one list of your own. In .NET, use `UmAlQuraCalendar`.
- **Regional formats:** Maghreb locales (`ar-MA`, `ar-TN`, `ar-DZ`, `ar-LY`) group digits with dots and use a decimal comma (`1.234.567,89`) and French-derived month names («جانفي», «فيفري»). Do not reuse a Gulf format for them.
- **Honour an explicit calendar.** If the user or the product chose `ar-SA-u-ca-islamic-umalqura`, keep it; pin `gregory` only when no calendar was chosen.

## Currency

- Let `Intl` place the symbol and the decimals: Arabic locales place it after the amount and add bidi marks, and the Kuwaiti dinar, Bahraini dinar, Omani rial, Jordanian dinar, Iraqi dinar, Libyan dinar and Tunisian dinar use **three** decimals. `toFixed(2)` on money is a bug for them (QA-10).
- **Currency in copy you write.** The UAE government writes «1,500 درهم» in Arabic and «AED 1,500» in English, never «د.إ 1500». `currencyDisplay: 'name'` gives the long form («1,500.00 درهم إماراتي»); trim the decimals with `maximumFractionDigits` when the amount is whole.
- **Saudi riyal sign.** U+20C1 «⃁» is in Unicode 17.0 (2025), but CLDR still formats SAR as «ر.س.‏», so `Intl` never prints the new sign, and most Arabic UI fonts (IBM Plex Sans Arabic, Noto Sans Arabic, Readex Pro, Cairo, Tajawal, Almarai, Vazirmatn) lack the glyph. When the brand wants the sign, swap it in and give it a font of its own:
  ```js
  const sar = new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', numberingSystem: 'latn' })
  const price = (v) => sar.formatToParts(v).map((p) => (p.type === 'currency' ? '\u20C1' : p.value)).join('')
  ```
  ```css
  @font-face { font-family: Riyal; src: url(/fonts/riyal.woff2) format("woff2"); unicode-range: U+20C1; }
  body { font-family: "IBM Plex Sans Arabic", Riyal, sans-serif; }
  ```
  Check the glyph in the render check (SC-04). Never use U+FDFC «﷼» for it, and never draw it with an image model. Unicode 18.0 adds signs for the UAE dirham (U+20C3) and the Omani rial (U+20C4); the same pattern applies once fonts carry them.
- Price display: tabular figures (TY-20); no fake precision (CP-07).

## Names, addresses, phone numbers

- **Saudi national address** (Saudi Post / SPL): building number 4 digits, additional number 4 digits, postal code 5 digits, plus street, district and city. Accept the short address (4 letters and 4 digits, such as `RCTB4359`) as an alternative. Normalise the digits and uppercase the letters before validating:
  ```js
  const building = /^\d{4}$/, additional = /^\d{4}$/, postal = /^\d{5}$/, short = /^[A-Z]{4}\d{4}$/
  ```
- **Saudi sign-in with Nafath:** ask for the national ID or Iqama number, show the request number large with a countdown, and tell the user to approve it in the Nafath app. Never ask for a Nafath password: there is none. (Pattern from public summaries of the SDAIA integration guide; confirm against the official guide before building.)

- **Names:** a single "full name" field unless the service needs the parts. Do not assume "first/last". Allow Arabic, Persian and Latin characters, spaces, hyphens and apostrophes.
- **Addresses:** follow the country format. Saudi national address: building number, street, district, city, postal code, additional number. UAE: often no postal code. Iran: province, city, street, alley (کوچه), plate number, 10-digit postal code.
- **Phone:** store E.164; accept the local form, `+` and `00` prefixes, spaces and dashes, and both digit systems.

## More of `Intl` worth using

```js
new Intl.ListFormat('ar', { type: 'conjunction' }).format(['أ', 'ب', 'ج'])   // «أ وب وج»
new Intl.RelativeTimeFormat('ar', { numeric: 'auto' }).format(-1, 'day')       // «أمس»
[...new Intl.Segmenter('ar', { granularity: 'grapheme' }).segment(s)].length    // characters as users count them
new Intl.Locale('ar-SA').getTextInfo?.().direction                            // 'rtl'
num.formatRange(10, 20)                                                          // ranges in the right bidi order
```

- **Counters and truncation** go by graphemes, not code units: «مَرْحَبًا» is 9 code units and 5 letters.
- **Ranges** go through `formatRange`. Arabic-Indic digits and Western digits have different bidi classes, so «١٠–٢٠» and «10–20» order differently when built by hand.
- **Negative numbers carry marks.** `Intl` adds LRM (U+200E) or ALM (U+061C) around the minus. Strip `[\u200E\u200F\u061C]` before parsing or comparing formatted strings.
- **Ordered lists** follow the digit policy: `list-style-type: arabic-indic` (or `persian`) when the product uses Arabic-Indic digits.
- **Locale on every call.** `toLocaleString()` with no arguments, or `new Intl.NumberFormat()`, formats with the server's locale on the server and the visitor's in the browser, so the hydrated page changes its digits (QA-10).

## Sorting and search

- Sort with `Intl.Collator(locale)`, never with a code-point `sort()`. `new Intl.Collator('ar', { sensitivity: 'base', ignorePunctuation: true })` also treats أ and ا as equal and ignores tashkeel and tatweel when comparing.
- For Arabic search, normalise alef forms (أ إ آ → ا), taa marbuta and haa (ة/ه), alif maqsura and yaa (ى/ي), and strip tashkeel and tatweel before matching.
