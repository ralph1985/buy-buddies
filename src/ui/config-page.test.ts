import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';
import { setLang } from './i18n.js';

vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));

import './config-page.js';

if (!customElements.get('md-outlined-text-field')) {
  customElements.define(
    'md-outlined-text-field',
    class extends HTMLElement {
      value = '';
    },
  );
}

describe('config-page component', () => {
  beforeEach(() => {
    setLang('es');
  });

  it('stores googleSheetId in localStorage', async () => {
    localStorage.clear();
    localStorage.setItem('googleSheetId', 'initial');
    const el = await fixture<any>(html`<config-page></config-page>`);
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('md-outlined-text-field') as any;
    expect(input.value).toBe('initial');
    input.value = 'new-id';
    input.dispatchEvent(new Event('input'));
    expect(localStorage.getItem('googleSheetId')).toBe('new-id');
  });

  it('changes and stores language selection', async () => {
    localStorage.clear();
    const el = await fixture<any>(html`<config-page></config-page>`);
    await el.updateComplete;
    const select = el.shadowRoot!.querySelector('select') as HTMLSelectElement;
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
    expect(localStorage.getItem('lang')).toBe('en');
  });
});
