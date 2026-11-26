// Environment series for Meridia, 2015-2025.
//
// These are the National Statistics Office's own environmental indicators,
// compiled from the municipal monitoring network, waste operators and the
// land registry. Every figure below was composed for this page; the series
// are illustrative, in the same spirit as the rest of the site's Meridia
// data. Air quality is the annual mean index across the six city monitors
// (lower means cleaner air). Recycling is the share of household waste
// collected for recycling. Protected land is the share of Meridia's land
// area inside a national park, reserve or protected landscape. Water use
// is average household water supplied per person per day. Waste streams
// split each year's household waste into three destinations that always
// add up to the whole: recycled, composted, and sent to landfill.

import { YEARS } from './data.js';

export { YEARS };

const AIR_QUALITY = [68, 66, 63, 61, 58, 55, 52, 49, 46, 44, 41];
const RECYCLING_RATE = [18.2, 20.1, 22.8, 25.4, 28.0, 31.2, 34.6, 37.9, 41.0, 44.1, 46.8];
const PROTECTED_LAND = [11.4, 11.8, 12.3, 12.9, 13.6, 14.2, 15.0, 15.8, 16.5, 17.2, 17.9];
const WATER_USE = [182, 178, 174, 169, 164, 159, 154, 150, 146, 143, 141];

const WASTE_STREAMS = [
  { recycled: 18, composted: 6, landfill: 76 },
  { recycled: 20, composted: 7, landfill: 73 },
  { recycled: 23, composted: 8, landfill: 69 },
  { recycled: 25, composted: 10, landfill: 65 },
  { recycled: 28, composted: 11, landfill: 61 },
  { recycled: 31, composted: 13, landfill: 56 },
  { recycled: 35, composted: 14, landfill: 51 },
  { recycled: 38, composted: 16, landfill: 46 },
  { recycled: 41, composted: 18, landfill: 41 },
  { recycled: 44, composted: 19, landfill: 37 },
  { recycled: 47, composted: 21, landfill: 32 },
];

const ENV_META = {
  coverage: 'Six city air monitors, all municipalities, whole territory',
  sourceNote: 'Municipal monitoring network, waste operators, land registry',
  exclusions: 'Industrial waste and agricultural water use are out of scope',
  unitNote: 'Air quality is an index (lower is cleaner); the rest are shares or litres',
};

function envLatest(series) {
  return series[series.length - 1];
}

function envChange(series) {
  const shift = series[series.length - 1] - series[0];
  return Math.round(shift * 10) / 10;
}

function envFirstYear() {
  return YEARS[0];
}

function envLastYear() {
  return YEARS[YEARS.length - 1];
}

export {
  AIR_QUALITY,
  RECYCLING_RATE,
  PROTECTED_LAND,
  WATER_USE,
  WASTE_STREAMS,
  ENV_META,
  envLatest,
  envChange,
  envFirstYear,
  envLastYear,
};
