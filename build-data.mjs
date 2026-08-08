/**
 * Generates website1/data.js from docs/website-status.md.
 *
 * WHY THIS EXISTS
 * The portal's numbers were previously edited in two places — the markdown record
 * and data.js — and they drifted, which is how the site ended up claiming work was
 * pending that had already shipped. One source, one generator, no drift.
 *
 * It also REFUSES to write a file whose arithmetic is wrong: the site-wide figure
 * must match the weighted blend of the four aspects, and every module's headline
 * must sit within ±3 of the mean of its own three aspects. A number nobody can
 * derive is a number nobody can trust.
 *
 *   node website1/build-data.mjs            # regenerate
 *   node website1/build-data.mjs --check    # verify only, non-zero exit on drift
 *
 * The long per-module blurbs (`feats`) are prose, so they live here rather than in
 * the markdown table — the markdown owns the NUMBERS, which is what drifts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MD = path.join(HERE, '..', 'docs', 'website-status.md');
const OUT = path.join(HERE, 'data.js');
const CHECK = process.argv.includes('--check');

if (!fs.existsSync(MD)) {
  // This is a DEVELOPMENT tool, not a deploy step. Only website1/ is deployed, so
  // docs/website-status.md is not present on the host — an ENOENT stack trace
  // there looks like a broken build rather than a script being run in the wrong
  // place, which is exactly how it was first misread.
  console.error(
    `Cannot find ${MD}\n\n` +
      'This script generates data.js from the status document in docs/, which is\n' +
      'OUTSIDE the deployed folder. data.js is a committed artifact — the host must\n' +
      'not regenerate it.\n\n' +
      'Run this locally from a full checkout, commit the updated data.js, then deploy.',
  );
  process.exit(1);
}

// Normalised to LF at the door. The markdown is edited on Windows, so it
// carries CRLF — and every paragraph-boundary lookahead in the parsers below
// is written against LF, so they silently never matched: one capture
// swallowed the entire section instead of stopping at its own block.
const md = fs.readFileSync(MD, 'utf8').replace(/\r\n/g, '\n');
const rows = section =>
  md
    .split(/^## /m)
    .find(s => s.startsWith(section))
    .split('\n')
    .filter(l => l.startsWith('|') && !/^\|\s*-+/.test(l) && !/\| *%? *\|/.test(l.slice(0, 3)))
    .map(l => l.split('|').slice(1, -1).map(c => c.trim()))
    .filter(c => c.length && !/^(key|Title|Aspect)$/i.test(c[0]));

// ── aspects ────────────────────────────────────────────────────────────────
const aspects = rows('2. Aspects').map(([key, pct]) => ({ key, pct: Number(pct) }));
const W = { 'UI & experience': 0.2, 'Backend & data': 0.35, 'Device integrations': 0.3, 'AI & automation': 0.15 };
const overallExact = aspects.reduce((sum, a) => sum + W[a.key] * a.pct, 0);
const overall = Math.round(overallExact);

// ── modules ────────────────────────────────────────────────────────────────
const FEATS = {
  splash: 'Launch, session restore, and the routing decision — welcome, first-card gate, or straight home.',
  auth: 'Email code + password live; the one-phone-per-account lock is ACTIVE, and signing out now properly releases the phone. Apple & Google sign-in and SMS / WhatsApp still to come.',
  onboarding: 'Mandatory first-card gate; pedestal carousel of Obsidian, Gold and Platinum; every card stored in the cloud.',
  builder: 'Identity, photo & logo, grouped fields, preview, cloud saving — and images now really upload to cloud storage, so a card survives a reinstall. The logo finder reads your company website’s own artwork, and anything missing when you save is now named at the top of the form instead of hidden below it.',
  home: 'The day’s first screen, built around who needs you: overdue and due follow-ups with one-tap done and snooze, introductions waiting for approval, the people you met most recently with a one-tap Remind, and how your whole network was built. Set a follow-up on anyone in two taps — the phone buzzes when it falls due, even with the app closed.',
  cards: 'The public card page is LIVE — a permanent short link per card, rendered fresh on every open, so an edit reaches everyone you already shared with. Cards go into the phone’s wallet and onto the home screen, the QR shares as a branded picture, the card shares as a contact file, and the share row reaches WhatsApp, LinkedIn, X, Instagram, Facebook, Telegram, Messenger, email and SMS directly.',
  scan: 'The camera is live. QR codes decode by themselves — from the lens or from a photo — and a photographed paper card reads its own name, company, job title, department, address, phone, email, website and social links straight into the contact form. Reading quality has been tuned against real cards, including more than one card in a single photo.',
  contacts: 'Live in the cloud with tags, search, imports and contact photos, and every contact records how it was acquired — as a small mark on the avatar since the 4 Aug redesign. Tags are reusable identifiers (typing offers the existing tag instead of creating a duplicate), memories can be pinned to a calendar date, and voice notes record directly on the contact page beside the written memory.',
  ai: 'The concierge answers for real — grounded in everything you stored: contacts, notes, dated memories, every memo’s title, summary and spoken commitments, and the Meeting Recorder’s transcripts. It says plainly when your notes don’t hold the answer instead of inventing one, opens in about two seconds, and you can speak your question instead of typing it. A paid Claude key is a one-line upgrade for answer quality.',
  notifications: 'Lock-screen delivery is LIVE and proven on a real phone: the app writes a notification, the server pushes it, and the phone that caused it is deliberately skipped. Tapping one opens what it is about. iPhone delivery is the remaining piece.',
  recorder: 'The Meeting Recorder is its own page, opened from Home: record meetings or standalone voice notes with pause, resume and a live waveform, give every recording an editable title, and browse the complete history of every recording in the app — contact memos included — searchable, filterable by origin and sortable, with play, rename, transcribe and delete on every row. Free: 10 minutes a take, 60 minutes kept. Premium: up to 2 hours a recording.',
  profile: 'Identity, avatar and logo controls sync to the cloud. Three real settings pages arrived 4 Aug: an Activity Log of sign-ins, devices and security events; App Usage counted on the phone only and never uploaded; and a Premium-only Credit Usage history. German is complete across the whole app, including the four legal documents. The plan page is a glossy gold card led by the ObjectiveDone mark.',
};
const PAGES = {
  splash: 'modules/splash-boot.html', auth: 'modules/authentication.html',
  onboarding: 'modules/select-canvas.html', builder: 'modules/card-builder.html',
  home: 'modules/home.html', cards: 'modules/cards-wallet.html', scan: 'modules/scan.html',
  contacts: 'modules/contacts.html', ai: 'modules/ai-concierge.html',
  notifications: 'modules/notifications.html', profile: 'modules/profile.html',
  recorder: 'modules/meeting-recorder.html',
};

const problems = [];
const moduleRows = rows('3. Modules');
const modules = {};
const moduleOrder = [];
for (const [key, title, status, progress, ui, backend, integrations] of moduleRows) {
  const a = { ui: +ui, backend: +backend, integrations: +integrations };
  const mean = (a.ui + a.backend + a.integrations) / 3;
  if (Math.abs(mean - +progress) > 3) {
    problems.push(`module "${key}": progress ${progress} but aspects average ${mean.toFixed(1)}`);
  }
  if (!FEATS[key]) problems.push(`module "${key}": no blurb defined in build-data.mjs`);
  moduleOrder.push(key);
  modules[key] = { title, page: PAGES[key], status, progress: +progress, aspects: a, feats: FEATS[key] };
}

// ── timeline ───────────────────────────────────────────────────────────────
const NOTES = {
  'Foundation & design system': 'Skeleton, navigation, theme, the three card designs, live sign-in.',
  'The full app, built': 'Every module and screen, end to end.',
  'Stabilise & ship to phone': 'Build restored; verified on a real device.',
  'Backend goes live': 'Database, security rules and every data connection live and verified. Finished ahead of plan.',
  'Media uploads & storage': 'Photos and logos now live in cloud storage instead of on one phone — they survive a reinstall and follow the account.',
  'Lock-screen notifications': 'Live and proven on a real phone. The device that caused an event is skipped, so you are never buzzed about your own action.',
  'Camera, QR & card reading': 'The camera is back. QR codes decode themselves; a photographed business card reads its own details into the contact form — and the photo never leaves the phone.',
  'Public card page & Wallet': 'Done ahead of plan. Every card now has a permanent short link that renders fresh on every open, so an edit updates everywhere it has already been shared — and the card can be kept in the phone’s wallet.',
  'Voice memos & transcription': 'Done. The microphone is real: record a memo on a contact, play it back on any of your phones, and within a minute it comes back as text — with a short summary and the promises you made out loud pulled out of it. You can also just speak your question to the concierge instead of typing.',
  'Concierge thinks for real': 'Done — a day early, and without the planned key. The concierge answers about your own contacts on the club’s existing AI allowance: ask who to follow up with and it reasons from your notes, and it says plainly when your notes don’t hold the answer instead of inventing one. A paid Claude key remains a one-line upgrade for answer quality.',
  'Premium & the paywall': 'The paid features now know who has paid for them. Reading business cards stays free five times a day; voice transcripts and the concierge are part of the plan; everything else in the app — cards, contacts, sharing, reminders, and recording a memo — stays free for everyone. Test accounts get full access from a list you edit yourself, with no new build.',
  'Home & follow-up reminders': 'Home is no longer a placeholder — it opens on who needs you today. Set a follow-up on any contact in two taps; the phone buzzes when it falls due even with the app closed; snooze it or mark it done from the same row. Around it: introductions waiting for your approval, the people you met most recently, and how your whole network was built.',
  'Polish & release prep': 'The long tail: the open items on each module\u2019s list, a brand polish pass, and everything needed to hand over v1. Nearly closed — the release build is already with the client, and what is still moving is polish found on the phone.',
  'Concierge search & per-product threads': 'The concierge stopped depending on how recently you met somebody: it now works out what a question is about and searches the whole book for it, including company names spelt loosely. And conversations are properly separated per product — a member who also holds a CRM seat had been seeing their sales chats inside Connect.',
  'iPhone verification': 'The first build on a Mac already happened \u2014 the app compiles, installs and runs on a real iPhone, and most of it was checked there. What is left is closing the card-reading gap and confirming push, NFC and the widget, which need the paid Apple membership. It moved a few days out because 2–8 August went to the CRM app and the admin console instead. iPhone items are listed but never counted against progress.',
  'Connect v1.0': 'The finished app — the platform’s foundation, and the spine the other three products are built on. The release build is already in the client’s hands; this date is when the last open items close, and those are third-party accounts rather than unwritten features.',
};
const timeline = rows('4. Timeline').map(([title, when, status, progress]) => {
  if (!NOTES[title]) problems.push(`timeline "${title}": no note defined in build-data.mjs`);
  return { title, when, status, progress: +progress, note: NOTES[title] };
});
const targetV1 = (md.match(/\*\*Target v1: (.+?)\*\*/) || [])[1];
if (!targetV1) problems.push('no "Target v1:" line found');

