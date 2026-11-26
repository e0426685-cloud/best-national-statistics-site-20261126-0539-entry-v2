// Environment page: air, waste, water and protected land in Meridia.
//
// The page is built only from the series in environment-data.js and the
// shared chart helpers. Nothing here reuses numbers from the other pages:
// the air-quality index, the recycling rate, the protected-land share and
// the water-use figures are this page's own series, and the waste-stream
// split always adds up to the whole year's household waste.

import { YEARS } from './data.js';
import {
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
} from './environment-data.js';
import { lineChart, barChart, stackedBarChart, PALETTE } from './charts.js';

const escText = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt1dp = (n) => Number(n).toFixed(1);
const fmtWhole = (n) => String(Math.round(n));

function kpiTile(reading, heading, footnote) {
  return `<div class="kpi"><span class="kpi-value">${reading}</span><span class="kpi-label">${escText(heading)}</span><span class="kpi-sub">${escText(footnote)}</span></div>`;
}

function changeWords(series, lowerIsBetter) {
  const shift = envChange(series);
  if (shift === 0) return 'unchanged since ' + envFirstYear();
  const direction = shift < 0 ? 'down' : 'up';
  const good = (shift < 0) === lowerIsBetter ? 'better' : 'worse';
  return `${direction} ${fmt1dp(Math.abs(shift))} since ${envFirstYear()} — ${good}`;
}

function envRows() {
  return YEARS.map((y, i) => `<tr>
    <td>${y}</td><td>${fmtWhole(AIR_QUALITY[i])}</td>
    <td>${fmt1dp(RECYCLING_RATE[i])}%</td><td>${fmt1dp(PROTECTED_LAND[i])}%</td>
    <td>${fmtWhole(WATER_USE[i])} L</td></tr>`).join('');
}

function envFooter() {
  return `<tr>
    <td>Change ${envFirstYear()}–${envLastYear()}</td><td>${envChange(AIR_QUALITY)}</td>
    <td>${fmt1dp(envChange(RECYCLING_RATE))} pts</td><td>${fmt1dp(envChange(PROTECTED_LAND))} pts</td>
    <td>${envChange(WATER_USE)} L</td></tr>`;
}

function wasteBreakdown() {
  const streams = [
    { key: 'recycled', label: 'Recycled', color: PALETTE[1] },
    { key: 'composted', label: 'Composted', color: PALETTE[2] },
    { key: 'landfill', label: 'Landfill', color: PALETTE[4] },
  ];
  return streams.map((s) => ({
    label: s.label,
    values: WASTE_STREAMS.map((row) => row[s.key]),
    color: s.color,
  }));
}

export function environment() {
  const first = envFirstYear();
  const last = envLastYear();
  const aqi = envLatest(AIR_QUALITY);
  const recycling = envLatest(RECYCLING_RATE);
  const protectedLand = envLatest(PROTECTED_LAND);
  return `<h1>Environment</h1>
<p class="lede">Meridia's air, waste, water and protected land, ${first}–${last}. The air is getting cleaner, recycling has more than doubled, and nearly a fifth of the country is now protected.</p>
<div class="kpis">
${kpiTile(fmtWhole(aqi), 'Air-quality index, ' + last, changeWords(AIR_QUALITY, true))}
${kpiTile(fmt1dp(recycling) + '%', 'Household waste recycled, ' + last, changeWords(RECYCLING_RATE, false))}
${kpiTile(fmt1dp(protectedLand) + '%', 'Land protected, ' + last, changeWords(PROTECTED_LAND, false))}
${kpiTile(fmtWhole(envLatest(WATER_USE)) + ' L', 'Water use per person per day, ' + last, changeWords(WATER_USE, true))}
</div>
<table class="data-table"><caption>Environmental indicators by year</caption>
<thead><tr><th>Year</th><th>Air-quality index</th><th>Recycling rate</th><th>Protected land</th><th>Water use</th></tr></thead>
<tbody>${envRows()}</tbody>
<tfoot>${envFooter()}</tfoot></table>
<div class="grid-2">
<section class="card"><h2>Air-quality index, ${first}–${last}</h2>${lineChart({ labels: YEARS, values: AIR_QUALITY, title: 'Annual mean air-quality index', unit: '', color: PALETTE[0], format: (v) => fmtWhole(v) })}</section>
<section class="card"><h2>Household recycling rate, ${first}–${last}</h2>${barChart({ labels: YEARS, values: RECYCLING_RATE, title: 'Share of household waste recycled', unit: '%', color: PALETTE[1], format: (v) => fmt1dp(v) })}</section>
</div>
<div class="grid-2">
<section class="card"><h2>Where household waste goes, ${first}–${last}</h2>${stackedBarChart({ labels: YEARS, series: wasteBreakdown(), title: 'Household waste by destination', unit: '%' })}</section>
<section class="card"><h2>Water use per person, ${first}–${last}</h2>${barChart({ labels: YEARS, values: WATER_USE, title: 'Household water supplied per person per day', unit: ' L', color: PALETTE[3], format: (v) => fmtWhole(v) })}</section>
</div>
<p class="note">Coverage: ${escText(ENV_META.coverage)}. Sources: ${escText(ENV_META.sourceNote)}. ${escText(ENV_META.exclusions)}. ${escText(ENV_META.unitNote)}. See Methodology for how the series are built.</p>
`;
}
