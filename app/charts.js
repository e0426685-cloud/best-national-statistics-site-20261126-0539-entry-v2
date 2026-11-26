// Small SVG chart helpers, drawn with plain DOM/SVG — no libraries, no network.
// Each function returns an SVG string. All charts are labelled and readable.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 1) => Number(n).toFixed(d);

// Shared palette (colour-blind friendly, works on light cards).
export const PALETTE = ['#1f6f8b', '#2a9d8f', '#e76f51', '#e9c46a', '#5b7fa6', '#8e6fb8', '#c05621', '#4a7c59'];

function axisLabels(values, width, height, pad, format) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = min - span * 0.08;
  const hi = max + span * 0.08;
  return { lo, hi, span: hi - lo };
}

export function lineChart({ labels, values, title, unit = '', color = PALETTE[0], height = 260, format = (v) => fmt(v, 1) }) {
  const W = 640, H = height, padL = 56, padR = 16, padT = 14, padB = 34;
  const { lo, hi, span } = axisLabels(values, W, H, padL, format);
  const x = (i) => padL + (i * (W - padL - padR)) / (labels.length - 1);
  const y = (v) => padT + ((hi - v) / span) * (H - padT - padB);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(lo)} ${pts} ${x(values.length - 1).toFixed(1)},${y(lo)}`;
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gv = lo + span * f;
    return `<line x1="${padL}" y1="${y(gv)}" x2="${W - padR}" y2="${y(gv)}" stroke="#e3e8ee" stroke-width="1"/>
    <text x="${padL - 8}" y="${y(gv) + 4}" text-anchor="end" font-size="11" fill="#5a6b7c">${esc(format(gv))}</text>`;
  }).join('');
  const dots = values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.4" fill="${color}"><title>${esc(labels[i])}: ${esc(format(v))}${unit}</title></circle>`).join('');
  const xlabels = labels.map((l, i) => i % 2 === 0 ? `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#5a6b7c">${esc(l)}</text>` : '').join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" class="chart">
  <title>${esc(title)}</title>
  <polygon points="${area}" fill="${color}" opacity="0.10"/>
  ${grid}
  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  ${dots}
  <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="#c8d2dc" stroke-width="1"/>
  ${xlabels}
</svg>`;
}

export function barChart({ labels, values, title, unit = '', color = PALETTE[0], height = 260, format = (v) => fmt(v, 1) }) {
  const W = 640, H = height, padL = 56, padR = 16, padT = 14, padB = 34;
  const lo = Math.min(0, ...values);
  const hi = Math.max(...values, 0) * 1.12;
  const span = hi - lo || 1;
  const bw = (W - padL - padR) / values.length;
  const y = (v) => padT + ((hi - v) / span) * (H - padT - padB);
  const zeroY = y(0);
  const bars = values.map((v, i) => {
    const bx = padL + i * bw + bw * 0.14;
    const top = Math.min(y(v), zeroY);
    const hgt = Math.abs(zeroY - y(v));
    const labY = v >= 0 ? y(v) - 6 : y(v) + 16;
    return `<rect x="${bx.toFixed(1)}" y="${top.toFixed(1)}" width="${(bw * 0.72).toFixed(1)}" height="${Math.max(hgt, 1).toFixed(1)}" rx="3" fill="${v < 0 ? '#b23a2e' : PALETTE[i % PALETTE.length]}">
    <title>${esc(labels[i])}: ${esc(format(v))}${unit}</title></rect>
    <text x="${(bx + bw * 0.36).toFixed(1)}" y="${labY.toFixed(1)}" text-anchor="middle" font-size="11" fill="#33475b" font-weight="600">${esc(format(v))}</text>`;
  }).join('');
  const xlabels = labels.map((l, i) => `<text x="${(padL + i * bw + bw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#5a6b7c">${esc(l)}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" class="chart">
  <title>${esc(title)}</title>
  <line x1="${padL}" y1="${y(hi * 0.5)}" x2="${W - padR}" y2="${y(hi * 0.5)}" stroke="#e3e8ee" stroke-width="1"/>
  ${bars}
  <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="#c8d2dc" stroke-width="1"/>
  ${xlabels}
