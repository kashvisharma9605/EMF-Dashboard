# EMScope Design System

A design system distilled from **EMScope**, a handheld electromagnetic-pollution
monitoring instrument and its companion web dashboard, built by an ECE student
team at **RV College of Engineering**.

> EMScope measures electric fields, magnetic fields, and RF activity in real time
> and turns raw sensor data into interpretable, ICNIRP-referenced safety
> information. The dashboard is its read-out surface.

The aesthetic is **light-theme scientific instrumentation**: information-dense,
flat, serif-headed, mono-labelled, with a navy/amber chrome and four colour-coded
sensing "verticals."

---

## Sources

This system was reverse-engineered from a single attached codebase:

- **`EMF-Dashboard/`** (local mounted folder)
  - `index.html` — the EMScope home / dashboard landing page (the only authored
    screen; navbar links point to `pages/electric.html`, `magnetic.html`,
    `nrf.html`, `rfpower.html` which were **not present** in the mount).
  - `css/styles.css` — the original hand-written design system v2 (light theme,
    instrumentation aesthetic). All tokens here derive from it verbatim.

Plus two project PDFs (text reference, not visual brand assets):

- **`uploads/el meow 1.pdf`** — EL Phase-I academic presentation ("Integrated EM
  Pollution Monitoring Dashboard…"). Team: Stuthi · Kashvi Sharma · Manaswi K B ·
  Sivani Vemuri; Mentor: Dr. Ramavenkateswaran N. Carries the RVCE motto footer
  **"Go, change the world."** Source of the methodology copy (RMS formula,
  ICNIRP scoring, sensor descriptions).
- **`uploads/bts el final.pdf`** — final-phase build notes + ESP32 firmware
  (pinouts, sampling code) for all four verticals. Source of the real units,
  ranges, and channel counts used in the UI kit.

No Figma file, brand book, or slide-design template was provided. The PDFs are
generic academic slides (PowerPoint), not a brand deck, so no slide kit is built.
Module-detail screens in the UI kit are **extrapolated in-style** from the home
page plus the grounded sensor data in these PDFs (RMS, 125-channel scan, dBm
ranges), since the linked detail pages (`pages/*.html`) were absent from the
mount — see `ui_kits/emscope/README.md`.

---

## Product context

- **One product, one surface:** the EMScope web dashboard.
- **Four sensing verticals**, each with its own identity colour and sensor:
  | # | Vertical | Sensor | Units | Identity colour |
  |---|----------|--------|-------|-----------------|
  | V1 | Electric Field | Capacitive AC E-Field | V/m, RMS, FFT | mustard `#A67C00` |
  | V2 | Magnetic Field | KY-024 Hall Effect | mT, polarity | purple `#5E3A99` |
  | V3 | NRF RF Scanner | NRF24L01+ PA+LNA 2.4 GHz | occupancy, waterfall | slate `#34495E` |
  | V4 | RF Power | AD8318 Log Detector | dBm, W/m² | green `#1E6B3A` |
- **Exposure scoring:** every reading is classified **Low / Moderate / High**
  against ICNIRP-referenced thresholds — *informational, not clinical.*

---

## CONTENT FUNDAMENTALS

How EMScope writes.

- **Voice:** technical, measured, third-person/impersonal. It describes the
  instrument and the physics, not the reader. Almost no "you"; never "I". The
  dashboard speaks about *the system* ("EMScope measures it directly").
- **Register:** academic-engineering. Precise nouns, real component part numbers
  (`NRF24L01+ PA+LNA`, `AD8318`, `ESP32 ADC`), real units and ranges
  (`1 MHz–8 GHz`, `125 channels`). Specificity is the brand.
- **Casing:**
  - Titles / headings → **Title Case** ("Select a Vertical", "How EMScope Works").
  - Eyebrows, section kickers, status, labels → **UPPERCASE** mono with wide
    tracking ("SYSTEM ONLINE", "01 · SENSING", "RF POWER RANGE").
  - Body prose → sentence case.
- **Numbering motif:** steps and modules are tagged with terse codes —
  `V1`–`V4` for verticals, `01 · Sensing`, `02 · Processing`,
  `03 · Interpretation` for methodology. The middot `·` is the brand's favourite
  separator (also used in bylines: "Kashvi Sharma · Manaswi K B · …").
- **Tone:** confident but careful. Safety claims are always hedged
  ("referenced to ICNIRP guidelines — informational, not clinical").
- **Emoji:** **none.** Never. Iconography is line-drawn SVG only.
- **Sample copy:**
  - Eyebrow: `RV College of Engineering · ECE`
  - Tagline (serif italic): *"A handheld EM pollution monitor measuring electric
    fields, magnetic fields, and RF activity in real time."*
  - Module sensor line (mono): `Capacitive AC E-Field Sensor`
  - Stat: `1MHz–8GHz` / `RF Power Range`

---

## VISUAL FOUNDATIONS

- **Colour vibe:** saturated, "punched-up" engineering palette — deep instrument
  blue, saturated green, amber. Deliberately **non-pastel** identity colours.
  Backgrounds are a warm off-white (`#F1F2EE`), not pure white; cards are pure
  white. Dark chrome (navbar, hero, footer) is a deep navy (`#0E2A40`).
- **Amber is the structural accent.** A 3px amber rule (`--color-accent`)
  underlines the navbar, hero, and footer — the single most recognisable brand
  device. Amber is also the primary CTA colour and the "step number" colour.
- **Type:**
  - Headings/titles → **serif** (`--font-display`, Times stack). This is unusual
    for a dashboard and is a core part of the identity.
  - Editorial prose & taglines → **Libre Baskerville**, often *italic*.
  - UI / body / buttons → **Source Sans Pro**.
  - Data, labels, eyebrows, status, stat values → **mono** (`Courier New`),
    uppercase, wide-tracked.
- **Spacing:** strict 8px grid (`--space-1`…`--space-6` = 8…64). Information-dense
  — generous never; compact and gridded always.
- **Backgrounds:** flat colour fills. The hero is the one exception: a navy
  gradient (`160deg`) with a subtle animated SVG of coloured sine waves + an
  amber "scan line" sweeping left→right. No photography, no textures, no noise.
- **Animation:** restrained and functional. A pulsing status dot (2.4s),
  drifting hero wave paths (9s), a 5s linear scan-line sweep. Easing is
  `ease-in-out` for drifts, `linear` for the sweep. Transitions on interactive
  elements are fast (`0.15s ease`). No bounces, no springs.
- **Hover states:** links underline; nav links brighten to white; buttons darken
  (`--color-accent` → `#B07F22`) or gain a coloured border; **cards lift**
  (`translateY(-3px)`) and gain a soft navy-tinted shadow (`--shadow-card-hover`).
- **Press states:** none custom — default browser. Keep interactions light.
- **Borders:** hairline `1px solid #D4D8D2` on every card/panel. Module cards add
  a **4px coloured top border** = vertical identity. Section separators are
  `1px` bottom borders; metric rows use a **1px dashed** divider.
- **Shadows:** almost none at rest (flat). Elevation appears only on card hover.
  Hero title has a soft blue text-shadow glow.
- **Radii:** small and consistent — `4px` chips, `6px` cards/buttons/panels,
  `20px` tag pills, `50%` logo circle & status dots. Nothing is heavily rounded.
- **Transparency / blur:** none. No glassmorphism. The hero SVG uses low opacity
  strokes but the UI is otherwise fully opaque.
- **Cards:** white fill, 1px grey border, 6px radius, flat at rest, lift on hover.
  Module cards = card + 4px coloured top edge + icon chip (tinted square) +
  mono number + serif name + mono sensor line + dashed metric row.
- **Layout rules:** sticky navbar (80px, navy, amber underline) with a 3-column
  grid (brand / centered links / right-aligned status). Centered 1180px max
  container. Sections stack with bottom borders. Stat ribbon = 4-up grid on navy.

---

## ICONOGRAPHY

- **System:** hand-authored **inline SVG line icons**, 24×24 viewBox,
  `stroke="currentColor"`, `stroke-width: 1.8`, round caps/joins, **no fill**.
  They inherit the vertical identity colour via `currentColor`. This is the
  established style — match it.
- **Where:** one icon per module card, sized 22×22 inside a 38×38 tinted square
  "icon chip" (`--radius-sm` … actually 8px chip). The waveform, magnet, bar-scan,
  and target glyphs in `index.html` are the canonical set.
- **No icon font, no sprite, no PNG icons** in the source. No Lucide/Heroicons
  dependency.
- **Emoji / unicode as icons:** never. The only non-ASCII glyph in use is the
  middot `·` as a separator.
- **Substitution note:** because the original icons are bespoke line glyphs, this
  system keeps them as copied SVG snippets (see `assets/icons/`) rather than
  pulling a CDN set. If you need a glyph the set lacks, draw it to spec
  (24×24, 1.8 stroke, round, no fill) or use **Lucide** (matching stroke style)
  and flag the addition.

---

## Index / manifest

Root files:
- `styles.css` — global entry point (import-only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter wrapper.

Foundations (Design System tab cards):
- `guidelines/` — colour, type, spacing, and brand specimen cards (`*.card.html`).

Components (`components/core/`):
- `Button` · `Tag` · `StatusIndicator` · `Card` · `ModuleCard` ·
  `StatRibbon` · `SectionHeading`

Assets:
- `assets/icons/` — the four module line-icons + nav/utility glyphs (SVG).
- `assets/` — logo treatment.

UI kit:
- `ui_kits/emscope/` — interactive recreation of the EMScope dashboard
  (`index.html` + screen JSX).
