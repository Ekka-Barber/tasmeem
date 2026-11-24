# Bilingual sites: switching, URLs and search

For products that ship Arabic (or Persian) and English side by side. Sources: Google Search Central (localized versions), the U.S. Web Design System language selector, and the UAE design system content guidelines, read in November 2026.

## The switch

- **One switch**, in the header utility area, and again in the mobile menu. On an RTL page it sits at the top left with the other utilities.
- **Labelled with the target language's own name:** «English» on the Arabic page, «العربية» on the English page. Put `lang` on the label so screen readers pronounce it right:
  ```html
  <a href="/en/menu" lang="en" hreflang="en">English</a>
  ```
- **No flags** (Arabic is the language of twenty-odd countries; English is not the United Kingdom), and no bare `EN` / `AR` codes (SC-25).
- **It lands on the same page** in the other language, with the same scroll context where possible. Never on the home page, never on a 404. If a page has no translation, say so on the page and link to the nearest one.
- **Both languages carry the same content** and are updated together. A shorter English site is a decision to write down, not an accident.

## URLs

- **One URL per language:** `/ar/…` and `/en/…` (or a subdomain). Not `?lang=en`, not a cookie: search engines and shared links cannot see a cookie.
- **No automatic redirect** by IP address or `Accept-Language`/`navigator.language`. Suggest the other language in a dismissible banner if you must, and remember the reader's choice.
- **One language per page.** Side-by-side translations on one URL confuse both readers and search.

## hreflang

Every version lists every version, itself included, and the targets link back:

```html
<link rel="alternate" hreflang="ar" href="https://example.sa/ar/menu">
<link rel="alternate" hreflang="en" href="https://example.sa/en/menu">
<link rel="alternate" hreflang="x-default" href="https://example.sa/menu">
```

- Codes are ISO 639-1, with an optional ISO 3166 region: `ar`, `ar-SA`, `en-GB`. A region alone, or `en_US` with an underscore, is invalid (QA-21).
- `x-default` points at the language picker, or the version for everyone else.
- Google detects the page language itself and ignores `<html lang>` for that purpose, but screen readers, fonts and hyphenation still depend on `lang`: set both.
- Add `og:locale` (`ar_SA`, here with an underscore, as Open Graph requires) and `og:locale:alternate` for social previews.

## The page itself

- `<html lang="ar" dir="rtl">` on the Arabic page and `<html lang="en" dir="ltr">` on the English page; never one shell with the direction switched by script after load (the first paint flashes in the wrong direction).
- Labels, `alt`, `title` and `aria-label` in the page language (QA-20).
- Dates, numbers and currency formatted for the page locale (`numerals-dates.md`), not copied from the other version.