/**
 * §8–§13 — the other three products.
 *
 * These were hand-written in index.html until 8 Aug 2026, and they had drifted
 * exactly the way §3's numbers once did: the CRM tab pill said "Starts Aug 24"
 * while the panel one click below it said "first build expected by Aug 22", and
 * both were describing a product that had in fact been built three weeks early.
 * Same cure as everywhere else — numbers in the markdown, prose here, one
 * generator, and a refusal to write a headline nobody can derive.
 */
const PRODUCT_UI = {
  connect: {
    deliverable: 1,
    icon: '📇',
    tagline: 'Digital cards · scanning · contacts · follow-ups · AI concierge',
    pill: 'v1 shipped · {pct}%',
    // The Connect panel is the one that already exists in index.html, with the
    // module grid, the diagram links and the four aspect tracks.
    main: true,
  },
  crm: {
    deliverable: 2,
    icon: '🗂️',
    tagline: 'Every captured contact, worked by a sales team',
    pill: 'Built · verifying · {pct}%',
    unit: 'Modules',
    target: 'Aug 18',
    blurb:
      'The team-side app: leads, a pipeline you drag, tasks that buzz the right ' +
      'phone, reports counted by the database, and an assistant that only ever ' +
      'answers about records you are allowed to see. Eight modules in three days, ' +
      'because it started from a running platform rather than a blank repo — the ' +
      'design system, sign-in, storage, push and the AI services were already live ' +
      'and were lifted rather than rebuilt.',
    measure:
      'Every module here is built, installed and running on a real phone. What is ' +
      'not finished is the TWO-phone half of the checks — one phone assigning work ' +
      'to another, a seat refusing an invite past the cap — which needs the founder ' +
      'and a second handset. Those are listed as their own block, never as a ' +
      'deduction on a module that works. The CRM has not been built on a Mac yet ' +
      'either; it waits on the same block Connect’s iPhone verification does.',
  },
  crmweb: {
    deliverable: 3,
    icon: '🖥️',
    tagline: 'The same CRM, full-screen in the browser',
    pill: '🔒 Starts Aug 18, 2026',
    kind: 'queued',
    blurb:
      'The desk half of the CRM — the work a phone is genuinely the wrong shape ' +
      'for. It is the only product still unstarted, and it stays that way on ' +
      'purpose: it will be built against a database that eight mobile modules have ' +
      'already beaten on, reusing their pipeline rules rather than restating them, ' +
      'so nothing here is a second implementation of anything.',
    when: 'Starts Aug 18, 2026 · through mid-September',
  },
  admin: {
    deliverable: 4,
    icon: '🛡️',
    tagline: 'Members, organizations, spend, storage and every action taken',
    pill: 'Built · deploying · {pct}%',
    unit: 'Screens',
    target: 'Aug 12',
    blurb:
      'The platform control plane, brought forward ahead of the web CRM: thirteen ' +
      'screens and five drill-down pages over members, organizations, ' +
      'subscriptions, AI spend, storage, support, broadcasts, system health, the ' +
      'audit trail, security and staff roles. One rule shapes all of it — staff see ' +
      'the ACCOUNT, staff do not read the ADDRESS BOOK — and it is enforced by the ' +
      'database rather than by which screens were built.',
    measure:
      'Every figure on every screen is read from live production data, and each ' +
      'screen was reviewed from both an Admin and a Staff account before it counted ' +
      'as built. The screens below 100 are the ones whose numbers are real but ' +
      'incomplete because something outside the code is missing — a read-only ' +
      'analytics token, a payment provider. Putting it on a public address is a ' +
      'fifteen-minute panel job plus DNS, so it is listed rather than scored.',
  },
};

