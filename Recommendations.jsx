// EMScope UI kit — context input + recommendation engine. Loaded as text/babel.
const { Button, Card, SectionHeading } = window.EMScopeDesignSystem_3c9a3a;

const fieldLabel = { fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', marginBottom: 5, display: 'block' };
const inputStyle = { width: '100%', fontFamily: 'var(--font-dashboard)', fontSize: '0.85rem', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', background: 'var(--color-surface)', color: 'var(--color-text-primary)', boxSizing: 'border-box' };

function Field({ label, children }) {
  return <div><span style={fieldLabel}>{label}</span>{children}</div>;
}

function RecommendationEngine({ v, reading, level }) {
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
      advice,
    });
  };

  return (
    <Card>
      <SectionHeading kicker="Context & Recommendations" title="Analyze your exposure" as="h3" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 14 }}>
        <Field label="Source type">
          <select style={inputStyle} value={src} onChange={e => setSrc(e.target.value)}>
            {window.SOURCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Distance (m)"><input style={inputStyle} value={dist} onChange={e => setDist(e.target.value)} inputMode="decimal" /></Field>
        <Field label="Daily exposure (h/day)"><input style={inputStyle} value={hours} onChange={e => setHours(e.target.value)} inputMode="decimal" /></Field>
        <Field label="Frequency of exposure">
          <select style={inputStyle} value={freq} onChange={e => setFreq(e.target.value)}>
            <option>Continuous</option><option>Intermittent</option><option>Occasional</option>
          </select>
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Additional context"><input style={inputStyle} value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. router mounted above the desk" /></Field>
        </div>
      </div>
      <div style={{ marginTop: 14 }}><Button variant="primary" size="sm" onClick={analyze}>Analyze</Button></div>

      {out && (
        <div style={{ marginTop: 18, borderTop: '1px solid var(--color-border)', paddingTop: 16 }}>
          <p style={{ fontFamily: 'var(--font-doc)', fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>{out.summary}</p>
          <p style={{ fontFamily: 'var(--font-dashboard)', fontWeight: 700, fontSize: '0.9rem', color: window.LEVEL_COLOR[out.level], margin: '0 0 14px' }}>
            Classified as {window.LEVEL_LABEL[out.level]} exposure — {out.classText}
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', marginBottom: 8 }}>Recommendations</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {out.advice.map((a, i) => <li key={i} style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{a}</li>)}
          </ul>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginTop: 14, marginBottom: 0 }}>{window.LIMITATIONS}</p>
        </div>
      )}
    </Card>
  );
}

Object.assign(window, { RecommendationEngine });
