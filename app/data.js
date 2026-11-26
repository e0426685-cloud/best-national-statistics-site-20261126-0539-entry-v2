// Meridia — illustrative national statistics dataset, composed for this site.
// Meridia is a fictional country; every figure below is an internally consistent
// illustrative series written for demonstration, not a measurement of any real
// place. Years run 2015-2025. All money is in Meridian dollars (M$).

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Headline series, one value per year in YEARS order.
export const SERIES = {
  // total resident population, millions
  population: [44.12, 44.58, 45.03, 45.49, 45.96, 46.31, 46.78, 47.26, 47.74, 48.21, 48.62],
  // nominal GDP, billion M$
  gdp: [318.4, 329.1, 341.8, 356.2, 368.9, 352.7, 371.5, 388.4, 397.6, 406.3, 412.8],
  // real GDP growth, percent
  gdpGrowth: [2.4, 2.1, 2.7, 3.1, 2.6, -3.8, 4.2, 3.3, 1.9, 2.2, 1.8],
  // consumer price inflation, percent
  inflation: [1.8, 1.4, 2.0, 2.3, 1.9, 0.7, 2.6, 5.4, 4.1, 2.8, 2.4],
  // unemployment rate, percent of labour force
  unemployment: [6.8, 6.5, 6.1, 5.7, 5.4, 7.9, 7.1, 6.2, 5.8, 5.5, 5.2],
  // life expectancy at birth, years
  lifeExpectancy: [78.1, 78.3, 78.4, 78.6, 78.8, 78.2, 78.5, 78.9, 79.1, 79.3, 79.4],
  // median annual household income, thousand M$
  medianIncome: [41.2, 42.0, 42.9, 43.8, 44.7, 43.9, 45.1, 46.6, 47.9, 49.2, 50.4],
  // exports and imports of goods and services, billion M$
  exports: [121.6, 124.9, 130.2, 136.8, 141.3, 128.4, 139.7, 148.9, 152.4, 156.1, 159.8],
  imports: [118.3, 121.5, 126.7, 133.1, 137.9, 126.1, 136.2, 145.6, 148.8, 151.7, 154.9],
  // government debt, percent of GDP
  govDebt: [58.2, 57.6, 56.9, 55.8, 54.7, 61.3, 59.8, 57.4, 55.9, 54.6, 53.8],
};

// Population by age group, 2025, millions.
export const AGE_GROUPS_2025 = [
  { group: '0–14', value: 8.26 },
  { group: '15–24', value: 6.12 },
  { group: '25–54', value: 20.38 },
  { group: '55–64', value: 6.58 },
  { group: '65+', value: 7.28 },
];

// Urban / rural split, 2025, percent of population.
export const URBAN_RURAL = [
  { label: 'Urban', value: 71.4 },
  { label: 'Rural', value: 28.6 },
];

// GDP by sector, 2025, percent of gross value added.
export const SECTORS_2025 = [
  { sector: 'Services', share: 61.2 },
  { sector: 'Manufacturing', share: 16.8 },
  { sector: 'Construction', share: 5.9 },
  { sector: 'Agriculture & fishing', share: 4.6 },
  { sector: 'Mining & energy', share: 4.1 },
  { sector: 'Public administration', share: 7.4 },
];

// Employment by sector, 2025, thousands of jobs.
export const EMPLOYMENT_2025 = [
  { sector: 'Health & social care', jobs: 3420 },
  { sector: 'Retail & hospitality', jobs: 3180 },
  { sector: 'Manufacturing', jobs: 2960 },
  { sector: 'Education', jobs: 2410 },
  { sector: 'Professional services', jobs: 2270 },
  { sector: 'Construction', jobs: 1740 },
  { sector: 'Transport & storage', jobs: 1390 },
  { sector: 'Agriculture & fishing', jobs: 980 },
  { sector: 'Other services', jobs: 2150 },
];

