// EMScope UI kit — Home screen. Loaded as text/babel.
const { Button, Tag, StatRibbon, SectionHeading, ModuleCard, Card } = window.EMScopeDesignSystem_3c9a3a;

function HeroBg() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8 }}>
      <svg viewBox="0 0 1200 280" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <path d="M0 180 Q 100 130, 200 180 T 400 180 T 600 180 T 800 180 T 1000 180 T 1200 180" fill="none" stroke="#D1453A" strokeWidth="1.8" opacity="0.65" />
        <path d="M0 210 Q 100 250, 200 210 T 400 210 T 600 210 T 800 210 T 1000 210 T 1200 210" fill="none" stroke="#8E5BC4" strokeWidth="1.8" opacity="0.6" />
        <path d="M0 150 Q 100 100, 200 150 T 400 150 T 600 150 T 800 150 T 1000 150 T 1200 150" fill="none" stroke="#3E9E4F" strokeWidth="1.4" opacity="0.55" />
        <rect x="0" y="0" width="3" height="280" fill="#F4AC3E" opacity="0.7" style={{ animation: 'emscope-sweep 5s linear infinite' }} />
      </svg>
      <style>{`@keyframes emscope-sweep{0%{transform:translateX(-2%)}100%{transform:translateX(102%)}}@keyframes emscope-led{0%,100%{box-shadow:0 0 0 0 rgba(63,190,130,.55)}50%{box-shadow:0 0 0 6px rgba(63,190,130,0)}}`}</style>
    </div>
  );
}

