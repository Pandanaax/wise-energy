import { NextRequest, NextResponse } from 'next/server';


type Entry = { value: number; expiresAt: number };
const SIX_HOURS = 6 * 60 * 60 * 1000;


const g: any = globalThis as any;
if (!g.__IRRADIANCE_CACHE__) g.__IRRADIANCE_CACHE__ = new Map<string, Entry>();
const CACHE: Map<string, Entry> = g.__IRRADIANCE_CACHE__;


const DEFAULTS: Record<string, number> = {
'bruxelles': 1100,
'paris': 1200,
'lyon': 1350,
'marseille': 1600,
'berlin': 1150,
'madrid': 1700,
};


export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);
const loc = (searchParams.get('location') || '').toLowerCase().trim();
if (!loc) return NextResponse.json({ error: 'location is required' }, { status: 400 });


const now = Date.now();
const hit = CACHE.get(loc);
if (hit && hit.expiresAt > now) {
return NextResponse.json({ location: loc, irradiance: hit.value, cached: true });
}

const value = DEFAULTS[loc] ?? 1200;


CACHE.set(loc, { value, expiresAt: now + SIX_HOURS });


return NextResponse.json({ location: loc, irradiance: value, cached: false });
}