// Compare Meridia with four fictional peer countries.
//
// All peer figures are illustrative values composed for this page. Meridia's
// own figures are read from the site's headline series and the new renewable
// series, so this page can never disagree with the rest of the site. The
// peers are invented neighbours of a similar size and income level; none of
// them is a real country.

import { YEARS, SERIES, RENEWABLE_SHARE, RENEWABLE_MIX } from './data.js';
import { barChart, stackedBarChart, PALETTE } from './charts.js';

const escHtml = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmtNum = (n, d = 1) => Number(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => Number(n).toLocaleString('en-GB', { maximumFractionDigits: 0 });

// Four fictional peers, 2025 estimates. Each sits in the same plausible band
// as Meridia so the comparison is a close contest rather than a blowout:
// Tarnovia is the richest and longest-lived, Solmere the smallest.
const PEERS = [
  { name: 'Caldonia', population: 31.4, gdpPerCapita: 9820, lifeExpectancy: 80.6, renewable: 52.3 },
  { name: 'Vostria', population: 62.7, gdpPerCapita: 7410, lifeExpectancy: 77.8, renewable: 38.9 },
  { name: 'Tarnovia', population: 18.9, gdpPerCapita: 11240, lifeExpectancy: 81.2, renewable: 61.5 },
  { name: 'Solmere', population: 9.6, gdpPerCapita: 6580, lifeExpectancy: 76.4, renewable: 29.7 },
];

function meridiaRow() {
  const i = YEARS.indexOf(2025);
  return {
    name: 'Meridia',
    population: SERIES.population[i],
    gdpPerCapita: Math.round((SERIES.gdp[i] * 1000) / SERIES.population[i]),
    lifeExpectancy: SERIES.lifeExpectancy[i],
    renewable: RENEWABLE_SHARE[i],
  };
}

function rankOf(rows, key, value) {
  const ordered = [...rows].map((r) => r[key]).sort((a, b) => b - a);
  return ordered.indexOf(value) + 1;
}

function rankWord(n) {
  return ['first', 'second', 'third', 'fourth', 'fifth'][n - 1] || `${n}th`;
}

function statCard(label, value, sub) {
  return `<div class="kpi"><span class="kpi-label">${escHtml(label)}</span><span class="kpi-value">${value}</span><span class="kpi-sub">${escHtml(sub)}</span></div>`;
}

function peerTable(rows) {
  const body = rows.map((r) => `<tr${r.name === 'Meridia' ? ' class="hl"' : ''}>
    <td>${escHtml(r.name)}</td><td>${fmtNum(r.population)} m</td>
    <td>M$${fmtInt(r.gdpPerCapita)}</td><td>${fmtNum(r.lifeExpectancy)} yrs</td>
    <td>${fmtNum(r.renewable)}%</td></tr>`).join('');
  return `<table class="data-table"><caption>Peer countries, 2025</caption>
<thead><tr><th>Country</th><th>Population</th><th>GDP per person</th><th>Life expectancy</th><th>Renewable share of electricity</th></tr></thead>
<tbody>${body}</tbody></table>`;
}

function mixSeries() {
  const bySource = (key) => RENEWABLE_MIX.map((row) => row[key]);
  return [
    { label: 'Hydro', values: bySource('hydro'), color: PALETTE[0] },
    { label: 'Wind', values: bySource('wind'), color: PALETTE[1] },
    { label: 'Solar', values: bySource('solar'), color: PALETTE[3] },
    { label: 'Other renewables', values: bySource('other'), color: PALETTE[5] },
  ];
}

export function compare() {
  const rows = [meridiaRow(), ...PEERS].sort((a, b) => b.population - a.population);
  const mine = rows.find((r) => r.name === 'Meridia');
  const gdpRank = rankOf(rows, 'gdpPerCapita', mine.gdpPerCapita);
  const lifeRank = rankOf(rows, 'lifeExpectancy', mine.lifeExpectancy);
  const renewRank = rankOf(rows, 'renewable', mine.renewable);
  const firstYear = YEARS[0];
  const lastYear = YEARS[YEARS.length - 1];
  return `<h1>Compare countries</h1>
<p class="lede">Meridia next to four fictional peers of a similar size — population, income, health and clean electricity, all for 2025.</p>
<div class="kpis">
${statCard('Meridia GDP per person', 'M$' + fmtInt(mine.gdpPerCapita), rankWord(gdpRank) + ' of five peers')}
${statCard('Meridia life expectancy', fmtNum(mine.lifeExpectancy) + ' yrs', rankWord(lifeRank) + ' of five peers')}
${statCard('Meridia renewable share', fmtNum(mine.renewable) + '%', rankWord(renewRank) + ' of five peers')}
${statCard('Largest peer', 'Vostria', fmtNum(62.7) + ' m people')}
</div>
${peerTable(rows)}
<div class="grid-2">
<section class="card"><h2>GDP per person, 2025</h2>${barChart({ labels: rows.map((r) => r.name), values: rows.map((r) => r.gdpPerCapita), title: 'GDP per person by country', unit: ' M$', format: (v) => fmtInt(v) })}</section>
<section class="card"><h2>Renewable electricity mix, Meridia ${firstYear}–${lastYear}</h2>${stackedBarChart({ labels: YEARS, series: mixSeries(), title: 'Renewable electricity by source', unit: '%' })}</section>
</div>
<p class="note">Peer figures are illustrative values composed for this comparison; Meridia's figures come from the site's own series. Renewable share is the share of total electricity generation from renewable sources. See Methodology for how the series are built.</p>
`;
}