function Section({ children, last, id }) {
  return (
    <section id={id} style={{ padding: '32px 0', borderBottom: last ? 'none' : '1px solid var(--color-border)', scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>{children}</div>
    </section>
  );
}

const kick = { fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' };

// ---- data link setup (USB / Wi-Fi) --------------------------------------
function ConnectionSetup({ link, setLink }) {
  const opts = [
    { key: 'wifi', icon: window.Icons.wifi, name: 'Wi-Fi', detail: 'ESP32 → local server → dashboard', meta: '192.168.1.42 : 8000' },
    { key: 'usb', icon: window.Icons.usb, name: 'USB Serial', detail: 'ESP32 → USB → host script', meta: '/dev/ttyUSB0 · 115200' },
  ];
  return (
    <Card>
      <div style={{ ...kick, marginBottom: 12 }}>Data Link · choose ingestion</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {opts.map(o => {
          const on = link === o.key;
          return (
            <button key={o.key} onClick={() => setLink(o.key)} style={{
              textAlign: 'left', cursor: 'pointer', background: on ? 'var(--color-surface-alt)' : 'var(--color-surface)',
              border: '1px solid ' + (on ? 'var(--color-primary)' : 'var(--color-border)'), borderRadius: 'var(--radius-card)', padding: '12px',
              display: 'flex', flexDirection: 'column', gap: 6, font: 'inherit',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, color: on ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{o.icon}</span>
                <span style={{ fontFamily: 'var(--font-dashboard)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>{o.name}</span>
                {on && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700, color: 'var(--color-safe)', textTransform: 'uppercase' }}>● Active</span>}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>{o.detail}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--color-text-muted)' }}>{o.meta}</div>
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '12px 0 0' }}>
        Charts and the recommendation engine work identically under either link — only the ingestion layer differs.
      </p>
    </Card>
  );
}

// ---- live status with LED -----------------------------------------------
function LiveStatus({ link, live }) {
  window.useClock(1000); // tick so the "last update" / age stays current
  const online = live.status === 'live';
  const reconnecting = live.status === 'reconnecting';
  const ledColor = online ? '#3FBE82' : reconnecting ? '#E25141' : '#F4AC3E';
  const title = online ? 'System Live' : reconnecting ? 'Reconnecting' : 'Waiting for Data';
  const ago = live.lastOk ? Math.max(0, Math.round((Date.now() - live.lastOk) / 1000)) : null;
  const sub = online
    ? `Streaming via ${link === 'usb' ? 'USB serial' : 'Wi-Fi'}`
    : (ago != null ? `Last packet ${ago}s ago` : 'Linking to monitoring server…');
  const lastStr = live.lastOk ? new Date(live.lastOk).toLocaleTimeString('en-GB') : '—';
  return (
    <Card style={{ background: 'var(--color-navy)', borderColor: 'var(--color-navy-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 16, height: 16, borderRadius: '50%', background: ledColor, animation: 'emscope-led 1.6s ease-in-out infinite', flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{title}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--color-accent-bright)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sub}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 16 }}>
        {[['Last Update', lastStr], ['Sample Rate', '1 Hz'], ['Modules', '4 / 4']].map(r => (
          <div key={r[0]}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-on-dark-muted)' }}>{r[0]}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginTop: 2 }}>{r[1]}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---- at-a-glance window (broadest measurement per vertical) --------------
function GlanceWindow({ v, onNav }) {
  const live = window.useLive();
  const sim = window.useReading(v.base, v.jitter);
  const rd = window.readVertical(v, live, sim);
  const C = window.Charts;
  const lvlColor = window.LEVEL_COLOR[rd.level];
  const spark = (rd.series && rd.series.length ? rd.series : sim.series).slice(-28);
  const pts = spark.map((val, i) => `${(i / (spark.length - 1)) * 100},${28 - C.norm(val, v.range[0], v.range[1]) * 24 - 2}`).join(' ');
  return (
    <Card interactive onClick={() => onNav(v.key)} style={{ cursor: 'pointer', padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ width: 26, height: 26, borderRadius: 6, background: v.chip, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 16, height: 16, display: 'block' }}>{window.Icons[v.key]}</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{v.number} · {v.glance}</span>
        <span style={{ marginLeft: 'auto', width: 9, height: 9, borderRadius: '50%', background: lvlColor }} title={window.LEVEL_LABEL[rd.level]} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.7rem', lineHeight: 1, color: v.color }}>{rd.cur.toFixed(1)}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{v.unit}</span>
      </div>
      <svg viewBox="0 0 100 28" preserveAspectRatio="none" style={{ width: '100%', height: 28, marginTop: 8 }}>
        <polyline points={pts} fill="none" stroke={v.hex} strokeWidth="1.2" />
      </svg>
    </Card>
  );
}

function HomeScreen({ onNav }) {
  const [link, setLink] = React.useState(() => localStorage.getItem('emscope_link') || 'wifi');
  const setAndSave = (k) => { setLink(k); localStorage.setItem('emscope_link', k); };
  const live = window.useLive();
  window.useClock(1000);
  const statusWord = live.status === 'live' ? 'Online' : live.status === 'reconnecting' ? 'Reconnecting' : 'Connecting';
  const lastStr = live.lastOk ? new Date(live.lastOk).toLocaleTimeString('en-GB') : '—';

  return (
    <div>
      {/* Hero */}
      <header style={{ position: 'relative', overflow: 'hidden', padding: '48px 0 32px', borderBottom: '3px solid var(--color-accent)', background: 'linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-2) 100%)', textAlign: 'center' }}>
        <HeroBg />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent-bright)', marginBottom: 8 }}>RV College of Engineering · ECE</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.3rem', fontWeight: 700, lineHeight: 1.05, margin: '0 0 4px', color: '#fff', letterSpacing: '-0.01em', textShadow: 'var(--shadow-hero-text)' }}>EMScope</h1>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-bright)', margin: '0 0 16px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>EL Phase 3 Dashboard</div>
          <p style={{ fontFamily: 'var(--font-doc)', fontSize: '1.1rem', fontStyle: 'italic', color: '#C7D6E2', margin: '0 0 24px' }}>A handheld EM pollution monitor measuring electric fields, magnetic fields, and RF activity in real time.</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => document.getElementById('modules').scrollIntoView({ behavior: 'smooth' })}>View Monitoring Modules</Button>
            <Button variant="secondary" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>Technical Background</Button>
          </div>
        </div>
      </header>

      {/* Connection + Live status */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 16, alignItems: 'stretch' }}>
          <ConnectionSetup link={link} setLink={setAndSave} />
          <LiveStatus link={link} live={live} />
        </div>
      </Section>

      {/* At-a-glance windows */}
      <Section>
        <SectionHeading kicker="Live Readings" title="At a glance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          {window.VERTICALS.map(v => <GlanceWindow key={v.key} v={v} onNav={onNav} />)}
        </div>
      </Section>

      {/* Stat ribbon */}
      <Section>
        <StatRibbon items={[
          { value: '4', label: 'Sensing Verticals', color: 'var(--color-primary-bright)' },
          { value: '125', label: 'RF Channels Scanned', color: '#3FBE82' },
          { value: '1MHz–8GHz', label: 'RF Power Range', color: 'var(--color-accent-bright)' },
          { value: 'ICNIRP', label: 'Reference Framework', color: '#C9A6F0' },
        ]} />
      </Section>

      {/* Overview + status */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)', gap: 24, alignItems: 'start' }}>
          <div>
            <SectionHeading kicker="What is EM Pollution" title="Everyday exposure, measured" />
            <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.98rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '12px 0 0' }}>
              Unwanted electromagnetic exposure from everyday sources — mobile phones, Wi-Fi, power lines, appliances — accumulates in daily environments. EMScope measures it directly and turns raw sensor data into interpretable safety information.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
              <Tag tone="blue">E-Field</Tag>
              <Tag tone="green">M-Field</Tag>
              <Tag tone="yellow">2.4GHz RF</Tag>
              <Tag tone="orange">Broadband RF</Tag>
              <Tag tone="red">ICNIRP Scoring</Tag>
            </div>
          </div>
          <Card>
            <div style={{ ...kick, marginBottom: 16 }}>System Status</div>
            {[['Status', statusWord], ['Active Modules', '4 / 4'], ['Data Link', link === 'usb' ? 'USB Serial' : 'Wi-Fi'], ['Last Update', lastStr]].map((r, i, a) => (
              <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < a.length - 1 ? '1px solid var(--color-border)' : 'none', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{r[0]}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{r[1]}</span>
              </div>
            ))}
          </Card>
        </div>
      </Section>

      {/* Module cards */}
      <Section id="modules">
        <SectionHeading kicker="Monitoring Modules" title="Select a Vertical" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }}>
          {window.VERTICALS.map(v => (
            <ModuleCard key={v.key} number={v.number} name={v.name} sensor={v.sensor} description={v.desc} metrics={v.charts.slice(0, 3).map(c => c.title.split(' ')[0])} icon={window.Icons[v.key]} accentColor={v.color} chipBg={v.chip} onClick={() => onNav(v.key)} style={{ cursor: 'pointer' }} />
          ))}
        </div>
      </Section>

      {/* About */}
      <Section last id="about">
        <SectionHeading kicker="Technical Background & Methodology" title="How EMScope Works" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
          {[
            ['01 · Sensing', 'Acquisition', 'Each vertical pairs a dedicated sensor with the ESP32 ADC — capacitive antenna, Hall-effect sensor, NRF24L01+ scanner, and AD8318 log detector.'],
            ['02 · Processing', 'Calibration & Filtering', 'Raw counts are converted to physical units via baseline calibration, RMS computation, and noise filtering before display.'],
            ['03 · Interpretation', 'Exposure Scoring', 'Readings are classified Low / Moderate / High against project thresholds referenced to ICNIRP guidelines — informational, not clinical.'],
          ].map(c => (
            <Card key={c[0]}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{c[0]}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--color-text-primary)' }}>{c[1]}</h3>
              <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0 }}>{c[2]}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

Object.assign(window, { HomeScreen });
