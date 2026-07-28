# website1 module-page authoring guide (build agents)

You write ONE file: `website1/modules/<slug>.html`. Nothing else, anywhere.

## The exemplar is law
`website1/modules/authentication.html`. Copy its skeleton exactly — head, nav,
mod-head (badge · h1 · pill · lead · progress), tabbar, legend, tabpanels,
prev/next, footer, and the six `<script>` tags at the end. Change only content.

## Audience
A non-technical client and the developer's peers. The DIAGRAMS carry the page —
text is one lead paragraph, one line per feature, nothing more. Never use:
repository, RLS, seam, hook, mutation, endpoint, schema, prop, TanStack, Zustand.
Tech names (React Native, Supabase, PostgreSQL, Firebase, Claude) belong ONLY in
Architecture-tab charts.

## Tabs
Standard set, in this order, each `<button class="tabbtn">` with a `.cnt` count
that MUST equal the number of charts in that panel:
1. **User flows** — 2–4 charts, one per feature, in the order a user meets them.
2. **Architecture & backend** — 1–2 charts.
3. **States** — 1 chart, ONLY if the module has a genuine lifecycle worth
   showing (otherwise omit the button AND the panel entirely).

## Charts — REAL mermaid diagrams (this is the whole point)
Each chart lives in a `.feature` section:
`.f-head` (numbered chip · feature name · status pill) → one-line `.f-note` →
`.diagram-container` → `<script type="text/plain" class="chart-src">`.

Rules, non-negotiable:
- `flowchart LR` by default. `TD` only when the chain is ≤ 6 ranks deep.
- Node labels: 2–6 words, at most ONE `<br/>` second line. **No sentences, no
  descriptions inside nodes** — the diagram is not a paragraph with borders.
- Shapes + classes (every node gets exactly one `:::class`):
  - `([Label]):::screen` — a real app screen
  - `[Label]:::action` — a user/system action
  - `{Question?}:::decision` — a branch (label edges `-->|Yes|` / `-->|No|`)
  - `[[Label]]:::backend` — a cloud service · `[(Label)]:::backend` — a database
  - `([Label]):::state` — an outcome/milestone moment
  - `:::pending` (any shape) — NOT working in today's build (dashed on screen)
- Append the classDef block from the exemplar VERBATIM to every flowchart.
- Grouping: `subgraph ID [Title]` … `end` (e.g. On the phone / Supabase cloud).
- Return/async edges: dotted `-.->|label|`.
- 4–14 nodes per chart; bigger story → split into two charts.
- States tab uses `stateDiagram-v2` (no classDefs). Base it on the module's real
  state variables in code (e.g. ScanScreen's phase steps).
- FORBIDDEN in chart text: `(` `)` inside labels (unless the whole label is
  `"quoted"`), `&` (write "and"), a node id named `end`, semicolons, `%%{init}%%`
  blocks, markdown backticks. Keep ids short alphanumerics (A1, SCAN, Q2…).

## Honesty (the portal's credibility)
**Live since 27 July 2026** (migration 0004 applied and verified; RLS on all 8
tables, cross-user isolation proven): **auth, cards, profile, contacts,
notifications and AI chat** all read and write the real cloud database. Draw
those cloud nodes as normal `:::backend` — never pending, and never captioned
"switches on later".

**The only data connection still on the device is STORAGE** — photos, logos and
voice audio are device file paths, so any upload/media node stays `:::pending`.

Still placeholder-backed, so still `:::pending` and never claimed "Built":
live camera preview, QR decoding, paper-card text-reading (OCR), real audio
recording, memo transcription, dictation, live AI answers (the `ai-chat` service
is deployed — only the model key is missing), lock-screen push, Google Wallet
(blocked for India-registered businesses), Google sign-in, Google Contacts
import, add-to-home-screen, and **the public web page a shared card link opens**.

**Never write a milestone number** (M3, M4…) into a page. Milestones get
inserted and renumbered; names do not. Say "the camera milestone", "the push
milestone", "the media-upload milestone".

## Status pills
Feature pills: `Built` (green .done) / `Built · arms itself in M3` (.partial) /
`Pending · M4` etc. (.pending). They must agree with the chart's pending marks.

## Order (crumbs, prev/next)
index#modules ← splash-boot ↔ authentication ↔ select-canvas ↔ card-builder ↔
home ↔ cards-wallet ↔ scan ↔ contacts ↔ ai-concierge ↔ notifications ↔ profile
→ index#timeline ("Back to the timeline"). Module numbers 01–11 in that order.

## Technical tabs
Every module page carries TWO extra tabs, visible to everyone (there is no
hidden/team view — that concept was removed):
- **Tech stack** (`tab-stack`): feature by feature, what each moving part runs
  on. `.list-card` markup; real names (Supabase Auth, Reanimated, nfc-manager…).
- **Things to do** (`tab-pending`): the remaining work, **grouped into categories**.
  Use only the ones that apply, and keep them in this canonical order:
  **Backend · APIs · Integrations · AI · Testing · Polish · Decisions**.
  (`Decisions` last, except where a whole surface is undecided — then it leads.)
  Each category is its own `.list-card` under an `<h4 class="cat">` heading with
  an item count, so a reader sees at a glance what kind of work is left. Every
  undecided technology call is marked `<span class="tag-undecided">…</span>`.
  If a module has nothing left, use one `<h4 class="cat none">Nothing outstanding</h4>`.

Hero pattern: status pill and lead copy on the left; a right-side `.progress-box`
with four rows — Module Total Completion, UI, Backend, Implementation.

## Before writing
Read: this file, the exemplar, `website1/data.js` (your hero pill/progress
values), `docs/app/modules.md`, `docs/manual-setup.md` §0, and your module's
source files from the task prompt. Every branch you draw must exist in code;
every state you can't fit becomes a small extra node, not a deletion.
