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
  contacts: 'Live in the cloud with tags, search, imports and contact photos, and every contact records how it was acquired. Voice memos now really record: play one back on a second phone, and read the transcript, the summary and the commitments it picked out. Google Contacts import is the remaining gap.',
  ai: 'The concierge answers for real — grounded in your own contacts, notes and memo transcripts, and it says plainly when your notes don’t hold the answer instead of inventing one. Speak your question instead of typing it. It runs on the club’s own AI allowance; a paid Claude key is a one-line upgrade for answer quality.',
  notifications: 'Lock-screen delivery is LIVE and proven on a real phone: the app writes a notification, the server pushes it, and the phone that caused it is deliberately skipped. Tapping one opens what it is about. iPhone delivery is the remaining piece.',
  profile: 'Identity, avatar and logo controls sync to the cloud, and the avatar image itself now really uploads. Signing out clears cached media so the next account never sees the last one’s photos. The logo auto-detect preference is gone — the card builder simply offers it, with one fewer setting to find first.',
};
const PAGES = {
  splash: 'modules/splash-boot.html', auth: 'modules/authentication.html',
  onboarding: 'modules/select-canvas.html', builder: 'modules/card-builder.html',
  home: 'modules/home.html', cards: 'modules/cards-wallet.html', scan: 'modules/scan.html',
  contacts: 'modules/contacts.html', ai: 'modules/ai-concierge.html',
  notifications: 'modules/notifications.html', profile: 'modules/profile.html',
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
  'Home & follow-up reminders': 'Home is no longer a placeholder — it opens on who needs you today. Set a follow-up on any contact in two taps; the phone buzzes when it falls due even with the app closed; snooze it or mark it done from the same row. Around it: introductions waiting for your approval, the people you met most recently, and how your whole network was built.',
  'Polish & release prep': 'The long tail: the open items on each module\u2019s list, a brand polish pass, and everything needed to hand over v1. Under way now.',
  'iPhone verification': 'The first build on a Mac already happened \u2014 the app compiles, installs and runs on a real iPhone, and most of it was checked there. What is left is closing the card-reading gap and confirming push, NFC and the widget, which need the paid Apple membership. iPhone items are listed but never counted against progress.',
  'Connect v1.0': 'The finished app — the CRM foundation.',
};
const timeline = rows('4. Timeline').map(([title, when, status, progress]) => {
  if (!NOTES[title]) problems.push(`timeline "${title}": no note defined in build-data.mjs`);
  return { title, when, status, progress: +progress, note: NOTES[title] };
});
const targetV1 = (md.match(/\*\*Target v1: (.+?)\*\*/) || [])[1];
if (!targetV1) problems.push('no "Target v1:" line found');

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
  project: {
    started: '2026-07-24',
    lastUpdated: new Date().toISOString().slice(0, 10),
    overall,
    aspects,
    currentMilestone: 'M10 \u00b7 Home, follow-up reminders & polish',
    targetV1,
    note: 'Every screen is built. Voice memos record, play back and transcribe on request \u2014 verified on the phone \u2014 and you can speak a question to the concierge instead of typing it. The concierge answers for real, grounded only in your own contacts and notes, and says plainly when your notes do not hold the answer. Home opens on who needs you today: follow-ups you set in two taps, pushed by the server so they reach the phone with the app closed. What remains is polish, a handful of decisions, and verification on iPhone.',
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
  console.log(`data.js written · overall ${overall} (${overallExact.toFixed(1)}) · ${moduleOrder.length} modules · ${timeline.length} timeline entries`);
}
