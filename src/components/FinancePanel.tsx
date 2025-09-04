'use client';

import Slider from '@/components/ui/Slider';
import ProgressRing from '@/components/ui/ProgressRing';
import type { Inputs, Outputs } from '@/lib/sim';

type Props = {
  form: Inputs;
  set: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
  out: Outputs;
  euros: (n: number) => string;
  numberFmt: (n: number) => string;
};

export default function FinancePanel({ form, set, out, euros, numberFmt }: Props) {
  const prodPct   = Math.min(100, (out.annualProduction / 6000) * 100);
  const share     = out.selfConsumed + out.exported || 1;
  const selfPct   = Math.min(100, (out.selfConsumed / share) * 100);
  const exportPct = 100 - selfPct;
  const savPct    = Math.min(100, (out.savings / 1500) * 100);
  const feedPct   = Math.min(100, (out.feedInRevenue / 600) * 100);
  const loanPct   = Math.min(100, (out.monthlyLoanPayment / 300) * 100);
  const payPct    = out.paybackYears ? Math.max(0, Math.min(100, ((12 - out.paybackYears) / 12) * 100)) : 0;

  const from = '#F6C21E';
  const to   = '#E45A2B';

  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Financing</h2>

      <div className="space-y-5">
        <Slider label="Loan amount (€)" min={0} max={20000} step={100} value={form.loanAmount} onChange={(v) => set('loanAmount', v)} format={(v) => euros(v)} />
        <Slider label="Loan years" min={0} max={15} step={1} value={form.loanYears} onChange={(v) => set('loanYears', v)} />
        <Slider label="APR" min={0} max={0.12} step={0.001} value={form.loanAPR} onChange={(v) => set('loanAPR', v)} format={(v) => `${(v * 100).toFixed(1)}%`} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <ProgressRing
          label="Annual production"
          percent={prodPct}
          value={Math.round(out.annualProduction)}
          formatter={(n) => `${numberFmt(n)} kWh`}
          colorFrom={from}
          colorTo={to}
        />
        <ProgressRing
          label="Self-consumption"
          percent={selfPct}
          value={Math.round(out.selfConsumed)}
          formatter={(n) => `${numberFmt(n)} kWh`}
          colorFrom={from}
          colorTo={to}
        />
        <ProgressRing
          label="Exported"
          percent={exportPct}
          value={Math.round(out.exported)}
          formatter={(n) => `${numberFmt(n)} kWh`}
          colorFrom={from}
          colorTo={to}
        />
        <ProgressRing
          label="Savings"
          percent={savPct}
          value={Math.round(out.savings)}
          formatter={(n) => `${euros(n)}/yr`}
          colorFrom={from}
          colorTo={to}
        />
        <ProgressRing
          label="Feed-in revenue"
          percent={feedPct}
          value={Math.round(out.feedInRevenue)}
          formatter={(n) => `${euros(n)}/yr`}
          colorFrom={from}
          colorTo={to}
        />
        <ProgressRing
          label="Loan monthly"
          percent={loanPct}
          value={Math.round(out.monthlyLoanPayment)}
          formatter={(n) => `${euros(n)}/mo`}
          colorFrom={from}
          colorTo={to}
        />
        <ProgressRing
          label="Payback"
          percent={payPct}
          valueLabel={out.paybackYears ? `${out.paybackYears.toFixed(1)} yrs` : '—'}
          colorFrom={from}
          colorTo={to}
        />
      </div>
    </div>
  );
}
