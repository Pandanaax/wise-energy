'use client';

import Slider from './ui/Slider';
import { COUNTRIES } from '@/data/countries';
import type { Inputs } from '@/lib/sim';

type Props = {
  form: Inputs;
  set: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
  countryCode: string;
  onCountryChange: (code: string) => void;
  onUpdateIrradiance: () => Promise<void> | void;
  euros: (n: number) => string;
  numberFmt: (n: number) => string;
};

export default function Controls({
  form,
  set,
  countryCode,
  onCountryChange,
  onUpdateIrradiance,
  euros,
  numberFmt,
}: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm text-slate-700">Country</label>
        <select
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-700">Location label</label>
        <input
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
        />
      </div>

      <button
        onClick={onUpdateIrradiance}
        className="btn-amber inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow hover:brightness-110 transition"
        >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
            <linearGradient id="irrSun" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F59E0B"/>
                <stop offset="100%" stopColor="#FBBF24"/>
            </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="5.5" fill="url(#irrSun)"/>
            <g stroke="#111827" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5 5l1.6 1.6M17.4 17.4L19 19M19 5l-1.6 1.6M7 17.4L5.4 19"/>
            </g>
        </svg>
        Update irradiance
        </button>


      <Slider
        label="System size (kWp)"
        min={1}
        max={15}
        step={0.1}
        value={form.capacityKwp}
        onChange={(v) => set('capacityKwp', v)}
      />

      <Slider
        label="System efficiency"
        min={0.6}
        max={0.95}
        step={0.01}
        value={form.systemEfficiency}
        onChange={(v) => set('systemEfficiency', v)}
        format={(v) => `${(v * 100).toFixed(0)}%`}
      />

      <div className="space-y-2">
        <label className="text-sm text-slate-700">Irradiance (kWh/m²/yr)</label>
        <input
          type="number"
          min={600}
          max={2000}
          step={10}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          value={form.irradiance}
          onChange={(e) => set('irradiance', +e.target.value)}
        />
      </div>

      <Slider
        label="Self-consumption rate"
        min={0.2}
        max={0.95}
        step={0.01}
        value={form.selfConsumptionRate}
        onChange={(v) => set('selfConsumptionRate', v)}
        format={(v) => `${(v * 100).toFixed(0)}%`}
      />

      <Slider
        label="Annual usage (kWh)"
        min={1000}
        max={10000}
        step={50}
        value={form.usageKwhYear}
        onChange={(v) => set('usageKwhYear', v)}
        format={(v) => numberFmt(v)}
      />

      <Slider
        label="Electricity price (€/kWh)"
        min={0.1}
        max={0.6}
        step={0.01}
        value={form.electricityPrice}
        onChange={(v) => set('electricityPrice', v)}
        format={(v) => euros(v).replace('€', '€ ')}
      />

      <Slider
        label="Feed-in tariff (€/kWh)"
        min={0}
        max={0.2}
        step={0.005}
        value={form.feedInTariff}
        onChange={(v) => set('feedInTariff', v)}
        format={(v) => euros(v).replace('€', '€ ')}
      />
    </div>
  );
}
