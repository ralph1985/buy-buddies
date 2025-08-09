import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));

import './shopping-list.js';

if (!customElements.get('md-outlined-text-field')) {
  customElements.define('md-outlined-text-field', class extends HTMLElement {});
}

describe('shopping-list component', () => {
  beforeEach(() => {
    localStorage.clear();
    window.fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 })) as any;
  });

  it('filters by text including notes', async () => {
    const el = await fixture<any>(html`<shopping-list></shopping-list>`);
    await el.updateComplete;
    el.items = [
      {
        id: '1',
        name: 'Water',
        quantity: '1',
        unit: 'L',
        group: 'G1',
        category: 'Drinks',
        notes: 'cold',
        bought: false,
      },
      {
        id: '2',
        name: 'Soda',
        quantity: '1',
        unit: 'can',
        group: 'G1',
        category: 'Drinks',
        notes: 'cola',
        bought: true,
      },
    ];
    await el.updateComplete;
    (el as any).filters = {
      text: 'cola',
      group: '',
      category: '',
      status: 'todos',
    };
    await el.updateComplete;
    const items = el.shadowRoot!.querySelectorAll('shopping-item');
    expect(items.length).toBe(1);
    const item = items[0] as any;
    await item.updateComplete;
    expect(item.shadowRoot!.textContent).toContain('Soda');
  });

  it('filters by group, category and status', async () => {
    const el = await fixture<any>(html`<shopping-list></shopping-list>`);
    await el.updateComplete;
    el.items = [
      {
        id: '1',
        name: 'Water',
        quantity: '1',
        unit: 'L',
        group: 'G1',
        category: 'Drinks',
        notes: '',
        bought: false,
      },
      {
        id: '2',
        name: 'Milk',
        quantity: '1',
        unit: 'L',
        group: 'G2',
        category: 'Dairy',
        notes: '',
        bought: true,
      },
      {
        id: '3',
        name: 'Juice',
        quantity: '1',
        unit: 'L',
        group: 'G1',
        category: 'Drinks',
        notes: '',
        bought: true,
      },
    ];
    await el.updateComplete;
    (el as any).filters = {
      text: '',
      group: 'G1',
      category: 'Drinks',
      status: 'comprado',
    };
    await el.updateComplete;
    const items = el.shadowRoot!.querySelectorAll('shopping-item');
    expect(items.length).toBe(1);
    const item = items[0] as any;
    await item.updateComplete;
    expect(item.shadowRoot!.textContent).toContain('Juice');
    const total = el.shadowRoot!.querySelector('.total')!;
    expect(total.textContent).toContain('Total de productos: 1 de 3');
  });
});
