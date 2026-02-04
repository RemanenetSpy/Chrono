
/**
 * Simple wrapper for Google Analytics tracking.
 * Ensures privacy and prevents errors if script is blocked.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackPageView = (viewName: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: viewName,
      page_path: `/${viewName.toLowerCase()}`,
    });
  }
};

export const trackEvent = (action: string, params?: object) => {
  if (window.gtag) {
    window.gtag('event', action, params);
  }
};

export const analytics = {
  viewVault: () => trackPageView('Vault'),
  viewMemoir: () => trackPageView('Memoir'),
  viewCompose: () => trackPageView('Compose'),
  viewDetail: (id: string) => trackPageView(`Detail/${id}`),
  
  sealCapsule: (durationLabel: string) => trackEvent('seal_capsule', {
    duration_selected: durationLabel
  }),
  
  revealCapsule: () => trackEvent('reveal_capsule'),
  
  burnArchive: () => trackEvent('burn_archive')
};
