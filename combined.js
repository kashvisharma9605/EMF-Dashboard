// EMScope standalone — readiness-gated so namespace reads never run before the
// (blob-loaded) React + DS bundle have executed.
(function boot(){
  var ns = window.EMScopeDesignSystem_3c9a3a;
  if (!(window.React && window.ReactDOM && window.ReactDOM.createRoot && ns && ns.Button && ns.StatusIndicator && ns.Card && ns.SectionHeading && ns.StatRibbon && ns.ModuleCard && ns.Tag)) { return setTimeout(boot, 20); }
// EMScope — combined standalone bundle (each file block-scoped to avoid const collisions)

/* ===== data.jsx ===== */
{
  // EMScope UI kit — vertical data, icons, recommendation copy. Loaded as text/babel.
  const Icons = {
    electric: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12c2-4 4 4 6 0s4 4 6 0 4 4 6 0",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })),
    magnetic: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 3v9a5 5 0 0010 0V3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 3h3M14 3h3",
      strokeLinecap: "round"
    })),
    nrf: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 18v-3M8 18v-6M12 18v-9M16 18v-5M20 18v-8",
      strokeLinecap: "round"
    })),
    rfpower: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v3M12 19v3M2 12h3M19 12h3",
      strokeLinecap: "round"
    })),
    back: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M15 18l-6-6 6-6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })),
    usb: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 21V7",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7l-3 3M12 7l3 3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "3.5",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 13l-3 2v3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "17",
      width: "4",
      height: "3",
      rx: "1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 12l3 2v2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "17",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    })),
    wifi: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2.5 9a15 15 0 0119 0",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5.5 12.5a10 10 0 0113 0",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.5 16a5 5 0 017 0",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "19.5",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }))
  };

  // Hex mirrors of identity colors (for canvas / inline math).
  const HEX = {
    electric: '#A67C00',
    magnetic: '#5E3A99',
    nrf: '#34495E',
    rfpower: '#1E6B3A',
    safe: '#2E8F5E',
    moderate: '#E0942A',
    high: '#C0392B'
  };
  const VERTICALS = [{
    key: 'electric',
    number: 'V1',
    name: 'Electric Field',
    sensor: 'Capacitive AC E-Field Sensor',
    pin: 'GPIO 34 · ADC1_CH6',
    color: 'var(--color-electric)',
    hex: HEX.electric,
    chip: '#F1E3B8',
    desc: 'Ambient AC electric field strength and dominant frequency.',
    unit: 'V/m',
    base: 38.4,
    jitter: 9,
    range: [0, 120],
    refLimit: 120,
    level: 'safe',
    glance: 'Field strength',
    tier2: [{
      label: 'Dominant Frequency',
      value: '50',
      unit: 'Hz',
      sentence: 'Peak of the FFT — 50 Hz indicates mains power; higher suggests another source.'
    }, {
      label: 'Cumulative Exposure',
      value: '4.6k',
      unit: 'V/m·s',
      sentence: 'Session-accumulated exposure integrated over time, in V/m·s.'
    }],
    charts: [{
      kind: 'waveform',
      title: 'Live Waveform',
      sentence: 'Instantaneous field oscillation around ADC mid-scale, raw ADC counts.'
    }, {
      kind: 'trend',
      title: 'RMS Trend',
      sentence: 'Root-mean-square field strength over time, V/m, with the project reference line.'
    }, {
      kind: 'fft',
      title: 'FFT Spectrum',
      sentence: 'Frequency content of the field — magnitude vs frequency, Hz.'
    }, {
      kind: 'exposure',
      title: 'Exposure Meter',
      sentence: 'Current reading as a fraction of the project reference limit, 0–100%.'
    }],
    visuals: ['needle', 'traffic']
  }, {
    key: 'magnetic',
    number: 'V2',
    name: 'Magnetic Field',
    sensor: 'KY-024 Hall Effect Sensor',
    pin: 'GPIO 2 · ADC1_CH2',
    color: 'var(--color-magnetic)',
    hex: HEX.magnetic,
    chip: '#E3D9F1',
    desc: 'Magnetic flux density and polarity reversal rate.',
    unit: 'mT',
    base: 1.7,
    jitter: 0.6,
    range: [0, 10],
    refLimit: 10,
    level: 'safe',
    glance: 'Flux density',
    tier2: [{
      label: 'Dominant Frequency',
      value: '50',
      unit: 'Hz',
      sentence: 'Peak frequency — 50 Hz is mains; higher implies a motor or switching supply.'
    }, {
      label: 'Polarity Reversal Rate',
      value: '100',
      unit: '/s',
      sentence: 'Field-sign transitions per second — distinguishes AC sources from DC / magnets.'
    }],
    charts: [{
      kind: 'trend',
      title: 'Flux Density Trend',
      sentence: 'Flux density over time, mT, with the project threshold marked.'
    }, {
      kind: 'polarity',
      title: 'Polarity Timeline',
      sentence: 'Signed field value over time — positive and negative excursions, ±mT.'
    }, {
      kind: 'peakavg',
      title: 'Peak vs Average',
      sentence: 'Session peak compared with the rolling average, mT.'
    }, {
      kind: 'exposure',
      title: 'Exposure Meter',
      sentence: 'Current reading as a fraction of the project reference limit, 0–100%.'
    }],
    visuals: ['radial', 'traffic', 'diagnostic']
  }, {
    key: 'nrf',
    number: 'V3',
    name: 'NRF RF Scanner',
    priority: true,
    sensor: 'NRF24L01+ PA+LNA · 2.4 GHz',
    pin: 'CE GPIO 4 · CSN GPIO 5',
    color: 'var(--color-nrf)',
    hex: HEX.nrf,
    chip: '#DDE3E9',
    desc: '125-channel spectrum scan with congestion analysis.',
    unit: '% occ',
    base: 41,
    jitter: 12,
    range: [0, 100],
    refLimit: 100,
    level: 'moderate',
    glance: 'Band occupancy',
    tier2: [{
      label: 'Device Count Estimate',
      value: '7',
      unit: 'devices',
      sentence: 'Active wireless devices estimated by clustering busy channels.'
    }, {
      label: 'Hopping Pattern',
      value: 'Active',
      unit: '',
      sentence: 'Frequency-hopping consistent with Bluetooth / Zigbee is present.'
    }, {
      label: 'Idle Channels',
      value: '46',
      unit: '/ 125',
      sentence: 'Completely clear channels of the 125 scanned.'
    }],
    charts: [{
      kind: 'spectrum',
      title: 'Live Spectrum Analyzer',
      sentence: 'Hit count per channel across all 125 channels, 2.400–2.525 GHz.',
      big: true
    }, {
      kind: 'waterfall',
      title: 'Waterfall Plot',
      sentence: 'Channel activity over time — each row is one sweep, colour is hit count.',
      big: true
    }, {
      kind: 'occupancy',
      title: 'Occupancy Trend',
      sentence: 'Average channel occupancy over the last few minutes, %.'
    }, {
      kind: 'activity',
      title: 'Activity Timeline',
      sentence: 'Total RF activity per sweep, hits per sweep.'
    }],
    visuals: ['radial', 'traffic']
  }, {
    key: 'rfpower',
    number: 'V4',
    name: 'RF Power',
    sensor: 'AD8318 Log Power Detector',
    pin: '1 MHz – 8 GHz · 70 dB',
    color: 'var(--color-rfpower)',
    hex: HEX.rfpower,
    chip: '#D6E8DA',
    desc: 'Broadband RF power across 1 MHz – 8 GHz.',
    unit: 'dBm',
    base: -42,
    jitter: 7,
    range: [-60, 0],
    refLimit: 0,
    level: 'safe',
    glance: 'Broadband power',
    disclaimer: 'This sensor measures total broadband RF power across 1 MHz–8 GHz. It cannot distinguish between individual frequency sources. Readings represent aggregate environmental RF exposure.',
    tier2: [{
      label: 'Power Density',
      value: '0.018',
      unit: 'W/m²',
      sentence: 'Converted power density — maps directly to ICNIRP / DoT reference values.'
    }, {
      label: 'Power Density',
      value: '18',
      unit: 'mW/m²',
      sentence: 'Same value in mW/m², the unit used by reference tables.'
    }, {
      label: 'Signal Bar Level',
      value: '6',
      unit: '/ 20',
      sentence: 'Phone-style discrete strength — an at-a-glance reading with no unit math.'
    }],
    charts: [{
      kind: 'trend',
      title: 'Power Trend',
      sentence: 'RF power over time, dBm, with the project threshold lines.'
    }, {
      kind: 'density',
      title: 'Power Density',
      sentence: 'Same data as power density over time, W/m², reference at DoT threshold.'
    }, {
      kind: 'peakavg',
      title: 'Peak vs Average',
      sentence: 'Session peak compared with the rolling average, dBm.'
    }, {
      kind: 'histogram',
      title: 'Session Histogram',
      sentence: 'Distribution of power readings this session, dBm.'
    }],
    visuals: ['signal', 'needle', 'traffic']
  }];
  const LEVEL_LABEL = {
    safe: 'LOW',
    moderate: 'MODERATE',
    high: 'HIGH'
  };
  const LEVEL_COLOR = {
    safe: 'var(--color-safe)',
    moderate: 'var(--color-moderate)',
    high: 'var(--color-high)'
  };
  const LEVEL_SENTENCE = {
    safe: "Measured values are within the project's low-exposure reference range.",
    moderate: "Measured values are elevated relative to the project's reference levels. Worth monitoring if exposure is prolonged.",
    high: "Measured values exceed the project's high-exposure threshold. Consider reducing proximity or duration."
  };
  const SOURCE_OPTIONS = ['Wi-Fi router', 'Mobile tower', 'Power line', 'Microwave oven', 'Induction cooktop', 'Bluetooth device', 'Unknown', 'Other'];
  const SOURCE_ADVICE = {
    'Wi-Fi router': ['Consider relocating the router away from frequently occupied areas.', 'Enable the 5 GHz band for capable devices to reduce 2.4 GHz activity.', 'Turn the router off overnight if it is not required.', 'Maintain at least 1–2 m separation from the router during extended use.'],
    'Mobile tower': ['Indoor exposure at typical city distances is substantially attenuated by walls and distance.', 'Take measurements in multiple room locations to find any higher-exposure spots.', 'The AD8318 broadband reading cannot isolate tower frequency from other RF sources.'],
    'Power line': ['Magnetic field strength from power lines decreases rapidly with distance.', 'Doubling the distance from the source reduces field strength by roughly 75%.', 'The measured frequency component can confirm whether the field is from a mains source.'],
    _default: ['Increase distance from the suspected source where practical.', 'Reduce continuous exposure duration during high-reading periods.', 'Re-measure at several positions to map where readings are highest.']
  };
  const LIMITATIONS = 'These recommendations are generated from project-defined thresholds and user-entered context. This system is a student-built prototype and is not a certified measurement instrument. Treat recommendations as informational guidance, not clinical or regulatory advice.';
  Object.assign(window, {
    Icons,
    HEX,
    VERTICALS,
    LEVEL_LABEL,
    LEVEL_COLOR,
    LEVEL_SENTENCE,
    SOURCE_OPTIONS,
    SOURCE_ADVICE,
    LIMITATIONS
  });
}

