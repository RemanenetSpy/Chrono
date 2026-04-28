// ============================================================
// CHRONOS BLOG REGISTRY
// ============================================================
// When a new article goes live:
//   1. Find the entry below
//   2. Change  live: false  →  live: true
//   3. Push to git — every article updates automatically
//
// To add a new article:
//   Append a new object to the array before the closing ]
//   Keep order: oldest at top, newest at bottom
// ============================================================

const CHRONOS_ARTICLES = [

  // ── PILLAR 1 — Pain Points (Mental Health & Anxiety) ─────

  {
    url:   "/blog/stop-obsessing-2am.html",
    title: "How to stop obsessing over tomorrow's problems at 2 AM",
    tag:   "Pillar 1 · Anxiety",
    live:  true
  },
  {
    url:   "/blog/digital-lockbox-doomscrolling.html",
    title: "The digital lockbox method for severe doomscrolling",
    tag:   "Pillar 1 · Habits",
    live:  true
  },
  {
    url:   "/blog/revenge-bedtime-procrastination.html",
    title: "How to fix revenge bedtime procrastination using intentional friction",
    tag:   "Pillar 1 · Sleep",
    live:  true
  },
  {
    url:   "/blog/decision-fatigue.html",
    title: "Why decision fatigue is ruining your focus — and how to offload it",
    tag:   "Pillar 1 · Focus",
    live:  true
  },
  {
    url:   "/blog/social-media-comparison-trap.html",
    title: "How to stop the social media comparison trap offline",
    tag:   "Pillar 1 · Mental Health",
    live:  true
  },
  {
    url:   "/blog/information-fatigue-syndrome.html",
    title: "Tools to cure information fatigue syndrome",
    tag:   "Pillar 1 · Digital Wellness",
    live:  true
  },
  {
    url:   "/blog/context-switching-deep-work.html",
    title: "How to stop constant context switching during deep work",
    tag:   "Pillar 1 · Focus",
    live:  true
  },
  {
    url:   "/blog/intrusive-thoughts-at-work.html",
    title: "A system to manage intrusive thoughts at work",
    tag:   "Pillar 1 · Mental Health",
    live:  true
  },
  {
    url:   "/blog/wait-24-hours-rule.html",
    title: "The wait 24 hours rule for impulsive texts and emails",
    tag:   "Pillar 1 · Habits",
    live:  true
  },
  {
    url:   "/blog/leave-work-stress-time-vault.html",
    title: "How to leave work stress at the office using a time-vault",
    tag:   "Pillar 1 · Anxiety",
    live:  true
  },
  {
    url:   "/blog/imposter-syndrome-rumination.html",
    title: "Breaking the imposter syndrome rumination loop",
    tag:   "Pillar 1 · Mental Health",
    live:  false
  },
  {
    url:   "/blog/stop-checking-analytics.html",
    title: "How to stop checking your startup analytics every 5 minutes",
    tag:   "Pillar 1 · Focus",
    live:  false
  },
  {
    url:   "/blog/weekend-tech-freeze.html",
    title: "The weekend tech-freeze protocol for digital burnout",
    tag:   "Pillar 1 · Habits",
    live:  false
  },
  {
    url:   "/blog/break-digital-habits-friction.html",
    title: "Using friction to break your worst digital habits",
    tag:   "Pillar 1 · Habits",
    live:  false
  },
  {
    url:   "/blog/pre-meeting-panic-dump.html",
    title: "Pre-meeting panic: How to dump your thoughts securely",
    tag:   "Pillar 1 · Anxiety",
    live:  false
  },
  {
    url:   "/blog/adhd-hyperfocus-time-locked.html",
    title: "Managing ADHD hyperfocus with time-locked systems",
    tag:   "Pillar 1 · Focus",
    live:  false
  },
  {
    url:   "/blog/cognitive-load-overwhelmed-founders.html",
    title: "Reducing cognitive load: A guide for overwhelmed founders",
    tag:   "Pillar 1 · Focus",
    live:  false
  },
  {
    url:   "/blog/post-scrolling-cognitive-reset.html",
    title: "Post-scrolling guilt and how to do a hard cognitive reset",
    tag:   "Pillar 1 · Habits",
    live:  false
  },
  {
    url:   "/blog/cant-sit-in-silence.html",
    title: "Why you can't sit in silence anymore — and how to fix it",
    tag:   "Pillar 1 · Digital Wellness",
    live:  false
  },
  {
    url:   "/blog/decision-fatigue-impulsive-buying.html",
    title: "A locked-system approach for impulsive online buyers",
    tag:   "Pillar 1 · Habits",
    live:  false
  },

  // ── PILLAR 2 — Philosophy & Digital Minimalism ────────────

  {
    url:   "/blog/digital-minimalism-principles.html",
    title: "Core principles of digital minimalism in a noisy world",
    tag:   "Pillar 2 · Minimalism",
    live:  true
  },
  {
    url:   "/blog/cognitive-offloading-neuroscience.html",
    title: "What is cognitive offloading? The neuroscience of writing things down",
    tag:   "Pillar 2 · Neuroscience",
    live:  true
  },
  {
    url:   "/blog/intentional-friction-ux.html",
    title: "Intentional friction: Why good UX is sometimes making things harder",
    tag:   "Pillar 2 · Philosophy",
    live:  true
  },
  {
    url:   "/blog/jomo-joy-of-missing-out.html",
    title: "JOMO — Joy of Missing Out — and how to actually achieve it",
    tag:   "Pillar 2 · Lifestyle",
    live:  true
  },
  {
    url:   "/blog/stoicism-technology.html",
    title: "Stoicism and technology: How to control your digital environment",
    tag:   "Pillar 2 · Philosophy",
    live:  true
  },
  {
    url:   "/blog/psychology-delayed-gratification.html",
    title: "The psychology of delayed gratification in software design",
    tag:   "Pillar 2 · Philosophy",
    live:  true
  },
  {
    url:   "/blog/ephemeral-journaling.html",
    title: "Ephemeral journaling: Why your thoughts shouldn't live forever",
    tag:   "Pillar 2 · Minimalism",
    live:  true
  },
  {
    url:   "/blog/slow-web-movement.html",
    title: "The Slow Web movement explained",
    tag:   "Pillar 2 · Philosophy",
    live:  true
  },
  {
    url:   "/blog/attention-as-finite-currency.html",
    title: "Treating your attention span as a finite currency",
    tag:   "Pillar 2 · Minimalism",
    live:  true
  },
  {
    url:   "/blog/digital-boredom-creativity.html",
    title: "Embracing digital boredom to unlock creativity",
    tag:   "Pillar 2 · Lifestyle",
    live:  true
  },

  // ── PILLAR 3 — Architecture & Privacy ────────────────────

  {
    url:   "/blog/offline-first-architecture.html",
    title: "What is offline-first architecture in web development?",
    tag:   "Pillar 3 · Privacy",
    live:  true
  },
  {
    url:   "/blog/cloud-worst-place-journal.html",
    title: "Why the cloud is the worst place for your personal journal",
    tag:   "Pillar 3 · Privacy",
    live:  true
  },
  {
    url:   "/blog/zero-knowledge-web-app.html",
    title: "How to build a zero-knowledge web app on Vercel",
    tag:   "Pillar 3 · Tech",
    live:  true
  },
  {
    url:   "/blog/client-side-encryption-basics.html",
    title: "Client-side encryption basics for indie hackers",
    tag:   "Pillar 3 · Tech",
    live:  false
  },
  {
    url:   "/blog/data-sovereignty-2026.html",
    title: "Data sovereignty in 2026: Owning your own thoughts",
    tag:   "Pillar 3 · Privacy",
    live:  false
  },
  {
    url:   "/blog/no-login-web-apps-privacy.html",
    title: "Why no-login web apps are the future of user privacy",
    tag:   "Pillar 3 · Privacy",
    live:  false
  },
  {
    url:   "/blog/ai-scraping-digital-diaries.html",
    title: "The danger of AI companies scraping your digital diaries",
    tag:   "Pillar 3 · Privacy",
    live:  false
  },
  {
    url:   "/blog/private-note-taking-web.html",
    title: "How to achieve truly private note-taking on the web",
    tag:   "Pillar 3 · Privacy",
    live:  false
  },
  {
    url:   "/blog/pwa-bypass-app-store.html",
    title: "Using Progressive Web Apps to bypass the App Store",
    tag:   "Pillar 3 · Tech",
    live:  false
  },
  {
    url:   "/blog/anti-addictive-software.html",
    title: "How to design anti-addictive software architectures",
    tag:   "Pillar 3 · Tech",
    live:  false
  },

  // ── PILLAR 4 — Alternatives & Comparisons ────────────────

  {
    url:   "/blog/day-one-alternatives-privacy.html",
    title: "The best Day One app alternatives for absolute privacy",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/offline-first-journaling-apps.html",
    title: "The 5 best offline-first journaling apps",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/apple-journal-privacy-concerns.html",
    title: "Apple Journal privacy concerns — and why offline is better",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/notion-vs-offline-vaults.html",
    title: "Notion vs. Offline Vaults for personal journaling",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/standard-notes-vs-local-apps.html",
    title: "Standard Notes vs. Local-only offline apps",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/evernote-alternatives-minimalists.html",
    title: "Evernote alternatives for digital minimalists",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/30-day-digital-detox-apps.html",
    title: "The best apps for a 30-day digital detox",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/ai-journals-vs-offline-vaults.html",
    title: "AI-powered journals vs. dumb offline vaults",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/secure-diary-apps-no-account.html",
    title: "Secure diary apps that don't force you to make an account",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },
  {
    url:   "/blog/minimalist-writing-apps.html",
    title: "The most minimalist writing apps on the internet",
    tag:   "Pillar 4 · Alternatives",
    live:  false
  },

  // ── PILLAR 5 — Use Cases ──────────────────────────────────

  {
    url:   "/blog/letters-to-future-self.html",
    title: "Writing letters to your future self — the 1-year time capsule",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/anger-management-lockbox.html",
    title: "The anger management lockbox: where to put unsent messages",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/dopamine-fast-digital-vault.html",
    title: "How to do a 30-day dopamine fast using a digital vault",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/time-lock-app-breakup.html",
    title: "Using a time-lock app to survive a bad breakup",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/burn-after-reading-digital.html",
    title: "The burn after reading digital method for sensitive thoughts",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/clear-mind-before-sleep.html",
    title: "How to clear your mind before sleep without using a screen",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/startup-ideas-secure-vault.html",
    title: "Where to store sensitive startup ideas before they are ready",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/six-month-delay-idea-test.html",
    title: "The 6-month delay: How to test if an idea is actually good",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/stop-text-regret-quarantine.html",
    title: "How to stop text-regret with a 24-hour quarantine vault",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  },
  {
    url:   "/blog/chronos-ultimate-guide.html",
    title: "Using CHRONOS: The ultimate guide to the offline time-vault",
    tag:   "Pillar 5 · Use Cases",
    live:  false
  }

];

