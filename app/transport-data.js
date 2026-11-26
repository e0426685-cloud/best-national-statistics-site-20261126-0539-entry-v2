// Transport series for Meridia, 2015-2025.
//
// These are the National Statistics Office's own transport indicators,
// compiled from the transit authority, vehicle registrations and the
// travel survey. Every figure below was composed for this page; the
// series are illustrative, in the same spirit as the rest of the site's
// Meridia data. Public-transport use is the share of all commutes made by
// bus or train. Cycling is the share of commutes made by bicycle. The
// electric share is the share of newly registered cars that are fully
// electric. Commute time is the average one-way journey to work or study
// in minutes. The 2020 dip in public-transport use follows the year
// people stayed home; cycling jumped the same year and never fell back.

import { YEARS } from './data.js';

export { YEARS };

const TRANSIT_USE = [31.2, 32.0, 32.8, 33.5, 34.1, 33.0, 34.8, 36.2, 37.5, 38.9, 40.2];
const CYCLING_SHARE = [4.1, 4.4, 4.8, 5.2, 5.6, 6.8, 7.9, 8.6, 9.4, 10.2, 11.0];
const EV_SHARE = [1.2, 1.8, 2.6, 3.9, 5.8, 8.4, 12.1, 17.3, 23.6, 29.8, 35.4];
const COMMUTE_MINUTES = [28.4, 28.1, 27.8, 27.5, 27.2, 26.1, 26.8, 27.0, 26.6, 26.2, 25.8];

const TRANSIT_META = {
  coverage: 'All commutes to work or study; all newly registered cars',
  sourceNote: 'Transit authority, vehicle registrations, travel survey',
  exclusions: 'Freight, long-distance coaches and flights are out of scope',
  unitNote: 'Shares are percentages; commute time is minutes one-way',
};

const TRANSIT_MILESTONES = [
  { year: 2017, text: 'The capital opens its second tram line and bus fares are frozen for three years.' },
  { year: 2020, text: 'Cycling jumps as people avoid crowded buses; the city paints 40 km of new bike lanes.' },
  { year: 2024, text: 'Electric cars pass a third of new registrations as charging points reach every town.' },
];

function transitLatest(series) {
  return series[series.length - 1];
}

function transitDelta(series) {
  const shift = series[series.length - 1] - series[0];
  return Math.round(shift * 10) / 10;
}

function transitFirstYear() {
  return YEARS[0];
}

function transitLastYear() {
  return YEARS[YEARS.length - 1];
}

export {
  TRANSIT_USE,
  CYCLING_SHARE,
  EV_SHARE,
  COMMUTE_MINUTES,
  TRANSIT_META,
  TRANSIT_MILESTONES,
  transitLatest,
  transitDelta,
  transitFirstYear,
  transitLastYear,
};
