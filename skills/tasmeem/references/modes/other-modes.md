# Other modes

## polish

A final pass inside an existing system, with no new direction.

1. Run the audit's measure step on the target, and read the latest `critique` report if there is one: it is the backlog.
2. Fix every P0 and P1 that is not a brand exception, plus the P2s in the touched files: states, focus, spacing rhythm, alignment, tabular figures, text wrapping, image outlines, concentric radii, press feedback.
3. Re-measure once, then report the before and after totals.

Keep the identity: polish never changes the palette, type or structure.

### bolder · quieter · distill

Three directions of polish, each inside the existing identity:
- **bolder:** the surface is safe and forgettable. Raise one dial, not all of them: enlarge the signature, commit the colour strategy one step (restrained → committed), give the display type more size contrast. The silhouette test from `core/direction.md` §8 must change.
- **quieter:** the surface shouts. Remove decoration before adjusting it: one accent, one elevation, one motion moment; demote everything that is not the primary action.
- **distill:** the surface does too much. List every element with its job in one line; cut the ones with no job, merge the ones with the same job. Report what was removed.

## redesign

Keep the content, information architecture, routes and brand; change the visual structure.

1. **Identity lock** (`core/direction.md` §1). Ask before replacing brand tokens.
2. Run the direction protocol with the current site as step 1's input. The reflex check must produce a different silhouette from the current one.
3. List the files to create, change and delete. Deletions need the user's explicit confirmation.
4. Copy the current source aside (or note the commit), build in place through the existing routes and components, then run `tasmeem.mjs kept <old> <new>`: every link, form field and heading the old version had must still exist, or appear in the report as a decision the user approved. Then gate.

## study ‹url | screenshot›

Extract the DNA of a design the user admires, not its pixels.

1. From a URL: read the HTML and CSS (the real fonts, colours, spacing, motion). From a screenshot: use `tasmeem.mjs palette <image>` for the colours; judge the type and structure by eye.
2. Report:
   - the macro-structure (the silhouette);
   - the type pairing and scale;
   - the colour strategy and anchors;
   - the density and rhythm;
   - the signature element;
   - the motion grammar.
3. Offer:
   - to build the user's own content with this DNA (hand-off to build);
   - or to write it as a `DESIGN.md` direction.
4. Never clone a live site's pixels, copy its assets or reproduce a paid template. Studying the principles is fine.

## brand

See `brand/identity.md`.

## assets

See `assets/pipeline.md`. It needs the Higgsfield CLI (or a native image tool) and the cost gate.

## motion

1. Measure: `tasmeem.mjs render <url> --motion` finds held reveals, layout-property animation, missing reduced-motion paths and long durations.
2. Judge against `motion/principles.md`: purpose, easing, duration, origin, orchestration.
3. For new motion, define the tokens first (`motion/techniques.md` §1), then one orchestrated moment per view.

## copy

Interface words in every language present.

1. List every interface string the agent owns: labels, buttons, errors, empty states, `alt`, metadata. Set aside the owner-supplied content.
2. Check them against `tells/copy.md` and the voice rules of the language guide (`scripts-lang/arabic.md` §9 for Arabic).
3. Rewrite the agent-owned strings, keeping each action's verb consistent through its flow. Plurals go through `Intl.PluralRules`.

## harden

Make an existing surface survive real use. No visual change unless a state is missing.

1. **States:** every component has its eight states (`craft/components.md`), and every view has its empty states: first use, cleared, no results, no permission, and error. Each empty state says what will be here and offers the one action that fills it.
2. **Content extremes:** the longest name, a 40-character German or Persian word, Arabic with tashkeel, a price with 7 digits, zero items, 10,000 items, a missing image. Nothing overflows, clips or wraps a button (LA-14, LA-22, SC-15).
3. **Network and errors:** slow, offline, 401, 403, 404, 409, 422, 429, 500; each gets a specific message in the page language and a next step. Optimistic updates roll back visibly on failure. Submit cannot double-send.
4. **Input:** paste, autofill, IME composition (Persian and Arabic keyboards), both digit systems, the on-screen keyboard covering the field (QA-18, QA-19, SC-23).
5. **Destructive actions** name the object on the button («احذف الفاتورة ١٢٤»), and offer undo where the data allows it rather than a confirmation dialog.
6. **The happy path budget:** count the clicks and fields of the main task. If the brief gives a budget, write it as a failing Playwright test first, then make it pass.

## adapt

Make a surface work on the device and context in front of it.

- **Pointer and input:** `@media (pointer: coarse)` for larger targets and no hover-only affordances (CM-14); keyboard paths for every gesture (QA-17).
- **The thumb zone:** primary actions within reach at the bottom on phones; nothing important under the home indicator (`env(safe-area-inset-*)`).
- **Middle widths:** every layout has a state between the phone and the desktop (LA-24); tables become stacked rows or a horizontal scroller with a visible edge (LA-18).
- **Other media:** print styles for anything people print (receipts, invoices, itineraries); a plain-text version for anything sent by email; `forced-colors` and `prefers-contrast` for both themes.

## critique

See `modes/critique.md`: a scored judgment of whether the design does its job, with personas. It is also the fresh-eyes step of the gate.

## document

Write or refresh `DESIGN.md` from the code:
1. `tasmeem.mjs tokens <css paths>` lists the custom properties, raw values and font faces.
2. Fill in `templates/DESIGN.template.md`: tokens with roles, type per script, components and their states, motion tokens, rules and reasons, brand exceptions.
3. The template's front matter follows the open `DESIGN.md` format (google-labs-code/design.md): YAML tokens that other tools read. When `npx` is available, validate it with `npx @google/design.md lint DESIGN.md` (broken references, contrast), and keep tasmeem's own sections (scripts, brand exceptions) in the prose below.
4. Keep it short: the tokens, the rules and their reasons. A `DESIGN.md` longer than the agent's patience is a `DESIGN.md` nobody follows.
