// EMScope UI kit — thin technical chart + gauge library. Loaded as text/babel.
// Aesthetic: fine strokes (1–1.3px), small mono labels, faint grid, navy analyzer insets.

const GRID = 'rgba(118,125,128,0.18)';
const MUTED = '#767D80';

// ---- shared hooks --------------------------------------------------------
function useClock(ms) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setT(x => x + 1), ms); return () => clearInterval(id); }, [ms]);
  return t;
}

function useReading(base, jitter, len = 70) {
  const [s, setS] = React.useState(() => ({ cur: base, peak: base, sum: base, n: 1, series: Array.from({ length: len }, () => base) }));
  React.useEffect(() => {
    const id = setInterval(() => setS(p => {
      const cur = base + (Math.random() - 0.5) * 2 * jitter + Math.sin(p.n / 6) * jitter * 0.4;
      return { cur, peak: Math.max(p.peak, cur), sum: p.sum + cur, n: p.n + 1, series: [...p.series.slice(1), cur] };
    }), 850);
    return () => clearInterval(id);
  }, [base, jitter]);
  return { cur: s.cur, peak: s.peak, avg: s.sum / s.n, series: s.series };
}

// ---- helpers -------------------------------------------------------------
function actColor(v) { return v < 0.34 ? '#3FBE82' : v < 0.67 ? '#F4AC3E' : '#E25141'; }
function norm(v, lo, hi) { return Math.max(0, Math.min(1, (v - lo) / (hi - lo))); }

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

function GridLines({ rows = 3 }) {
  return Array.from({ length: rows }, (_, i) => (
    <line key={i} x1="0" x2="500" y1={(i + 1) * (120 / (rows + 1))} y2={(i + 1) * (120 / (rows + 1))} stroke={GRID} strokeWidth="0.8" />
  ));
}

// ---- line / trend --------------------------------------------------------
function Trend({ hex, series, lo, hi, threshold, fill }) {
  const pts = series.map((v, i) => `${(i / (series.length - 1)) * 500},${120 - norm(v, lo, hi) * 110 - 5}`).join(' ');
  const ty = threshold != null ? 120 - norm(threshold, lo, hi) * 110 - 5 : null;
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }} preserveAspectRatio="none">
      <GridLines />
      {ty != null && <line x1="0" x2="500" y1={ty} y2={ty} stroke="var(--color-moderate)" strokeWidth="1" strokeDasharray="4 4" />}
      {fill && <polygon points={`0,120 ${pts} 500,120`} fill={hex} opacity="0.07" />}
      <polyline points={pts} fill="none" stroke={hex} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

// ---- AC waveform (live array or rAF scroll) -----------------------------
function Waveform({ hex, data }) {
  const ref = React.useRef(null);
  const hasData = Array.isArray(data) && data.length > 1;
  React.useEffect(() => {
    if (hasData) return;
    let raf; const start = performance.now();
    const draw = (t) => {
      const el = ref.current; if (!el) return;
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
    let mn = Infinity, mx = -Infinity;
    for (const v of data) { if (v < mn) mn = v; if (v > mx) mx = v; }
    const span = (mx - mn) || 1;
    livePts = data.map((v, i) => `${(i / (data.length - 1)) * 500},${(110 - ((v - mn) / span) * 100).toFixed(1)}`).join(' ');
  }
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }} preserveAspectRatio="none">
      <line x1="0" x2="500" y1="60" y2="60" stroke={GRID} strokeWidth="0.8" />
      {hasData
        ? <polyline points={livePts} fill="none" stroke={hex} strokeWidth="1.2" strokeLinejoin="round" />
        : <path ref={ref} fill="none" stroke={hex} strokeWidth="1.2" />}
    </svg>
  );
}