/* ===== Charts.jsx ===== */
{
  // EMScope UI kit — thin technical chart + gauge library. Loaded as text/babel.
  // Aesthetic: fine strokes (1–1.3px), small mono labels, faint grid, navy analyzer insets.

  const GRID = 'rgba(118,125,128,0.18)';
  const MUTED = '#767D80';

  // ---- shared hooks --------------------------------------------------------
  function useClock(ms) {
    const [t, setT] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setT(x => x + 1), ms);
      return () => clearInterval(id);
    }, [ms]);
    return t;
  }
  function useReading(base, jitter, len = 70) {
    const [s, setS] = React.useState(() => ({
      cur: base,
      peak: base,
      sum: base,
      n: 1,
      series: Array.from({
        length: len
      }, () => base)
    }));
    React.useEffect(() => {
      const id = setInterval(() => setS(p => {
        const cur = base + (Math.random() - 0.5) * 2 * jitter + Math.sin(p.n / 6) * jitter * 0.4;
        return {
          cur,
          peak: Math.max(p.peak, cur),
          sum: p.sum + cur,
          n: p.n + 1,
          series: [...p.series.slice(1), cur]
        };
      }), 850);
      return () => clearInterval(id);
    }, [base, jitter]);
    return {
      cur: s.cur,
      peak: s.peak,
      avg: s.sum / s.n,
      series: s.series
    };
  }

  // ---- helpers -------------------------------------------------------------
  function actColor(v) {
    return v < 0.34 ? '#3FBE82' : v < 0.67 ? '#F4AC3E' : '#E25141';
  }
  function norm(v, lo, hi) {
    return Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
  }

  // 2.4 GHz band occupancy profile — hotspots so spectrum & waterfall agree.
  const HOTS = [2, 26, 51, 76, 80, 101];
  function bandProfile(t) {
    const out = [];
    for (let c = 0; c < 125; c++) {
      let v = 0.04;
      for (const h of HOTS) v += 0.6 * Math.exp(-((c - h) ** 2) / 26);
      v += 0.18 * Math.abs(Math.sin(c * 0.7 + t * 0.6));
      out.push(Math.min(1, v));
    }
    return out;
  }
  function GridLines({
    rows = 3
  }) {
    return Array.from({
      length: rows
    }, (_, i) => /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: "0",
      x2: "500",
      y1: (i + 1) * (120 / (rows + 1)),
      y2: (i + 1) * (120 / (rows + 1)),
      stroke: GRID,
      strokeWidth: "0.8"
    }));
  }

  // ---- line / trend --------------------------------------------------------
  function Trend({
    hex,
    series,
    lo,
    hi,
    threshold,
    fill
  }) {
    const pts = series.map((v, i) => `${i / (series.length - 1) * 500},${120 - norm(v, lo, hi) * 110 - 5}`).join(' ');
    const ty = threshold != null ? 120 - norm(threshold, lo, hi) * 110 - 5 : null;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement(GridLines, null), ty != null && /*#__PURE__*/React.createElement("line", {
      x1: "0",
      x2: "500",
      y1: ty,
      y2: ty,
      stroke: "var(--color-moderate)",
      strokeWidth: "1",
      strokeDasharray: "4 4"
    }), fill && /*#__PURE__*/React.createElement("polygon", {
      points: `0,120 ${pts} 500,120`,
      fill: hex,
      opacity: "0.07"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: pts,
      fill: "none",
      stroke: hex,
      strokeWidth: "1.3",
      strokeLinejoin: "round"
    }));
  }

  // ---- AC waveform (live array or rAF scroll) -----------------------------
  function Waveform({
    hex,
    data
  }) {
    const ref = React.useRef(null);
    const hasData = Array.isArray(data) && data.length > 1;
    React.useEffect(() => {
      if (hasData) return;
      let raf;
      const start = performance.now();
      const draw = t => {
        const el = ref.current;
        if (!el) return;
        const ph = (t - start) / 260;
        let d = '';
        for (let x = 0; x <= 500; x += 4) {
          const y = 60 + Math.sin(x / 18 - ph) * 34 * (0.7 + 0.3 * Math.sin(x / 90 + ph * 0.4));
          d += (x === 0 ? 'M' : 'L') + x + ',' + y.toFixed(1) + ' ';
        }
        el.setAttribute('d', d);
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(raf);
    }, [hasData]);
    let livePts = '';
    if (hasData) {
      let mn = Infinity,
        mx = -Infinity;
      for (const v of data) {
        if (v < mn) mn = v;
        if (v > mx) mx = v;
      }
      const span = mx - mn || 1;
      livePts = data.map((v, i) => `${i / (data.length - 1) * 500},${(110 - (v - mn) / span * 100).toFixed(1)}`).join(' ');
    }
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "0",
      x2: "500",
      y1: "60",
      y2: "60",
      stroke: GRID,
      strokeWidth: "0.8"
    }), hasData ? /*#__PURE__*/React.createElement("polyline", {
      points: livePts,
      fill: "none",
      stroke: hex,
      strokeWidth: "1.2",
      strokeLinejoin: "round"
    }) : /*#__PURE__*/React.createElement("path", {
      ref: ref,
      fill: "none",
      stroke: hex,
      strokeWidth: "1.2"
    }));
  }

  // ---- FFT bars ------------------------------------------------------------
  function FFT({
    hex
  }) {
    const t = useClock(700);
    const bars = Array.from({
      length: 40
    }, (_, i) => {
      let v = 0.05 + Math.random() * 0.08;
      if (i === 4) v = 0.95; // 50 Hz dominant
      if (i === 8) v = 0.32; // 100 Hz harmonic
      if (i === 12) v = 0.18;
      return v;
    });
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement(GridLines, null), bars.map((v, i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: i * (500 / 40) + 1.5,
      y: 120 - v * 112,
      width: 500 / 40 - 3,
      height: v * 112,
      fill: i === 4 ? hex : MUTED,
      opacity: i === 4 ? 0.95 : 0.45
    })));
  }

  // ---- polarity (signed bars; live signed array or synthetic) -------------
  function Polarity({
    hex,
    data
  }) {
    const t = useClock(750);
    const arr = Array.isArray(data) && data.length ? data : null;
    let bars;
    if (arr) {
      const m = Math.max(...arr.map(v => Math.abs(v))) || 1;
      bars = arr.map(v => v / m);
    } else {
      const n = 48;
      bars = Array.from({
        length: n
      }, (_, i) => Math.sin(i / 2.2 + t) * (0.55 + Math.random() * 0.4));
    }
    const n = bars.length;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "0",
      x2: "500",
      y1: "60",
      y2: "60",
      stroke: GRID,
      strokeWidth: "0.8"
    }), bars.map((v, i) => {
      const h = Math.abs(v) * 52;
      return /*#__PURE__*/React.createElement("rect", {
        key: i,
        x: i * (500 / n) + 1,
        y: v >= 0 ? 60 - h : 60,
        width: 500 / n - 2,
        height: h,
        fill: v >= 0 ? hex : '#C24A2E',
        opacity: "0.8"
      });
    }));
  }

  // ---- peak vs average -----------------------------------------------------
  function PeakAvg({
    hex,
    peak,
    avg,
    lo,
    hi,
    unit
  }) {
    const items = [['Peak', peak, hex], ['Average', avg, MUTED]];
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      }
    }, items.map((it, i) => {
      const w = norm(it[1], lo, hi) * 430;
      const y = 28 + i * 50;
      return /*#__PURE__*/React.createElement("g", {
        key: i
      }, /*#__PURE__*/React.createElement("text", {
        x: "0",
        y: y - 8,
        fontFamily: "var(--font-mono)",
        fontSize: "11",
        fill: MUTED
      }, it[0]), /*#__PURE__*/React.createElement("rect", {
        x: "0",
        y: y,
        width: "470",
        height: "16",
        fill: "rgba(118,125,128,0.1)",
        rx: "2"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "0",
        y: y,
        width: w,
        height: "16",
        fill: it[2],
        opacity: "0.85",
        rx: "2"
      }), /*#__PURE__*/React.createElement("text", {
        x: "476",
        y: y + 12,
        fontFamily: "var(--font-mono)",
        fontSize: "11",
        fill: "#16181A",
        textAnchor: "end"
      }, it[1].toFixed(1)));
    }));
  }

  // ---- histogram -----------------------------------------------------------
  function Histogram({
    hex,
    bins
  }) {
    const data = Array.isArray(bins) && bins.length ? bins : [2, 5, 9, 16, 24, 31, 22, 13, 7, 3];
    const max = Math.max(...data) || 1;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement(GridLines, null), data.map((v, i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: i * (500 / data.length) + 2,
      y: 120 - v / max * 112,
      width: 500 / data.length - 4,
      height: v / max * 112,
      fill: hex,
      opacity: "0.7",
      rx: "1"
    })));
  }

  // ---- exposure meter ------------------------------------------------------
  function Exposure({
    pct,
    levelColor
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 2px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 14,
        borderRadius: 7,
        background: 'var(--color-surface-alt)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: '100%',
        background: levelColor,
        transition: 'width 0.6s ease'
      }
    }), [25, 50, 75].map(t => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        position: 'absolute',
        left: `${t}%`,
        top: 0,
        bottom: 0,
        width: 1,
        background: 'rgba(255,255,255,0.7)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        color: MUTED,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", null, "0%"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: levelColor,
        fontWeight: 700
      }
    }, pct.toFixed(0), "% of reference"), /*#__PURE__*/React.createElement("span", null, "100%")));
  }

  // ---- NRF spectrum analyzer (125 ch; live array or synthetic) ------------
  function Spectrum({
    big,
    data
  }) {
    const t = useClock(220);
    const live = Array.isArray(data) && data.length ? data : null;
    let prof;
    if (live) {
      const mx = Math.max(...data);
      const scale = mx > 1 ? mx > 100 ? mx : 100 : 1;
      prof = data.map(v => Math.max(0, Math.min(1, v / scale)));
    } else {
      prof = bandProfile(t * 0.25);
    }
    const sweep = t % 30 / 30 * 500;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 160",
      style: {
        width: '100%',
        height: big ? 200 : 150,
        background: '#0E2A40',
        borderRadius: 4,
        display: 'block'
      },
      preserveAspectRatio: "none"
    }, [0.25, 0.5, 0.75].map(f => /*#__PURE__*/React.createElement("line", {
      key: f,
      x1: "0",
      x2: "500",
      y1: 150 - f * 140,
      y2: 150 - f * 140,
      stroke: "rgba(255,255,255,0.08)",
      strokeWidth: "0.7"
    })), prof.map((v, i) => {
      const j = live ? v : v + (Math.random() - 0.5) * 0.12;
      const h = Math.max(2, Math.min(1, j) * 140);
      return /*#__PURE__*/React.createElement("rect", {
        key: i,
        x: i * (500 / prof.length),
        y: 150 - h,
        width: 500 / prof.length - 0.4,
        height: h,
        fill: actColor(v)
      });
    }), /*#__PURE__*/React.createElement("line", {
      x1: sweep,
      x2: sweep,
      y1: "0",
      y2: "150",
      stroke: "#F4AC3E",
      strokeWidth: "1",
      opacity: "0.7"
    }));
  }

  // ---- NRF waterfall (canvas; live rows or synthetic) ---------------------
  function Waterfall({
    big,
    rows,
    rev
  }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const cv = ref.current;
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width,
        H = cv.height;
      const liveRows = Array.isArray(rows) && rows.length ? rows : null;
      if (liveRows) {
        ctx.fillStyle = '#0E2A40';
        ctx.fillRect(0, 0, W, H);
        const rowH = Math.max(2, H / Math.min(liveRows.length, 60));
        const cw = W / 125;
        for (let r = 0; r < liveRows.length; r++) {
          const row = liveRows[liveRows.length - 1 - r]; // newest on top
          const y = r * rowH;
          if (y > H) break;
          const mx = Math.max(...row);
          const scale = mx > 1 ? mx > 100 ? mx : 100 : 1;
          for (let c = 0; c < row.length; c++) {
            const v = Math.max(0, Math.min(1, row[c] / scale));
            ctx.fillStyle = actColor(v);
            ctx.fillRect(c * cw, y, cw + 0.6, rowH + 0.6);
          }
        }
        return;
      }
      let raf,
        last = 0,
        tt = 0;
      ctx.fillStyle = '#0E2A40';
      ctx.fillRect(0, 0, W, H);
      const draw = now => {
        if (now - last > 150) {
          last = now;
          tt += 0.3;
          const img = ctx.getImageData(0, 0, W, H - 3);
          ctx.putImageData(img, 0, 3);
          const prof = bandProfile(tt);
          const cw = W / 125;
          for (let c = 0; c < 125; c++) {
            const v = Math.min(1, prof[c] + (Math.random() - 0.5) * 0.1);
            ctx.fillStyle = actColor(v);
            ctx.fillRect(c * cw, 0, cw + 0.6, 3);
          }
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(raf);
    }, [rev, rows]);
    return /*#__PURE__*/React.createElement("canvas", {
      ref: ref,
      width: 500,
      height: big ? 200 : 150,
      style: {
        width: '100%',
        height: big ? 200 : 150,
        display: 'block',
        borderRadius: 4,
        background: '#0E2A40'
      }
    });
  }

  // ---- occupancy trend / activity timeline --------------------------------
  function Occupancy({
    hex,
    series
  }) {
    const t = useClock(900);
    const s = Array.isArray(series) && series.length > 2 ? series : Array.from({
      length: 60
    }, (_, i) => (0.45 + 0.22 * Math.sin(i / 7 + t * 0.3) + (Math.random() - 0.5) * 0.08) * 100);
    return /*#__PURE__*/React.createElement(Trend, {
      hex: "#3FBE82",
      series: s,
      lo: 0,
      hi: 100,
      threshold: 70,
      fill: true
    });
  }
  function Activity() {
    const t = useClock(700);
    const n = 44;
    const bars = Array.from({
      length: n
    }, (_, i) => 0.3 + 0.5 * Math.abs(Math.sin(i / 3 + t)) + Math.random() * 0.15);
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 500 120",
      style: {
        width: '100%',
        height: 130
      },
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement(GridLines, null), bars.map((v, i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: i * (500 / n) + 1,
      y: 120 - Math.min(1, v) * 112,
      width: 500 / n - 2,
      height: Math.min(1, v) * 112,
      fill: actColor(v),
      opacity: "0.8"
    })));
  }

  // ---- needle gauge --------------------------------------------------------
  function NeedleGauge({
    value,
    lo,
    hi,
    unit,
    hex
  }) {
    const p = norm(value, lo, hi);
    const ang = -90 + p * 180;
    const r = 62;
    const cx = 80,
      cy = 80;
    const rad = ang * Math.PI / 180;
    const arc = (a0, a1, color) => {
      const s = a0 * Math.PI / 180,
        e = a1 * Math.PI / 180;
      return /*#__PURE__*/React.createElement("path", {
        d: `M ${cx + r * Math.cos(s)} ${cy + r * Math.sin(s)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(e)} ${cy + r * Math.sin(e)}`,
        fill: "none",
        stroke: color,
        strokeWidth: "6"
      });
    };
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 160 100",
      style: {
        width: '100%',
        height: 110
      }
    }, arc(180, 240, '#3FBE82'), arc(240, 300, '#F4AC3E'), arc(300, 360, '#E25141'), /*#__PURE__*/React.createElement("line", {
      x1: cx,
      y1: cy,
      x2: cx + (r - 8) * Math.cos(rad),
      y2: cy + (r - 8) * Math.sin(rad),
      stroke: "#16181A",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "4",
      fill: "#16181A"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: "96",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)",
      fontSize: "12",
      fontWeight: "700",
      fill: hex
    }, value.toFixed(1), " ", unit));
  }

  // ---- radial (semicircular) gauge ----------------------------------------
  function RadialGauge({
    pct,
    levelColor,
    label
  }) {
    const r = 56,
      cx = 70,
      cy = 70,
      circ = Math.PI * r;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 140 86",
      style: {
        width: '100%',
        height: 100
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: `M 14 70 A ${r} ${r} 0 0 1 126 70`,
      fill: "none",
      stroke: "rgba(118,125,128,0.18)",
      strokeWidth: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: `M 14 70 A ${r} ${r} 0 0 1 126 70`,
      fill: "none",
      stroke: levelColor,
      strokeWidth: "9",
      strokeLinecap: "round",
      strokeDasharray: `${circ * pct / 100} ${circ}`,
      style: {
        transition: 'stroke-dasharray 0.6s ease'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: "62",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)",
      fontSize: "20",
      fontWeight: "700",
      fill: "#16181A"
    }, pct.toFixed(0), "%"), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: "80",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)",
      fontSize: "9",
      fill: MUTED
    }, label));
  }

  // ---- traffic light -------------------------------------------------------
  function TrafficLight({
    level,
    labels
  }) {
    const order = ['safe', 'moderate', 'high'];
    const colors = {
      safe: 'var(--color-safe)',
      moderate: 'var(--color-moderate)',
      high: 'var(--color-high)'
    };
    const lab = labels || {
      safe: 'Low',
      moderate: 'Moderate',
      high: 'High'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '4px 0'
      }
    }, order.map(o => {
      const on = o === level;
      return /*#__PURE__*/React.createElement("div", {
        key: o,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          opacity: on ? 1 : 0.32
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: colors[o],
          boxShadow: on ? `0 0 8px ${colors[o]}` : 'none'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: on ? 700 : 400,
          color: '#16181A'
        }
      }, lab[o]));
    }));
  }

  // ---- RSSI signal bars ----------------------------------------------------
  function SignalBars({
    level,
    max
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        height: 56
      }
    }, Array.from({
      length: max
    }, (_, i) => {
      const on = i < level;
      const c = i < max * 0.4 ? '#3FBE82' : i < max * 0.7 ? '#F4AC3E' : '#E25141';
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          flex: 1,
          height: `${20 + i / max * 80}%`,
          background: on ? c : 'rgba(118,125,128,0.16)',
          borderRadius: '1px'
        }
      });
    }));
  }

  // ---- diagnostic ADC bar --------------------------------------------------
  function DiagnosticBar({
    value,
    max
  }) {
    const p = value / max * 100;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 12,
        borderRadius: 6,
        background: 'var(--color-surface-alt)',
        overflow: 'hidden',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 1,
        background: MUTED
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${p}%`,
        height: '100%',
        background: 'var(--color-nrf)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: MUTED,
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement("span", null, "0"), /*#__PURE__*/React.createElement("span", null, value, " / ", max, " ADC"), /*#__PURE__*/React.createElement("span", null, max)));
  }
  Object.assign(window, {
    useClock,
    useReading,
    Charts: {
      Trend,
      Waveform,
      FFT,
      Polarity,
      PeakAvg,
      Histogram,
      Exposure,
      Spectrum,
      Waterfall,
      Occupancy,
      Activity,
      NeedleGauge,
      RadialGauge,
      TrafficLight,
      SignalBars,
      DiagnosticBar,
      actColor,
      norm
    }
  });
}

/* ===== LiveData.jsx ===== */
{
  // EMScope UI kit — live backend data link. Loaded as text/babel.
  // Polls GET /latest once per second, normalizes the payload per vertical, and
  // keeps a rolling history for the trend / waterfall charts. Fails soft: while the
  // server is asleep (Render free tier can take up to ~50s to wake) the dashboard
  // shows clearly-labelled demo readings and a "waiting / reconnecting" banner.

  const LIVE_URL = 'https://emf-dashboard.onrender.com/latest';
  const POLL_MS = 1000;
  const FETCH_TIMEOUT_MS = 8000;
  const HIST_LEN = 70; // points kept for trend charts
  const WF_ROWS = 60; // rows kept for the NRF waterfall

  // vertical key -> API sub-object key
  const API_KEY = {
    electric: 'electric',
    magnetic: 'magnetic',
    nrf: 'rf_scan',
    rfpower: 'rf_power'
  };
  const liveStore = {
    data: null,
    // last successful payload
    status: 'connecting',
    // 'connecting' (never got data) | 'live' | 'reconnecting'
    lastOk: 0,
    // timestamp of last good packet
    rev: 0,
    // bumps on every successful ingest (canvas redraw signal)
    hist: {
      electric: [],
      magnetic: [],
      nrf: [],
      rfpower: []
    },
    // rolling current values
    wf: [],
    // NRF channel_occupancy snapshots (oldest -> newest)
    subs: new Set(),
    sub(fn) {
      this.subs.add(fn);
      return () => {
        this.subs.delete(fn);
      };
    },
    emit() {
      this.subs.forEach(f => f());
    }
  };
  window.liveStore = liveStore;
  function classToLevel(c) {
    const s = String(c || '').toLowerCase();
    if (s[0] === 'h') return 'high';
    if (s[0] === 'm') return 'moderate';
    return 'safe';
  }
  function curForVertical(key, o) {
    if (!o) return null;
    if (key === 'electric') return o.current_vm;
    if (key === 'magnetic') return o.current_mt;
    if (key === 'rfpower') return o.current_dbm;
    if (key === 'nrf') {
      if (Array.isArray(o.channel_occupancy) && o.channel_occupancy.length) return o.channel_occupancy.reduce((a, b) => a + b, 0) / o.channel_occupancy.length;
      return o.avg_occupancy;
    }
    return null;
  }
  function ingest(payload) {
    liveStore.data = payload;
    liveStore.lastOk = Date.now();
    liveStore.status = 'live';
    liveStore.rev++;
    ['electric', 'magnetic', 'nrf', 'rfpower'].forEach(k => {
      const c = curForVertical(k, payload[API_KEY[k]]);
      if (typeof c === 'number' && isFinite(c)) {
        const h = liveStore.hist[k];
        h.push(c);
        if (h.length > HIST_LEN) h.shift();
      }
    });
    const rf = payload[API_KEY.nrf];
    if (rf && Array.isArray(rf.channel_occupancy) && rf.channel_occupancy.length) {
      liveStore.wf.push(rf.channel_occupancy);
      if (liveStore.wf.length > WF_ROWS) liveStore.wf.shift();
    }
    liveStore.emit();
  }
  let pollTimer = null;
  async function pollOnce() {
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
      const res = await fetch(LIVE_URL, {
        signal: ctrl.signal,
        cache: 'no-store'
      });
      clearTimeout(to);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      ingest(json);
    } catch (e) {
      // soft-fail: keep last data, flip to reconnecting (or stay connecting if we never linked)
      liveStore.status = liveStore.data ? 'reconnecting' : 'connecting';
      liveStore.emit();
    }
  }
  function startPolling() {
    if (pollTimer) return;
    pollOnce();
    pollTimer = setInterval(pollOnce, POLL_MS);
  }

  // Subscribe a component to the store; starts polling on first mount.
  function useLive() {
    const [, force] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => {
      startPolling();
      return liveStore.sub(force);
    }, []);
    return liveStore;
  }
  function fmtBig(n) {
    if (typeof n !== 'number' || !isFinite(n)) return '—';
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + 'k';
    if (Math.abs(n) >= 100) return n.toFixed(0);
    return n.toFixed(0);
  }

  // Build a normalized reading for a vertical. `sim` is the simulated useReading
  // fallback used until the first live packet lands so the instruments look alive.
  function readVertical(v, live, sim) {
    const o = live.data ? live.data[API_KEY[v.key]] : null;
    if (!o) {
      return {
        live: false,
        cur: sim.cur,
        peak: sim.peak,
        avg: sim.avg,
        series: sim.series,
        level: v.level,
        exposurePct: window.Charts.norm(sim.cur, v.range[0], v.range[1]) * 100,
        tier2: v.tier2.map(t => t.value),
        raw: {},
        signalLevel: 6
      };
    }
    const level = classToLevel(o.classification);
    const histRaw = live.hist[v.key] || [];
    const series = histRaw.length > 3 ? histRaw.slice() : sim.series;
    let cur,
      peak,
      avg,
      exposurePct,
      tier2,
      raw = {},
      signalLevel = 6;
    if (v.key === 'electric') {
      cur = o.current_vm;
      peak = o.peak_vm;
      avg = o.avg_vm;
      exposurePct = o.exposure_ratio;
      tier2 = [String(o.dominant_frequency_hz ?? '—'), fmtBig(o.cumulative_exposure)];
      raw.wave = o.raw_wave;
    } else if (v.key === 'magnetic') {
      cur = o.current_mt;
      peak = o.peak_mt;
      avg = o.avg_mt;
      exposurePct = o.exposure_ratio;
      tier2 = [String(o.dominant_frequency_hz ?? '—'), String(o.polarity_reversal_rate ?? '—')];
      raw.signed = o.raw_signed_mt;
    } else if (v.key === 'nrf') {
      cur = curForVertical('nrf', o);
      peak = o.peak_occupancy;
      avg = o.avg_occupancy;
      exposurePct = o.band_congestion_index;
      tier2 = [String(o.device_count_estimate ?? '—'), o.hopping_pattern_active ? 'Active' : 'Idle', String(o.idle_channel_count ?? '—')];
      raw.channels = o.channel_occupancy;
    } else if (v.key === 'rfpower') {
      cur = o.current_dbm;
      peak = o.peak_dbm;
      avg = o.avg_dbm;
      exposurePct = o.exposure_ratio;
      tier2 = [String(o.power_density_wm2 ?? '—'), String(o.power_density_mwm2 ?? '—'), String(o.signal_bar_level ?? '—')];
      raw.histogram = o.session_histogram;
      signalLevel = typeof o.signal_bar_level === 'number' ? o.signal_bar_level : 6;
    }
    const fix = (n, d) => typeof n === 'number' && isFinite(n) ? n : d;
    return {
      live: true,
      cur: fix(cur, sim.cur),
      peak: fix(peak, sim.peak),
      avg: fix(avg, sim.avg),
      series,
      level,
      exposurePct: fix(exposurePct, window.Charts.norm(fix(cur, sim.cur), v.range[0], v.range[1]) * 100),
      tier2: tier2 || v.tier2.map(t => t.value),
      raw,
      signalLevel
    };
  }

  // --- connection banner ----------------------------------------------------
  function secsAgo(ts) {
    if (!ts) return null;
    return Math.max(0, Math.round((Date.now() - ts) / 1000));
  }
  function ConnectionBanner() {
    const live = useLive();
    window.useClock(1000); // tick so "Ns ago" stays current
    if (live.status === 'live') return null;
    const connecting = live.status === 'connecting';
    const color = connecting ? 'var(--color-moderate)' : 'var(--color-high)';
    const ago = secsAgo(live.lastOk);
    const msg = connecting ? 'Waiting for the monitoring server — it may be waking from sleep (free tier, up to ~50s). Showing demo readings until the first live packet arrives.' : 'Reconnecting to the monitoring server' + (ago != null ? ' — last reading ' + ago + 's ago. Showing the last known values.' : '…');
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--color-navy)',
        borderBottom: '1px solid var(--color-navy-2)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '9px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        animation: 'emscope-led 1.6s ease-in-out infinite'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: color,
        flexShrink: 0
      }
    }, connecting ? 'Linking' : 'Reconnecting'), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.82rem',
        color: '#C7D6E2',
        lineHeight: 1.4
      }
    }, msg), /*#__PURE__*/React.createElement("style", null, `@keyframes emscope-led{0%,100%{box-shadow:0 0 0 0 rgba(224,148,42,.5)}50%{box-shadow:0 0 0 5px rgba(224,148,42,0)}}`)));
  }
  Object.assign(window, {
    useLive,
    readVertical,
    classToLevel,
    ConnectionBanner,
    LIVE_URL
  });
}

/* ===== Recommendations.jsx ===== */
{
  // EMScope UI kit — context input + recommendation engine. Loaded as text/babel.
  const {
    Button,
    Card,
    SectionHeading
  } = window.EMScopeDesignSystem_3c9a3a;
  const fieldLabel = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.64rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: 'var(--color-text-muted)',
    marginBottom: 5,
    display: 'block'
  };
  const inputStyle = {
    width: '100%',
    fontFamily: 'var(--font-dashboard)',
    fontSize: '0.85rem',
    padding: '8px 10px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-card)',
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    boxSizing: 'border-box'
  };
  function Field({
    label,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: fieldLabel
    }, label), children);
  }
  function RecommendationEngine({
    v,
    reading,
    level
  }) {
    const [src, setSrc] = React.useState('Wi-Fi router');
    const [dist, setDist] = React.useState('2');
    const [hours, setHours] = React.useState('8');
    const [freq, setFreq] = React.useState('Continuous');
    const [note, setNote] = React.useState('');
    const [out, setOut] = React.useState(null);
    const analyze = () => {
      const advice = window.SOURCE_ADVICE[src] || window.SOURCE_ADVICE._default;
      setOut({
        summary: `You are approximately ${dist || '—'} m from a ${src.toLowerCase()} for ${hours || '—'} hours/day (${freq.toLowerCase()}). The current measured ${v.name.toLowerCase()} reading is ${reading.toFixed(1)} ${v.unit}. The project's reference limit for this vertical is ${v.refLimit} ${v.unit}.`,
        level,
        classText: window.LEVEL_SENTENCE[level],
        advice
      });
    };
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SectionHeading, {
      kicker: "Context & Recommendations",
      title: "Analyze your exposure",
      as: "h3"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Source type"
    }, /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      value: src,
      onChange: e => setSrc(e.target.value)
    }, window.SOURCE_OPTIONS.map(o => /*#__PURE__*/React.createElement("option", {
      key: o
    }, o)))), /*#__PURE__*/React.createElement(Field, {
      label: "Distance (m)"
    }, /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      value: dist,
      onChange: e => setDist(e.target.value),
      inputMode: "decimal"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Daily exposure (h/day)"
    }, /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      value: hours,
      onChange: e => setHours(e.target.value),
      inputMode: "decimal"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Frequency of exposure"
    }, /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      value: freq,
      onChange: e => setFreq(e.target.value)
    }, /*#__PURE__*/React.createElement("option", null, "Continuous"), /*#__PURE__*/React.createElement("option", null, "Intermittent"), /*#__PURE__*/React.createElement("option", null, "Occasional"))), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Additional context"
    }, /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      value: note,
      onChange: e => setNote(e.target.value),
      placeholder: "e.g. router mounted above the desk"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: analyze
    }, "Analyze")), out && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        borderTop: '1px solid var(--color-border)',
        paddingTop: 16
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.92rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        margin: '0 0 12px'
      }
    }, out.summary), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-dashboard)',
        fontWeight: 700,
        fontSize: '0.9rem',
        color: window.LEVEL_COLOR[out.level],
        margin: '0 0 14px'
      }
    }, "Classified as ", window.LEVEL_LABEL[out.level], " exposure \u2014 ", out.classText), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.64rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: 'var(--color-text-muted)',
        marginBottom: 8
      }
    }, "Recommendations"), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: 0,
        paddingLeft: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, out.advice.map((a, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        fontSize: '0.86rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5
      }
    }, a))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '0.72rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
        marginTop: 14,
        marginBottom: 0
      }
    }, window.LIMITATIONS)));
  }
  Object.assign(window, {
    RecommendationEngine
  });
}

