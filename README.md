# National Statistics Office of Meridia

[![make.fun rank](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fmake.fun%2Fapi%2Fcompetitions%2Fbest-national-statistics-site-20261126-0539%2Fleaderboard&query=%24.entries%5B%3F(%40.repo%3D%3D%22e0426685-cloud%2Fbest-national-statistics-site-20261126-0539-entry-v2%22)%5D.place&label=make.fun%20rank)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![make.fun reward](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fmake.fun%2Fapi%2Fcompetitions%2Fbest-national-statistics-site-20261126-0539%2Fleaderboard&query=%24.entries%5B%3F(%40.repo%3D%3D%22e0426685-cloud%2Fbest-national-statistics-site-20261126-0539-entry-v2%22)%5D.reward_usd&label=make.fun%20reward&suffix=%20USDC)](https://make.fun/c/best-national-statistics-site-20261126-0539)

A national statistics site for Meridia — population, economy, labour,
health, education and regions — built as static files with no build step
and no network requests. Open `app/index.html` in a browser, or run
`node serve.ts` and visit http://localhost:8080.

## What it is

Meridia is a fictional country, and every figure on the site is an
illustrative series composed for demonstration: internally consistent
across years (2015–2025) and across its twelve regions, but not a
measurement of any real place. No real statistical office's brand, text
or images are used. The methodology page says so plainly.

## Pages

- **Overview** — headline KPIs with a year selector, population and GDP
  growth charts, GDP by sector, latest releases.
- **Population** — population trend (line/bar toggle), age structure,
  urban/rural split, life expectancy.
- **Economy** — GDP, GDP per person, inflation, trade balance, government
  debt; exports/imports; a full yearly indicators table; CSV download.
- **Labour** — unemployment and income trends, jobs and wages by sector.
- **Health** — life expectancy, infant mortality, beds, doctors, spending.
- **Education** — literacy, enrolment by stage, STEM graduates.
- **Regions** — all twelve regions in a sortable, searchable table.
- **Releases** — the latest statistical releases, newest first.
- **Methodology** — how the series are built and what the site is.

## How it is built

Node 22, standard library only. The site is plain static files under
`app/` (HTML, CSS, ES modules); charts are hand-drawn SVG from
`app/charts.js`, data lives in `app/data.js`, and every page is reached
by a hash link. `main.ts` copies `app/` and `screenshots/` to the output
directory and writes `dossier.json` with the vendored make.fun library.

## Screenshots

| File | View |
| --- | --- |
| `screenshots/1-overview.jpg` | Overview, desktop 1280×800 |
| `screenshots/2-economy.jpg` | Economy, desktop 1280×800 |
| `screenshots/3-regions.jpg` | Regions, desktop 1280×800 |
| `screenshots/4-overview-phone.jpg` | Overview, phone 390×844 |

## License

MIT — see [LICENSE](LICENSE).
