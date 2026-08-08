# ObjectiveDone · Build Portal (v2 — diagram-first)

A static site. The home page tracks **four products**: Connect (v1 shipped), the
CRM mobile app and the admin console (both built, and each with its own progress,
timeline and module cards), and the web CRM (not started, with its start date and
the list of what it will contain). Every **Connect** module additionally has its
own page of **real mermaid flowcharts** — user flows, architecture & backend, and
state diagrams — with pan/zoom like the reference flow sites (drag to pan,
Ctrl/⌘+scroll to zoom to cursor, F fit, 0 reset, pinch on touch). Color legend on
every module page; dashed nodes = pending. The CRM and the console have no diagram
pages yet, so their cards do not pretend to link anywhere.

## Run
Open `index.html` in a browser (works from file://), or serve the folder.

## Host
Upload the **contents of this folder** anywhere static. All libraries are
vendored in `vendor/` — no CDN needed, works offline.

## Update progress / timeline
**Never hand-edit `data.js`.** It is generated:

```bash
node build-data.mjs          # regenerate from ../docs/website-status.md
node build-data.mjs --check  # verify only; non-zero exit if the two have drifted
```

Everything numeric lives in [`../docs/website-status.md`](../docs/website-status.md)
— §1–§7 Connect, §8 the four products, §9–§13 the CRM app, the console and the web
CRM. Long prose (module blurbs, milestone notes, product taglines) lives in
`build-data.mjs`, because prose is not what drifts. The generator refuses to write
a file whose arithmetic does not hold: Connect's headline must equal its weighted
aspect blend, each Connect module must sit within ±3 of its own three aspects, and
every other product's headline must be the plain mean of its own table.

Module and product hero numbers all render from `data.js`, including each module
page's progress box — they used to be typed into the HTML and had drifted by more
than fifty points in one place. There is deliberately **no login** on this site.

## Layout
```
index.html            product tabs · per-product progress, timeline & modules
modules/*.html        12 Connect module pages, tabs of diagrams per feature
remaining.html        Connect's open items, grouped by the track each one blocks
pricing/*.html        plans, unit costs, AI architecture
data.js               GENERATED — every number on the site
build-data.mjs        the generator + every arithmetic guard
assets/site.css/js    theme + page UI + the home page's renderers
assets/flow.js        mermaid init + per-chart pan/zoom engine
vendor/               mermaid 10.6.1 · svg-pan-zoom · hammer (local copies)
```
Charts are authored as mermaid text inside each page
(`<script type="text/plain" class="chart-src">`) — edit the text, reload, done.
