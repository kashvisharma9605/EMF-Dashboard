# EMScope — UI Kit

Interactive, high-fidelity recreation of the **EMScope EL Phase 3 Dashboard**.

## What's here

- `index.html` — runnable shell. Loads the design-system bundle + the screen
  scripts, mounts `App`.
- `App.jsx` — screen routing (`home` ↔ a vertical detail view; detail remounts
  per vertical so live state resets cleanly).
- `Chrome.jsx` — `Navbar` (sticky navy + amber rule, logo lockup, live status)
  and `Footer`.
- `HomeScreen.jsx` — landing page: animated hero, **USB / Wi-Fi data-link
  setup** (persisted to localStorage), **live status panel with a pulsing LED**,
  **four at-a-glance live-reading windows**, overview + system-status panel,
  four module cards, methodology.
- `ModuleDetail.jsx` — full per-vertical instrument view (see below).
- `Charts.jsx` — thin-line technical chart + gauge library (waveform, trend,
  FFT, polarity, peak/avg, histogram, exposure meter, 125-channel spectrum
  analyzer, canvas waterfall, occupancy/activity, needle + radial gauges,
  traffic light, RSSI signal bars, raw-ADC diagnostic) + `useReading`/`useClock`.
- `Recommendations.jsx` — context input + recommendation engine.
- `data.jsx` — the four sensing verticals (Tier-1/Tier-2 metrics, chart &
  visual config, per-source advice) + line icons.

## Module-detail structure (per the metric philosophy)

Each vertical page follows a strict hierarchy:
- **Tier 1** (prominent strip): Current · Peak · Average · Exposure Ratio ·
  colour-coded Classification badge.
- **Tier 2** (standout quantities): the genuinely impressive per-vertical values
  (e.g. NRF Device-Count Estimate + Hopping Pattern + Idle Channels; Electric
  Dominant Frequency + Cumulative Exposure).
- **Charts**: each captioned with one sentence + units. NRF gets the priority
  treatment — full-width live spectrum analyzer + waterfall.
- **Instrument visuals**: gauges, traffic light, signal bars, raw diagnostic.
- **Context & recommendation engine**: source/distance/duration/frequency →
  plain-language summary, classification statement, source-specific advice, and
  the standard limitations note.
- Safety language everywhere is qualified by "project-defined thresholds";
  the AD8318 page carries its permanent broadband disclaimer.

## Interactions

- Click any **module card**, **at-a-glance window**, or navbar link → that
  vertical's detail view.
- Pick **USB** or **Wi-Fi** on the homepage; the choice persists and is echoed in
  the live status + system-status panels.
- Fill the context form and **Analyze** → live recommendations.
- "All modules" / "Home" / the logo → back to the landing page.

## Composition

Screens compose the published primitives (`Button`, `Tag`, `Card`, `ModuleCard`,
`StatRibbon`, `StatusIndicator`, `SectionHeading`) from
`window.EMScopeDesignSystem_3c9a3a` — they are not re-implemented here.

## Fidelity notes / CAVEATS

- The **home page is a faithful recreation** of the source `index.html`.
- The **module-detail screens are extrapolated in-style.** The source's detail
  pages (`pages/electric.html`, `magnetic.html`, `nrf.html`, `rfpower.html`)
  were **not present** in the attached codebase. Their layout, readings, and
  visualizations are constructed from the home-page hints plus the grounded
  sensor data in the project PDFs (RMS method, 125-channel scan, AD8318 dBm
  range, KY-024 calibration) — values are representative, not live hardware.
- The logo is the source's **placeholder text mark**; no logo asset was supplied.