/* ===== Chrome.jsx ===== */
{
  // EMScope UI kit — Navbar + Footer chrome. Loaded as text/babel.
  const {
    StatusIndicator
  } = window.EMScopeDesignSystem_3c9a3a;
  function Navbar({
    active,
    onHome,
    onNav
  }) {
    const live = window.useLive();
    const online = live.status === 'live';
    const label = online ? 'SYSTEM ONLINE' : live.status === 'reconnecting' ? 'RECONNECTING…' : 'CONNECTING…';
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--color-navy)',
        borderBottom: '3px solid var(--color-accent)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        height: 80,
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        cursor: 'pointer'
      },
      onClick: onHome
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.2rem',
        color: '#fff'
      }
    }, "EMScope"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.68rem',
        color: 'var(--color-accent-bright)'
      }
    }, "EM Pollution Monitoring System"))), /*#__PURE__*/React.createElement("ul", {
      style: {
        display: 'flex',
        gap: 24,
        listStyle: 'none',
        margin: 0,
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      onClick: onHome,
      style: navLink(active === 'home')
    }, "Home")), window.VERTICALS.map(v => /*#__PURE__*/React.createElement("li", {
      key: v.key
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => onNav(v.key),
      style: navLink(active === v.key)
    }, v.name.replace(' Scanner', '').replace(' Field', ''))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(StatusIndicator, {
      state: online ? 'online' : 'offline',
      pulse: online,
      label: label
    }))));
  }
  function navLink(isActive) {
    return {
      color: isActive ? '#fff' : '#C7D6E2',
      fontFamily: 'var(--font-dashboard)',
      fontSize: '0.85rem',
      fontWeight: 600,
      padding: '6px 2px',
      borderBottom: '2px solid ' + (isActive ? 'var(--color-accent)' : 'transparent'),
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    };
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        padding: '16px 0 24px',
        borderTop: '3px solid var(--color-accent)',
        background: 'var(--color-navy)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
        fontSize: '0.76rem',
        color: 'var(--color-text-on-dark-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--color-accent-bright)'
      }
    }, "EMScope"), " \u2014 EL Phase 3 Dashboard"), /*#__PURE__*/React.createElement("div", null, "RV College of Engineering \xB7 ECE"), /*#__PURE__*/React.createElement("div", null, "Kashvi Sharma \xB7 Manaswi K B \xB7 Sivani Vemuri \xB7 Stuthi")));
  }
  Object.assign(window, {
    Navbar,
    Footer
  });
}

