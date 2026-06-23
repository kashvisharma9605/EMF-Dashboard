// EMScope UI kit — vertical data, icons, recommendation copy. Loaded as text/babel.
const Icons = {
  electric: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12c2-4 4 4 6 0s4 4 6 0 4 4 6 0" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  magnetic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3v9a5 5 0 0010 0V3" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 3h3M14 3h3" strokeLinecap="round"/></svg>,
  nrf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 18v-3M8 18v-6M12 18v-9M16 18v-5M20 18v-8" strokeLinecap="round"/></svg>,
  rfpower: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  usb: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 21V7" strokeLinecap="round"/><path d="M12 7l-3 3M12 7l3 3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="3.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8 13l-3 2v3" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="17" width="4" height="3" rx="1"/><path d="M16 12l3 2v2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="19" cy="17" r="1.5" fill="currentColor" stroke="none"/></svg>,
  wifi: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2.5 9a15 15 0 0119 0" strokeLinecap="round"/><path d="M5.5 12.5a10 10 0 0113 0" strokeLinecap="round"/><path d="M8.5 16a5 5 0 017 0" strokeLinecap="round"/><circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none"/></svg>,
};

// Hex mirrors of identity colors (for canvas / inline math).
const HEX = { electric: '#A67C00', magnetic: '#5E3A99', nrf: '#34495E', rfpower: '#1E6B3A',
  safe: '#2E8F5E', moderate: '#E0942A', high: '#C0392B' };

const VERTICALS = [
  {
    key: 'electric', number: 'V1', name: 'Electric Field',
    sensor: 'Capacitive AC E-Field Sensor', pin: 'GPIO 34 · ADC1_CH6',
    color: 'var(--color-electric)', hex: HEX.electric, chip: '#F1E3B8',
    desc: 'Ambient AC electric field strength and dominant frequency.',
    unit: 'V/m', base: 38.4, jitter: 9, range: [0, 120], refLimit: 120, level: 'safe',
    glance: 'Field strength',
    tier2: [
      { label: 'Dominant Frequency', value: '50', unit: 'Hz', sentence: 'Peak of the FFT — 50 Hz indicates mains power; higher suggests another source.' },
      { label: 'Cumulative Exposure', value: '4.6k', unit: 'V/m·s', sentence: 'Session-accumulated exposure integrated over time, in V/m·s.' },
    ],
    charts: [
      { kind: 'waveform', title: 'Live Waveform', sentence: 'Instantaneous field oscillation around ADC mid-scale, raw ADC counts.' },
      { kind: 'trend', title: 'RMS Trend', sentence: 'Root-mean-square field strength over time, V/m, with the project reference line.' },
      { kind: 'fft', title: 'FFT Spectrum', sentence: 'Frequency content of the field — magnitude vs frequency, Hz.' },
      { kind: 'exposure', title: 'Exposure Meter', sentence: 'Current reading as a fraction of the project reference limit, 0–100%.' },
    ],
    visuals: ['needle', 'traffic'],
  },
  {
    key: 'magnetic', number: 'V2', name: 'Magnetic Field',
    sensor: 'KY-024 Hall Effect Sensor', pin: 'GPIO 2 · ADC1_CH2',
    color: 'var(--color-magnetic)', hex: HEX.magnetic, chip: '#E3D9F1',
    desc: 'Magnetic flux density and polarity reversal rate.',
    unit: 'mT', base: 1.7, jitter: 0.6, range: [0, 10], refLimit: 10, level: 'safe',
    glance: 'Flux density',
    tier2: [
      { label: 'Dominant Frequency', value: '50', unit: 'Hz', sentence: 'Peak frequency — 50 Hz is mains; higher implies a motor or switching supply.' },
      { label: 'Polarity Reversal Rate', value: '100', unit: '/s', sentence: 'Field-sign transitions per second — distinguishes AC sources from DC / magnets.' },
    ],
    charts: [
      { kind: 'trend', title: 'Flux Density Trend', sentence: 'Flux density over time, mT, with the project threshold marked.' },
      { kind: 'polarity', title: 'Polarity Timeline', sentence: 'Signed field value over time — positive and negative excursions, ±mT.' },
      { kind: 'peakavg', title: 'Peak vs Average', sentence: 'Session peak compared with the rolling average, mT.' },
      { kind: 'exposure', title: 'Exposure Meter', sentence: 'Current reading as a fraction of the project reference limit, 0–100%.' },
    ],
    visuals: ['radial', 'traffic', 'diagnostic'],
  },
  {
    key: 'nrf', number: 'V3', name: 'NRF RF Scanner', priority: true,
    sensor: 'NRF24L01+ PA+LNA · 2.4 GHz', pin: 'CE GPIO 4 · CSN GPIO 5',
    color: 'var(--color-nrf)', hex: HEX.nrf, chip: '#DDE3E9',
    desc: '125-channel spectrum scan with congestion analysis.',
    unit: '% occ', base: 41, jitter: 12, range: [0, 100], refLimit: 100, level: 'moderate',
    glance: 'Band occupancy',
    tier2: [
      { label: 'Device Count Estimate', value: '7', unit: 'devices', sentence: 'Active wireless devices estimated by clustering busy channels.' },
      { label: 'Hopping Pattern', value: 'Active', unit: '', sentence: 'Frequency-hopping consistent with Bluetooth / Zigbee is present.' },
      { label: 'Idle Channels', value: '46', unit: '/ 125', sentence: 'Completely clear channels of the 125 scanned.' },
    ],
    charts: [
      { kind: 'spectrum', title: 'Live Spectrum Analyzer', sentence: 'Hit count per channel across all 125 channels, 2.400–2.525 GHz.', big: true },
      { kind: 'waterfall', title: 'Waterfall Plot', sentence: 'Channel activity over time — each row is one sweep, colour is hit count.', big: true },
      { kind: 'occupancy', title: 'Occupancy Trend', sentence: 'Average channel occupancy over the last few minutes, %.' },
      { kind: 'activity', title: 'Activity Timeline', sentence: 'Total RF activity per sweep, hits per sweep.' },
    ],
    visuals: ['radial', 'traffic'],
  },
  {
    key: 'rfpower', number: 'V4', name: 'RF Power',
    sensor: 'AD8318 Log Power Detector', pin: '1 MHz – 8 GHz · 70 dB',
    color: 'var(--color-rfpower)', hex: HEX.rfpower, chip: '#D6E8DA',
    desc: 'Broadband RF power across 1 MHz – 8 GHz.',
    unit: 'dBm', base: -42, jitter: 7, range: [-60, 0], refLimit: 0, level: 'safe',
    glance: 'Broadband power',
    disclaimer: 'This sensor measures total broadband RF power across 1 MHz–8 GHz. It cannot distinguish between individual frequency sources. Readings represent aggregate environmental RF exposure.',
    tier2: [
      { label: 'Power Density', value: '0.018', unit: 'W/m²', sentence: 'Converted power density — maps directly to ICNIRP / DoT reference values.' },
      { label: 'Power Density', value: '18', unit: 'mW/m²', sentence: 'Same value in mW/m², the unit used by reference tables.' },
      { label: 'Signal Bar Level', value: '6', unit: '/ 20', sentence: 'Phone-style discrete strength — an at-a-glance reading with no unit math.' },
    ],
    charts: [
      { kind: 'trend', title: 'Power Trend', sentence: 'RF power over time, dBm, with the project threshold lines.' },
      { kind: 'density', title: 'Power Density', sentence: 'Same data as power density over time, W/m², reference at DoT threshold.' },
      { kind: 'peakavg', title: 'Peak vs Average', sentence: 'Session peak compared with the rolling average, dBm.' },
      { kind: 'histogram', title: 'Session Histogram', sentence: 'Distribution of power readings this session, dBm.' },
    ],
    visuals: ['signal', 'needle', 'traffic'],
  },
];

