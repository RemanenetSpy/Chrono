// ============================================================
// CHRONOS BLOG REGISTRY
// ============================================================
// When a new article goes live, add it to this array.
// Every article's "Continue Reading" section updates automatically.
// Order matters — newest at the bottom.
// ============================================================

const CHRONOS_ARTICLES = [
  {
    url: "/blog/stop-obsessing-2am.html",
    title: "How to stop obsessing over tomorrow's problems at 2 AM",
    tag: "Pillar 1 · Anxiety",
    live: true
  },
  {
    url: "/blog/digital-lockbox-doomscrolling.html",
    title: "The digital lockbox method for severe doomscrolling",
    tag: "Pillar 1 · Habits",
    live: true
  },
  {
    url: "/blog/revenge-bedtime-procrastination.html",
    title: "How to fix revenge bedtime procrastination using intentional friction",
    tag: "Pillar 1 · Anxiety",
    live: true
  },
  {
    url: "/blog/decision-fatigue.html",
    title: "Why decision fatigue is ruining your focus — and how to offload it",
    tag: "Pillar 1 · Focus",
    live: true
  },
  {
    url: "/blog/cognitive-load-overwhelmed-founders.html",
    title: "Reducing cognitive load: A guide for overwhelmed founders",
    tag: "Pillar 1 · Focus",
    live: false
  },
  {
    url: "/blog/social-media-comparison-trap.html",
    title: "How to stop the social media comparison trap offline",
    tag: "Pillar 1 · Mental Health",
    live: true
  },
  {
    url: "/blog/information-fatigue-syndrome.html",
    title: "Tools to cure information fatigue syndrome",
    tag: "Pillar 1 · Digital Wellness",
    live: true
  },
  {
    url: "/blog/context-switching-deep-work.html",
    title: "How to stop constant context switching during deep work",
    tag: "Pillar 1 · Focus",
    live: true
  },
  {
    url: "/blog/intrusive-thoughts-at-work.html",
    title: "A system to manage intrusive thoughts at work",
    tag: "Pillar 1 · Mental Health",
    live: true
  },
  {
    url: "/blog/wait-24-hours-rule.html",
    title: "The wait 24 hours rule for impulsive texts and emails",
    tag: "Pillar 1 · Habits",
    live: true 
  }
  // Add more as they go live...
];

// ============================================================
// ENGINE — do not edit below this line
// ============================================================

(function () {
  const container = document.getElementById("chronos-related");
  if (!container) return;

  // Get current page URL
  const currentUrl = window.location.pathname;

  // Filter: exclude current article, show 3 closest live articles first, then upcoming
  const others = CHRONOS_ARTICLES.filter(a => a.url !== currentUrl);
  const live = others.filter(a => a.live);
  const upcoming = others.filter(a => !a.live);

  // Show 1 live + 2 upcoming, or 2 live + 1 upcoming, depending on availability
  const toShow = [...live.slice(0, 2), ...upcoming.slice(0, 1)];
  // Pad to always show 3 cards
  while (toShow.length < 3 && upcoming.length > toShow.filter(a => !a.live).length) {
    const next = upcoming[toShow.filter(a => !a.live).length];
    if (next && !toShow.includes(next)) toShow.push(next);
    else break;
  }

  const cards = toShow.slice(0, 3).map(article => {
    if (article.live) {
      return `
        <a href="${article.url}" class="chronos-related-card">
          <p class="chronos-related-tag">${article.tag}</p>
          <h4>${article.title}</h4>
        </a>`;
    } else {
      return `
        <div class="chronos-related-card chronos-related-dead">
          <p class="chronos-related-tag">${article.tag}</p>
          <h4>${article.title}</h4>
          <p class="chronos-coming-soon">Coming soon</p>
        </div>`;
    }
  }).join('');

  container.innerHTML = `
    <p class="chronos-related-label">Continue Reading</p>
    <div class="chronos-related-grid">${cards}</div>
  `;
})();
