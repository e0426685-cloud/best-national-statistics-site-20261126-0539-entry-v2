// Router and interactions for the Meridia statistics site.
//
//   #/                overview dashboard
//   #/population      population and age structure
//   #/economy         output, prices, trade, debt
//   #/labour          jobs and wages
//   #/health          health indicators
//   #/education       schooling and literacy
//   #/regions         sortable, searchable regional table
//   #/compare         Meridia against fictional peer countries
//   #/environment      air, waste, water and protected land
//   #/digital          internet, mobile, e-government and broadband
//   #/transport        public transport, cycling, electric cars and commutes
//   #/releases        latest statistical releases
//   #/methodology     about the figures
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { YEARS, SERIES } from './data.js';
import { overview, population, economy, labour, health, education, regions, releases, methodology, missing } from './views.js';
import { compare } from './compare.js';
import { environment } from './environment.js';
import { digital } from './digital.js';
import { transport } from './transport.js';
import { lineChart, barChart, PALETTE } from './charts.js';

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');

let year = 2025;
let regionState = { q: '', sort: 'population', dir: 'desc' };
let popChart = 'line';

const ROUTES = [
  { hash: '#/', label: 'Overview' },
  { hash: '#/population', label: 'Population' },
  { hash: '#/economy', label: 'Economy' },
  { hash: '#/labour', label: 'Labour' },
  { hash: '#/health', label: 'Health' },
  { hash: '#/education', label: 'Education' },
  { hash: '#/regions', label: 'Regions' },
  { hash: '#/compare', label: 'Compare' },
  { hash: '#/environment', label: 'Environment' },
  { hash: '#/digital', label: 'Digital' },
  { hash: '#/transport', label: 'Transport' },
  { hash: '#/releases', label: 'Releases' },
  { hash: '#/methodology', label: 'Methodology' },
];

nav.innerHTML = ROUTES.map((r) => `<a href="${r.hash}" data-route="${r.hash}">${r.label}</a>`).join('');

function setActive(route) {
  nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.dataset.route === route));
}

function bindYearSelect() {
  const sel = document.getElementById('year-select');
  if (sel) sel.addEventListener('change', () => { year = Number(sel.value); render(); });
}

function downloadCsv() {
  const head = 'year,population_m,gdp_bn_m$,gdp_growth_pct,inflation_pct,unemployment_pct,life_expectancy_yrs,median_income_k_m$,exports_bn_m$,imports_bn_m$,gov_debt_pct_gdp';
  const rows = YEARS.map((y, i) => [y, SERIES.population[i], SERIES.gdp[i], SERIES.gdpGrowth[i], SERIES.inflation[i], SERIES.unemployment[i], SERIES.lifeExpectancy[i], SERIES.medianIncome[i], SERIES.exports[i], SERIES.imports[i], SERIES.govDebt[i]].join(','));
  const blob = new Blob([[head, ...rows].join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'meridia-yearly-indicators.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function bindPopulation() {
  const lineBtn = document.getElementById('pop-line');
  const barBtn = document.getElementById('pop-bar');
  if (!lineBtn || !barBtn) return;
  const redraw = () => {
    const i = YEARS.indexOf(year);
    const holder = document.getElementById('pop-chart');
    if (!holder) return;
    const args = { labels: YEARS.slice(0, i + 1), values: SERIES.population.slice(0, i + 1), title: 'Resident population', unit: ' million', color: PALETTE[0], format: (v) => Number(v).toFixed(1) };
    holder.innerHTML = popChart === 'line' ? lineChart(args) : barChart(args);
    lineBtn.classList.toggle('active', popChart === 'line');
    barBtn.classList.toggle('active', popChart === 'bar');
  };
  lineBtn.addEventListener('click', () => { popChart = 'line'; redraw(); });
  barBtn.addEventListener('click', () => { popChart = 'bar'; redraw(); });
}

function bindRegions() {
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => { regionState.q = search.value; renderRegionsOnly(); });
  }
  document.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.sort;
      if (regionState.sort === k) regionState.dir = regionState.dir === 'asc' ? 'desc' : 'asc';
      else { regionState.sort = k; regionState.dir = k === 'name' || k === 'capital' ? 'asc' : 'desc'; }
      render();
    });
  });
}

function renderRegionsOnly() {
  // Re-render just the table body area by re-rendering the page but keeping focus.
  const pos = document.getElementById('region-search').selectionStart;
  render();
  const search = document.getElementById('region-search');
  if (search) { search.focus(); search.setSelectionRange(pos, pos); }
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const route = hash.replace(/^#/, '') || '/';
  let html;
  let title;
  if (route === '/') { html = overview(year); title = 'Meridia in numbers'; }
  else if (route === '/population') { html = population(year); title = 'Population'; }
  else if (route === '/economy') { html = economy(year); title = 'Economy'; }
  else if (route === '/labour') { html = labour(year); title = 'Labour market'; }
  else if (route === '/health') { html = health(); title = 'Health'; }
  else if (route === '/education') { html = education(); title = 'Education'; }
  else if (route === '/regions') { html = regions(regionState); title = 'Regions'; }
  else if (route === '/compare') { html = compare(); title = 'Compare countries'; }
  else if (route === '/environment') { html = environment(); title = 'Environment'; }
  else if (route === '/digital') { html = digital(); title = 'Digital'; }
  else if (route === '/transport') { html = transport(); title = 'Transport'; }
  else if (route === '/releases') { html = releases(); title = 'Releases'; }
  else if (route === '/methodology') { html = methodology(); title = 'Methodology'; }
  else { html = missing(); title = 'Not found'; }
  document.title = `${title} | National Statistics Office of Meridia`;
  app.innerHTML = html;
  setActive('#' + route);
  bindYearSelect();
  bindPopulation();
  bindRegions();
  const csvBtn = document.getElementById('csv-btn');
  if (csvBtn) csvBtn.addEventListener('click', downloadCsv);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);
render();
