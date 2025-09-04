'use client';

import { useMemo, useState } from 'react';
import { simulate, type Inputs } from '@/lib/sim';
import Controls from '@/components/Controls';
import FinancePanel from '@/components/FinancePanel';
import Charts from '@/components/Charts';
import ProjectionTable from '@/components/ProjectionTable';
import { COUNTRIES } from '@/data/countries';

const euros = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
const numberFmt = (n: number) => n.toLocaleString('en-GB', { maximumFractionDigits: 0 });

const DEFAULTS: Inputs = {
  location: 'Belgium',
  capacityKwp: 4,
  installCost: 6000,
  systemEfficiency: 0.85,
  irradiance: 1100,
  usageKwhYear: 3500,
  selfConsumptionRate: 0.6,
  electricityPrice: 0.3,
  feedInTariff: 0.08,
  loanAmount: 6000,
  loanYears: 5,
  loanAPR: 0.04,
};

export default function Page() {
  const [form, setForm] = useState<Inputs>({ ...DEFAULTS });
  const [country, setCountry] = useState<string>('BE');
  const out = useMemo(() => simulate(form), [form]);
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setForm((f) => ({ ...f, [k]: v }));

  function onCountryChange(code: string) {
    setCountry(code);
    const c = COUNTRIES.find((x) => x.code === code);
    if (c) { set('location', c.name); set('irradiance', c.irr); }
  }

  async function refreshIrradiance() {
    const res = await fetch(`/api/irradiance?location=${encodeURIComponent(form.location)}`);
    const js = await res.json();
    if (js?.irradiance) set('irradiance', js.irradiance);
  }

  return (
    <main className="space-y-8">
      <div id="main-start" className="h-px w-px pointer-events-none" />

      <p id="intro" className="text-sm text-slate-600">
        Estimate production, savings, feed-in revenue, loan, payback and 10-year cashflow.
      </p>

      <section className="grid gap-6 lg:grid-cols-3">
        <Controls
          form={form}
          set={set}
          countryCode={country}
          onCountryChange={onCountryChange}
          onUpdateIrradiance={refreshIrradiance}
          euros={euros}
          numberFmt={numberFmt}
        />
        <FinancePanel form={form} set={set} out={out} euros={euros} numberFmt={numberFmt} />
        <Charts out={out} euros={euros} />
      </section>

      <ProjectionTable out={out} euros={euros} />
    </main>
  );
}
