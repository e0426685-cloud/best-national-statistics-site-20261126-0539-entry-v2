// Transport page: public transport, cycling, electric cars and commutes.
//
// The page is built only from the series in transport-data.js and the
// shared chart helpers. Nothing here reuses numbers from the other pages:
// public-transport use, the cycling share, the electric-car share and the
// average commute are this page's own series, and the milestones are short
// notes on how travel in Meridia changed, written for this page.

import { YEARS } from './data.js';
import {
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
} from './transport-data.js';
import { lineChart, barChart, PALETTE } from './charts.js';

const escText = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt1dp = (n) => Number(n).toFixed(1);
const fmtWhole = (n) => String(Math.round(n));

function moveTile(reading, heading, footnote) {
  return `<div class="kpi"><span class="kpi-value">${reading}</span><span class="kpi-label">${escText(heading)}</span><span class="kpi-sub">${escText(footnote)}</span></div>`;
}

function moveSince(series, unit) {
  const shift = transitDelta(series);
  if (shift === 0) return 'unchanged since ' + transitFirstYear();
  const direction = shift < 0 ? 'down' : 'up';
  return `${direction} ${fmt1dp(Math.abs(shift))} ${unit} since ${transitFirstYear()}`;
}

function moveRows() {
  return YEARS.map((y, i) => `<tr>
    <td>${y}</td><td>${fmt1dp(TRANSIT_USE[i])}%</td>
    <td>${fmt1dp(CYCLING_SHARE[i])}%</td><td>${fmt1dp(EV_SHARE[i])}%</td>
    <td>${fmt1dp(COMMUTE_MINUTES[i])} min</td></tr>`).join('');
}

function moveFooter() {
  return `<tr>
    <td>Change ${transitFirstYear()}–${transitLastYear()}</td><td>${fmt1dp(transitDelta(TRANSIT_USE))} pts</td>
    <td>${fmt1dp(transitDelta(CYCLING_SHARE))} pts</td><td>${fmt1dp(transitDelta(EV_SHARE))} pts</td>
    <td>${fmt1dp(transitDelta(COMMUTE_MINUTES))} min</td></tr>`;
}

function moveMilestones() {
  return TRANSIT_MILESTONES.map((m) => `<li><strong>${m.year}.</strong> ${escText(m.text)}</li>`).join('');
}

export function transport() {
  const first = transitFirstYear();
  const last = transitLastYear();
  const transit = transitLatest(TRANSIT_USE);
  const cycling = transitLatest(CYCLING_SHARE);
  const evs = transitLatest(EV_SHARE);
  return `<h1>Transport</h1>
<p class="lede">How Meridia moves, ${first}–${last}. Two in five commutes are now by bus or train, cycling has nearly tripled, more than a third of new cars are electric, and the average commute is shorter than it was in ${first}.</p>
<div class="kpis">
${moveTile(fmt1dp(transit) + '%', 'Commutes by public transport, ' + last, moveSince(TRANSIT_USE, 'pts'))}
${moveTile(fmt1dp(cycling) + '%', 'Commutes by bicycle, ' + last, moveSince(CYCLING_SHARE, 'pts'))}
${moveTile(fmt1dp(evs) + '%', 'New cars that are electric, ' + last, moveSince(EV_SHARE, 'pts'))}
${moveTile(fmt1dp(transitLatest(COMMUTE_MINUTES)) + ' min', 'Average commute, ' + last, moveSince(COMMUTE_MINUTES, 'min'))}
</div>
<table class="data-table"><caption>Transport indicators by year</caption>
<thead><tr><th>Year</th><th>Public transport</th><th>Cycling</th><th>Electric new cars</th><th>Average commute</th></tr></thead>
<tbody>${moveRows()}</tbody>
<tfoot>${moveFooter()}</tfoot></table>
<div class="grid-2">
<section class="card"><h2>Public-transport use, ${first}–${last}</h2>${lineChart({ labels: YEARS, values: TRANSIT_USE, title: 'Share of commutes by bus or train', unit: '%', color: PALETTE[0], format: (v) => fmt1dp(v) })}</section>
<section class="card"><h2>Electric share of new cars, ${first}–${last}</h2>${barChart({ labels: YEARS, values: EV_SHARE, title: 'Share of newly registered cars that are electric', unit: '%', color: PALETTE[4], format: (v) => fmt1dp(v) })}</section>
</div>
<div class="grid-2">
<section class="card"><h2>Cycling share of commutes, ${first}–${last}</h2>${barChart({ labels: YEARS, values: CYCLING_SHARE, title: 'Share of commutes by bicycle', unit: '%', color: PALETTE[1], format: (v) => fmt1dp(v) })}</section>
<section class="card"><h2>How travel changed</h2><ul>${moveMilestones()}</ul></section>
</div>
<p class="note">Coverage: ${escText(TRANSIT_META.coverage)}. Sources: ${escText(TRANSIT_META.sourceNote)}. ${escText(TRANSIT_META.exclusions)}. ${escText(TRANSIT_META.unitNote)}. See Methodology for how the series are built.</p>
`;
}
