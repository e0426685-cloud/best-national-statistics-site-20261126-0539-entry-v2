// Page templates for the Meridia statistics site. Every value is escaped
// before it goes into the page. Charts come from charts.js.

import { YEARS, SERIES, AGE_GROUPS_2025, URBAN_RURAL, SECTORS_2025, EMPLOYMENT_2025, WAGES_2025, REGIONS, HEALTH_2025, EDUCATION_2025, RELEASES, COUNTRY } from './data.js';
import { lineChart, barChart, donutChart, hbarList, PALETTE } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const num = (n, d = 1) => Number(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });
const int = (n) => Number(n).toLocaleString('en-GB', { maximumFractionDigits: 0 });
const idx = (y) => YEARS.indexOf(y);

function yearSelect(current) {
  return `<label class="year-pick">Year
  <select id="year-select" aria-label="Choose year">${YEARS.map((y) => `<option value="${y}"${y === current ? ' selected' : ''}>${y}</option>`).join('')}</select>
  </label>`;
}

function kpi(label, value, sub) {
  return `<div class="kpi"><span class="kpi-label">${esc(label)}</span><span class="kpi-value">${value}</span><span class="kpi-sub">${esc(sub)}</span></div>`;
}

function card(title, inner, extra = '') {
  return `<section class="card"${extra}><h2>${esc(title)}</h2>${inner}</section>`;
}

function note(text) {
  return `<p class="note">${esc(text)}</p>`;
}

export function overview(year) {
  const i = idx(year);
  const prev = Math.max(0, i - 1);
  const popChange = (((SERIES.population[i] - SERIES.population[prev]) / SERIES.population[prev]) * 100).toFixed(1);
  return `<h1>Meridia in numbers</h1>
<p class="lede">The official statistics of Meridia — population, economy, work, health and education — published by the National Statistics Office. Figures are updated as each release lands.</p>
<div class="toolbar">${yearSelect(year)}<span class="updated">Latest update: ${esc(COUNTRY.updated)}</span></div>
<div class="kpis">
${kpi('Population', num(SERIES.population[i]) + ' m', `+${popChange}% on ${YEARS[prev]}`)}
${kpi('GDP', 'M$' + num(SERIES.gdp[i], 1) + ' bn', num(SERIES.gdpGrowth[i]) + '% real growth')}
${kpi('Unemployment', num(SERIES.unemployment[i]) + '%', 'of the labour force')}
${kpi('Inflation (CPI)', num(SERIES.inflation[i]) + '%', 'annual rate')}
${kpi('Life expectancy', num(SERIES.lifeExpectancy[i]) + ' yrs', 'at birth')}
${kpi('Median income', 'M$' + int(SERIES.medianIncome[i] * 1000), 'per household, per year')}
</div>
<div class="grid-2">
${card('Population, 2015–' + year, lineChart({ labels: YEARS.slice(0, i + 1), values: SERIES.population.slice(0, i + 1), title: 'Resident population', unit: ' million', color: PALETTE[0], format: (v) => num(v) }))}
${card('Real GDP growth, 2015–' + year, barChart({ labels: YEARS.slice(0, i + 1), values: SERIES.gdpGrowth.slice(0, i + 1), title: 'Real GDP growth', unit: '%', color: PALETTE[1], format: (v) => num(v) }))}
</div>
<div class="grid-2">
${card('GDP by sector, ' + year, donutChart({ items: SECTORS_2025.map((s, k) => ({ label: s.sector, value: s.share, color: PALETTE[k % PALETTE.length] })), title: 'GDP by sector' }))}
${card('Latest releases', `<ul class="releases-mini">${RELEASES.slice(0, 4).map((r) => `<li><span class="rel-date">${esc(r.date)}</span><a href="#/releases">${esc(r.title)}</a><span class="rel-note">${esc(r.note)}</span></li>`).join('')}</ul><p><a href="#/releases">All releases &rarr;</a></p>`)}
</div>
${note('Meridia is a fictional country and these are illustrative figures compiled for demonstration. See Methodology for how the series are built.')}
`;
}