/* ===== HomeScreen.jsx ===== */
{
  // EMScope UI kit — Home screen. Loaded as text/babel.
  const {
    Button,
    Tag,
    StatRibbon,
    SectionHeading,
    ModuleCard,
    Card
  } = window.EMScopeDesignSystem_3c9a3a;
  function HeroBg() {
    return /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.8
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 1200 280",
      preserveAspectRatio: "none",
      style: {
        width: '100%',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 180 Q 100 130, 200 180 T 400 180 T 600 180 T 800 180 T 1000 180 T 1200 180",
      fill: "none",
      stroke: "#D1453A",
      strokeWidth: "1.8",
      opacity: "0.65"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0 210 Q 100 250, 200 210 T 400 210 T 600 210 T 800 210 T 1000 210 T 1200 210",
      fill: "none",
      stroke: "#8E5BC4",
      strokeWidth: "1.8",
      opacity: "0.6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M0 150 Q 100 100, 200 150 T 400 150 T 600 150 T 800 150 T 1000 150 T 1200 150",
      fill: "none",
      stroke: "#3E9E4F",
      strokeWidth: "1.4",
      opacity: "0.55"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "0",
      width: "3",
      height: "280",
      fill: "#F4AC3E",
      opacity: "0.7",
      style: {
        animation: 'emscope-sweep 5s linear infinite'
      }
    })), /*#__PURE__*/React.createElement("style", null, `@keyframes emscope-sweep{0%{transform:translateX(-2%)}100%{transform:translateX(102%)}}@keyframes emscope-led{0%,100%{box-shadow:0 0 0 0 rgba(63,190,130,.55)}50%{box-shadow:0 0 0 6px rgba(63,190,130,0)}}`));
  }
  function Section({
    children,
    last,
    id
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: id,
      style: {
        padding: '32px 0',
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        scrollMarginTop: 90
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 24px'
      }
    }, children));
  }
  const kick = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.66rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)'
  };

  // ---- data link setup (USB / Wi-Fi) --------------------------------------
  function ConnectionSetup({
    link,
    setLink
  }) {
    const opts = [{
      key: 'wifi',
      icon: window.Icons.wifi,
      name: 'Wi-Fi',
      detail: 'ESP32 → local server → dashboard',
      meta: '192.168.1.42 : 8000'
    }, {
      key: 'usb',
      icon: window.Icons.usb,
      name: 'USB Serial',
      detail: 'ESP32 → USB → host script',
      meta: '/dev/ttyUSB0 · 115200'
    }];
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        ...kick,
        marginBottom: 12
      }
    }, "Data Link \xB7 choose ingestion"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      }
    }, opts.map(o => {
      const on = link === o.key;
      return /*#__PURE__*/React.createElement("button", {
        key: o.key,
        onClick: () => setLink(o.key),
        style: {
          textAlign: 'left',
          cursor: 'pointer',
          background: on ? 'var(--color-surface-alt)' : 'var(--color-surface)',
          border: '1px solid ' + (on ? 'var(--color-primary)' : 'var(--color-border)'),
          borderRadius: 'var(--radius-card)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          font: 'inherit'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 20,
          height: 20,
          color: on ? 'var(--color-primary)' : 'var(--color-text-muted)'
        }
      }, o.icon), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-dashboard)',
          fontWeight: 700,
          fontSize: '0.92rem',
          color: 'var(--color-text-primary)'
        }
      }, o.name), on && /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          fontWeight: 700,
          color: 'var(--color-safe)',
          textTransform: 'uppercase'
        }
      }, "\u25CF Active")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: '0.74rem',
          color: 'var(--color-text-secondary)'
        }
      }, o.detail), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: '0.64rem',
          color: 'var(--color-text-muted)'
        }
      }, o.meta));
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
        margin: '12px 0 0'
      }
    }, "Charts and the recommendation engine work identically under either link \u2014 only the ingestion layer differs."));
  }

  // ---- live status with LED -----------------------------------------------
  function LiveStatus({
    link,
    live
  }) {
    window.useClock(1000); // tick so the "last update" / age stays current
    const online = live.status === 'live';
    const reconnecting = live.status === 'reconnecting';
    const ledColor = online ? '#3FBE82' : reconnecting ? '#E25141' : '#F4AC3E';
    const title = online ? 'System Live' : reconnecting ? 'Reconnecting' : 'Waiting for Data';
    const ago = live.lastOk ? Math.max(0, Math.round((Date.now() - live.lastOk) / 1000)) : null;
    const sub = online ? `Streaming via ${link === 'usb' ? 'USB serial' : 'Wi-Fi'}` : ago != null ? `Last packet ${ago}s ago` : 'Linking to monitoring server…';
    const lastStr = live.lastOk ? new Date(live.lastOk).toLocaleTimeString('en-GB') : '—';
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        background: 'var(--color-navy)',
        borderColor: 'var(--color-navy-2)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: ledColor,
        animation: 'emscope-led 1.6s ease-in-out infinite',
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#fff'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.66rem',
        color: 'var(--color-accent-bright)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em'
      }
    }, sub))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 10,
        marginTop: 16
      }
    }, [['Last Update', lastStr], ['Sample Rate', '1 Hz'], ['Modules', '4 / 4']].map(r => /*#__PURE__*/React.createElement("div", {
      key: r[0]
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: 'var(--color-text-on-dark-muted)'
      }
    }, r[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.95rem',
        fontWeight: 700,
        color: '#fff',
        marginTop: 2
      }
    }, r[1])))));
  }

  // ---- at-a-glance window (broadest measurement per vertical) --------------
  function GlanceWindow({
    v,
    onNav
  }) {
    const live = window.useLive();
    const sim = window.useReading(v.base, v.jitter);
    const rd = window.readVertical(v, live, sim);
    const C = window.Charts;
    const lvlColor = window.LEVEL_COLOR[rd.level];
    const spark = (rd.series && rd.series.length ? rd.series : sim.series).slice(-28);
    const pts = spark.map((val, i) => `${i / (spark.length - 1) * 100},${28 - C.norm(val, v.range[0], v.range[1]) * 24 - 2}`).join(' ');
    return /*#__PURE__*/React.createElement(Card, {
      interactive: true,
      onClick: () => onNav(v.key),
      style: {
        cursor: 'pointer',
        padding: '14px 16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 6,
        background: v.chip,
        color: v.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        display: 'block'
      }
    }, window.Icons[v.key])), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        fontWeight: 700,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase'
      }
    }, v.number, " \xB7 ", v.glance), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: lvlColor
      },
      title: window.LEVEL_LABEL[rd.level]
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '1.7rem',
        lineHeight: 1,
        color: v.color
      }
    }, rd.cur.toFixed(1)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)'
      }
    }, v.unit)), /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 100 28",
      preserveAspectRatio: "none",
      style: {
        width: '100%',
        height: 28,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("polyline", {
      points: pts,
      fill: "none",
      stroke: v.hex,
      strokeWidth: "1.2"
    })));
  }
  function HomeScreen({
    onNav
  }) {
    const [link, setLink] = React.useState(() => localStorage.getItem('emscope_link') || 'wifi');
    const setAndSave = k => {
      setLink(k);
      localStorage.setItem('emscope_link', k);
    };
    const live = window.useLive();
    window.useClock(1000);
    const statusWord = live.status === 'live' ? 'Online' : live.status === 'reconnecting' ? 'Reconnecting' : 'Connecting';
    const lastStr = live.lastOk ? new Date(live.lastOk).toLocaleTimeString('en-GB') : '—';
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        padding: '48px 0 32px',
        borderBottom: '3px solid var(--color-accent)',
        background: 'linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-2) 100%)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement(HeroBg, null), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 720,
        margin: '0 auto',
        padding: '0 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-accent-bright)',
        marginBottom: 8
      }
    }, "RV College of Engineering \xB7 ECE"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '3.3rem',
        fontWeight: 700,
        lineHeight: 1.05,
        margin: '0 0 4px',
        color: '#fff',
        letterSpacing: '-0.01em',
        textShadow: 'var(--shadow-hero-text)'
      }
    }, "EMScope"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '1rem',
        fontWeight: 700,
        color: 'var(--color-accent-bright)',
        margin: '0 0 16px',
        letterSpacing: '0.03em',
        textTransform: 'uppercase'
      }
    }, "EL Phase 3 Dashboard"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '1.1rem',
        fontStyle: 'italic',
        color: '#C7D6E2',
        margin: '0 0 24px'
      }
    }, "A handheld EM pollution monitor measuring electric fields, magnetic fields, and RF activity in real time."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => document.getElementById('modules').scrollIntoView({
        behavior: 'smooth'
      })
    }, "View Monitoring Modules"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
      })
    }, "Technical Background")))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)',
        gap: 16,
        alignItems: 'stretch'
      }
    }, /*#__PURE__*/React.createElement(ConnectionSetup, {
      link: link,
      setLink: setAndSave
    }), /*#__PURE__*/React.createElement(LiveStatus, {
      link: link,
      live: live
    }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
      kicker: "Live Readings",
      title: "At a glance"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginTop: 16
      }
    }, window.VERTICALS.map(v => /*#__PURE__*/React.createElement(GlanceWindow, {
      key: v.key,
      v: v,
      onNav: onNav
    })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(StatRibbon, {
      items: [{
        value: '4',
        label: 'Sensing Verticals',
        color: 'var(--color-primary-bright)'
      }, {
        value: '125',
        label: 'RF Channels Scanned',
        color: '#3FBE82'
      }, {
        value: '1MHz–8GHz',
        label: 'RF Power Range',
        color: 'var(--color-accent-bright)'
      }, {
        value: 'ICNIRP',
        label: 'Reference Framework',
        color: '#C9A6F0'
      }]
    })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)',
        gap: 24,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
      kicker: "What is EM Pollution",
      title: "Everyday exposure, measured"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.98rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        margin: '12px 0 0'
      }
    }, "Unwanted electromagnetic exposure from everyday sources \u2014 mobile phones, Wi-Fi, power lines, appliances \u2014 accumulates in daily environments. EMScope measures it directly and turns raw sensor data into interpretable safety information."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: "blue"
    }, "E-Field"), /*#__PURE__*/React.createElement(Tag, {
      tone: "green"
    }, "M-Field"), /*#__PURE__*/React.createElement(Tag, {
      tone: "yellow"
    }, "2.4GHz RF"), /*#__PURE__*/React.createElement(Tag, {
      tone: "orange"
    }, "Broadband RF"), /*#__PURE__*/React.createElement(Tag, {
      tone: "red"
    }, "ICNIRP Scoring"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        ...kick,
        marginBottom: 16
      }
    }, "System Status"), [['Status', statusWord], ['Active Modules', '4 / 4'], ['Data Link', link === 'usb' ? 'USB Serial' : 'Wi-Fi'], ['Last Update', lastStr]].map((r, i, a) => /*#__PURE__*/React.createElement("div", {
      key: r[0],
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 0',
        borderBottom: i < a.length - 1 ? '1px solid var(--color-border)' : 'none',
        fontSize: '0.85rem'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-text-secondary)'
      }
    }, r[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600
      }
    }, r[1])))))), /*#__PURE__*/React.createElement(Section, {
      id: "modules"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      kicker: "Monitoring Modules",
      title: "Select a Vertical"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        marginTop: 16
      }
    }, window.VERTICALS.map(v => /*#__PURE__*/React.createElement(ModuleCard, {
      key: v.key,
      number: v.number,
      name: v.name,
      sensor: v.sensor,
      description: v.desc,
      metrics: v.charts.slice(0, 3).map(c => c.title.split(' ')[0]),
      icon: window.Icons[v.key],
      accentColor: v.color,
      chipBg: v.chip,
      onClick: () => onNav(v.key),
      style: {
        cursor: 'pointer'
      }
    })))), /*#__PURE__*/React.createElement(Section, {
      last: true,
      id: "about"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      kicker: "Technical Background & Methodology",
      title: "How EMScope Works"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        marginTop: 16
      }
    }, [['01 · Sensing', 'Acquisition', 'Each vertical pairs a dedicated sensor with the ESP32 ADC — capacitive antenna, Hall-effect sensor, NRF24L01+ scanner, and AD8318 log detector.'], ['02 · Processing', 'Calibration & Filtering', 'Raw counts are converted to physical units via baseline calibration, RMS computation, and noise filtering before display.'], ['03 · Interpretation', 'Exposure Scoring', 'Readings are classified Low / Moderate / High against project thresholds referenced to ICNIRP guidelines — informational, not clinical.']].map(c => /*#__PURE__*/React.createElement(Card, {
      key: c[0]
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'var(--color-accent)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: 4
      }
    }, c[0]), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        fontWeight: 700,
        margin: '0 0 6px',
        color: 'var(--color-text-primary)'
      }
    }, c[1]), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.86rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.55,
        margin: 0
      }
    }, c[2]))))));
  }
  Object.assign(window, {
    HomeScreen
  });
}