const CRM_FEATS = {
  workspace:
    'The organisation itself: seats bought against seats used, invite by email, ' +
    'admin or sales, and disable or re-enable a person — a disabled member’s app ' +
    'goes blind at once. Its own name and logo, a hand-over step so somebody ' +
    'leaving does not orphan their records, and an accountability log of who did ' +
    'what.',
  pipeline:
    'Deals on a board you drag between stages, or a list you search, sort and ' +
    'filter. Stages are yours to rename, reorder and delete safely. Won or lost ' +
    'asks why, every move is written to the deal’s own history, and one deal can ' +
    'carry more than one contact.',
  leads:
    'A leads inbox with sources, tags and owners; qualify and convert into a deal; ' +
    'the full contact record with its linked deals; and a company page showing its ' +
    'people, its deals and their value. Contacts cross from Connect in BOTH ' +
    'directions — send from Connect, or pull from your own Connect book inside the ' +
    'CRM — and pulling the same person twice returns the same record rather than a ' +
    'duplicate.',
  tasks:
    'Work grouped as Overdue, Today, This week and Later. A task is a commitment ' +
    'to a person, held by an owner, with a date: you pick the assignee as you ' +
    'create it, so the right phone buzzes first — with the app closed. Complete, ' +
    'reschedule and hand over from the row. Email reminders are the one part still ' +
    'missing; the push already works.',
  conversation:
    'A voice note recorded in Connect travels with the contact: its transcript, ' +
    'the summary and the promises made out loud all render on the lead and on the ' +
    'deal. Two parts are not there yet, which is why this is the one number well ' +
    'under the rest — the audio itself does not play for a colleague, and you ' +
    'cannot record a new note onto a deal from the CRM.',
  assistant:
    'An assistant grounded only in the records you are allowed to see — “what is ' +
    'stalling in Proposal?”, “who should I call today?”. A sales user’s answers ' +
    'cover their own book and an admin’s cover the workspace, and it refuses ' +
    'plainly when the records do not hold the answer. It runs on the free AI tier ' +
    'today; a paid key is a one-line upgrade for answer quality. Its threads are ' +
    'kept apart from Connect’s.',
  reports:
    'Open pipeline value, deals by stage, win rate, overdue count and a per-member ' +
    'table for admins, over any date range you pick — every figure counted by the ' +
    'database rather than added up in the app, so it cannot quietly stop at the ' +
    'first thousand rows. Plus what you do from a record: WhatsApp, call, email, ' +
    'and export the rows you selected as a spreadsheet.',
};

