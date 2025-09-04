Wise Energy — Solar ROI Simulator

A small Next.js app to estimate the return on investment (ROI) of a residential solar system.
Adjust a few inputs (system size, efficiency, prices, loan…) and see production, savings, feed-in revenue, payback time, and a 10-year cashflow — updated live.

ROI = Return on Investment — how long it takes for the system to pay for itself and how much it earns over time.

Features

Tailwind-styled UI (clean cards, sliders, charts)

Country selector with preset irradiance

Update irradiance button (calls /api/irradiance)

Finance panel with animated circular KPIs

Recharts graphs (10-year cumulative gain & yearly net cashflow)

10-year projection table

Brand header with logo

Tech stack

Next.js 15 (App Router)

React 18 + TypeScript

Tailwind CSS

Recharts

Project structure
.
├─ next-env.d.ts
├─ package.json
├─ public/
│  └─ wise-energy-logo.png
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ irradiance/
│  │  │  │  └─ route.ts
│  │  │  └─ simulate/
│  │  │     └─ route.ts
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ BrandHeader.tsx
│  │  ├─ Charts.tsx
│  │  ├─ Controls.tsx
│  │  ├─ FinancePanel.tsx
│  │  ├─ ProjectionTable.tsx
│  │  └─ ui/
│  │     ├─ Card.tsx
│  │     ├─ ProgressRing.tsx
│  │     └─ Slider.tsx
│  ├─ data/
│  │  └─ countries.ts
│  └─ lib/
│     ├─ sim.ts
│     └─ sim.test.ts
└─ tsconfig.json


Logo: public/wise-energy-logo.png

Global styles: src/app/globals.css

Simulation logic: src/lib/sim.ts

Getting started
1) Install
npm install

2) Dev
npm run dev
# open http://localhost:3000

3) Production
npm run build
npm start

How to use

Pick a Country (irradiance is preset; you can edit it).

Click Update irradiance (optional) to refetch from /api/irradiance?location=....

Move the sliders (system size, efficiency, prices, loan).

Read KPIs, charts, and the 10-year table.
Payback shows the estimated years to recover the investment.

Customize

Countries: edit src/data/countries.ts.

Theme / CSS: edit src/app/globals.css.

Header logo: replace public/wise-energy-logo.png.

API

GET /api/irradiance?location=...
→ returns

{ "irradiance": 1100 }


(stub you can wire to a real data source)

POST /api/simulate (if used)
→ runs the calculation server-side (see src/app/api/simulate/route.ts).

Troubleshooting

Tailwind not applied → ensure Tailwind & PostCSS are configured and globals.css is imported in layout.tsx.

Background not visible → ensure no full-page element with a solid background covers the page and that globals.css is loaded.