export function population(year) {
  const i = idx(year);
  return `<h1>Population</h1>
<p class="lede">How many people live in Meridia, how old they are, and where they live.</p>
<div class="toolbar">${yearSelect(year)}
<span class="seg" role="group" aria-label="Chart type"><button id="pop-line" class="seg-btn active" type="button">Line</button><button id="pop-bar" class="seg-btn" type="button">Bars</button></span></div>
<div class="kpis">
${kpi('Resident population', num(SERIES.population[i]) + ' m', YEARS[i] + ' estimate')}
${kpi('65 and over', '15.0%', 'of the population, 2025')}
${kpi('Under 15', '17.0%', 'of the population, 2025')}
${kpi('Urban share', '71.4%', 'live in towns and cities')}
</div>
<div class="grid-2">
${card('Population trend, 2015–' + year, `<div id="pop-chart">${lineChart({ labels: YEARS.slice(0, i + 1), values: SERIES.population.slice(0, i + 1), title: 'Resident population', unit: ' million', color: PALETTE[0], format: (v) => num(v) })}</div>`)}
${card('Age structure, 2025', barChart({ labels: AGE_GROUPS_2025.map((a) => a.group), values: AGE_GROUPS_2025.map((a) => a.value), title: 'Population by age group', unit: ' million', format: (v) => num(v) }))}
</div>
<div class="grid-2">
${card('Urban and rural, 2025', donutChart({ items: URBAN_RURAL.map((u, k) => ({ label: u.label, value: u.value, color: PALETTE[k] })), title: 'Urban and rural share' }))}
${card('Life expectancy at birth', lineChart({ labels: YEARS, values: SERIES.lifeExpectancy, title: 'Life expectancy', unit: ' years', color: PALETTE[3], format: (v) => num(v) }))}
</div>
${note('Population estimates are for 30 June each year. Age structure is the 2025 mid-year estimate.')}
`;
}

export function economy(year) {
  const i = idx(year);
  const tradeBalance = SERIES.exports[i] - SERIES.imports[i];
  return `<h1>Economy</h1>
<p class="lede">Output, prices, trade and public debt — the headline economic picture for Meridia.</p>
<div class="toolbar">${yearSelect(year)}<button id="csv-btn" class="btn" type="button">Download yearly data (CSV)</button></div>
<div class="kpis">
${kpi('GDP', 'M$' + num(SERIES.gdp[i], 1) + ' bn', num(SERIES.gdpGrowth[i]) + '% real growth')}
${kpi('GDP per person', 'M$' + int((SERIES.gdp[i] * 1000) / SERIES.population[i]), 'nominal, ' + year)}
${kpi('Inflation', num(SERIES.inflation[i]) + '%', 'consumer prices, annual')}
${kpi('Trade balance', 'M$' + num(tradeBalance, 1) + ' bn', tradeBalance >= 0 ? 'surplus' : 'deficit')}
${kpi('Government debt', num(SERIES.govDebt[i]) + '%', 'of GDP')}
</div>
<div class="grid-2">
${card('Nominal GDP, 2015–' + year, lineChart({ labels: YEARS.slice(0, i + 1), values: SERIES.gdp.slice(0, i + 1), title: 'Nominal GDP', unit: ' bn M$', color: PALETTE[1], format: (v) => num(v, 0) }))}
${card('Inflation, 2015–' + year, lineChart({ labels: YEARS.slice(0, i + 1), values: SERIES.inflation.slice(0, i + 1), title: 'Consumer price inflation', unit: '%', color: PALETTE[2], format: (v) => num(v) }))}
</div>
<div class="grid-2">
${card('Exports and imports, 2015–' + year, barChart({ labels: YEARS.slice(0, i + 1), values: SERIES.exports.slice(0, i + 1), title: 'Exports of goods and services', unit: ' bn M$', color: PALETTE[0], format: (v) => num(v, 0) }))}
${card('GDP by sector, ' + year, donutChart({ items: SECTORS_2025.map((s, k) => ({ label: s.sector, value: s.share, color: PALETTE[k % PALETTE.length] })), title: 'GDP by sector' }))}
</div>
<table class="data-table"><caption>Yearly economic indicators</caption><thead><tr><th>Year</th><th>GDP (bn M$)</th><th>Real growth</th><th>Inflation</th><th>Exports</th><th>Imports</th><th>Govt debt (% GDP)</th></tr></thead>
<tbody>${YEARS.map((y, k) => `<tr${y === year ? ' class="hl"' : ''}><td>${y}</td><td>${num(SERIES.gdp[k], 1)}</td><td>${num(SERIES.gdpGrowth[k])}%</td><td>${num(SERIES.inflation[k])}%</td><td>${num(SERIES.exports[k], 1)}</td><td>${num(SERIES.imports[k], 1)}</td><td>${num(SERIES.govDebt[k])}%</td></tr>`).join('')}</tbody></table>
${note('GDP is nominal unless marked real. Trade covers goods and services. The 2020 fall reflects the pandemic downturn in this illustrative series.')}
`;
}

