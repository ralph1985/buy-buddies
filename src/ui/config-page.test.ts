import { fixture, html } from '@open-wc/testing';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));
vi.mock('@material/web/checkbox/checkbox.js', () => ({}));

import './config-page.js';

if (!customElements.get('md-outlined-text-field')) {
  customElements.define(
    'md-outlined-text-field',
    class extends HTMLElement {
      value = '';
    },
  );
}

if (!customElements.get('md-checkbox')) {
  customElements.define(
    'md-checkbox',
    class extends HTMLElement {
      checked = false;
    },
  );
}

describe('config-page component', () => {
  it('stores googleSheetID in localStorage', async () => {
    localStorage.clear();
    localStorage.setItem('googleSheetID', 'initial');
    const el = await fixture<any>(html`<config-page></config-page>`);
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('md-outlined-text-field') as any;
    expect(input.value).toBe('initial');
    input.value = 'new-id';
    input.dispatchEvent(new Event('input'));
    expect(localStorage.getItem('googleSheetID')).toBe('new-id');
  });

  it('reflects and updates cookie consent', async () => {
    localStorage.clear();
    localStorage.setItem(
      'bb.cookieConsent.v1',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: Date.now(),
      }),
    );
    const el = await fixture<any>(html`<config-page></config-page>`);
    await el.updateComplete;
    const analytics = el.shadowRoot!.querySelector('[data-test-id="config-analytics"]') as any;
    const marketing = el.shadowRoot!.querySelector('[data-test-id="config-marketing"]') as any;
    expect(analytics.checked).toBe(true);
    expect(marketing.checked).toBe(false);
    analytics.checked = false;
    analytics.dispatchEvent(new Event('change'));
    const stored = JSON.parse(localStorage.getItem('bb.cookieConsent.v1')!);
    expect(stored.analytics).toBe(false);
  });

  it('renders a cookie section with named checkboxes', async () => {
    localStorage.clear();
    const el = await fixture<any>(html`<config-page></config-page>`);
    await el.updateComplete;
    const section = el.shadowRoot!.querySelector('[data-test-id="cookie-section"]');
    expect(section).not.toBeNull();
    const analytics = el.shadowRoot!.querySelector('[data-test-id="config-analytics"]');
    const marketing = el.shadowRoot!.querySelector('[data-test-id="config-marketing"]');
    expect(analytics?.getAttribute('name')).toBe('analytics');
    expect(marketing?.getAttribute('name')).toBe('marketing');
  });
});
