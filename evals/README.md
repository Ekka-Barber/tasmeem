# Evals: before and after

The before/after images in the README come from here, and only from here. Each brief runs twice in a fresh headless session:

| Variant | How it runs |
|---|---|
| **before** | `claude -p --disable-slash-commands`: no skills at all, the model's defaults |
| **after** | `claude -p` with tasmeem installed and named in the prompt (comp-led when Higgsfield is available, within the brief's credit budget) |

Both variants get the same brief, the same model and the same facts. The businesses are fictional; every fact the page needs (names, prices, hours) is supplied in the brief, so neither variant has to invent content.

## Run

```bash
node evals/run.mjs --brief ar-roastery --variant before     # one run
node evals/run.mjs --all                                    # every brief, both variants (long; costs usage and credits)
node evals/score.mjs                                        # scan + render every run, screenshots → docs/before-after/
```

- Outputs go to `evals/runs/<brief>/<variant>/` (git-ignored) with the full transcript (`transcript.json`).
- `score.mjs` runs tasmeem's `scan` and `render` on each `index.html`, writes `evals/results.md` (P0/P1/P2 before and after, per brief) and the screenshots at 1440×900 and 390×844.
- Nothing is cherry-picked: every brief in `briefs/` is run and reported, including the ones where the baseline does well.

## Status

Only `ar-roastery` has been run (the pilot); its results are in `results.md` and the README. The other briefs are ready for later runs.

## Briefs

| Id | Language | Surface | Trap it tests |
|---|---|---|---|
| `ar-roastery` | Arabic | landing page for a Riyadh roastery | cream-and-serif, the Arabic costume, tracked Arabic |
| `ar-barber` | Arabic | booking page for a barbershop | forms, RTL inputs, digits, plurals |
| `ar-bindery` | Arabic | brand + home for a Jeddah bookbinding studio | brand from the subject's world, calligraphy in images |
| `en-devtool` | English | landing page for a database migration CLI | purple gradient, bento, stat strip, fake terminal |
| `fa-bookstore` | Persian | a poetry bookstore in Shiraz | ی/ک, ZWNJ, Nastaliq vs Naskh, Persian digits |
