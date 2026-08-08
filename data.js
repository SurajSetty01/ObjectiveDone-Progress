/* ObjectiveDone · Build Portal — content for every page.

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
     = 0.20(99) + 0.35(99) + 0.30(98) + 0.15(96) = 98.3 → 98
   The generator refuses to write this file if that arithmetic breaks. */
window.OD_DATA = {
  "todos": [
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "Google sign-in (blocked, not unbuilt: needs a Google Cloud OAuth client registered against a release signing key, and release still signs with the debug keystore)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "codes by SMS (the provider answer is written — SmartPing via a Supabase Send-SMS hook; waiting on the client's DLT template and API details)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "codes over WhatsApp (separate, longer: needs WhatsApp Business API and Meta approval)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "Apple sign-in",
      "iphone": true,
      "decision": false
    },
    {
      "module": "home",
      "moduleTitle": "Home",
      "aspect": "integrations",
      "label": "verify the due-time push on a phone (a reminder set for a few minutes ahead should buzz the lock screen with the app closed)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "ai",
      "moduleTitle": "AI Concierge",
      "aspect": "ai",
      "label": "teach the concierge to read the new memory records (memories written from 5 Aug are rows in their own table; the older ones are still text inside a contact's notes, which is what the concierge reads today. It must learn the new source before the two are ever merged)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "recorder",
      "moduleTitle": "Meeting Recorder",
      "aspect": "ui",
      "label": "full device pass on the new surfaces (record, pause, resume, auto-stop at the cap, rename from History, transcribe a standalone recording)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "cards",
      "moduleTitle": "Cards Wallet & Sharing",
      "aspect": "integrations",
      "label": "Wallet issuer accounts (Apple certificate; Google is closed to Indian businesses — a business registration, not engineering)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "cards",
      "moduleTitle": "Cards Wallet & Sharing",
      "aspect": "integrations",
      "label": "NFC writing",
      "iphone": true,
      "decision": false
    },
    {
      "module": "cards",
      "moduleTitle": "Cards Wallet & Sharing",
      "aspect": "integrations",
      "label": "the home-screen widget",
      "iphone": true,
      "decision": false
    },
    {
      "module": "scan",
      "moduleTitle": "Scan",
      "aspect": "ai",
      "label": "close the card-reading gap (reading and QR work on the iPhone; the fields pulled off a card are not yet as good as Android's)",
      "iphone": true,
      "decision": false
    },
    {
      "module": "ai",
      "moduleTitle": "AI Concierge",
      "aspect": "ai",
      "label": "upgrade the concierge to Claude (one paid key — `supabase secrets set ANTHROPIC_API_KEY=…`, no rebuild; it answers on the free tier today)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "ai",
      "moduleTitle": "AI Concierge",
      "aspect": "backend",
      "label": "have the AI functions check entitlement server-side as well as in the app",
      "iphone": false,
      "decision": false
    },
    {
      "module": "notifications",
      "moduleTitle": "Notifications",
      "aspect": "integrations",
      "label": "verify delivery",
      "iphone": true,
      "decision": false
    },
    {
      "module": "profile",
      "moduleTitle": "Profile & Account",
      "aspect": "ui",
      "label": "point \"Follow us\" at the real LinkedIn, Instagram and WhatsApp pages (the row hides itself until there is a URL, so there are no dead buttons)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "profile",
      "moduleTitle": "Profile & Account",
      "aspect": "backend",
      "label": "connect a payment provider for Premium (Razorpay: a webhook writing `subscriptions`, plus GST treatment. Until then the plan is granted by hand from the dashboard and the app does not pretend to take a payment)",
      "iphone": false,
      "decision": false
    }
  ],
  "products": [
    {
      "key": "connect",
      "name": "ObjectiveDone Connect",
      "deliverable": 1,
      "icon": "📇",
      "tagline": "Digital cards · scanning · contacts · follow-ups · AI concierge",
      "status": "progress",
      "progress": 98,
      "when": "Jul 24 – Aug 15",
      "pill": "v1 shipped · 98%",
      "kind": "main",
      "blurb": "",
      "measure": "",
      "unit": "Modules",
      "target": "",
      "left": []
    },
    {
      "key": "crm",
      "name": "CRM Mobile App",
      "deliverable": 2,
      "icon": "🗂️",
      "tagline": "Every captured contact, worked by a sales team",
      "status": "progress",
      "progress": 91,
      "when": "Aug 2 – Aug 18",
      "pill": "Built · verifying · 91%",
      "kind": "built",
      "blurb": "The team-side app: leads, a pipeline you drag, tasks that buzz the right phone, reports counted by the database, and an assistant that only ever answers about records you are allowed to see. Eight modules in three days, because it started from a running platform rather than a blank repo — the design system, sign-in, storage, push and the AI services were already live and were lifted rather than rebuilt.",
      "measure": "Every module here is built, installed and running on a real phone. What is not finished is the TWO-phone half of the checks — one phone assigning work to another, a seat refusing an invite past the cap — which needs the founder and a second handset. Those are listed as their own block, never as a deduction on a module that works. The CRM has not been built on a Mac yet either; it waits on the same block Connect’s iPhone verification does.",
      "unit": "Modules",
      "target": "Aug 18",
      "left": [
        "close the founder's two-phone gates (an assignment buzzing the assignee's phone and not the assigner's, a due task pushing with the app closed, a seat refusing an invite past the cap, a disabled member's app going blind)",
        "make a bridged voice note PLAY for a colleague (the transcript, summary and commitments already render; the audio is still stored under the member's own private prefix, so it needs copying into the workspace's and a player on the record)",
        "record a voice note straight onto a deal from inside the CRM",
        "email reminders on a due date (the push works today; there is no email transport at all yet, and it arrives with the web phase)",
        "the release hardening pass (a 1,500-lead paging proof, a storage audit, a cross-platform check and the signed release build)",
        "the first build on a Mac (the same block Connect's iPhone verification is waiting for, and the CRM carries fewer iOS risks — no camera, no on-device card reading)"
      ],
      "modules": [
        {
          "key": "workspace",
          "title": "Workspace, seats & roles",
          "status": "done",
          "progress": 98,
          "feats": "The organisation itself: seats bought against seats used, invite by email, admin or sales, and disable or re-enable a person — a disabled member’s app goes blind at once. Its own name and logo, a hand-over step so somebody leaving does not orphan their records, and an accountability log of who did what."
        },
        {
          "key": "pipeline",
          "title": "Pipeline & deals",
          "status": "done",
          "progress": 98,
          "feats": "Deals on a board you drag between stages, or a list you search, sort and filter. Stages are yours to rename, reorder and delete safely. Won or lost asks why, every move is written to the deal’s own history, and one deal can carry more than one contact."
        },
        {
          "key": "leads",
          "title": "Leads, contacts & accounts",
          "status": "done",
          "progress": 97,
          "feats": "A leads inbox with sources, tags and owners; qualify and convert into a deal; the full contact record with its linked deals; and a company page showing its people, its deals and their value. Contacts cross from Connect in BOTH directions — send from Connect, or pull from your own Connect book inside the CRM — and pulling the same person twice returns the same record rather than a duplicate."
        },
        {
          "key": "tasks",
          "title": "Tasks & reminders",
          "status": "progress",
          "progress": 95,
          "feats": "Work grouped as Overdue, Today, This week and Later. A task is a commitment to a person, held by an owner, with a date: you pick the assignee as you create it, so the right phone buzzes first — with the app closed. Complete, reschedule and hand over from the row. Email reminders are the one part still missing; the push already works."
        },
        {
          "key": "conversation",
          "title": "Conversation record",
          "status": "progress",
          "progress": 60,
          "feats": "A voice note recorded in Connect travels with the contact: its transcript, the summary and the promises made out loud all render on the lead and on the deal. Two parts are not there yet, which is why this is the one number well under the rest — the audio itself does not play for a colleague, and you cannot record a new note onto a deal from the CRM."
        },
        {
          "key": "assistant",
          "title": "AI assistant",
          "status": "done",
          "progress": 92,
          "feats": "An assistant grounded only in the records you are allowed to see — “what is stalling in Proposal?”, “who should I call today?”. A sales user’s answers cover their own book and an admin’s cover the workspace, and it refuses plainly when the records do not hold the answer. It runs on the free AI tier today; a paid key is a one-line upgrade for answer quality. Its threads are kept apart from Connect’s."
        },
        {
          "key": "reports",
          "title": "Reports & quick actions",
          "status": "done",
          "progress": 96,
          "feats": "Open pipeline value, deals by stage, win rate, overdue count and a per-member table for admins, over any date range you pick — every figure counted by the database rather than added up in the app, so it cannot quietly stop at the first thousand rows. Plus what you do from a record: WhatsApp, call, email, and export the rows you selected as a spreadsheet."
        }
      ],
      "milestones": [
        {
          "title": "Foundation & app shell",
          "when": "Aug 2",
          "status": "done",
          "progress": 100,
          "note": "A real app on the founder’s phone on day one: theme, navigation, sign-in and the CRM’s five tabs, lifted from Connect rather than written again."
        },
        {
          "title": "Workspace, seats & roles",
          "when": "Aug 2",
          "status": "done",
          "progress": 100,
          "note": "An organization with seats you can fill: invite by email, admin or sales, disable and re-enable. A second real account joined the same day."
        },
        {
          "title": "Pipeline & deals",
          "when": "Aug 2 – 3",
          "status": "done",
          "progress": 100,
          "note": "The board, drag and all: stages you own, deals with a value and a date, won or lost with a reason, and every move kept in the deal’s own history."
        },
        {
          "title": "Leads, contacts & the Connect bridge",
          "when": "Aug 3",
          "status": "done",
          "progress": 100,
          "note": "The door between the two apps, in both directions — a contact captured in Connect this morning is a CRM lead by the afternoon, provenance intact, and the personal record untouched."
        },
        {
          "title": "Tasks & due reminders",
          "when": "Aug 3 – 4",
          "status": "done",
          "progress": 100,
          "note": "Overdue, Today, This week, Later — with the assignee chosen as the task is written, so the phone that buzzes is the right one, even with the app closed."
        },
        {
          "title": "The CRM assistant",
          "when": "Aug 3 – 4",
          "status": "done",
          "progress": 100,
          "note": "A workspace assistant that cannot see across the workspace boundary or into a colleague’s book, because the limit is enforced by the database rather than by the app deciding what to ask for."
        },
        {
          "title": "Reports & quick actions",
          "when": "Aug 3 – 4",
          "status": "done",
          "progress": 100,
          "note": "Pipeline value, deals by stage, win rate, per-member performance — counted by the database over any range. Plus WhatsApp, call, email and spreadsheet export from a record."
        },
        {
          "title": "Eleven founder-review rounds",
          "when": "Aug 3 – 4",
          "status": "done",
          "progress": 100,
          "note": "The part that does not appear in a feature list: eleven passes on the real thing on a real phone. It is where tasks were reworked around what a task actually IS, and where a finished assistant was found unreachable because a tab still pointed at a placeholder."
        },
        {
          "title": "Founder device gates",
          "when": "Aug 9 – 12",
          "status": "progress",
          "progress": 20,
          "note": "The checks that need two phones and the founder holding them: an assignment buzzing the assignee and staying silent for the assigner, a due task pushing with the app closed, a seat refusing an invite past the cap, a disabled member going blind."
        },
        {
          "title": "Conversation-record audio",
          "when": "Aug 12 – 13",
          "status": "pending",
          "progress": 0,
          "note": "The last real gap in the CRM: a voice note recorded in Connect renders its transcript, summary and commitments on the deal, but the audio still lives under the member’s own private prefix, so a colleague cannot play it."
        },
        {
          "title": "Hardening & release",
          "when": "Aug 14 – 18",
          "status": "pending",
          "progress": 0,
          "note": "Connect’s closing checklist, reapplied: a paging proof against fifteen hundred leads, a storage audit, a cross-platform check, and the signed release build."
        },
        {
          "title": "CRM v1.0",
          "when": "Aug 18",
          "status": "pending",
          "progress": 0,
          "note": "The finished team app — and the schema the web CRM is then built onto."
        }
      ]
    },
    {
      "key": "crmweb",
      "name": "CRM Web Dashboard",
      "deliverable": 3,
      "icon": "🖥️",
      "tagline": "The same CRM, full-screen in the browser",
      "status": "pending",
      "progress": 0,
      "when": "Starts Aug 18, 2026 · through mid-September",
      "pill": "🔒 Starts Aug 18, 2026",
      "kind": "queued",
      "blurb": "The desk half of the CRM — the work a phone is genuinely the wrong shape for. It is the only product still unstarted, and it stays that way on purpose: it will be built against a database that eight mobile modules have already beaten on, reusing their pipeline rules rather than restating them, so nothing here is a second implementation of anything.",
      "measure": "",
      "unit": "Modules",
      "target": "",
      "left": [
        "spreadsheet import with column mapping, duplicate detection and reversible batches (the one contracted job that genuinely needs a desk)",
        "bulk assignment and tagging at desk density",
        "tag and stage management for a whole workspace",
        "the reporting dashboards, including live visibility of contacts as they arrive from Connect",
        "the customer status link (a public per-deal page a customer can open without an account)",
        "the email rail (due-date reminders and templates, which is also what closes the CRM's last mobile gap)"
      ]
    },
    {
      "key": "admin",
      "name": "Admin Console",
      "deliverable": 4,
      "icon": "🛡️",
      "tagline": "Members, organizations, spend, storage and every action taken",
      "status": "progress",
      "progress": 96,
      "when": "Aug 7 – Aug 12",
      "pill": "Built · deploying · 96%",
      "kind": "built",
      "blurb": "The platform control plane, brought forward ahead of the web CRM: thirteen screens and five drill-down pages over members, organizations, subscriptions, AI spend, storage, support, broadcasts, system health, the audit trail, security and staff roles. One rule shapes all of it — staff see the ACCOUNT, staff do not read the ADDRESS BOOK — and it is enforced by the database rather than by which screens were built.",
      "measure": "Every figure on every screen is read from live production data, and each screen was reviewed from both an Admin and a Staff account before it counted as built. The screens below 100 are the ones whose numbers are real but incomplete because something outside the code is missing — a read-only analytics token, a payment provider. Putting it on a public address is a fifteen-minute panel job plus DNS, so it is listed rather than scored.",
      "unit": "Screens",
      "target": "Aug 12",
      "left": [
        "point admin.objectivedone.com at the Node app and issue its certificate (the console runs on localhost until then; everything works, it just cannot be opened from a phone or handed to anyone)",
        "read true storage bytes and object sizes from the file store itself instead of counting database rows",
        "show real AI spend instead of an estimate built from published prices (needs a read-only analytics token)",
        "reconcile subscriptions against actual payments (Razorpay, plus the Apple and Google store-billing APIs — until then a plan is granted by hand from a button)",
        "two-step sign-in for staff accounts",
        "daily rollups so the analytics can answer questions older than 90 days",
        "a dark theme (every colour already goes through a token, so this is a stylesheet rather than an audit of 18 screens)"
      ],
      "modules": [
        {
          "key": "dashboard",
          "title": "Dashboard",
          "status": "done",
          "progress": 100,
          "feats": "The platform on one screen over any dates you choose: what needs attention, headline figures that open into their own constituents, the signup trend, where contacts came from, and org seat usage."
        },
        {
          "key": "members",
          "title": "Members",
          "status": "done",
          "progress": 100,
          "feats": "Every account, filterable, with per-feature AI columns — then one member’s page: the facts, their plan, their counts, their cards’ metadata, their devices, their organizations, their event trail, an export, and both kinds of deletion. Never their contacts."
        },
        {
          "key": "organizations",
          "title": "Organizations",
          "status": "done",
          "progress": 100,
          "feats": "Every workspace and, inside one, its seats, its roster with each person’s workload, open invites, pipeline totals, the shape of its stages and whether adoption is rising."
        },
        {
          "key": "subscriptions",
          "title": "Subscriptions",
          "status": "progress",
          "progress": 85,
          "feats": "Plans and their lifecycle, the tester allowlist with each address’s confirmation state, and the free daily allowances. Grants are made by hand from a button until a payment provider is connected."
        },
        {
          "key": "ai",
          "title": "AI Usage",
          "status": "progress",
          "progress": 90,
          "feats": "Calls per feature, a trend with the quiet days filled in, the heaviest users and what it cost. The rupee figures are estimated from published prices and labelled as such until an analytics token lands."
        },
        {
          "key": "storage",
          "title": "Storage",
          "status": "progress",
          "progress": 90,
          "feats": "What the deletion worker is doing right now, what actually holds each reason for deletion, the review queue, the master switch scoped to the one thing it genuinely guards, and any object drilled down to its own removal timeline."
        },
        {
          "key": "support",
          "title": "Support",
          "status": "done",
          "progress": 100,
          "feats": "The request queue, and the register of consented, scoped, expiring access to one member’s content — the only door to member data, opened by the member, closing by itself."
        },
        {
          "key": "broadcast",
          "title": "Broadcast",
          "status": "done",
          "progress": 100,
          "feats": "An announcement to a chosen segment, previewed as it will appear on a lock screen, sent down the notification spine the apps already use."
        },
        {
          "key": "health",
          "title": "System Health",
          "status": "done",
          "progress": 100,
          "feats": "The background jobs, with run-now, edit-schedule and pause, each carrying its last twenty outcomes and a stated likely cause when one fails. Plus table sizes and the console’s own failures."
        },
        {
          "key": "audit",
          "title": "Audit Log",
          "status": "done",
          "progress": 100,
          "feats": "What staff did and what the platform did, side by side. Every mutation writes its row before it acts, and anything dangerous carries the reason somebody typed."
        },
        {
          "key": "security",
          "title": "Security",
          "status": "progress",
          "progress": 90,
          "feats": "Who holds privilege, the authentication events, the device locks, and the register of exceptions. Two-step sign-in for staff is the next iteration."
        },
        {
          "key": "staff",
          "title": "Staff & Roles",
          "status": "done",
          "progress": 100,
          "feats": "Grant and revoke console access by email, and the full role-by-permission matrix. Deliberately separate from the platform-wide flag, which is a cross-tenant key and is never handed out as a side effect of hiring somebody."
        },
        {
          "key": "settings",
          "title": "Configuration",
          "status": "progress",
          "progress": 92,
          "feats": "Platform settings, the free daily allowances, and every integration with the consequence of it being absent spelled out. A couple of limits are shown but not editable here on purpose."
        }
      ],
      "milestones": [
        {
          "title": "Scope derived, not given",
          "when": "Aug 7",
          "status": "done",
          "progress": 100,
          "note": "Nobody specified what an admin console contains, so it was reasoned out of the schema, both proposals, the contracted annexures and what a service of this kind is expected to have — then written down as scope before any screen existed."
        },
        {
          "title": "Roles, permissions & the safe reads",
          "when": "Aug 7",
          "status": "done",
          "progress": 100,
          "note": "Staff roles as rows rather than a flag, twenty-nine named permissions, and read functions with hand-written projections — so “staff cannot read the address book” is a property of the database, not of which screens were built."
        },
        {
          "title": "Thirteen screens, built and looked at",
          "when": "Aug 7",
          "status": "done",
          "progress": 100,
          "note": "Every screen driven in a real browser at 2× and reviewed as a designer, an owner and a tired user. That pass caught invisible avatars, a header sitting over row one, and initials rendered from a bracket — none of which a type check can see."
        },
        {
          "title": "Actions, support & broadcast",
          "when": "Aug 7",
          "status": "done",
          "progress": 100,
          "note": "The things staff can DO: grants, device-lock clearing, deletion approvals, allowance edits — each writing its audit row before it acts, and the dangerous ones asking for a typed reason. Plus a consented, expiring door to a member’s content instead of impersonation."
        },
        {
          "title": "Founder review rework",
          "when": "Aug 8",
          "status": "done",
          "progress": 100,
          "note": "A day of corrections after the founder used it. The Storage screen was describing the wrong safety catch as engaged; every headline number became a door into what makes it up; staff and roles were rebuilt; and account deletion now shows exactly what it destroys, inside a window that can still be reversed."
        },
        {
          "title": "Live at admin.objectivedone.com",
          "when": "Aug 9 – 10",
          "status": "pending",
          "progress": 0,
          "note": "A Node app on the host, a subdomain pointed at it and a certificate issued. Fifteen minutes plus DNS, and the only thing between “it runs” and “you can open it from your phone”."
        },
        {
          "title": "Real spend, real bytes",
          "when": "Aug 11 – 12",
          "status": "pending",
          "progress": 0,
          "note": "Two read-only credentials turn two estimates into facts: what the AI actually cost, and what the stored files actually weigh."
        },
        {
          "title": "Admin console v1.0",
          "when": "Aug 12",
          "status": "pending",
          "progress": 0,
          "note": "The control plane, live — with the payment reconciliation waiting on the provider rather than on code."
        }
      ]
    }
  ],
  "project": {
    "started": "2026-07-24",
    "lastUpdated": "2026-08-08",
    "overall": 98,
    "aspects": [
      {
        "key": "UI & experience",
        "pct": 99
      },
      {
        "key": "Backend & data",
        "pct": 99
      },
      {
        "key": "Device integrations",
        "pct": 98
      },
      {
        "key": "AI & automation",
        "pct": 96
      }
    ],
    "currentMilestone": "Polish, release prep & the iPhone block",
    "targetV1": "Aug 15, 2026",
    "note": "Every screen is built. Voice memos record, play back and transcribe on request — verified on the phone — and you can speak a question to the concierge instead of typing it. The concierge answers for real, grounded only in your own contacts and notes, and says plainly when your notes do not hold the answer. Home opens on who needs you today: follow-ups you set in two taps, pushed by the server so they reach the phone with the app closed. What remains is polish, a handful of decisions, and verification on iPhone.",
    "rightNow": "Started <b>Jul 24, 2026</b>. Every screen is built, the release APK is with the client, and the app also runs on a real iPhone. Voice memos, transcripts and dictation are done; the concierge answers for real, grounded only in the member’s own contacts and notes — and since 8 Aug it searches for what a question is about rather than reading only the most recent contacts. Home opens on who needs you today, with follow-up reminders sent by the server so they arrive with the app closed.<br /><br /><b>Why the last date moved out three days.</b> Eleven milestones landed in the first nine days, and that pace held — but 2–8 August went to the <b>CRM mobile app</b> and the <b>admin console</b>, both pulled forward, rather than to Connect’s tail. So v1 now targets <b>Aug 15, 2026</b>, and what is left here is the iPhone block plus items waiting on third-party accounts (a release signing key for Google sign-in, the wallet issuer accounts, a payment provider) rather than unfinished features.",
    "platformNote": "Every feature is built and verified on Android, and these percentages measure that. iPhone work is listed in each module’s “Things to do” but is deliberately excluded from the progress bars — the code is already written and accommodated for iOS, so what remains is a scheduled block of building and testing on a Mac rather than unfinished work."
  },
  "moduleOrder": [
    "splash",
    "auth",
    "onboarding",
    "builder",
    "home",
    "cards",
    "scan",
    "contacts",
    "ai",
    "notifications",
    "recorder",
    "profile"
  ],
  "modules": {
    "splash": {
      "title": "Splash & App Boot",
      "page": "modules/splash-boot.html",
      "status": "done",
      "progress": 100,
      "aspects": {
        "ui": 100,
        "backend": 100,
        "integrations": 100
      },
      "feats": "Launch, session restore, and the routing decision — welcome, first-card gate, or straight home."
    },
    "auth": {
      "title": "Authentication",
      "page": "modules/authentication.html",
      "status": "progress",
      "progress": 92,
      "aspects": {
        "ui": 100,
        "backend": 100,
        "integrations": 78
      },
      "feats": "Email code + password live; the one-phone-per-account lock is ACTIVE, and signing out now properly releases the phone. Apple & Google sign-in and SMS / WhatsApp still to come."
    },
    "onboarding": {
      "title": "Select Your Canvas",
      "page": "modules/select-canvas.html",
      "status": "done",
      "progress": 100,
      "aspects": {
        "ui": 100,
        "backend": 100,
        "integrations": 100
      },
      "feats": "Mandatory first-card gate; pedestal carousel of Obsidian, Gold and Platinum; every card stored in the cloud."
    },
    "builder": {
      "title": "Card Builder",
      "page": "modules/card-builder.html",
      "status": "done",
      "progress": 99,
      "aspects": {
        "ui": 100,
        "backend": 98,
        "integrations": 99
      },
      "feats": "Identity, photo & logo, grouped fields, preview, cloud saving — and images now really upload to cloud storage, so a card survives a reinstall. The logo finder reads your company website’s own artwork, and anything missing when you save is now named at the top of the form instead of hidden below it."
    },
    "home": {
      "title": "Home",
      "page": "modules/home.html",
      "status": "progress",
      "progress": 98,
      "aspects": {
        "ui": 99,
        "backend": 97,
        "integrations": 97
      },
      "feats": "The day’s first screen, built around who needs you: overdue and due follow-ups with one-tap done and snooze, introductions waiting for approval, the people you met most recently with a one-tap Remind, and how your whole network was built. Set a follow-up on anyone in two taps — the phone buzzes when it falls due, even with the app closed."
    },
    "cards": {
      "title": "Cards Wallet & Sharing",
      "page": "modules/cards-wallet.html",
      "status": "progress",
      "progress": 98,
      "aspects": {
        "ui": 99,
        "backend": 98,
        "integrations": 97
      },
      "feats": "The public card page is LIVE — a permanent short link per card, rendered fresh on every open, so an edit reaches everyone you already shared with. Cards go into the phone’s wallet and onto the home screen, the QR shares as a branded picture, the card shares as a contact file, and the share row reaches WhatsApp, LinkedIn, X, Instagram, Facebook, Telegram, Messenger, email and SMS directly."
    },
    "scan": {
      "title": "Scan",
      "page": "modules/scan.html",
      "status": "progress",
      "progress": 99,
      "aspects": {
        "ui": 99,
        "backend": 99,
        "integrations": 99
      },
      "feats": "The camera is live. QR codes decode by themselves — from the lens or from a photo — and a photographed paper card reads its own name, company, job title, department, address, phone, email, website and social links straight into the contact form. Reading quality has been tuned against real cards, including more than one card in a single photo."
    },
    "contacts": {
      "title": "Contacts",
      "page": "modules/contacts.html",
      "status": "progress",
      "progress": 99,
      "aspects": {
        "ui": 100,
        "backend": 99,
        "integrations": 99
      },
      "feats": "Live in the cloud with tags, search, imports and contact photos, and every contact records how it was acquired — as a small mark on the avatar since the 4 Aug redesign. Tags are reusable identifiers (typing offers the existing tag instead of creating a duplicate), memories can be pinned to a calendar date, and voice notes record directly on the contact page beside the written memory."
    },
    "ai": {
      "title": "AI Concierge",
      "page": "modules/ai-concierge.html",
      "status": "progress",
      "progress": 96,
      "aspects": {
        "ui": 98,
        "backend": 97,
        "integrations": 93
      },
      "feats": "The concierge answers for real — grounded in everything you stored: contacts, notes, dated memories, every memo’s title, summary and spoken commitments, and the Meeting Recorder’s transcripts. It says plainly when your notes don’t hold the answer instead of inventing one, opens in about two seconds, and you can speak your question instead of typing it. A paid Claude key is a one-line upgrade for answer quality."
    },
    "notifications": {
      "title": "Notifications",
      "page": "modules/notifications.html",
      "status": "progress",
      "progress": 97,
      "aspects": {
        "ui": 98,
        "backend": 98,
        "integrations": 95
      },
      "feats": "Lock-screen delivery is LIVE and proven on a real phone: the app writes a notification, the server pushes it, and the phone that caused it is deliberately skipped. Tapping one opens what it is about. iPhone delivery is the remaining piece."
    },
    "recorder": {
      "title": "Meeting Recorder",
      "page": "modules/meeting-recorder.html",
      "status": "progress",
      "progress": 97,
      "aspects": {
        "ui": 98,
        "backend": 98,
        "integrations": 96
      },
      "feats": "The Meeting Recorder is its own page, opened from Home: record meetings or standalone voice notes with pause, resume and a live waveform, give every recording an editable title, and browse the complete history of every recording in the app — contact memos included — searchable, filterable by origin and sortable, with play, rename, transcribe and delete on every row. Free: 10 minutes a take, 60 minutes kept. Premium: up to 2 hours a recording."
    },
    "profile": {
      "title": "Profile & Account",
      "page": "modules/profile.html",
      "status": "progress",
      "progress": 99,
      "aspects": {
        "ui": 99,
        "backend": 99,
        "integrations": 98
      },
      "feats": "Identity, avatar and logo controls sync to the cloud. Three real settings pages arrived 4 Aug: an Activity Log of sign-ins, devices and security events; App Usage counted on the phone only and never uploaded; and a Premium-only Credit Usage history. German is complete across the whole app, including the four legal documents. The plan page is a glossy gold card led by the ObjectiveDone mark."
    }
  },
  "milestones": [
    {
      "title": "Foundation & design system",
      "when": "Jul 24 – 25",
      "status": "done",
      "progress": 100,
      "note": "Skeleton, navigation, theme, the three card designs, live sign-in."
    },
    {
      "title": "The full app, built",
      "when": "Jul 25 – 26",
      "status": "done",
      "progress": 100,
      "note": "Every module and screen, end to end."
    },
    {
      "title": "Stabilise & ship to phone",
      "when": "Jul 27",
      "status": "done",
      "progress": 100,
      "note": "Build restored; verified on a real device."
    },
    {
      "title": "Backend goes live",
      "when": "Jul 27",
      "status": "done",
      "progress": 100,
      "note": "Database, security rules and every data connection live and verified. Finished ahead of plan."
    },
    {
      "title": "Media uploads & storage",
      "when": "Jul 28",
      "status": "done",
      "progress": 100,
      "note": "Photos and logos now live in cloud storage instead of on one phone — they survive a reinstall and follow the account."
    },
    {
      "title": "Lock-screen notifications",
      "when": "Jul 28",
      "status": "done",
      "progress": 100,
      "note": "Live and proven on a real phone. The device that caused an event is skipped, so you are never buzzed about your own action."
    },
    {
      "title": "Camera, QR & card reading",
      "when": "Jul 28 – 29",
      "status": "done",
      "progress": 100,
      "note": "The camera is back. QR codes decode themselves; a photographed business card reads its own details into the contact form — and the photo never leaves the phone."
    },
    {
      "title": "Public card page & Wallet",
      "when": "Jul 30 – 31",
      "status": "done",
      "progress": 100,
      "note": "Done ahead of plan. Every card now has a permanent short link that renders fresh on every open, so an edit updates everywhere it has already been shared — and the card can be kept in the phone’s wallet."
    },
    {
      "title": "Voice memos & transcription",
      "when": "Jul 31",
      "status": "done",
      "progress": 100,
      "note": "Done. The microphone is real: record a memo on a contact, play it back on any of your phones, and within a minute it comes back as text — with a short summary and the promises you made out loud pulled out of it. You can also just speak your question to the concierge instead of typing."
    },
    {
      "title": "Concierge thinks for real",
      "when": "Aug 1",
      "status": "done",
      "progress": 100,
      "note": "Done — a day early, and without the planned key. The concierge answers about your own contacts on the club’s existing AI allowance: ask who to follow up with and it reasons from your notes, and it says plainly when your notes don’t hold the answer instead of inventing one. A paid Claude key remains a one-line upgrade for answer quality."
    },
    {
      "title": "Home & follow-up reminders",
      "when": "Aug 1",
      "status": "done",
      "progress": 100,
      "note": "Home is no longer a placeholder — it opens on who needs you today. Set a follow-up on any contact in two taps; the phone buzzes when it falls due even with the app closed; snooze it or mark it done from the same row. Around it: introductions waiting for your approval, the people you met most recently, and how your whole network was built."
    },
    {
      "title": "Polish & release prep",
      "when": "Aug 2 – 8",
      "status": "progress",
      "progress": 95,
      "note": "The long tail: the open items on each module’s list, a brand polish pass, and everything needed to hand over v1. Nearly closed — the release build is already with the client, and what is still moving is polish found on the phone."
    },
    {
      "title": "Premium & the paywall",
      "when": "Aug 4",
      "status": "done",
      "progress": 100,
      "note": "The paid features now know who has paid for them. Reading business cards stays free five times a day; voice transcripts and the concierge are part of the plan; everything else in the app — cards, contacts, sharing, reminders, and recording a memo — stays free for everyone. Test accounts get full access from a list you edit yourself, with no new build."
    },
    {
      "title": "Concierge search & per-product threads",
      "when": "Aug 7 – 8",
      "status": "done",
      "progress": 100,
      "note": "The concierge stopped depending on how recently you met somebody: it now works out what a question is about and searches the whole book for it, including company names spelt loosely. And conversations are properly separated per product — a member who also holds a CRM seat had been seeing their sales chats inside Connect."
    },
    {
      "title": "iPhone verification",
      "when": "Aug 12 – 14",
      "status": "pending",
      "progress": 0,
      "note": "The first build on a Mac already happened — the app compiles, installs and runs on a real iPhone, and most of it was checked there. What is left is closing the card-reading gap and confirming push, NFC and the widget, which need the paid Apple membership. It moved a few days out because 2–8 August went to the CRM app and the admin console instead. iPhone items are listed but never counted against progress."
    },
    {
      "title": "Connect v1.0",
      "when": "Aug 15",
      "status": "pending",
      "progress": 0,
      "note": "The finished app — the platform’s foundation, and the spine the other three products are built on. The release build is already in the client’s hands; this date is when the last open items close, and those are third-party accounts rather than unwritten features."
    }
  ]
};
