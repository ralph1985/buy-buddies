const STORAGE_KEY = 'bb.cookieConsent.v1' as const;

export type CookieCategories = 'analytics' | 'marketing';
export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

function parse(json: string | null): CookieConsent | null {
  if (!json) return null;
  try {
    const obj = JSON.parse(json);
    if (
      typeof obj === 'object' && obj &&
      obj.necessary === true &&
      typeof obj.analytics === 'boolean' &&
      typeof obj.marketing === 'boolean' &&
      typeof obj.timestamp === 'number'
    ) return obj as CookieConsent;
    return null;
  } catch { return null; }
}

export function getConsent(): CookieConsent | null {
  return parse(localStorage.getItem(STORAGE_KEY));
}

export function saveConsent(consent: CookieConsent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  if (consent.analytics || consent.marketing) {
    window.dispatchEvent(new CustomEvent('cookie-consent-granted', { detail: consent }));
  }
}

export function hasConsent(cat: CookieCategories): boolean {
  const c = getConsent();
  return !!c && c[cat] === true;
}

export function onConsentGranted(cb: (consent: CookieConsent) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent).detail as CookieConsent);
  window.addEventListener('cookie-consent-granted', handler as EventListener);
  return () => window.removeEventListener('cookie-consent-granted', handler as EventListener);
}
