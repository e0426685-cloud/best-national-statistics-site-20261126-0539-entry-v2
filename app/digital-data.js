// Digital-life series for Meridia, 2015-2025.
//
// These are the National Statistics Office's own digital indicators,
// compiled from the telecom regulator, the e-government portal and the
// household survey. Every figure below was composed for this page; the
// series are illustrative, in the same spirit as the rest of the site's
// Meridia data. Internet use is the share of residents aged 16 and over
// who used the internet in the last three months. Mobile subscriptions
// count active subscriptions per 100 residents. E-government use is the
// share of residents who completed at least one public service online in
// the year. Broadband speed is the average measured fixed-line download
// speed across the country.

import { YEARS } from './data.js';

export { YEARS };

const INTERNET_USE = [54.3, 58.9, 63.1, 67.4, 71.8, 76.2, 80.5, 84.1, 87.3, 89.8, 91.7];
const MOBILE_SUBS = [88, 92, 96, 101, 105, 109, 113, 116, 119, 122, 124];
const EGOV_USE = [22.6, 26.4, 31.2, 36.8, 42.5, 49.1, 56.3, 63.0, 69.2, 74.1, 78.4];
const BROADBAND_SPEED = [8.4, 11.2, 15.6, 21.3, 28.9, 38.4, 49.7, 61.2, 72.8, 84.5, 96.2];

const DIG_META = {
  coverage: 'Residents aged 16 and over; all households; national fixed network',
  sourceNote: 'Telecom regulator, e-government portal, household survey',
  exclusions: 'Business connections and mobile-only broadband are out of scope',
  unitNote: 'Shares are percentages; mobile is subscriptions per 100 residents; speed is Mbps',
};

const DIG_MILESTONES = [
  { year: 2016, text: 'Free public wifi reaches every municipal library in Meridia.' },
  { year: 2018, text: 'The e-government portal adds online tax filing for households.' },
  { year: 2020, text: 'Fibre passes half of all homes; remote schooling doubles internet use among teenagers.' },
  { year: 2023, text: 'Every public service that can be done online is available on the portal.' },
];

function digLatest(series) {
  return series[series.length - 1];
}

function digDelta(series) {
  const shift = series[series.length - 1] - series[0];
  return Math.round(shift * 10) / 10;
}

function digFirstYear() {
  return YEARS[0];
}

function digLastYear() {
  return YEARS[YEARS.length - 1];
}

export {
  INTERNET_USE,
  MOBILE_SUBS,
  EGOV_USE,
  BROADBAND_SPEED,
  DIG_META,
  DIG_MILESTONES,
  digLatest,
  digDelta,
  digFirstYear,
  digLastYear,
};
