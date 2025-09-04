import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { simulate, type Inputs } from '@/lib/sim';

export const runtime = 'edge';

const InputsSchema = z.object({
  location: z.string().min(1),
  capacityKwp: z.number().nonnegative(),
  installCost: z.number().nonnegative(),
  systemEfficiency: z.number().min(0).max(1),
  irradiance: z.number().nonnegative(),
  usageKwhYear: z.number().nonnegative(),
  selfConsumptionRate: z.number().min(0).max(1),
  electricityPrice: z.number().min(0),
  feedInTariff: z.number().min(0),
  loanAmount: z.number().min(0),
  loanYears: z.number().min(0),
  loanAPR: z.number().min(0),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = InputsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const inputs = parsed.data as Inputs;
  const result = simulate(inputs);
  return NextResponse.json(result, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
