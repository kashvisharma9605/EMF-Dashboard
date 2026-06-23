// EMScope UI kit — app shell with simple screen routing. Loaded as text/babel.
function App() {
  const [view, setView] = React.useState('home'); // 'home' | vertical key

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <window.Navbar active={view} onHome={() => setView('home')} onNav={setView} />
      <window.ConnectionBanner />
      <main style={{ flex: 1 }}>
        {view === 'home'
          ? <window.HomeScreen onNav={setView} />
          : <window.ModuleDetail key={view} vkey={view} onBack={() => setView('home')} onNav={setView} />}
      </main>
      <window.Footer />
    </div>
  );
}

// Idempotent + deferred mount. The standalone bundler emits this script twice
// (pre-transpiled + text/babel); guard against double createRoot and ensure the
// DS bundle + React (blob-loaded) have executed before we render.
function mountEMScope() {
  if (window.__emscopeMounted) return;
  if (!window.React || !window.ReactDOM || !window.EMScopeDesignSystem_3c9a3a || !window.App) return;
  window.__emscopeMounted = true;
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
window.App = App;
window.mountEMScope = mountEMScope;
// Only auto-mount when a host page explicitly opts in. Loading _ds_bundle.js for
// its components alone must have NO side effect on the consumer's #root — the
// screens preview (index.html) and standalone export set window.__EMSCOPE_AUTOMOUNT.
if (window.__EMSCOPE_AUTOMOUNT) {
  if (document.readyState === 'complete') mountEMScope();
  else window.addEventListener('load', mountEMScope);
}