/* ===== ModuleDetail.jsx ===== */
{
  // EMScope UI kit — module detail (full instrument view). Loaded as text/babel.
  const {
    Button,
    Tag,
    Card
  } = window.EMScopeDesignSystem_3c9a3a;
  const kicker = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.66rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)'
  };

  // One Tier-1 stat cell.
  function StatCell({
    label,
    value,
    unit,
    big,
    color
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '14px 16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: kicker
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 5,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: big ? '2rem' : '1.3rem',
        lineHeight: 1,
        color: color || 'var(--color-text-primary)'
      }
    }, value), unit && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--color-text-muted)'
      }
    }, unit)));
  }

  // Chart card: title + thin chart + one-sentence caption with units.
  function ChartCard({
    title,
    sentence,
    big,
    children
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        gridColumn: big ? '1 / -1' : 'auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...kicker,
        marginBottom: 10
      }
    }, title), children, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
        margin: '10px 0 0'
      }
    }, sentence));
  }
  function VisualCard({
    title,
    sentence,
    children
  }) {
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        ...kicker,
        marginBottom: 8
      }
    }, title), children, sentence && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.76rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.4,
        margin: '8px 0 0'
      }
    }, sentence));
  }
  function renderChart(kind, v, rd, live) {
    const C = window.Charts;
    const [lo, hi] = v.range;
    const thr = rd.level === 'safe' ? hi * 0.75 : hi * 0.55;
    switch (kind) {
      case 'waveform':
        return /*#__PURE__*/React.createElement(C.Waveform, {
          hex: v.hex,
          data: rd.raw.wave
        });
      case 'trend':
        return /*#__PURE__*/React.createElement(C.Trend, {
          hex: v.hex,
          series: rd.series,
          lo: lo,
          hi: hi,
          threshold: thr,
          fill: true
        });
      case 'density':
        return /*#__PURE__*/React.createElement(C.Trend, {
          hex: "#1A8F8F",
          series: rd.series,
          lo: lo,
          hi: hi,
          threshold: hi * 0.7,
          fill: true
        });
      case 'fft':
        return /*#__PURE__*/React.createElement(C.FFT, {
          hex: v.hex
        });
      case 'polarity':
        return /*#__PURE__*/React.createElement(C.Polarity, {
          hex: v.hex,
          data: rd.raw.signed
        });
      case 'peakavg':
        return /*#__PURE__*/React.createElement(C.PeakAvg, {
          hex: v.hex,
          peak: rd.peak,
          avg: rd.avg,
          lo: lo,
          hi: hi,
          unit: v.unit
        });
      case 'histogram':
        return /*#__PURE__*/React.createElement(C.Histogram, {
          hex: v.hex,
          bins: rd.raw.histogram
        });
      case 'exposure':
        return /*#__PURE__*/React.createElement(C.Exposure, {
          pct: rd.exposurePct,
          levelColor: window.LEVEL_COLOR[rd.level]
        });
      case 'spectrum':
        return /*#__PURE__*/React.createElement(C.Spectrum, {
          big: true,
          data: rd.raw.channels
        });
      case 'waterfall':
        return /*#__PURE__*/React.createElement(C.Waterfall, {
          big: true,
          rows: live.wf,
          rev: live.rev
        });
      case 'occupancy':
        return /*#__PURE__*/React.createElement(C.Occupancy, {
          hex: v.hex,
          series: live.hist[v.key]
        });
      case 'activity':
        return /*#__PURE__*/React.createElement(C.Activity, null);
      default:
        return null;
    }
  }
  function ModuleDetail({
    vkey,
    onBack,
    onNav
  }) {
    const v = window.VERTICALS.find(x => x.key === vkey);
    const live = window.useLive();
    const sim = window.useReading(v.base, v.jitter);
    const rd = window.readVertical(v, live, sim);
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [vkey]);
    const C = window.Charts;
    const [lo, hi] = v.range;
    const exposurePct = rd.exposurePct;
    const level = rd.level;
    const lvlColor = window.LEVEL_COLOR[level];
    const nrfLabels = {
      safe: 'Clear',
      moderate: 'Moderate',
      high: 'Congested'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '24px 24px 48px'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: onBack,
      style: {
        paddingLeft: 0,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        display: 'inline-block'
      }
    }, window.Icons.back), " All modules"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 10,
        background: v.chip,
        color: v.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        display: 'block'
      }
    }, window.Icons[v.key])), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: kicker
    }, v.number, " \xB7 ", v.sensor, " \xB7 ", v.pin), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 700,
        margin: '2px 0 0',
        color: 'var(--color-text-primary)'
      }
    }, v.name)), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: rd.live ? 'var(--color-safe)' : 'var(--color-moderate)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: rd.live ? 'var(--color-safe)' : 'var(--color-moderate)',
        animation: 'emscope-led 1.6s ease-in-out infinite'
      }
    }), rd.live ? 'Live' : 'Demo')), v.disclaimer && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
        background: 'var(--color-surface-alt)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '8px 12px',
        margin: '12px 0 0'
      }
    }, "\u26A0 ", v.disclaimer), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 12,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(StatCell, {
      label: "Current",
      value: rd.cur.toFixed(1),
      unit: v.unit,
      big: true,
      color: v.color
    }), /*#__PURE__*/React.createElement(StatCell, {
      label: "Peak (session)",
      value: rd.peak.toFixed(1),
      unit: v.unit
    }), /*#__PURE__*/React.createElement(StatCell, {
      label: "Average",
      value: rd.avg.toFixed(1),
      unit: v.unit
    }), /*#__PURE__*/React.createElement(StatCell, {
      label: "Exposure Ratio",
      value: exposurePct.toFixed(0),
      unit: "%"
    }), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: lvlColor
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.85)'
      }
    }, "Classification"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#fff',
        marginTop: 4
      }
    }, v.priority ? nrfLabels[level] : window.LEVEL_LABEL[level]))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...kicker,
        margin: '24px 0 10px'
      }
    }, "Standout Quantities"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(${v.tier2.length}, 1fr)`,
        gap: 12
      }
    }, v.tier2.map((t, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      accentColor: v.color
    }, /*#__PURE__*/React.createElement("div", {
      style: kicker
    }, t.label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 5,
        margin: '6px 0 8px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '1.5rem',
        color: v.color
      }
    }, rd.tier2[i] != null ? rd.tier2[i] : t.value), t.unit && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--color-text-muted)'
      }
    }, t.unit)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-doc)',
        fontSize: '0.8rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
        margin: 0
      }
    }, t.sentence)))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...kicker,
        margin: '24px 0 10px'
      }
    }, "Charts"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12
      }
    }, v.charts.map((c, i) => /*#__PURE__*/React.createElement(ChartCard, {
      key: i,
      title: c.title,
      sentence: c.sentence,
      big: c.big
    }, renderChart(c.kind, v, rd, live)))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...kicker,
        margin: '24px 0 10px'
      }
    }, "Instrument Visuals"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12
      }
    }, v.visuals.includes('needle') && /*#__PURE__*/React.createElement(VisualCard, {
      title: "Analog Gauge",
      sentence: `Needle reading with colour zones, ${v.unit}.`
    }, /*#__PURE__*/React.createElement(C.NeedleGauge, {
      value: rd.cur,
      lo: lo,
      hi: hi,
      unit: v.unit,
      hex: v.hex
    })), v.visuals.includes('radial') && /*#__PURE__*/React.createElement(VisualCard, {
      title: v.priority ? 'Congestion Dial' : 'Intensity Dial',
      sentence: "Reading as a percentage of the reference, 0\u2013100%."
    }, /*#__PURE__*/React.createElement(C.RadialGauge, {
      pct: exposurePct,
      levelColor: lvlColor,
      label: v.priority ? 'congestion' : 'of limit'
    })), v.visuals.includes('signal') && /*#__PURE__*/React.createElement(VisualCard, {
      title: "Signal Strength",
      sentence: "Discrete phone-style bar level, 0\u201320."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 0'
      }
    }, /*#__PURE__*/React.createElement(C.SignalBars, {
      level: rd.signalLevel,
      max: 20
    }))), v.visuals.includes('traffic') && /*#__PURE__*/React.createElement(VisualCard, {
      title: "Status Indicator",
      sentence: "Three-state classification light."
    }, /*#__PURE__*/React.createElement(C.TrafficLight, {
      level: level,
      labels: v.priority ? nrfLabels : null
    })), v.visuals.includes('diagnostic') && /*#__PURE__*/React.createElement(VisualCard, {
      title: "Raw Diagnostic",
      sentence: "Raw sensor output for calibration, 0\u20134095 ADC."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 0 4px'
      }
    }, /*#__PURE__*/React.createElement(C.DiagnosticBar, {
      value: 2210,
      max: 4095
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(window.RecommendationEngine, {
      v: v,
      reading: rd.cur,
      level: level
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginTop: 24,
        justifyContent: 'center'
      }
    }, window.VERTICALS.filter(x => x.key !== v.key).map(x => /*#__PURE__*/React.createElement(Button, {
      key: x.key,
      variant: "secondary",
      size: "sm",
      onClick: () => onNav(x.key)
    }, x.name, " \u2192"))));
  }
  Object.assign(window, {
    ModuleDetail
  });
}

/* ===== App.jsx ===== */
{
  // EMScope UI kit — app shell with simple screen routing. Loaded as text/babel.
  function App() {
    const [view, setView] = React.useState('home'); // 'home' | vertical key

    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)'
      }
    }, /*#__PURE__*/React.createElement(window.Navbar, {
      active: view,
      onHome: () => setView('home'),
      onNav: setView
    }), /*#__PURE__*/React.createElement(window.ConnectionBanner, null), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1
      }
    }, view === 'home' ? /*#__PURE__*/React.createElement(window.HomeScreen, {
      onNav: setView
    }) : /*#__PURE__*/React.createElement(window.ModuleDetail, {
      key: view,
      vkey: view,
      onBack: () => setView('home'),
      onNav: setView
    })), /*#__PURE__*/React.createElement(window.Footer, null));
  }

  // Idempotent + deferred mount. The standalone bundler emits this script twice
  // (pre-transpiled + text/babel); guard against double createRoot and ensure the
  // DS bundle + React (blob-loaded) have executed before we render.
  function mountEMScope() {
    if (window.__emscopeMounted) return;
    if (!window.React || !window.ReactDOM || !window.EMScopeDesignSystem_3c9a3a || !window.App) return;
    window.__emscopeMounted = true;
    ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
  }
  window.App = App;
  window.mountEMScope = mountEMScope;
  // Only auto-mount when a host page explicitly opts in. Loading _ds_bundle.js for
  // its components alone must have NO side effect on the consumer's #root — the
  // screens preview (index.html) and standalone export set window.__EMSCOPE_AUTOMOUNT.
  if (window.__EMSCOPE_AUTOMOUNT) {
    if (document.readyState === 'complete') mountEMScope();else window.addEventListener('load', mountEMScope);
  }
}
})();