const ADMIN_FEATS = {
  dashboard:
    'The platform on one screen over any dates you choose: what needs attention, ' +
    'headline figures that open into their own constituents, the signup trend, ' +
    'where contacts came from, and org seat usage.',
  members:
    'Every account, filterable, with per-feature AI columns — then one member’s ' +
    'page: the facts, their plan, their counts, their cards’ metadata, their ' +
    'devices, their organizations, their event trail, an export, and both kinds of ' +
    'deletion. Never their contacts.',
  organizations:
    'Every workspace and, inside one, its seats, its roster with each person’s ' +
    'workload, open invites, pipeline totals, the shape of its stages and whether ' +
    'adoption is rising.',
  subscriptions:
    'Plans and their lifecycle, the tester allowlist with each address’s ' +
    'confirmation state, and the free daily allowances. Grants are made by hand ' +
    'from a button until a payment provider is connected.',
  ai: 'Calls per feature, a trend with the quiet days filled in, the heaviest ' +
    'users and what it cost. The rupee figures are estimated from published prices ' +
    'and labelled as such until an analytics token lands.',
  storage:
    'What the deletion worker is doing right now, what actually holds each reason ' +
    'for deletion, the review queue, the master switch scoped to the one thing it ' +
    'genuinely guards, and any object drilled down to its own removal timeline.',
  support:
    'The request queue, and the register of consented, scoped, expiring access to ' +
    'one member’s content — the only door to member data, opened by the member, ' +
    'closing by itself.',
  broadcast:
    'An announcement to a chosen segment, previewed as it will appear on a lock ' +
    'screen, sent down the notification spine the apps already use.',
  health:
    'The background jobs, with run-now, edit-schedule and pause, each carrying its ' +
    'last twenty outcomes and a stated likely cause when one fails. Plus table ' +
    'sizes and the console’s own failures.',
  audit:
    'What staff did and what the platform did, side by side. Every mutation writes ' +
    'its row before it acts, and anything dangerous carries the reason somebody ' +
    'typed.',
  security:
    'Who holds privilege, the authentication events, the device locks, and the ' +
    'register of exceptions. Two-step sign-in for staff is the next iteration.',
  staff:
    'Grant and revoke console access by email, and the full role-by-permission ' +
    'matrix. Deliberately separate from the platform-wide flag, which is a ' +
    'cross-tenant key and is never handed out as a side effect of hiring somebody.',
  settings:
    'Platform settings, the free daily allowances, and every integration with the ' +
    'consequence of it being absent spelled out. A couple of limits are shown but ' +
    'not editable here on purpose.',
};

