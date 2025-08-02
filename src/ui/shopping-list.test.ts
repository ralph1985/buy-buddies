import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));

import './shopping-list.js';

if (!customElements.get('md-outlined-text-field')) {
  customElements.define('md-outlined-text-field', class extends HTMLElement {});
}

describe('shopping-list component', () => {
  it('renders items', async () => {
    window.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([]), { status: 200 }),
    ) as any;
    const el = await fixture<any>(html`<shopping-list></shopping-list>`);
    await el.updateComplete;
    el.items = [
      {
        id: '1',
        name: 'Water',
        quantity: '1',
        unit: 'L',
        group: '',
        category: 'Drinks',
        notes: '',
        bought: false,
      },
    ];
    await el.updateComplete;
    await new Promise((r) => setTimeout(r));
    const table = el.shadowRoot!.querySelector('shopping-table') as any;
    await table.updateComplete;
    expect(table.shadowRoot.textContent).toContain('Water');
  });
});
