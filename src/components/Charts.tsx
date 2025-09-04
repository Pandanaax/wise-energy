'use client';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import type { Outputs } from '@/lib/sim';

type Props = { out: Outputs; euros: (n: number) => string };

export default function Charts({ out, euros }: Props) {
  const data = out.cashflow10y.map((r) => ({ year: r.year, net: Math.round(r.netAnnualCashFlow), cum: Math.round(r.cumulatedNetGain) }));
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium text-slate-800">Visualizations</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => euros(Number(v))} labelFormatter={(l) => `Year ${l}`} />
            <Line type="monotone" dataKey="cum" dot={false} stroke="#f59e0b" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => euros(Number(v))} labelFormatter={(l) => `Year ${l}`} />
            <Bar dataKey="net" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
