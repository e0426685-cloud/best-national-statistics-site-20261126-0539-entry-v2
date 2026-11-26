# Build notes — best-national-statistics-site-20261126-0539

Built 2026-11-25/26 (WIB) in a single session on this VM, fresh from scratch.
No other entry or repo was copied; the starter supplied only the harness
shape (main.ts entrypoint pattern, serve.ts, vendor/makefun-frontend.ts
copied unchanged from the kit) and the recipe-site starter content was not
reused — all site code, data, text and design are original.

## Kit
- Competition: best-national-statistics-site-20261126-0539, "Make the best
  national statistics site", $50 total, 10 places × $5, free entry.
- Entries close 2026-11-29T05:39:00Z. Harness program/v1.
- Kit tarball downloaded via tools/mf_curl.sh (HTTP 200, 8,487,726 bytes).
- kit.json bundle_sha256: fed7501cefd063e9802a36d73fda58183576677bc71160e04e49249999d748b3
  (matches competition.yaml header; the downloaded tarball's own sha256 is
  d749579113b7e5260c4c2c46b08fa57b1cf41d87de2c5e096250c66ab37f5b95 — the
  server re-gzips on download, as with token-radar-01. All 21 files inside
  the kit verified against kit.json sha256: 0 mismatches.)
- vendor/makefun-frontend.ts copied unchanged (sha256 4c8da1c8…).

## Site
- Fictional country "Meridia", National Statistics Office of Meridia.
  All figures are an illustrative 2015–2025 series composed for the site,
  labelled as such in the footer and on the Methodology page.
- Node 22 stdlib only; static files under app/, no build step, no network
  requests (system fonts only, hand-drawn SVG charts).
- 9 hash-routed pages: Overview, Population, Economy, Labour, Health,
  Education, Regions, Releases, Methodology.
- Interactions, all working: year selector (2015–2025) on Overview/
  Population/Economy/Labour; line/bar toggle on Population; sortable +
  searchable regions table; CSV download of yearly indicators; mobile
  menu.
- Screenshots (CDP via Playwright-cached Chromium, real renders):
  1-overview.jpg 86,404 B (1280×800), 2-economy.jpg 71,602 B (1280×800),
  3-regions.jpg 83,444 B (1280×800), 4-overview-phone.jpg 41,236 B
  (390×844). All under the 256 KiB cap; 4 total, within the max of 4.
- Fixes during build: GDP-per-person formatting (8,490.333 → 8,490);
  bar chart now draws negative values below the zero line (2020 GDP
  growth −3.8% in red); phone layout verified at 390px with mobile
  emulation (docW 390, menu button shows, single-column KPIs). Note:
  plain `chrome --screenshot` renders the phone view at a desktop layout
  width — CDP with device metrics override was used instead.

## Repo
- e0426685-cloud/best-national-statistics-site-20261126-0539-entry
  (public, MIT LICENSE, README with make.fun rank/reward badges,
  About + topics set via gh api).
- Entry point main.ts in repo root; serve.ts dev server; shots.json
  describes the four screenshots.

## Checks
- `MAKEFUN_OUTPUT_DIR=out node main.ts` (Node 22.21.1) builds the dossier
  cleanly (see kit-check section below for the `makefun check` result).
- NOT submitted — the parent bundles this session and submits.
- Entry/output files written with plain open() + chmod 644, never mkstemp.