// ---- FFT bars ------------------------------------------------------------
function FFT({ hex }) {
  const t = useClock(700);
  const bars = Array.from({ length: 40 }, (_, i) => {
    let v = 0.05 + Math.random() * 0.08;
    if (i === 4) v = 0.95;            // 50 Hz dominant
    if (i === 8) v = 0.32;            // 100 Hz harmonic
    if (i === 12) v = 0.18;
    return v;
  });
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }} preserveAspectRatio="none">
      <GridLines />
      {bars.map((v, i) => (
        <rect key={i} x={i * (500 / 40) + 1.5} y={120 - v * 112} width={500 / 40 - 3} height={v * 112} fill={i === 4 ? hex : MUTED} opacity={i === 4 ? 0.95 : 0.45} />
      ))}
    </svg>
  );
}

// ---- polarity (signed bars; live signed array or synthetic) -------------
function Polarity({ hex, data }) {
  const t = useClock(750);
  const arr = Array.isArray(data) && data.length ? data : null;
  let bars;
  if (arr) {
    const m = Math.max(...arr.map(v => Math.abs(v))) || 1;
    bars = arr.map(v => v / m);
  } else {
    const n = 48;
    bars = Array.from({ length: n }, (_, i) => Math.sin(i / 2.2 + t) * (0.55 + Math.random() * 0.4));
  }
  const n = bars.length;
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }} preserveAspectRatio="none">
      <line x1="0" x2="500" y1="60" y2="60" stroke={GRID} strokeWidth="0.8" />
      {bars.map((v, i) => {
        const h = Math.abs(v) * 52;
        return <rect key={i} x={i * (500 / n) + 1} y={v >= 0 ? 60 - h : 60} width={500 / n - 2} height={h} fill={v >= 0 ? hex : '#C24A2E'} opacity="0.8" />;
      })}
    </svg>
  );
}

