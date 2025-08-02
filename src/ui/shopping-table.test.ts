import { fixture, html } from '@open-wc/testing';
import { describe, it, expect } from 'vitest';
import './shopping-table.js';

import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

describe('shopping-table', () => {
  it('renders rows for items', async () => {
    const items: ShoppingItem[] = [
      { id: '1', name: 'Agua', quantity: '1', unit: 'L', group: 'G', category: 'Bebida', notes: '', bought: false },
      { id: '2', name: 'Pan', quantity: '2', unit: 'uds', group: 'G', category: 'Resto', notes: '', bought: false },
    ];
    const el = await fixture<any>(html`<shopping-table></shopping-table>`);
    el.items = items;
    await el.updateComplete;
    await new Promise((r) => setTimeout(r));
    const rows = el.shadowRoot!.querySelectorAll('shopping-row');
    expect(rows.length).toBe(2);
    expect(el.shadowRoot!.textContent).toContain('Agua');
  });
});
