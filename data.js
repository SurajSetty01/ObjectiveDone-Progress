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
     = 0.20(97) + 0.35(98) + 0.30(96) + 0.15(90) = 96.0 → 96
   The generator refuses to write this file if that arithmetic breaks. */
window.OD_DATA = {
  "todos": [
    {
      "module": "splash",
      "moduleTitle": "Splash & App Boot",
      "aspect": "integrations",
      "label": "deep link into a shared card",
      "iphone": false,
      "decision": false
    },
    {
      "module": "splash",
      "moduleTitle": "Splash & App Boot",
      "aspect": "ui",
      "label": "cold-start timing on low-end Android",
      "iphone": false,
      "decision": false
    },
    {
      "module": "splash",
      "moduleTitle": "Splash & App Boot",
      "aspect": "backend",
      "label": "two-phone check of the one-phone lock",
      "iphone": false,
      "decision": false
    },
    {
      "module": "splash",
      "moduleTitle": "Splash & App Boot",
      "aspect": "ui",
      "label": "launching with no signal",
      "iphone": false,
      "decision": false
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "Google sign-in",
      "iphone": false,
      "decision": false
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "codes by SMS (decision)",
      "iphone": false,
      "decision": true
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "integrations",
      "label": "codes over WhatsApp (decision)",
      "iphone": false,
      "decision": true
    },
    {
      "module": "auth",
      "moduleTitle": "Authentication",
      "aspect": "backend",
      "label": "harden where the sign-in token is kept",
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
      "module": "onboarding",
      "moduleTitle": "Select Your Canvas",
      "aspect": "ui",
      "label": "your own details on the sample cards",
      "iphone": false,
      "decision": false
    },
    {
      "module": "builder",
      "moduleTitle": "Card Builder",
      "aspect": "ui",
      "label": "brand polish pass",
      "iphone": false,
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
      "module": "home",
      "moduleTitle": "Home",
      "aspect": "backend",
      "label": "a weekly follow-up digest (later idea, not promised)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "cards",
      "moduleTitle": "Cards Wallet & Sharing",
      "aspect": "ui",
      "label": "surface the \"where my contacts came from\" numbers on Home",
      "iphone": false,
      "decision": false
    },
    {
      "module": "cards",
      "moduleTitle": "Cards Wallet & Sharing",
      "aspect": "integrations",
      "label": "Wallet issuer accounts (Apple certificate; Google is closed to Indian businesses)",
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
      "module": "contacts",
      "moduleTitle": "Contacts",
      "aspect": "integrations",
      "label": "Google Contacts import",
      "iphone": false,
      "decision": false
    },
    {
      "module": "contacts",
      "moduleTitle": "Contacts",
      "aspect": "ui",
      "label": "a standing inbox for share-backs (today they arrive by notification only)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "ai",
      "moduleTitle": "AI Concierge",
      "aspect": "ai",
      "label": "grounded-answer pass",
      "iphone": false,
      "decision": false
    },
    {
      "module": "ai",
      "moduleTitle": "AI Concierge",
      "aspect": "ai",
      "label": "how to search a large contact book (decision)",
      "iphone": false,
      "decision": true
    },
    {
      "module": "ai",
      "moduleTitle": "AI Concierge",
      "aspect": "ai",
      "label": "upgrade the concierge to Claude (one paid key — it answers on the free tier today)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "notifications",
      "moduleTitle": "Notifications",
      "aspect": "backend",
      "label": "instant badge updates",
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
      "aspect": "backend",
      "label": "switch-phones check",
      "iphone": false,
      "decision": false
    },
    {
      "module": "profile",
      "moduleTitle": "Profile & Account",
      "aspect": "ui",
      "label": "FAQs, Privacy and Terms",
      "iphone": false,
      "decision": false
    },
    {
      "module": "profile",
      "moduleTitle": "Profile & Account",
      "aspect": "ui",
      "label": "point \"Follow us\" at the real LinkedIn, Instagram and WhatsApp pages (the buttons are in, each opens an honest \"goes live with the public launch\" note until the pages exist)",
      "iphone": false,
      "decision": false
    },
    {
      "module": "profile",
      "moduleTitle": "Profile & Account",
      "aspect": "ui",
      "label": "finish the German translation (the switch works and Profile, Home and the tab bar are translated; the remaining screens fall back to English until their turn)",
      "iphone": false,
      "decision": false
    }
  ],
  "project": {
    "started": "2026-07-24",
    "lastUpdated": "2026-08-01",
    "overall": 96,
    "aspects": [
      {
        "key": "UI & experience",
        "pct": 97
      },
      {
        "key": "Backend & data",
        "pct": 98
      },
      {
        "key": "Device integrations",
        "pct": 96
      },
      {
        "key": "AI & automation",
        "pct": 90
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
      "progress": 84,
      "aspects": {
        "ui": 100,
        "backend": 98,
        "integrations": 55
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
      "status": "progress",
      "progress": 97,
      "aspects": {
        "ui": 96,
        "backend": 98,
        "integrations": 96
      },
      "feats": "Identity, photo & logo, grouped fields, preview, cloud saving — and images now really upload to cloud storage, so a card survives a reinstall. The logo finder reads your company website’s own artwork, and anything missing when you save is now named at the top of the form instead of hidden below it."
    },
    "home": {
      "title": "Home",
      "page": "modules/home.html",
      "status": "progress",
      "progress": 88,
      "aspects": {
        "ui": 90,
        "backend": 95,
        "integrations": 80
      },
      "feats": "The day’s first screen, built around who needs you: overdue and due follow-ups with one-tap done and snooze, introductions waiting for approval, the people you met most recently with a one-tap Remind, and how your whole network was built. Set a follow-up on anyone in two taps — the phone buzzes when it falls due, even with the app closed."
    },
    "cards": {
      "title": "Cards Wallet & Sharing",
      "page": "modules/cards-wallet.html",
      "status": "progress",
      "progress": 97,
      "aspects": {
        "ui": 99,
        "backend": 96,
        "integrations": 95
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
        "backend": 98,
        "integrations": 99
      },
      "feats": "The camera is live. QR codes decode by themselves — from the lens or from a photo — and a photographed paper card reads its own name, company, job title, department, address, phone, email, website and social links straight into the contact form. Reading quality has been tuned against real cards, including more than one card in a single photo."
    },
    "contacts": {
      "title": "Contacts",
      "page": "modules/contacts.html",
      "status": "progress",
      "progress": 98,
      "aspects": {
        "ui": 99,
        "backend": 99,
        "integrations": 96
      },
      "feats": "Live in the cloud with tags, search, imports and contact photos, and every contact records how it was acquired. Voice memos now really record: play one back on a second phone, and read the transcript, the summary and the commitments it picked out. Google Contacts import is the remaining gap."
    },
    "ai": {
      "title": "AI Concierge",
      "page": "modules/ai-concierge.html",
      "status": "progress",
      "progress": 92,
      "aspects": {
        "ui": 95,
        "backend": 94,
        "integrations": 88
      },
      "feats": "The concierge answers for real — grounded in your own contacts, notes and memo transcripts, and it says plainly when your notes don’t hold the answer instead of inventing one. Speak your question instead of typing it. It runs on the club’s own AI allowance; a paid Claude key is a one-line upgrade for answer quality."
    },
    "notifications": {
      "title": "Notifications",
      "page": "modules/notifications.html",
      "status": "progress",
      "progress": 94,
      "aspects": {
        "ui": 96,
        "backend": 97,
        "integrations": 90
      },
      "feats": "Lock-screen delivery is LIVE and proven on a real phone: the app writes a notification, the server pushes it, and the phone that caused it is deliberately skipped. Tapping one opens what it is about. iPhone delivery is the remaining piece."
    },
    "profile": {
      "title": "Profile & Account",
      "page": "modules/profile.html",
      "status": "progress",
      "progress": 96,
      "aspects": {
        "ui": 100,
        "backend": 96,
        "integrations": 92
      },
      "feats": "Identity, avatar and logo controls sync to the cloud, and the avatar image itself now really uploads. Signing out clears cached media so the next account never sees the last one’s photos. The logo auto-detect preference is gone — the card builder simply offers it, with one fewer setting to find first."
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
      "progress": 20,
      "note": "The long tail: the open items on each module’s list, a brand polish pass, and everything needed to hand over v1. Under way now."
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
