import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getConsent, saveConsent, hasConsent, onConsentGranted, type CookieConsent } from './cookieConsent.js';

const base: CookieConsent = { necessary: true, analytics: false, marketing: false, timestamp: 1 };

describe('cookieConsent service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when empty', () => {
    expect(getConsent()).toBeNull();
  });

  it('saves and reads consent', () => {
    const c = { ...base, analytics: true, timestamp: Date.now() };
    saveConsent(c);
    expect(getConsent()).toEqual(c);
  });

  it('hasConsent respects categories', () => {
    saveConsent({ ...base, analytics: true, timestamp: Date.now() });
    expect(hasConsent('analytics')).toBe(true);
    expect(hasConsent('marketing')).toBe(false);
  });

  it('emits event when granted', () => {
    const spy = vi.fn();
    const off = onConsentGranted(spy);
    saveConsent({ ...base, analytics: true, timestamp: Date.now() });
    expect(spy).toHaveBeenCalledTimes(1);
    off();
  });
});
