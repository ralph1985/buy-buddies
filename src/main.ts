import { initializeBugsnag } from './bugsnag.js';
import { hasConsent, onConsentGranted } from './domain/privacy/cookieConsent.js';
import { createI18n } from './domain/i18n/i18n.service.js';
import { loadLang, saveLang } from './infrastructure/storage/localLanguage.repository.js';

export const i18n = createI18n(loadLang());
i18n.subscribe(() => saveLang(i18n.getLang()));

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