const CRM_NOTES = {
  'Foundation & app shell':
    'A real app on the founder’s phone on day one: theme, navigation, sign-in and ' +
    'the CRM’s five tabs, lifted from Connect rather than written again.',
  'Workspace, seats & roles':
    'An organization with seats you can fill: invite by email, admin or sales, ' +
    'disable and re-enable. A second real account joined the same day.',
  'Pipeline & deals':
    'The board, drag and all: stages you own, deals with a value and a date, won ' +
    'or lost with a reason, and every move kept in the deal’s own history.',
  'Leads, contacts & the Connect bridge':
    'The door between the two apps, in both directions — a contact captured in ' +
    'Connect this morning is a CRM lead by the afternoon, provenance intact, and ' +
    'the personal record untouched.',
  'Tasks & due reminders':
    'Overdue, Today, This week, Later — with the assignee chosen as the task is ' +
    'written, so the phone that buzzes is the right one, even with the app closed.',
  'The CRM assistant':
    'A workspace assistant that cannot see across the workspace boundary or into ' +
    'a colleague’s book, because the limit is enforced by the database rather than ' +
    'by the app deciding what to ask for.',
  'Reports & quick actions':
    'Pipeline value, deals by stage, win rate, per-member performance — counted by ' +
    'the database over any range. Plus WhatsApp, call, email and spreadsheet ' +
    'export from a record.',
  'Eleven founder-review rounds':
    'The part that does not appear in a feature list: eleven passes on the real ' +
    'thing on a real phone. It is where tasks were reworked around what a task ' +
    'actually IS, and where a finished assistant was found unreachable because a ' +
    'tab still pointed at a placeholder.',
  'Founder device gates':
    'The checks that need two phones and the founder holding them: an assignment ' +
    'buzzing the assignee and staying silent for the assigner, a due task pushing ' +
    'with the app closed, a seat refusing an invite past the cap, a disabled ' +
    'member going blind.',
  'Conversation-record audio':
    'The last real gap in the CRM: a voice note recorded in Connect renders its ' +
    'transcript, summary and commitments on the deal, but the audio still lives ' +
    'under the member’s own private prefix, so a colleague cannot play it.',
  'Hardening & release':
    'Connect’s closing checklist, reapplied: a paging proof against fifteen ' +
    'hundred leads, a storage audit, a cross-platform check, and the signed ' +
    'release build.',
  'CRM v1.0': 'The finished team app — and the schema the web CRM is then built onto.',
};

