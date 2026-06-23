// EMScope UI kit — module detail (full instrument view). Loaded as text/babel.
const { Button, Tag, Card } = window.EMScopeDesignSystem_3c9a3a;

const kicker = { fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' };

// One Tier-1 stat cell.
function StatCell({ label, value, unit, big, color }) {
  return (
    <Card style={{ padding: '14px 16px' }}>
      <div style={kicker}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 6 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: big ? '2rem' : '1.3rem', lineHeight: 1, color: color || 'var(--color-text-primary)' }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{unit}</span>}
      </div>
    </Card>
  );
}

// Chart card: title + thin chart + one-sentence caption with units.
function ChartCard({ title, sentence, big, children }) {
  return (
    <Card style={{ gridColumn: big ? '1 / -1' : 'auto' }}>
      <div style={{ ...kicker, marginBottom: 10 }}>{title}</div>
      {children}
      <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '10px 0 0' }}>{sentence}</p>
    </Card>
  );
}

function VisualCard({ title, sentence, children }) {
  return (
    <Card>
      <div style={{ ...kicker, marginBottom: 8 }}>{title}</div>
      {children}
      {sentence && <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.4, margin: '8px 0 0' }}>{sentence}</p>}
    </Card>
  );
}

function renderChart(kind, v, rd, live) {
  const C = window.Charts; const [lo, hi] = v.range;
  const thr = rd.level === 'safe' ? hi * 0.75 : hi * 0.55;
  switch (kind) {
    case 'waveform': return <C.Waveform hex={v.hex} data={rd.raw.wave} />;
    case 'trend': return <C.Trend hex={v.hex} series={rd.series} lo={lo} hi={hi} threshold={thr} fill />;
    case 'density': return <C.Trend hex="#1A8F8F" series={rd.series} lo={lo} hi={hi} threshold={hi * 0.7} fill />;
    case 'fft': return <C.FFT hex={v.hex} />;
    case 'polarity': return <C.Polarity hex={v.hex} data={rd.raw.signed} />;
    case 'peakavg': return <C.PeakAvg hex={v.hex} peak={rd.peak} avg={rd.avg} lo={lo} hi={hi} unit={v.unit} />;
    case 'histogram': return <C.Histogram hex={v.hex} bins={rd.raw.histogram} />;
    case 'exposure': return <C.Exposure pct={rd.exposurePct} levelColor={window.LEVEL_COLOR[rd.level]} />;
    case 'spectrum': return <C.Spectrum big data={rd.raw.channels} />;
    case 'waterfall': return <C.Waterfall big rows={live.wf} rev={live.rev} />;
    case 'occupancy': return <C.Occupancy hex={v.hex} series={live.hist[v.key]} />;
    case 'activity': return <C.Activity />;
    default: return null;
  }
}

