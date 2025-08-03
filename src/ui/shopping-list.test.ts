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
    localStorage.clear();
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
    const items = el.shadowRoot!.querySelectorAll('shopping-item');
    expect(items.length).toBe(1);
    const item = items[0] as any;
    await item.updateComplete;
    expect(item.shadowRoot!.textContent).toContain('Water');
  });
});
