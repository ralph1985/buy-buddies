import { fixture, html } from '@open-wc/testing';
import { describe, it, expect } from 'vitest';
import './shopping-row.js';

import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

describe('shopping-row', () => {
  it('renders item fields', async () => {
    const item: ShoppingItem = {
      id: '1',
      name: 'Agua',
      quantity: '1',
      unit: 'L',
      group: 'Grupo',
      category: 'Bebida',
      notes: 'Nota',
      bought: false,
    };
    const row = await fixture<any>(html`<shopping-row></shopping-row>`);
    row.item = item;
    await row.updateComplete;
    expect(row.textContent).toContain('Agua');
    expect(row.textContent).toContain('1');
    expect(row.textContent).toContain('Nota');
  });
});
