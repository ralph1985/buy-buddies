import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));
vi.mock('@material/web/list/list.js', () => ({}));
vi.mock('@material/web/list/list-item.js', () => ({}));

import './shopping-list.js';

if (!customElements.get('md-outlined-text-field')) {
  customElements.define('md-outlined-text-field', class extends HTMLElement {});
}
if (!customElements.get('md-list')) {
  customElements.define('md-list', class extends HTMLElement {});
}
if (!customElements.get('md-list-item')) {
  customElements.define('md-list-item', class extends HTMLElement {});
}

declare global {
  interface Window {
    fetch: typeof fetch;
  }
}

describe('shopping-list component', () => {
  beforeEach(() => {
    window.fetch = async () =>
      new Response(
        JSON.stringify([
          { id: '1', name: 'Water', group: '', category: 'Drinks', bought: false },
        ]),
        { status: 200 },
      ) as any;
  });

  it('renders items', async () => {
    const el = await fixture<HTMLDivElement>(html`<shopping-list></shopping-list>`);
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain('Water');
  });
});
