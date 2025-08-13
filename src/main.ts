import { initializeBugsnag } from './bugsnag.js';
import { hasConsent, onConsentGranted } from './domain/privacy/cookieConsent.js';

// Inicializar Bugsnag sólo si existe consentimiento analítico
if (hasConsent('analytics')) {
  initializeBugsnag(import.meta.env.VITE_BUGSNAG_KEY as string | undefined);
} else {
  onConsentGranted((c) => {
    if (c.analytics) {
      initializeBugsnag(import.meta.env.VITE_BUGSNAG_KEY as string | undefined);
    }
  });
}

import './ui/app-root.js';
import './ui/components/cookie-consent.js';
