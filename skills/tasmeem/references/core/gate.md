# The delivery gate

No work is delivered until the gate has run and its result is shown. The gate is evidence, not a promise.

Findings fall into three tiers, so that the gate blocks what must block and nothing more:

| Tier | What | Effect |
|---|---|---|
| **Floor** | every P0; any P1 in `QA-`, `CM-21`, `SC-01`…`SC-10`, `SC-20`, `SC-22`; honesty (CP-07, CP-08) | blocks delivery; no brand exception covers it |
| **Reflex** | the other P1 taste tells | fix it, or keep it on the record with the `DESIGN.md` line or the reason that allows it |
| **Finish** | P2 | listed; fixed when the area is touched; never blocks |

## 1. Measure

Run what the environment allows, strongest first:

```sh
node <skill>/scripts/tasmeem.mjs render <url> --widths 360,390,768,1024,1440 --json   # needs Playwright
node <skill>/scripts/tasmeem.mjs built <dir-of-html> --json                           # a static build
node <skill>/scripts/tasmeem.mjs scan <src-paths> --json                              # always possible
node <skill>/scripts/tasmeem.mjs kept <old-src> <new-src>                              # redesigns: nothing dropped
```

- The `render` check is the only one that sees computed styles, real fonts, contrast on real backgrounds, overflow and console errors. When it cannot run, say so, and mark the render-only tells as **unverified**.
- **A zero that was not read is not a pass.** `scan` exits 2 when it found nothing it can read. Report which channels ran ("render ✓ built – scan ✓"), never a total alone.

## 2. Look, and click

Capture screenshots at **390 and 1440** at least, plus 360 for overflow and 768 and 1024 for layouts that change there, in every theme shipped, with and without reduced motion for motion work. Let motion settle before each capture, and open every screenshot you cite: an image you did not look at is not evidence.

**Click through.** Operate every control on the surface once: every link and button, each menu and dialog open and closed with the keyboard, each form submitted empty, wrong and right. Capture the states a reader can reach: open, hover, focus, error, empty, loading, and an overlong string in the tightest slot. A control that does nothing is CM-21, a Floor finding.

Review against:
- the direction (does the first screen show the signature?);
- the `eye` tells in `tells/` (sameness, the silhouette, reflex choices);
- the writing systems present (the checklist of each script guide).

## 3. Fresh eyes

The builder is the worst judge of the build. When subagents are available, hand the screenshots, the URL and the brief to a reviewer that did **not** see the build conversation (a fresh agent, not a fork), together with `references/modes/critique.md`. Give it the measured findings only *after* it has written its own judgment, so the numbers do not anchor it.

It returns one disposition:
- **ship** (nothing Floor or Reflex open);
- **fix** (named items, small);
- **rebuild** (the structure is the template, SY-10 or LA-01: go back to the direction);
- **recapture** (the evidence is bad: blank screenshots, motion caught mid-flight, the wrong page).

Without subagents, do the pass yourself after a break in context: re-read only the brief and the screenshots, not your own build notes.

## 4. Report

```
GATE · ‹target› · ‹date›
Ran: render ✓ (5 widths) · built ✓ · scan ✓ · kept – · click-through ✓ (14 controls) · fresh eyes ✓ (fix)
Floor: 0 · Reflex: 2 open, 1 kept on record · Finish: 5
Kept on record: CO-03 (DESIGN.md §Colour: the sand ground is the brand colour)
Open:
  P1 TY-05 eyebrow above section titles, src/components/Section.tsx:14
  P1 SC-10 phone number not isolated in the Arabic footer, src/components/Footer.tsx:31
Judged (eye): no sameness findings; the signature (woven band) is present at 390 and 1440.
Verdict: PASS with 2 Reflex items listed | FAIL
```

- **FAIL** if any Floor finding remains, or render could not run on a surface that has motion or non-Latin text and no one accepted that risk.
- **PASS with list** otherwise. List every open item. Never hide a finding by relabelling it.
- **Kept on record** items name the `DESIGN.md` or `PRODUCT.md` line, or the stated reason, that keeps them. Five or more kept items on one surface means the direction is the problem, not the items.

## 5. Bounded verification

Build fully, measure once, fix everything the measurement shows in one batch, and measure once more. A third round is allowed only for Floor findings. Then stop and report. Open-ended self-polishing burns the user's money and drifts away from the direction. If the last measurement still shows Floor findings, report them and ask how to proceed.

## Automate it (optional)

In Claude Code, the scanner can run after every edit and hand P0 findings straight back to the agent. Add to the project's `.claude/settings.json`:

```json
{ "hooks": { "PostToolUse": [{ "matcher": "Edit|Write|MultiEdit",
  "hooks": [{ "type": "command", "command": "node <skill>/scripts/tasmeem.mjs scan --hook" }] }] } }
```

It reads the edited file from the hook event, stays silent when the file is clean, and exits 2 with the findings when it is not. In CI, `scan <paths> --github` prints the findings as pull-request annotations.