export function labour(year) {
  const i = idx(year);
  return `<h1>Labour market</h1>
<p class="lede">Who works, where they work, and what they earn.</p>
<div class="toolbar">${yearSelect(year)}</div>
<div class="kpis">
${kpi('Unemployment', num(SERIES.unemployment[i]) + '%', 'of the labour force, ' + year)}
${kpi('Employment', int(EMPLOYMENT_2025.reduce((s, e) => s + e.jobs, 0)) + ' k', 'jobs across sectors, 2025')}
${kpi('Median income', 'M$' + int(SERIES.medianIncome[i] * 1000), 'per household, per year')}
${kpi('Top-paying sector', 'Mining & energy', 'M$5,120 median monthly wage')}
</div>
<div class="grid-2">
${card('Unemployment rate, 2015–' + year, lineChart({ labels: YEARS.slice(0, i + 1), values: SERIES.unemployment.slice(0, i + 1), title: 'Unemployment rate', unit: '%', color: PALETTE[2], format: (v) => num(v) }))}
${card('Median household income, 2015–' + year, lineChart({ labels: YEARS.slice(0, i + 1), values: SERIES.medianIncome.slice(0, i + 1), title: 'Median household income', unit: ' k M$', color: PALETTE[1], format: (v) => num(v) }))}
</div>
<div class="grid-2">
${card('Jobs by sector, 2025 (thousands)', hbarList({ items: [...EMPLOYMENT_2025].sort((a, b) => b.jobs - a.jobs).map((e) => ({ label: e.sector, value: e.jobs })), title: 'Employment by sector', unit: ' k', format: (v) => int(v) }))}
${card('Median monthly wage by sector, 2025 (M$)', hbarList({ items: [...WAGES_2025].sort((a, b) => b.wage - a.wage).map((w) => ({ label: w.sector, value: w.wage })), title: 'Wages by sector', unit: '', format: (v) => int(v) }))}
</div>
${note('Wages are medians for full-time employees. Employment counts are jobs, not people — one person can hold more than one job.')}
`;
}

export function health() {
  const h = HEALTH_2025;
  return `<h1>Health</h1>
<p class="lede">How long people live in Meridia, and the health of the population.</p>
<div class="kpis">
${kpi('Life expectancy', num(h.lifeExpectancy) + ' yrs', 'at birth, 2025')}
${kpi('Infant mortality', num(h.infantMortality) + ' / 1,000', 'live births, 2025')}
${kpi('Hospital beds', num(h.hospitalBeds) + ' / 1,000', 'people, 2025')}
${kpi('Doctors', num(h.doctors) + ' / 1,000', 'people, 2025')}
${kpi('Health spending', num(h.healthSpendGdp) + '%', 'of GDP, 2025')}
${kpi('Adult smoking', num(h.smokingRate) + '%', 'of adults, 2025')}
</div>
<div class="grid-2">
${card('Life expectancy, 2015–2025', lineChart({ labels: YEARS, values: SERIES.lifeExpectancy, title: 'Life expectancy', unit: ' years', color: PALETTE[3], format: (v) => num(v) }))}
${card('In brief, 2025', `<dl class="facts">
<dt>Obesity (adults)</dt><dd>${num(h.obesityRate)}%</dd>
<dt>Smoking (adults)</dt><dd>${num(h.smokingRate)}%</dd>
<dt>Health spending</dt><dd>${num(h.healthSpendGdp)}% of GDP</dd>
<dt>Hospital beds</dt><dd>${num(h.hospitalBeds)} per 1,000 people</dd>
<dt>Doctors</dt><dd>${num(h.doctors)} per 1,000 people</dd>
<dt>Infant mortality</dt><dd>${num(h.infantMortality)} per 1,000 live births</dd>
</dl>`)}
</div>
${note('Life expectancy dipped in 2020 in this illustrative series, then recovered. Health spending covers public and private outlay.')}
`;
}

