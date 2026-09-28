# tasmeem: build plan and status

tasmeem («تصميم», "design") is an Arabic-first design skill for coding agents. It builds, audits and polishes interfaces that do not read as machine-made, in Arabic, Persian and English, and it can produce real image assets through Higgsfield and `/rasm`.

This file is the plan of record across sessions. Update the status table whenever a step finishes.

## Principles

- **A router, not an encyclopedia.** `SKILL.md` stays short. It routes to one mode and to the references that mode needs. Everything else is loaded only on demand.
- **Evidence over opinion.** Every tell a script can detect is detected by `scripts/tasmeem.mjs`. Judged tells are labelled as judgment.
- **One rulebook, no contradictions.** The rulebook merges twelve sources. Where they disagree, tasmeem decides once and records the decision. A brand's own documented choices (in `DESIGN.md` or `PRODUCT.md`) override the taste rules, never the accessibility or honesty rules.
- **The language first.** Arabic first, then Persian and English, each with its own typography rules. Rules are scoped to the language actually present.
- **Author the assets, never fake them with chrome.** Photographs, textures and illustrations come from real generation (Higgsfield, `/rasm`) or from the user. Gradients and glass never stand in for them. Text inside images is never trusted: text is set in code.
- **Own words.** Rules are rewritten, not copied. Credits for every source are in `CREDITS.md` and `NOTICE`.
- **Zero dependencies.** Node 18+ runs everything. Playwright is optional (for render checks) and so is the Higgsfield CLI (for assets).

## Structure

```
skills/tasmeem/
  SKILL.md                  router: read the brief, pick a mode, load references, gate the output
  references/core/          direction, honesty, brand overrides, the delivery gate
  references/tells/         the numbered catalog of machine-made tells, by category
  references/scripts-lang/  Arabic, Persian, English, bidi, numerals and dates, punctuation
  references/craft/         typography, colour, layout, components and states, forms, a11y, performance
  references/motion/        principles, tokens, scroll and view transitions, reduced motion, audit, video
  references/brand/         identity, palette, marks, patterns
  references/assets/        comp-led pipeline, Higgsfield, rasm, prompts, provenance
  references/modes/         build, audit, polish, redesign, study, brand, assets, motion, copy
  scripts/tasmeem.mjs       the CLI: scan, built, render, contrast, tokens, fonts, report, doctor, higgs
  templates/                report and DESIGN.md templates
tests/                      node:test suites and fixtures
evals/                      briefs, runner, grading
docs/                       before/after images and media for the README
```

## Status

| # | Step | State |
|---|---|---|
| 0 | Skeleton, plan | done |
| 1 | Tells catalog (merged, numbered, own words) | done: 169 tells, 10 categories (TY-24 added from the pilot; SC-13/14 retired with the language scope) |
| 2 | Language guides (Arabic first) | done: Arabic, Persian, English, bidi, numerals and dates, punctuation |
| 3 | Craft, motion, brand, assets and core references | done |
| 4 | Modes and `SKILL.md` router | done: validated with skill-creator quick_validate |
| 5 | `tasmeem.mjs` scanner and tests | done: 96 tells detected; 15 tests; calibrated on a private production Arabic site (157 files: 6 findings, no false positives left) |
| 6 | Higgsfield and rasm adapter, with a cost gate | done: gen used live in the pilot (6.5 credits); recovery of charged-but-errored jobs added |
| 7 | Evals, before/after images | pilot done (ar-roastery: before 2·9·1, after 0·8·0); owner stopped further runs for now |
| 8 | README (EN and AR), CREDITS, NOTICE, packaging, release | done for v0.1: before/after from the pilot; awaiting owner review |

## Decisions (owner, 2026-09-28)

- Name: tasmeem. The repo is public.
- Before/after images come from real runs, inspired by impeccable's Neo Mirai case (a generated mockup, then generated assets, then working code). Assets are generated with Higgsfield.
- Done means fully satisfying to the owner. Only then is tasmeem used to audit the owner's client work.
- 2026-09-28, after the pilot: stop the evals at the pilot; limit the languages to Arabic, Persian and English for now (the other guides live in git history). The remaining briefs (ar-barber, ar-bindery, en-devtool, fa-bookstore) stay in `evals/briefs/` for later.
