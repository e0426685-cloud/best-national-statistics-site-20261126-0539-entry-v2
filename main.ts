// Post-opening revision note.
// Three new sections were added after the competition opened: Environment
// (air quality, recycling, protected land, water use and waste streams),
// Digital (internet use, mobile subscriptions, e-government use and
// broadband speed) and Transport (public transport, cycling, electric
// cars and average commutes). Each new section is a pair of files — a data
// module holding its own invented series and a view module that renders
// it — wired into the router in app/main.js. Nothing else in this
// entrypoint changed: it still copies app/ and screenshots/ to the output
// directory and writes dossier.json exactly as the scorer expects.
// Entry point for the Meridia national statistics site (Node 22, standard
// library only). The site is the static files in app/ beside this file: a
// browser opens app/index.html directly, and nothing it runs, styles or
// shows loads over the network. This program hands it in: it copies app/
// and screenshots/ to the output directory and writes dossier.json, the
// summary the judge reads, using the vendored make.fun library. Leave
// vendor/makefun-frontend.ts as it is: the scorer requires dossier.json to
// be byte for byte what its own copy writes.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files: app/ counts beside /output's own 1000-entry
// cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
