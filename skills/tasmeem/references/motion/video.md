# Brand motion and video

Some motion is a produced asset, not interface behaviour: a logo sting, a hero loop, a product reel, a social teaser. Two routes:

## Route A: generated footage (Higgsfield)

For photographic or cinematic loops (a coffee pour, fabric in wind, a city at dusk):

- Generate stills first and approve them, then animate them (image to video), so the brand look is locked before motion.
- Keep loops short (4 to 8 seconds) and seamless, with a muted H.264 MP4 plus WebM/AV1 and a still poster.
- Never generate footage containing text; add titles in code or in Route B.
- Check the cost before generating (see `assets/higgsfield.md`).

## Route B: programmatic video (Remotion)

For typographic, data-driven or templated motion (animated Arabic titles, a stats reel from real data, a branded intro), use Remotion (React components rendered to video):

- Arabic works because text is real type: load the brand fonts, put `dir="rtl"` on the composition's root element (SC-24), and never apply letter-spacing (SC-01).
- The same tokens (colours, durations, curves) as the site, so the video and the interface share one motion language.
- Render at the target aspect ratios (16:9, 9:16, 1:1, 4:5). Every frame is reproducible from code.
- If the Remotion skills are installed (`remotion-best-practices`, `remotion-create`, `remotion-render`), follow them for the API.

## Captions and subtitles

- Arabic captions follow the reading rules of the page: no tracking, `dir="rtl"` on the track's container, Arabic punctuation.
- Netflix's Arabic timed-text guidance is a good default: at most two lines, about 42 characters per line, a reading speed of about 20 characters per second, and no line break between a preposition and its noun or between the two parts of an إضافة.

## On the page

- `<video autoplay muted loop playsinline preload="metadata" poster="…">` for decorative loops, paused under reduced motion, with a pause control if longer than 5 seconds (MO-16).
- Films with sound play only when the user asks, with native controls and captions.
- Load video below the fold with `preload="none"` and a poster.
