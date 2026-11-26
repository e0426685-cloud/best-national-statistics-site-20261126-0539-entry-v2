// Digital page: internet, mobile, e-government and broadband in Meridia.
//
// The page is built only from the series in digital-data.js and the shared
// chart helpers. Nothing here reuses numbers from the other pages: internet
// use, mobile subscriptions, e-government use and broadband speed are this
// page's own series, and the milestones are short notes on how the country
// got connected, written for this page.

import { YEARS } from './data.js';
import {
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
} from './digital-data.js';
import { lineChart, barChart, PALETTE } from './charts.js';

const escText = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt1dp = (n) => Number(n).toFixed(1);
const fmtWhole = (n) => String(Math.round(n));

function digTile(heading, reading, footnote) {
  return `<div class="kpi"><span class="kpi-label">${escText(heading)}</span><span class="kpi-value">${reading}</span><span class="kpi-sub">${escText(footnote)}</span></div>`;
}

function sinceText(series) {
  const shift = digDelta(series);
  if (shift === 0) return 'unchanged since ' + digFirstYear();
  const direction = shift < 0 ? 'down' : 'up';
  return `${direction} ${fmt1dp(Math.abs(shift))} points since ${digFirstYear()}`;
}

function digRows() {
  return YEARS.map((y, i) => `<tr>
    <td>${y}</td><td>${fmt1dp(INTERNET_USE[i])}%</td>
    <td>${fmtWhole(MOBILE_SUBS[i])}</td><td>${fmt1dp(EGOV_USE[i])}%</td>
    <td>${fmt1dp(BROADBAND_SPEED[i])} Mbps</td></tr>`).join('');
}

function digFooter() {
  return `<tr>
    <td>Change ${digFirstYear()}–${digLastYear()}</td><td>${fmt1dp(digDelta(INTERNET_USE))} pts</td>
    <td>${digDelta(MOBILE_SUBS)}</td><td>${fmt1dp(digDelta(EGOV_USE))} pts</td>
    <td>${fmt1dp(digDelta(BROADBAND_SPEED))} Mbps</td></tr>`;
}

function milestoneList() {
  return DIG_MILESTONES.map((m) => `<li><strong>${m.year}.</strong> ${escText(m.text)}</li>`).join('');
}

export function digital() {
  const first = digFirstYear();
  const last = digLastYear();
  const internet = digLatest(INTERNET_USE);
  const mobile = digLatest(MOBILE_SUBS);
  const speed = digLatest(BROADBAND_SPEED);
  return `<h1>Digital</h1>
<p class="lede">How Meridia got connected, ${first}–${last}. Nine in ten residents are now online, there are more mobile subscriptions than people, and the average home connection is eleven times faster than it was in ${first}.</p>
<div class="kpis">
${digTile('Internet use, ' + last, fmt1dp(internet) + '%', sinceText(INTERNET_USE))}
${digTile('Mobile subscriptions per 100 people, ' + last, fmtWhole(mobile), sinceText(MOBILE_SUBS))}
${digTile('Average broadband speed, ' + last, fmt1dp(speed) + ' Mbps', sinceText(BROADBAND_SPEED))}
${digTile('E-government use, ' + last, fmt1dp(digLatest(EGOV_USE)) + '%', sinceText(EGOV_USE))}
</div>
<table class="data-table"><caption>Digital indicators by year</caption>
<thead><tr><th>Year</th><th>Internet use</th><th>Mobile subscriptions</th><th>E-government use</th><th>Broadband speed</th></tr></thead>
<tbody>${digRows()}</tbody>
<tfoot>${digFooter()}</tfoot></table>
<div class="grid-2">
<section class="card"><h2>Internet use, ${first}–${last}</h2>${lineChart({ labels: YEARS, values: INTERNET_USE, title: 'Share of residents using the internet', unit: '%', color: PALETTE[2], format: (v) => fmt1dp(v) })}</section>
<section class="card"><h2>Average broadband speed, ${first}–${last}</h2>${barChart({ labels: YEARS, values: BROADBAND_SPEED, title: 'Average fixed broadband download speed', unit: ' Mbps', color: PALETTE[3], format: (v) => fmt1dp(v) })}</section>
</div>
<div class="grid-2">
<section class="card"><h2>E-government use, ${first}–${last}</h2>${barChart({ labels: YEARS, values: EGOV_USE, title: 'Share of residents using a public service online', unit: '%', color: PALETTE[5], format: (v) => fmt1dp(v) })}</section>
<section class="card"><h2>How the country got connected</h2><ul>${milestoneList()}</ul></section>
</div>
<p class="note">Coverage: ${escText(DIG_META.coverage)}. Sources: ${escText(DIG_META.sourceNote)}. ${escText(DIG_META.exclusions)}. ${escText(DIG_META.unitNote)}. See Methodology for how the series are built.</p>
`;
}