function ModuleDetail({ vkey, onBack, onNav }) {
  const v = window.VERTICALS.find(x => x.key === vkey);
  const live = window.useLive();
  const sim = window.useReading(v.base, v.jitter);
  const rd = window.readVertical(v, live, sim);
  React.useEffect(() => { window.scrollTo(0, 0); }, [vkey]);
  const C = window.Charts;
  const [lo, hi] = v.range;
  const exposurePct = rd.exposurePct;
  const level = rd.level;
  const lvlColor = window.LEVEL_COLOR[level];
  const nrfLabels = { safe: 'Clear', moderate: 'Moderate', high: 'Congested' };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 24px 48px' }}>
      <Button variant="ghost" size="sm" onClick={onBack} style={{ paddingLeft: 0, marginBottom: 10 }}>
        <span style={{ width: 16, height: 16, display: 'inline-block' }}>{window.Icons.back}</span> All modules
      </Button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
        <span style={{ width: 56, height: 56, borderRadius: 10, background: v.chip, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ width: 30, height: 30, display: 'block' }}>{window.Icons[v.key]}</span>
        </span>
        <div>
          <div style={kicker}>{v.number} · {v.sensor} · {v.pin}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, margin: '2px 0 0', color: 'var(--color-text-primary)' }}>{v.name}</h1>
        </div>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: rd.live ? 'var(--color-safe)' : 'var(--color-moderate)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: rd.live ? 'var(--color-safe)' : 'var(--color-moderate)', animation: 'emscope-led 1.6s ease-in-out infinite' }} />
          {rd.live ? 'Live' : 'Demo'}
        </span>
      </div>
      {v.disclaimer && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', lineHeight: 1.5, background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '8px 12px', margin: '12px 0 0' }}>⚠ {v.disclaimer}</p>
      )}

      {/* Tier 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 18 }}>
        <StatCell label="Current" value={rd.cur.toFixed(1)} unit={v.unit} big color={v.color} />
        <StatCell label="Peak (session)" value={rd.peak.toFixed(1)} unit={v.unit} />
        <StatCell label="Average" value={rd.avg.toFixed(1)} unit={v.unit} />
        <StatCell label="Exposure Ratio" value={exposurePct.toFixed(0)} unit="%" />
        <Card style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: lvlColor }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.85)' }}>Classification</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: 4 }}>
            {v.priority ? nrfLabels[level] : window.LEVEL_LABEL[level]}
          </div>
        </Card>
      </div>

      {/* Tier 2 */}
      <div style={{ ...kicker, margin: '24px 0 10px' }}>Standout Quantities</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${v.tier2.length}, 1fr)`, gap: 12 }}>
        {v.tier2.map((t, i) => (
          <Card key={i} accentColor={v.color}>
            <div style={kicker}>{t.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, margin: '6px 0 8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: v.color }}>{rd.tier2[i] != null ? rd.tier2[i] : t.value}</span>
              {t.unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{t.unit}</span>}
            </div>
            <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{t.sentence}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div style={{ ...kicker, margin: '24px 0 10px' }}>Charts</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {v.charts.map((c, i) => (
          <ChartCard key={i} title={c.title} sentence={c.sentence} big={c.big}>{renderChart(c.kind, v, rd, live)}</ChartCard>
        ))}
      </div>

      {/* Visuals */}
      <div style={{ ...kicker, margin: '24px 0 10px' }}>Instrument Visuals</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {v.visuals.includes('needle') && <VisualCard title="Analog Gauge" sentence={`Needle reading with colour zones, ${v.unit}.`}><C.NeedleGauge value={rd.cur} lo={lo} hi={hi} unit={v.unit} hex={v.hex} /></VisualCard>}
        {v.visuals.includes('radial') && <VisualCard title={v.priority ? 'Congestion Dial' : 'Intensity Dial'} sentence="Reading as a percentage of the reference, 0–100%."><C.RadialGauge pct={exposurePct} levelColor={lvlColor} label={v.priority ? 'congestion' : 'of limit'} /></VisualCard>}
        {v.visuals.includes('signal') && <VisualCard title="Signal Strength" sentence="Discrete phone-style bar level, 0–20."><div style={{ padding: '8px 0' }}><C.SignalBars level={rd.signalLevel} max={20} /></div></VisualCard>}
        {v.visuals.includes('traffic') && <VisualCard title="Status Indicator" sentence="Three-state classification light."><C.TrafficLight level={level} labels={v.priority ? nrfLabels : null} /></VisualCard>}
        {v.visuals.includes('diagnostic') && <VisualCard title="Raw Diagnostic" sentence="Raw sensor output for calibration, 0–4095 ADC."><div style={{ padding: '12px 0 4px' }}><C.DiagnosticBar value={2210} max={4095} /></div></VisualCard>}
      </div>

      {/* Recommendation engine */}
      <div style={{ marginTop: 24 }}>
        <window.RecommendationEngine v={v} reading={rd.cur} level={level} />
      </div>

      {/* Quick switch */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24, justifyContent: 'center' }}>
        {window.VERTICALS.filter(x => x.key !== v.key).map(x => (
          <Button key={x.key} variant="secondary" size="sm" onClick={() => onNav(x.key)}>{x.name} →</Button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ModuleDetail });
