# ObjectiveDone · Build Portal (v2 — diagram-first)

A static site: the home page tracks the four products (ObjectiveDone App active,
CRM Mobile / CRM Web / Admin queued with expected start dates), and every app
module has its own page of **real mermaid flowcharts** — user flows,
architecture & backend, and state diagrams — with pan/zoom like the reference
flow sites (drag to pan, Ctrl/⌘+scroll to zoom to cursor, F fit, 0 reset,
pinch on touch). Color legend on every module page; dashed nodes = pending.

## Run
Open `index.html` in a browser (works from file://), or serve the folder.

## Host
Upload the **contents of this folder** anywhere static. All libraries are
vendored in `vendor/` — no CDN needed, works offline.

## Update progress / timeline
Edit `data.js` (percentages, statuses, milestone dates, feature lines) — the
home page renders from it. Module hero numbers are in each module page's HTML.
There is deliberately **no login** on this site.

## Layout
```
index.html            products · overall progress · timeline · module grid
modules/*.html        11 module pages, tabs of diagrams per feature
data.js               progress numbers, milestones, module summaries
assets/site.css/js    theme + page UI
assets/flow.js        mermaid init + per-chart pan/zoom engine
vendor/               mermaid 10.6.1 · svg-pan-zoom · hammer (local copies)
```
Charts are authored as mermaid text inside each page
(`<script type="text/plain" class="chart-src">`) — edit the text, reload, done.