const ADMIN_NOTES = {
  'Scope derived, not given':
    'Nobody specified what an admin console contains, so it was reasoned out of ' +
    'the schema, both proposals, the contracted annexures and what a service of ' +
    'this kind is expected to have — then written down as scope before any screen ' +
    'existed.',
  'Roles, permissions & the safe reads':
    'Staff roles as rows rather than a flag, twenty-nine named permissions, and ' +
    'read functions with hand-written projections — so “staff cannot read the ' +
    'address book” is a property of the database, not of which screens were built.',
  'Thirteen screens, built and looked at':
    'Every screen driven in a real browser at 2× and reviewed as a designer, an ' +
    'owner and a tired user. That pass caught invisible avatars, a header sitting ' +
    'over row one, and initials rendered from a bracket — none of which a type ' +
    'check can see.',
  'Actions, support & broadcast':
    'The things staff can DO: grants, device-lock clearing, deletion approvals, ' +
    'allowance edits — each writing its audit row before it acts, and the ' +
    'dangerous ones asking for a typed reason. Plus a consented, expiring door to ' +
    'a member’s content instead of impersonation.',
  'Founder review rework':
    'A day of corrections after the founder used it. The Storage screen was ' +
    'describing the wrong safety catch as engaged; every headline number became a ' +
    'door into what makes it up; staff and roles were rebuilt; and account ' +
    'deletion now shows exactly what it destroys, inside a window that can still ' +
    'be reversed.',
  'Live at admin.objectivedone.com':
    'A Node app on the host, a subdomain pointed at it and a certificate issued. ' +
    'Fifteen minutes plus DNS, and the only thing between “it runs” and “you can ' +
    'open it from your phone”.',
  'Real spend, real bytes':
    'Two read-only credentials turn two estimates into facts: what the AI actually ' +
    'cost, and what the stored files actually weigh.',
  'Admin console v1.0':
    'The control plane, live — with the payment reconciliation waiting on the ' +
    'provider rather than on code.',
};

const PRODUCT_MODULES = {
  crm: { section: '9. CRM mobile', feats: CRM_FEATS },
  admin: { section: '11. Admin console', feats: ADMIN_FEATS },
};
const PRODUCT_TIMELINES = {
  crm: { section: '10. CRM mobile', notes: CRM_NOTES },
  admin: { section: '12. Admin console', notes: ADMIN_NOTES },
};