</svg>`;
}

export function donutChart({ items, title, height = 260 }) {
  // items: [{label, value, color}]
  const total = items.reduce((s, it) => s + it.value, 0);
  const cx = 130, cy = 130, r = 96, rIn = 62;
  let a0 = -Math.PI / 2;
  const arcs = items.map((it) => {
    const frac = it.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi0 = cx + rIn * Math.cos(a0), yi0 = cy + rIn * Math.sin(a0);
    const xi1 = cx + rIn * Math.cos(a1), yi1 = cy + rIn * Math.sin(a1);
    const d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${rIn} ${rIn} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z`;
    a0 = a1;
    return `<path d="${d}" fill="${it.color}"><title>${esc(it.label)}: ${fmt(it.value, 1)}%</title></path>`;
  }).join('');
  const legend = items.map((it, i) => `<g>
    <rect x="270" y="${34 + i * 34}" width="14" height="14" rx="3" fill="${it.color}"/>
    <text x="292" y="${46 + i * 34}" font-size="13" fill="#22344a">${esc(it.label)}</text>
    <text x="560" y="${46 + i * 34}" font-size="13" fill="#22344a" font-weight="600" text-anchor="end">${fmt(it.value, 1)}%</text>
  </g>`).join('');
  return `<svg viewBox="0 0 580 260" role="img" aria-label="${esc(title)}" class="chart">
  <title>${esc(title)}</title>
  ${arcs}
  <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="#16283c">${fmt(total, 0)}%</text>
  <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#5a6b7c">of total</text>
  ${legend}
</svg>`;
}

// Horizontal bar list used for rankings (wages, employment).
export function hbarList({ items, title, unit = '', format = (v) => fmt(v, 0) }) {
  const max = Math.max(...items.map((it) => it.value));
  const rows = items.map((it, i) => `<div class="hbar-row">
    <span class="hbar-label">${esc(it.label)}</span>
    <span class="hbar-track"><span class="hbar-fill" style="width:${((it.value / max) * 100).toFixed(1)}%;background:${PALETTE[i % PALETTE.length]}"></span></span>
    <span class="hbar-value">${esc(format(it.value))}${unit}</span>
  </div>`).join('');
  return `<div class="hbar-list" role="img" aria-label="${esc(title)}">${rows}</div>`;
}

// Stacked vertical bars: one bar per label, each bar split into segments
// that add up to the bar total. series is [{ label, values, color }], with
// one value per label, in the same order as labels. A legend sits above the
// plot; the total is printed on top of each bar. Negative values are not
// supported — every segment stacks upward from the previous one.
export function stackedBarChart({ labels, series, title, unit = '', height = 280 }) {
  const W = 640, H = height, padL = 52, padR = 14, padT = 38, padB = 34;
  const totals = labels.map((_, i) => series.reduce((sum, sg) => sum + sg.values[i], 0));
  const top = Math.max(...totals) * 1.12;
  const slot = (W - padL - padR) / labels.length;
  const yFor = (v) => padT + ((top - v) / top) * (H - padT - padB);
  const base = yFor(0);
  const gridLines = [0.25, 0.5, 0.75, 1].map((f) => {
    const gv = top * f;
    return `<line x1="${padL}" y1="${yFor(gv)}" x2="${W - padR}" y2="${yFor(gv)}" stroke="#e3e8ee" stroke-width="1"/>
    <text x="${padL - 8}" y="${yFor(gv) + 4}" text-anchor="end" font-size="11" fill="#5a6b7c">${fmt(gv, 0)}</text>`;
  }).join('');
  const bars = labels.map((lab, i) => {
    let running = 0;
    const segments = series.map((sg) => {
      const v = sg.values[i];
      const yTop = yFor(running + v);
      const segH = yFor(running) - yTop;
      running += v;
      return `<rect x="${(padL + i * slot + slot * 0.16).toFixed(1)}" y="${yTop.toFixed(1)}" width="${(slot * 0.68).toFixed(1)}" height="${Math.max(segH, 0.5).toFixed(1)}" fill="${sg.color}">
      <title>${esc(lab)} — ${esc(sg.label)}: ${fmt(v, 1)}${unit}</title></rect>`;
    }).join('');
    const totalLab = `<text x="${(padL + i * slot + slot / 2).toFixed(1)}" y="${(yFor(totals[i]) - 6).toFixed(1)}" text-anchor="middle" font-size="11" fill="#33475b" font-weight="600">${fmt(totals[i], 1)}</text>`;
    const xLab = `<text x="${(padL + i * slot + slot / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#5a6b7c">${esc(lab)}</text>`;
    return `<g>${segments}${totalLab}${xLab}</g>`;
  }).join('');
  const legend = series.map((sg, k) => `<g>
    <rect x="${padL + k * 118}" y="10" width="13" height="13" rx="3" fill="${sg.color}"/>
    <text x="${padL + k * 118 + 19}" y="21" font-size="12" fill="#22344a">${esc(sg.label)}</text>
  </g>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" class="chart">
  <title>${esc(title)}</title>
  ${legend}
  ${gridLines}
  ${bars}
  <line x1="${padL}" y1="${base}" x2="${W - padR}" y2="${base}" stroke="#c8d2dc" stroke-width="1"/>
</svg>`;
}
