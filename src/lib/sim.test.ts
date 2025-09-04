import { simulate } from './sim';


describe('Simulation PV', () => {
test('Exemple Bruxelles', () => {
const out = simulate({
location: 'Bruxelles',
capacityKwp: 4,
installCost: 6000,
systemEfficiency: 0.85,
irradiance: 1100,
usageKwhYear: 3500,
selfConsumptionRate: 0.60,
electricityPrice: 0.30,
feedInTariff: 0.08,
loanAmount: 6000,
loanYears: 5,
loanAPR: 0.04,
});


expect(Math.round(out.annualProduction)).toBe(3740);
expect(Math.round(out.selfConsumed)).toBe(2244);
expect(Math.round(out.exported)).toBe(1496);
expect(out.monthlyLoanPayment).toBeGreaterThan(110);
});
});