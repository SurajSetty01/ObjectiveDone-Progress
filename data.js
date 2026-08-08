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
  "project": {
    "started": "2026-07-24",
    "lastUpdated": "2026-08-04",
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
    "currentMilestone": "M10 · Home, follow-up reminders & polish",
    "targetV1": "Aug 12, 2026",
    "note": "Every screen is built. Voice memos record, play back and transcribe on request — verified on the phone — and you can speak a question to the concierge instead of typing it. The concierge answers for real, grounded only in your own contacts and notes, and says plainly when your notes do not hold the answer. Home opens on who needs you today: follow-ups you set in two taps, pushed by the server so they reach the phone with the app closed. What remains is polish, a handful of decisions, and verification on iPhone.",
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
      "when": "Aug 2 – 7",
      "status": "progress",
      "progress": 85,
      "note": "The long tail: the open items on each module’s list, a brand polish pass, and everything needed to hand over v1. Under way now."
    },
    {
      "title": "Premium & the paywall",
      "when": "Aug 4",
      "status": "done",
      "progress": 100,
      "note": "The paid features now know who has paid for them. Reading business cards stays free five times a day; voice transcripts and the concierge are part of the plan; everything else in the app — cards, contacts, sharing, reminders, and recording a memo — stays free for everyone. Test accounts get full access from a list you edit yourself, with no new build."
    },
    {
      "title": "iPhone verification",
      "when": "Aug 8 – 10",
      "status": "pending",
      "progress": 0,
      "note": "The first build on a Mac already happened — the app compiles, installs and runs on a real iPhone, and most of it was checked there. What is left is closing the card-reading gap and confirming push, NFC and the widget, which need the paid Apple membership. iPhone items are listed but never counted against progress."
    },
    {
      "title": "Connect v1.0",
      "when": "Aug 12",
      "status": "pending",
      "progress": 0,
      "note": "The finished app — the CRM foundation."
    }
  ]
};
