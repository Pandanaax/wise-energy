export type Inputs = {
    location: string;
    capacityKwp: number;
    installCost: number;
    systemEfficiency: number;      
    irradiance: number;
    usageKwhYear: number;
    selfConsumptionRate: number;   
    electricityPrice: number;
    feedInTariff: number;    
    loanAmount: number;
    loanYears: number;
    loanAPR: number;
  };
  
  export type YearCashflow = {
    year: number;
    netAnnualCashFlow: number;
    cumulatedNetGain: number;
  };
  
  export type Outputs = {
    annualProduction: number;
    selfConsumed: number;
    exported: number;
    savings: number;
    feedInRevenue: number;
    totalAnnualBenefit: number;
    monthlyLoanPayment: number;
    annualLoanPayment: number;
    paybackYears: number | null;
    cashflow10y: YearCashflow[];
  };
  
  function annuityMonthlyPayment(principal: number, annualRate: number, years: number) {
    const n = Math.max(1, Math.round(years * 12));
    if (principal <= 0) return 0;
    if (annualRate === 0) return principal / n;
    const r = annualRate / 12;
    const pow = Math.pow(1 + r, n);
    return (principal * (r * pow)) / (pow - 1);
  }
  
  export function simulate(i: Inputs): Outputs {
    const annualProduction = i.capacityKwp * i.irradiance * i.systemEfficiency;
    const selfConsumed = annualProduction * i.selfConsumptionRate;
    const exported = Math.max(0, annualProduction - selfConsumed);
  
    const savings = selfConsumed * i.electricityPrice;
    const feedInRevenue = exported * i.feedInTariff;
    const totalAnnualBenefit = savings + feedInRevenue;
  
    const monthlyLoanPayment = annuityMonthlyPayment(i.loanAmount, i.loanAPR, i.loanYears);
    const annualLoanPayment = monthlyLoanPayment * 12;
  
    const paybackYears = totalAnnualBenefit > 0 ? i.installCost / totalAnnualBenefit : null;
  
    const cashflow10y: YearCashflow[] = [];
    for (let y = 1; y <= 10; y++) {
      const loanThisYear = y <= i.loanYears ? annualLoanPayment : 0;
      const net = totalAnnualBenefit - loanThisYear;
      const cum =
        totalAnnualBenefit * y - (i.installCost + annualLoanPayment * Math.min(y, i.loanYears));
      cashflow10y.push({ year: y, netAnnualCashFlow: net, cumulatedNetGain: cum });
    }
  
    return {
      annualProduction,
      selfConsumed,
      exported,
      savings,
      feedInRevenue,
      totalAnnualBenefit,
      monthlyLoanPayment,
      annualLoanPayment,
      paybackYears,
      cashflow10y,
    };
  }
  