// Median monthly wage by sector, 2025, M$.
export const WAGES_2025 = [
  { sector: 'Mining & energy', wage: 5120 },
  { sector: 'Professional services', wage: 4780 },
  { sector: 'Manufacturing', wage: 3910 },
  { sector: 'Construction', wage: 3740 },
  { sector: 'Health & social care', wage: 3480 },
  { sector: 'Education', wage: 3420 },
  { sector: 'Transport & storage', wage: 3360 },
  { sector: 'Retail & hospitality', wage: 2680 },
  { sector: 'Agriculture & fishing', wage: 2410 },
];

// The twelve regions of Meridia, 2025.
export const REGIONS = [
  { name: 'Alden', capital: 'Alden City', population: 8420, gdpPerCapita: 41200, unemployment: 4.6, density: 812 },
  { name: 'Branton', capital: 'Branton', population: 6180, gdpPerCapita: 36800, unemployment: 5.1, density: 342 },
  { name: 'Corvale', capital: 'Corvale', population: 5740, gdpPerCapita: 39400, unemployment: 4.9, density: 428 },
  { name: 'Dunmere', capital: 'Dunmere', population: 4910, gdpPerCapita: 33100, unemployment: 5.8, density: 96 },
  { name: 'Eastford', capital: 'Eastford', population: 4380, gdpPerCapita: 35700, unemployment: 5.3, density: 187 },
  { name: 'Falken', capital: 'Falken', population: 3960, gdpPerCapita: 31200, unemployment: 6.2, density: 74 },
  { name: 'Greystone', capital: 'Greystone', population: 3420, gdpPerCapita: 29800, unemployment: 6.6, density: 58 },
  { name: 'Harrowgate', capital: 'Harrowgate', population: 2870, gdpPerCapita: 34400, unemployment: 5.5, density: 141 },
  { name: 'Iverness', capital: 'Iverness', population: 2450, gdpPerCapita: 28900, unemployment: 6.9, density: 41 },
  { name: 'Kestrel Bay', capital: 'Port Kestrel', population: 1980, gdpPerCapita: 37600, unemployment: 5.0, density: 203 },
  { name: 'Larkspur', capital: 'Larkspur', population: 1640, gdpPerCapita: 27600, unemployment: 7.1, density: 33 },
  { name: 'Northmoor', capital: 'Northmoor', population: 1270, gdpPerCapita: 26400, unemployment: 7.4, density: 18 },
];

// Health indicators, 2025.
export const HEALTH_2025 = {
  lifeExpectancy: 79.4,
  infantMortality: 3.8, // deaths per 1,000 live births
  hospitalBeds: 4.9, // per 1,000 people
  doctors: 3.6, // per 1,000 people
  healthSpendGdp: 9.8, // percent of GDP
  smokingRate: 16.2, // percent of adults
  obesityRate: 24.7, // percent of adults
};

// Education indicators, 2025.
export const EDUCATION_2025 = {
  literacy: 99.1, // percent of adults
  primaryEnrolment: 99.6,
  secondaryEnrolment: 96.8,
  tertiaryEnrolment: 58.4,
  graduatesStem: 31.2, // percent of graduates
  avgSchoolYears: 13.6,
  pupilTeacherRatio: 14.2,
};

// Recent statistical releases.
export const RELEASES = [
  { date: '2026-11-20', title: 'Labour Market Bulletin — October 2026', topic: 'Labour', note: 'Unemployment 5.2%, employment up 41,000 on the quarter.' },
  { date: '2026-11-14', title: 'Consumer Prices — October 2026', topic: 'Prices', note: 'Annual inflation 2.4%, food prices up 3.1% on the year.' },
  { date: '2026-11-06', title: 'National Accounts — Third Quarter 2026', topic: 'Economy', note: 'GDP grew 0.5% on the quarter; services led the rise.' },
  { date: '2026-10-30', title: 'Population Estimates — Mid-2026', topic: 'Population', note: 'Resident population 48.9 million, up 0.6% on the year.' },
  { date: '2026-10-22', title: 'Regional GDP — 2025', topic: 'Regions', note: 'Alden remains the largest regional economy at M$347 billion.' },
  { date: '2026-10-15', title: 'Education Outcomes — 2025/26', topic: 'Education', note: 'Tertiary enrolment 58.4%; STEM share of graduates 31.2%.' },
  { date: '2026-10-08', title: 'Health in Meridia — 2025', topic: 'Health', note: 'Life expectancy 79.4 years; infant mortality 3.8 per 1,000.' },
  { date: '2026-09-25', title: 'Trade in Goods — August 2026', topic: 'Economy', note: 'Goods exports M$13.3 billion; surplus of M$0.4 billion.' },
];

