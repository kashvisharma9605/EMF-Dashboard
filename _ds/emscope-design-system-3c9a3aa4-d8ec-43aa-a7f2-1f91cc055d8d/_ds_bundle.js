/* @ds-bundle: {"format":3,"namespace":"EMScopeDesignSystem_3c9a3a","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ModuleCard","sourcePath":"components/core/ModuleCard.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"StatRibbon","sourcePath":"components/core/StatRibbon.jsx"},{"name":"StatusIndicator","sourcePath":"components/core/StatusIndicator.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Button.jsx":"a30ef583249f","components/core/Card.jsx":"b8dff684c5d9","components/core/ModuleCard.jsx":"2fafacb71814","components/core/SectionHeading.jsx":"dd536c67a618","components/core/StatRibbon.jsx":"8204a605ccf0","components/core/StatusIndicator.jsx":"3ce873bb38ec","components/core/Tag.jsx":"25ae7eac66da"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EMScopeDesignSystem_3c9a3a = window.EMScopeDesignSystem_3c9a3a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EMScope Button — flat instrumentation button.
 * Amber primary CTA, outlined secondary, borderless ghost.
 */
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '0.8rem',
      padding: '6px 14px'
    },
    md: {
      fontSize: '0.88rem',
      padding: '10px 20px'
    },
    lg: {
      fontSize: '0.95rem',
      padding: '13px 26px'
    }
  };
  const variants = {
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: '#fff',
      borderColor: 'transparent'
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      borderColor: 'var(--color-border)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      borderColor: 'transparent'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-dashboard)',
    fontWeight: 600,
    lineHeight: 1.2,
    border: '1px solid transparent',
    borderRadius: 'var(--radius-card)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    transition: 'background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = href ? 'a' : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: base,
    disabled: Tag === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EMScope Card — white instrumentation surface.
 * Flat at rest; lifts on hover when `interactive`.
 * Optional coloured top edge for identity (module / status accent).
 */
function Card({
  accentColor,
  interactive = false,
  as = 'div',
  href,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lift = interactive && hover;
  const base = {
    display: 'block',
    backgroundColor: 'var(--color-surface)',
    border: 'var(--border-card)',
    borderTop: accentColor ? `4px solid ${accentColor}` : 'var(--border-card)',
    borderRadius: 'var(--radius-card)',
    padding: 'var(--space-2)',
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    transform: lift ? 'translateY(-3px)' : 'none',
    boxShadow: lift ? 'var(--shadow-card-hover)' : 'none',
    ...style
  };
  const Tag = href ? 'a' : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: base,
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/ModuleCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EMScope ModuleCard — the signature sensing-vertical card.
 * Card + coloured top edge + tinted icon chip + mono number + serif name
 * + mono sensor line + dashed metric row.
 */
function ModuleCard({
  number,
  name,
  sensor,
  description,
  metrics = [],
  icon,
  accentColor = 'var(--color-primary)',
  chipBg = 'var(--color-surface-alt)',
  href,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    accentColor: accentColor,
    interactive: true,
    href: href,
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '38px',
      height: '38px',
      borderRadius: '8px',
      backgroundColor: chipBg,
      color: accentColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '22px',
      height: '22px',
      display: 'block'
    }
  }, icon)), number && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.64rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--color-accent)'
    }
  }, number)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem',
      fontWeight: 700,
      margin: '0 0 2px 0',
      color: 'var(--color-text-primary)'
    }
  }, name), sensor && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.74rem',
      color: 'var(--color-text-muted)',
      margin: '0 0 6px 0'
    }
  }, sensor), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--color-text-secondary)',
      margin: '0 0 var(--space-1) 0',
      lineHeight: 1.5
    }
  }, description), metrics.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginTop: 'var(--space-1)',
      paddingTop: 'var(--space-1)',
      borderTop: '1px dashed var(--color-border)'
    }
  }, metrics.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.64rem',
      color: 'var(--color-text-muted)',
      backgroundColor: 'var(--color-surface-alt)',
      padding: '2px 6px',
      borderRadius: '4px'
    }
  }, m))));
}
Object.assign(__ds_scope, { ModuleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ModuleCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EMScope SectionHeading — mono uppercase kicker over a serif title.
 * The standard way every content section opens.
 */
function SectionHeading({
  kicker,
  title,
  as = 'h2',
  style,
  ...rest
}) {
  const Heading = as;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--color-text-muted)',
      margin: '0 0 6px 0'
    }
  }, kicker), title && /*#__PURE__*/React.createElement(Heading, {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      fontWeight: 700,
      margin: 0,
      color: 'var(--color-text-primary)',
      lineHeight: 1.2
    }
  }, title));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/StatRibbon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EMScope StatRibbon — dark navy strip of headline figures.
 * Sits directly under the hero. Mono values, uppercase labels.
 */
function StatRibbon({
  items = [],
  columns,
  style,
  ...rest
}) {
  const cols = columns || Math.min(items.length || 1, 4);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '1px',
      backgroundColor: 'var(--color-navy)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      backgroundColor: 'var(--color-navy-2)',
      padding: 'var(--space-2)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.35rem',
      fontWeight: 700,
      color: it.color || 'var(--color-primary-bright)'
    }
  }, it.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.66rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--color-text-on-dark-muted)',
      marginTop: '2px'
    }
  }, it.label))));
}
Object.assign(__ds_scope, { StatRibbon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatRibbon.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusIndicator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATE_COLORS = {
  online: 'var(--color-safe)',
  offline: 'var(--color-high)',
  moderate: 'var(--color-moderate)'
};

/**
 * EMScope StatusIndicator — coloured dot + optional label.
 * Used in the navbar ("SYSTEM ONLINE") and status panels.
 */
function StatusIndicator({
  state = 'online',
  pulse = false,
  label,
  mono = true,
  style,
  ...rest
}) {
  const color = STATE_COLORS[state] || STATE_COLORS.online;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-dashboard)',
      fontSize: '0.72rem',
      color: 'var(--color-text-secondary)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color,
      flexShrink: 0,
      animation: pulse ? 'emscope-pulse 2.4s ease-in-out infinite' : 'none'
    }
  }), label, /*#__PURE__*/React.createElement("style", null, `@keyframes emscope-pulse{0%,100%{opacity:1}50%{opacity:.35}}`));
}
Object.assign(__ds_scope, { StatusIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusIndicator.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  red: {
    bg: 'var(--tag-red-bg)',
    fg: 'var(--tag-red-fg)'
  },
  orange: {
    bg: 'var(--tag-orange-bg)',
    fg: 'var(--tag-orange-fg)'
  },
  yellow: {
    bg: 'var(--tag-yellow-bg)',
    fg: 'var(--tag-yellow-fg)'
  },
  green: {
    bg: 'var(--tag-green-bg)',
    fg: 'var(--tag-green-fg)'
  },
  blue: {
    bg: 'var(--tag-blue-bg)',
    fg: 'var(--tag-blue-fg)'
  }
};

/**
 * EMScope Tag — small mono pill for categorising signal types / sources.
 */
function Tag({
  tone = 'blue',
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.blue;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      fontWeight: 600,
      lineHeight: 1.4,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      backgroundColor: t.bg,
      color: t.fg,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ModuleCard = __ds_scope.ModuleCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatRibbon = __ds_scope.StatRibbon;

__ds_ns.StatusIndicator = __ds_scope.StatusIndicator;

__ds_ns.Tag = __ds_scope.Tag;

})();