// ---- peak vs average -----------------------------------------------------
function PeakAvg({ hex, peak, avg, lo, hi, unit }) {
  const items = [['Peak', peak, hex], ['Average', avg, MUTED]];
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }}>
      {items.map((it, i) => {
        const w = norm(it[1], lo, hi) * 430;
        const y = 28 + i * 50;
        return (
          <g key={i}>
            <text x="0" y={y - 8} fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>{it[0]}</text>
            <rect x="0" y={y} width="470" height="16" fill="rgba(118,125,128,0.1)" rx="2" />
            <rect x="0" y={y} width={w} height="16" fill={it[2]} opacity="0.85" rx="2" />
            <text x="476" y={y + 12} fontFamily="var(--font-mono)" fontSize="11" fill="#16181A" textAnchor="end">{it[1].toFixed(1)}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- histogram -----------------------------------------------------------
function Histogram({ hex, bins }) {
  const data = Array.isArray(bins) && bins.length ? bins : [2, 5, 9, 16, 24, 31, 22, 13, 7, 3];
  const max = Math.max(...data) || 1;
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }} preserveAspectRatio="none">
      <GridLines />
      {data.map((v, i) => (
        <rect key={i} x={i * (500 / data.length) + 2} y={120 - (v / max) * 112} width={500 / data.length - 4} height={(v / max) * 112} fill={hex} opacity="0.7" rx="1" />
      ))}
    </svg>
  );
}

// ---- exposure meter ------------------------------------------------------
function Exposure({ pct, levelColor }) {
  return (
    <div style={{ padding: '14px 2px' }}>
      <div style={{ position: 'relative', height: 14, borderRadius: 7, background: 'var(--color-surface-alt)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: levelColor, transition: 'width 0.6s ease' }} />
        {[25, 50, 75].map(t => <div key={t} style={{ position: 'absolute', left: `${t}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.7)' }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: MUTED, marginTop: 6 }}>
        <span>0%</span><span style={{ color: levelColor, fontWeight: 700 }}>{pct.toFixed(0)}% of reference</span><span>100%</span>
      </div>
    </div>
  );
}

// ---- NRF spectrum analyzer (125 ch; live array or synthetic) ------------
function Spectrum({ big, data }) {
  const t = useClock(220);
  const live = Array.isArray(data) && data.length ? data : null;
  let prof;
  if (live) {
    const mx = Math.max(...data);
    const scale = mx > 1 ? (mx > 100 ? mx : 100) : 1;
    prof = data.map(v => Math.max(0, Math.min(1, v / scale)));
  } else {
    prof = bandProfile(t * 0.25);
  }
  const sweep = (t % 30) / 30 * 500;
  return (
    <svg viewBox="0 0 500 160" style={{ width: '100%', height: big ? 200 : 150, background: '#0E2A40', borderRadius: 4, display: 'block' }} preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map(f => <line key={f} x1="0" x2="500" y1={150 - f * 140} y2={150 - f * 140} stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />)}
      {prof.map((v, i) => {
        const j = live ? v : v + (Math.random() - 0.5) * 0.12;
        const h = Math.max(2, Math.min(1, j) * 140);
        return <rect key={i} x={i * (500 / prof.length)} y={150 - h} width={500 / prof.length - 0.4} height={h} fill={actColor(v)} />;
      })}
      <line x1={sweep} x2={sweep} y1="0" y2="150" stroke="#F4AC3E" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

// ---- NRF waterfall (canvas; live rows or synthetic) ---------------------
function Waterfall({ big, rows, rev }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); const W = cv.width, H = cv.height;
    const liveRows = Array.isArray(rows) && rows.length ? rows : null;
    if (liveRows) {
      ctx.fillStyle = '#0E2A40'; ctx.fillRect(0, 0, W, H);
      const rowH = Math.max(2, H / Math.min(liveRows.length, 60));
      const cw = W / 125;
      for (let r = 0; r < liveRows.length; r++) {
        const row = liveRows[liveRows.length - 1 - r]; // newest on top
        const y = r * rowH;
        if (y > H) break;
        const mx = Math.max(...row); const scale = mx > 1 ? (mx > 100 ? mx : 100) : 1;
        for (let c = 0; c < row.length; c++) {
          const v = Math.max(0, Math.min(1, row[c] / scale));
          ctx.fillStyle = actColor(v);
          ctx.fillRect(c * cw, y, cw + 0.6, rowH + 0.6);
        }
      }
      return;
    }
    let raf, last = 0, tt = 0;
    ctx.fillStyle = '#0E2A40'; ctx.fillRect(0, 0, W, H);
    const draw = (now) => {
      if (now - last > 150) {
        last = now; tt += 0.3;
        const img = ctx.getImageData(0, 0, W, H - 3);
        ctx.putImageData(img, 0, 3);
        const prof = bandProfile(tt); const cw = W / 125;
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
  return <canvas ref={ref} width={500} height={big ? 200 : 150} style={{ width: '100%', height: big ? 200 : 150, display: 'block', borderRadius: 4, background: '#0E2A40' }} />;
}

// ---- occupancy trend / activity timeline --------------------------------
function Occupancy({ hex, series }) {
  const t = useClock(900);
  const s = Array.isArray(series) && series.length > 2
    ? series
    : Array.from({ length: 60 }, (_, i) => (0.45 + 0.22 * Math.sin(i / 7 + t * 0.3) + (Math.random() - 0.5) * 0.08) * 100);
  return <Trend hex="#3FBE82" series={s} lo={0} hi={100} threshold={70} fill />;
}
function Activity() {
  const t = useClock(700);
  const n = 44;
  const bars = Array.from({ length: n }, (_, i) => 0.3 + 0.5 * Math.abs(Math.sin(i / 3 + t)) + Math.random() * 0.15);
  return (
    <svg viewBox="0 0 500 120" style={{ width: '100%', height: 130 }} preserveAspectRatio="none">
      <GridLines />
      {bars.map((v, i) => <rect key={i} x={i * (500 / n) + 1} y={120 - Math.min(1, v) * 112} width={500 / n - 2} height={Math.min(1, v) * 112} fill={actColor(v)} opacity="0.8" />)}
    </svg>
  );
}

// ---- needle gauge --------------------------------------------------------
function NeedleGauge({ value, lo, hi, unit, hex }) {
  const p = norm(value, lo, hi); const ang = -90 + p * 180; const r = 62; const cx = 80, cy = 80;
  const rad = ang * Math.PI / 180;
  const arc = (a0, a1, color) => {
    const s = (a0 * Math.PI) / 180, e = (a1 * Math.PI) / 180;
    return <path d={`M ${cx + r * Math.cos(s)} ${cy + r * Math.sin(s)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(e)} ${cy + r * Math.sin(e)}`} fill="none" stroke={color} strokeWidth="6" />;
  };
  return (
    <svg viewBox="0 0 160 100" style={{ width: '100%', height: 110 }}>
      {arc(180, 240, '#3FBE82')}{arc(240, 300, '#F4AC3E')}{arc(300, 360, '#E25141')}
      <line x1={cx} y1={cy} x2={cx + (r - 8) * Math.cos(rad)} y2={cy + (r - 8) * Math.sin(rad)} stroke="#16181A" strokeWidth="2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill="#16181A" />
      <text x={cx} y="96" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill={hex}>{value.toFixed(1)} {unit}</text>
    </svg>
  );
}

// ---- radial (semicircular) gauge ----------------------------------------
function RadialGauge({ pct, levelColor, label }) {
  const r = 56, cx = 70, cy = 70, circ = Math.PI * r;
  return (
    <svg viewBox="0 0 140 86" style={{ width: '100%', height: 100 }}>
      <path d={`M 14 70 A ${r} ${r} 0 0 1 126 70`} fill="none" stroke="rgba(118,125,128,0.18)" strokeWidth="9" />
      <path d={`M 14 70 A ${r} ${r} 0 0 1 126 70`} fill="none" stroke={levelColor} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${circ * pct / 100} ${circ}`} style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <text x={cx} y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="20" fontWeight="700" fill="#16181A">{pct.toFixed(0)}%</text>
      <text x={cx} y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={MUTED}>{label}</text>
    </svg>
  );
}

// ---- traffic light -------------------------------------------------------
function TrafficLight({ level, labels }) {
  const order = ['safe', 'moderate', 'high'];
  const colors = { safe: 'var(--color-safe)', moderate: 'var(--color-moderate)', high: 'var(--color-high)' };
  const lab = labels || { safe: 'Low', moderate: 'Moderate', high: 'High' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
      {order.map(o => {
        const on = o === level;
        return (
          <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: on ? 1 : 0.32 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: colors[o], boxShadow: on ? `0 0 8px ${colors[o]}` : 'none' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: on ? 700 : 400, color: '#16181A' }}>{lab[o]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ---- RSSI signal bars ----------------------------------------------------
function SignalBars({ level, max }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 56 }}>
      {Array.from({ length: max }, (_, i) => {
        const on = i < level;
        const c = i < max * 0.4 ? '#3FBE82' : i < max * 0.7 ? '#F4AC3E' : '#E25141';
        return <div key={i} style={{ flex: 1, height: `${20 + (i / max) * 80}%`, background: on ? c : 'rgba(118,125,128,0.16)', borderRadius: '1px' }} />;
      })}
    </div>
  );
}

// ---- diagnostic ADC bar --------------------------------------------------
function DiagnosticBar({ value, max }) {
  const p = (value / max) * 100;
  return (
    <div>
      <div style={{ height: 12, borderRadius: 6, background: 'var(--color-surface-alt)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: MUTED }} />
        <div style={{ width: `${p}%`, height: '100%', background: 'var(--color-nrf)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: MUTED, marginTop: 5 }}>
        <span>0</span><span>{value} / {max} ADC</span><span>{max}</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  useClock, useReading,
  Charts: { Trend, Waveform, FFT, Polarity, PeakAvg, Histogram, Exposure, Spectrum, Waterfall, Occupancy, Activity, NeedleGauge, RadialGauge, TrafficLight, SignalBars, DiagnosticBar, actColor, norm },
});
