'use client';
import * as React from 'react';

type Props = {
  label: string;
  percent: number;              // 0..100 (cible)
  value?: number;               // optionnel: chiffre à animer (ex: 3740)
  formatter?: (n: number) => string; // format d'affichage (ex: (n)=>`${n.toLocaleString()} kWh`)
  valueLabel?: string;          // fallback si pas de value/formatter
  size?: number;                // diamètre px
  stroke?: number;              // épaisseur px
  colorFrom?: string;           // début dégradé
  colorTo?: string;             // fin dégradé
  trackColor?: string;          // couleur de fond
  className?: string;
};

export default function ProgressRing({
  label,
  percent,
  value,
  formatter,
  valueLabel,
  size = 120,
  stroke = 12,
  colorFrom = '#F59E0B',
  colorTo = '#FBBF24',
  trackColor = '#E5E7EB',
  className,
}: Props) {
  const gidRaw = React.useId();
  const gid = React.useMemo(() => gidRaw.replace(/[:]/g, ''), [gidRaw]);

  // animation 0..1
  const [t, setT] = React.useState(0);
  const target = Math.max(0, Math.min(100, percent)) / 100;

  // chiffre animé
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const dur = 900; // ms
    const start = performance.now();
    const t0 = t;
    const v0 = val;
    const vTarget = value ?? val;

    const ease = (x: number) => 1 - Math.pow(1 - x, 3); // easeOutCubic

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = ease(p);
      setT(t0 + (target - t0) * e);
      if (value !== undefined) setVal(v0 + (vTarget - v0) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, value]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dashoffset = c * (1 - t); // 1 -> 0
  const angle = -90 + 360 * t;    // position du point suiveur
  const rad = (angle * Math.PI) / 180;
  const cx = size / 2 + r * Math.cos(rad);
  const cy = size / 2 + r * Math.sin(rad);

  const display =
    value !== undefined && formatter
      ? formatter(Math.round(val))
      : (valueLabel ?? '');

  return (
    <div className={['relative flex items-center gap-4', className].filter(Boolean).join(' ')}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={`grad-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>

        {/* piste */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />

        {/* arc animé */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#grad-${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            strokeDasharray: c,
            strokeDashoffset: c - c * t,
            filter: `drop-shadow(0 1px 4px ${colorFrom}40)`,
            transition: 'filter 200ms ease',
          }}
        />

        {/* point suiveur */}
        <circle cx={cx} cy={cy} r={stroke / 2.2} fill={colorTo} />

        {/* chiffre au centre */}
        <g pointerEvents="none">
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            className="fill-slate-900"
            style={{ fontWeight: 700, fontSize: size * 0.18 }}
          >
            {Math.round(t * 100)}
            <tspan className="fill-slate-500" style={{ fontWeight: 600, fontSize: size * 0.14 }}>
              %
            </tspan>
          </text>
          {display && (
            <text
              x="50%"
              y="67%"
              textAnchor="middle"
              className="fill-slate-600"
              style={{ fontSize: size * 0.12, fontWeight: 600 }}
            >
              {display}
            </text>
          )}
        </g>
      </svg>

      {/* légende à droite */}
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        {display && (
          <div className="mt-0.5 text-sm font-medium text-slate-700">{display}</div>
        )}
      </div>
    </div>
  );
}