// ============================================================
// ENGINE — do not edit below this line
// ============================================================

(function () {
  const container = document.getElementById("chronos-related");
  if (!container) return;

  const currentUrl = window.location.pathname;
  const currentIndex = CHRONOS_ARTICLES.findIndex(a => a.url === currentUrl);

  const others   = CHRONOS_ARTICLES.filter(a => a.url !== currentUrl);
  const live     = others.filter(a => a.live);
  const upcoming = others.filter(a => !a.live);

  // Sort live articles by proximity to the current article in the registry
  const sortedLive = live.slice().sort((a, b) => {
    const ai = CHRONOS_ARTICLES.findIndex(x => x.url === a.url);
    const bi = CHRONOS_ARTICLES.findIndex(x => x.url === b.url);
    return Math.abs(ai - currentIndex) - Math.abs(bi - currentIndex);
  });

  // Build the 3-card display: up to 2 live, pad with upcoming
  const toShow = sortedLive.slice(0, 2);
  for (let i = 0; toShow.length < 3 && i < upcoming.length; i++) {
    toShow.push(upcoming[i]);
  }

  const cards = toShow.map(article => {
    if (article.live) {
      return `<a href="${article.url}" class="chronos-related-card">
        <p class="chronos-related-tag">${article.tag}</p>
        <h4>${article.title}</h4>
      </a>`;
    }
    return `<div class="chronos-related-card chronos-related-dead">
      <p class="chronos-related-tag">${article.tag}</p>
      <h4>${article.title}</h4>
      <p class="chronos-coming-soon">Coming soon</p>
    </div>`;
  }).join('');

  container.innerHTML = `
    <p class="chronos-related-label">Continue Reading</p>
    <div class="chronos-related-grid">${cards}</div>
  `;
})();
