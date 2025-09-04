'use client';

import type { Outputs } from '@/lib/sim';

export default function ProjectionTable({ out, euros }: { out: Outputs; euros: (n: number) => string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-medium text-slate-800">10-Year Projection</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr className="text-left border-b border-slate-200">
              <th className="py-2 pr-4">Year</th>
              <th className="py-2 pr-4">Net cashflow</th>
              <th className="py-2 pr-4">Cumulative gain</th>
            </tr>
          </thead>
          <tbody className="text-slate-900">
            {out.cashflow10y.map((r, i) => (
              <tr key={r.year} className={i % 2 ? 'bg-white' : 'bg-slate-50'}>
                <td className="py-2 pr-4 font-medium">{r.year}</td>
                <td className="py-2 pr-4">{euros(r.netAnnualCashFlow)}</td>
                <td className="py-2 pr-4">{euros(r.cumulatedNetGain)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
