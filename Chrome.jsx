// EMScope UI kit — Navbar + Footer chrome. Loaded as text/babel.
const { StatusIndicator } = window.EMScopeDesignSystem_3c9a3a;

function Navbar({ active, onHome, onNav }) {
  const live = window.useLive();
  const online = live.status === 'live';
  const label = online ? 'SYSTEM ONLINE' : live.status === 'reconnecting' ? 'RECONNECTING…' : 'CONNECTING…';
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--color-navy)', borderBottom: '3px solid var(--color-accent)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 80, gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }} onClick={onHome}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>EMScope</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--color-accent-bright)' }}>EM Pollution Monitoring System</span>
          </div>
        </div>

        <ul style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a onClick={onHome} style={navLink(active === 'home')}>Home</a></li>
          {window.VERTICALS.map(v => (
            <li key={v.key}><a onClick={() => onNav(v.key)} style={navLink(active === v.key)}>{v.name.replace(' Scanner','').replace(' Field','')}</a></li>
          ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <StatusIndicator state={online ? 'online' : 'offline'} pulse={online} label={label} />
        </div>
      </div>
    </nav>
  );
}

function navLink(isActive) {
  return {
    color: isActive ? '#fff' : '#C7D6E2',
    fontFamily: 'var(--font-dashboard)',
    fontSize: '0.85rem', fontWeight: 600, padding: '6px 2px',
    borderBottom: '2px solid ' + (isActive ? 'var(--color-accent)' : 'transparent'),
    cursor: 'pointer', whiteSpace: 'nowrap',
  };
}

function Footer() {
  return (
    <footer style={{ padding: '16px 0 24px', borderTop: '3px solid var(--color-accent)', background: 'var(--color-navy)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, fontSize: '0.76rem', color: 'var(--color-text-on-dark-muted)' }}>
        <div><strong style={{ color: 'var(--color-accent-bright)' }}>EMScope</strong> — EL Phase 3 Dashboard</div>
        <div>RV College of Engineering · ECE</div>
        <div>Kashvi Sharma · Manaswi K B · Sivani Vemuri · Stuthi</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Navbar, Footer });
