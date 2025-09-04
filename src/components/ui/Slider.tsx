'use client';

import * as React from 'react';

export type SliderProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
};

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: SliderProps) {
  const show = format ? format(value) : String(value);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-500">{show}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="slider-colored"
        style={{ ['--value' as any]: `${percent}%` }}
      />
    </div>
  );
}