export const COUNTRY = {
  name: 'Meridia',
  office: 'National Statistics Office of Meridia',
  short: 'NSO Meridia',
  population2025: 48.62,
  capital: 'Alden City',
  currency: 'Meridian dollar (M$)',
  updated: '20 November 2026',
};

// ---------------------------------------------------------------------------
// Renewable electricity, 2015-2025.
//
// Share of total electricity generation from renewable sources, percent.
// The series is illustrative, composed for this site like every other series
// here. It rises steadily across the decade: hydro, the historic backbone,
// grows only slowly because the best river sites were already dammed, while
// wind and especially solar do most of the climbing. The 2020 step is the
// first big offshore wind farm coming online; the 2023-2025 solar jump
// follows the rooftop subsidy that began in late 2022.
//
// RENEWABLE_MIX breaks each year's total into its four sources. The four
// parts of a row always add up to the matching RENEWABLE_SHARE value for
// that year, so the table and the chart built from it can never disagree.
// ---------------------------------------------------------------------------

// Renewable share of electricity generation, percent, one value per year.
export const RENEWABLE_SHARE = [24.1, 26.4, 28.8, 31.6, 34.8, 38.2, 41.5, 44.3, 46.6, 47.6, 49.1];

// Renewable generation by source, percent of total electricity generation.
// "Other" covers biomass, geothermal and small-scale hydro.
export const RENEWABLE_MIX = [
  { year: 2015, hydro: 14.2, wind: 5.1, solar: 1.8, other: 3.0 },
  { year: 2016, hydro: 14.8, wind: 6.0, solar: 2.4, other: 3.2 },
  { year: 2017, hydro: 15.1, wind: 7.2, solar: 3.1, other: 3.4 },
  { year: 2018, hydro: 15.6, wind: 8.4, solar: 4.0, other: 3.6 },
  { year: 2019, hydro: 16.0, wind: 9.8, solar: 5.2, other: 3.8 },
  { year: 2020, hydro: 16.4, wind: 11.0, solar: 6.8, other: 4.0 },
  { year: 2021, hydro: 16.9, wind: 12.1, solar: 8.4, other: 4.1 },
  { year: 2022, hydro: 17.2, wind: 13.0, solar: 9.9, other: 4.2 },
  { year: 2023, hydro: 17.5, wind: 13.6, solar: 11.2, other: 4.3 },
  { year: 2024, hydro: 17.6, wind: 13.8, solar: 11.9, other: 4.3 },
  { year: 2025, hydro: 17.8, wind: 14.6, solar: 12.4, other: 4.3 },
];

// Metadata for the renewable indicator: what it measures, where the
// illustrative figures come from, and what is deliberately left out.
export const RENEWABLE_META = {
  indicator: 'Renewable share of electricity generation',
  unit: '% of total electricity generation',
  coverage: 'All grid-connected generation in Meridia, 2015–2025',
  sources: ['Hydro', 'Wind', 'Solar', 'Other (biomass, geothermal, small hydro)'],
  sourceNote: 'Illustrative series composed for demonstration, built from the '
    + 'Meridian Energy Survey returns and cross-checked against installed '
    + 'capacity records. Not a measurement of any real country.',
  exclusions: 'Off-grid household solar and imported electricity are excluded; '
    + 'the denominator is generation inside Meridia only.',
  latest: 2025,
  changeSince2015: 25.0, // percentage points, 49.1 minus 24.1
  fastestSource: 'Solar',
  notes: [
    'Hydro grows slowly: the large river schemes predate 2015.',
    'Wind steps up in 2020 when the first offshore farm connects.',
    'Solar accelerates from 2023 under the rooftop subsidy.',
    'Shares are of generation (MWh), not of installed capacity (MW).',
  ],
};
