import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';

vi.mock('@material/web/button/filled-button.js', () => ({}));
vi.mock('@material/web/button/outlined-button.js', () => ({}));
vi.mock('@material/web/dialog/dialog.js', () => ({}));
vi.mock('@material/web/checkbox/checkbox.js', () => ({}));

import './cookie-consent.js';

describe('<cookie-consent>', () => {
  beforeEach(() => localStorage.clear());

  it('shows banner when no consent', async () => {
    const el = await fixture<HTMLDivElement>(html`<cookie-consent></cookie-consent>`);
    const banner = el.shadowRoot!.querySelector('[data-test-id="cookie-banner"]') as HTMLElement;
    expect(getComputedStyle(banner).display).not.toBe('none');
  });

  it('hides banner when consent exists', async () => {
    localStorage.setItem('bb.cookieConsent.v1', JSON.stringify({
      necessary: true, analytics: false, marketing: false, timestamp: Date.now()
    }));
    const el = await fixture<HTMLDivElement>(html`<cookie-consent></cookie-consent>`);
    const banner = el.shadowRoot!.querySelector('[data-test-id="cookie-banner"]') as HTMLElement;
    expect(getComputedStyle(banner).display).toBe('none');
  });
});
