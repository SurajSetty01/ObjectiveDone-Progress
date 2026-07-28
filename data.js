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
     = 0.20(94) + 0.35(95) + 0.30(65) + 0.15(40) = 77.5 → 78
   The generator refuses to write this file if that arithmetic breaks. */
window.OD_DATA = {
  "project": {
    "started": "2026-07-24",
    "lastUpdated": "2026-07-28",
    "overall": 78,
    "aspects": [
      {
        "key": "UI & experience",
        "pct": 94
      },
      {
        "key": "Backend & data",
        "pct": 95
      },
      {
        "key": "Device integrations",
        "pct": 65
      },
      {
        "key": "AI & automation",
        "pct": 40
      }
    ],
    "currentMilestone": "M6 · Scanning, card reading & location",
    "targetV1": "Aug 15, 2026",
    "note": "Three milestones landed in two days. Photos and logos now upload to cloud storage; lock-screen notifications are live and proven on a real phone; and the camera is back — scanning a paper card reads its details automatically, and QR codes decode instantly. What remains is the microphone (voice memos and transcripts), the AI concierge’s own key, Wallet passes and the public card page, then the first iPhone build."
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
      "progress": 80,
      "aspects": {
        "ui": 100,
        "backend": 98,
        "integrations": 40
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
      "progress": 94,
      "aspects": {
        "ui": 95,
        "backend": 98,
        "integrations": 92
      },
      "feats": "Identity, photo & logo, grouped fields, preview, cloud saving — and images now really upload to cloud storage, so a card survives a reinstall. Abandoning the form cleans up after itself."
    },
    "home": {
      "title": "Home",
      "page": "modules/home.html",
      "status": "brainstorm",
      "progress": 0,
      "aspects": {
        "ui": 0,
        "backend": 0,
        "integrations": 0
      },
      "feats": "Deliberately empty for now — this surface waits for the CRM and Admin products, so its features can be decided with them instead of guessed today."
    },
    "cards": {
      "title": "Cards Wallet & Sharing",
      "page": "modules/cards-wallet.html",
      "status": "progress",
      "progress": 72,
      "aspects": {
        "ui": 95,
        "backend": 85,
        "integrations": 45
      },
      "feats": "Wallet, flip-to-QR and NFC writing work on live cloud data, and card artwork is now real cloud media. The public page a shared link opens is still the big gap."
    },
    "scan": {
      "title": "Scan",
      "page": "modules/scan.html",
      "status": "progress",
      "progress": 93,
      "aspects": {
        "ui": 98,
        "backend": 92,
        "integrations": 90
      },
      "feats": "The camera is live. QR codes decode by themselves — from the lens or from a photo — and a photographed paper card reads its own name, company, job title, department, address, phone, email, website and social links straight into the contact form."
    },
    "contacts": {
      "title": "Contacts",
      "page": "modules/contacts.html",
      "status": "progress",
      "progress": 85,
      "aspects": {
        "ui": 96,
        "backend": 95,
        "integrations": 60
      },
      "feats": "Live in the cloud with tags, search, imports and contact photos. Address, department and social links are now stored properly, and “where we met” has real place search. Recording and transcripts are the remaining gap."
    },
    "ai": {
      "title": "AI Concierge",
      "page": "modules/ai-concierge.html",
      "status": "progress",
      "progress": 62,
      "aspects": {
        "ui": 90,
        "backend": 85,
        "integrations": 12
      },
      "feats": "Chats persist in the cloud and the answering service is deployed — it still needs one API key to start replying for real. (The card-reading AI used by Scan is a separate service and is already running.)"
    },
    "notifications": {
      "title": "Notifications",
      "page": "modules/notifications.html",
      "status": "progress",
      "progress": 88,
      "aspects": {
        "ui": 96,
        "backend": 95,
        "integrations": 75
      },
      "feats": "Lock-screen delivery is LIVE and proven on a real phone: the app writes a notification, the server pushes it, and the phone that caused it is deliberately skipped. Tapping one opens what it is about. iPhone delivery is the remaining piece."
    },
    "profile": {
      "title": "Profile & Account",
      "page": "modules/profile.html",
      "status": "progress",
      "progress": 92,
      "aspects": {
        "ui": 100,
        "backend": 96,
        "integrations": 80
      },
      "feats": "Identity, avatar and logo controls sync to the cloud, and the avatar image itself now really uploads. Signing out clears cached media so the next account never sees the last one’s photos."
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
      "title": "Voice memos & transcription",
      "when": "Jul 30 – Aug 2",
      "status": "pending",
      "progress": 0,
      "note": "The microphone returns: record a memo on a contact, then turn it into text automatically."
    },
    {
      "title": "Concierge thinks for real",
      "when": "Aug 3 – 5",
      "status": "pending",
      "progress": 0,
      "note": "The AI key goes in; memo transcripts feed its memory."
    },
    {
      "title": "Public card page & Wallet",
      "when": "Aug 6 – 9",
      "status": "pending",
      "progress": 0,
      "note": "The page a shared link opens, and passes you can keep in Apple/Google Wallet."
    },
    {
      "title": "Polish, iPhone & release prep",
      "when": "Aug 10 – 14",
      "status": "pending",
      "progress": 0,
      "note": "Final polish, the first iPhone build, and everything needed to hand over v1."
    },
    {
      "title": "Connect v1.0",
      "when": "Aug 15",
      "status": "pending",
      "progress": 0,
      "note": "The finished app — the CRM foundation."
    }
  ]
};