const LEVEL_LABEL = { safe: 'LOW', moderate: 'MODERATE', high: 'HIGH' };
const LEVEL_COLOR = { safe: 'var(--color-safe)', moderate: 'var(--color-moderate)', high: 'var(--color-high)' };
const LEVEL_SENTENCE = {
  safe: "Measured values are within the project's low-exposure reference range.",
  moderate: "Measured values are elevated relative to the project's reference levels. Worth monitoring if exposure is prolonged.",
  high: "Measured values exceed the project's high-exposure threshold. Consider reducing proximity or duration.",
};

const SOURCE_OPTIONS = ['Wi-Fi router', 'Mobile tower', 'Power line', 'Microwave oven', 'Induction cooktop', 'Bluetooth device', 'Unknown', 'Other'];

const SOURCE_ADVICE = {
  'Wi-Fi router': [
    'Consider relocating the router away from frequently occupied areas.',
    'Enable the 5 GHz band for capable devices to reduce 2.4 GHz activity.',
    'Turn the router off overnight if it is not required.',
    'Maintain at least 1–2 m separation from the router during extended use.',
  ],
  'Mobile tower': [
    'Indoor exposure at typical city distances is substantially attenuated by walls and distance.',
    'Take measurements in multiple room locations to find any higher-exposure spots.',
    'The AD8318 broadband reading cannot isolate tower frequency from other RF sources.',
  ],
  'Power line': [
    'Magnetic field strength from power lines decreases rapidly with distance.',
    'Doubling the distance from the source reduces field strength by roughly 75%.',
    'The measured frequency component can confirm whether the field is from a mains source.',
  ],
  _default: [
    'Increase distance from the suspected source where practical.',
    'Reduce continuous exposure duration during high-reading periods.',
    'Re-measure at several positions to map where readings are highest.',
  ],
};

const LIMITATIONS = 'These recommendations are generated from project-defined thresholds and user-entered context. This system is a student-built prototype and is not a certified measurement instrument. Treat recommendations as informational guidance, not clinical or regulatory advice.';

Object.assign(window, { Icons, HEX, VERTICALS, LEVEL_LABEL, LEVEL_COLOR, LEVEL_SENTENCE, SOURCE_OPTIONS, SOURCE_ADVICE, LIMITATIONS });
