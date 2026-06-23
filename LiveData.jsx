// EMScope UI kit — live backend data link. Loaded as text/babel.
// Polls GET /latest once per second, normalizes the payload per vertical, and
// keeps a rolling history for the trend / waterfall charts. Fails soft: while the
// server is asleep (Render free tier can take up to ~50s to wake) the dashboard
// shows clearly-labelled demo readings and a "waiting / reconnecting" banner.

const LIVE_URL = 'https://emf-dashboard.onrender.com/latest';
const POLL_MS = 1000;
const FETCH_TIMEOUT_MS = 8000;
const HIST_LEN = 70;     // points kept for trend charts
const WF_ROWS = 60;      // rows kept for the NRF waterfall

// vertical key -> API sub-object key
const API_KEY = { electric: 'electric', magnetic: 'magnetic', nrf: 'rf_scan', rfpower: 'rf_power' };

const liveStore = {
  data: null,            // last successful payload
  status: 'connecting',  // 'connecting' (never got data) | 'live' | 'reconnecting'
  lastOk: 0,             // timestamp of last good packet
  rev: 0,                // bumps on every successful ingest (canvas redraw signal)
  hist: { electric: [], magnetic: [], nrf: [], rfpower: [] }, // rolling current values
  wf: [],                // NRF channel_occupancy snapshots (oldest -> newest)
  subs: new Set(),
  sub(fn) { this.subs.add(fn); return () => { this.subs.delete(fn); }; },
  emit() { this.subs.forEach(f => f()); },
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
    if (Array.isArray(o.channel_occupancy) && o.channel_occupancy.length)
      return o.channel_occupancy.reduce((a, b) => a + b, 0) / o.channel_occupancy.length;
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
    const res = await fetch(LIVE_URL, { signal: ctrl.signal, cache: 'no-store' });
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
  React.useEffect(() => { startPolling(); return liveStore.sub(force); }, []);
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
      cur: sim.cur, peak: sim.peak, avg: sim.avg, series: sim.series,
      level: v.level, exposurePct: window.Charts.norm(sim.cur, v.range[0], v.range[1]) * 100,
      tier2: v.tier2.map(t => t.value), raw: {}, signalLevel: 6,
    };
  }
  const level = classToLevel(o.classification);
  const histRaw = live.hist[v.key] || [];
  const series = histRaw.length > 3 ? histRaw.slice() : sim.series;
  let cur, peak, avg, exposurePct, tier2, raw = {}, signalLevel = 6;

  if (v.key === 'electric') {
    cur = o.current_vm; peak = o.peak_vm; avg = o.avg_vm; exposurePct = o.exposure_ratio;
    tier2 = [String(o.dominant_frequency_hz ?? '—'), fmtBig(o.cumulative_exposure)];
    raw.wave = o.raw_wave;
  } else if (v.key === 'magnetic') {
    cur = o.current_mt; peak = o.peak_mt; avg = o.avg_mt; exposurePct = o.exposure_ratio;
    tier2 = [String(o.dominant_frequency_hz ?? '—'), String(o.polarity_reversal_rate ?? '—')];
    raw.signed = o.raw_signed_mt;
  } else if (v.key === 'nrf') {
    cur = curForVertical('nrf', o); peak = o.peak_occupancy; avg = o.avg_occupancy;
    exposurePct = o.band_congestion_index;
    tier2 = [
      String(o.device_count_estimate ?? '—'),
      o.hopping_pattern_active ? 'Active' : 'Idle',
      String(o.idle_channel_count ?? '—'),
    ];
    raw.channels = o.channel_occupancy;
  } else if (v.key === 'rfpower') {
    cur = o.current_dbm; peak = o.peak_dbm; avg = o.avg_dbm; exposurePct = o.exposure_ratio;
    tier2 = [
      String(o.power_density_wm2 ?? '—'),
      String(o.power_density_mwm2 ?? '—'),
      String(o.signal_bar_level ?? '—'),
    ];
    raw.histogram = o.session_histogram;
    signalLevel = typeof o.signal_bar_level === 'number' ? o.signal_bar_level : 6;
  }

  const fix = (n, d) => (typeof n === 'number' && isFinite(n) ? n : d);
  return {
    live: true,
    cur: fix(cur, sim.cur), peak: fix(peak, sim.peak), avg: fix(avg, sim.avg),
    series, level,
    exposurePct: fix(exposurePct, window.Charts.norm(fix(cur, sim.cur), v.range[0], v.range[1]) * 100),
    tier2: tier2 || v.tier2.map(t => t.value),
    raw, signalLevel,
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
  const msg = connecting
    ? 'Waiting for the monitoring server — it may be waking from sleep (free tier, up to ~50s). Showing demo readings until the first live packet arrives.'
    : 'Reconnecting to the monitoring server' + (ago != null ? ' — last reading ' + ago + 's ago. Showing the last known values.' : '…');
  return (
    <div style={{ background: 'var(--color-navy)', borderBottom: '1px solid var(--color-navy-2)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '9px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0, animation: 'emscope-led 1.6s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: color, flexShrink: 0 }}>
          {connecting ? 'Linking' : 'Reconnecting'}
        </span>
        <span style={{ fontFamily: 'var(--font-doc)', fontSize: '0.82rem', color: '#C7D6E2', lineHeight: 1.4 }}>{msg}</span>
        <style>{`@keyframes emscope-led{0%,100%{box-shadow:0 0 0 0 rgba(224,148,42,.5)}50%{box-shadow:0 0 0 5px rgba(224,148,42,0)}}`}</style>
      </div>
    </div>
  );
}

Object.assign(window, { useLive, readVertical, classToLevel, ConnectionBanner, LIVE_URL });
