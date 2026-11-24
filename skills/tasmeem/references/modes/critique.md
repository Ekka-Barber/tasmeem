# Mode: critique

A judgment of how well a surface works for the people who use it. **Audit** counts defects with evidence; **critique** asks whether the design does its job. Run critique when the user asks "what do you think", "is this good", "review the UX", or as the fresh-eyes step of the gate. It edits nothing.

## 1. Frame it first

Write three lines before judging:
- **The job:** what the person on this screen is trying to decide or do, in one sentence.
- **The person:** pick one or two from the table below, the ones this product actually serves.
- **The surface type:** persuade, operate, read or experience (`core/direction.md` §5).

| Persona | Tests | Typical failure |
|---|---|---|
| **First-time visitor on a phone** | is the offer clear in one screen, with one thumb | the value is below the fold, behind a carousel |
| **Returning expert** | speed, density, keyboard paths | a wizard for a task done daily |
| **Arabic reader on an older Android** | script, fonts, digits, weight of the page | fallback fonts, bidi scramble, 4 MB of JavaScript |
| **Low vision or keyboard-only user** | contrast, focus order, zoom, targets | focus lost after a dialog closes |
| **Anxious or rushed user** (money, health, a deadline) | errors, undo, reassurance, honesty | a vague error, a destructive button with no name |

## 2. Score ten heuristics

Score each 0 to 4 (0 = absent or broken, 2 = adequate, 4 = exemplary), or `n/a` when it does not apply. One sentence of evidence each.

1. **Status is visible:** the user knows what is happening (loading, saved, sent).
2. **The words are the user's:** their vocabulary, their language and register, their units, their calendar.
3. **Control and undo:** an exit from every state; undo instead of "are you sure".
4. **Consistency:** one word, one icon and one place for one action.
5. **Errors are prevented** before they are reported.
6. **Recognition over recall:** options are shown, not remembered.
7. **Efficiency for the frequent user:** shortcuts, defaults, bulk actions.
8. **Nothing extra:** each element earns its place (the squint test: blur the screenshot; does the one thing that matters still stand out?).
9. **Recovery:** errors say what happened and how to fix it, in the page language.
10. **Help where it is needed:** inline, at the moment of doubt, not in a separate manual.

Total = sum ÷ (4 × applicable heuristics), shown as a percentage. Below 60% the surface needs rework, not polish.

## 3. Check the cognitive load

Answer yes or no; each "no" is a finding.
- One primary action per view, and it is visually primary.
- The first screen answers "what is this, and what do I do here?" without scrolling.
- Choices per decision: seven or fewer, grouped when more.
- Related things are near each other; unrelated things are apart.
- The reading order matches the visual order and the reading direction.
- Labels are nouns or verbs the user would say, not internal names.
- The happy path of the main task fits in the number of steps the job deserves. Count them.
- Nothing moves, blinks or autoplays while the user reads or types.

## 4. Report

```
# Critique · ‹surface› · ‹date›
Job: ‹one sentence› · Persona: ‹who› · Surface: ‹type›
Heuristics: 29/36 (81%) · Cognitive load: 6/8
Disposition: ship | fix | rebuild | recapture

What works (keep): ‹two or three specific things›
What to change, highest impact first:
1. ‹finding› · heuristic 3 · ‹evidence: screenshot or step› · ‹the move›
2. …
Considered and rejected: ‹changes you weighed and why they would not help›
```

- Every finding names the evidence: a screenshot, a step in the click-through, or a measured tell ID.
- "Considered and rejected" keeps the critique honest, and stops the next pass from proposing the same thing.
- Save the report as `.tasmeem/critique/‹surface›-‹date›.md`. **polish** reads the latest one as its backlog, and a later critique shows the trend against it.
