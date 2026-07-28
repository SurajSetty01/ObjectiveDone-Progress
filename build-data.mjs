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

const md = fs.readFileSync(MD, 'utf8');
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
  builder: 'Identity, photo & logo, grouped fields, preview, cloud saving — and images now really upload to cloud storage, so a card survives a reinstall. Abandoning the form cleans up after itself.',
  home: 'Deliberately empty for now — this surface waits for the CRM and Admin products, so its features can be decided with them instead of guessed today.',
  cards: 'Wallet, flip-to-QR and NFC writing work on live cloud data, and card artwork is now real cloud media. The public page a shared link opens is still the big gap.',
  scan: 'The camera is live. QR codes decode by themselves — from the lens or from a photo — and a photographed paper card reads its own name, company, job title, department, address, phone, email, website and social links straight into the contact form.',
  contacts: 'Live in the cloud with tags, search, imports and contact photos. Address, department and social links are now stored properly, and “where we met” has real place search. Recording and transcripts are the remaining gap.',
  ai: 'Chats persist in the cloud and the answering service is deployed — it still needs one API key to start replying for real. (The card-reading AI used by Scan is a separate service and is already running.)',
  notifications: 'Lock-screen delivery is LIVE and proven on a real phone: the app writes a notification, the server pushes it, and the phone that caused it is deliberately skipped. Tapping one opens what it is about. iPhone delivery is the remaining piece.',
  profile: 'Identity, avatar and logo controls sync to the cloud, and the avatar image itself now really uploads. Signing out clears cached media so the next account never sees the last one’s photos.',
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
  'Voice memos & transcription': 'The microphone returns: record a memo on a contact, then turn it into text automatically.',
  'Concierge thinks for real': 'The AI key goes in; memo transcripts feed its memory.',
  'Public card page & Wallet': 'The page a shared link opens, and passes you can keep in Apple/Google Wallet.',
  'Polish, iPhone & release prep': 'Final polish, the first iPhone build, and everything needed to hand over v1.',
  'Connect v1.0': 'The finished app — the CRM foundation.',
};
const timeline = rows('4. Timeline').map(([title, when, status, progress]) => {
  if (!NOTES[title]) problems.push(`timeline "${title}": no note defined in build-data.mjs`);
  return { title, when, status, progress: +progress, note: NOTES[title] };
});
const targetV1 = (md.match(/\*\*Target v1: (.+?)\*\*/) || [])[1];
if (!targetV1) problems.push('no "Target v1:" line found');

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
  project: {
    started: '2026-07-24',
    lastUpdated: new Date().toISOString().slice(0, 10),
    overall,
    aspects,
    currentMilestone: 'M6 · Scanning, card reading & location',
    targetV1,
    note: 'Three milestones landed in two days. Photos and logos now upload to cloud storage; lock-screen notifications are live and proven on a real phone; and the camera is back — scanning a paper card reads its details automatically, and QR codes decode instantly. What remains is the microphone (voice memos and transcripts), the AI concierge’s own key, Wallet passes and the public card page, then the first iPhone build.',
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