/** §13 — one authoritative "what's left" list per product, same shape as §5. */
const productLeft = {};
{
  const body = md.split('## 13. The other products')[1] || '';
  const BLOCK_RE = new RegExp(
    '^\\*\\*([a-z]+)\\*\\*\\s+—\\s+([\\s\\S]*?)(?=\\n\\n|\\n## |(?![\\s\\S]))',
    'gm',
  );
  let m;
  while ((m = BLOCK_RE.exec(body)) !== null) {
    productLeft[m[1]] = m[2]
      .replace(/\s*\n\s*/g, ' ')
      .trim()
      .split(' · ')
      .map(s =>
        s
          .replace(/\*\((.*?)\)\*/g, '($1)')
          .replace(/\*\*/g, '')
          .replace(/`/g, '')
          .replace(/\s+/g, ' ')
          .trim(),
      )
      .filter(Boolean);
  }
  if (!Object.keys(productLeft).length) problems.push('§13: parsed zero products');
}

const products = rows('8. Products').map(([key, name, status, progress, when]) => {
  const ui = PRODUCT_UI[key];
  if (!ui) {
    problems.push(`products: "${key}" has no entry in PRODUCT_UI`);
    return null;
  }
  const pct = +progress;
  if (status === 'pending' && pct !== 0) {
    problems.push(`products: "${key}" is pending but claims ${pct}%`);
  }
  const p = {
    key,
    name,
    deliverable: ui.deliverable,
    icon: ui.icon,
    tagline: ui.tagline,
    status,
    progress: pct,
    when: ui.when || when,
    pill: (ui.pill || '').replace('{pct}', pct),
    kind: ui.kind || (ui.main ? 'main' : 'built'),
    blurb: ui.blurb || '',
    measure: ui.measure || '',
    unit: ui.unit || 'Modules',
    target: ui.target || '',
    left: productLeft[key] || [],
  };
  if (key === 'connect') {
    // Connect's headline is §2's weighted blend, not a mean of anything here.
    if (pct !== overall) problems.push(`products: connect says ${pct} but §2 blends to ${overall}`);
  }
  const src = PRODUCT_MODULES[key];
  if (src) {
    p.modules = rows(src.section).map(([mKey, title, mStatus, mProgress]) => {
      if (!src.feats[mKey]) problems.push(`${key} module "${mKey}": no blurb defined in build-data.mjs`);
      return { key: mKey, title, status: mStatus, progress: +mProgress, feats: src.feats[mKey] };
    });
    // The headline must be the plain mean of the table under it. A product figure
    // that is not the arithmetic of its own parts is a figure nobody can check,
    // which is the whole reason this generator exists.
    const mean = p.modules.reduce((s, m) => s + m.progress, 0) / (p.modules.length || 1);
    if (Math.abs(mean - pct) > 2) {
      problems.push(`products: "${key}" says ${pct} but its ${p.modules.length} rows mean ${mean.toFixed(1)}`);
    }
  }
  const tl = PRODUCT_TIMELINES[key];
  if (tl) {
    p.milestones = rows(tl.section).map(([title, w, s, pr]) => {
      if (!tl.notes[title]) problems.push(`${key} timeline "${title}": no note defined in build-data.mjs`);
      return { title, when: w, status: s, progress: +pr, note: tl.notes[title] };
    });
  }
  if (p.kind !== 'main' && !p.left.length) problems.push(`products: "${key}" has no §13 list`);
  return p;
}).filter(Boolean);

for (const key of Object.keys(productLeft)) {
  if (!products.some(p => p.key === key)) problems.push(`§13: "${key}" is not a product in §8`);
}
if (products.length < 2) problems.push('products: §8 parsed fewer than two rows');

/**
 * §5 "Things to do" -> structured items, so the portal's four progress bars can
 * open a breakdown of exactly what is holding each one back.
 *
 * The markdown stays the single source: every item carries an aspect tag
 * (#ui / #backend / #int / #ai) naming the track it blocks, and an UNTAGGED item
 * is a hard error rather than a silent default — a to-do that quietly lands in
 * the wrong bucket is worse than no breakdown at all.
 */
const ASPECT_KEY = { ui: 'ui', backend: 'backend', int: 'integrations', ai: 'ai' };
const todos = [];
{
  const section = md.split('## 5. Things to do')[1] || '';
  const body = section.split('### Removed')[0];
  // NOT `$` for the end anchor: the /m flag makes it match end-of-LINE, which
  // stopped every module's capture at its first line break and silently dropped
  // the wrapped remainder — aspect tags included. `(?![\s\S])` is a true
  // end-of-input and keeps the multiline `^` that finds each module.
  const BLOCK_RE = new RegExp(
    '^\\*\\*([a-z]+)\\*\\*\\s+\u2014\\s+([\\s\\S]*?)(?=\\n\\n|\\n### |(?![\\s\\S]))',
    'gm',
  );
  let m;
  while ((m = BLOCK_RE.exec(body)) !== null) {
    const moduleKey = m[1];
    if (!(moduleKey in modules)) {
      problems.push(`things-to-do: "${moduleKey}" is not a module in §3`);
      continue;
    }
    const flat = m[2].replace(/\s*\n\s*/g, ' ').trim();
    for (const raw of flat.split(' \u00b7 ')) {
      const item = raw.trim();
      if (!item) continue;
      const tag = item.match(/`#(ui|backend|int|ai)`/);
      if (!tag) {
        problems.push(
          `things-to-do: "${moduleKey}" item has no #aspect tag: ${item.slice(0, 60)}`,
        );
        continue;
      }
      const iphone = item.includes('[iPhone]');
      const decision = item.includes('(decision)');
      // Strip the machine markers; keep the human note in brackets.
      const label = item
        .replace(/`#(ui|backend|int|ai)`/g, '')
        .replace(/\*\*\[iPhone\]\*\*/g, '')
        .replace(/\*\((.*?)\)\*/g, '($1)')
        .replace(/\*\*/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      todos.push({
        module: moduleKey,
        moduleTitle: modules[moduleKey].title,
        aspect: ASPECT_KEY[tag[1]],
        label,
        iphone,
        decision,
      });
    }
  }
  if (todos.length === 0) problems.push('things-to-do: parsed zero items');
}

if (problems.length) {
  console.error('REFUSING TO WRITE — the numbers do not add up:');
  problems.forEach(p => console.error('  · ' + p));
  process.exit(1);
}

// ── the keys site.js actually reads ────────────────────────────────────────
// Renaming a top-level key silently renders an EMPTY SECTION rather than
// throwing — the timeline vanished from the page exactly this way when the array
// was first generated as `timeline` while the renderer reads `milestones`.
// Nothing in the browser complains, so the generator has to.
function assertRendererKeys(obj) {
  const js = fs.readFileSync(path.join(HERE, 'assets', 'site.js'), 'utf8');
  const used = new Set([...js.matchAll(/\bD\.([A-Za-z_$][\w$]*)/g)].map(m => m[1]));
  for (const key of used) {
    if (!(key in obj)) problems.push(`site.js reads D.${key}, but data.js has no such key`);
  }
}

const data = {
  todos,
  products,
  project: {
    started: '2026-07-24',
    lastUpdated: new Date().toISOString().slice(0, 10),
    overall,
    aspects,
    currentMilestone: 'Polish, release prep & the iPhone block',
    targetV1,
    note: 'Every screen is built. Voice memos record, play back and transcribe on request \u2014 verified on the phone \u2014 and you can speak a question to the concierge instead of typing it. The concierge answers for real, grounded only in your own contacts and notes, and says plainly when your notes do not hold the answer. Home opens on who needs you today: follow-ups you set in two taps, pushed by the server so they reach the phone with the app closed. What remains is polish, a handful of decisions, and verification on iPhone.',
    /**
     * The "Right now" card. This was a hand-written paragraph in index.html and it
     * had gone stale in the way only prose can: it still argued that v1 targets
     * Aug 12 "rather than Aug 15" while the table three sections away said Aug 15.
     * Generated from here so the sentence and the date cannot disagree again.
     */
    rightNow:
      'Started <b>Jul 24, 2026</b>. Every screen is built, the release APK is with ' +
      'the client, and the app also runs on a real iPhone. Voice memos, transcripts ' +
      'and dictation are done; the concierge answers for real, grounded only in the ' +
      'member\u2019s own contacts and notes \u2014 and since 8 Aug it searches for what a ' +
      'question is about rather than reading only the most recent contacts. Home ' +
      'opens on who needs you today, with follow-up reminders sent by the server so ' +
      'they arrive with the app closed.' +
      '<br /><br />' +
      '<b>Why the last date moved out three days.</b> Eleven milestones landed in ' +
      'the first nine days, and that pace held \u2014 but 2\u20138 August went to the ' +
      '<b>CRM mobile app</b> and the <b>admin console</b>, both pulled forward, ' +
      'rather than to Connect\u2019s tail. So v1 now targets <b>' + targetV1 + '</b>, and ' +
      'what is left here is the iPhone block plus items waiting on third-party accounts ' +
      '(a release signing key for Google sign-in, the wallet issuer accounts, a ' +
      'payment provider) rather than unfinished features.',
    // Rendered under the headline figure on the home page. The rule it states is set
    // out in docs/website-status.md §1 — every number here measures Android, and no
    // iPhone item lowers any of them.
    platformNote: 'Every feature is built and verified on Android, and these percentages measure that. iPhone work is listed in each module’s “Things to do” but is deliberately excluded from the progress bars — the code is already written and accommodated for iOS, so what remains is a scheduled block of building and testing on a Mac rather than unfinished work.',
  },
  moduleOrder,
  modules,
  // NAME MATTERS: site.js renders from D.milestones.
  milestones: timeline,
};

assertRendererKeys(data);
if (problems.length) {
  console.error("REFUSING TO WRITE:");
  problems.forEach(p => console.error("  · " + p));
  process.exit(1);
}

const banner = `/* ObjectiveDone · Build Portal — content for every page.

   ⚠ GENERATED FILE — DO NOT EDIT BY HAND.
   Source of truth: docs/website-status.md
   Regenerate:      node website1/build-data.mjs
   Verify:          node website1/build-data.mjs --check

   Progress model: every module tracks three aspects —
     ui           how finished the screens/interactions are
     backend      data, cloud tables, business logic actually wired
     integrations native/device/third-party capabilities working for real

   Site-wide overall is weighted by where the remaining WORK is:
     UI 20% · Backend 35% · Device integrations 30% · AI 15%
     = ${aspects.map(a => `${W[a.key].toFixed(2)}(${a.pct})`).join(' + ')} = ${overallExact.toFixed(1)} → ${overall}
   The generator refuses to write this file if that arithmetic breaks. */
window.OD_DATA = ${JSON.stringify(data, null, 2)};
`;

if (CHECK) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  // lastUpdated changes daily; compare everything else.
  const strip = t => t.replace(/"lastUpdated": "[^"]*"/, '');
  if (strip(current) !== strip(banner)) {
    console.error('DRIFT: data.js does not match docs/website-status.md. Run: node website1/build-data.mjs');
    process.exit(1);
  }
  console.log('in sync · overall', overall);
} else {
  fs.writeFileSync(OUT, banner);
  console.log(
    `data.js written · Connect ${overall} (${overallExact.toFixed(1)}) · ` +
      `${moduleOrder.length} modules · ${timeline.length} timeline entries\n` +
      `           products · ` +
      products.map(p => `${p.key} ${p.progress}%`).join(' · '),
  );
}