export function education() {
  const e = EDUCATION_2025;
  return `<h1>Education</h1>
<p class="lede">Schooling, literacy and what Meridia's graduates go on to study.</p>
<div class="kpis">
${kpi('Adult literacy', num(e.literacy) + '%', 'adults, 2025')}
${kpi('Primary enrolment', num(e.primaryEnrolment) + '%', 'of children, 2025')}
${kpi('Secondary enrolment', num(e.secondaryEnrolment) + '%', 'of young people, 2025')}
${kpi('Tertiary enrolment', num(e.tertiaryEnrolment) + '%', 'of young adults, 2025')}
${kpi('STEM graduates', num(e.graduatesStem) + '%', 'of all graduates, 2025')}
${kpi('Schooling', num(e.avgSchoolYears) + ' yrs', 'average years, adults 25+')}
</div>
<div class="grid-2">
${card('Enrolment by stage, 2025', barChart({ labels: ['Primary', 'Secondary', 'Tertiary'], values: [e.primaryEnrolment, e.secondaryEnrolment, e.tertiaryEnrolment], title: 'Enrolment rates', unit: '%', format: (v) => num(v) }))}
${card('In brief, 2025', `<dl class="facts">
<dt>Adult literacy</dt><dd>${num(e.literacy)}%</dd>
<dt>Average schooling</dt><dd>${num(e.avgSchoolYears)} years</dd>
<dt>Pupil–teacher ratio</dt><dd>${num(e.pupilTeacherRatio)} : 1</dd>
<dt>STEM share of graduates</dt><dd>${num(e.graduatesStem)}%</dd>
<dt>Tertiary enrolment</dt><dd>${num(e.tertiaryEnrolment)}%</dd>
</dl>`)}
</div>
${note('Enrolment is the net rate for the age group of each stage. Literacy is self-reported in the household survey.')}
`;
}

export function regions(state) {
  const q = (state.q || '').toLowerCase();
  const key = state.sort || 'population';
  const dir = state.dir === 'asc' ? 1 : -1;
  const rows = REGIONS.filter((r) => !q || r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q))
    .sort((a, b) => (a[key] - b[key]) * dir);
  const th = (label, k) => `<th><button class="sort-btn" type="button" data-sort="${k}">${esc(label)}${key === k ? (dir === 1 ? ' ▲' : ' ▼') : ''}</button></th>`;
  return `<h1>Regions</h1>
<p class="lede">Meridia's twelve regions, compared on population, prosperity and work.</p>
<div class="toolbar"><label class="search">Search regions <input id="region-search" type="search" placeholder="e.g. Alden" value="${esc(state.q || '')}"></label></div>
<table class="data-table"><caption>Regional indicators, 2025 — click a column heading to sort</caption>
<thead><tr>${th('Region', 'name')}${th('Capital', 'capital')}${th('Population (000s)', 'population')}${th('GDP per person (M$)', 'gdpPerCapita')}${th('Unemployment', 'unemployment')}${th('Density (/km²)', 'density')}</tr></thead>
<tbody>${rows.map((r) => `<tr><td><strong>${esc(r.name)}</strong></td><td>${esc(r.capital)}</td><td>${int(r.population)}</td><td>${int(r.gdpPerCapita)}</td><td>${num(r.unemployment)}%</td><td>${int(r.density)}</td></tr>`).join('') || '<tr><td colspan="6">No regions match that search.</td></tr>'}</tbody></table>
${note('Population is the 2025 mid-year estimate. GDP per person is nominal. Density is people per square kilometre.')}
`;
}

export function releases() {
  return `<h1>Statistical releases</h1>
<p class="lede">The latest publications from the National Statistics Office, newest first.</p>
<ul class="releases">${RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span><span class="rel-topic">${esc(r.topic)}</span><strong>${esc(r.title)}</strong><span class="rel-note">${esc(r.note)}</span></li>`).join('')}</ul>
${note('Release dates are illustrative. In a live office, each release would link to its full bulletin and data tables.')}
`;
}

export function methodology() {
  return `<h1>Methodology &amp; about</h1>
<p class="lede">How these figures are put together, and what this site is.</p>
<div class="grid-2">
${card('About this site', `<p>The National Statistics Office of Meridia publishes the country's official statistics: population, the economy, work, health and education. This site brings the headline figures together in one place, with charts and tables you can explore on a desktop or a phone.</p><p>Meridia is a fictional country. Every figure on this site is an illustrative series composed for demonstration — internally consistent across years and regions, but not a measurement of any real place. No real statistical office's brand, text or images are used.</p>`)}
${card('How the series are built', `<ul class="plain">
<li><strong>Population:</strong> mid-year estimates, 30 June each year; age structure from the 2025 estimate.</li>
<li><strong>Economy:</strong> nominal GDP in Meridian dollars; real growth adjusted for consumer prices.</li>
<li><strong>Prices:</strong> consumer price index, annual average change.</li>
<li><strong>Labour:</strong> unemployment as a share of the labour force; wages are medians for full-time employees.</li>
<li><strong>Health &amp; education:</strong> survey and administrative records, 2025 reference year.</li>
<li><strong>Regions:</strong> 2025 estimates for Meridia's twelve regions.</li>
</ul>`)}
</div>
${card('Contact', `<p>National Statistics Office of Meridia<br>1 Census Square, Alden City<br>statistics@meridia.example — <em>illustrative contact details</em></p>`)}
`;
}

export function missing() {
  return `<h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>`;
}
